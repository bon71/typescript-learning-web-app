import type { LessonContent } from '@/types/content'

export const day07: LessonContent = {
  day: 7,
  title: "総復習とミニアプリ",
  goal: "一連の構文を組み合わせて使える",
  completion: "JSでUI操作ができる",
  task: "入力された名前を使って挨拶を表示するHTML+JSアプリ",
  phase: 1,
  difficulty: 'intermediate',
  estimatedTime: 30,
  tags: ['総復習', 'アプリ開発', 'HTML', 'JavaScript'],
  prerequisites: [1, 2, 3, 4, 5, 6]
} as const