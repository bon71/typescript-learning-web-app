import type { LessonContent } from '@/types/content'
import { phase1Lessons } from './phase1'
import { phase2Lessons } from './phase2'
import { phase3Lessons } from './phase3'

// すべてのレッスンを統合
export const allLessons: LessonContent[] = [
  ...phase1Lessons,
  ...phase2Lessons,
  ...phase3Lessons
]

// Day番号でレッスンを取得する関数
export function getLessonByDay(day: number): LessonContent | null {
  return allLessons.find(lesson => lesson.day === day) || null
}

// Phase別エクスポート
export { phase1Lessons, phase2Lessons, phase3Lessons }