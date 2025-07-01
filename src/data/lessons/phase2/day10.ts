import type { LessonContent } from '@/types/content'

export const day10: LessonContent = {
  day: 10,
  title: "配列とオブジェクトの型",
  goal: "型付き配列とオブジェクトが作れる",
  completion: "User[] 型を定義し使える",
  task: "ユーザーリストを作成し、出力",
  phase: 2,
  difficulty: 'beginner',
  estimatedTime: 20,
  tags: ['配列型', 'オブジェクト型', 'User'],
  prerequisites: [8, 9]
} as const