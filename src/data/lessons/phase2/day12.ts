import type { LessonContent } from '@/types/content'

export const day12: LessonContent = {
  day: 12,
  title: "Union型とLiteral型",
  goal: "複数の型や文字列限定型を理解する",
  completion: "Union/Literal型の使い分けができる",
  task: '"admin" | "user" を受け取る関数を定義',
  phase: 2,
  difficulty: 'intermediate',
  estimatedTime: 20,
  tags: ['Union型', 'Literal型', '高度な型'],
  prerequisites: [8, 9, 10, 11]
} as const