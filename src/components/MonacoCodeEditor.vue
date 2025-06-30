<template>
  <div class="monaco-editor-container">
    <!-- ツールバー -->
    <div class="editor-toolbar">
      <div class="toolbar-left">
        <span class="editor-title">
          <span class="code-icon">💻</span>
          TypeScript エディタ
        </span>
      </div>
      
      <div class="toolbar-right">
        <button 
          @click="formatCode" 
          :disabled="!editor"
          class="toolbar-button"
          title="コードをフォーマット (Shift+Alt+F)"
        >
          <span class="button-icon">🎨</span>
          フォーマット
        </button>
        
        <button 
          @click="checkErrors" 
          :disabled="!editor"
          class="toolbar-button"
          title="エラーと警告をチェック"
        >
          <span class="button-icon">🔍</span>
          エラー確認
        </button>
        
        <select 
          v-model="selectedTheme" 
          @change="changeTheme" 
          class="theme-select"
          title="エディタテーマを変更"
        >
          <option value="vs-light">ライトテーマ</option>
          <option value="vs-dark">ダークテーマ</option>
          <option value="hc-black">ハイコントラスト</option>
        </select>
      </div>
    </div>

    <!-- Monaco Editor -->
    <div 
      ref="editorContainer" 
      class="monaco-editor"
      :style="{ height: height }"
    ></div>

    <!-- ステータスバー -->
    <div class="editor-status">
      <div class="status-left">
        <span class="language-indicator">TypeScript</span>
        <span v-if="editor" class="cursor-position">
          行 {{ cursorPosition.line }}, 列 {{ cursorPosition.column }}
        </span>
      </div>
      <div class="status-right">
        <span class="ready-indicator">準備完了</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as monaco from 'monaco-editor'

// Props定義
interface Props {
  value: string
  language?: string
  theme?: 'vs-dark' | 'vs-light' | 'hc-black'
  readOnly?: boolean
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'typescript',
  theme: 'vs-dark',
  readOnly: false,
  height: '400px'
})

// Emits定義
const emit = defineEmits<{
  'update:value': [value: string]
  'change': [value: string]
}>()

// リアクティブな状態
const editor = ref<monaco.editor.IStandaloneCodeEditor | null>(null)
const editorContainer = ref<HTMLElement | null>(null)
const selectedTheme = ref(props.theme)
const cursorPosition = ref({ line: 1, column: 1 })

// エディタ初期化
const initializeEditor = () => {
  if (!editorContainer.value) return

  // エディタ作成
  const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    value: props.value,
    language: props.language,
    theme: selectedTheme.value,
    readOnly: props.readOnly,
    automaticLayout: true,
    fontSize: 14,
    lineNumbers: 'on',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    tabSize: 2,
    insertSpaces: true
  }

  editor.value = monaco.editor.create(editorContainer.value, defaultOptions)
  setupEventListeners()
}

const setupEventListeners = () => {
  if (!editor.value) return

  editor.value.onDidChangeModelContent(() => {
    const value = editor.value?.getValue() || ''
    emit('update:value', value)
    emit('change', value)
  })

  editor.value.onDidChangeCursorPosition((e) => {
    cursorPosition.value = {
      line: e.position.lineNumber,
      column: e.position.column
    }
  })
}

const formatCode = async () => {
  if (!editor.value) return
  try {
    await editor.value.getAction('editor.action.formatDocument')?.run()
  } catch (error) {
    console.error('フォーマットに失敗しました:', error)
  }
}

const checkErrors = () => {
  console.log('エラーチェック実行')
}

const changeTheme = () => {
  monaco.editor.setTheme(selectedTheme.value)
}

watch(() => props.value, (newValue) => {
  if (editor.value && newValue !== editor.value.getValue()) {
    editor.value.setValue(newValue)
  }
})

onMounted(() => {
  initializeEditor()
})

onUnmounted(() => {
  if (editor.value) {
    editor.value.dispose()
  }
})
</script>

<style scoped>
.monaco-editor-container {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.toolbar-left {
  display: flex;
  align-items: center;
}

.editor-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.code-icon {
  margin-right: 8px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar-button {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  color: #555;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toolbar-button:hover:not(:disabled) {
  background: #f0f0f0;
  border-color: #ccc;
}

.toolbar-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-icon {
  margin-right: 4px;
  font-size: 0.8rem;
}

.theme-select {
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  color: #555;
  font-size: 0.85rem;
  cursor: pointer;
}

.monaco-editor {
  position: relative;
}

.editor-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  font-size: 0.75rem;
  color: #666;
}

.status-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.language-indicator {
  background: #2196F3;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 500;
}

.status-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ready-indicator {
  color: #28a745;
  font-weight: 500;
}

@media (max-width: 768px) {
  .editor-toolbar {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }

  .toolbar-right {
    justify-content: space-between;
  }

  .toolbar-button {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
}
</style>