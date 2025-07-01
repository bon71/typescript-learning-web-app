import type { LessonContent } from '@/types/content'

export const day09: LessonContent = {
  day: 9,
  title: "基本の型",
  goal: "number, string, boolean を使いこなす",
  completion: "それぞれの変数が定義・使用できる",
  task: "氏名、年齢、ログイン中かどうかのフラグを定義",
  phase: 2,
  difficulty: 'beginner',
  estimatedTime: 15,
  tags: ['number', 'string', 'boolean', 'プリミティブ型'],
  prerequisites: [8]
} as const