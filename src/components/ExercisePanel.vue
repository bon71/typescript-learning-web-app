<template>
  <div class="exercise-panel">
    <!-- モード切り替えタブ -->
    <div class="mode-toggle">
      <button
        :class="{ active: mode === 'learn' }"
        @click="mode = 'learn'"
        class="mode-button"
      >
        📚 学習モード
      </button>
      <button
        :class="{ active: mode === 'exercise' }"
        @click="mode = 'exercise'"
        class="mode-button"
      >
        💻 演習モード
      </button>
    </div>

    <!-- 学習モード（既存コンテンツ） -->
    <div v-if="mode === 'learn'" class="learn-content">
      <div class="content-header">
        <h3>{{ lesson.title }}</h3>
        <div class="difficulty-badge" :class="lesson.difficulty">
          {{ getDifficultyLabel(lesson.difficulty) }}
        </div>
      </div>
      
      <div class="goal-section">
        <p><strong>目標:</strong> {{ lesson.goal }}</p>
        <p><strong>タスク:</strong> {{ lesson.task }}</p>
      </div>

      <!-- 既存のBasicCodeEditor（学習用） -->
      <div class="code-editor">
        <BasicCodeEditor
          :value="lesson.sampleCode || ''"
          :height="'400px'"
        />
      </div>

      <div class="explanation">
        <h4>解説</h4>
        <p>{{ lesson.explanation }}</p>
      </div>
    </div>

    <!-- 演習モード -->
    <div v-if="mode === 'exercise' && lesson.exerciseCode" class="exercise-content">
      <div class="exercise-header">
        <div class="exercise-title">
          <span class="exercise-icon">🎯</span>
          <span>{{ lesson.title }} - 実践演習</span>
        </div>
        <div class="exercise-status">
          <span v-if="isCompleted" class="status-completed">✅ 完了</span>
          <span v-else-if="hasAttempted" class="status-attempted">📝 挑戦中</span>
          <span v-else class="status-not-started">🏁 未開始</span>
        </div>
      </div>

      <div class="exercise-layout">
        <!-- メインエディタエリア -->
        <div class="editor-area" :class="{ 'fullscreen': isFullscreen }">
          <div class="exercise-editor" :class="{ 'fullscreen-editor': isFullscreen }">
            <div class="editor-header">
              <span class="editor-title">💻 あなたの解答</span>
              <div class="editor-controls">
                <button @click="resetToStartCode" class="control-btn reset-btn">
                  🔄 初期コードに戻す
                </button>
                <button @click="runTests" :disabled="isRunning" class="control-btn test-btn">
                  {{ isRunning ? '⏳ 実行中...' : '🧪 テスト実行' }}
                </button>
                <button @click="toggleFullscreen" class="control-btn fullscreen-btn">
                  {{ isFullscreen ? '🗗 通常表示' : '🗖 拡大表示' }}
                </button>
              </div>
            </div>

            <BasicCodeEditor
              v-model:value="userCode"
              :height="isFullscreen ? 'calc(100vh - 120px)' : '400px'"
              @run="handleCodeExecution"
            />
          </div>

          <!-- 実行結果表示 -->
          <div v-if="exerciseResult && !isFullscreen" class="exercise-result">
            <h4>実行結果</h4>
            <div class="output-section">
              <div v-for="(output, index) in exerciseResult.output" :key="index" class="output-line">
                {{ output }}
              </div>
              <div v-for="(error, index) in exerciseResult.errors" :key="index" class="error-line">
                ❌ {{ error }}
              </div>
            </div>
          </div>

          <!-- テスト結果表示 -->
          <div v-if="testResults.length > 0 && !isFullscreen" class="test-results">
            <h4>テスト結果</h4>
            <div class="test-list">
              <div 
                v-for="result in testResults" 
                :key="result.testId"
                class="test-item"
                :class="{ passed: result.passed, failed: !result.passed }"
              >
                <span class="test-icon">{{ result.passed ? '✅' : '❌' }}</span>
                <span class="test-description">{{ result.description }}</span>
                <div v-if="result.errorMessage" class="test-error">
                  {{ result.errorMessage }}
                </div>
              </div>
            </div>
            
            <!-- 成功メッセージ -->
            <div v-if="isCompleted" class="success-message">
              🎉 すべてのテストに合格しました！素晴らしい実装です！
            </div>
          </div>
        </div>

        <!-- サイドバー（ヒント） -->
        <div class="sidebar" v-show="!isFullscreen">
          <HintSystem 
            v-if="lesson.exerciseHints" 
            :hints="lesson.exerciseHints"
            :maxRevealed="revealedHints"
            @reveal-hint="revealNextHint"
          />
        </div>
      </div>

      <!-- フルスクリーンモード時の結果表示 -->
      <div v-if="isFullscreen" class="fullscreen-results">
        <div class="fullscreen-results-header">
          <h3>📊 実行結果とテスト</h3>
          <button @click="toggleFullscreen" class="close-fullscreen-btn">
            ❌ フルスクリーンを閉じる
          </button>
        </div>
        
        <div class="fullscreen-results-content">
          <!-- 実行結果 -->
          <div v-if="exerciseResult" class="fullscreen-exercise-result">
            <h4>🖥️ 実行結果</h4>
            <div class="output-section">
              <div v-for="(output, index) in exerciseResult.output" :key="index" class="output-line">
                {{ output }}
              </div>
              <div v-for="(error, index) in exerciseResult.errors" :key="index" class="error-line">
                ❌ {{ error }}
              </div>
            </div>
          </div>

          <!-- テスト結果 -->
          <div v-if="testResults.length > 0" class="fullscreen-test-results">
            <h4>🧪 テスト結果</h4>
            <div class="test-list">
              <div 
                v-for="result in testResults" 
                :key="result.testId"
                class="test-item"
                :class="{ passed: result.passed, failed: !result.passed }"
              >
                <span class="test-icon">{{ result.passed ? '✅' : '❌' }}</span>
                <span class="test-description">{{ result.description }}</span>
                <div v-if="result.errorMessage" class="test-error">
                  {{ result.errorMessage }}
                </div>
              </div>
            </div>
            
            <!-- 成功メッセージ -->
            <div v-if="isCompleted" class="success-message">
              🎉 すべてのテストに合格しました！素晴らしい実装です！
            </div>
          </div>

          <!-- ヒント表示 -->
          <div v-if="lesson.exerciseHints" class="fullscreen-hints">
            <h4>💡 ヒント</h4>
            <HintSystem 
              :hints="lesson.exerciseHints"
              :maxRevealed="revealedHints"
              @reveal-hint="revealNextHint"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 演習モードがない場合の表示 -->
    <div v-if="mode === 'exercise' && !lesson.exerciseCode" class="no-exercise">
      <div class="no-exercise-content">
        <h3>💡 演習問題準備中</h3>
        <p>このレッスンの演習問題は現在準備中です。</p>
        <p>学習モードで内容を確認してください。</p>
        <button @click="mode = 'learn'" class="back-to-learn">
          📚 学習モードに戻る
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { LessonContent, TestResult, ExerciseResult } from '@/types/content'
import BasicCodeEditor from './BasicCodeEditor.vue'
import HintSystem from './HintSystem.vue'

interface Props {
  lesson: LessonContent
}

interface Emits {
  (e: 'exercise-completed', day: number): void
  (e: 'exercise-attempted', day: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 状態管理
const mode = ref<'learn' | 'exercise'>('learn')
const userCode = ref(props.lesson.exerciseCode || '')
const isRunning = ref(false)
const testResults = ref<TestResult[]>([])
const exerciseResult = ref<ExerciseResult | null>(null)
const hasAttempted = ref(false)
const revealedHints = ref(0)
const isFullscreen = ref(false)

// 計算プロパティ
const isCompleted = computed(() => {
  return testResults.value.length > 0 && testResults.value.every(test => test.passed)
})

// レッスンが変更されたときの処理
watch(() => props.lesson, (newLesson) => {
  userCode.value = newLesson.exerciseCode || ''
  exerciseResult.value = null
  testResults.value = []
  revealedHints.value = 0
  mode.value = 'learn'
  hasAttempted.value = false
  isFullscreen.value = false
}, { immediate: true })

// 難易度ラベルを取得する関数
function getDifficultyLabel(difficulty?: string): string {
  const labels = {
    'beginner': '初級',
    'intermediate': '中級', 
    'advanced': '上級',
    'easy': '簡単',
    'medium': '普通',
    'hard': '難しい'
  }
  return labels[difficulty as keyof typeof labels] || '不明'
}

// 演習リセット機能
function resetToStartCode() {
  userCode.value = props.lesson.exerciseCode || ''
  exerciseResult.value = null
  testResults.value = []
  hasAttempted.value = false
}

// ヒント表示機能
function revealNextHint() {
  if (props.lesson.exerciseHints && revealedHints.value < props.lesson.exerciseHints.length) {
    revealedHints.value++
  }
}

// フルスクリーンモード切り替え機能
function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
  
  // フルスクリーンの状態に応じてbodyのスクロールを制御
  if (isFullscreen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// BasicCodeEditorからのイベントハンドラ
function handleCodeExecution(result: any) {
  console.log('Code execution result:', result)
}

// 演習を実行する関数
async function runTests() {
  if (!props.lesson.testCases || isRunning.value) return
  
  isRunning.value = true
  hasAttempted.value = true
  exerciseResult.value = null
  testResults.value = []

  try {
    // コード実行と結果取得
    const result = await executeExerciseCode(userCode.value)
    exerciseResult.value = result

    // テストケース実行
    if (result.success) {
      const tests = await runTestCases(userCode.value, props.lesson.testCases)
      testResults.value = tests
      
      // すべてのテストに合格した場合
      if (tests.every(test => test.passed)) {
        emit('exercise-completed', props.lesson.day)
      }
    }
    
    emit('exercise-attempted', props.lesson.day)
  } catch (error) {
    exerciseResult.value = {
      success: false,
      output: [],
      errors: [error instanceof Error ? error.message : String(error)],
      testResults: [],
      executionTime: 0
    }
  } finally {
    isRunning.value = false
  }
}

// コード実行機能
async function executeExerciseCode(code: string): Promise<ExerciseResult> {
  return new Promise((resolve) => {
    const startTime = Date.now()
    const capturedOutput: string[] = []
    const capturedErrors: string[] = []

    // console.logをキャプチャ
    const originalLog = console.log
    console.log = (...args: any[]) => {
      capturedOutput.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
      originalLog(...args)
    }

    try {
      // 安全なコード実行
      eval(code)
      
      const executionTime = Date.now() - startTime
      resolve({
        success: true,
        output: capturedOutput,
        errors: capturedErrors,
        testResults: [],
        executionTime
      })
    } catch (error) {
      const executionTime = Date.now() - startTime
      capturedErrors.push(error instanceof Error ? error.message : String(error))
      
      resolve({
        success: false,
        output: capturedOutput,
        errors: capturedErrors,
        testResults: [],
        executionTime
      })
    } finally {
      // console.logを復元
      console.log = originalLog
    }
  })
}

// テストケース実行機能
async function runTestCases(code: string, testCases: any[]): Promise<TestResult[]> {
  const results: TestResult[] = []

  for (const testCase of testCases) {
    try {
      // コードを実行して変数を取得
      const context: any = {}
      const wrappedCode = `
        ${code}
        // テスト用の変数をcontextオブジェクトに保存
        if (typeof myName !== 'undefined') context.myName = myName;
        if (typeof myAge !== 'undefined') context.myAge = myAge;
        if (typeof myHobby !== 'undefined') context.myHobby = myHobby;
        if (typeof introduction !== 'undefined') context.introduction = introduction;
        if (typeof score !== 'undefined') context.score = score;
        if (typeof grade !== 'undefined') context.grade = grade;
        if (typeof numbers !== 'undefined') context.numbers = numbers;
        if (typeof doubledNumbers !== 'undefined') context.doubledNumbers = doubledNumbers;
        if (typeof calculateAverage !== 'undefined') context.calculateAverage = calculateAverage;
        if (typeof countCharacters !== 'undefined') context.countCharacters = countCharacters;
        if (typeof product !== 'undefined') context.product = product;
        if (typeof incrementCounter !== 'undefined') context.incrementCounter = incrementCounter;
        if (typeof addTask !== 'undefined') context.addTask = addTask;
      `
      
      eval(wrappedCode)
      
      // テスト関数を実行
      const testFunction = new Function(
        'myName', 'myAge', 'myHobby', 'introduction', 'score', 'grade', 
        'numbers', 'doubledNumbers', 'calculateAverage', 'countCharacters',
        'product', 'incrementCounter', 'addTask',
        `return ${testCase.testFunction}`
      )
      
      const testResult = testFunction(
        context.myName, context.myAge, context.myHobby, context.introduction,
        context.score, context.grade, context.numbers, context.doubledNumbers,
        context.calculateAverage, context.countCharacters, context.product,
        context.incrementCounter, context.addTask
      )

      results.push({
        testId: testCase.id,
        description: testCase.description,
        passed: Boolean(testResult),
        actualOutput: testResult,
        expectedOutput: true
      })
    } catch (error) {
      results.push({
        testId: testCase.id,
        description: testCase.description,
        passed: false,
        errorMessage: error instanceof Error ? error.message : String(error)
      })
    }
  }

  return results
}

// ESCキーでフルスクリーンを終了
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isFullscreen.value) {
    toggleFullscreen()
  }
}

// ライフサイクルフック
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  // コンポーネント破棄時にbodyのスタイルを復元
  document.body.style.overflow = ''
})
</script>

<style scoped>
.exercise-panel {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.mode-toggle {
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.mode-button {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.mode-button:hover {
  background: #f1f5f9;
}

.mode-button.active {
  background: #ffffff;
  border-bottom-color: #667eea;
  color: #667eea;
}

.learn-content,
.exercise-content {
  padding: 2rem;
}

.content-header,
.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.content-header h3,
.exercise-header h3 {
  margin: 0;
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
}

.exercise-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 1.1rem;
}

.difficulty-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.difficulty-badge.beginner,
.difficulty-badge.easy {
  background: #dcfce7;
  color: #166534;
}

.difficulty-badge.intermediate,
.difficulty-badge.medium {
  background: #fef3c7;
  color: #92400e;
}

.difficulty-badge.advanced,
.difficulty-badge.hard {
  background: #fee2e2;
  color: #991b1b;
}

.goal-section {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.goal-section p {
  margin: 0.5rem 0;
}

.exercise-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.editor-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.exercise-editor {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.editor-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  background: rgba(255,255,255,0.2);
}

.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.exercise-result {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.exercise-result h4 {
  margin: 0 0 1rem 0;
  color: #1e293b;
}

.output-section {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 0.9rem;
}

.output-line {
  color: #059669;
  margin: 0.25rem 0;
}

.error-line {
  color: #dc2626;
  margin: 0.25rem 0;
}

.test-results {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.test-results h4 {
  margin: 0 0 1rem 0;
  color: #1e293b;
}

.test-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.test-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.test-item.passed {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.test-item.failed {
  background: #fef2f2;
  border-color: #fecaca;
}

.test-icon {
  font-size: 1rem;
  line-height: 1;
}

.test-description {
  flex: 1;
  font-size: 0.9rem;
  color: #374151;
}

.test-error {
  font-size: 0.8rem;
  color: #dc2626;
  margin-top: 0.25rem;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
}

.success-message {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  margin-top: 1rem;
}

.sidebar {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
}

.explanation {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.explanation h4 {
  margin: 0 0 1rem 0;
  color: #1e293b;
}

.explanation p {
  margin: 0;
  line-height: 1.6;
  color: #475569;
}

.no-exercise {
  padding: 2rem;
  text-align: center;
}

.no-exercise-content {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
  border: 2px dashed #cbd5e1;
}

.no-exercise-content h3 {
  margin: 0 0 1rem 0;
  color: #64748b;
}

.no-exercise-content p {
  margin: 0.5rem 0;
  color: #64748b;
}

.back-to-learn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;
  transition: all 0.2s;
}

.back-to-learn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

@media (max-width: 1024px) {
  .exercise-layout {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    order: -1;
  }
}

/* フルスクリーンモード用スタイル */
.editor-area.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.exercise-editor.fullscreen-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 0;
}

.fullscreen-editor .editor-header {
  border-radius: 0;
}

.fullscreen-results {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: white;
  border-left: 2px solid #e2e8f0;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.fullscreen-results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.fullscreen-results-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.close-fullscreen-btn {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.close-fullscreen-btn:hover {
  background: rgba(255,255,255,0.3);
}

.fullscreen-results-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fullscreen-exercise-result,
.fullscreen-test-results,
.fullscreen-hints {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
}

.fullscreen-exercise-result h4,
.fullscreen-test-results h4,
.fullscreen-hints h4 {
  margin: 0 0 1rem 0;
  color: #1e293b;
  font-size: 1rem;
}

.fullscreen-btn {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
}

.fullscreen-btn:hover:not(:disabled) {
  background: rgba(255,255,255,0.3);
}

/* フルスクリーンモード時のエディタ調整 */
.editor-area.fullscreen .exercise-editor {
  margin-right: 400px; /* 結果パネルの幅分 */
}

@media (max-width: 1200px) {
  .fullscreen-results {
    width: 300px;
  }
  
  .editor-area.fullscreen .exercise-editor {
    margin-right: 300px;
  }
}

@media (max-width: 768px) {
  .learn-content,
  .exercise-content {
    padding: 1rem;
  }
  
  .content-header,
  .exercise-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .editor-controls {
    flex-direction: column;
  }
  
  /* モバイルでは結果パネルを下部に配置 */
  .fullscreen-results {
    top: auto;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 50vh;
    border-left: none;
    border-top: 2px solid #e2e8f0;
  }
  
  .editor-area.fullscreen .exercise-editor {
    margin-right: 0;
    margin-bottom: 50vh;
  }
  
  .fullscreen-results-content {
    flex-direction: row;
    overflow-x: auto;
  }
  
  .fullscreen-exercise-result,
  .fullscreen-test-results,
  .fullscreen-hints {
    min-width: 250px;
    flex-shrink: 0;
  }
}
</style>