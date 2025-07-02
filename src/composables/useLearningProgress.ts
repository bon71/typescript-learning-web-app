import { ref, computed, watch } from 'vue'
import { allLessons } from '@/data'
import type { LessonContent } from '@/types/content'

export interface ProgressStats {
  completedLessons: number
  totalLessons: number
  completedDays: number[]
  totalProgress: number
  totalStudyTime: string
  phase1Progress: number
  phase2Progress: number
  phase3Progress: number
}

export function useLearningProgress() {
  // リアクティブな状態
  const completedDays = ref<number[]>(
    JSON.parse(localStorage.getItem('completedDays') || '[]')
  )
  
  const studyStreak = ref<number>(
    parseInt(localStorage.getItem('studyStreak') || '0')
  )
  
  const totalStudyTimeMinutes = ref<number>(
    parseInt(localStorage.getItem('totalStudyTime') || '0')
  )

  // 進捗の計算
  const progressStats = computed<ProgressStats>(() => {
    const totalLessons = allLessons.length
    const completed = completedDays.value.length
    const totalProgress = Math.round((completed / totalLessons) * 100)

    // フェーズごとの進捗
    const getPhaseProgress = (phase: number) => {
      const phaseData = allLessons.filter(lesson => lesson.phase === phase)
      const phaseCompleted = phaseData.filter(lesson => 
        completedDays.value.includes(lesson.day)
      ).length
      return phaseData.length > 0 ? Math.round((phaseCompleted / phaseData.length) * 100) : 0
    }

    // 学習時間をフォーマット
    const formatStudyTime = (minutes: number): string => {
      if (minutes < 60) {
        return `${minutes}分`
      } else {
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        return `${hours}時間${remainingMinutes}分`
      }
    }

    return {
      completedLessons: completed,
      totalLessons,
      completedDays: completedDays.value,
      totalProgress,
      totalStudyTime: formatStudyTime(totalStudyTimeMinutes.value),
      phase1Progress: getPhaseProgress(1),
      phase2Progress: getPhaseProgress(2),
      phase3Progress: getPhaseProgress(3)
    }
  })

  // レッスン完了状態の確認
  const isCompleted = (day: number) => {
    return computed(() => completedDays.value.includes(day))
  }

  // レッスン完了の切り替え
  const toggleCompletion = (day: number) => {
    const index = completedDays.value.indexOf(day)
    if (index > -1) {
      completedDays.value.splice(index, 1)
    } else {
      completedDays.value.push(day)
      // 学習時間を追加（仮の実装）
      const lesson = allLessons.find(l => l.day === day)
      if (lesson) {
        totalStudyTimeMinutes.value += lesson.estimatedTime || 15
      }
    }
  }

  // 進捗のリセット
  const resetProgress = () => {
    completedDays.value = []
    studyStreak.value = 0
    totalStudyTimeMinutes.value = 0
  }

  // ローカルストレージへの保存
  watch(completedDays, (newDays) => {
    localStorage.setItem('completedDays', JSON.stringify(newDays))
  }, { deep: true })

  watch(studyStreak, (newStreak) => {
    localStorage.setItem('studyStreak', newStreak.toString())
  })

  watch(totalStudyTimeMinutes, (newTime) => {
    localStorage.setItem('totalStudyTime', newTime.toString())
  })

  return {
    progressStats,
    isCompleted,
    toggleCompletion,
    resetProgress
  }
}