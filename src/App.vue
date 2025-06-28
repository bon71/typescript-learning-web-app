<template>
  <div class="app">
    <ProgressHeader :progress-stats="progressStats" />
    
    <PhaseTabs 
      :current-phase="currentPhase"
      @change-phase="setPhase"
    />

    <main>
      <Transition name="fade" mode="out-in">
        <div 
          v-for="phaseData in phaseInfo" 
          :key="phaseData.id"
          v-show="currentPhase === phaseData.id"
          class="phase active"
        >
          <h2 class="phase-title">{{ phaseData.title }}</h2>
          <p class="phase-description">{{ phaseData.description }}</p>
          
          <!-- 新しいトグルスタイルUI -->
          <div class="learning-list">
            <LearningToggleItem
              v-for="day in getPhaseData(phaseData.id).value"
              :key="day.day"
              :learning-day="day"
              :is-completed="isCompleted(day.day).value"
              :is-sample-code-shown="isSampleCodeShown(day.day).value"
              @toggle-completion="toggleCompletion"
              @toggle-sample-code="toggleSampleCode"
            />
          </div>
        </div>
      </Transition>
    </main>

    <StatsFooter 
      :progress-stats="progressStats"
      @reset-progress="resetProgress"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { learningData, phaseInfo } from '@/data/learningData'
import { useLearningProgress } from '@/composables/useLearningProgress'
import ProgressHeader from '@/components/ProgressHeader.vue'
import PhaseTabs from '@/components/PhaseTabs.vue'
import LearningToggleItem from '@/components/LearningToggleItem.vue'
import StatsFooter from '@/components/StatsFooter.vue'

const {
  currentPhase,
  progressStats,
  getPhaseData,
  toggleCompletion,
  toggleSampleCode,
  resetProgress,
  setPhase,
  isCompleted,
  isSampleCodeShown
} = useLearningProgress(learningData)

// キーボードショートカット
onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key >= '1' && e.key <= '3') {
      e.preventDefault()
      setPhase(parseInt(e.key))
    }
  }
  
  document.addEventListener('keydown', handleKeyDown)
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown)
  }
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.phase {
  padding: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.phase-title {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
}

.phase-description {
  color: #666;
  margin-bottom: 40px;
  font-size: 1.1rem;
  text-align: center;
  line-height: 1.6;
}

.learning-list {
  width: 100%;
}

/* フェードアニメーション */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .phase {
    padding: 20px 15px;
  }
  
  .phase-title {
    font-size: 1.5rem;
  }
  
  .phase-description {
    font-size: 1rem;
    margin-bottom: 30px;
  }
}
</style>