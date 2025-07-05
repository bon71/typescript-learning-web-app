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
  hints: [
    "TypeScriptはJavaScriptに型システムを追加した言語です",
    "コンパイル時に型チェックを行うため、実行前にエラーを発見できます",
    "型注釈（: string）を使って変数や関数の型を明示的に指定します",
    "型推論により、明示的に型を書かなくても自動で型が決まることがあります",
    "開発時のIDE支援（自動補完、リファクタリング）が大幅に向上します"
  ],
  initialCode: `// TypeScriptの基本を体験してみましょう
// 注意: このCode EditorではJavaScriptとして実行されます
// TypeScriptの型注釈はコメントで示しています

// 変数の定義（本来はlet message: string = "Hello, TypeScript!"）
let message = "Hello, TypeScript!"; // string型
let count = 10; // number型
let isComplete = false; // boolean型

// 型推論の例
let autoString = "自動推論"; // 自動的にstring型として推論
let autoNumber = 42; // 自動的にnumber型として推論

// 関数の定義（本来はfunction greet(name: string): string）
function greet(name) {
  // 引数nameはstring型、戻り値もstring型
  return "こんにちは、" + name + "さん！";
}

// 実行してみましょう
console.log(message);
console.log(greet("太郎"));

// TypeScriptでは以下のように型注釈を付けます：
// let message: string = "Hello, TypeScript!";
// function greet(name: string): string { ... }`,
  sampleCode: `// JavaScriptの問題点
let message = "Hello";
message = 42; // 型が変わってしまう！

function greet(name) {
  return "Hello, " + name.toUpperCase(); // nameが文字列でないとエラー
}

console.log(greet(123)); // ランタイムエラー！

// TypeScriptでの解決方法
let tsMessage: string = "Hello";
// tsMessage = 42; // コンパイル時にエラーで検出！

function tsGreet(name: string): string {
  return "Hello, " + name.toUpperCase();
}

console.log(tsGreet("World")); // 安全！

// 型推論の例
let inferredString = "TypeScript"; // 自動的にstring型として推論される
let inferredNumber = 100; // 自動的にnumber型として推論される`,
  explanation: "TypeScriptは静的型チェックでJavaScriptのランタイムエラーをコンパイル時に発見できます。型システムによりコードの安全性が向上し、開発効率も大幅に改善されます。型注釈を明示的に書くことも、型推論に任せることも可能です。",

  // 演習機能追加
  exerciseCode: `// 演習: TypeScriptの基本を理解しよう
// 以下のJavaScriptコードをTypeScriptに変換し、型の恩恵を体験してください

// TODO: 1. 個人情報を格納する変数を定義してください
// JavaScriptでは以下のように書いていました
let personName = ""; // あなたの名前を入力
let personAge = 0;   // あなたの年齢を入力  
let isStudent = false; // 学生かどうか

// TODO: 2. 挨拶メッセージを作成する関数を定義してください
function createGreeting(name, age, student) {
  // 引数に型注釈をつけることを想定した関数
  // name: string, age: number, student: boolean
  let status = student ? "学生" : "社会人";
  return name + "さん（" + age + "歳・" + status + "）、こんにちは！";
}

// TODO: 3. 型の違いを確認してみてください
// 以下の行のコメントアウトを外すとエラーになるべき箇所です
// personName = 123; // 本来はTypeScriptでエラーになる
// isStudent = "yes"; // 本来はTypeScriptでエラーになる

// 実行してテスト
personName = "山田太郎";
personAge = 25;
isStudent = true;

let greeting = createGreeting(personName, personAge, isStudent);
console.log(greeting);

// TypeScriptの型推論の例
let autoMessage = "これは自動的にstring型として推論されます";
let autoCount = 42; // これは自動的にnumber型として推論されます

console.log("型推論の例:", autoMessage);
console.log("自動カウント:", autoCount);`,

  exerciseHints: [
    "TypeScriptでは変数宣言時に 「let 変数名: 型 = 値」 の形式で型注釈をつけます",
    "基本的な型は string、number、boolean です",
    "関数の引数にも型注釈をつけることができます：function name(param: type)",
    "型推論により、初期値から自動的に型が決まることもあります",
    "本来のTypeScriptでは型が合わない代入はコンパイル時にエラーになります"
  ],

  testCases: [
    {
      id: "test1", 
      description: "personName変数が空でない文字列で定義されている",
      testFunction: "() => typeof personName === 'string' && personName.length > 0"
    },
    {
      id: "test2",
      description: "personAge変数が0より大きい数値で定義されている", 
      testFunction: "() => typeof personAge === 'number' && personAge > 0"
    },
    {
      id: "test3",
      description: "isStudent変数がboolean型で定義されている",
      testFunction: "() => typeof isStudent === 'boolean'"
    },
    {
      id: "test4",
      description: "createGreeting関数が正しく動作する",
      testFunction: "() => { let result = createGreeting('テスト', 20, true); return typeof result === 'string' && result.includes('テスト') && result.includes('20') && result.includes('学生'); }"
    }
  ],

  exerciseDifficulty: 'easy'
} as const