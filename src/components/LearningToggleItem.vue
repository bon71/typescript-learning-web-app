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