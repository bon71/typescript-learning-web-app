import type { LessonContent } from '@/types/content'

export const day05: LessonContent = {
  day: 5,
  title: "オブジェクトの基本",
  goal: "オブジェクトの作成とアクセスを理解する",
  completion: "メソッド付きオブジェクトを使える",
  task: "user オブジェクトと sayHello() メソッドを実装",
  phase: 1,
  difficulty: 'beginner',
  estimatedTime: 20,
  tags: ['オブジェクト', 'メソッド', 'プロパティ', 'JavaScript'],
  prerequisites: [1, 2, 3, 4]
} as const