<template>
  <div class="split-code-editor" :data-theme="currentTheme">
    <!-- Header with controls -->
    <div class="editor-header">
      <div class="header-left">
        <h3 class="editor-title">TypeScript Code Editor</h3>
        <div class="theme-toggle">
          <button 
            @click="toggleTheme"
            :class="['theme-button', currentTheme]"
          >
            {{ currentTheme === 'dark' ? '🌙' : '☀️' }}
          </button>
        </div>
      </div>
      <div class="header-controls">
        <button @click="formatCode" class="control-btn format-btn">
          ✨ Format
        </button>
        <button 
          @click="runCode" 
          :disabled="isRunning"
          :class="['control-btn', 'run-btn', { 'running': isRunning }]"
        >
          {{ isRunning ? '⏳' : '▶️' }} Run
        </button>
        <button @click="resetCode" class="control-btn reset-btn">
          🔄 Reset
        </button>
      </div>
    </div>

    <!-- Main split layout -->
    <div class="split-container">
      <!-- Left pane: Monaco Editor -->
      <div class="editor-pane" :style="{ width: leftPaneWidth + '%' }">
        <div class="pane-header">
          <span class="pane-title">Code Editor</span>
          <div class="language-selector">
            <select v-model="currentLanguage" @change="onLanguageChange">
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
        </div>
        <div class="monaco-container">
          <MonacoCodeEditor
            ref="monacoEditor"
            v-model:value="code"
            :height="editorHeight"
            :theme="monacoTheme"
            :language="currentLanguage"
            :learning-level="LearningLevels.INTERMEDIATE"
            :show-error-panel="false"
            :show-result-panel="false"
            @change="onCodeChange"
            @mount="onEditorMount"
          />
        </div>
      </div>

      <!-- Resizer -->
      <div 
        class="resizer"
        @mousedown="startResize"
      ></div>

      <!-- Right pane: Output and Console -->
      <div class="output-pane">
        <div class="pane-tabs">
          <button 
            v-for="tab in outputTabs"
            :key="tab.id"
            :class="['tab-button', { 'active': activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.icon }} {{ tab.label }}
          </button>
        </div>

        <!-- Console Tab -->
        <div v-if="activeTab === 'console'" class="tab-content console-content">
          <div class="console-header">
            <span>Console Output</span>
            <button @click="clearConsole" class="clear-btn">🗑️ Clear</button>
          </div>
          <div class="console-output" ref="consoleOutput">
            <div 
              v-for="(entry, index) in consoleEntries"
              :key="index"
              :class="['console-entry', entry.type]"
            >
              <span class="timestamp">{{ formatTime(entry.timestamp) }}</span>
              <span class="message">{{ entry.message }}</span>
            </div>
            <div v-if="consoleEntries.length === 0" class="empty-state">
              Ready to run your code...
            </div>
          </div>
        </div>

        <!-- Errors Tab -->
        <div v-if="activeTab === 'errors'" class="tab-content errors-content">
          <div class="errors-header">
            <span>Type Errors</span>
            <span class="error-count">{{ errors.length }}</span>
          </div>
          <div class="errors-list">
            <div 
              v-for="error in errors"
              :key="`${error.startLineNumber}-${error.startColumn}`"
              class="error-item"
              @click="goToError(error)"
            >
              <div class="error-severity">
                <span :class="['severity-indicator', getSeverityClass(error.severity)]"></span>
              </div>
              <div class="error-details">
                <div class="error-message">{{ error.message }}</div>
                <div class="error-location">
                  Line {{ error.startLineNumber }}, Column {{ error.startColumn }}
                </div>
              </div>
            </div>
            <div v-if="errors.length === 0" class="empty-state">
              No errors found! 🎉
            </div>
          </div>
        </div>

        <!-- Preview Tab -->
        <div v-if="activeTab === 'preview'" class="tab-content preview-content">
          <div class="preview-header">
            <span>Live Preview</span>
            <button @click="refreshPreview" class="refresh-btn">🔄 Refresh</button>
          </div>
          <div class="preview-frame">
            <iframe 
              ref="previewFrame"
              :srcdoc="previewHtml"
              sandbox="allow-scripts"
              class="preview-iframe"
            ></iframe>
          </div>
        </div>
      </div>
    </div>

    <!-- Status bar -->
    <div class="status-bar">
      <div class="status-left">
        <span class="status-item">Line {{ cursorPosition.line }}, Column {{ cursorPosition.column }}</span>
        <span class="status-item">{{ currentLanguage.toUpperCase() }}</span>
      </div>
      <div class="status-right">
        <span class="status-item">{{ codeStats.lines }} lines</span>
        <span class="status-item">{{ codeStats.chars }} chars</span>
        <span v-if="lastExecutionTime" class="status-item">Last run: {{ lastExecutionTime }}ms</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import MonacoCodeEditor from './MonacoCodeEditor.vue'
import { LearningLevels } from '@/utils/monacoConfig'
import * as monaco from 'monaco-editor'

interface ConsoleEntry {
  type: 'log' | 'error' | 'warn' | 'info'
  message: string
  timestamp: Date
}

interface Props {
  initialCode?: string
  language?: string
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  initialCode: '// Welcome to TypeScript Code Editor\nconsole.log("Hello, World!");\n\n// Try writing some TypeScript code here\nconst greeting: string = "Hello, TypeScript!";\nconsole.log(greeting);',
  language: 'typescript',
  theme: 'dark'
})

// Editor state
const monacoEditor = ref()
const code = ref(props.initialCode)
const currentLanguage = ref(props.language)
const currentTheme = ref(props.theme)
const isRunning = ref(false)
const errors = ref<monaco.editor.IMarker[]>([])
const cursorPosition = ref({ line: 1, column: 1 })
const lastExecutionTime = ref<number | null>(null)

// Console state
const consoleEntries = ref<ConsoleEntry[]>([])
const consoleOutput = ref<HTMLElement>()

// Layout state
const activeTab = ref('console')
const leftPaneWidth = ref(50) // percentage
const isResizing = ref(false)

// Computed properties
const monacoTheme = computed(() => {
  return currentTheme.value === 'dark' ? 'learning-dark' : 'learning-light'
})

const editorHeight = computed(() => {
  return 'calc(100vh - 200px)'
})

const codeStats = computed(() => {
  const lines = code.value.split('\n').length
  const chars = code.value.length
  return { lines, chars }
})

const previewHtml = computed(() => {
  if (currentLanguage.value !== 'typescript' && currentLanguage.value !== 'javascript') {
    return '<html><body><p>Preview not available for this language</p></body></html>'
  }
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Live Preview</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; }
    .output { background: #f5f5f5; padding: 10px; border-radius: 4px; margin: 10px 0; }
    .error { background: #fee; color: #c00; }
  </style>
</head>
<body>
  <h3>Live Preview</h3>
  <div id="output"></div>
  <${'script'}>
    // Capture console output
    const outputDiv = document.getElementById('output');
    const originalLog = console.log;
    const originalError = console.error;
    
    console.log = function(...args) {
      const div = document.createElement('div');
      div.className = 'output';
      div.textContent = args.join(' ');
      outputDiv.appendChild(div);
      originalLog.apply(console, args);
    };
    
    console.error = function(...args) {
      const div = document.createElement('div');
      div.className = 'output error';
      div.textContent = 'Error: ' + args.join(' ');
      outputDiv.appendChild(div);
      originalError.apply(console, args);
    };
    
    try {
      ${code.value}
    } catch (e) {
      console.error(e.message);
    }
  </${'script'}>
</body>
</html>`
})

// Output tabs configuration
const outputTabs = [
  { id: 'console', label: 'Console', icon: '📝' },
  { id: 'errors', label: 'Errors', icon: '❌' },
  { id: 'preview', label: 'Preview', icon: '👁️' }
]

// Methods
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
}

const formatCode = () => {
  if (monacoEditor.value) {
    monacoEditor.value.formatCode()
  }
}

const resetCode = () => {
  code.value = props.initialCode
  clearConsole()
  errors.value = []
}

const runCode = async () => {
  if (!monacoEditor.value || isRunning.value) return
  
  isRunning.value = true
  clearConsole()
  
  try {
    const startTime = performance.now()
    const result = await monacoEditor.value.executeCode()
    const endTime = performance.now()
    
    lastExecutionTime.value = Math.round(endTime - startTime)
    
    if (result.success) {
      result.output.forEach((output: string) => {
        addConsoleEntry('log', output)
      })
      
      if (result.output.length === 0) {
        addConsoleEntry('info', 'Code executed successfully (no output)')
      }
    } else {
      result.errors.forEach((error: string) => {
        addConsoleEntry('error', error)
      })
    }
    
    // Switch to console tab to show results
    activeTab.value = 'console'
    
  } catch (error) {
    addConsoleEntry('error', `Execution failed: ${error}`)
  } finally {
    isRunning.value = false
  }
}

const clearConsole = () => {
  consoleEntries.value = []
}

const addConsoleEntry = (type: ConsoleEntry['type'], message: string) => {
  consoleEntries.value.push({
    type,
    message,
    timestamp: new Date()
  })
  
  // Auto-scroll to bottom
  nextTick(() => {
    if (consoleOutput.value) {
      consoleOutput.value.scrollTop = consoleOutput.value.scrollHeight
    }
  })
}

const onCodeChange = (newCode: string) => {
  code.value = newCode
}

const onLanguageChange = () => {
  if (monacoEditor.value && monacoEditor.value.editor) {
    monaco.editor.setModelLanguage(
      monacoEditor.value.editor.getModel(),
      currentLanguage.value
    )
  }
}

const onEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
  // Track cursor position
  editor.onDidChangeCursorPosition((e) => {
    cursorPosition.value = {
      line: e.position.lineNumber,
      column: e.position.column
    }
  })
  
  // Track errors
  const model = editor.getModel()
  if (model) {
    monaco.editor.onDidChangeMarkers(([resource]) => {
      if (model.uri.toString() === resource.toString()) {
        errors.value = monaco.editor.getModelMarkers({ resource })
      }
    })
  }
}

const goToError = (error: monaco.editor.IMarker) => {
  if (monacoEditor.value && monacoEditor.value.editor) {
    monacoEditor.value.editor.setPosition({
      lineNumber: error.startLineNumber,
      column: error.startColumn
    })
    monacoEditor.value.editor.focus()
  }
}

const getSeverityClass = (severity: monaco.MarkerSeverity): string => {
  switch (severity) {
    case monaco.MarkerSeverity.Error: return 'error'
    case monaco.MarkerSeverity.Warning: return 'warning'
    case monaco.MarkerSeverity.Info: return 'info'
    default: return 'hint'
  }
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const refreshPreview = () => {
  // Force refresh of preview iframe
  const iframe = document.querySelector('.preview-iframe') as HTMLIFrameElement
  if (iframe) {
    iframe.src = iframe.src
  }
}

// Resizer functionality
const startResize = (e: MouseEvent) => {
  isResizing.value = true
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
  e.preventDefault()
}

const onResize = (e: MouseEvent) => {
  if (!isResizing.value) return
  
  const container = document.querySelector('.split-container') as HTMLElement
  if (container) {
    const containerRect = container.getBoundingClientRect()
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100
    leftPaneWidth.value = Math.max(20, Math.min(80, newWidth))
  }
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}

// Lifecycle
onMounted(() => {
  // Load theme preference
  const savedTheme = localStorage.getItem('editor-theme')
  if (savedTheme) {
    currentTheme.value = savedTheme as 'light' | 'dark'
  }
})

onUnmounted(() => {
  // Save theme preference
  localStorage.setItem('editor-theme', currentTheme.value)
})
</script>

<style scoped>
.split-code-editor {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', system-ui, sans-serif;
}

/* CSS Variables for theming */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --border-color: #e2e8f0;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --accent-blue: #3b82f6;
  --accent-green: #10b981;
  --accent-red: #ef4444;
  --accent-yellow: #f59e0b;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --border-color: #475569;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Header */
.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.editor-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.theme-toggle {
  display: flex;
  align-items: center;
}

.theme-button {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.theme-button:hover {
  background: var(--accent-blue);
  color: white;
  border-color: var(--accent-blue);
}

.header-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 8px 14px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
  color: var(--text-primary);
}

.control-btn:hover:not(:disabled) {
  border-color: var(--accent-blue);
  color: var(--accent-blue);
}

.run-btn {
  background: var(--accent-green);
  color: white;
  border-color: var(--accent-green);
}

.run-btn:hover:not(:disabled) {
  background: #059669;
  border-color: #059669;
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.run-btn.running {
  background: var(--accent-yellow);
  border-color: var(--accent-yellow);
}

.format-btn:hover {
  border-color: var(--accent-blue);
  color: var(--accent-blue);
}

.reset-btn:hover {
  border-color: var(--accent-red);
  color: var(--accent-red);
}

/* Split container */
.split-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.editor-pane {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
}

.output-pane {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 300px;
}

.resizer {
  width: 4px;
  background: var(--border-color);
  cursor: col-resize;
  transition: background-color 0.2s;
}

.resizer:hover {
  background: var(--accent-blue);
}

/* Pane headers */
.pane-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  font-size: 14px;
  font-weight: 500;
}

.pane-title {
  color: var(--text-primary);
}

.language-selector select {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  color: var(--text-primary);
}

.monaco-container {
  flex: 1;
  overflow: hidden;
}

/* Output pane tabs */
.pane-tabs {
  display: flex;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.tab-button {
  background: transparent;
  border: none;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 13px;
  color: var(--text-secondary);
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab-button:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

.tab-button.active {
  color: var(--accent-blue);
  border-bottom-color: var(--accent-blue);
  background: var(--bg-primary);
}

/* Tab content */
.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Console */
.console-content {
  background: var(--bg-primary);
}

.console-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  font-size: 14px;
  font-weight: 500;
}

.clear-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.clear-btn:hover {
  border-color: var(--accent-red);
  color: var(--accent-red);
}

.console-output {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.4;
}

.console-entry {
  display: flex;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 2px;
  word-break: break-all;
}

.console-entry.log {
  color: var(--text-primary);
}

.console-entry.error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--accent-red);
}

.console-entry.warn {
  background: rgba(245, 158, 11, 0.1);
  color: var(--accent-yellow);
}

.console-entry.info {
  background: rgba(59, 130, 246, 0.1);
  color: var(--accent-blue);
}

.timestamp {
  color: var(--text-secondary);
  margin-right: 8px;
  font-size: 11px;
  flex-shrink: 0;
}

.message {
  flex: 1;
}

/* Errors */
.errors-content {
  background: var(--bg-primary);
}

.errors-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  font-size: 14px;
  font-weight: 500;
}

.error-count {
  background: var(--accent-red);
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
}

.errors-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.error-item {
  display: flex;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid var(--border-color);
}

.error-item:hover {
  background: var(--bg-secondary);
}

.error-severity {
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.severity-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.severity-indicator.error {
  background: var(--accent-red);
}

.severity-indicator.warning {
  background: var(--accent-yellow);
}

.severity-indicator.info {
  background: var(--accent-blue);
}

.severity-indicator.hint {
  background: var(--text-secondary);
}

.error-details {
  flex: 1;
}

.error-message {
  font-size: 13px;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.error-location {
  font-size: 11px;
  color: var(--text-secondary);
}

/* Preview */
.preview-content {
  background: var(--bg-primary);
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  font-size: 14px;
  font-weight: 500;
}

.refresh-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.refresh-btn:hover {
  border-color: var(--accent-blue);
  color: var(--accent-blue);
}

.preview-frame {
  flex: 1;
  background: white;
  border-radius: 4px;
  margin: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Status bar */
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  font-size: 12px;
  color: var(--text-secondary);
}

.status-left,
.status-right {
  display: flex;
  gap: 16px;
}

.status-item {
  padding: 2px 8px;
  border-radius: 3px;
  background: var(--bg-tertiary);
}

/* Empty states */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: var(--text-secondary);
  font-style: italic;
}

/* Apply theme class */
.split-code-editor[data-theme="dark"] {
  color-scheme: dark;
}

.split-code-editor[data-theme="light"] {
  color-scheme: light;
}

/* Responsive design */
@media (max-width: 768px) {
  .split-container {
    flex-direction: column;
  }
  
  .editor-pane {
    width: 100% !important;
    height: 50%;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
  
  .resizer {
    display: none;
  }
  
  .header-controls {
    flex-wrap: wrap;
    gap: 4px;
  }
  
  .control-btn {
    padding: 6px 10px;
    font-size: 12px;
  }
}
</style>