<template>
  <div class="simple-editor">
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <span>エディタを読み込み中...</span>
    </div>
    <div 
      ref="editorContainer" 
      class="editor-container"
      :style="{ height: height }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface Props {
  value?: string
  height?: string
  language?: string
  theme?: string
}

interface Emits {
  (e: 'update:value', value: string): void
  (e: 'change', value: string): void
  (e: 'mount', editor: any): void
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  height: '400px',
  language: 'typescript',
  theme: 'vs-dark'
})

const emit = defineEmits<Emits>()

const editorContainer = ref<HTMLElement>()
const isLoading = ref(true)
let editor: any = null

// 動的にMonaco Editorをロード
const loadMonaco = async () => {
  try {
    const monaco = await import('monaco-editor')
    
    // 基本的な設定のみ
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      allowJs: true,
      strict: false
    })

    return monaco
  } catch (error) {
    console.error('Monaco Editor loading failed:', error)
    throw error
  }
}

const initEditor = async () => {
  if (!editorContainer.value) {
    console.error('Editor container not found')
    return
  }

  try {
    const monaco = await loadMonaco()
    
    console.log('Creating Monaco Editor...')
    
    // 最小限の設定でエディタを作成
    editor = monaco.editor.create(editorContainer.value, {
      value: props.value,
      language: props.language,
      theme: props.theme,
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      wordWrap: 'on'
    })

    // イベントリスナーの設定
    editor.onDidChangeModelContent(() => {
      const newValue = editor.getValue()
      emit('update:value', newValue)
      emit('change', newValue)
    })

    emit('mount', editor)
    isLoading.value = false
    
    console.log('Monaco Editor created successfully')
  } catch (error) {
    console.error('Failed to initialize editor:', error)
    isLoading.value = false
  }
}

// 値の変更を監視
watch(() => props.value, (newValue) => {
  if (editor && editor.getValue() !== newValue) {
    editor.setValue(newValue)
  }
})

// コンポーネントのメソッドを公開
const getValue = () => {
  return editor?.getValue() || ''
}

const setValue = (value: string) => {
  if (editor) {
    editor.setValue(value)
  }
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

defineExpose({
  getValue,
  setValue,
  formatCode,
  focus,
  editor: () => editor
})

onMounted(async () => {
  console.log('SimpleEditor mounted, initializing...')
  await nextTick()
  setTimeout(() => {
    initEditor()
  }, 100)
})

onUnmounted(() => {
  if (editor) {
    editor.dispose()
  }
})
</script>

<style scoped>
.simple-editor {
  position: relative;
  width: 100%;
  height: 100%;
}

.loading-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: #1e1e1e;
  color: white;
  z-index: 10;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-top: 2px solid #007acc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.editor-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>