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
            
            <!-- エディタモード切り替えボタン -->
            <div 
              v-if="learningDay.sampleCode"
              :class="['action-button', 'editor-mode-button', { 'active': useInteractiveEditor }]" 
              @click="toggleEditorMode"
            >
              <div :class="['checkbox', { 'checked': useInteractiveEditor }]"></div>
              <span class="button-label">
                {{ useInteractiveEditor ? 'エディタモード' : 'サンプル表示' }}
              </span>
            </div>
            
            <!-- 従来のサンプルコード表示ボタン -->
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

        <!-- インタラクティブエディタセクション -->
        <div v-if="useInteractiveEditor && learningDay.sampleCode" class="interactive-editor-section">
          <div class="editor-header">
            <div class="header-left">
              <span class="editor-icon">💻</span>
              <span class="editor-title">インタラクティブエディタ</span>
              <span class="learning-level-badge" :class="`level-${currentLearningLevel}`">
                {{ getLearningLevelText(currentLearningLevel) }}
              </span>
            </div>
            <div class="editor-controls">
              <button @click="resetCode" class="control-button">
                🔄 リセット
              </button>
              <button @click="formatCode" class="control-button">
                ✨ フォーマット
              </button>
              <button 
                @click="runCode" 
                :disabled="isRunning"
                class="control-button run-button"
              >
                {{ isRunning ? '実行中...' : '▶️ 実行' }}
              </button>
            </div>
          </div>

          <!-- Monaco Code Editor -->
          <MonacoCodeEditor
            ref="monacoEditor"
            v-model:value="editorCode"
            :height="'350px'"
            :theme="editorTheme"
            :learning-level="currentLearningLevel"
            :show-error-panel="true"
            :show-result-panel="false"
            language="typescript"
            @change="onCodeChange"
            @execute="onCodeExecute"
            @mount="onEditorMount"
          />

          <!-- 学習支援パネル -->
          <div v-if="showHints && learningDay.hints" class="hints-panel">
            <div class="hints-header">
              <span class="hints-icon">💡</span>
              <span>ヒント</span>
              <button @click="showHints = false" class="hints-close">✕</button>
            </div>
            <div class="hints-content">
              <div 
                v-for="(hint, index) in learningDay.hints" 
                :key="index"
                class="hint-item"
              >
                <div class="hint-number">{{ index + 1 }}</div>
                <div class="hint-text">{{ hint }}</div>
              </div>
            </div>
          </div>

          <!-- 学習進捗パネル -->
          <div v-if="showProgress" class="progress-panel">
            <div class="progress-header">
              <span class="progress-icon">📊</span>
              <span>学習進捗</span>
            </div>
            <div class="progress-content">
              <div class="progress-item">
                <span class="progress-label">コード実行回数:</span>
                <span class="progress-value">{{ executionCount }}</span>
              </div>
              <div class="progress-item">
                <span class="progress-label">エラー回数:</span>
                <span class="progress-value">{{ errorCount }}</span>
              </div>
              <div class="progress-item">
                <span class="progress-label">学習時間:</span>
                <span class="progress-value">{{ formatTime(learningTime) }}</span>
              </div>
            </div>
          </div>

          <!-- カスタム実行結果表示 -->
          <div v-if="executionResult" class="execution-result">
            <div class="result-header">
              <span class="result-icon">{{ executionResult.success ? '✅' : '❌' }}</span>
              <span>実行結果 ({{ executionResult.executionTime }}ms)</span>
            </div>
            
            <div v-if="executionResult.output.length > 0" class="result-output">
              <div class="output-header">📤 出力:</div>
              <pre class="output-content">{{ executionResult.output.join('\n') }}</pre>
            </div>
            
            <div v-if="executionResult.errors.length > 0" class="result-errors">
              <div class="errors-header">❌ エラー:</div>
              <div class="errors-content">
                <div v-for="error in executionResult.errors" :key="error" class="error-line">
                  {{ error }}
                </div>
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

          <!-- 学習支援ボタン群 -->
          <div class="learning-actions">
            <button 
              v-if="learningDay.hints"
              @click="showHints = !showHints"
              class="learning-action-button"
              :class="{ 'active': showHints }"
            >
              💡 ヒント
            </button>
            <button 
              @click="showProgress = !showProgress"
              class="learning-action-button"
              :class="{ 'active': showProgress }"
            >
              📊 進捗
            </button>
            <button 
              @click="changeLearningLevel"
              class="learning-action-button"
            >
              🎚️ レベル変更
            </button>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MonacoCodeEditor from './MonacoCodeEditor.vue'
import type { LearningDay } from '@/types/learning'
import { LearningLevels, type LearningLevel } from '@/utils/monacoConfig'

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
const emit = defineEmits<Emits>()

// UI状態管理
const isExpanded = ref(false)
const isCopied = ref(false)
const useInteractiveEditor = ref(false)
const showHints = ref(false)
const showProgress = ref(false)

// エディタ状態管理
const monacoEditor = ref()
const editorCode = ref('')
const isRunning = ref(false)
const executionCount = ref(0)
const errorCount = ref(0)
const learningTime = ref(0)
const startTime = ref(0)
const executionResult = ref<any>(null)

// エディタ設定
const editorTheme = ref('learning-dark')
const currentLearningLevel = ref<LearningLevel>(
  props.learningDay.phase === 1 ? LearningLevels.BEGINNER :
  props.learningDay.phase === 2 ? LearningLevels.INTERMEDIATE :
  LearningLevels.ADVANCED
)

// 学習レベルのテキスト表示
const getLearningLevelText = (level: LearningLevel): string => {
  switch (level) {
    case LearningLevels.BEGINNER:
      return '初級'
    case LearningLevels.INTERMEDIATE:
      return '中級'
    case LearningLevels.ADVANCED:
      return '上級'
    default:
      return '初級'
  }
}

// 展開状態の切り替え
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
  
  if (isExpanded.value) {
    startTime.value = Date.now()
  } else if (startTime.value > 0) {
    learningTime.value += Math.floor((Date.now() - startTime.value) / 1000)
    startTime.value = 0
  }
}

// エディタモードの切り替え
const toggleEditorMode = () => {
  useInteractiveEditor.value = !useInteractiveEditor.value
  
  if (useInteractiveEditor.value && !editorCode.value) {
    editorCode.value = props.learningDay.sampleCode || ''
  }
}

// コードのリセット
const resetCode = () => {
  editorCode.value = props.learningDay.sampleCode || ''
  if (monacoEditor.value) {
    monacoEditor.value.setValue(editorCode.value)
  }
  executionResult.value = null
}

// コードのフォーマット
const formatCode = () => {
  if (monacoEditor.value) {
    monacoEditor.value.formatCode()
  }
}

// コードの実行
const runCode = async () => {
  if (monacoEditor.value) {
    isRunning.value = true
    try {
      const result = await monacoEditor.value.executeCode()
      executionResult.value = result
      executionCount.value++
      
      if (!result.success) {
        errorCount.value++
      }
      
      updateLearningProgress(result)
      
    } finally {
      isRunning.value = false
    }
  }
}

// コード変更時の処理
const onCodeChange = (value: string) => {
  editorCode.value = value
  executionResult.value = null
}

// コード実行時の処理
const onCodeExecute = (result: any) => {
  executionResult.value = result
  executionCount.value++
  if (!result.success) {
    errorCount.value++
  }
  updateLearningProgress(result)
}

// エディタマウント時の処理
const onEditorMount = (editor: any) => {
  console.log('Monaco Editor mounted:', editor)
}

// 学習進捗の更新
const updateLearningProgress = (result: any) => {
  const progressKey = `learning-progress-day-${props.learningDay.day}`
  const progress = {
    executionCount: executionCount.value,
    errorCount: errorCount.value,
    learningTime: learningTime.value,
    lastActivity: Date.now()
  }
  localStorage.setItem(progressKey, JSON.stringify(progress))
}

// 学習レベルの変更
const changeLearningLevel = () => {
  const levels = [LearningLevels.BEGINNER, LearningLevels.INTERMEDIATE, LearningLevels.ADVANCED]
  const currentIndex = levels.indexOf(currentLearningLevel.value)
  const nextIndex = (currentIndex + 1) % levels.length
  
  currentLearningLevel.value = levels[nextIndex]
  
  if (monacoEditor.value) {
    monacoEditor.value.setLearningLevel(currentLearningLevel.value)
  }
}

// 従来のコピー機能
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

// 時間のフォーマット
const formatTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}秒`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}分${remainingSeconds}秒`
  } else {
    const hours = Math.floor(seconds / 3600)
    const remainingMinutes = Math.floor((seconds % 3600) / 60)
    return `${hours}時間${remainingMinutes}分`
  }
}

// 学習進捗の読み込み
const loadLearningProgress = () => {
  const progressKey = `learning-progress-day-${props.learningDay.day}`
  const savedProgress = localStorage.getItem(progressKey)
  
  if (savedProgress) {
    try {
      const progress = JSON.parse(savedProgress)
      executionCount.value = progress.executionCount || 0
      errorCount.value = progress.errorCount || 0
      learningTime.value = progress.learningTime || 0
    } catch (error) {
      console.error('学習進捗の読み込みに失敗しました:', error)
    }
  }
}

// ライフサイクル
onMounted(() => {
  loadLearningProgress()
})

onUnmounted(() => {
  if (startTime.value > 0) {
    learningTime.value += Math.floor((Date.now() - startTime.value) / 1000)
    updateLearningProgress(null)
  }
})
</script>

<style scoped>
/* メインコンテナ */
.learning-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.learning-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* ヘッダー部分 */
.learning-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.learning-header:hover {
  background: #f8f9fa;
}

.learning-header.completed {
  background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
  border-left-color: #4caf50;
}

.learning-header.expanded {
  background: #f0f4ff;
  border-left-color: #2196f3;
}

.learning-header.phase-1 {
  border-left-color: #2196f3;
}

.learning-header.phase-2 {
  border-left-color: #ff9800;
}

.learning-header.phase-3 {
  border-left-color: #9c27b0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.day-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  min-width: 45px;
  text-align: center;
}

.learning-title {
  font-size: 1.2rem;
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
  background: #4caf50;
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
}

.expand-icon {
  background: #e0e7ff;
  color: #4f46e5;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s ease;
}

.learning-header.expanded .expand-icon {
  background: #4f46e5;
  color: white;
  transform: rotate(180deg);
}

/* コンテンツ部分 */
.learning-content {
  padding: 0 20px 20px;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.learning-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-section {
  padding: 16px;
  background: #f8fafb;
  border-radius: 8px;
  border-left: 3px solid #e5e7eb;
}

.section-label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.section-content {
  color: #6b7280;
  line-height: 1.5;
}

.task-content {
  color: #059669;
  font-weight: 500;
  line-height: 1.5;
}

/* アクションエリア */
.action-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #e5e7eb;
  background: white;
}

.action-button:hover {
  border-color: #d1d5db;
  background: #f9fafb;
}

.action-button.completed,
.action-button.active {
  border-color: #10b981;
  background: #ecfdf5;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
}

.checkbox.checked {
  background: #10b981;
  border-color: #10b981;
}

.checkbox.checked::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 2px;
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.button-label {
  font-weight: 500;
  color: #374151;
}

/* エディタセクション */
.interactive-editor-section {
  margin-top: 24px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.editor-title {
  font-weight: 600;
  font-size: 1.1rem;
}

.learning-level-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-left: 12px;
}

.editor-controls {
  display: flex;
  gap: 8px;
}

.control-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.control-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.control-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.run-button {
  background: #10b981;
}

.run-button:hover:not(:disabled) {
  background: #059669;
}

/* 結果パネル */
.execution-result {
  margin-top: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f8fafb;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 500;
}

.result-output {
  padding: 16px;
}

.output-header {
  font-weight: 600;
  color: #059669;
  margin-bottom: 8px;
}

.output-content {
  background: #f8fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 12px;
  font-family: 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  overflow-x: auto;
}

.result-errors {
  padding: 16px;
  background: #fef2f2;
}

.errors-header {
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 8px;
}

.errors-content {
  color: #991b1b;
}

.error-line {
  margin-bottom: 4px;
  font-family: 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
  font-size: 0.9rem;
}

/* ヒントパネル */
.hints-panel {
  margin-top: 16px;
  border: 1px solid #fbbf24;
  border-radius: 8px;
  background: #fffbeb;
}

.hints-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fef3c7;
  border-bottom: 1px solid #fbbf24;
  font-weight: 500;
}

.hints-close {
  background: none;
  border: none;
  color: #92400e;
  cursor: pointer;
  font-weight: bold;
}

.hints-content {
  padding: 16px;
}

.hint-item {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.hint-number {
  background: #fbbf24;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  flex-shrink: 0;
}

.hint-text {
  color: #92400e;
  line-height: 1.5;
}

/* 進捗パネル */
.progress-panel {
  margin-top: 16px;
  border: 1px solid #3b82f6;
  border-radius: 8px;
  background: #eff6ff;
}

.progress-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #dbeafe;
  border-bottom: 1px solid #3b82f6;
  font-weight: 500;
}

.progress-content {
  padding: 16px;
}

.progress-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-label {
  color: #1e40af;
}

.progress-value {
  font-weight: 600;
  color: #1d4ed8;
}

/* 解説セクション */
.explanation {
  margin-top: 16px;
  padding: 16px;
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 8px;
}

.explanation-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 600;
  color: #0c4a6e;
}

.explanation-content {
  color: #0c4a6e;
  line-height: 1.6;
}

/* 学習アクションボタン */
.learning-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.learning-action-button {
  background: #f3f4f6;
  border: 2px solid #d1d5db;
  color: #374151;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.learning-action-button:hover {
  border-color: #9ca3af;
  background: #e5e7eb;
}

.learning-action-button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

/* サンプルコードセクション */
.sample-code-section {
  margin-top: 24px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.sample-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #f8fafb;
  border-bottom: 1px solid #e5e7eb;
}

.sample-title {
  font-weight: 600;
  color: #374151;
}

.copy-button {
  background: #3b82f6;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.copy-button:hover {
  background: #2563eb;
}

.copy-button.copied {
  background: #10b981;
}

.sample-code {
  background: #1a1a1a;
  color: #e5e5e5;
  padding: 20px;
  margin: 0;
  overflow-x: auto;
  font-family: 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* アニメーション */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 2000px;
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .learning-header {
    padding: 16px;
  }
  
  .learning-content {
    padding: 0 16px 16px;
  }
  
  .learning-title {
    font-size: 1.1rem;
  }
  
  .day-badge {
    padding: 6px 10px;
    font-size: 0.8rem;
    min-width: 40px;
  }
  
  .editor-header {
    padding: 12px 16px;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .editor-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .learning-actions {
    flex-direction: column;
  }
  
  .learning-action-button {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .header-left {
    gap: 12px;
  }
  
  .learning-title {
    font-size: 1rem;
  }
  
  .detail-section {
    padding: 12px;
  }
  
  .action-button {
    padding: 10px 12px;
  }
  
  .sample-code {
    padding: 16px;
    font-size: 0.8rem;
  }
}
</style>