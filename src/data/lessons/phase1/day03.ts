import type { LessonContent } from '@/types/content'

export const day03: LessonContent = {
  day: 3,
  title: "配列とループ",
  goal: "配列操作と繰り返し処理の基礎を理解する",
  completion: "for, forEach, map を使い分けできる",
  task: "果物リストをすべて大文字にして出力",
  phase: 1,
  difficulty: 'beginner',
  estimatedTime: 20,
  tags: ['配列', 'ループ', 'for文', 'forEach', 'map', 'JavaScript'],
  prerequisites: [1, 2]
} as const