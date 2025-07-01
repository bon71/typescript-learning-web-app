// フェーズ別レッスンデータのインポート
import { phase1Lessons } from './lessons/phase1'
import { phase2Lessons } from './lessons/phase2'
import { phase3Lessons } from './lessons/phase3'

// フェーズ情報のインポート
import { allPhases } from './phases'

// 型のインポート
import type { LessonContent, PhaseContent, ContentStatistics } from '@/types/content'

// 全レッスンデータの統合
export const allLessons: readonly LessonContent[] = [
  ...phase1Lessons,
  ...phase2Lessons,
  ...phase3Lessons
] as const

// 既存コンポーネント互換性のためのエクスポート
export const learningData = allLessons
export const phaseInfo = allPhases

// 新しいデータのエクスポート
export { allPhases }

// ヘルパー関数のエクスポート
export const getLessonsByPhase = (phase: number): LessonContent[] => {
  return allLessons.filter(lesson => lesson.phase === phase)
}

export const getLessonByDay = (day: number): LessonContent | undefined => {
  return allLessons.find(lesson => lesson.day === day)
}

// 統計情報の計算
export const getContentStatistics = (): ContentStatistics => {
  const phase1Count = allLessons.filter(lesson => lesson.phase === 1).length
  const phase2Count = allLessons.filter(lesson => lesson.phase === 2).length
  const phase3Count = allLessons.filter(lesson => lesson.phase === 3).length
  
  const totalEstimatedTime = allLessons.reduce((sum, lesson) => 
    sum + (lesson.estimatedTime || 15), 0)
  
  return {
    totalLessons: allLessons.length,
    totalPhases: allPhases.length,
    phase1Lessons: phase1Count,
    phase2Lessons: phase2Count,
    phase3Lessons: phase3Count,
    averageTimePerLesson: totalEstimatedTime / allLessons.length,
    totalEstimatedTime
  }
}

// 型の再エクスポート（既存互換性）
export type { LessonContent as LearningDay } from '@/types/content'
export type { PhaseContent as PhaseInfo } from '@/types/content'