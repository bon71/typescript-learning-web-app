<template>
  <div class="lesson-view">
    <!-- Navigation Header -->
    <div class="lesson-header">
      <div class="lesson-nav">
        <div class="nav-left">
          <button 
            @click="goToPhaseOverview"
            class="nav-button phase-back"
          >
            📚 フェーズ選択
          </button>
          <button 
            @click="goToPreviousLesson" 
            :disabled="!hasPreviousLesson"
            class="nav-button prev"
          >
            ← 前へ
          </button>
        </div>
        
        <div class="lesson-info">
          <h1 class="lesson-title">
            Day {{ lesson.day }}: {{ lesson.title }}
          </h1>
          <div class="lesson-meta">
            <span class="phase-badge phase-{{ lesson.phase }}">
              Phase {{ lesson.phase }}
            </span>
            <span class="difficulty-badge">{{ lesson.difficulty }}</span>
            <span class="time-badge">{{ lesson.estimatedTime }}分</span>
          </div>
        </div>
        
        <div class="nav-right">
          <button 
            @click="goToNextLesson" 
            :disabled="!hasNextLesson"
            class="nav-button next"
          >
            次へ →
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="lesson-content">
      <!-- Learning Content Area (Compact Top) -->
      <div class="content-section">
        <div class="content-grid">
          <div class="goal-card">
            <div class="card-header">
              <span class="card-icon">🎯</span>
              <h3>ゴール</h3>
            </div>
            <p class="card-content">{{ lesson.goal }}</p>
          </div>
          
          <div class="completion-card">
            <div class="card-header">
              <span class="card-icon">✅</span>
              <h3>完了条件</h3>
            </div>
            <p class="card-content">{{ lesson.completion }}</p>
          </div>
          
          <div class="task-card">
            <div class="card-header">
              <span class="card-icon">📝</span>
              <h3>課題内容</h3>
            </div>
            <p class="card-content">{{ lesson.task }}</p>
          </div>
          
          <div class="hints-card">
            <div class="card-header">
              <span class="card-icon">💡</span>
              <h3>ヒント</h3>
              <button 
                @click="toggleHints"
                class="toggle-button"
              >
                {{ showHints ? '隠す' : '表示' }}
              </button>
            </div>
            <div v-show="showHints" class="hints-content">
              <div v-if="currentHints.length > 0">
                <div 
                  v-for="(hint, index) in currentHints" 
                  :key="index"
                  class="hint-item"
                >
                  <span class="hint-number">{{ index + 1 }}</span>
                  <span class="hint-text">{{ hint }}</span>
                </div>
              </div>
              <div v-else>
                <p class="no-hints">このレッスンにはヒントがありません。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Code Editor & Auto Grader Area (Expanded Bottom) -->
      <div class="editor-section">
        <div class="editor-layout">
          <!-- Left: Code Editor & Output -->
          <div class="editor-pane" :style="{ width: editorWidth + '%' }">
            <!-- Code Editor Section -->
            <div class="code-section">
              <div class="editor-header">
                <div class="editor-title">
                  <span class="editor-icon">💻</span>
                  Code Editor
                </div>
                <div class="editor-controls">
                  <button @click="runCode" :disabled="isRunning" class="control-btn run">
                    <span v-if="isRunning">⏳</span>
                    <span v-else>▶️</span>
                    実行
                  </button>
                  <button @click="formatCode" class="control-btn format">
                    ✨ Format
                  </button>
                  <button @click="resetCode" class="control-btn reset">
                    🔄 Reset
                  </button>
                </div>
              </div>
              
              <div class="monaco-container">
                <BasicCodeEditor
                  ref="lessonEditor"
                  v-model:value="currentCode"
                  :height="'600px'"
                  :initial-code="getInitialCode()"
                  :show-output="false"
                  @change="onCodeChange"
                  @run="onCodeRun"
                />
              </div>
            </div>

            <!-- Output Section -->
            <div class="output-section">
              <div class="output-header">
                <span>実行結果</span>
                <button @click="clearOutput" class="clear-output-btn">クリア</button>
              </div>
              <div class="output-content">
                <div 
                  v-for="(entry, index) in outputEntries"
                  :key="index"
                  :class="['output-entry', entry.type]"
                >
                  {{ entry.message }}
                </div>
                <div v-if="outputEntries.length === 0" class="empty-output">
                  実行結果がここに表示されます
                </div>
              </div>
            </div>
          </div>


          <!-- Right: Compact Auto Grader Panel -->
          <div class="grader-pane compact" :style="{ width: (100 - editorWidth) + '%' }">
            <div v-if="hasAutoGrader" class="auto-grader-panel compact">
              <AutoGrader
                :exercise="autoGraderExercise"
                :test-cases="autoGraderTestCases"
                :current-code="currentCode"
                :show-hints="false"
                @evaluation-complete="handleEvaluationComplete"
                @evaluation-start="handleEvaluationStart"
              />
            </div>
            <div v-else class="no-grader-panel compact">
              <div class="no-grader-content">
                <div class="no-grader-icon">🎓</div>
                <h3>学習モード</h3>
                <p>このレッスンでは自動評価は利用できません。<br>左のエディタでコードを書いて実行してみてください。</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Progress Footer -->
    <div class="lesson-footer">
      <div class="lesson-footer-content">
        <div class="progress-section">
          <div class="progress-bar-container">
            <div class="progress-label">学習進捗</div>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ 
                  width: overallProgress + '%',
                  opacity: overallProgress > 0 ? 1 : 0.3 
                }"
              ></div>
            </div>
            <div class="progress-text">{{ progressStats.completedLessons }}/{{ progressStats.totalLessons }}</div>
          </div>
        </div>
        
        
        <div class="lesson-actions">
          <button 
            @click="toggleCompletion"
            :class="['completion-btn', { completed: isCompleted }]"
          >
            {{ isCompleted ? '✅ 完了済み' : '☐ 完了マーク' }}
          </button>
          
          <button 
            v-if="hasNextLesson"
            @click="goToNextLesson"
            class="next-lesson-btn"
          >
            次のレッスンへ →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getLessonByDay, allLessons } from '@/data'
import { useLearningProgress } from '@/composables/useLearningProgress'
import BasicCodeEditor from '@/components/BasicCodeEditor.vue'
import AutoGrader from '@/components/AutoGrader.vue'
import { getTestSuiteByDay } from '@/data/testCases'
import type { LessonContent } from '@/types/content'
import type { EvaluationResult } from '@/types/testing'

interface Props {
  id: number
}


const props = defineProps<Props>()
const router = useRouter()
const route = useRoute()

// Learning progress
const { isCompleted: isLessonCompleted, toggleCompletion: toggleLessonCompletion, progressStats } = useLearningProgress()

// Lesson data
const lesson = computed((): LessonContent => {
  const lessonData = getLessonByDay(props.id)
  if (!lessonData) {
    router.push('/')
    return allLessons[0] // Fallback
  }
  return lessonData
})

// 現在のレッスンのヒント
const currentHints = computed(() => {
  return lesson.value.hints || []
})

// Navigation
const currentLessonIndex = computed(() => 
  allLessons.findIndex(l => l.day === props.id)
)

const hasPreviousLesson = computed(() => currentLessonIndex.value > 0)
const hasNextLesson = computed(() => currentLessonIndex.value < allLessons.length - 1)

const goToPreviousLesson = () => {
  if (hasPreviousLesson.value) {
    const prevLesson = allLessons[currentLessonIndex.value - 1]
    router.push(`/lesson/${prevLesson.day}`)
  }
}

const goToNextLesson = () => {
  if (hasNextLesson.value) {
    const nextLesson = allLessons[currentLessonIndex.value + 1]
    router.push(`/lesson/${nextLesson.day}`)
  }
}

const goToPhaseOverview = () => {
  router.push('/phases')
}

// Progress calculations
const overallProgress = computed(() => progressStats.value.totalProgress)

const isCompleted = computed(() => 
  isLessonCompleted(props.id).value
)

const toggleCompletion = () => {
  toggleLessonCompletion(props.id)
}

// Auto Grader functionality
const hasAutoGrader = computed(() => {
  // Day 1-20 で自動評価機能を有効にする
  return props.id <= 20
})

const autoGraderTestSuite = computed(() => {
  return getTestSuiteByDay(props.id)
})

const autoGraderExercise = computed(() => {
  if (!autoGraderTestSuite.value) return null
  return autoGraderTestSuite.value.exercises[0] || null
})

const autoGraderTestCases = computed(() => {
  if (!autoGraderTestSuite.value) return []
  return autoGraderTestSuite.value.testCases
})

// Auto Grader event handlers
const handleEvaluationStart = () => {
  console.log('Auto grader evaluation started')
}

const handleEvaluationComplete = (result: EvaluationResult) => {
  console.log('Auto grader evaluation completed:', result)
  
  // 高スコアの場合は自動的に完了状態にする
  if (result.success && result.score >= 80 && !isCompleted.value) {
    toggleCompletion()
  }
}

// UI state
const showHints = ref(false)
const activeTab = ref('console')
const editorWidth = ref(65) // percentage - wider for better coding experience
const isRunning = ref(false)

// Toggle hints visibility
const toggleHints = () => {
  showHints.value = !showHints.value
}

// Editor state
const currentCode = ref('')
const outputEntries = ref<Array<{type: string, message: string}>>([])
const lessonEditor = ref()

// Output functionality
const clearOutput = () => {
  outputEntries.value = []
}

// Editor settings
const editorHeight = computed(() => 'calc(100vh - 300px)')

// Initialize code with sample
onMounted(() => {
  currentCode.value = getInitialCode()
})

// Watch for lesson changes and reset code
watch(() => props.id, (newId, oldId) => {
  if (newId !== oldId && newId) {
    console.log(`Lesson changed from ${oldId} to ${newId}`)
    // Reset code to new lesson's initial code
    currentCode.value = getInitialCode()
    
    // Also reset the editor component if it exists
    nextTick(() => {
      if (lessonEditor.value) {
        lessonEditor.value.setValue(getInitialCode())
      }
    })
    
    // Clear output when switching lessons
    outputEntries.value = []
  }
}, { immediate: false })

// Get initial code based on lesson content
const getInitialCode = (): string => {
  // 新しいinitialCodeプロパティを優先して使用
  if (lesson.value.initialCode) {
    return lesson.value.initialCode
  }
  
  if (lesson.value.sampleCode) {
    return lesson.value.sampleCode
  }
  
  // レッスン固有のデフォルトコードを生成
  switch (lesson.value.day) {
    case 1:
      return `// Day 1: 変数の宣言と基本型
// あなたの名前と年齢を変数に代入してください
let name = ""; // ここに名前を入力
const age = 0; // ここに年齢を入力

console.log("名前:", name);
console.log("年齢:", age);`
    
    case 2:
      return `// Day 2: 条件分岐と比較演算子
// 年齢に応じた出力を作成してください
const age = 20; // この値を変更して試してみてください

// if文を使って成人かどうかを判定
if (age >= 20) {
  console.log("成人です");
} else {
  console.log("未成年です");
}`
    
    case 3:
      return `// Day 3: 配列とループ
// 果物リストをすべて大文字にして出力してください
const fruits = ["apple", "banana", "orange"];

// ここに配列を大文字に変換するコードを書いてください
// ヒント: toUpperCase() メソッドを使用します`
    
    case 4:
      return `// Day 4: 関数の定義と使い方
// 挨拶をする関数を作成してください
function greet(name) {
  // ここに挨拶メッセージを返すコードを書いてください
}

// 関数を呼び出してテストしてください
greet("太郎");`
    
    case 5:
      return `// Day 5: オブジェクトの基本
// 人物の情報を表すオブジェクトを作成してください
const person = {
  name: "", // 名前を入力
  age: 0,   // 年齢を入力
  // 自己紹介メソッドを追加してください
};

console.log(person);`
    
    case 6:
      return `// Day 6: DOM操作とイベント
// ボタンクリック時の動作を実装してください
// 注意: このコードはブラウザ環境で動作します

// ボタンがクリックされた時の処理
function handleClick() {
  console.log("ボタンがクリックされました！");
  // ここに追加の処理を書いてください
}

// イベントリスナーの設定例
// document.getElementById("myButton").addEventListener("click", handleClick);`
    
    case 7:
      return `// Day 7: 総復習とミニアプリ
// これまで学んだことを組み合わせてミニアプリを作成してください
const tasks = []; // タスクリスト

function addTask(task) {
  // タスクを追加する関数
}

function showTasks() {
  // タスク一覧を表示する関数
}

// 使用例
addTask("TypeScriptを学ぶ");
showTasks();`

    // Phase 2: TypeScript基礎
    case 8:
      return `// Day 8: TypeScriptとは
// 型注釈を使って変数を定義してみましょう
let message: string = "Hello TypeScript";
let count: number = 0;
let isActive: boolean = true;

// JavaScriptとの違いを確認
// message = 123; // エラー：Type 'number' is not assignable to type 'string'

console.log(message);
console.log(typeof message);`

    case 9:
      return `// Day 9: 基本の型
// 基本型の型注釈を練習しましょう
let userName: string = ""; // 名前を入力してください
let userAge: number = 0;   // 年齢を入力してください
let isStudent: boolean = false; // 学生かどうか

// 配列の型定義
let scores: number[] = [85, 92, 78];
let subjects: string[] = ["Math", "English", "Science"];

console.log(\`\${userName}さんは\${userAge}歳です\`);`

    case 10:
      return `// Day 10: 配列とオブジェクトの型
// オブジェクトの型定義を練習しましょう
const user: {
  name: string;
  age: number;
  email: string;
} = {
  name: "", // 名前を入力
  age: 0,   // 年齢を入力
  email: "" // メールアドレスを入力
};

// 配列とオブジェクトの組み合わせ
const users: Array<{name: string, age: number}> = [];

console.log(user);`

    case 11:
      return `// Day 11: 関数に型をつける
// 型安全な関数を作成しましょう
function calculateTotal(price: number, tax: number): number {
  // 税込み価格を計算して返してください
  return 0; // ここを実装してください
}

// アロー関数での型定義
const greetUser = (name: string, age: number): string => {
  // 挨拶メッセージを返してください
  return "";
};

// 関数を呼び出してテスト
console.log(calculateTotal(1000, 0.1));`

    case 12:
      return `// Day 12: Union型とLiteral型
// Union型とLiteral型を練習しましょう
type Status = "pending" | "approved" | "rejected";
type Priority = "low" | "medium" | "high";

let taskStatus: Status = "pending";
let taskPriority: Priority = "medium";

// Union型の関数
function processTask(status: Status, priority: Priority): string {
  // statusとpriorityに応じたメッセージを返してください
  return "";
}

console.log(processTask(taskStatus, taskPriority));`

    case 13:
      return `// Day 13: Interfaceと継承
// Interfaceを使った型定義を練習しましょう
interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  permissions: string[];
}

// オブジェクトを作成してください
const regularUser: User = {
  // プロパティを実装してください
};

const adminUser: Admin = {
  // プロパティを実装してください
};

console.log(regularUser, adminUser);`

    case 14:
      return `// Day 14: クラスとTypeScript
// TypeScriptでクラスを定義しましょう
class Task {
  private id: number;
  public title: string;
  public completed: boolean;

  constructor(id: number, title: string) {
    // コンストラクタを実装してください
  }

  public complete(): void {
    // タスクを完了状態にするメソッド
  }

  public getStatus(): string {
    // タスクの状態を返すメソッド
    return "";
  }
}

// クラスのインスタンスを作成してテスト
const task = new Task(1, "TypeScriptを学ぶ");`

    // Phase 3: 実践応用
    case 15:
      return `// Day 15: Generics
// ジェネリクスを使った関数を作成しましょう
function createArray<T>(length: number, value: T): T[] {
  // 指定された長さと値で配列を作成してください
  return [];
}

// ジェネリクスを使ったインターフェース
interface Repository<T> {
  items: T[];
  add(item: T): void;
  findById(id: number): T | undefined;
}

// 使用例
const numbers = createArray(3, 0);
const strings = createArray(2, "hello");

console.log(numbers, strings);`

    case 16:
      return `// Day 16: 型ガード
// 型ガードを使った安全な型チェック
type User = { type: "user"; name: string; email: string };
type Admin = { type: "admin"; name: string; permissions: string[] };
type Person = User | Admin;

// 型ガード関数
function isAdmin(person: Person): person is Admin {
  // Adminかどうかを判定してください
  return false;
}

function handlePerson(person: Person): string {
  if (isAdmin(person)) {
    // ここではpersonはAdmin型として扱われます
    return \`Admin: \${person.name}\`;
  } else {
    // ここではpersonはUser型として扱われます
    return \`User: \${person.name}\`;
  }
}

// テスト用データ
const testPerson: Person = { type: "user", name: "太郎", email: "taro@example.com" };`

    case 17:
      return `// Day 17: Promiseと非同期処理
// 非同期処理とPromiseの型定義
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 非同期関数の型定義
async function fetchUserData(userId: number): Promise<ApiResponse<User>> {
  // ユーザーデータを取得する非同期関数を実装
  return {
    success: true,
    data: { id: userId, name: "サンプルユーザー", email: "user@example.com" }
  };
}

// 非同期処理の使用例
async function main() {
  try {
    const response = await fetchUserData(1);
    if (response.success) {
      console.log("ユーザー:", response.data);
    }
  } catch (error) {
    console.error("エラー:", error);
  }
}

main();`

    case 18:
      return `// Day 18: Utility Types
// TypeScriptの便利なUtility Typesを練習
interface FullUser {
  id: number;
  name: string;
  email: string;
  age: number;
  address: string;
}

// Utility Typesの使用例
type PartialUser = Partial<FullUser>;      // すべてのプロパティがオプション
type RequiredUser = Required<PartialUser>; // すべてのプロパティが必須
type UserSummary = Pick<FullUser, "id" | "name" | "email">; // 特定のプロパティのみ
type UserWithoutId = Omit<FullUser, "id">; // 特定のプロパティを除外

// 実際の使用例
function updateUser(id: number, updates: PartialUser): FullUser {
  // ユーザー情報を部分的に更新する関数
  return {} as FullUser; // 実装してください
}

const userSummary: UserSummary = {
  id: 1,
  name: "太郎",
  email: "taro@example.com"
};`

    case 19:
      return `// Day 19: API設計
// TypeScriptでのAPI設計パターン
interface BaseResponse {
  success: boolean;
  timestamp: string;
}

interface SuccessResponse<T> extends BaseResponse {
  success: true;
  data: T;
}

interface ErrorResponse extends BaseResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// API関数の型定義
class ApiClient {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    // GET リクエストを実装してください
    return {
      success: true,
      data: {} as T,
      timestamp: new Date().toISOString()
    };
  }

  async post<T, U>(endpoint: string, data: T): Promise<ApiResponse<U>> {
    // POST リクエストを実装してください
    return {} as ApiResponse<U>;
  }
}

// 使用例
const api = new ApiClient();`

    case 20:
      return `// Day 20: 総仕上げミニプロジェクト
// TypeScriptの機能を組み合わせたミニプロジェクト
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

class TaskManager<T extends Task = Task> {
  private tasks: T[] = [];
  private nextId = 1;

  addTask(taskData: Omit<T, "id" | "createdAt">): T {
    // 新しいタスクを追加する実装
    return {} as T;
  }

  getTasks(): T[] {
    return this.tasks;
  }

  updateTask(id: number, updates: Partial<T>): T | null {
    // タスクを更新する実装
    return null;
  }

  deleteTask(id: number): boolean {
    // タスクを削除する実装
    return false;
  }

  getTasksByPriority(priority: T["priority"]): T[] {
    // 優先度でフィルタする実装
    return [];
  }
}

// 使用例
const taskManager = new TaskManager<Task>();
// ここでTaskManagerを使ってみてください`
    
    default:
      return '// Write your TypeScript code here\nconsole.log("Hello, World!");'
  }
}

// Editor methods
const resetCode = () => {
  if (lessonEditor.value) {
    lessonEditor.value.setValue(getInitialCode())
  }
}

const formatCode = () => {
  if (lessonEditor.value) {
    lessonEditor.value.formatCode()
  }
}

const runCode = async () => {
  if (isRunning.value) return
  
  isRunning.value = true
  try {
    // Clear previous output
    outputEntries.value = []
    
    // Execute the code through the editor
    if (lessonEditor.value) {
      await lessonEditor.value.runCode()
    }
  } catch (error) {
    console.error('Error running code:', error)
    outputEntries.value = [{
      type: 'error',
      message: `実行エラー: ${error.message || error}`
    }]
  } finally {
    isRunning.value = false
  }
}


// Event handlers
const onCodeChange = (newCode: string) => {
  console.log('Code changed to:', newCode)
  currentCode.value = newCode
}

const onCodeRun = (result: any) => {
  console.log('Code execution result:', result)
  
  // 実行結果をoutputEntriesに反映
  if (result.output && Array.isArray(result.output)) {
    outputEntries.value = [...result.output]
  } else if (result.error) {
    outputEntries.value = [{
      type: 'error',
      message: `実行エラー: ${result.error.message || result.error}`
    }]
  } else if (!result.success) {
    outputEntries.value = [{
      type: 'error',
      message: '実行に失敗しました'
    }]
  }
}



</script>

<style scoped>
.lesson-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
}

/* Navigation Header */
.lesson-header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.lesson-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

.nav-left,
.nav-right {
  display: flex;
  gap: 1rem;
  align-items: center;
  min-width: 200px;
}

.nav-right {
  justify-content: flex-end;
}

.nav-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  min-width: 100px;
}

.nav-button:hover:not(:disabled) {
  background: #5a6fd8;
  transform: translateY(-1px);
}

.nav-button:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  transform: none;
}

.nav-button.phase-back {
  background: #10b981;
  border: 2px solid #10b981;
}

.nav-button.phase-back:hover {
  background: #059669;
  border-color: #059669;
}

.lesson-info {
  text-align: center;
  flex: 1;
  margin: 0 2rem;
}

.lesson-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.lesson-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.phase-badge {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.difficulty-badge {
  background: #fbbf24;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.time-badge {
  background: #10b981;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Main Content */
.lesson-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Important for flex overflow */
  margin-bottom: 0;
}

/* Content Section - Compact layout */
.content-section {
  flex-shrink: 0;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  min-height: 200px;
  width: 100%;
  box-sizing: border-box;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: start;
}

.goal-card,
.completion-card,
.task-card,
.hints-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 1.2rem;
}

.card-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  flex: 1;
}

.toggle-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
}

.card-content {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.hints-content {
  margin-top: 1rem;
}

.hint-item {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  align-items: flex-start;
}

.hint-number {
  background: #667eea;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}

.hint-text {
  color: #64748b;
  line-height: 1.5;
}

.no-hints {
  color: #94a3b8;
  font-style: italic;
  text-align: center;
  margin: 1rem 0;
}


/* Editor Section - Expanded to take more space */
.editor-section {
  flex: 1;
  background: #f8fafc;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 0;
}

.editor-layout {
  display: flex;
  flex: 1;
  min-height: 0;
}

.editor-pane {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #334155;
  border-bottom: 1px solid #475569;
}

.editor-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 500;
}

.editor-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  background: #475569;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.control-btn:hover {
  background: #64748b;
}

.control-btn.run {
  background: #10b981;
}

.control-btn.run:hover {
  background: #059669;
}

.control-btn.run.running {
  background: #fbbf24;
}

.control-btn.format {
  background: #667eea;
}

.control-btn.format:hover {
  background: #5a6fd8;
}

.control-btn.reset:hover {
  background: #ef4444;
}

.monaco-container {
  flex: 1;
  overflow: hidden;
}

/* Output Section */
.output-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-top: 1px solid #334155;
  min-height: 200px;
}

.output-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
  color: #1e293b;
}

.clear-output-btn {
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.clear-output-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.output-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  background: #ffffff;
}

.output-entry {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.125rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.output-entry.log {
  color: #1e293b;
}

.output-entry.error {
  background: #fef2f2;
  color: #dc2626;
  border-left: 3px solid #dc2626;
}

.output-entry.warn {
  background: #fffbeb;
  color: #d97706;
  border-left: 3px solid #d97706;
}

.output-entry.info {
  background: #eff6ff;
  color: #2563eb;
  border-left: 3px solid #2563eb;
}

.empty-output {
  color: #94a3b8;
  font-style: italic;
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 8px;
  margin: 1rem;
}

/* Output Pane */
.output-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  min-width: 300px;
}

.output-tabs {
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.tab-btn {
  background: transparent;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #64748b;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  position: relative;
}

.tab-btn:hover {
  color: #1e293b;
  background: #f1f5f9;
}

.tab-btn.active {
  color: #667eea;
  border-bottom-color: #667eea;
  background: white;
}

.error-count {
  background: #ef4444;
  color: white;
  border-radius: 10px;
  padding: 0.125rem 0.5rem;
  font-size: 0.7rem;
  margin-left: 0.5rem;
}

.tab-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Console Panel */
.console-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.console-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
}

.clear-btn {
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.clear-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.console-output {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.console-entry {
  display: flex;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.125rem;
}

.console-entry.log {
  color: #1e293b;
}

.console-entry.error {
  background: #fef2f2;
  color: #dc2626;
}

.console-entry.warn {
  background: #fffbeb;
  color: #d97706;
}

.console-entry.info {
  background: #eff6ff;
  color: #2563eb;
}

.timestamp {
  color: #64748b;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.message {
  flex: 1;
  word-break: break-all;
}

/* Errors Panel */
.errors-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.errors-header {
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
}

.errors-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.error-item {
  display: flex;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.error-item:hover {
  background: #f8fafc;
}

.error-severity {
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
}

.severity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.severity-dot.error { background: #dc2626; }
.severity-dot.warning { background: #d97706; }
.severity-dot.info { background: #2563eb; }
.severity-dot.hint { background: #64748b; }

.error-details {
  flex: 1;
}

.error-message {
  font-size: 0.9rem;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.error-location {
  font-size: 0.8rem;
  color: #64748b;
}

/* Explanation Panel */
.explanation-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.explanation-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
}

.explanation-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.explanation-content p {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* Empty States */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: #64748b;
  font-style: italic;
}

/* Progress Footer */
.lesson-footer {
  background: white;
  border-top: 2px solid #e2e8f0;
  padding: 1.5rem 2rem;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
}

.lesson-footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  gap: 2rem;
}

.progress-section {
  flex: 1;
  max-width: 400px;
}

.progress-bar-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-label {
  font-size: 0.9rem;
  color: #64748b;
  white-space: nowrap;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  transition: width 0.3s ease;
  min-width: 2px; /* 最小幅を設定して0%でも見えるように */
}

.progress-text {
  font-size: 0.9rem;
  color: #64748b;
  white-space: nowrap;
}

.lesson-actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.completion-btn {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  color: #64748b;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.completion-btn.completed {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.completion-btn:hover {
  border-color: #10b981;
  color: #10b981;
}

.completion-btn.completed:hover {
  background: #059669;
  border-color: #059669;
}

.next-lesson-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.next-lesson-btn:hover {
  background: #5a6fd8;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  
  .editor-layout {
    flex-direction: column;
  }
  
  .editor-pane {
    width: 100% !important;
    height: 50%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    border-radius: 8px 8px 0 0;
  }
  
  .grader-pane {
    width: 100% !important;
    border-left: none;
    border-top: 1px solid #e2e8f0;
    border-radius: 0 0 8px 8px;
  }
  
  .output-pane {
    height: 50%;
  }
  
  .lesson-footer-content {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .progress-section {
    max-width: none;
  }
  
  .lesson-actions {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .lesson-nav {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-left,
  .nav-right {
    min-width: auto;
    justify-content: center;
  }
  
  .lesson-info {
    margin: 0;
  }
  
  .lesson-title {
    font-size: 1.25rem;
  }
  
  .lesson-meta {
    justify-content: center;
  }
  
  .content-section {
    padding: 1rem;
    min-height: 280px;
  }
  
  .editor-section {
    min-height: 350px;
    padding-bottom: 0.75rem;
  }
  
  .grader-pane {
    width: 100% !important;
    border-left: none;
    border-top: 1px solid #e2e8f0;
    border-radius: 0 0 8px 8px;
  }
  
  .auto-grader-panel.compact {
    padding: 0.5rem;
  }
  
  .lesson-footer {
    padding: 1.25rem 1rem;
    margin-top: 0.5rem;
  }
  
  .lesson-footer-content {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .progress-section {
    max-width: none;
  }
  
  .lesson-actions {
    justify-content: center;
  }
}

/* Grader Panel */
.grader-pane {
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
}

.auto-grader-panel {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.no-grader-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.no-grader-content {
  text-align: center;
  color: #64748b;
}

.no-grader-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-grader-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.75rem;
}

.no-grader-content p {
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

/* Code and Output Section Styles */
.code-section {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  min-height: 300px;
}

.output-section {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  min-height: 200px;
}

.output-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
  color: #1e293b;
}

.output-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  background: #ffffff;
}

.output-entry {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.125rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.output-entry.log {
  color: #1e293b;
}

.output-entry.error {
  background: #fef2f2;
  color: #dc2626;
  border-left: 3px solid #dc2626;
}

.output-entry.warn {
  background: #fffbeb;
  color: #d97706;
  border-left: 3px solid #d97706;
}

.output-entry.info {
  background: #eff6ff;
  color: #2563eb;
  border-left: 3px solid #2563eb;
}

.clear-output-btn {
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.clear-output-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.empty-output {
  color: #94a3b8;
  font-style: italic;
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 8px;
  margin: 1rem;
}

/* Compact Grader Panel Styles */
.grader-pane.compact {
  background: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.auto-grader-panel.compact {
  flex: 1;
  padding: 0.75rem;
  overflow-y: auto;
}

.no-grader-panel.compact {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

</style>