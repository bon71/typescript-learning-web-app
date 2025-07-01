import type { LessonContent } from '@/types/content'

export const day08: LessonContent = {
  day: 8,
  title: "TypeScriptとは",
  goal: "型があることの利点を理解する",
  completion: "JSとの違いを説明できる",
  task: "型あり/なし変数の比較コードを書く",
  phase: 2,
  difficulty: 'beginner',
  estimatedTime: 15,
  tags: ['TypeScript', '型システム', '基本概念'],
  prerequisites: [1, 2, 3, 4, 5, 6, 7]
} as const