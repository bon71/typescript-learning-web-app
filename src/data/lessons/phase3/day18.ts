import type { LessonContent } from '@/types/content'

export const day18: LessonContent = {
  day: 18,
  title: "Utility Types",
  goal: "Partial, Pick, Record の使い方を理解",
  completion: "Utility Typesを使って型を柔軟に変更できる",
  task: "User から一部のプロパティだけを抽出して使う",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 30,
  tags: ['Utility Types', 'Partial', 'Pick', 'Record'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
} as const