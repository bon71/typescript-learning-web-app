<template>
  <div class="phase-overview">
    <!-- Header -->
    <div class="page-header">
      <div class="container">
        <button @click="$router.push('/')" class="back-button">
          ← ホームに戻る
        </button>
        <h1 class="page-title">学習フェーズ選択</h1>
        <p class="page-subtitle">
          あなたのレベルに合ったフェーズを選んで学習を始めましょう
        </p>
      </div>
    </div>

    <!-- Phases Grid -->
    <div class="container">
      <div class="phases-grid">
        <div 
          v-for="phase in allPhases" 
          :key="phase.id"
          class="phase-card"
          @click="$router.push(`/phase/${phase.id}`)"
        >
          <div class="phase-header">
            <div class="phase-number">{{ phase.id }}</div>
            <div class="phase-status">
              <div class="progress-ring">
                <svg class="progress-circle" viewBox="0 0 36 36">
                  <path
                    class="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    class="circle-progress"
                    :stroke-dasharray="`${getPhaseProgress(phase.id)}, 100`"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div class="progress-text">{{ getPhaseProgress(phase.id) }}%</div>
              </div>
            </div>
          </div>

          <div class="phase-content">
            <h3 class="phase-title">{{ phase.title }}</h3>
            <p class="phase-description">{{ phase.description }}</p>
            
            <div class="phase-stats">
              <div class="stat-item">
                <span class="stat-icon">📚</span>
                <span class="stat-text">{{ getLessonCount(phase.id) }} レッスン</span>
              </div>
              <div class="stat-item">
                <span class="stat-icon">⏱️</span>
                <span class="stat-text">約{{ getEstimatedTime(phase.id) }}分</span>
              </div>
              <div class="stat-item">
                <span class="stat-icon">🎯</span>
                <span class="stat-text">{{ phase.difficulty }}</span>
              </div>
            </div>

            <div class="phase-topics">
              <h4>学習内容</h4>
              <div class="topics-list">
                <span 
                  v-for="topic in getPhaseTopics(phase.id)" 
                  :key="topic"
                  class="topic-tag"
                >
                  {{ topic }}
                </span>
              </div>
            </div>
          </div>

          <div class="phase-action">
            <div class="completion-info">
              <span class="completed-lessons">
                {{ getCompletedLessons(phase.id) }}/{{ getLessonCount(phase.id) }} 完了
              </span>
            </div>
            <div class="action-button">
              {{ getPhaseProgress(phase.id) === 0 ? '開始する' : '続ける' }}
              →
            </div>
          </div>
        </div>
      </div>

      <!-- Overall Progress -->
      <div class="overall-progress">
        <h2>全体の進捗</h2>
        <div class="progress-summary">
          <div class="summary-card">
            <div class="summary-number">{{ progressStats.completedLessons }}</div>
            <div class="summary-label">完了レッスン</div>
          </div>
          <div class="summary-card">
            <div class="summary-number">{{ totalLessons }}</div>
            <div class="summary-label">総レッスン数</div>
          </div>
          <div class="summary-card">
            <div class="summary-number">{{ Math.round(overallProgress) }}%</div>
            <div class="summary-label">完了率</div>
          </div>
          <div class="summary-card">
            <div class="summary-number">{{ progressStats.totalStudyTime }}</div>
            <div class="summary-label">学習時間</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { allPhases, getLessonsByPhase, allLessons } from '@/data'
import { useLearningProgress } from '@/composables/useLearningProgress'

// Learning progress
const { progressStats } = useLearningProgress()

// Computed values
const totalLessons = allLessons.length

const overallProgress = computed(() => {
  if (totalLessons === 0) return 0
  return (progressStats.value.completedLessons / totalLessons) * 100
})

// Helper functions
const getLessonCount = (phaseId: number): number => {
  return getLessonsByPhase(phaseId).length
}

const getCompletedLessons = (phaseId: number): number => {
  const lessons = getLessonsByPhase(phaseId)
  return lessons.filter(lesson => 
    progressStats.value.completedDays.includes(lesson.day)
  ).length
}

const getPhaseProgress = (phaseId: number): number => {
  const totalLessons = getLessonCount(phaseId)
  if (totalLessons === 0) return 0
  
  const completedLessons = getCompletedLessons(phaseId)
  return Math.round((completedLessons / totalLessons) * 100)
}

const getEstimatedTime = (phaseId: number): number => {
  const lessons = getLessonsByPhase(phaseId)
  return lessons.reduce((total, lesson) => total + (lesson.estimatedTime || 15), 0)
}

const getPhaseTopics = (phaseId: number): string[] => {
  const lessons = getLessonsByPhase(phaseId)
  const allTags = lessons.flatMap(lesson => lesson.tags || [])
  
  // Get unique tags and limit to 5 most common
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([tag]) => tag)
}
</script>

<style scoped>
.phase-overview {
  min-height: 100vh;
  background: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
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
  border-color: rgba(255, 255, 255, 0.5);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Phases Grid */
.phases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  padding: 3rem 0;
}

.phase-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.phase-card:hover {
  transform: translateY(-8px);
  border-color: #667eea;
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
}

.phase-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.phase-number {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
}

.phase-status {
  position: relative;
}

.progress-ring {
  position: relative;
  width: 60px;
  height: 60px;
}

.progress-circle {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circle-bg {
  fill: none;
  stroke: #e2e8f0;
  stroke-width: 3;
}

.circle-progress {
  fill: none;
  stroke: #10b981;
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dasharray 0.6s ease-in-out;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
}

.phase-content {
  margin-bottom: 2rem;
}

.phase-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.phase-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.phase-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.stat-icon {
  font-size: 1.1rem;
}

.stat-text {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.phase-topics h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.topics-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic-tag {
  background: #e0e7ff;
  color: #5b21b6;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.phase-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.completion-info {
  font-size: 0.9rem;
  color: #64748b;
}

.completed-lessons {
  font-weight: 500;
}

.action-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
}

.phase-card:hover .action-button {
  transform: translateX(4px);
}

/* Overall Progress */
.overall-progress {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.overall-progress h2 {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2rem;
}

.progress-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.summary-card {
  text-align: center;
  background: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.summary-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.summary-label {
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .phases-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 2rem 0;
  }
  
  .phase-card {
    padding: 1.5rem;
  }
  
  .phase-stats {
    justify-content: center;
  }
  
  .phase-action {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .action-button {
    text-align: center;
  }
  
  .progress-summary {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 2rem 0;
  }
  
  .phase-header {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  .phase-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .progress-summary {
    grid-template-columns: 1fr;
  }
  
  .summary-number {
    font-size: 2rem;
  }
}
</style>