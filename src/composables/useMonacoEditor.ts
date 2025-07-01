import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { 
  initializeMonacoForLearning, 
  getEditorOptions, 
  LearningLevel,
  LearningLevels 
} from '@/utils/monacoConfig'

export interface UseMonacoEditorOptions {
  value?: string
  language?: string
  theme?: string
  height?: string
  width?: string
  learningLevel?: LearningLevel
  readOnly?: boolean
  onChange?: (value: string) => void
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void
}

export interface ExecutionResult {
  output: string[]
  errors: string[]
  warnings: string[]
  executionTime: number
  success: boolean
}

export function useMonacoEditor(options: UseMonacoEditorOptions = {}) {
  const editorContainer = ref<HTMLElement>()
  const editor = ref<monaco.editor.IStandaloneCodeEditor>()
  const isLoading = ref(true)
  const currentValue = ref(options.value || '')
  const errors = ref<monaco.editor.IMarker[]>([])
  const isExecuting = ref(false)
  const executionResult = ref<ExecutionResult | null>(null)

  // 学習レベル（Phase 1: Beginner, Phase 2: Intermediate, Phase 3: Advanced）
  const learningLevel = ref<LearningLevel>(options.learningLevel || LearningLevels.BEGINNER)

  // エディタの初期化
  const initializeEditor = async () => {
    if (!editorContainer.value) return

    try {
      // Monaco環境の初期化
      initializeMonacoForLearning(learningLevel.value)

      // エディタオプションの取得
      const editorOptions = getEditorOptions(learningLevel.value)

      // エディタインスタンスの作成
      editor.value = monaco.editor.create(editorContainer.value, {
        ...editorOptions,
        value: currentValue.value,
        language: options.language || 'typescript',
        theme: options.theme || 'learning-dark',
        readOnly: options.readOnly || false
      })

      // 値の変更を監視
      editor.value.onDidChangeModelContent(() => {
        if (editor.value) {
          const newValue = editor.value.getValue()
          currentValue.value = newValue
          options.onChange?.(newValue)
          
          // エラーを更新
          updateErrors()
        }
      })

      // エディタマウント時のコールバック
      options.onMount?.(editor.value)

      isLoading.value = false
    } catch (error) {
      console.error('Monaco Editor初期化エラー:', error)
      isLoading.value = false
    }
  }

  // エラー情報の更新
  const updateErrors = () => {
    if (!editor.value) return

    const model = editor.value.getModel()
    if (!model) return

    // TypeScriptのエラーマーカーを取得
    const uri = model.uri
    const markers = monaco.editor.getModelMarkers({ resource: uri })
    errors.value = markers
  }

  // 値の設定
  const setValue = (value: string) => {
    if (editor.value) {
      editor.value.setValue(value)
      currentValue.value = value
    }
  }

  // 値の取得
  const getValue = (): string => {
    return editor.value?.getValue() || currentValue.value
  }

  // 学習レベルの変更
  const setLearningLevel = (level: LearningLevel) => {
    learningLevel.value = level
    
    if (editor.value) {
      // エディタオプションを更新
      const newOptions = getEditorOptions(level)
      editor.value.updateOptions(newOptions)
      
      // TypeScript設定を更新
      initializeMonacoForLearning(level)
      
      // エラーを再チェック
      setTimeout(updateErrors, 500)
    }
  }

  // 簡単なコード実行機能（学習用・安全性重視）
  const executeCode = async (): Promise<ExecutionResult> => {
    isExecuting.value = true
    
    const startTime = Date.now()
    const logs: string[] = []
    const errors: string[] = []
    const warnings: string[] = []

    try {
      const code = getValue()
      
      // 危険なコードのチェック
      if (containsUnsafeCode(code)) {
        errors.push('安全でないコードが検出されました')
        return {
          output: logs,
          errors,
          warnings,
          executionTime: Date.now() - startTime,
          success: false
        }
      }

      // コンソール出力をキャプチャ
      const mockConsole = {
        log: (...args: any[]) => logs.push(formatConsoleOutput('log', args)),
        error: (...args: any[]) => logs.push(formatConsoleOutput('error', args)),
        warn: (...args: any[]) => logs.push(formatConsoleOutput('warn', args)),
        info: (...args: any[]) => logs.push(formatConsoleOutput('info', args))
      }

      // TypeScriptコードをJavaScriptに変換
      const jsCode = await transpileTypeScript(code)
      
      // 安全な実行環境で実行
      const executeWithTimeout = (code: string, timeout: number = 5000) => {
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            reject(new Error('実行時間が制限を超えました（5秒）'))
          }, timeout)

          try {
            // 関数として実行（より安全）
            const func = new Function('console', jsCode)
            func(mockConsole)
            clearTimeout(timer)
            resolve(undefined)
          } catch (error) {
            clearTimeout(timer)
            reject(error)
          }
        })
      }

      await executeWithTimeout(jsCode)

      return {
        output: logs,
        errors,
        warnings,
        executionTime: Date.now() - startTime,
        success: true
      }

    } catch (error) {
      errors.push(error instanceof Error ? error.message : '実行エラーが発生しました')
      
      return {
        output: logs,
        errors,
        warnings,
        executionTime: Date.now() - startTime,
        success: false
      }
    } finally {
      isExecuting.value = false
    }
  }

  // TypeScriptコードをJavaScriptに変換
  const transpileTypeScript = async (code: string): Promise<string> => {
    try {
      // Monaco EditorのTypeScriptサービスを使用
      const worker = await monaco.languages.typescript.getTypeScriptWorker()
      const client = await worker()
      
      // 仮想ファイルを作成
      const uri = monaco.Uri.parse('ts:learning.ts')
      const model = monaco.editor.createModel(code, 'typescript', uri)
      
      // JavaScript出力を取得
      const result = await client.getEmitOutput(uri.toString())
      
      // モデルを破棄
      model.dispose()
      
      if (result.outputFiles.length > 0) {
        return result.outputFiles[0].text
      } else {
        throw new Error('TypeScriptの変換に失敗しました')
      }
    } catch (error) {
      // フォールバック: 基本的な変換
      console.warn('TypeScript変換エラー、基本変換を使用:', error)
      return code.replace(/:\s*\w+(\[\])?/g, '').replace(/interface\s+\w+\s*{[^}]*}/g, '')
    }
  }

  // 危険なコードのチェック
  const containsUnsafeCode = (code: string): boolean => {
    const unsafePatterns = [
      /while\s*\(\s*true\s*\)/g,      // 無限ループ
      /for\s*\(\s*;\s*;\s*\)/g,       // 無限ループ
      /eval\s*\(/g,                   // eval使用
      /Function\s*\(/g,               // Function constructor
      /setTimeout\s*\(/g,             // setTimeout
      /setInterval\s*\(/g,            // setInterval
      /fetch\s*\(/g,                  // fetch API
      /XMLHttpRequest/g,              // XMLHttpRequest
      /localStorage/g,                // localStorage
      /sessionStorage/g,              // sessionStorage
      /document\./g,                  // DOM操作
      /window\./g,                    // window操作
      /import\s/g,                    // import文
      /require\s*\(/g                 // require関数
    ]

    return unsafePatterns.some(pattern => pattern.test(code))
  }

  // コンソール出力のフォーマット
  const formatConsoleOutput = (type: string, args: any[]): string => {
    const timestamp = new Date().toLocaleTimeString()
    const content = args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2)
        } catch {
          return String(arg)
        }
      }
      return String(arg)
    }).join(' ')
    
    return `[${timestamp}] ${type.toUpperCase()}: ${content}`
  }

  // エディタにフォーカス
  const focus = () => {
    editor.value?.focus()
  }

  // エディタをリサイズ
  const resize = () => {
    editor.value?.layout()
  }

  // フォーマット実行
  const formatCode = () => {
    if (editor.value) {
      editor.value.getAction('editor.action.formatDocument')?.run()
    }
  }

  // テーマの変更
  const setTheme = (theme: string) => {
    monaco.editor.setTheme(theme)
  }

  // 読み取り専用モードの切り替え
  const setReadOnly = (readOnly: boolean) => {
    editor.value?.updateOptions({ readOnly })
  }

  // カーソル位置の設定
  const setCursorPosition = (line: number, column: number) => {
    if (editor.value) {
      editor.value.setPosition({ lineNumber: line, column })
      editor.value.revealLineInCenter(line)
    }
  }

  // 行をハイライト
  const highlightLine = (line: number) => {
    if (editor.value) {
      editor.value.deltaDecorations([], [{
        range: new monaco.Range(line, 1, line, 1),
        options: {
          isWholeLine: true,
          className: 'learning-highlight-line',
          glyphMarginClassName: 'learning-highlight-glyph'
        }
      }])
    }
  }

  // プロパティの監視
  watch(() => options.value, (newValue) => {
    if (newValue !== undefined && newValue !== currentValue.value) {
      setValue(newValue)
    }
  })

  // ライフサイクル
  onMounted(async () => {
    await nextTick()
    await initializeEditor()
  })

  onUnmounted(() => {
    editor.value?.dispose()
  })

  return {
    // リアクティブプロパティ
    editorContainer,
    editor,
    isLoading,
    currentValue,
    errors,
    isExecuting,
    executionResult,
    learningLevel,

    // メソッド
    setValue,
    getValue,
    setLearningLevel,
    executeCode,
    focus,
    resize,
    formatCode,
    setTheme,
    setReadOnly,
    setCursorPosition,
    highlightLine,
    updateErrors
  }
}