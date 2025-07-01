import type { LessonContent } from '@/types/content'

export const day19: LessonContent = {
  day: 19,
  title: "API設計",
  goal: "フロントエンドの型安全なAPI呼び出しを設計する",
  completion: "fetchの戻り値に型を定義できる",
  task: "データ取得関数とレスポンス型を分けて記述",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 35,
  tags: ['API設計', 'fetch', '型安全性', 'レスポンス型'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
} as const