import type { LessonContent } from '@/types/content'

export const day20: LessonContent = {
  day: 20,
  title: "総仕上げミニプロジェクト",
  goal: "TypeScriptの型システム全般を応用できる",
  completion: "型安全なフォームアプリを実装できる",
  task: "名前と年齢を入力して出力するTypeScript製APIアプリ（Playground上）",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 45,
  tags: ['総仕上げ', 'プロジェクト', 'フォーム', '実装'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
} as const