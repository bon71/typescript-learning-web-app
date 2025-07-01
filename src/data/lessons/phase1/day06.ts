import type { LessonContent } from '@/types/content'

export const day06: LessonContent = {
  day: 6,
  title: "DOM操作とイベント",
  goal: "DOMへのアクセスとイベント処理の基本を学ぶ",
  completion: "簡単なイベントリスナーが書ける",
  task: "ボタンを押したら「こんにちは」と表示",
  phase: 1,
  difficulty: 'intermediate',
  estimatedTime: 25,
  tags: ['DOM', 'イベント', 'HTML', 'JavaScript'],
  prerequisites: [1, 2, 3, 4, 5]
} as const