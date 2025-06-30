<template>
  <div class="learning-item">
    <!-- トグルヘッダー -->
    <div 
      :class="[
        'learning-header',
        { 'completed': isCompleted, 'expanded': isExpanded },
        `phase-${learningDay.phase}`
      ]"
      @click="toggleExpand"
    >
      <div class="header-left">
        <div class="day-badge">{{ learningDay.day }}</div>
        <h3 class="learning-title">{{ learningDay.title }}</h3>
      </div>
      
      <div class="header-right">
        <div 
          v-if="isCompleted"
          class="completion-badge"
        >
          ✓ 完了
        </div>
        <div class="expand-icon">
          {{ isExpanded ? '−' : '+' }}
        </div>
      </div>
    </div>

    <!-- 展開コンテンツ -->
    <Transition name="slide-down">
      <div v-if="isExpanded" class="learning-content">
        <div class="content-grid">
          <!-- 左側：学習内容 -->
          <div class="learning-details">
            <div class="detail-section">
              <div class="section-label">🎯 ゴール</div>
              <div class="section-content">{{ learningDay.goal }}</div>
            </div>
            
            <div class="detail-section">
              <div class="section-label">✅ 完了の定義</div>
              <div class="section-content">{{ learningDay.completion }}</div>
            </div>
            
            <div class="detail-section">
              <div class="section-label">📝 小課題</div>
              <div class="task-content">{{ learningDay.task }}</div>
            </div>
          </div>

          <!-- 右側：アクションエリア -->
          <div class="action-area">
            <!-- 完了チェックボックス -->
            <div 
              :class="['action-button', 'completion-button', { 'completed': isCompleted }]" 
              @click="$emit('toggle-completion', learningDay.day)"
            >
              <div :class="['checkbox', { 'checked': isCompleted }]"></div>
              <span class="button-label">学習完了</span>
            </div>
            
            <!-- 🆕 エディタモード切り替えボタン -->
            <div 
              v-if="learningDay.sampleCode"
              :class="['action-button', 'editor-mode-button', { 'active': useInteractiveEditor }]" 
              @click="toggleEditorMode"
            >
              <div :class="['checkbox', { 'checked': useInteractiveEditor }]"></div>
              <span class="button-label">{{ useInteractiveEditor ? 'エディタモード' : 'サンプル表示' }}</span>
            </div>
            
            <!-- 従来のサンプルコード表示ボタン（エディタモードでない場合のみ） -->
            <div 
              v-if="learningDay.sampleCode && !useInteractiveEditor"
              :class="['action-button', 'sample-button', { 'active': isSampleCodeShown }]" 
              @click="$emit('toggle-sample-code', learningDay.day)"
            >
              <div :class="['checkbox', { 'checked': isSampleCodeShown }]"></div>
              <span class="button-label">サンプルコード表示</span>
            </div>
          </div>
        </div>

        <!-- 🆕 インタラクティブエディタセクション -->
        <div v-if="useInteractiveEditor && learningDay.sampleCode" class="interactive-editor-section">
          <div class="editor-header">
            <div class="header-left">
              <span class="editor-title">💻 インタラクティブエディタ</span>
            </div>
            <div class="editor-controls">
              <button @click="resetCode" class="control-button">
                🔄 リセット
              </button>
              <button @click="runCode" :disabled="isRunning" class="control-button run-button">
                {{ isRunning ? '実行中...' : '▶️ 実行' }}
              </button>
            </div>
          </div>

          <!-- Monaco Editor 統合 -->
          <MonacoCodeEditor
            v-model:value="editorCode"
            :height="'350px'"
            :theme="'vs-dark'"
            language="typescript"
            @change="onCodeChange"
          />

          <!-- 実行結果表示 -->
          <div v-if="executionResult" class="execution-result">
            <div class="result-header">📊 実行結果</div>
            <pre v-if="executionResult.output" class="result-output">{{ executionResult.output }}</pre>
            <div v-if="executionResult.errors.length > 0" class="result-errors">
              <div class="error-header">❌ エラー:</div>
              <div v-for="error in executionResult.errors" :key="error" class="error-item">
                {{ error }}
              </div>
            </div>
          </div>

          <!-- 解説（エディタモードでも表示） -->
          <div v-if="learningDay.explanation" class="explanation">
            <div class="explanation-header">
              <span class="explanation-icon">💡</span>
              <span class="explanation-title">解説</span>
            </div>
            <p class="explanation-content">{{ learningDay.explanation }}</p>
          </div>
        </div>

        <!-- 従来の静的サンプルコード表示エリア -->
        <Transition name="fade">
          <div v-if="!useInteractiveEditor && isSampleCodeShown && learningDay.sampleCode" class="sample-code-section">
            <div class="sample-code-header">
              <div class="header-left">
                <span class="code-icon">💻</span>
                <span class="sample-title">サンプルコード</span>
              </div>
              <button 
                class="copy-button"
                @click="copyToClipboard"
                :class="{ 'copied': isCopied }"
              >
                {{ isCopied ? '✓ コピー完了' : '📋 コピー' }}
              </button>
            </div>
            <pre class="sample-code"><code>{{ learningDay.sampleCode }}</code></pre>
            
            <div v-if="learningDay.explanation" class="explanation">
              <div class="explanation-header">
                <span class="explanation-icon">💡</span>
                <span class="explanation-title">解説</span>
              </div>
              <p class="explanation-content">{{ learningDay.explanation }}</p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MonacoCodeEditor from './MonacoCodeEditor.vue'
import type { LearningDay } from '@/types/learning'

interface Props {
  learningDay: LearningDay
  isCompleted: boolean
  isSampleCodeShown: boolean
}

interface Emits {
  (e: 'toggle-completion', day: number): void
  (e: 'toggle-sample-code', day: number): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

// 既存の状態
const isExpanded = ref(false)
const isCopied = ref(false)

// 🆕 Monaco Editor 関連の新しい状態
const useInteractiveEditor = ref(false)  // インタラクティブモード切り替え
const editorCode = ref('')               // エディタのコード
const isRunning = ref(false)             // 実行中フラグ
const executionResult = ref<any>(null)   // 実行結果

// 既存の関数
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const copyToClipboard = async () => {
  const codeText = props.learningDay.sampleCode
  
  if (!codeText) return
  
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(codeText)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = codeText
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
    }
    
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
    
  } catch (err) {
    console.error('コピーに失敗しました:', err)
    prompt('コードをコピーしてください:', codeText)
  }
}

// 🆕 Monaco Editor 関連の新しい関数
const toggleEditorMode = () => {
  useInteractiveEditor.value = !useInteractiveEditor.value
  if (useInteractiveEditor.value && !editorCode.value) {
    // エディタモードに切り替えたときにサンプルコードを初期値として設定
    editorCode.value = props.learningDay.sampleCode || '// ここにコードを書いてください\nconsole.log("Hello, TypeScript!");'
  }
}

const resetCode = () => {
  editorCode.value = props.learningDay.sampleCode || '// ここにコードを書いてください\nconsole.log("Hello, TypeScript!");'
  executionResult.value = null
}

const runCode = async () => {
  isRunning.value = true
  try {
    // 簡易コード実行（学習用）
    const result = await executeCode(editorCode.value)
    executionResult.value = result
  } catch (error) {
    executionResult.value = {
      output: '',
      errors: [error instanceof Error ? error.message : '不明なエラーが発生しました']
    }
  } finally {
    isRunning.value = false
  }
}

const executeCode = async (code: string) => {
  // 安全なコード実行の実装（学習用に簡略化）
  const logs: string[] = []
  const errors: string[] = []
  
  // console.logをキャプチャするモック
  const mockConsole = {
    log: (...args: any[]) => logs.push(args.map(arg => String(arg)).join(' ')),
    error: (...args: any[]) => {
      const errorMsg = args.map(arg => String(arg)).join(' ')
      logs.push(`ERROR: ${errorMsg}`)
      errors.push(errorMsg)
    },
    warn: (...args: any[]) => logs.push(`WARN: ${args.map(arg => String(arg)).join(' ')}`),
    info: (...args: any[]) => logs.push(`INFO: ${args.map(arg => String(arg)).join(' ')}`)
  }
  
  try {
    // TypeScript部分を単純なJavaScriptとして実行（制限あり）
    // 実際の本格実装では、Monaco EditorのTypeScript変換を使用
    const func = new Function('console', code)
    func(mockConsole)
    
    return { 
      output: logs.join('\n') || '(出力なし)', 
      errors: errors 
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '不明な実行エラー'
    return { 
      output: logs.join('\n'), 
      errors: [...errors, errorMessage] 
    }
  }
}

const onCodeChange = (newCode: string) => {
  // コード変更時は実行結果をクリア
  executionResult.value = null
}
</script>

<style scoped>
.learning-item {
  margin-bottom: 8px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background: white;
}

.learning-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid #2196F3;
  background: #fafafa;
}

.learning-header:hover {
  background: #f0f0f0;
}

.learning-header.expanded {
  background: #e3f2fd;
}

.learning-header.completed {
  border-left-color: #4CAF50;
  background: #f1f8e9;
}

.learning-header.phase-2 {
  border-left-color: #FF9800;
}

.learning-header.phase-3 {
  border-left-color: #9C27B0;
}

.learning-header.phase-2.completed,
.learning-header.phase-3.completed {
  border-left-color: #4CAF50;
}

.header-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.day-badge {
  background: #2196F3;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  margin-right: 16px;
  flex-shrink: 0;
}

.learning-header.completed .day-badge {
  background: #4CAF50;
}

.learning-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.completion-badge {
  background: #4CAF50;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.expand-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(33, 150, 243, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #2196F3;
  transition: all 0.3s ease;
}

.learning-header.expanded .expand-icon {
  background: #2196F3;
  color: white;
  transform: rotate(180deg);
}

.learning-content {
  padding: 24px;
  background: white;
  border-top: 1px solid #e9ecef;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  margin-bottom: 24px;
}

.learning-details {
  flex: 1;
}

.detail-section {
  margin-bottom: 20px;
}

.section-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-content {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

.task-content {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 3px solid #2196F3;
  color: #555;
  line-height: 1.6;
}

.action-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 200px;
}

.action-button {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
  background: #fafafa;
}

.action-button:hover {
  background: #f0f0f0;
  border-color: #ddd;
}

.completion-button.completed {
  background: #e8f5e8;
  border-color: #4CAF50;
}

.sample-button.active {
  background: #e3f2fd;
  border-color: #2196F3;
}

/* 🆕 エディタモードボタンのスタイル */
.editor-mode-button.active {
  background: #f3e5f5;
  border-color: #9C27B0;
}

.checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.checkbox.checked {
  background: #4CAF50;
  border-color: #4CAF50;
}

.sample-button .checkbox.checked {
  background: #2196F3;
  border-color: #2196F3;
}

.editor-mode-button .checkbox.checked {
  background: #9C27B0;
  border-color: #9C27B0;
}

.checkbox.checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 12px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.button-label {
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

/* 🆕 インタラクティブエディタセクションのスタイル */
.interactive-editor-section {
  margin-top: 24px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e9ecef;
  background: #f8f9fa;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #9C27B0;
  color: white;
  font-weight: 600;
}

.editor-title {
  font-size: 1rem;
}

.editor-controls {
  display: flex;
  gap: 8px;
}

.control-button {
  padding: 6px 12px;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.control-button:hover:not(:disabled) {
  background: rgba(255,255,255,0.2);
}

.control-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.run-button {
  background: rgba(76, 175, 80, 0.8);
  border-color: rgba(76, 175, 80, 0.8);
}

.run-button:hover:not(:disabled) {
  background: rgba(76, 175, 80, 1);
}

/* 実行結果のスタイル */
.execution-result {
  background: white;
  border-top: 1px solid #e9ecef;
}

.result-header {
  background: #f8f9fa;
  padding: 8px 16px;
  font-weight: 600;
  border-bottom: 1px solid #e9ecef;
  color: #333;
}

.result-output {
  padding: 16px;
  background: #2d3748;
  color: #e2e8f0;
  font-family: 'Consolas', 'Monaco', monospace;
  margin: 0;
  white-space: pre-wrap;
  font-size: 0.9rem;
  line-height: 1.6;
}

.result-errors {
  padding: 16px;
  background: #fff5f5;
}

.error-header {
  font-weight: 600;
  color: #dc3545;
  margin-bottom: 8px;
}

.error-item {
  color: #dc3545;
  font-size: 0.9rem;
  margin-bottom: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
}

/* 従来のサンプルコード表示 */
.sample-code-section {
  margin-top: 24px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

.sample-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #2196F3;
  color: white;
  font-weight: 600;
}

.sample-code-header .header-left {
  display: flex;
  align-items: center;
}

.copy-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.copy-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.copy-button.copied {
  background: #4CAF50;
  border-color: #4CAF50;
}

.code-icon {
  margin-right: 8px;
  font-size: 1.1rem;
}

.sample-code {
  margin: 0;
  padding: 20px;
  background: #2d3748;
  color: #e2e8f0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre-wrap;
}

.explanation {
  padding: 16px;
  background: #f8f9fa;
}

.explanation-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 600;
  color: #333;
}

.explanation-icon {
  margin-right: 8px;
  font-size: 1.1rem;
}

.explanation-content {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* アニメーション */
.slide-down-enter-active {
  transition: all 0.3s ease-out;
}

.slide-down-leave-active {
  transition: all 0.3s ease-in;
}

.slide-down-enter-from {
  opacity: 0;
  max-height: 0;
}

.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* レスポンシブ */
@media (max-width: 768px) {
  .learning-header {
    padding: 16px 20px;
  }
  
  .learning-content {
    padding: 20px;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .action-area {
    min-width: auto;
  }
  
  .learning-title {
    font-size: 1rem;
  }
  
  .sample-code {
    font-size: 0.8rem;
    padding: 15px;
  }

  .editor-controls {
    flex-direction: column;
    gap: 4px;
  }

  .control-button {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
}
</style>