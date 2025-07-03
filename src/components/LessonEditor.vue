<template>
  <div class="lesson-editor-wrapper">
    <!-- Loading indicator -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Loading editor...</p>
    </div>

    <!-- Monaco editor container -->
    <div 
      ref="editorContainer" 
      :class="['editor-container', { 'loading': isLoading }]"
      :style="{ height: height, width: width }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { LearningLevels, type LearningLevel } from '@/utils/monacoConfig'
import { configureMonacoForPerformance } from '@/utils/monacoWorker'

interface Props {
  value?: string
  height?: string
  width?: string
  language?: string
  theme?: string
  readOnly?: boolean
  learningLevel?: LearningLevel
}

interface Emits {
  (e: 'update:value', value: string): void
  (e: 'change', value: string): void
  (e: 'mount', editor: monaco.editor.IStandaloneCodeEditor): void
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  height: '400px',
  width: '100%',
  language: 'typescript',
  theme: 'vs-dark',
  readOnly: false,
  learningLevel: LearningLevels.BEGINNER
})

const emit = defineEmits<Emits>()

// Refs
const editorContainer = ref<HTMLElement>()
const isLoading = ref(true)
let editor: monaco.editor.IStandaloneCodeEditor | null = null

// Initialize Monaco Editor
const initEditor = async () => {
  if (!editorContainer.value) return

  try {
    // Monaco Editorのパフォーマンス設定を適用
    configureMonacoForPerformance()
    
    // 軽量化されたエディタ設定で高速起動
    editor = monaco.editor.create(editorContainer.value, {
      value: props.value,
      language: props.language,
      theme: props.theme,
      readOnly: props.readOnly,
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: 'on',
      lineNumbers: 'on',
      glyphMargin: false,
      folding: false,
      contextmenu: false,
      mouseWheelZoom: false,
      // IntelliSenseを軽量化
      quickSuggestions: {
        other: false,
        comments: false,
        strings: false
      },
      suggestOnTriggerCharacters: false,
      acceptSuggestionOnEnter: 'off',
      tabCompletion: 'off',
      parameterHints: {
        enabled: false
      },
      hover: {
        enabled: false
      },
      // パフォーマンス向上のため無効化
      renderValidationDecorations: 'off',
      renderWhitespace: 'none'
    })

    // Set up event listeners
    editor.onDidChangeModelContent(() => {
      const newValue = editor?.getValue() || ''
      emit('update:value', newValue)
      emit('change', newValue)
    })

    // Emit mount event
    emit('mount', editor)
    
    isLoading.value = false
  } catch (error) {
    console.error('Failed to initialize Monaco Editor:', error)
    isLoading.value = false
  }
}

// Get compiler options based on learning level
const getCompilerOptions = (level: LearningLevel): monaco.languages.typescript.CompilerOptions => {
  const baseOptions: monaco.languages.typescript.CompilerOptions = {
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    lib: ['es2020', 'dom'],
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true
  }

  switch (level) {
    case LearningLevels.BEGINNER:
      return {
        ...baseOptions,
        strict: false,
        noImplicitAny: false,
        noImplicitReturns: false,
        noUnusedLocals: false,
        noUnusedParameters: false
      }
    
    case LearningLevels.INTERMEDIATE:
      return {
        ...baseOptions,
        strict: false,
        noImplicitAny: true,
        noImplicitReturns: false,
        noUnusedLocals: false,
        noUnusedParameters: false
      }
    
    case LearningLevels.ADVANCED:
      return {
        ...baseOptions,
        strict: true,
        noImplicitAny: true,
        noImplicitReturns: true,
        noUnusedLocals: true,
        noUnusedParameters: true
      }
    
    default:
      return baseOptions
  }
}

// Public methods
const setValue = (value: string) => {
  if (editor) {
    editor.setValue(value)
  }
}

const getValue = (): string => {
  return editor?.getValue() || ''
}

const formatCode = () => {
  if (editor) {
    editor.getAction('editor.action.formatDocument')?.run()
  }
}

const focus = () => {
  if (editor) {
    editor.focus()
  }
}

const resize = () => {
  if (editor) {
    editor.layout()
  }
}

const executeCode = async (): Promise<{ success: boolean; output: string[]; errors: string[] }> => {
  const code = getValue()
  
  try {
    // Create a safe execution environment
    const output: string[] = []
    const errors: string[] = []
    
    // Capture console output
    const originalLog = console.log
    const originalError = console.error
    const originalWarn = console.warn
    
    console.log = (...args: any[]) => {
      output.push(args.map(arg => String(arg)).join(' '))
      originalLog.apply(console, args)
    }
    
    console.error = (...args: any[]) => {
      errors.push(args.map(arg => String(arg)).join(' '))
      originalError.apply(console, args)
    }
    
    console.warn = (...args: any[]) => {
      output.push('Warning: ' + args.map(arg => String(arg)).join(' '))
      originalWarn.apply(console, args)
    }
    
    try {
      // Transpile TypeScript to JavaScript
      const jsCode = monaco.languages.typescript.getTypeScriptWorker()
        .then(worker => worker(editor!.getModel()!.uri))
        .then(client => client.getEmitOutput(editor!.getModel()!.uri.toString()))
        .then(result => {
          if (result.emitSkipped) {
            throw new Error('TypeScript compilation failed')
          }
          return result.outputFiles[0]?.text || code
        })
      
      // Execute the code with timeout
      const timeoutId = setTimeout(() => {
        throw new Error('Code execution timeout (5 seconds)')
      }, 5000)
      
      // Use Function constructor for safer evaluation
      const fn = new Function(await jsCode)
      fn()
      
      clearTimeout(timeoutId)
      
      return {
        success: true,
        output,
        errors
      }
    } catch (error) {
      errors.push(String(error))
      return {
        success: false,
        output,
        errors
      }
    } finally {
      // Restore console methods
      console.log = originalLog
      console.error = originalError
      console.warn = originalWarn
    }
  } catch (error) {
    return {
      success: false,
      output: [],
      errors: [String(error)]
    }
  }
}

// Watch for prop changes
watch(() => props.value, (newValue) => {
  if (editor && newValue !== editor.getValue()) {
    setValue(newValue)
  }
})

watch(() => props.theme, (newTheme) => {
  if (editor) {
    monaco.editor.setTheme(newTheme)
  }
})

watch(() => props.language, (newLanguage) => {
  if (editor) {
    const model = editor.getModel()
    if (model) {
      monaco.editor.setModelLanguage(model, newLanguage)
    }
  }
})

// Lifecycle
onMounted(() => {
  // エディタの初期化を遅延させてUI応答性を向上
  setTimeout(() => {
    initEditor()
  }, 100)
})

onUnmounted(() => {
  if (editor) {
    editor.dispose()
  }
})

// Expose public methods
defineExpose({
  editor,
  setValue,
  getValue,
  formatCode,
  focus,
  resize,
  executeCode
})
</script>

<style scoped>
.lesson-editor-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #334155;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 41, 59, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: white;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #475569;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-overlay p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.editor-container {
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
}

.editor-container.loading {
  opacity: 0.3;
}

/* Custom Monaco Editor styles */
:deep(.monaco-editor) {
  font-family: 'Fira Code', 'Monaco', 'Cascadia Code', monospace !important;
}

:deep(.monaco-editor .margin) {
  background-color: #1e293b;
}

:deep(.monaco-editor .monaco-editor-background) {
  background-color: #1e293b;
}

:deep(.monaco-editor .current-line) {
  border: 1px solid #334155;
}

:deep(.monaco-editor .line-numbers) {
  color: #64748b;
}

:deep(.monaco-scrollable-element .scrollbar) {
  background: rgba(71, 85, 105, 0.3);
}

:deep(.monaco-scrollable-element .slider) {
  background: rgba(71, 85, 105, 0.6);
}

:deep(.monaco-scrollable-element .slider:hover) {
  background: rgba(71, 85, 105, 0.8);
}

/* Syntax highlighting improvements */
:deep(.mtk1) { color: #f1f5f9; } /* Default text */
:deep(.mtk5) { color: #94a3b8; } /* Comments */
:deep(.mtk6) { color: #a78bfa; } /* Keywords */
:deep(.mtk9) { color: #fbbf24; } /* Strings */
:deep(.mtk10) { color: #34d399; } /* Numbers */
:deep(.mtk11) { color: #60a5fa; } /* Types */
:deep(.mtk12) { color: #fb7185; } /* Functions */

/* Error and warning decorations */
:deep(.squiggly-error) {
  border-bottom: 2px solid #ef4444;
}

:deep(.squiggly-warning) {
  border-bottom: 2px solid #f59e0b;
}

:deep(.squiggly-info) {
  border-bottom: 2px solid #3b82f6;
}

/* Selection highlight */
:deep(.monaco-editor .focused .selected-text) {
  background-color: #3b82f6 !important;
}

/* Suggest widget improvements */
:deep(.monaco-editor .suggest-widget) {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

:deep(.monaco-editor .suggest-widget .monaco-list .monaco-list-row) {
  border-radius: 4px;
  margin: 2px;
}

:deep(.monaco-editor .suggest-widget .monaco-list .monaco-list-row.focused) {
  background: #334155;
}

/* Hover widget improvements */
:deep(.monaco-editor .monaco-hover) {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

:deep(.monaco-editor .monaco-hover .hover-contents) {
  color: #f1f5f9;
}
</style>