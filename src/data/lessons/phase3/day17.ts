import type { LessonContent } from '@/types/content'

export const day17: LessonContent = {
  day: 17,
  title: "Promiseと非同期処理",
  goal: "非同期関数に型を付ける方法を理解する",
  completion: "Promise<T> を返す関数が書ける",
  task: "APIから取得したデータの型を定義して取得関数を実装",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 35,
  tags: ['Promise', '非同期', 'async/await', 'API'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14, 15, 16]
} as const