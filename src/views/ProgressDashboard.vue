<template>
  <div class="progress-dashboard">
    <!-- Header -->
    <div class="page-header">
      <div class="container">
        <button @click="$router.push('/')" class="back-button">
          ← ホームに戻る
        </button>
        <h1 class="page-title">学習進捗ダッシュボード</h1>
        <p class="page-subtitle">
          あなたの学習の成果を確認しましょう
        </p>
      </div>
    </div>

    <div class="container">
      <!-- Overview Cards -->
      <div class="overview-section">
        <div class="overview-grid">
          <div class="overview-card">
            <div class="card-icon">📚</div>
            <div class="card-content">
              <div class="card-number">{{ progressStats.completedLessons }}</div>
              <div class="card-label">完了レッスン</div>
              <div class="card-total">/ {{ totalLessons }}</div>
            </div>
          </div>
          
          <div class="overview-card">
            <div class="card-icon">📈</div>
            <div class="card-content">
              <div class="card-number">{{ Math.round(overallProgress) }}%</div>
              <div class="card-label">全体進捗</div>
              <div class="card-total">完了率</div>
            </div>
          </div>
          
          <div class="overview-card">
            <div class="card-icon">⏱️</div>
            <div class="card-content">
              <div class="card-number">{{ progressStats.totalStudyTime }}</div>
              <div class="card-label">学習時間</div>
              <div class="card-total">累計</div>
            </div>
          </div>
          
          <div class="overview-card">
            <div class="card-icon">🔥</div>
            <div class="card-content">
              <div class="card-number">{{ studyStreak }}</div>
              <div class="card-label">連続学習</div>
              <div class="card-total">日間</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Charts -->
      <div class="charts-section">
        <div class="charts-grid">
          <!-- Phase Progress -->
          <div class="chart-card">
            <h3 class="chart-title">フェーズ別進捗</h3>
            <div class="phase-progress-chart">
              <div 
                v-for="phase in allPhases" 
                :key="phase.id"
                class="phase-progress-item"
              >
                <div class="phase-info">
                  <div class="phase-name">Phase {{ phase.id }}</div>
                  <div class="phase-percentage">{{ getPhaseProgress(phase.id) }}%</div>
                </div>
                <div class="phase-bar">
                  <div 
                    class="phase-fill" 
                    :style="{ 
                      width: getPhaseProgress(phase.id) + '%',
                      backgroundColor: getPhaseColor(phase.id)
                    }"
                  ></div>
                </div>
                <div class="phase-stats">
                  {{ getCompletedLessons(phase.id) }}/{{ getLessonCount(phase.id) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="chart-card">
            <h3 class="chart-title">最近の学習活動</h3>
            <div class="activity-list">
              <div 
                v-for="activity in recentActivities" 
                :key="activity.id"
                class="activity-item"
              >
                <div class="activity-icon">{{ activity.icon }}</div>
                <div class="activity-content">
                  <div class="activity-title">{{ activity.title }}</div>
                  <div class="activity-time">{{ activity.time }}</div>
                </div>
                <div class="activity-status">{{ activity.status }}</div>
              </div>
              <div v-if="recentActivities.length === 0" class="no-activity">
                まだ学習活動がありません
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Progress -->
      <div class="detailed-section">
        <h2 class="section-title">詳細進捗</h2>
        
        <div class="progress-tabs">
          <button 
            v-for="tab in progressTabs"
            :key="tab.id"
            :class="['tab-button', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.icon }} {{ tab.label }}
          </button>
        </div>

        <!-- Lessons Progress -->
        <div v-if="activeTab === 'lessons'" class="lessons-progress">
          <div class="lessons-grid">
            <div 
              v-for="lesson in allLessons" 
              :key="lesson.day"
              :class="['lesson-progress-card', { 
                completed: isLessonCompleted(lesson.day),
                current: !isLessonCompleted(lesson.day) && isNextLesson(lesson)
              }]"
              @click="$router.push(`/lesson/${lesson.day}`)"
            >
              <div class="lesson-header">
                <div class="lesson-day">Day {{ lesson.day }}</div>
                <div class="lesson-status-icon">
                  {{ isLessonCompleted(lesson.day) ? '✅' : '⭕' }}
                </div>
              </div>
              <div class="lesson-title">{{ lesson.title }}</div>
              <div class="lesson-phase">Phase {{ lesson.phase }}</div>
            </div>
          </div>
        </div>

        <!-- Achievements -->
        <div v-if="activeTab === 'achievements'" class="achievements-section">
          <div class="achievements-grid">
            <div 
              v-for="achievement in achievements" 
              :key="achievement.id"
              :class="['achievement-card', { unlocked: achievement.unlocked }]"
            >
              <div class="achievement-icon">{{ achievement.icon }}</div>
              <div class="achievement-content">
                <div class="achievement-title">{{ achievement.title }}</div>
                <div class="achievement-description">{{ achievement.description }}</div>
                <div v-if="!achievement.unlocked" class="achievement-progress">
                  {{ achievement.progress }}/{{ achievement.target }}
                </div>
              </div>
              <div v-if="achievement.unlocked" class="achievement-badge">
                獲得済み
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div v-if="activeTab === 'stats'" class="statistics-section">
          <div class="stats-grid">
            <div class="stat-group">
              <h4>学習統計</h4>
              <div class="stat-items">
                <div class="stat-item">
                  <span class="stat-label">平均学習時間/日:</span>
                  <span class="stat-value">{{ averageStudyTime }}分</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">最長連続学習:</span>
                  <span class="stat-value">{{ maxStreak }}日</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">学習開始日:</span>
                  <span class="stat-value">{{ startDate }}</span>
                </div>
              </div>
            </div>
            
            <div class="stat-group">
              <h4>完了率</h4>
              <div class="completion-rates">
                <div class="completion-item">
                  <span class="completion-label">Phase 1:</span>
                  <div class="completion-bar">
                    <div 
                      class="completion-fill" 
                      :style="{ width: getPhaseProgress(1) + '%' }"
                    ></div>
                  </div>
                  <span class="completion-percentage">{{ getPhaseProgress(1) }}%</span>
                </div>
                <div class="completion-item">
                  <span class="completion-label">Phase 2:</span>
                  <div class="completion-bar">
                    <div 
                      class="completion-fill" 
                      :style="{ width: getPhaseProgress(2) + '%' }"
                    ></div>
                  </div>
                  <span class="completion-percentage">{{ getPhaseProgress(2) }}%</span>
                </div>
                <div class="completion-item">
                  <span class="completion-label">Phase 3:</span>
                  <div class="completion-bar">
                    <div 
                      class="completion-fill" 
                      :style="{ width: getPhaseProgress(3) + '%' }"
                    ></div>
                  </div>
                  <span class="completion-percentage">{{ getPhaseProgress(3) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="actions-section">
        <button 
          @click="continueStudy"
          class="action-button primary"
        >
          📚 学習を続ける
        </button>
        <button 
          @click="resetProgress"
          class="action-button secondary"
        >
          🔄 進捗をリセット
        </button>
        <button 
          @click="exportProgress"
          class="action-button secondary"
        >
          📊 進捗をエクスポート
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { allPhases, getLessonsByPhase, allLessons } from '@/data'
import { useLearningProgress } from '@/composables/useLearningProgress'

const router = useRouter()

// Learning progress
const { progressStats, isCompleted: isLessonCompleted, resetProgress: resetProgressData } = useLearningProgress()

// UI state
const activeTab = ref('lessons')

// Progress tabs
const progressTabs = [
  { id: 'lessons', label: 'レッスン', icon: '📚' },
  { id: 'achievements', label: '実績', icon: '🏆' },
  { id: 'stats', label: '統計', icon: '📊' }
]

// Computed values
const totalLessons = allLessons.length

const overallProgress = computed(() => {
  if (totalLessons === 0) return 0
  return (progressStats.value.completedLessons / totalLessons) * 100
})

const studyStreak = computed(() => {
  // Mock implementation - would calculate based on completion dates
  return Math.min(progressStats.value.completedLessons, 7)
})

const averageStudyTime = computed(() => {
  if (progressStats.value.completedLessons === 0) return 0
  return Math.round(15 * progressStats.value.completedLessons / Math.max(1, studyStreak.value))
})

const maxStreak = computed(() => {
  return Math.max(studyStreak.value, 3)
})

const startDate = computed(() => {
  return new Date().toLocaleDateString('ja-JP')
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

const getPhaseColor = (phaseId: number): string => {
  const colors = ['#667eea', '#fbbf24', '#10b981']
  return colors[phaseId - 1] || '#64748b'
}

const isNextLesson = (lesson: any): boolean => {
  const nextLesson = allLessons.find(l => !isLessonCompleted(l.day).value)
  return nextLesson?.day === lesson.day
}

// Recent activities (mock data)
const recentActivities = computed(() => [
  {
    id: 1,
    icon: '✅',
    title: 'Day 3: 配列とオブジェクトを完了',
    time: '2時間前',
    status: '完了'
  },
  {
    id: 2,
    icon: '📚',
    title: 'Day 2: 関数の基本を開始',
    time: '1日前',
    status: '進行中'
  }
].filter((_, index) => index < progressStats.value.completedLessons))

// Achievements (mock data)
const achievements = computed(() => [
  {
    id: 1,
    icon: '🎯',
    title: '初回完了',
    description: '最初のレッスンを完了する',
    unlocked: progressStats.value.completedLessons >= 1,
    progress: Math.min(progressStats.value.completedLessons, 1),
    target: 1
  },
  {
    id: 2,
    icon: '🔥',
    title: '3日連続',
    description: '3日連続で学習する',
    unlocked: studyStreak.value >= 3,
    progress: Math.min(studyStreak.value, 3),
    target: 3
  },
  {
    id: 3,
    icon: '📚',
    title: 'Phase 1 マスター',
    description: 'Phase 1の全レッスンを完了する',
    unlocked: getPhaseProgress(1) === 100,
    progress: getCompletedLessons(1),
    target: getLessonCount(1)
  },
  {
    id: 4,
    icon: '⚡',
    title: 'スピードラーナー',
    description: '1日で5レッスン完了する',
    unlocked: false,
    progress: 0,
    target: 5
  }
])

// Actions
const continueStudy = () => {
  const nextLesson = allLessons.find(lesson => !isLessonCompleted(lesson.day).value)
  if (nextLesson) {
    router.push(`/lesson/${nextLesson.day}`)
  } else {
    router.push('/phases')
  }
}

const resetProgress = () => {
  if (confirm('本当に学習進捗をリセットしますか？この操作は取り消せません。')) {
    resetProgressData()
  }
}

const exportProgress = () => {
  const data = {
    completedLessons: progressStats.value.completedLessons,
    completedDays: progressStats.value.completedDays,
    totalStudyTime: progressStats.value.totalStudyTime,
    exportDate: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'typescript-learning-progress.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.progress-dashboard {
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
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Overview Section */
.overview-section {
  padding: 3rem 0;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.overview-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.overview-card:hover {
  transform: translateY(-2px);
}

.card-icon {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
}

.card-label {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.card-total {
  font-size: 0.8rem;
  color: #94a3b8;
}

/* Charts Section */
.charts-section {
  padding-bottom: 3rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.chart-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.chart-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

/* Phase Progress Chart */
.phase-progress-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.phase-progress-item {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 1rem;
  align-items: center;
}

.phase-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.phase-name {
  font-weight: 500;
  color: #1e293b;
}

.phase-percentage {
  font-size: 0.9rem;
  color: #64748b;
}

.phase-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.phase-fill {
  height: 100%;
  transition: width 0.5s ease;
}

.phase-stats {
  font-size: 0.8rem;
  color: #64748b;
  text-align: right;
}

/* Activity List */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
}

.activity-icon {
  font-size: 1.2rem;
  width: 32px;
  text-align: center;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.8rem;
  color: #64748b;
}

.activity-status {
  font-size: 0.8rem;
  color: #10b981;
  font-weight: 500;
}

.no-activity {
  text-align: center;
  color: #64748b;
  font-style: italic;
  padding: 2rem;
}

/* Detailed Section */
.detailed-section {
  padding-bottom: 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2rem;
  text-align: center;
}

.progress-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tab-button {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  color: #64748b;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.tab-button:hover {
  border-color: #cbd5e1;
  color: #475569;
}

.tab-button.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

/* Lessons Progress */
.lessons-progress {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.lesson-progress-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.lesson-progress-card:hover {
  border-color: #cbd5e1;
  transform: translateY(-2px);
}

.lesson-progress-card.completed {
  background: #ecfdf5;
  border-color: #10b981;
}

.lesson-progress-card.current {
  background: #fffbeb;
  border-color: #fbbf24;
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.lesson-day {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

.lesson-status-icon {
  font-size: 1rem;
}

.lesson-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.lesson-phase {
  font-size: 0.8rem;
  color: #64748b;
}

/* Achievements */
.achievements-section {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.achievement-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s;
}

.achievement-card.unlocked {
  background: #ecfdf5;
  border-color: #10b981;
}

.achievement-icon {
  font-size: 2rem;
  opacity: 0.5;
}

.achievement-card.unlocked .achievement-icon {
  opacity: 1;
}

.achievement-content {
  flex: 1;
}

.achievement-title {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.achievement-description {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.achievement-progress {
  font-size: 0.8rem;
  color: #94a3b8;
}

.achievement-badge {
  background: #10b981;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Statistics */
.statistics-section {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.stat-group h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.stat-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 6px;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748b;
}

.stat-value {
  font-weight: 600;
  color: #1e293b;
}

.completion-rates {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.completion-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
}

.completion-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.completion-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.completion-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.5s ease;
}

.completion-percentage {
  font-size: 0.9rem;
  color: #1e293b;
  font-weight: 600;
}

/* Actions Section */
.actions-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
  flex-wrap: wrap;
}

.action-button {
  padding: 1rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
  font-size: 1rem;
}

.action-button.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.action-button.secondary {
  background: #f8fafc;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.action-button.secondary:hover {
  border-color: #cbd5e1;
  color: #475569;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .overview-grid {
    grid-template-columns: 1fr;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .phase-progress-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-section {
    flex-direction: column;
    align-items: center;
  }
  
  .action-button {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .overview-card {
    flex-direction: column;
    text-align: center;
  }
  
  .lessons-grid {
    grid-template-columns: 1fr;
  }
  
  .achievements-grid {
    grid-template-columns: 1fr;
  }
  
  .achievement-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>