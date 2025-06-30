<template>
  <div class="exercise-panel">
    <div class="exercise-header">
      <div class="exercise-title">
        <span class="exercise-icon">🎯</span>
        <span>実践演習</span>
      </div>
      <div class="exercise-status">
        <span v-if="isCompleted" class="status-completed">✅ 完了</span>
        <span v-else-if="hasAttempted" class="status-attempted">📝 挑戦中</span>
        <span v-else class="status-not-started">🏁 未開始</span>
      </div>
    </div>

    <div class="exercise-content">
      <!-- 問題説明 -->
      <div class="exercise-description">
        <h4>📋 問題</h4>
        <p>{{ exercise.description }}</p>
      </div>

      <!-- ヒント機能 -->
      <div v-if="exercise.hints.length > 0" class="hints-section">
        <button 
          @click="toggleHints" 
          class="hints-toggle"
          :class="{ 'active': showHints }"
        >
          💡 ヒント ({{ exercise.hints.length }}個)
          <span class="toggle-icon">{{ showHints ? '▼' : '▶' }}</span>
        </button>
        
        <Transition name="slide-down">
          <div v-if="showHints" class="hints-list">
            <div 
              v-for="(hint, index) in visibleHints" 
              :key="index"
              class="hint-item"
            >
              <span class="hint-number">{{ index + 1 }}.</span>
              <span class="hint-text">{{ hint }}</span>
            </div>
            
            <button 
              v-if="visibleHints.length < exercise.hints.length"
              @click="showMoreHints"
              class="show-more-hints"
            >
              + さらにヒントを表示 ({{ exercise.hints.length - visibleHints.length }}個)
            </button>
          </div>
        </Transition>
      </div>

      <!-- エディタエリア -->
      <div class="exercise-editor">
        <div class="editor-header">
          <span class="editor-title">💻 あなたの解答</span>
          <div class="editor-controls">
            <button @click="resetToStartCode" class="control-btn reset-btn">
              🔄 初期コードに戻す
            </button>
            <button @click="formatCode" class="control-btn format-btn">
              ✨ フォーマット
            </button>
            <button @click="runTests" :disabled="isRunning" class="control-btn test-btn">
              {{ isRunning ? '⏳ 実行中...' : '🧪 テスト実行' }}
            </button>
          </div>
        </div>

        <MonacoCodeEditor
          v-model:value="userCode"
          language="typescript"
          theme="vs-dark"
          height="300px"
          @change="onCodeChange"
          @mount="onEditorMount"
          ref="exerciseEditor"
        />
      </div>

      <!-- テスト結果表示 -->
      <Transition name="fade">
        <div v-if="testResults" class="test-results">
          <div class="results-header">
            <span v-if="testResults.allPassed" class="results-success">
              ✅ すべてのテストに合格！
            </span>
            <span v-else class="results-partial">
              📊 {{ testResults.passedCount }}/{{ testResults.totalCount }} テスト合格
            </span>
            <span class="execution-time">({{ testResults.executionTime }}ms)</span>
          </div>

          <div class="test-cases">
            <div 
              v-for="(result, index) in testResults.results" 
              :key="index"
              :class="['test-case', { 'passed': result.passed, 'failed': !result.passed }]"
            >
              <div class="test-case-header">
                <span class="test-status">{{ result.passed ? '✅' : '❌' }}</span>
                <span class="test-description">{{ result.description }}</span>
              </div>
              
              <div v-if="!result.passed" class="test-details">
                <div class="test-input">
                  <strong>入力:</strong> {{ formatTestValue(result.input) }}
                </div>
                <div class="test-expected">
                  <strong>期待値:</strong> {{ formatTestValue(result.expected) }}
                </div>
                <div class="test-actual">
                  <strong>実際の値:</strong> {{ formatTestValue(result.actual) }}
                </div>
                <div v-if="result.error" class="test-error">
                  <strong>エラー:</strong> {{ result.error }}
                </div>
              </div>
            </div>
          </div>

          <!-- 実行エラー表示 -->
          <div v-if="testResults.executionError" class="execution-error">
            <div class="error-header">❌ 実行エラー</div>
            <div class="error-message">{{ testResults.executionError }}</div>
          </div>
        </div>
      </Transition>

      <!-- 解答例表示 -->
      <div v-if="isCompleted || showSolution" class="solution-section">
        <div class="solution-header">
          <span class="solution-title">💡 解答例</span>
          <button 
            v-if="!isCompleted && !showSolution"
            @click="showSolution = true"
            class="show-solution-btn"
          >
            解答を見る
          </button>
        </div>
        
        <div v-if="isCompleted || showSolution" class="solution-content">
          <pre class="solution-code"><code>{{ exercise.solution }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MonacoCodeEditor from './MonacoCodeEditor.vue'
import type { ExerciseProblem, TestCase } from '@/types/learning'
import type * as monaco from 'monaco-editor'

interface Props {
  exercise: ExerciseProblem
  isCompleted: boolean
}

interface Emits {
  (e: 'exercise-completed'): void
  (e: 'exercise-attempted'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 状態管理
const userCode = ref(props.exercise.startCode)
const isRunning = ref(false)
const testResults = ref<TestResults | null>(null)
const showHints = ref(false)
const visibleHints = ref<string[]>([])
const showSolution = ref(false)
const hasAttempted = ref(false)
const exerciseEditor = ref<InstanceType<typeof MonacoCodeEditor> | null>(null)

// テスト結果の型定義
interface TestResults {
  allPassed: boolean
  passedCount: number
  totalCount: number
  executionTime: number
  results: TestCaseResult[]
  executionError?: string
}

interface TestCaseResult {
  passed: boolean
  description: string
  input: any
  expected: any
  actual: any
  error?: string
}

// 計算プロパティ
const isCompleted = computed(() => {
  return testResults.value?.allPassed === true
})

// メソッド
const toggleHints = () => {
  showHints.value = !showHints.value
  if (showHints.value && visibleHints.value.length === 0) {
    visibleHints.value = [props.exercise.hints[0]]
  }
}

const showMoreHints = () => {
  const nextIndex = visibleHints.value.length
  if (nextIndex < props.exercise.hints.length) {
    visibleHints.value.push(props.exercise.hints[nextIndex])
  }
}

const resetToStartCode = () => {
  userCode.value = props.exercise.startCode
  testResults.value = null
}

const formatCode = () => {
  if (exerciseEditor.value) {
    exerciseEditor.value.formatCode()
  }
}

const onEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
  setTimeout(() => editor.focus(), 100)
}

const onCodeChange = () => {
  if (testResults.value) {
    testResults.value = null
  }
}

// 深い等価性チェック
const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true
  if (a == null || b == null) return false
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    for (const key of keysA) {
      if (!keysB.includes(key)) return false
      if (!deepEqual(a[key], b[key])) return false
    }
    return true
  }
  return false
}

// 値のフォーマット
const formatTestValue = (value: any): string => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return `"${value}"`
  if (typeof value === 'object') return JSON.stringify(value, null, 2)
  return String(value)
}

// テスト実行機能（簡略化版）
const runTests = async () => {
  if (!userCode.value.trim()) {
    testResults.value = {
      allPassed: false,
      passedCount: 0,
      totalCount: props.exercise.testCases.length,
      executionTime: 0,
      results: [],
      executionError: 'コードが入力されていません'
    }
    return
  }

  isRunning.value = true
  hasAttempted.value = true
  emit('exercise-attempted')

  const startTime = performance.now()
  
  try {
    const results: TestCaseResult[] = []
    
    for (const testCase of props.exercise.testCases) {
      try {
        // 簡単な関数実行テスト
        const func = new Function('input', `
          ${userCode.value}
          if (typeof main === 'function') {
            return main(input);
          } else {
            throw new Error('main関数が定義されていません');
          }
        `)
        
        const actual = func(testCase.input)
        const passed = deepEqual(actual, testCase.expected)
        
        results.push({
          passed,
          description: testCase.description,
          input: testCase.input,
          expected: testCase.expected,
          actual
        })
      } catch (error) {
        results.push({
          passed: false,
          description: testCase.description,
          input: testCase.input,
          expected: testCase.expected,
          actual: null,
          error: error instanceof Error ? error.message : '不明なエラー'
        })
      }
    }
    
    const executionTime = Math.round(performance.now() - startTime)
    const passedCount = results.filter(r => r.passed).length
    const allPassed = passedCount === results.length

    testResults.value = {
      allPassed,
      passedCount,
      totalCount: results.length,
      executionTime,
      results
    }

    if (allPassed) {
      emit('exercise-completed')
    }

  } catch (error) {
    const executionTime = Math.round(performance.now() - startTime)
    testResults.value = {
      allPassed: false,
      passedCount: 0,
      totalCount: props.exercise.testCases.length,
      executionTime,
      results: [],
      executionError: error instanceof Error ? error.message : '不明なエラー'
    }
  } finally {
    isRunning.value = false
  }
}
</script>

<style scoped>
.exercise-panel {
  margin-top: 24px;
  border: 2px solid #9C27B0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, #9C27B0 0%, #E91E63 100%);
  color: white;
}

.exercise-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 1.1rem;
}

.exercise-content {
  padding: 20px;
}

.exercise-description {
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #9C27B0;
}

.hints-section {
  margin-bottom: 20px;
}

.hints-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background: #fff3e0;
  border: 1px solid #ffb74d;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.hints-list {
  margin-top: 12px;
  padding: 16px;
  background: #fff8e1;
  border-radius: 8px;
  border: 1px solid #ffb74d;
}

.hint-item {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  border-left: 3px solid #ffb74d;
}

.exercise-editor {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #9C27B0 0%, #E91E63 100%);
  color: white;
}

.editor-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  padding: 6px 12px;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.test-results {
  margin-bottom: 20px;
}

.results-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
  border: 1px solid #e0e0e0;
  font-weight: 600;
}

.test-cases {
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 8px 8px;
}

.test-case {
  border-bottom: 1px solid #e0e0e0;
}

.test-case.passed {
  background: #f1f8e9;
}

.test-case.failed {
  background: #fff5f5;
}

.test-case-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  font-weight: 500;
}

.solution-section {
  border-top: 2px solid #e0e0e0;
  padding-top: 20px;
}

.solution-code {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
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
</style>