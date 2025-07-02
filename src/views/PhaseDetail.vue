<template>
  <div class="phase-detail">
    <!-- Header -->
    <div class="page-header">
      <div class="container">
        <button @click="$router.push('/phases')" class="back-button">
          ← フェーズ一覧に戻る
        </button>
        <div class="phase-info">
          <div class="phase-badge">Phase {{ phase.id }}</div>
          <h1 class="phase-title">{{ phase.title }}</h1>
          <p class="phase-description">{{ phase.description }}</p>
        </div>
        <div class="phase-stats">
          <div class="stat-card">
            <div class="stat-number">{{ completedLessons }}</div>
            <div class="stat-label">完了</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ lessons.length }}</div>
            <div class="stat-label">総数</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ progressPercentage }}%</div>
            <div class="stat-label">進捗</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lessons List -->
    <div class="container">
      <div class="lessons-section">
        <div class="section-header">
          <h2>レッスン一覧</h2>
          <div class="progress-bar-wrapper">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: progressPercentage + '%' }"
              ></div>
            </div>
            <span class="progress-text">{{ completedLessons }}/{{ lessons.length }}</span>
          </div>
        </div>

        <div class="lessons-grid">
          <div 
            v-for="lesson in lessons" 
            :key="lesson.day"
            :class="['lesson-card', { 
              'completed': isLessonCompleted(lesson.day),
              'current': currentLesson?.day === lesson.day 
            }]"
            @click="$router.push(`/lesson/${lesson.day}`)"
          >
            <div class="lesson-header">
              <div class="lesson-number">{{ lesson.day }}</div>
              <div class="lesson-status">
                <div v-if="isLessonCompleted(lesson.day)" class="status-icon completed">
                  ✓
                </div>
                <div v-else-if="currentLesson?.day === lesson.day" class="status-icon current">
                  ▶
                </div>
                <div v-else class="status-icon pending">
                  ○
                </div>
              </div>
            </div>

            <div class="lesson-content">
              <h3 class="lesson-title">{{ lesson.title }}</h3>
              <p class="lesson-goal">{{ lesson.goal }}</p>
              
              <div class="lesson-meta">
                <div class="meta-item">
                  <span class="meta-icon">⏱️</span>
                  <span class="meta-text">{{ lesson.estimatedTime }}分</span>
                </div>
                <div class="meta-item">
                  <span class="meta-icon">🎯</span>
                  <span class="meta-text">{{ lesson.difficulty }}</span>
                </div>
              </div>

              <div v-if="lesson.tags" class="lesson-tags">
                <span 
                  v-for="tag in lesson.tags.slice(0, 3)" 
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="lesson-action">
              <div class="action-text">
                {{ getLessonActionText(lesson) }}
              </div>
              <div class="action-arrow">→</div>
            </div>
          </div>
        </div>

        <!-- Phase Summary -->
        <div class="phase-summary">
          <h3>このフェーズで学ぶこと</h3>
          <div class="summary-content">
            <div class="topics-section">
              <h4>主要トピック</h4>
              <div class="topics-grid">
                <div 
                  v-for="topic in uniqueTopics" 
                  :key="topic"
                  class="topic-item"
                >
                  <span class="topic-icon">📚</span>
                  <span class="topic-name">{{ topic }}</span>
                </div>
              </div>
            </div>
            
            <div class="prerequisites-section" v-if="phase.prerequisites && phase.prerequisites.length > 0">
              <h4>前提知識</h4>
              <ul class="prerequisites-list">
                <li v-for="prerequisite in phase.prerequisites" :key="prerequisite">
                  {{ prerequisite }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="phase-navigation">
          <button 
            v-if="hasPreviousPhase"
            @click="$router.push(`/phase/${phase.id - 1}`)"
            class="nav-button prev"
          >
            ← Phase {{ phase.id - 1 }}
          </button>
          
          <button 
            @click="goToNextLesson"
            class="nav-button continue"
          >
            {{ continueLessonText }}
          </button>
          
          <button 
            v-if="hasNextPhase"
            @click="$router.push(`/phase/${phase.id + 1}`)"
            class="nav-button next"
          >
            Phase {{ phase.id + 1 }} →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { allPhases, getLessonsByPhase } from '@/data'
import { useLearningProgress } from '@/composables/useLearningProgress'
import type { LessonContent } from '@/types/content'

interface Props {
  id: number
}

const props = defineProps<Props>()
const router = useRouter()

// Learning progress
const { isCompleted: isLessonCompleted, progressStats } = useLearningProgress()

// Phase data
const phase = computed(() => {
  const foundPhase = allPhases.find(p => p.id === props.id)
  if (!foundPhase) {
    router.push('/phases')
    return allPhases[0] // Fallback
  }
  return foundPhase
})

const lessons = computed(() => getLessonsByPhase(props.id))

// Progress calculations
const completedLessons = computed(() => {
  return lessons.value.filter(lesson => 
    isLessonCompleted(lesson.day).value
  ).length
})

const progressPercentage = computed(() => {
  if (lessons.value.length === 0) return 0
  return Math.round((completedLessons.value / lessons.value.length) * 100)
})

// Current lesson (next incomplete lesson)
const currentLesson = computed((): LessonContent | null => {
  return lessons.value.find(lesson => 
    !isLessonCompleted(lesson.day).value
  ) || null
})

// Navigation
const hasPreviousPhase = computed(() => props.id > 1)
const hasNextPhase = computed(() => props.id < allPhases.length)

const continueLessonText = computed(() => {
  if (currentLesson.value) {
    return `Day ${currentLesson.value.day} を続ける`
  } else if (completedLessons.value === lessons.value.length) {
    return '全レッスン完了！'
  } else {
    return '最初から始める'
  }
})

const goToNextLesson = () => {
  if (currentLesson.value) {
    router.push(`/lesson/${currentLesson.value.day}`)
  } else if (lessons.value.length > 0) {
    router.push(`/lesson/${lessons.value[0].day}`)
  }
}

// Helper functions
const getLessonActionText = (lesson: LessonContent): string => {
  if (isLessonCompleted(lesson.day).value) {
    return '復習する'
  } else if (currentLesson.value?.day === lesson.day) {
    return '続ける'
  } else {
    return '開始する'
  }
}

const uniqueTopics = computed(() => {
  const allTags = lessons.value.flatMap(lesson => lesson.tags || [])
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8)
    .map(([tag]) => tag)
})
</script>

<style scoped>
.phase-detail {
  min-height: 100vh;
  background: #f8fafc;
}

/* 強制的にヘッダーの背景色と文字色を適用 */
.phase-detail .page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
}

.phase-detail .page-header h1,
.phase-detail .page-header p,
.phase-detail .page-header span,
.phase-detail .page-header div {
  color: white !important;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  padding: 3rem 0;
  position: relative;
  z-index: 1;
}

.page-header * {
  color: white !important;
}

.page-header .container {
  position: relative;
  z-index: 2;
}

.back-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.2s;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.phase-info {
  text-align: center;
  margin-bottom: 2rem;
}

.phase-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
}

.phase-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white !important;
  margin-bottom: 1rem;
}

.phase-description {
  font-size: 1.2rem;
  color: white !important;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.phase-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.stat-card {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  min-width: 100px;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Lessons Section */
.lessons-section {
  padding: 3rem 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
}

.progress-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  width: 200px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

/* Lessons Grid */
.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.lesson-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.lesson-card:hover {
  transform: translateY(-4px);
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.lesson-card.completed {
  border-color: #10b981;
  background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
}

.lesson-card.current {
  border-color: #fbbf24;
  background: linear-gradient(135deg, #fffbeb 0%, #fefce8 100%);
}

.lesson-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.lesson-number {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.lesson-card.completed .lesson-number {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.lesson-card.current .lesson-number {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.status-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
}

.status-icon.completed {
  background: #10b981;
  color: white;
}

.status-icon.current {
  background: #fbbf24;
  color: white;
}

.status-icon.pending {
  background: #e2e8f0;
  color: #64748b;
}

.lesson-content {
  margin-bottom: 1rem;
}

.lesson-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.lesson-goal {
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.lesson-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #f8fafc;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
}

.meta-icon {
  font-size: 0.9rem;
}

.meta-text {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

.lesson-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.tag {
  background: #e0e7ff;
  color: #5b21b6;
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 500;
}

.lesson-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.action-text {
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 500;
}

.action-arrow {
  color: #667eea;
  font-weight: 700;
  transition: transform 0.2s;
}

.lesson-card:hover .action-arrow {
  transform: translateX(4px);
}

/* Phase Summary */
.phase-summary {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.phase-summary h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
}

.summary-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.topics-section h4,
.prerequisites-section h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}

.topic-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.topic-icon {
  font-size: 1.1rem;
}

.topic-name {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.prerequisites-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.prerequisites-list li {
  background: #f0f9ff;
  color: #0c4a6e;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  border-left: 4px solid #0ea5e9;
}

/* Phase Navigation */
.phase-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
}

.nav-button {
  padding: 1rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
  font-size: 1rem;
}

.nav-button.prev {
  background: #f8fafc;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.nav-button.prev:hover {
  border-color: #94a3b8;
  color: #475569;
}

.nav-button.continue {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 1;
  max-width: 300px;
}

.nav-button.continue:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.nav-button.next {
  background: #f8fafc;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.nav-button.next:hover {
  border-color: #94a3b8;
  color: #475569;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-header {
    padding: 2rem 0;
  }
  
  .phase-title {
    font-size: 2rem;
  }
  
  .phase-stats {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .progress-bar-wrapper {
    justify-content: center;
  }
  
  .lessons-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .summary-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .topics-grid {
    grid-template-columns: 1fr;
  }
  
  .phase-navigation {
    flex-direction: column;
    align-items: stretch;
  }
  
  .nav-button.continue {
    max-width: none;
  }
}

@media (max-width: 480px) {
  .lesson-header {
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }
  
  .lesson-meta {
    justify-content: center;
  }
  
  .lesson-action {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
}
</style>