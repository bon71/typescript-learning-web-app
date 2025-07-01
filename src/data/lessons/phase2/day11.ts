import type { LessonContent } from '@/types/content'

export const day11: LessonContent = {
  day: 11,
  title: "関数に型をつける",
  goal: "関数の引数と戻り値に型をつける",
  completion: "シグネチャを定義できる",
  task: "2つの数を受け取り加算する関数を作成",
  phase: 2,
  difficulty: 'beginner',
  estimatedTime: 20,
  tags: ['関数型', '引数', '戻り値', 'シグネチャ'],
  prerequisites: [8, 9, 10]
} as const