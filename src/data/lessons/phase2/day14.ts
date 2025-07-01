import type { LessonContent } from '@/types/content'

export const day14: LessonContent = {
  day: 14,
  title: "クラスとTypeScript",
  goal: "クラスの定義と型注釈を理解する",
  completion: "メソッドを含むクラスを作れる",
  task: "User クラスを作り、名前とログインメソッドを実装",
  phase: 2,
  difficulty: 'intermediate',
  estimatedTime: 25,
  tags: ['クラス', 'メソッド', 'コンストラクタ'],
  prerequisites: [8, 9, 10, 11, 12, 13]
} as const