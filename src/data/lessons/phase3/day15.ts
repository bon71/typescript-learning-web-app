import type { LessonContent } from '@/types/content'

export const day15: LessonContent = {
  day: 15,
  title: "Generics",
  goal: "ジェネリクスの定義と利用方法を理解する",
  completion: "<T> を使った関数が書ける",
  task: "任意の配列の先頭要素を返す getFirst<T>() を作成",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 30,
  tags: ['Generics', 'ジェネリクス', '高度な型'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14]
} as const