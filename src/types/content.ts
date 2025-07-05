// 基本レッスンコンテンツの型定義
export interface LessonContent {
  readonly day: number
  readonly title: string
  readonly goal: string
  readonly completion: string
  readonly task: string
  readonly phase: number
  readonly initialCode?: string // BasicCodeEditor用の初期コード
  readonly sampleCode?: string
  readonly explanation?: string
  readonly difficulty?: 'beginner' | 'intermediate' | 'advanced'
  readonly estimatedTime?: number // 分単位
  readonly tags?: readonly string[] // 学習トピックタグ
  readonly prerequisites?: readonly number[] // 前提となる日（day番号）
  readonly hints?: readonly string[] // 学習ヒント
  // 演習機能拡張
  readonly exerciseCode?: string // 演習用初期コード
  readonly exerciseHints?: readonly string[] // 演習専用ヒント
  readonly testCases?: readonly TestCase[] // 自動評価用テストケース
  readonly exerciseDifficulty?: 'easy' | 'medium' | 'hard'
}

// フェーズ情報の型定義
export interface PhaseContent {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly color: string
  readonly duration: string
  readonly difficulty: 'beginner' | 'intermediate' | 'advanced'
  readonly totalLessons: number
  readonly skills: readonly string[] // 習得できるスキル
  readonly prerequisites?: readonly string[] // 前提知識
}

// テストケースの型定義
export interface TestCase {
  readonly id: string
  readonly description: string
  readonly testFunction: string // 実行する関数（文字列形式）
  readonly expectedResult?: any
  readonly timeout?: number // タイムアウト（ミリ秒）
}

// テスト結果の型定義  
export interface TestResult {
  readonly testId: string
  readonly description: string
  readonly passed: boolean
  readonly actualOutput?: any
  readonly expectedOutput?: any
  readonly errorMessage?: string
  readonly executionTime?: number
}

// 演習実行結果の型定義
export interface ExerciseResult {
  readonly success: boolean
  readonly output: string[]
  readonly errors: string[]
  readonly testResults: TestResult[]
  readonly executionTime: number
}

// 将来拡張用：演習問題の型定義
export interface ExerciseContent {
  readonly id: string
  readonly day: number
  readonly title: string
  readonly description: string
  readonly startingCode: string
  readonly expectedOutput: string
  readonly hints: readonly string[]
  readonly solution: string
}

// 既存の型との互換性を保つためのエイリアス
export type LearningDay = LessonContent
export type PhaseInfo = PhaseContent

// コンテンツ統計の型定義
export interface ContentStatistics {
  readonly totalLessons: number
  readonly totalPhases: number
  readonly phase1Lessons: number
  readonly phase2Lessons: number
  readonly phase3Lessons: number
  readonly averageTimePerLesson: number
  readonly totalEstimatedTime: number
}