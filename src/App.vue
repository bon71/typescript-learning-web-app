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
          
          <div class="cards-grid">
            <LearningCard
              v-for="day in getPhaseData(phaseData.id).value"
              :key="day.day"
              :learning-day="day"
              :is-completed="isCompleted(day.day).value"
              @toggle-completion="toggleCompletion"
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
import LearningCard from '@/components/LearningCard.vue'
import StatsFooter from '@/components/StatsFooter.vue'

const {
  currentPhase,
  progressStats,
  getPhaseData,
  toggleCompletion,
  resetProgress,
  setPhase,
  isCompleted
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
</style>