import type { LessonContent } from '@/types/content'

export const day01: LessonContent = {
  day: 1,
  title: "変数の宣言と基本型の理解",
  goal: "let, const, var の違いが説明できる",
  completion: "基本的な変数の使い分けができる",
  task: "名前と年齢を変数に代入してコンソールに表示",
  phase: 1,
  difficulty: 'beginner',
  estimatedTime: 15,
  tags: ['変数', 'スコープ', '基本文法', 'JavaScript'],
  prerequisites: [],
  hints: [
    "letは再代入可能な変数宣言です",
    "constは定数（再代入不可）の宣言です",
    "varは古い書き方なので、現在は避けましょう",
    "console.log()を使って値を確認できます"
  ],
  sampleCode: `// 変数の宣言と基本型
let name = "太郎";     // 文字列型（再代入可能）
const age = 25;       // 数値型（再代入不可）
var isStudent = true; // ブール型（古い書き方、できるだけ避ける）

// コンソールに表示
console.log("名前:", name);
console.log("年齢:", age);
console.log("学生かどうか:", isStudent);

// let と const の違い
let changeable = "変更可能";
changeable = "変更されました";  // OK

// const の値は変更できない
// const unchangeable = "変更不可";
// unchangeable = "変更しようとする"; // エラー！

console.log("変更可能な変数:", changeable);`,
  explanation: "let は再代入可能、const は再代入不可能です。var は古い書き方なので、現在では let や const を使いましょう。"
} as const