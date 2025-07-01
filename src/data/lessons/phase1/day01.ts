import type { LessonContent } from '@/types/content'

export const day01: LessonContent = {
  day: 1,
  title: "変数の宣言と基本型の理解",
  goal: "let, const, var の違いが説明できる",
  completion: "基本的な変数の使い分けができる",
  task: "名前と年齢を変数に代入してコンソールに表示",
  phase: 1,
  difficulty: 'beginner',
  estimatedTime: 15,
  tags: ['変数', 'スコープ', '基本文法', 'JavaScript'],
  prerequisites: []
} as const