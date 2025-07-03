// TypeScript自動評価機能の型定義

export interface Exercise {
  id: string
  title: string
  description: string
  starterCode: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface TestCase {
  id: string
  description: string
  inputCode?: string
  expectedOutput?: string
  expectedReturnValue?: any
  expectedCompileErrors?: string[]
  timeoutMs: number
}

export interface CompileError {
  message: string
  line: number
  column: number
  severity: 'error' | 'warning' | 'info'
}

export interface RuntimeError {
  message: string
  stack?: string
  line?: number
}

export interface OutputComparison {
  expected: string
  actual: string
  matches: boolean
  normalizedExpected?: string
  normalizedActual?: string
}

export interface FeedbackMessage {
  type: 'success' | 'warning' | 'error' | 'info'
  message: string
  line?: number
  column?: number
  suggestion?: string
}

export interface EvaluationResult {
  success: boolean
  score: number // 0-100
  compileErrors: CompileError[]
  runtimeErrors: RuntimeError[]
  outputComparison: OutputComparison
  feedback: FeedbackMessage[]
  suggestions: string[]
  executionTime: number
  passedTests: number
  totalTests: number
}

export interface TestSuite {
  id: string
  day: number
  title: string
  description: string
  exercises: Exercise[]
  testCases: TestCase[]
}

export interface GraderConfig {
  timeout: number
  maxExecutionTime: number
  enableTypeChecking: boolean
  enableConsoleCapture: boolean
  sandboxMode: 'function' | 'webworker' | 'iframe'
}

export interface ExecutionContext {
  code: string
  timeout: number
  captureConsole: boolean
  allowedGlobals: string[]
  restrictedAPIs: string[]
}

export interface CodeExecutionResult {
  success: boolean
  output: string[]
  returnValue?: any
  error?: RuntimeError
  executionTime: number
  memoryUsage?: number
}

// ユーティリティ型
export type TestStatus = 'pending' | 'running' | 'passed' | 'failed' | 'error'
export type GraderMode = 'interactive' | 'batch' | 'continuous'

// 段階的セキュリティレベル
export type SecurityLevel = 'basic' | 'medium' | 'high'

export interface SecurityConfig {
  level: SecurityLevel
  allowedAPIs: string[]
  blockedAPIs: string[]
  maxExecutionTime: number
  maxMemoryUsage: number
}