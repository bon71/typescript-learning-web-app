import type { LessonContent } from '@/types/content'

export const day09: LessonContent = {
  day: 9,
  title: "基本の型",
  goal: "number, string, boolean を使いこなす",
  completion: "それぞれの変数が定義・使用できる",
  task: "氏名、年齢、ログイン中かどうかのフラグを定義",
  phase: 2,
  difficulty: 'beginner',
  estimatedTime: 15,
  tags: ['number', 'string', 'boolean', 'プリミティブ型'],
  prerequisites: [8],
  hints: [
    "プリミティブ型（string, number, boolean）はTypeScriptの基本となる型です",
    "型注釈は「変数名: 型名」の形式で記述します",
    "文字列は'または\"で囲み、数値は整数・小数点数ともにnumber型です",
    "booleanは true または false の2つの値のみを持ちます",
    "型推論により、初期値から型が自動的に決まることも多いです"
  ],
  initialCode: `// 基本型を使ってユーザー情報を定義してみましょう
// 氏名、年齢、ログイン中かどうかのフラグを定義してください

// 基本型の変数定義（本来はTypeScriptで型注釈を付けます）
let userName = "田中太郎"; // string型（本来: let userName: string）
let userAge = 30; // number型（本来: let userAge: number）
let isLoggedIn = true; // boolean型（本来: let isLoggedIn: boolean）

// コンソールに表示
console.log("氏名:", userName);
console.log("年齢:", userAge);
console.log("ログイン中:", isLoggedIn);

// TypeScriptでは以下のように型注釈を付けます：
// let userName: string = "田中太郎";
// let userAge: number = 30;
// let isLoggedIn: boolean = true;`,
  sampleCode: `// 基本のプリミティブ型
let userName: string = "田中太郎";
let userAge: number = 25;
let isLoggedIn: boolean = true;

// 型推論を使った場合（型注釈を省略）
let companyName = "株式会社TypeScript"; // string型として推論
let employeeCount = 150; // number型として推論
let hasOffice = true; // boolean型として推論

// 数値の詳細例
let integer: number = 42;
let decimal: number = 3.14;
let negative: number = -100;
let scientific: number = 1e5; // 100000

// 文字列の詳細例
let singleQuote: string = '単一引用符';
let doubleQuote: string = "二重引用符";
let templateLiteral: string = \`テンプレートリテラル: \${userName}\`;

// 実用例：ユーザー情報の表示
function displayUserInfo(name: string, age: number, loggedIn: boolean): string {
  return \`ユーザー: \${name}, 年齢: \${age}, ログイン状態: \${loggedIn ? "ログイン中" : "ログアウト"}\`;
}

console.log(displayUserInfo(userName, userAge, isLoggedIn));`,
  explanation: "TypeScriptの基本型（string, number, boolean）はプリミティブ型と呼ばれ、最も基本的なデータ型です。これらの型を適切に使うことで、型安全なコードを書くことができます。型推論により、初期値から自動的に型が決まることも多いため、常に型注釈を書く必要はありません。"
} as const