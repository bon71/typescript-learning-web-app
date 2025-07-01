import type { LessonContent } from '@/types/content'

export const day16: LessonContent = {
  day: 16,
  title: "型ガード",
  goal: "型による分岐（型ガード）を理解する",
  completion: "typeof, in, instanceof を使える",
  task: "型に応じて処理が変わる関数を定義",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 30,
  tags: ['型ガード', 'typeof', 'instanceof', '型安全性'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14, 15]
} as const