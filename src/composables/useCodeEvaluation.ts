import { ref, nextTick } from 'vue'
import type { 
  EvaluationResult, 
  TestCase, 
  CompileError, 
  RuntimeError, 
  OutputComparison, 
  FeedbackMessage,
  CodeExecutionResult,
  ExecutionContext,
  GraderConfig
} from '@/types/testing'

// デフォルト設定
const defaultConfig: GraderConfig = {
  timeout: 5000,
  maxExecutionTime: 1000,
  enableTypeChecking: true,
  enableConsoleCapture: true,
  sandboxMode: 'function'
}

export function useCodeEvaluation(config: Partial<GraderConfig> = {}) {
  const evaluationConfig = { ...defaultConfig, ...config }
  const isEvaluating = ref(false)
  const lastResult = ref<EvaluationResult | null>(null)

  // コンソール出力をキャプチャするためのユーティリティ
  function captureConsoleOutput(code: string): Promise<CodeExecutionResult> {
    return new Promise((resolve) => {
      const outputs: string[] = []
      let returnValue: any = undefined
      let error: RuntimeError | undefined
      const startTime = performance.now()

      // console.logをオーバーライド
      const originalConsoleLog = console.log
      const originalConsoleError = console.error
      const originalConsoleWarn = console.warn

      const capturedConsole = {
        log: (...args: any[]) => {
          outputs.push(args.map(arg => String(arg)).join(' '))
        },
        error: (...args: any[]) => {
          outputs.push(`ERROR: ${args.map(arg => String(arg)).join(' ')}`)
        },
        warn: (...args: any[]) => {
          outputs.push(`WARN: ${args.map(arg => String(arg)).join(' ')}`)
        }
      }

      // タイムアウト設定
      const timeoutId = setTimeout(() => {
        error = {
          message: 'コードの実行がタイムアウトしました',
          stack: 'TimeoutError: 実行時間が制限を超えました'
        }
        resolve({
          success: false,
          output: outputs,
          returnValue,
          error,
          executionTime: performance.now() - startTime
        })
      }, evaluationConfig.maxExecutionTime)

      try {
        // 安全な実行環境を作成
        // より安全なコード実行方法（BasicCodeEditorと同じ方式）
        const originalConsole = (globalThis as any).console
        
        // 一時的にconsoleを置き換え
        ;(globalThis as any).console = capturedConsole
        
        try {
          // 直接evalで実行
          returnValue = eval(code)
        } finally {
          // consoleを元に戻す
          ;(globalThis as any).console = originalConsole
        }

        clearTimeout(timeoutId)
        
        resolve({
          success: true,
          output: outputs,
          returnValue,
          executionTime: performance.now() - startTime
        })
      } catch (err: any) {
        clearTimeout(timeoutId)
        
        error = {
          message: err.message || 'コード実行中にエラーが発生しました',
          stack: err.stack
        }

        resolve({
          success: false,
          output: outputs,
          returnValue,
          error,
          executionTime: performance.now() - startTime
        })
      } finally {
        // console.logを元に戻す
        console.log = originalConsoleLog
        console.error = originalConsoleError
        console.warn = originalConsoleWarn
      }
    })
  }

  // TypeScriptコンパイルエラーをチェック（簡易版）
  function checkCompileErrors(code: string): CompileError[] {
    const errors: CompileError[] = []
    
    // 基本的な構文エラーをチェック
    try {
      new Function(code)
    } catch (err: any) {
      errors.push({
        message: err.message || 'コンパイルエラーが発生しました',
        line: 1,
        column: 1,
        severity: 'error'
      })
    }

    // 基本的なTypeScript構文チェック
    const commonErrors = [
      {
        pattern: /let\s+(\w+)\s*=\s*(\w+)\s*=\s*/g,
        message: '変数の重複代入があります'
      },
      {
        pattern: /const\s+(\w+);\s*\1\s*=/g,
        message: 'const変数に再代入しようとしています'
      },
      {
        pattern: /function\s+(\w+)\s*\(\s*\)\s*\{\s*\}/g,
        message: '関数の実装が空です'
      }
    ]

    commonErrors.forEach(({ pattern, message }) => {
      if (pattern.test(code)) {
        errors.push({
          message,
          line: 1,
          column: 1,
          severity: 'warning'
        })
      }
    })

    return errors
  }

  // 出力比較
  function compareOutput(expected: string, actual: string[]): OutputComparison {
    const actualString = actual.join('\n')
    const normalizedExpected = expected.replace(/\\n/g, '\n').trim()
    const normalizedActual = actualString.trim()
    
    return {
      expected: normalizedExpected,
      actual: normalizedActual,
      matches: normalizedExpected === normalizedActual,
      normalizedExpected,
      normalizedActual
    }
  }

  // フィードバック生成
  function generateFeedback(
    result: CodeExecutionResult,
    testCase: TestCase,
    compileErrors: CompileError[]
  ): FeedbackMessage[] {
    const feedback: FeedbackMessage[] = []

    // コンパイルエラーがある場合
    if (compileErrors.length > 0) {
      feedback.push({
        type: 'error',
        message: 'コードにエラーがあります。まず構文を確認してください。',
        suggestion: '変数の宣言や関数の定義を再確認してみてください。'
      })
      return feedback
    }

    // 実行時エラーがある場合
    if (result.error) {
      feedback.push({
        type: 'error',
        message: `実行時エラー: ${result.error.message}`,
        suggestion: 'コードの論理を見直し、エラーの原因を特定してください。'
      })
      return feedback
    }

    // 出力比較
    if (testCase.expectedOutput) {
      const outputComparison = compareOutput(testCase.expectedOutput, result.output)
      
      if (outputComparison.matches) {
        feedback.push({
          type: 'success',
          message: '期待された出力と一致しています！'
        })
      } else {
        feedback.push({
          type: 'warning',
          message: '出力が期待されたものと異なります',
          suggestion: `期待値: "${outputComparison.expected}", 実際の値: "${outputComparison.actual}"`
        })
      }
    }

    // 戻り値比較
    if (testCase.expectedReturnValue !== undefined) {
      if (result.returnValue === testCase.expectedReturnValue) {
        feedback.push({
          type: 'success',
          message: '関数の戻り値が正しいです！'
        })
      } else {
        feedback.push({
          type: 'warning',
          message: '関数の戻り値が期待値と異なります',
          suggestion: `期待値: ${testCase.expectedReturnValue}, 実際の値: ${result.returnValue}`
        })
      }
    }

    // 実行時間の評価
    if (result.executionTime > 500) {
      feedback.push({
        type: 'info',
        message: `実行時間: ${result.executionTime.toFixed(2)}ms`,
        suggestion: 'コードの効率性を改善できるかもしれません。'
      })
    }

    return feedback
  }

  // スコア計算
  function calculateScore(
    compileErrors: CompileError[],
    runtimeErrors: RuntimeError[],
    outputComparison: OutputComparison,
    testCase: TestCase,
    result: CodeExecutionResult
  ): number {
    let score = 100

    // コンパイルエラーペナルティ
    if (compileErrors.length > 0) {
      score -= 40
    }

    // 実行時エラーペナルティ
    if (runtimeErrors.length > 0) {
      score -= 30
    }

    // 出力不一致ペナルティ
    if (testCase.expectedOutput && !outputComparison.matches) {
      score -= 20
    }

    // 戻り値不一致ペナルティ
    if (testCase.expectedReturnValue !== undefined && 
        result.returnValue !== testCase.expectedReturnValue) {
      score -= 20
    }

    return Math.max(0, score)
  }

  // メイン評価関数
  async function evaluateCode(code: string, testCases: TestCase[]): Promise<EvaluationResult> {
    isEvaluating.value = true

    try {
      // 空のコードチェック
      if (!code.trim()) {
        return {
          success: false,
          score: 0,
          compileErrors: [],
          runtimeErrors: [],
          outputComparison: { expected: '', actual: '', matches: false },
          feedback: [{
            type: 'error',
            message: 'コードが入力されていません',
            suggestion: 'まずは簡単なコードから始めてみましょう。'
          }],
          suggestions: ['console.log("Hello World")から始めてみてください'],
          executionTime: 0,
          passedTests: 0,
          totalTests: testCases.length
        }
      }

      // コンパイルエラーチェック
      const compileErrors = checkCompileErrors(code)
      
      // 最初のテストケースで評価（簡易実装）
      const firstTestCase = testCases[0]
      if (!firstTestCase) {
        throw new Error('テストケースが見つかりません')
      }

      // コード実行
      const executionResult = await captureConsoleOutput(code)
      
      const runtimeErrors = executionResult.error ? [executionResult.error] : []
      const outputComparison = firstTestCase.expectedOutput 
        ? compareOutput(firstTestCase.expectedOutput, executionResult.output)
        : { expected: '', actual: executionResult.output.join('\n'), matches: true }

      // フィードバック生成
      const feedback = generateFeedback(executionResult, firstTestCase, compileErrors)
      
      // スコア計算
      const score = calculateScore(
        compileErrors, 
        runtimeErrors, 
        outputComparison, 
        firstTestCase, 
        executionResult
      )

      // 成功判定
      const success = compileErrors.length === 0 && 
                     runtimeErrors.length === 0 && 
                     outputComparison.matches

      const result: EvaluationResult = {
        success,
        score,
        compileErrors,
        runtimeErrors,
        outputComparison,
        feedback,
        suggestions: success 
          ? ['素晴らしいです！次のレッスンに進みましょう。'] 
          : ['コードを見直して、エラーを修正してみてください。'],
        executionTime: executionResult.executionTime,
        passedTests: success ? 1 : 0,
        totalTests: testCases.length
      }

      lastResult.value = result
      return result

    } catch (error: any) {
      const errorResult: EvaluationResult = {
        success: false,
        score: 0,
        compileErrors: [],
        runtimeErrors: [{
          message: error.message || '予期しないエラーが発生しました',
          stack: error.stack
        }],
        outputComparison: { expected: '', actual: '', matches: false },
        feedback: [{
          type: 'error',
          message: '評価中にエラーが発生しました',
          suggestion: 'コードを確認してもう一度試してください。'
        }],
        suggestions: ['コードの構文を確認してください'],
        executionTime: 0,
        passedTests: 0,
        totalTests: testCases.length
      }

      lastResult.value = errorResult
      return errorResult
    } finally {
      isEvaluating.value = false
    }
  }

  return {
    evaluateCode,
    isEvaluating,
    lastResult,
    config: evaluationConfig
  }
}