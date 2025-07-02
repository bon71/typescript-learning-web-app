import type { LessonContent } from '@/types/content'

export const day04: LessonContent = {
  day: 4,
  title: "関数の定義と使い方",
  goal: "関数定義とアロー関数を理解する",
  completion: "引数・戻り値のある関数を定義できる",
  task: "税率を加算する関数を定義して呼び出し",
  phase: 1,
  difficulty: 'beginner',
  estimatedTime: 20,
  tags: ['関数', 'アロー関数', '引数', '戻り値', 'JavaScript'],
  prerequisites: [1, 2, 3],
  hints: [
    "function キーワードを使って関数を定義できます",
    "アロー関数 (=>) はより短い書き方です",
    "引数は関数に渡すデータです",
    "return で値を関数から返すことができます",
    "関数名は動詞で始めると分かりやすいです"
  ]
} as const