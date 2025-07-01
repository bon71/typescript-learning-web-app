<template>
  <div class="monaco-editor-wrapper">
    <!-- ローディング表示 -->
    <div v-if="isLoading" class="editor-loading">
      <div class="loading-spinner"></div>
      <p>エディタを読み込み中...</p>
    </div>

    <!-- エディタコンテナ -->
    <div 
      ref="editorContainer" 
      :class="['monaco-editor-container', { 'loading': isLoading }]"
      :style="{ height: height, width: width }"
    ></div>

    <!-- エラー表示 -->
    <div v-if="showErrors && errors.length > 0" class="error-panel">
      <div class="error-header">
        <span class="error-icon">⚠️</span>
        <span class="error-title">TypeScriptエラー ({{ errors.length }})</span>
        <button @click="showErrors = false" class="error-close">✕</button>
      </div>
      <div class="error-list">
        <div 
          v-for="error in errors" 
          :key="`${error.startLineNumber}-${error.startColumn}-${error.code}`"
          class="error-item"
          @click="goToError(error)"
        >
          <div class="error-severity">
            <span :class="['severity-badge', `severity-${error.severity}`]">
              {{ getSeverityText(error.severity) }}
            </span>
          </div>
          <div class="error-content">
            <div class="error-message">{{ error.message }}</div>
            <div class="error-location">
              行 {{ error.startLineNumber }}, 列 {{ error.startColumn }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 実行結果表示 -->
    <div v-if="showExecutionResult && executionResult" class="execution-result">
      <div class="result-header">
        <span class="result-icon">{{ executionResult.success ? '✅' : '❌' }}</span>
        <span class="result-title">
          実行結果 ({{ executionResult.executionTime }}ms)
        </span>
        <button @click="showExecutionResult = false" class="result-close">✕</button>
      </div>
      
      <!-- 出力 -->
      <div v-if="executionResult.output.length > 0" class="result-output">
        <div class="output-header">📤 出力:</div>
        <pre class="output-content">{{ executionResult.output.join('\n') }}</pre>
      </div>
      
      <!-- エラー -->
      <div v-if="executionResult.errors.length > 0" class="result-errors">
        <div class="errors-header">❌ エラー:</div>
        <div class="errors-content">
          <div v-for="error in executionResult.errors" :key="error" class="error-line">
            {{ error }}
          </div>
        </div>
      </div>
      
      <!-- 警告 -->
      <div v-if="executionResult.warnings.length > 0" class="result-warnings">
        <div class="warnings-header">⚠️ 警告:</div>
        <div class="warnings-content">
          <div v-for="warning in executionResult.warnings" :key="warning" class="warning-line">
            {{ warning }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useMonacoEditor, type UseMonacoEditorOptions } from '@/composables/useMonacoEditor'
import { LearningLevel, LearningLevels } from '@/utils/monacoConfig'
import * as monaco from 'monaco-editor'

interface Props {
  value?: string
  height?: string
  width?: string
  language?: string
  theme?: string
  readOnly?: boolean
  learningLevel?: LearningLevel
  autoExecute?: boolean
  showErrorPanel?: boolean
  showResultPanel?: boolean
}

interface Emits {
  (e: 'update:value', value: string): void
  (e: 'change', value: string): void
  (e: 'execute', result: any): void
  (e: 'mount', editor: monaco.editor.IStandaloneCodeEditor): void
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  height: '300px',
  width: '100%',
  language: 'typescript',
  theme: 'learning-dark',
  readOnly: false,
  learningLevel: LearningLevels.BEGINNER,
  autoExecute: false,
  showErrorPanel: true,
  showResultPanel: true
})

const emit = defineEmits<Emits>()

// UI状態
const showErrors = ref(props.showErrorPanel)
const showExecutionResult = ref(false)

// Monaco Editor の使用
const {
  editorContainer,
  editor,
  isLoading,
  currentValue,
  errors,
  isExecuting,
  executionResult,
  learningLevel,
  setValue,
  getValue,
  setLearningLevel,
  executeCode,
  focus,
  resize,
  formatCode,
  setTheme,
  setReadOnly,
  setCursorPosition,
  highlightLine,
  updateErrors
} = useMonacoEditor({
  value: props.value,
  language: props.language,
  theme: props.theme,
  height: props.height,
  width: props.width,
  learningLevel: props.learningLevel,
  readOnly: props.readOnly,
  onChange: (value: string) => {
    emit('update:value', value)
    emit('change', value)
    
    // 自動実行が有効な場合
    if (props.autoExecute && !props.readOnly) {
      executeCodeDelayed()
    }
  },
  onMount: (editorInstance: monaco.editor.IStandaloneCodeEditor) => {
    emit('mount', editorInstance)
  }
})

// 重複する実行を防ぐためのデバウンス
let executeTimeout: NodeJS.Timeout | null = null
const executeCodeDelayed = () => {
  if (executeTimeout) {
    clearTimeout(executeTimeout)
  }
  executeTimeout = setTimeout(async () => {
    const result = await executeCode()
    executionResult.value = result
    showExecutionResult.value = props.showResultPanel
    emit('execute', result)
  }, 1000)
}

// エラーの重要度テキスト
const getSeverityText = (severity: monaco.MarkerSeverity): string => {
  switch (severity) {
    case monaco.MarkerSeverity.Error:
      return 'エラー'
    case monaco.MarkerSeverity.Warning:
      return '警告'
    case monaco.MarkerSeverity.Info:
      return '情報'
    case monaco.MarkerSeverity.Hint:
      return 'ヒント'
    default:
      return '不明'
  }
}

// エラー位置にジャンプ
const goToError = (error: monaco.editor.IMarker) => {
  setCursorPosition(error.startLineNumber, error.startColumn)
  highlightLine(error.startLineNumber)
  focus()
}

// プロパティの変更を監視
watch(() => props.value, (newValue) => {
  if (newValue !== currentValue.value) {
    setValue(newValue || '')
  }
})

watch(() => props.learningLevel, (newLevel) => {
  setLearningLevel(newLevel)
})

watch(() => props.theme, (newTheme) => {
  setTheme(newTheme)
})

watch(() => props.readOnly, (readOnly) => {
  setReadOnly(readOnly)
})

// エラー数の監視
watch(errors, () => {
  if (errors.value.length > 0 && props.showErrorPanel) {
    showErrors.value = true
  }
}, { deep: true })

// パブリックメソッドの公開
defineExpose({
  // エディタインスタンス
  editor,
  
  // 値の操作
  setValue,
  getValue,
  
  // エディタ操作
  focus,
  resize,
  formatCode,
  
  // 実行機能
  executeCode: async () => {
    const result = await executeCode()
    executionResult.value = result
    showExecutionResult.value = props.showResultPanel
    emit('execute', result)
    return result
  },
  
  // 学習レベル操作
  setLearningLevel,
  
  // その他
  setTheme,
  setReadOnly,
  setCursorPosition,
  highlightLine,
  updateErrors
})
</script>

<style scoped>
.monaco-editor-wrapper {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e1e5e9;
  background: #fff;
}

.monaco-editor-container {
  min-height: 200px;
  transition: opacity 0.3s ease;
}

.monaco-editor-container.loading {
  opacity: 0.5;
}

.editor-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2196F3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-panel, .execution-result {
  border-top: 1px solid #e1e5e9;
  background: #f8f9fa;
}

.error-header, .result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff3cd;
  border-bottom: 1px solid #ffeaa7;
  font-weight: 600;
}

.result-header {
  background: #d1ecf1;
  border-bottom: 1px solid #bee5eb;
}

.error-icon, .result-icon {
  margin-right: 8px;
}

.error-close, .result-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  color: #666;
  font-size: 14px;
}

.error-close:hover, .result-close:hover {
  background: rgba(0, 0, 0, 0.1);
}

.error-list {
  max-height: 200px;
  overflow-y: auto;
}

.error-item {
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.error-item:hover {
  background: #f5f5f5;
}

.error-item:last-child {
  border-bottom: none;
}

.error-severity {
  margin-right: 12px;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.severity-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.severity-1 { /* Error */
  background: #f8d7da;
  color: #721c24;
}

.severity-2 { /* Warning */
  background: #fff3cd;
  color: #856404;
}

.severity-4 { /* Info */
  background: #d1ecf1;
  color: #0c5460;
}

.severity-8 { /* Hint */
  background: #e2e3e5;
  color: #383d41;
}

.error-content {
  flex: 1;
}

.error-message {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.error-location {
  font-size: 12px;
  color: #666;
}

.result-output, .result-errors, .result-warnings {
  margin: 8px 16px;
}

.output-header, .errors-header, .warnings-header {
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.output-content {
  background: #2d3748;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
}

.errors-content, .warnings-content {
  background: #fff;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
}

.error-line, .warning-line {
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
}

.error-line {
  color: #dc3545;
  background: #fff5f5;
}

.warning-line {
  color: #856404;
  background: #fffef5;
}

.error-line:last-child, .warning-line:last-child {
  border-bottom: none;
}

/* Monaco Editor内のカスタムスタイル */
:global(.learning-highlight-line) {
  background: rgba(255, 255, 0, 0.2) !important;
}

:global(.learning-highlight-glyph) {
  background: #ffeb3b;
}

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .error-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .error-severity {
    margin-right: 0;
    margin-bottom: 8px;
  }
  
  .output-content {
    font-size: 12px;
  }
}
</style>