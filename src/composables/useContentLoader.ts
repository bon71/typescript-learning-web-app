import { computed } from 'vue'
import { allLessons, allPhases, getLessonsByPhase, getContentStatistics } from '@/data'
import type { LessonContent, PhaseContent } from '@/types/content'

export function useContentLoader() {
  const lessons = computed(() => allLessons)
  const phases = computed(() => allPhases)

  const getPhaseData = (phaseId: number) => 
    computed(() => getLessonsByPhase(phaseId))

  const statistics = computed(() => getContentStatistics())

  const getLessonByDay = (day: number) => 
    computed(() => allLessons.find(lesson => lesson.day === day))

  const getPhaseProgress = (phaseId: number, completedDays: number[]) =>
    computed(() => {
      const phaseLessons = getLessonsByPhase(phaseId)
      const completedInPhase = phaseLessons.filter(lesson => 
        completedDays.includes(lesson.day)
      ).length
      return {
        total: phaseLessons.length,
        completed: completedInPhase,
        percentage: Math.round((completedInPhase / phaseLessons.length) * 100)
      }
    })

  const getEstimatedTime = (dayNumbers: number[]) =>
    computed(() => {
      return dayNumbers.reduce((total, day) => {
        const lesson = allLessons.find(l => l.day === day)
        return total + (lesson?.estimatedTime || 15)
      }, 0)
    })

  const filterLessonsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') =>
    computed(() => allLessons.filter(lesson => lesson.difficulty === difficulty))

  const searchLessons = (query: string) =>
    computed(() => {
      const lowerQuery = query.toLowerCase()
      return allLessons.filter(lesson => 
        lesson.title.toLowerCase().includes(lowerQuery) ||
        lesson.goal.toLowerCase().includes(lowerQuery) ||
        lesson.task.toLowerCase().includes(lowerQuery) ||
        lesson.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    })

  return {
    lessons,
    phases,
    getPhaseData,
    statistics,
    getLessonByDay,
    getPhaseProgress,
    getEstimatedTime,
    filterLessonsByDifficulty,
    searchLessons
  }
}