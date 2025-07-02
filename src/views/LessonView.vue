<template>
  <div class="lesson-view">
    <!-- Navigation Header -->
    <div class="lesson-header">
      <div class="lesson-nav">
        <button 
          @click="goToPreviousLesson" 
          :disabled="!hasPreviousLesson"
          class="nav-button prev"
        >
          ← 前へ
        </button>
        
        <div class="lesson-info">
          <h1 class="lesson-title">
            Day {{ lesson.day }}: {{ lesson.title }}
          </h1>
          <div class="lesson-meta">
            <span class="phase-badge phase-{{ lesson.phase }}">
              Phase {{ lesson.phase }}
            </span>
            <span class="difficulty-badge">{{ lesson.difficulty }}</span>
            <span class="time-badge">{{ lesson.estimatedTime }}分</span>
          </div>
        </div>
        
        <button 
          @click="goToNextLesson" 
          :disabled="!hasNextLesson"
          class="nav-button next"
        >
          次へ →
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="lesson-content">
      <!-- Learning Content Area (Top 40%) -->
      <div class="content-section">
        <div class="content-grid">
          <div class="goal-card">
            <div class="card-header">
              <span class="card-icon">🎯</span>
              <h3>ゴール</h3>
            </div>
            <p class="card-content">{{ lesson.goal }}</p>
          </div>
          
          <div class="completion-card">
            <div class="card-header">
              <span class="card-icon">✅</span>
              <h3>完了条件</h3>
            </div>
            <p class="card-content">{{ lesson.completion }}</p>
          </div>
          
          <div class="task-card">
            <div class="card-header">
              <span class="card-icon">📝</span>
              <h3>課題内容</h3>
            </div>
            <p class="card-content">{{ lesson.task }}</p>
          </div>
          
          <div class="hints-card">
            <div class="card-header">
              <span class="card-icon">💡</span>
              <h3>ヒント</h3>
              <button 
                @click="toggleHints"
                class="toggle-button"
              >
                {{ showHints ? '隠す' : '表示' }}
              </button>
            </div>
            <div v-show="showHints" class="hints-content">
              <div v-if="currentHints.length > 0">
                <div 
                  v-for="(hint, index) in currentHints" 
                  :key="index"
                  class="hint-item"
                >
                  <span class="hint-number">{{ index + 1 }}</span>
                  <span class="hint-text">{{ hint }}</span>
                </div>
              </div>
              <div v-else>
                <p class="no-hints">このレッスンにはヒントがありません。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Code Editor Area (Bottom 60%) -->
      <div class="editor-section">
        <div class="editor-layout">
          <!-- Left: Monaco Editor -->
          <div class="editor-pane" :style="{ width: editorWidth + '%' }">
            <div class="editor-header">
              <div class="editor-title">
                <span class="editor-icon">💻</span>
                Code Editor
              </div>
              <div class="editor-controls">
                <button @click="resetCode" class="control-btn reset">
                  🔄 Reset
                </button>
                <button @click="formatCode" class="control-btn format">
                  ✨ Format
                </button>
                <button 
                  @click="runCode" 
                  :disabled="isRunning"
                  :class="['control-btn', 'run', { 'running': isRunning }]"
                >
                  {{ isRunning ? '⏳' : '▶️' }} Run
                </button>
              </div>
            </div>
            
            <div class="monaco-container">
              <LessonEditor
                ref="lessonEditor"
                v-model:value="code"
                :height="editorHeight"
                :language="'typescript'"
                :theme="editorTheme"
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

          <!-- Right: Output Panes -->
          <div class="output-pane">
            <div class="output-tabs">
              <button 
                v-for="tab in outputTabs"
                :key="tab.id"
                :class="['tab-btn', { active: activeTab === tab.id }]"
                @click="activeTab = tab.id"
              >
                {{ tab.icon }} {{ tab.label }}
                <span v-if="tab.id === 'errors' && errors.length > 0" class="error-count">
                  {{ errors.length }}
                </span>
              </button>
            </div>

            <div class="tab-content">
              <!-- Console Output -->
              <div v-if="activeTab === 'console'" class="console-panel">
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

              <!-- Errors Panel -->
              <div v-if="activeTab === 'errors'" class="errors-panel">
                <div class="errors-header">
                  <span>Type Errors</span>
                </div>
                <div class="errors-content">
                  <div 
                    v-for="error in errors"
                    :key="`${error.startLineNumber}-${error.startColumn}`"
                    class="error-item"
                    @click="goToError(error)"
                  >
                    <div class="error-severity">
                      <span :class="['severity-dot', getSeverityClass(error.severity)]"></span>
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

              <!-- Explanation Panel -->
              <div v-if="activeTab === 'explanation'" class="explanation-panel">
                <div class="explanation-header">
                  <span class="explanation-icon">💡</span>
                  <span>解説</span>
                </div>
                <div class="explanation-content">
                  <p>{{ lesson.explanation }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Footer -->
    <div class="lesson-footer">
      <div class="lesson-footer-content">
        <div class="progress-section">
          <div class="progress-bar-container">
            <div class="progress-label">学習進捗</div>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ 
                  width: overallProgress + '%',
                  opacity: overallProgress > 0 ? 1 : 0.3 
                }"
              ></div>
            </div>
            <div class="progress-text">{{ progressStats.completedLessons }}/{{ progressStats.totalLessons }}</div>
          </div>
        </div>
        
        <div class="lesson-actions">
          <button 
            @click="toggleCompletion"
            :class="['completion-btn', { completed: isCompleted }]"
          >
            {{ isCompleted ? '✅ 完了済み' : '☐ 完了マーク' }}
          </button>
          
          <button 
            v-if="hasNextLesson"
            @click="goToNextLesson"
            class="next-lesson-btn"
          >
            次のレッスンへ →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getLessonByDay, allLessons } from '@/data'
import { useLearningProgress } from '@/composables/useLearningProgress'
import LessonEditor from '@/components/LessonEditor.vue'
import type { LessonContent } from '@/types/content'
import * as monaco from 'monaco-editor'

interface Props {
  id: number
}

interface ConsoleEntry {
  type: 'log' | 'error' | 'warn' | 'info'
  message: string
  timestamp: Date
}

const props = defineProps<Props>()
const router = useRouter()
const route = useRoute()

// Learning progress
const { isCompleted: isLessonCompleted, toggleCompletion: toggleLessonCompletion, progressStats } = useLearningProgress()

// Lesson data
const lesson = computed((): LessonContent => {
  const lessonData = getLessonByDay(props.id)
  if (!lessonData) {
    router.push('/')
    return allLessons[0] // Fallback
  }
  return lessonData
})

// 現在のレッスンのヒント
const currentHints = computed(() => {
  return lesson.value.hints || []
})

// Navigation
const currentLessonIndex = computed(() => 
  allLessons.findIndex(l => l.day === props.id)
)

const hasPreviousLesson = computed(() => currentLessonIndex.value > 0)
const hasNextLesson = computed(() => currentLessonIndex.value < allLessons.length - 1)

const goToPreviousLesson = () => {
  if (hasPreviousLesson.value) {
    const prevLesson = allLessons[currentLessonIndex.value - 1]
    router.push(`/lesson/${prevLesson.day}`)
  }
}

const goToNextLesson = () => {
  if (hasNextLesson.value) {
    const nextLesson = allLessons[currentLessonIndex.value + 1]
    router.push(`/lesson/${nextLesson.day}`)
  }
}

// Progress calculations
const overallProgress = computed(() => progressStats.value.totalProgress)

const isCompleted = computed(() => 
  isLessonCompleted(props.id).value
)

const toggleCompletion = () => {
  toggleLessonCompletion(props.id)
}

// UI state
const showHints = ref(false)
const activeTab = ref('console')
const editorWidth = ref(60) // percentage
const isResizing = ref(false)

// Toggle hints visibility
const toggleHints = () => {
  showHints.value = !showHints.value
}

// Editor state
const lessonEditor = ref()
const code = ref('')
const isRunning = ref(false)
const errors = ref<monaco.editor.IMarker[]>([])
const consoleEntries = ref<ConsoleEntry[]>([])
const consoleOutput = ref<HTMLElement>()

// Editor settings
const editorTheme = ref('vs-dark')
const editorHeight = computed(() => 'calc(100% - 60px)')

// Output tabs
const outputTabs = [
  { id: 'console', label: 'Console', icon: '📝' },
  { id: 'errors', label: 'Errors', icon: '❌' },
  { id: 'explanation', label: 'Explanation', icon: '💡' }
]

// Initialize code with sample
onMounted(() => {
  code.value = lesson.value.sampleCode || '// Write your TypeScript code here\nconsole.log("Hello, World!");'
})

// Editor methods
const resetCode = () => {
  code.value = lesson.value.sampleCode || '// Write your TypeScript code here\nconsole.log("Hello, World!");'
  clearConsole()
  errors.value = []
}

const formatCode = () => {
  if (lessonEditor.value) {
    lessonEditor.value.formatCode()
  }
}

const runCode = async () => {
  if (!lessonEditor.value || isRunning.value) return
  
  isRunning.value = true
  clearConsole()
  
  try {
    const result = await lessonEditor.value.executeCode()
    
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
  
  nextTick(() => {
    if (consoleOutput.value) {
      consoleOutput.value.scrollTop = consoleOutput.value.scrollHeight
    }
  })
}

// Event handlers
const onCodeChange = (newCode: string) => {
  code.value = newCode
}

const onEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
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
  if (lessonEditor.value && lessonEditor.value.editor) {
    lessonEditor.value.editor.setPosition({
      lineNumber: error.startLineNumber,
      column: error.startColumn
    })
    lessonEditor.value.editor.focus()
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

// Resizer functionality
const startResize = (e: MouseEvent) => {
  isResizing.value = true
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
  e.preventDefault()
}

const onResize = (e: MouseEvent) => {
  if (!isResizing.value) return
  
  const editorSection = document.querySelector('.editor-layout') as HTMLElement
  if (editorSection) {
    const rect = editorSection.getBoundingClientRect()
    const newWidth = ((e.clientX - rect.left) / rect.width) * 100
    editorWidth.value = Math.max(30, Math.min(80, newWidth))
  }
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}

// Cleanup
onUnmounted(() => {
  if (isResizing.value) {
    stopResize()
  }
})
</script>

<style scoped>
.lesson-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
}

/* Navigation Header */
.lesson-header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.lesson-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

.nav-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  min-width: 100px;
}

.nav-button:hover:not(:disabled) {
  background: #5a6fd8;
  transform: translateY(-1px);
}

.nav-button:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  transform: none;
}

.lesson-info {
  text-align: center;
  flex: 1;
  margin: 0 2rem;
}

.lesson-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.lesson-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.phase-badge {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.difficulty-badge {
  background: #fbbf24;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.time-badge {
  background: #10b981;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Main Content */
.lesson-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Important for flex overflow */
  margin-bottom: 0;
}

/* Content Section - Auto height based on content */
.content-section {
  flex-shrink: 0;
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  min-height: 320px;
  max-height: 50vh;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: start;
}

.goal-card,
.completion-card,
.task-card,
.hints-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 1.2rem;
}

.card-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  flex: 1;
}

.toggle-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
}

.card-content {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.hints-content {
  margin-top: 1rem;
}

.hint-item {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  align-items: flex-start;
}

.hint-number {
  background: #667eea;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}

.hint-text {
  color: #64748b;
  line-height: 1.5;
}

.no-hints {
  color: #94a3b8;
  font-style: italic;
  text-align: center;
  margin: 1rem 0;
}


/* Editor Section - Takes remaining space */
.editor-section {
  flex: 1;
  background: #1e293b;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  margin-bottom: 0;
}

.editor-layout {
  display: flex;
  flex: 1;
  min-height: 0;
}

.editor-pane {
  display: flex;
  flex-direction: column;
  background: #1e293b;
  border-right: 1px solid #334155;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #334155;
  border-bottom: 1px solid #475569;
}

.editor-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 500;
}

.editor-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  background: #475569;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.control-btn:hover {
  background: #64748b;
}

.control-btn.run {
  background: #10b981;
}

.control-btn.run:hover {
  background: #059669;
}

.control-btn.run.running {
  background: #fbbf24;
}

.control-btn.reset:hover {
  background: #ef4444;
}

.monaco-container {
  flex: 1;
  overflow: hidden;
}

/* Resizer */
.resizer {
  width: 4px;
  background: #334155;
  cursor: col-resize;
  transition: background-color 0.2s;
}

.resizer:hover {
  background: #667eea;
}

/* Output Pane */
.output-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  min-width: 300px;
}

.output-tabs {
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.tab-btn {
  background: transparent;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #64748b;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  position: relative;
}

.tab-btn:hover {
  color: #1e293b;
  background: #f1f5f9;
}

.tab-btn.active {
  color: #667eea;
  border-bottom-color: #667eea;
  background: white;
}

.error-count {
  background: #ef4444;
  color: white;
  border-radius: 10px;
  padding: 0.125rem 0.5rem;
  font-size: 0.7rem;
  margin-left: 0.5rem;
}

.tab-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Console Panel */
.console-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.console-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
}

.clear-btn {
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.clear-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.console-output {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.console-entry {
  display: flex;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.125rem;
}

.console-entry.log {
  color: #1e293b;
}

.console-entry.error {
  background: #fef2f2;
  color: #dc2626;
}

.console-entry.warn {
  background: #fffbeb;
  color: #d97706;
}

.console-entry.info {
  background: #eff6ff;
  color: #2563eb;
}

.timestamp {
  color: #64748b;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.message {
  flex: 1;
  word-break: break-all;
}

/* Errors Panel */
.errors-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.errors-header {
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
}

.errors-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.error-item {
  display: flex;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.error-item:hover {
  background: #f8fafc;
}

.error-severity {
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
}

.severity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.severity-dot.error { background: #dc2626; }
.severity-dot.warning { background: #d97706; }
.severity-dot.info { background: #2563eb; }
.severity-dot.hint { background: #64748b; }

.error-details {
  flex: 1;
}

.error-message {
  font-size: 0.9rem;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.error-location {
  font-size: 0.8rem;
  color: #64748b;
}

/* Explanation Panel */
.explanation-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.explanation-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
}

.explanation-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.explanation-content p {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* Empty States */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: #64748b;
  font-style: italic;
}

/* Progress Footer */
.lesson-footer {
  background: white;
  border-top: 2px solid #e2e8f0;
  padding: 1.5rem 2rem;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
}

.lesson-footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  gap: 2rem;
}

.progress-section {
  flex: 1;
  max-width: 400px;
}

.progress-bar-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-label {
  font-size: 0.9rem;
  color: #64748b;
  white-space: nowrap;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  transition: width 0.3s ease;
  min-width: 2px; /* 最小幅を設定して0%でも見えるように */
}

.progress-text {
  font-size: 0.9rem;
  color: #64748b;
  white-space: nowrap;
}

.lesson-actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.completion-btn {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  color: #64748b;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.completion-btn.completed {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.completion-btn:hover {
  border-color: #10b981;
  color: #10b981;
}

.completion-btn.completed:hover {
  background: #059669;
  border-color: #059669;
}

.next-lesson-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.next-lesson-btn:hover {
  background: #5a6fd8;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .content-section {
    max-height: 60vh;
  }
  
  .editor-layout {
    flex-direction: column;
  }
  
  .editor-pane {
    width: 100% !important;
    height: 50%;
    border-right: none;
    border-bottom: 1px solid #334155;
  }
  
  .resizer {
    display: none;
  }
  
  .output-pane {
    height: 50%;
  }
  
  .lesson-footer-content {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .progress-section {
    max-width: none;
  }
  
  .lesson-actions {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .lesson-nav {
    flex-direction: column;
    gap: 1rem;
  }
  
  .lesson-info {
    margin: 0;
  }
  
  .lesson-title {
    font-size: 1.25rem;
  }
  
  .lesson-meta {
    justify-content: center;
  }
  
  .content-section {
    padding: 1rem;
    min-height: 280px;
    max-height: 70vh;
  }
  
  .editor-section {
    min-height: 350px;
    padding-bottom: 0.75rem;
  }
  
  .lesson-footer {
    padding: 1.25rem 1rem;
    margin-top: 0.5rem;
  }
  
  .lesson-footer-content {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .progress-section {
    max-width: none;
  }
  
  .lesson-actions {
    justify-content: center;
  }
}
</style>