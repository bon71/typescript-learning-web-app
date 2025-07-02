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
  prerequisites: [1, 2, 3, 4, 5],
  hints: [
    "document.getElementById() で要素を取得できます",
    "addEventListener() でイベントを監視できます",
    "innerHTML や textContent で要素の内容を変更できます",
    "click イベントはボタンがクリックされた時に発生します",
    "DOM操作はHTMLとJavaScriptを連携させる基本技術です"
  ]
} as const