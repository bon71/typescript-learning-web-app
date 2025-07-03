// 演習機能用の型定義
export interface Exercise {
  description: string
  startCode: string
  solution: string
  hints: string[]
  testCases: TestCase[]
}

export interface TestCase {
  id: string
  description: string
  input?: any
  expectedOutput?: any
  testFunction?: string  // テスト関数のコード
}

// LearningDay インターフェースの拡張
export interface LearningDay {
  day: number
  title: string
  goal: string
  completion: string
  task: string
  phase: number
  sampleCode?: string
  explanation?: string
  exercise?: Exercise
  exerciseCode?: string  // 🆕 演習用の初期コード
  testCases?: TestCase[] // 🆕 自動評価用テストケース
  hints?: string[]       // 🆕 段階的ヒント
  difficulty?: 'easy' | 'medium' | 'hard' // 🆕 難易度
  // 自動評価機能対応
  exercises?: import('@/types/testing').Exercise[]  // 自動評価用演習
  autoGraderTests?: import('@/types/testing').TestCase[]  // 自動評価用テストケース
  enableAutoGrader?: boolean  // 自動評価機能を有効にするかどうか
}

export interface ProgressStats {
  totalProgress: number
  completedDays: number
  remainingDays: number
  phase1Progress: number
  phase2Progress: number
  phase3Progress: number
  studyStreak: number
  exercisesCompleted?: number // 🆕 完了した演習数
  codingTime?: number         // 🆕 コーディング時間（分）
  errorsEncountered?: number  // 🆕 遭遇したエラー数
}

export interface PhaseInfo {
  id: number
  title: string
  description: string
  color: string
}

// Monaco Editor用の型定義
export interface MonacoEditorProps {
  value: string
  language: string
  theme?: 'vs-dark' | 'vs-light' | 'hc-black' | 'learning-dark' | 'learning-light'
  readOnly?: boolean
  height?: string
  width?: string
  options?: MonacoEditorOptions
  learningLevel?: 'beginner' | 'intermediate' | 'advanced'
  autoExecute?: boolean
  showErrorPanel?: boolean
  showResultPanel?: boolean
}

export interface MonacoEditorOptions {
  fontSize?: number
  lineNumbers?: 'on' | 'off' | 'relative' | 'interval'
  minimap?: {
    enabled: boolean
    maxColumn?: number
  }
  automaticLayout?: boolean
  scrollBeyondLastLine?: boolean
  wordWrap?: 'off' | 'on' | 'wordWrapColumn' | 'bounded'
  tabSize?: number
  insertSpaces?: boolean
  renderWhitespace?: 'none' | 'boundary' | 'selection' | 'all'
  quickSuggestions?: boolean | {
    other: boolean
    comments: boolean
    strings: boolean
  }
  parameterHints?: {
    enabled: boolean
  }
  folding?: boolean
  glyphMargin?: boolean
}

export interface MonacoEditorEmits {
  (e: 'update:value', value: string): void
  (e: 'change', value: string): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'format'): void
  (e: 'error-check'): void
  (e: 'execute', result: ExecutionResult): void
  (e: 'mount', editor: any): void
}

export interface ExecutionResult {
  output: string[]
  errors: string[]
  warnings: string[]
  executionTime: number
  success: boolean
  testResults?: TestResult[]
}

export interface TestResult {
  testId: string
  passed: boolean
  actualOutput?: any
  expectedOutput?: any
  errorMessage?: string
}

export interface CodeExecutionResult {
  success: boolean
  output: string
  errors: string[]
  warnings: string[]
  executionTime: number
}

export interface LearningCodeSession {
  code: string
  lastModified: Date
  errors: number
  completionStatus: 'not-started' | 'in-progress' | 'completed'
  executionCount?: number
  learningTime?: number
}

// エディタ設定用
export interface EditorSettings {
  theme: 'light' | 'dark'
  fontSize: number
  enableAutocompletion: boolean
  enableErrorChecking: boolean
  learningLevel: 'beginner' | 'intermediate' | 'advanced'
}