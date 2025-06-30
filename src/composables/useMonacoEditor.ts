import { ref, computed } from 'vue'
import type { MonacoEditorOptions, CodeExecutionResult } from '@/types/learning'

export function useMonacoEditor() {
  // エディタの状態管理
  const editorCode = ref('')
  const isEditorReady = ref(false)
  const editorInstance = ref<any>(null)
  
  // 実行関連の状態
  const isRunning = ref(false)
  const executionResult = ref<CodeExecutionResult | null>(null)
  
  // エディタ設定
  const defaultOptions: MonacoEditorOptions = {
    fontSize: 14,
    lineNumbers: 'on',
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    tabSize: 2,
    insertSpaces: true,
    renderWhitespace: 'boundary'
  }

  // コード実行機能（学習用に簡略化）
  const executeCode = async (code: string): Promise<CodeExecutionResult> => {
    const startTime = Date.now()
    const logs: string[] = []
    const errors: string[] = []
    const warnings: string[] = []
    
    // console.logをキャプチャするモック
    const mockConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg => String(arg)).join(' '))
      },
      error: (...args: any[]) => {
        const errorMsg = args.map(arg => String(arg)).join(' ')
        logs.push(`ERROR: ${errorMsg}`)
        errors.push(errorMsg)
      },
      warn: (...args: any[]) => {
        const warnMsg = args.map(arg => String(arg)).join(' ')
        logs.push(`WARN: ${warnMsg}`)
        warnings.push(warnMsg)
      },
      info: (...args: any[]) => {
        logs.push(`INFO: ${args.map(arg => String(arg)).join(' ')}`)
      }
    }
    
    try {
      // 基本的なTypeScript→JavaScript変換
      // 実際の本格実装では、Monaco EditorのTypeScript Language Serviceを使用
      let jsCode = code
        .replace(/:\s*(string|number|boolean|any)\[\]/g, '') // 配列型注釈を削除
        .replace(/:\s*(string|number|boolean|any)/g, '')     // 基本型注釈を削除
        .replace(/interface\s+\w+\s*{[^}]*}/g, '')           // interface定義を削除
        .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')            // type定義を削除
      
      // 安全なコード実行
      const func = new Function('console', jsCode)
      func(mockConsole)
      
      const executionTime = Date.now() - startTime
      
      return {
        success: errors.length === 0,
        output: logs.join('\n') || '(出力なし)',
        errors,
        warnings,
        executionTime
      }
    } catch (error) {
      const executionTime = Date.now() - startTime
      const errorMessage = error instanceof Error ? error.message : '不明な実行エラー'
      
      return {
        success: false,
        output: logs.join('\n'),
        errors: [...errors, errorMessage],
        warnings,
        executionTime
      }
    }
  }

  // コード実行関数
  const runCode = async (code: string) => {
    isRunning.value = true
    try {
      const result = await executeCode(code)
      executionResult.value = result
      return result
    } finally {
      isRunning.value = false
    }
  }

  // エディタの初期化
  const initializeEditor = (code: string = '') => {
    editorCode.value = code
    isEditorReady.value = true
  }

  // コードリセット
  const resetCode = (originalCode: string) => {
    editorCode.value = originalCode
    executionResult.value = null
  }

  // フォーマット機能
  const formatCode = async () => {
    if (editorInstance.value) {
      try {
        await editorInstance.value.getAction('editor.action.formatDocument')?.run()
      } catch (error) {
        console.warn('フォーマットに失敗しました:', error)
      }
    }
  }

  // エラーチェック機能
  const checkErrors = () => {
    if (editorInstance.value) {
      const model = editorInstance.value.getModel()
      if (model) {
        // Monaco EditorのTypeScript Language Serviceから型エラーを取得
        const markers = monaco.editor.getModelMarkers({ resource: model.uri })
        const typeErrors = markers.filter(marker => marker.severity === monaco.MarkerSeverity.Error)
        
        if (typeErrors.length > 0) {
          console.log('型エラーが見つかりました:', typeErrors)
          return typeErrors
        } else {
          console.log('型エラーはありません')
          return []
        }
      }
    }
    return []
  }

  // 統計情報
  const codeStats = computed(() => {
    const code = editorCode.value
    return {
      lines: code.split('\n').length,
      characters: code.length,
      words: code.split(/\s+/).filter(word => word.length > 0).length
    }
  })

  // エディタの準備状況
  const isReady = computed(() => isEditorReady.value && editorCode.value !== '')

  return {
    // 状態
    editorCode,
    isEditorReady,
    editorInstance,
    isRunning,
    executionResult,
    
    // 設定
    defaultOptions,
    
    // 関数
    executeCode,
    runCode,
    initializeEditor,
    resetCode,
    formatCode,
    checkErrors,
    
    // 計算プロパティ
    codeStats,
    isReady
  }
}