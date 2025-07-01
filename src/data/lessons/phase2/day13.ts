import type { LessonContent } from '@/types/content'

export const day13: LessonContent = {
  day: 13,
  title: "Interfaceと継承",
  goal: "Interfaceの定義と拡張を理解する",
  completion: "複数の型構造を再利用できる",
  task: "Person → Employee を継承してオブジェクト作成",
  phase: 2,
  difficulty: 'intermediate',
  estimatedTime: 25,
  tags: ['Interface', '継承', '型の拡張'],
  prerequisites: [8, 9, 10, 11, 12]
} as const