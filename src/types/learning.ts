// 演習機能用の型定義
export interface Exercise {
  description: string
  startCode: string
  solution: string
  hints: string[]
  testCases: TestCase[]
}

export interface TestCase {
  input: any
  expected: any
  description: string
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
}

export interface ProgressStats {
  totalProgress: number
  completedDays: number
  remainingDays: number
  phase1Progress: number
  phase2Progress: number
  phase3Progress: number
  studyStreak: number
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
  theme?: 'vs-dark' | 'vs-light' | 'hc-black'
  readOnly?: boolean
  height?: string
  width?: string
  options?: MonacoEditorOptions
}

export interface MonacoEditorOptions {
  fontSize?: number
  lineNumbers?: 'on' | 'off' | 'relative' | 'interval'
  minimap?: {
    enabled: boolean
  }
  automaticLayout?: boolean
  scrollBeyondLastLine?: boolean
  wordWrap?: 'off' | 'on' | 'wordWrapColumn' | 'bounded'
  tabSize?: number
  insertSpaces?: boolean
  renderWhitespace?: 'none' | 'boundary' | 'selection' | 'all'
}

export interface MonacoEditorEmits {
  (e: 'update:value', value: string): void
  (e: 'change', value: string): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'format'): void
  (e: 'error-check'): void
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
}