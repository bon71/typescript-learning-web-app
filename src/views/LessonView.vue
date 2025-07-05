<template>
  <div class="lesson-view">
    <!-- Navigation Header -->
    <div class="lesson-header">
      <div class="lesson-nav">
        <div class="nav-left">
          <button 
            @click="goToPhaseOverview"
            class="nav-button phase-back"
          >
            📚 フェーズ選択
          </button>
          <button 
            @click="goToPreviousLesson" 
            :disabled="!hasPreviousLesson"
            class="nav-button prev"
          >
            ← 前へ
          </button>
        </div>
        
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
        
        <div class="nav-right">
          <button 
            @click="goToNextLesson" 
            :disabled="!hasNextLesson"
            class="nav-button next"
          >
            次へ →
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="lesson-content">
      <!-- New Exercise Panel (Replaces old content structure) -->
      <ExercisePanel 
        :lesson="lesson" 
        @exercise-completed="onExerciseCompleted"
        @exercise-attempted="onExerciseAttempted"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { LessonContent } from '@/types/content'
import { allLessons, getLessonByDay } from '@/data/lessons/index'
import { useLearningProgress } from '@/composables/useLearningProgress'
import ExercisePanel from '@/components/ExercisePanel.vue'

interface Props {
  id: number
}

const props = defineProps<Props>()
const router = useRouter()

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

const goToPhaseOverview = () => {
  router.push('/phases')
}

// Progress calculations
const overallProgress = computed(() => progressStats.value.totalProgress)

const isCompleted = computed(() => 
  isLessonCompleted(props.id).value
)

const toggleCompletion = () => {
  toggleLessonCompletion(props.id)
}


// ExercisePanel event handlers
const onExerciseCompleted = (day: number) => {
  console.log(`Exercise completed for day ${day}`)
  
  // 演習完了時にレッスンも完了状態にする
  if (!isCompleted.value) {
    toggleCompletion()
  }
}

const onExerciseAttempted = (day: number) => {
  console.log(`Exercise attempted for day ${day}`)
  // 必要に応じて進捗追跡のロジックを追加
}






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

.nav-left,
.nav-right {
  display: flex;
  gap: 1rem;
  align-items: center;
  min-width: 200px;
}

.nav-right {
  justify-content: flex-end;
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

.nav-button.phase-back {
  background: #10b981;
  border: 2px solid #10b981;
}

.nav-button.phase-back:hover {
  background: #059669;
  border-color: #059669;
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

/* Content Section - Compact layout */
.content-section {
  flex-shrink: 0;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  min-height: 200px;
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


/* Editor Section - Expanded to take more space */
.editor-section {
  flex: 1;
  background: #f8fafc;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
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
  background: white;
  border-radius: 8px;
  overflow: hidden;
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

.control-btn.format {
  background: #667eea;
}

.control-btn.format:hover {
  background: #5a6fd8;
}

.control-btn.reset:hover {
  background: #ef4444;
}

.monaco-container {
  flex: 1;
  overflow: hidden;
}

/* Output Section */
.output-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-top: 1px solid #334155;
  min-height: 200px;
}

.output-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
  color: #1e293b;
}

.clear-output-btn {
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.clear-output-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.output-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  background: #ffffff;
}

.output-entry {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.125rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.output-entry.log {
  color: #1e293b;
}

.output-entry.error {
  background: #fef2f2;
  color: #dc2626;
  border-left: 3px solid #dc2626;
}

.output-entry.warn {
  background: #fffbeb;
  color: #d97706;
  border-left: 3px solid #d97706;
}

.output-entry.info {
  background: #eff6ff;
  color: #2563eb;
  border-left: 3px solid #2563eb;
}

.empty-output {
  color: #94a3b8;
  font-style: italic;
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 8px;
  margin: 1rem;
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
  
  
  .editor-layout {
    flex-direction: column;
  }
  
  .editor-pane {
    width: 100% !important;
    height: 50%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    border-radius: 8px 8px 0 0;
  }
  
  .grader-pane {
    width: 100% !important;
    border-left: none;
    border-top: 1px solid #e2e8f0;
    border-radius: 0 0 8px 8px;
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
  
  .nav-left,
  .nav-right {
    min-width: auto;
    justify-content: center;
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
  }
  
  .editor-section {
    min-height: 350px;
    padding-bottom: 0.75rem;
  }
  
  .grader-pane {
    width: 100% !important;
    border-left: none;
    border-top: 1px solid #e2e8f0;
    border-radius: 0 0 8px 8px;
  }
  
  .auto-grader-panel.compact {
    padding: 0.5rem;
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

/* Grader Panel */
.grader-pane {
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
}

.auto-grader-panel {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.no-grader-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.no-grader-content {
  text-align: center;
  color: #64748b;
}

.no-grader-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-grader-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.75rem;
}

.no-grader-content p {
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

/* Code and Output Section Styles */
.code-section {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  min-height: 300px;
}

.output-section {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  min-height: 200px;
}

.output-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
  color: #1e293b;
}

.output-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  background: #ffffff;
}

.output-entry {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.125rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.output-entry.log {
  color: #1e293b;
}

.output-entry.error {
  background: #fef2f2;
  color: #dc2626;
  border-left: 3px solid #dc2626;
}

.output-entry.warn {
  background: #fffbeb;
  color: #d97706;
  border-left: 3px solid #d97706;
}

.output-entry.info {
  background: #eff6ff;
  color: #2563eb;
  border-left: 3px solid #2563eb;
}

.clear-output-btn {
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.clear-output-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.empty-output {
  color: #94a3b8;
  font-style: italic;
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 8px;
  margin: 1rem;
}

/* Compact Grader Panel Styles */
.grader-pane.compact {
  background: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.auto-grader-panel.compact {
  flex: 1;
  padding: 0.75rem;
  overflow-y: auto;
}

.no-grader-panel.compact {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

</style>