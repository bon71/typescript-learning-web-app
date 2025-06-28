import { ref, computed, watch } from 'vue'
import type { LearningDay, ProgressStats } from '@/types/learning'

export function useLearningProgress(learningData: LearningDay[]) {
  // リアクティブな状態
  const completedDays = ref<number[]>(
    JSON.parse(localStorage.getItem('completedDays') || '[]')
  )
  const studyStreak = ref<number>(
    parseInt(localStorage.getItem('studyStreak') || '0')
  )
  const currentPhase = ref<number>(1)

  // 進捗の計算
  const progressStats = computed<ProgressStats>(() => {
    const totalDays = learningData.length
    const completed = completedDays.value.length
    const totalProgress = Math.round((completed / totalDays) * 100)

    // フェーズごとの進捗
    const getPhaseProgress = (phase: number) => {
      const phaseData = learningData.filter(item => item.phase === phase)
      const phaseCompleted = phaseData.filter(item => 
        completedDays.value.includes(item.day)
      ).length
      return Math.round((phaseCompleted / phaseData.length) * 100)
    }

    return {
      totalProgress,
      completedDays: completed,
      remainingDays: totalDays - completed,
      phase1Progress: getPhaseProgress(1),
      phase2Progress: getPhaseProgress(2),
      phase3Progress: getPhaseProgress(3),
      studyStreak: studyStreak.value
    }
  })

  // フェーズごとのデータ
  const getPhaseData = (phase: number) => 
    computed(() => learningData.filter(item => item.phase === phase))

  // 完了状態の切り替え
  const toggleCompletion = (day: number) => {
    const index = completedDays.value.indexOf(day)
    
    if (index > -1) {
      completedDays.value.splice(index, 1)
    } else {
      completedDays.value.push(day)
      updateStudyStreak()
    }
  }

  // 学習継続日数の更新
  const updateStudyStreak = () => {
    const today = new Date().toDateString()
    const lastStudyDate = localStorage.getItem('lastStudyDate')
    
    if (lastStudyDate !== today) {
      studyStreak.value++
      localStorage.setItem('lastStudyDate', today)
    }
  }

  // 進捗のリセット
  const resetProgress = () => {
    if (confirm('本当に進捗をリセットしますか？この操作は取り消せません。')) {
      completedDays.value = []
      studyStreak.value = 0
      
      localStorage.removeItem('completedDays')
      localStorage.removeItem('studyStreak')
      localStorage.removeItem('lastStudyDate')
    }
  }

  // フェーズの切り替え
  const setPhase = (phase: number) => {
    currentPhase.value = phase
  }

  // 完了状態チェック
  const isCompleted = (day: number) => 
    computed(() => completedDays.value.includes(day))

  // ローカルストレージへの保存
  watch(completedDays, (newValue) => {
    localStorage.setItem('completedDays', JSON.stringify(newValue))
  }, { deep: true })

  watch(studyStreak, (newValue) => {
    localStorage.setItem('studyStreak', newValue.toString())
  })

  return {
    completedDays,
    studyStreak,
    currentPhase,
    progressStats,
    getPhaseData,
    toggleCompletion,
    resetProgress,
    setPhase,
    isCompleted
  }
}