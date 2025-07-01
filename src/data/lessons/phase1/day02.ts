import type { LessonContent } from '@/types/content'

export const day02: LessonContent = {
  day: 2,
  title: "条件分岐と比較演算子",
  goal: "条件分岐を用いた基本ロジックが書ける",
  completion: "if/switch 文を使える",
  task: "年齢に応じた出力（例: 未成年/成人）を表示",
  phase: 1,
  difficulty: 'beginner',
  estimatedTime: 15,
  tags: ['条件分岐', 'if文', 'switch文', 'JavaScript'],
  prerequisites: [1]
} as const