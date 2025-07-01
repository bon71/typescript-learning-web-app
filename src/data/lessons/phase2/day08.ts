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
  prerequisites: [1, 2, 3, 4, 5, 6, 7],
  sampleCode: `// JavaScriptの問題点
let message = "Hello";
message = 42; // 型が変わってしまう！

function greet(name) {
  return "Hello, " + name.toUpperCase(); // nameが文字列でないとエラー
}

console.log(greet(123)); // ランタイムエラー！

// TypeScriptでの解決方法
// let message: string = "Hello";
// message = 42; // コンパイル時にエラーで検出！

// function greet(name: string): string {
//   return "Hello, " + name.toUpperCase();
// }

// console.log(greet("World")); // 安全！`,
  explanation: "TypeScriptは静的型チェックでJavaScriptのランタイムエラーをコンパイル時に発見できます。"
} as const