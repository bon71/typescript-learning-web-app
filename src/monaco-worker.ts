// Monaco Editor Worker設定
import * as monaco from 'monaco-editor'

// WorkerのURLを設定
self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId: string, label: string) {
    if (label === 'json') {
      return './json.worker.bundle.js'
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.bundle.js'
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js'
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js'
    }
    return './editor.worker.bundle.js'
  }
}

// TypeScript用の追加設定
export function setupMonacoEnvironment() {
  // TypeScript コンパイラ設定
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
  
  // 学習用TypeScript設定
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    noEmit: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    strict: true,
    noImplicitAny: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    noImplicitReturns: true,
    noImplicitThis: true,
    // 学習用なので一部の厳密なチェックを緩和
    noUnusedLocals: false,
    noUnusedParameters: false,
    noImplicitOverride: false
  })

  // 学習用の型定義を追加
  const learningLibDts = `
// === 基本的なブラウザAPI（学習用簡略版） ===
interface Console {
  log(...data: any[]): void;
  error(...data: any[]): void;
  warn(...data: any[]): void;
  info(...data: any[]): void;
  clear(): void;
}
declare const console: Console;

// === 学習用の基本型定義 ===
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role?: 'admin' | 'user' | 'guest';
  createdAt?: Date;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock?: boolean;
}

// === DOM API（学習用簡略版） ===
interface HTMLElement {
  textContent: string | null;
  innerHTML: string;
  value?: string;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
  click(): void;
}

interface Document {
  getElementById(id: string): HTMLElement | null;
  createElement(tagName: string): HTMLElement;
  querySelector(selector: string): HTMLElement | null;
  querySelectorAll(selector: string): HTMLElement[];
}

declare const document: Document;

// === 学習用のサンプルデータ ===
declare const sampleUsers: User[];
declare const sampleProducts: Product[];
`

  // 型定義をMonacoに追加
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    learningLibDts,
    'file:///learning-lib.d.ts'
  )

  // 診断設定
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    onlyVisible: false
  })
}

// エディタのテーマ設定
export function setupCustomThemes() {
  // 学習用カスタムダークテーマ
  monaco.editor.defineTheme('learning-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
      { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
      { token: 'string', foreground: 'CE9178' },
      { token: 'number', foreground: 'B5CEA8' },
      { token: 'type', foreground: '4EC9B0' },
      { token: 'function', foreground: 'DCDCAA' },
      { token: 'variable', foreground: '9CDCFE' }
    ],
    colors: {
      'editor.background': '#1e1e1e',
      'editor.foreground': '#d4d4d4',
      'editor.lineHighlightBackground': '#2d2d30',
      'editor.selectionBackground': '#264f78',
      'editor.inactiveSelectionBackground': '#3a3d41'
    }
  })
}

// 学習用のコード補完設定
export function setupCodeCompletion() {
  // TypeScript用のカスタム補完プロバイダー
  monaco.languages.registerCompletionItemProvider('typescript', {
    provideCompletionItems: (model, position) => {
      // 学習段階に応じた補完候補を提供
      const suggestions = [
        // 基本的な変数宣言
        {
          label: 'const',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'const ${1:name}: ${2:type} = ${3:value};',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: '定数を宣言します（再代入不可）'
        },
        {
          label: 'let',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'let ${1:name}: ${2:type} = ${3:value};',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: '変数を宣言します（再代入可能）'
        },
        
        // 関数定義
        {
          label: 'function',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'function ${1:name}(${2:params}): ${3:returnType} {\\n  ${4:// 処理内容}\\n  return ${5:result};\\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: '関数を定義します'
        }
      ]

      return { suggestions }
    }
  })
}