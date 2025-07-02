import type { PhaseContent } from '@/types/content'

export const phase1Info: PhaseContent = {
  id: 1,
  title: "Phase 1: JavaScript復習（基礎文法）",
  description: "TypeScriptを学ぶ前に、JavaScriptの基礎をしっかりと固めましょう。7日間でJavaScriptの核となる概念を復習します。",
  color: "#2196F3",
  duration: "7日間",
  difficulty: "beginner",
  totalLessons: 7,
  skills: [
    "変数宣言（let, const, var）",
    "条件分岐（if, switch）", 
    "配列操作とループ",
    "関数定義とアロー関数",
    "オブジェクトの基本操作",
    "DOM操作とイベント処理",
    "JavaScript統合スキル"
  ]
} as const

export const phase2Info: PhaseContent = {
  id: 2,
  title: "Phase 2: TypeScript入門",
  description: "いよいよTypeScriptの世界へ！型システムの基礎から、実践的な使い方まで7日間で学習します。",
  color: "#FF9800",
  duration: "7日間",
  difficulty: "intermediate",
  totalLessons: 7,
  skills: [
    "TypeScriptの基本概念",
    "プリミティブ型（number, string, boolean）",
    "配列とオブジェクトの型定義",
    "関数の型注釈",
    "Union型とLiteral型",
    "Interfaceと型の継承",
    "クラスとTypeScript"
  ]
} as const

export const phase3Info: PhaseContent = {
  id: 3,
  title: "Phase 3: TypeScript実践応用",
  description: "高度なTypeScript機能を学び、実際のプロジェクトで使える実践的なスキルを身につけます。",
  color: "#9C27B0",
  duration: "6日間",
  difficulty: "advanced",
  totalLessons: 6,
  skills: [
    "Generics（ジェネリクス）",
    "型ガード（Type Guards）",
    "非同期処理とPromise<T>",
    "Utility Types（Partial, Pick, Omit等）",
    "型安全なAPI設計パターン",
    "実践的TypeScriptプロジェクト開発"
  ]
} as const

export const allPhases: readonly PhaseContent[] = [
  phase1Info,
  phase2Info,
  phase3Info
] as const