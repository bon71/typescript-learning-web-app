<template>
  <div class="test-result">
    <!-- スコア表示 -->
    <div class="score-section">
      <div class="score-circle" :class="scoreClass">
        <div class="score-value">{{ result.score }}</div>
        <div class="score-unit">%</div>
      </div>
      <div class="score-details">
        <div class="score-label">{{ scoreLabel }}</div>
        <div class="test-summary">
          {{ result.passedTests }}/{{ result.totalTests }} テスト通過
        </div>
      </div>
    </div>

    <!-- 実行時間 -->
    <div class="execution-info">
      <div class="info-item">
        <span class="info-icon">⚡</span>
        <span class="info-label">実行時間</span>
        <span class="info-value">{{ formattedExecutionTime }}</span>
      </div>
    </div>

    <!-- エラー表示 -->
    <div v-if="hasErrors" class="errors-section">
      <!-- コンパイルエラー -->
      <div v-if="result.compileErrors.length > 0" class="error-group">
        <h4 class="error-title">
          <span class="error-icon">🔧</span>
          コンパイルエラー
        </h4>
        <div class="error-list">
          <div 
            v-for="(error, index) in result.compileErrors" 
            :key="index"
            class="error-item compile-error"
          >
            <div class="error-badge" :class="`severity-${error.severity}`">
              {{ getSeverityLabel(error.severity) }}
            </div>
            <div class="error-content">
              <div class="error-message">{{ error.message }}</div>
              <div v-if="error.line" class="error-location">
                行 {{ error.line }}{{ error.column ? `:${error.column}` : '' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 実行時エラー -->
      <div v-if="result.runtimeErrors.length > 0" class="error-group">
        <h4 class="error-title">
          <span class="error-icon">⚠️</span>
          実行時エラー
        </h4>
        <div class="error-list">
          <div 
            v-for="(error, index) in result.runtimeErrors" 
            :key="index"
            class="error-item runtime-error"
          >
            <div class="error-content">
              <div class="error-message">{{ error.message }}</div>
              <div v-if="error.stack" class="error-stack">
                <details>
                  <summary>詳細なスタックトレース</summary>
                  <pre>{{ error.stack }}</pre>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 出力比較 -->
    <div v-if="showOutputComparison" class="output-section">
      <h4 class="output-title">
        <span class="output-icon">📤</span>
        出力結果の比較
      </h4>
      <div class="output-comparison">
        <div class="output-group">
          <h5 class="output-label expected">期待される出力</h5>
          <div class="output-content expected">
            <pre>{{ result.outputComparison.expected || '(出力なし)' }}</pre>
          </div>
        </div>
        <div class="comparison-arrow">
          <span v-if="result.outputComparison.matches" class="match-icon">✅</span>
          <span v-else class="mismatch-icon">❌</span>
        </div>
        <div class="output-group">
          <h5 class="output-label actual">実際の出力</h5>
          <div class="output-content actual">
            <pre>{{ result.outputComparison.actual || '(出力なし)' }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 改善提案 -->
    <div v-if="result.suggestions.length > 0" class="suggestions-section">
      <h4 class="suggestions-title">
        <span class="suggestions-icon">💡</span>
        改善提案
      </h4>
      <div class="suggestions-list">
        <div 
          v-for="(suggestion, index) in result.suggestions" 
          :key="index"
          class="suggestion-item"
        >
          <span class="suggestion-bullet">•</span>
          <span class="suggestion-text">{{ suggestion }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { EvaluationResult, CompileError } from '@/types/testing'

// Props
interface Props {
  result: EvaluationResult
}

const props = defineProps<Props>()

// Computed
const scoreClass = computed(() => {
  if (props.result.score >= 80) return 'excellent'
  if (props.result.score >= 60) return 'good'
  if (props.result.score >= 40) return 'needs-improvement'
  return 'poor'
})

const scoreLabel = computed(() => {
  if (props.result.success) return '合格'
  if (props.result.score >= 60) return '改善が必要'
  if (props.result.score >= 40) return '要練習'
  return '再挑戦'
})

const formattedExecutionTime = computed(() => {
  const time = props.result.executionTime
  if (time < 1) return '<1ms'
  if (time < 1000) return `${Math.round(time)}ms`
  return `${(time / 1000).toFixed(2)}s`
})

const hasErrors = computed(() => {
  return props.result.compileErrors.length > 0 || props.result.runtimeErrors.length > 0
})

const showOutputComparison = computed(() => {
  return props.result.outputComparison.expected || props.result.outputComparison.actual
})

// Methods
function getSeverityLabel(severity: CompileError['severity']): string {
  switch (severity) {
    case 'error': return 'エラー'
    case 'warning': return '警告'
    case 'info': return '情報'
    default: return '不明'
  }
}
</script>

<style scoped>
.test-result {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
}

/* Score Section */
.score-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.score-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 700;
  border: 4px solid;
}

.score-circle.excellent {
  background: linear-gradient(135deg, #10b981, #059669);
  border-color: #10b981;
  color: white;
}

.score-circle.good {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border-color: #3b82f6;
  color: white;
}

.score-circle.needs-improvement {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-color: #f59e0b;
  color: white;
}

.score-circle.poor {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border-color: #ef4444;
  color: white;
}

.score-value {
  font-size: 1.5rem;
  line-height: 1;
}

.score-unit {
  font-size: 0.8rem;
  opacity: 0.8;
}

.score-details {
  flex: 1;
}

.score-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.test-summary {
  color: #64748b;
  font-size: 0.9rem;
}

/* Execution Info */
.execution-info {
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.info-icon {
  font-size: 1.1rem;
}

.info-label {
  color: #64748b;
  font-size: 0.9rem;
}

.info-value {
  color: #1e293b;
  font-weight: 500;
  margin-left: auto;
}

/* Errors Section */
.errors-section {
  margin-bottom: 1.5rem;
}

.error-group {
  margin-bottom: 1rem;
}

.error-group:last-child {
  margin-bottom: 0;
}

.error-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.error-icon {
  font-size: 1.1rem;
}

.error-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.error-item {
  background: white;
  border: 1px solid;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.compile-error {
  border-color: #fcd34d;
  background: #fffbeb;
}

.runtime-error {
  border-color: #fca5a5;
  background: #fef2f2;
}

.error-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
}

.severity-error {
  background: #dc2626;
  color: white;
}

.severity-warning {
  background: #f59e0b;
  color: white;
}

.severity-info {
  background: #3b82f6;
  color: white;
}

.error-content {
  flex: 1;
}

.error-message {
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.error-location {
  font-size: 0.8rem;
  color: #64748b;
  font-family: 'Monaco', 'Menlo', monospace;
}

.error-stack {
  margin-top: 0.5rem;
}

.error-stack details {
  cursor: pointer;
}

.error-stack summary {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.error-stack pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  overflow-x: auto;
  max-height: 200px;
  overflow-y: auto;
}

/* Output Section */
.output-section {
  margin-bottom: 1.5rem;
}

.output-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.output-icon {
  font-size: 1.1rem;
}

.output-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
}

.output-group {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.output-label {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  border-bottom: 1px solid #e2e8f0;
}

.output-label.expected {
  background: #ecfdf5;
  color: #065f46;
}

.output-label.actual {
  background: #eff6ff;
  color: #1e40af;
}

.output-content {
  padding: 1rem;
}

.output-content pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
}

.comparison-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.match-icon {
  color: #10b981;
}

.mismatch-icon {
  color: #ef4444;
}

/* Suggestions Section */
.suggestions-section {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
}

.suggestions-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.suggestions-icon {
  font-size: 1.1rem;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.suggestion-bullet {
  color: #3b82f6;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.suggestion-text {
  color: #1e293b;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .test-result {
    padding: 1rem;
  }
  
  .score-section {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .output-comparison {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .comparison-arrow {
    order: -1;
    margin: 0.5rem 0;
  }
}
</style>