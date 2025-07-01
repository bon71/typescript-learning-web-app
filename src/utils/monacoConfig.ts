import * as monaco from 'monaco-editor'

// Monaco Editorの学習用設定
export const LearningLevels = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate', 
  ADVANCED: 'advanced'
} as const

export type LearningLevel = typeof LearningLevels[keyof typeof LearningLevels]

// 学習レベル別TypeScriptコンパイラオプション
export const getCompilerOptions = (level: LearningLevel): monaco.languages.typescript.CompilerOptions => {
  const baseOptions: monaco.languages.typescript.CompilerOptions = {
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    lib: ['ES2020', 'DOM'],
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    strict: false, // 初心者は false から開始
    noImplicitAny: false,
    noImplicitReturns: false,
    noImplicitThis: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
    exactOptionalPropertyTypes: false,
    noImplicitOverride: false,
    allowUnreachableCode: true,
    allowUnusedLabels: true
  }

  switch (level) {
    case LearningLevels.BEGINNER:
      return {
        ...baseOptions,
        strict: false,
        noImplicitAny: false,
        noImplicitReturns: false,
        allowUnreachableCode: true
      }
    
    case LearningLevels.INTERMEDIATE:
      return {
        ...baseOptions,
        strict: true,
        noImplicitAny: true,
        noImplicitReturns: false,
        allowUnreachableCode: false
      }
    
    case LearningLevels.ADVANCED:
      return {
        ...baseOptions,
        strict: true,
        noImplicitAny: true,
        noImplicitReturns: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        allowUnreachableCode: false,
        exactOptionalPropertyTypes: true
      }
    
    default:
      return baseOptions
  }
}

// エディタのテーマ設定
export const setupLearningTheme = () => {
  monaco.editor.defineTheme('learning-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
      { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
      { token: 'string', foreground: 'CE9178' },
      { token: 'number', foreground: 'B5CEA8' },
      { token: 'type', foreground: '4EC9B0' },
      { token: 'function', foreground: 'DCDCAA' }
    ],
    colors: {
      'editor.background': '#1E1E1E',
      'editor.foreground': '#D4D4D4',
      'editorCursor.foreground': '#AEAFAD',
      'editor.lineHighlightBackground': '#2D2D30',
      'editorLineNumber.foreground': '#858585',
      'editor.selectionBackground': '#ADD6FF26',
      'editor.inactiveSelectionBackground': '#E5EBF1'
    }
  })

  monaco.editor.defineTheme('learning-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '008000', fontStyle: 'italic' },
      { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
      { token: 'string', foreground: 'A31515' },
      { token: 'number', foreground: '098658' },
      { token: 'type', foreground: '267F99' },
      { token: 'function', foreground: '795E26' }
    ],
    colors: {
      'editor.background': '#FFFFFF',
      'editor.foreground': '#000000',
      'editorCursor.foreground': '#000000',
      'editor.lineHighlightBackground': '#F0F0F0',
      'editorLineNumber.foreground': '#237893',
      'editor.selectionBackground': '#ADD6FF',
      'editor.inactiveSelectionBackground': '#E5EBF1'
    }
  })
}

// 学習用の型定義追加
export const addLearningTypeDefinitions = () => {
  const learningTypes = `
declare interface Console {
  log(...args: any[]): void;
  error(...args: any[]): void;
  warn(...args: any[]): void;
  info(...args: any[]): void;
}

declare const console: Console;

// 学習用のシンプルな型定義
declare type Primitive = string | number | boolean | null | undefined;
declare type LearningObject = { [key: string]: any };
declare type LearningArray<T> = T[];
declare type LearningFunction<T = any, R = any> = (...args: T[]) => R;

// よく使用されるDOM型の簡単版
declare interface SimpleElement {
  id: string;
  className: string;
  textContent: string;
  innerHTML: string;
  addEventListener(event: string, handler: Function): void;
}

declare function getElementById(id: string): SimpleElement | null;
declare function createElement(tagName: string): SimpleElement;
`

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    learningTypes,
    'ts:learning-types.d.ts'
  )
}

// エディタの初期化
export const initializeMonacoForLearning = (level: LearningLevel = LearningLevels.BEGINNER) => {
  // TypeScriptの設定
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
    getCompilerOptions(level)
  )

  // JavaScript実行時設定も同様に
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
    getCompilerOptions(level)
  )

  // 学習用型定義を追加
  addLearningTypeDefinitions()

  // テーマの設定
  setupLearningTheme()

  // 診断オプション（エラー表示の設定）
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    noSuggestionDiagnostics: level === LearningLevels.BEGINNER // 初心者は提案を抑制
  })
}

// エディタオプション設定
export const getEditorOptions = (level: LearningLevel): monaco.editor.IStandaloneEditorConstructionOptions => {
  const baseOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    fontSize: 14,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace",
    lineNumbers: 'on',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: 'on',
    theme: 'learning-dark',
    tabSize: 2,
    insertSpaces: true,
    detectIndentation: false,
    renderLineHighlight: 'line',
    selectionHighlight: true,
    bracketMatching: 'always',
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    formatOnPaste: true,
    formatOnType: true
  }

  switch (level) {
    case LearningLevels.BEGINNER:
      return {
        ...baseOptions,
        minimap: { enabled: false },
        wordWrap: 'on',
        lineNumbers: 'on',
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 10,
        scrollbar: {
          vertical: 'auto',
          horizontal: 'auto'
        },
        // 初心者には優しい設定
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        parameterHints: { enabled: true },
        autoIndent: 'full'
      }

    case LearningLevels.INTERMEDIATE:
      return {
        ...baseOptions,
        minimap: { enabled: true, maxColumn: 40 },
        folding: true,
        glyphMargin: true,
        quickSuggestions: {
          other: true,
          comments: false,
          strings: true
        }
      }

    case LearningLevels.ADVANCED:
      return {
        ...baseOptions,
        minimap: { enabled: true },
        folding: true,
        glyphMargin: true,
        rulers: [80, 120],
        quickSuggestions: {
          other: true,
          comments: true,
          strings: true
        },
        suggest: {
          showMethods: true,
          showProperties: true,
          showConstructors: true,
          showFields: true,
          showVariables: true,
          showClasses: true,
          showInterfaces: true,
          showModules: true,
          showTypeParameters: true
        }
      }

    default:
      return baseOptions
  }
}