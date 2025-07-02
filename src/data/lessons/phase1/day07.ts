import type { LessonContent } from '@/types/content'

export const day07: LessonContent = {
  day: 7,
  title: "総復習とミニアプリ",
  goal: "一連の構文を組み合わせて使える",
  completion: "JSでUI操作ができる",
  task: "入力された名前を使って挨拶を表示するHTML+JSアプリ",
  phase: 1,
  difficulty: 'intermediate',
  estimatedTime: 30,
  tags: ['総復習', 'アプリ開発', 'HTML', 'JavaScript'],
  prerequisites: [1, 2, 3, 4, 5, 6],
  hints: [
    "これまで学んだ変数、関数、オブジェクト、DOM操作を組み合わせます",
    "input要素の value プロパティで入力値を取得できます",
    "段階的に機能を追加していくと作りやすいです",
    "エラーが出たらコンソールを確認しましょう",
    "実際に動くアプリを作ることで理解が深まります"
  ]
} as const