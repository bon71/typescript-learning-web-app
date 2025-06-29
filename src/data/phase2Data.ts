import type { LearningDay } from '@/types/learning'

// Phase 2: TypeScript入門（Day 8-14）
export const phase2Data: LearningDay[] = [
  {
    day: 8,
    title: "TypeScriptとは",
    goal: "型があることの利点を理解する",
    completion: "JSとの違いを説明できる",
    task: "型あり/なし変数の比較コードを書く",
    phase: 2,
    sampleCode: `// JavaScript（型なし）
let message = "Hello";
message = 42; // エラーにならない

// TypeScript（型あり）
let typedMessage: string = "Hello";
// typedMessage = 42; // コンパイル時エラー！型安全
console.log(typedMessage.toUpperCase()); // 安全

// 基本的な型の例
let userName: string = "田中太郎";
let userAge: number = 30;
let isLoggedIn: boolean = true;

// 関数の型
function greet(name: string): string {
  return \`こんにちは、\${name}さん！\`;
}

console.log(greet("太郎"));`,
    explanation: "TypeScriptは型システムによって、実行前にエラーを検出できます。開発効率と品質が大幅に向上します。"
  },
  {
    day: 9,
    title: "基本の型",
    goal: "number, string, boolean を使いこなす",
    completion: "それぞれの変数が定義・使用できる",
    task: "氏名、年齢、ログイン中かどうかのフラグを定義",
    phase: 2,
    sampleCode: `// 基本の型注釈
let userName: string = "田中太郎";
let userAge: number = 25;
let isLoggedIn: boolean = false;

// 実際のタスク実装
let studentName: string = "佐藤一郎";
let studentAge: number = 20;
let isCurrentlyLoggedIn: boolean = true;

// 情報表示関数
function displayUserInfo(
  name: string, 
  age: number, 
  loggedIn: boolean
): string {
  const status = loggedIn ? "ログイン中" : "ログアウト中";
  return \`名前: \${name}, 年齢: \${age}歳, 状態: \${status}\`;
}

console.log(displayUserInfo(studentName, studentAge, isCurrentlyLoggedIn));`,
    explanation: "基本型の組み合わせで、型安全なプログラムを作成できます。型推論も活用しましょう。"
  },
  {
    day: 10,
    title: "配列とオブジェクトの型",
    goal: "型付き配列とオブジェクトが作れる",
    completion: "User[] 型を定義し使える",
    task: "ユーザーリストを作成し、出力",
    phase: 2,
    sampleCode: `// 配列の型定義
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["apple", "banana", "orange"];

// User型の定義とユーザーリスト
type User = {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
};

let userList: User[] = [
  { id: 1, name: "田中太郎", age: 30, isActive: true },
  { id: 2, name: "山田花子", age: 25, isActive: false },
  { id: 3, name: "佐藤次郎", age: 35, isActive: true }
];

// 配列操作の関数
function getActiveUsers(users: User[]): User[] {
  return users.filter(user => user.isActive);
}

function getUserNames(users: User[]): string[] {
  return users.map(user => user.name);
}

console.log("アクティブユーザー:", getActiveUsers(userList));
console.log("全ユーザー名:", getUserNames(userList));`,
    explanation: "配列とオブジェクトに型を付けることで、データ操作が型安全になり、エディタの補完も効きます。"
  }
]