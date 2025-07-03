<template>
  <div class="auto-grader">
    <div class="grader-header">
      <h3 class="grader-title">
        <span class="icon">🎯</span>
        自動評価
      </h3>
      <div class="grader-status">
        <div v-if="isEvaluating" class="status-loading">
          <div class="spinner"></div>
          <span>評価中...</span>
        </div>
        <div v-else-if="lastResult" class="status-result" :class="resultClass">
          <span class="score">{{ lastResult.score }}%</span>
          <span class="status-text">{{ statusText }}</span>
        </div>
        <div v-else class="status-ready">
          <span>準備完了</span>
        </div>
      </div>
    </div>

    <div class="grader-content">
      <!-- 評価ボタン -->
      <div class="evaluation-controls">
        <button 
          @click="runEvaluation"
          :disabled="isEvaluating || !hasCode"
          class="evaluate-button"
          :class="{ 'disabled': isEvaluating || !hasCode }"
        >
          <span v-if="isEvaluating" class="button-content">
            <div class="mini-spinner"></div>
            評価中...
          </span>
          <span v-else class="button-content">
            <span class="button-icon">⚡</span>
            評価実行
          </span>
        </button>
        
        <div class="evaluation-info">
          <span class="test-count">{{ testCases.length }}個のテスト</span>
        </div>
      </div>

      <!-- 評価結果表示 -->
      <div v-if="lastResult" class="evaluation-result">
        <TestResult :result="lastResult" />
      </div>

      <!-- ヒントセクション -->
      <div v-if="showHints" class="hints-section">
        <h4 class="hints-title">
          <span class="icon">💡</span>
          学習のヒント
        </h4>
        <div class="hints-list">
          <div 
            v-for="(hint, index) in exercise.hints || []" 
            :key="index"
            class="hint-item"
          >
            <span class="hint-number">{{ index + 1 }}</span>
            <span class="hint-text">{{ hint }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- フィードバックパネル -->
    <div v-if="lastResult && lastResult.feedback.length > 0" class="feedback-panel">
      <h4 class="feedback-title">
        <span class="icon">📝</span>
        フィードバック
      </h4>
      <div class="feedback-list">
        <div 
          v-for="(feedback, index) in lastResult.feedback" 
          :key="index"
          class="feedback-item"
          :class="`feedback-${feedback.type}`"
        >
          <div class="feedback-icon">{{ getFeedbackIcon(feedback.type) }}</div>
          <div class="feedback-content">
            <div class="feedback-message">{{ feedback.message }}</div>
            <div v-if="feedback.suggestion" class="feedback-suggestion">
              💡 {{ feedback.suggestion }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCodeEvaluation } from '@/composables/useCodeEvaluation'
import type { Exercise, TestCase, EvaluationResult, FeedbackMessage } from '@/types/testing'
import TestResult from './TestResult.vue'

// Props
interface Props {
  exercise: Exercise
  testCases: TestCase[]
  currentCode: string
  showHints?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showHints: true
})

// Emits
interface Emits {
  (e: 'evaluation-complete', result: EvaluationResult): void
  (e: 'evaluation-start'): void
}

const emit = defineEmits<Emits>()

// Composables
const { evaluateCode, lastResult } = useCodeEvaluation({
  timeout: 5000,
  maxExecutionTime: 1000,
  enableTypeChecking: true,
  enableConsoleCapture: true,
  sandboxMode: 'function'
})

// 独立したローカル状態管理
const isEvaluating = ref(false)

// Computed
const hasCode = computed(() => {
  return props.currentCode && props.currentCode.trim().length > 0
})

const resultClass = computed(() => {
  if (!lastResult.value) return ''
  
  if (lastResult.value.score >= 80) return 'success'
  if (lastResult.value.score >= 60) return 'warning'
  return 'error'
})

const statusText = computed(() => {
  if (!lastResult.value) return ''
  
  if (lastResult.value.success) return '合格'
  if (lastResult.value.score >= 60) return '改善が必要'
  return '再挑戦'
})

// Methods
async function runEvaluation() {
  if (!hasCode.value || isEvaluating.value) return
  
  console.log('Starting evaluation')
  console.log('Code to evaluate:', props.currentCode)
  console.log('Test cases:', props.testCases)
  
  isEvaluating.value = true
  
  emit('evaluation-start')
  
  try {
    const result = await evaluateCode(props.currentCode, props.testCases)
    console.log('Evaluation completed successfully')
    console.log('Result:', result)
    emit('evaluation-complete', result)
  } catch (error) {
    console.error('Evaluation error:', error)
  } finally {
    // 確実にリセットする
    isEvaluating.value = false
    console.log('Reset isEvaluating to false')
  }
}

function getFeedbackIcon(type: FeedbackMessage['type']): string {
  switch (type) {
    case 'success': return '✅'
    case 'warning': return '⚠️'
    case 'error': return '❌'
    case 'info': return 'ℹ️'
    default: return '📝'
  }
}
</script>

<style scoped>
.auto-grader {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Header */
.grader-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f1f5f9;
}

.grader-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.grader-title .icon {
  font-size: 1.2rem;
}

.grader-status {
  display: flex;
  align-items: center;
}

.status-loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  font-size: 0.9rem;
}

.status-result {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-result.success {
  color: #10b981;
}

.status-result.warning {
  color: #f59e0b;
}

.status-result.error {
  color: #ef4444;
}

.score {
  font-size: 1.1rem;
  font-weight: 700;
}

.status-ready {
  color: #64748b;
  font-size: 0.9rem;
}

/* Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.mini-spinner {
  width: 12px;
  height: 12px;
  border: 2px solid #ffffff40;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Evaluation Controls */
.evaluation-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.evaluate-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.evaluate-button:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.evaluate-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button-icon {
  font-size: 1.1rem;
}

.evaluation-info {
  color: #64748b;
  font-size: 0.85rem;
  text-align: center;
}

.test-count {
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-weight: 500;
  display: inline-block;
}

/* Evaluation Result */
.evaluation-result {
  margin-bottom: 1.5rem;
}

/* Hints Section */
.hints-section {
  margin-bottom: 1.5rem;
}

.hints-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.hints-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.hint-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 8px;
}

.hint-number {
  background: #f59e0b;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.hint-text {
  color: #92400e;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Feedback Panel */
.feedback-panel {
  border-top: 1px solid #f1f5f9;
  padding-top: 1.5rem;
}

.feedback-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.feedback-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feedback-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  border-left: 3px solid;
}

.feedback-success {
  background: #ecfdf5;
  border-left-color: #10b981;
}

.feedback-warning {
  background: #fffbeb;
  border-left-color: #f59e0b;
}

.feedback-error {
  background: #fef2f2;
  border-left-color: #ef4444;
}

.feedback-info {
  background: #eff6ff;
  border-left-color: #3b82f6;
}

.feedback-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.feedback-content {
  flex: 1;
}

.feedback-message {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.feedback-success .feedback-message {
  color: #047857;
}

.feedback-warning .feedback-message {
  color: #d97706;
}

.feedback-error .feedback-message {
  color: #dc2626;
}

.feedback-info .feedback-message {
  color: #2563eb;
}

.feedback-suggestion {
  font-size: 0.8rem;
  opacity: 0.8;
  line-height: 1.4;
}

/* Responsive Design */
@media (max-width: 768px) {
  .auto-grader {
    padding: 1rem;
  }
  
  .grader-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .evaluation-controls {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .evaluate-button {
    justify-content: center;
  }
}
</style>