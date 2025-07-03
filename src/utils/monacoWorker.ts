// Monaco Editor ワーカー設定の最適化
import * as monaco from 'monaco-editor'

// ワーカーファイルの設定を最適化
self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId: string, label: string) {
    // TypeScript用ワーカーのみ読み込み
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js'
    }
    // 基本的なエディタワーカー
    return './editor.worker.js'
  }
}

// TypeScript言語サービスの軽量化
export function configureMonacoForPerformance() {
  // TypeScript診断オプションを軽量化
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    noSuggestionDiagnostics: true,
    diagnosticCodesToIgnore: [
      1108, // return文の型エラー（学習用に緩和）
      2307, // モジュールが見つからない（学習用に緩和）
      2304, // 名前が見つからない（学習用に緩和）
      7006, // パラメーターの暗黙的any（学習用に緩和）
    ]
  })

  // コンパイラオプションを軽量化
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
    allowJs: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    allowSyntheticDefaultImports: true,
    // 学習用に緩い設定
    strict: false,
    noImplicitAny: false,
    noImplicitReturns: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
    skipLibCheck: true,
    lib: ['es2020', 'dom']
  })

  // 外部ライブラリの型定義を無効化（起動を高速化）
  monaco.languages.typescript.typescriptDefaults.setExtraLibs([])
}

export default configureMonacoForPerformance