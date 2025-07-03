import type { TestSuite, Exercise, TestCase } from '@/types/testing'

// Day 1: 変数の宣言と基本型
export const day1TestSuite: TestSuite = {
  id: "day1-variables",
  day: 1,
  title: "変数の宣言と基本型",
  description: "let, const, var の違いを理解し、基本的な変数の使い分けができる",
  exercises: [
    {
      id: "day1-ex1",
      title: "変数宣言の練習",
      description: "名前と年齢を変数に代入してコンソールに表示してください",
      starterCode: `// 名前と年齢を変数に代入してコンソールに表示
// ここにコードを書いてください
let name = ""; // 名前を入力
const age = 0; // 年齢を入力

console.log("名前:", name);
console.log("年齢:", age);`,
      difficulty: 'easy'
    }
  ],
  testCases: [
    {
      id: "day1-test1",
      description: "正しい変数宣言と出力",
      expectedOutput: "名前: 田中太郎\\n年齢: 30",
      timeoutMs: 1000
    },
    {
      id: "day1-test2", 
      description: "const使用の確認",
      expectedCompileErrors: [],
      timeoutMs: 1000
    }
  ]
}

// Day 2: 条件分岐と比較演算子
export const day2TestSuite: TestSuite = {
  id: "day2-conditions",
  day: 2,
  title: "条件分岐と比較演算子",
  description: "年齢による成人判定を正しく実装できる",
  exercises: [
    {
      id: "day2-ex1",
      title: "成人判定",
      description: "年齢に応じて「成人」か「未成年」を表示してください",
      starterCode: `const age = 20;
// 年齢に応じて「成人です」か「未成年です」を表示
// ここにコードを書いてください`,
      difficulty: 'easy'
    }
  ],
  testCases: [
    {
      id: "day2-test1",
      description: "20歳の成人判定",
      expectedOutput: "成人です",
      timeoutMs: 1000
    },
    {
      id: "day2-test2",
      description: "19歳の未成年判定", 
      inputCode: "const age = 19;",
      expectedOutput: "未成年です",
      timeoutMs: 1000
    }
  ]
}

// Day 3: 配列とループ
export const day3TestSuite: TestSuite = {
  id: "day3-arrays",
  day: 3,
  title: "配列とループ",
  description: "配列操作と繰り返し処理を使って果物を大文字変換できる",
  exercises: [
    {
      id: "day3-ex1",
      title: "配列の大文字変換",
      description: "全ての果物を大文字にして出力してください",
      starterCode: `const fruits = ["apple", "banana", "orange"];
// 全ての果物を大文字にして出力
// ここにコードを書いてください`,
      difficulty: 'easy'
    }
  ],
  testCases: [
    {
      id: "day3-test1",
      description: "配列要素の大文字変換",
      expectedOutput: "APPLE\\nBANANA\\nORANGE",
      timeoutMs: 1000
    },
    {
      id: "day3-test2",
      description: "ループ処理の確認",
      expectedOutput: "APPLE\\nBANANA\\nORANGE",
      timeoutMs: 1000
    }
  ]
}

// Day 4: 関数の定義と使い方
export const day4TestSuite: TestSuite = {
  id: "day4-functions",
  day: 4,
  title: "関数の定義と使い方",
  description: "税率計算関数を正しく実装できる",
  exercises: [
    {
      id: "day4-ex1",
      title: "税率計算関数",
      description: "税率を加算する関数を定義してください",
      starterCode: `// 税率を加算する関数を定義
// calculateTax(price, taxRate) => 税込価格を返す
function calculateTax(price, taxRate) {
  // ここに実装してください
  return 0;
}

// テスト用の呼び出し
console.log(calculateTax(1000, 0.1));`,
      difficulty: 'medium'
    }
  ],
  testCases: [
    {
      id: "day4-test1",
      description: "税率計算が正しく動作する",
      inputCode: "calculateTax(1000, 0.1)",
      expectedReturnValue: 1100,
      timeoutMs: 1000
    },
    {
      id: "day4-test2",
      description: "別の税率での計算",
      inputCode: "calculateTax(500, 0.08)",
      expectedReturnValue: 540,
      timeoutMs: 1000
    }
  ]
}

// Day 5: オブジェクトの基本
export const day5TestSuite: TestSuite = {
  id: "day5-objects",
  day: 5,
  title: "オブジェクトの基本",
  description: "userオブジェクトとsayHelloメソッドを正しく実装できる",
  exercises: [
    {
      id: "day5-ex1",
      title: "オブジェクトとメソッド",
      description: "userオブジェクトを作成し、sayHelloメソッドを実装してください",
      starterCode: `// userオブジェクトを作成し、sayHelloメソッドを実装
const user = {
  name: "田中太郎",
  age: 30,
  // sayHelloメソッドを実装してください
  sayHello: function() {
    // ここに実装してください
  }
};

// テスト用の呼び出し
user.sayHello();`,
      difficulty: 'medium'
    }
  ],
  testCases: [
    {
      id: "day5-test1",
      description: "オブジェクトとメソッドが正しく動作",
      inputCode: "user.sayHello()",
      expectedOutput: "こんにちは、田中太郎です！",
      timeoutMs: 1000
    },
    {
      id: "day5-test2",
      description: "プロパティアクセスの確認",
      inputCode: "user.name",
      expectedReturnValue: "田中太郎",
      timeoutMs: 1000
    }
  ]
}

// Day 6: 関数の応用
export const day6TestSuite: TestSuite = {
  id: "day6-advanced-functions",
  day: 6,
  title: "関数の応用",
  description: "異なる関数定義方法を理解し、アロー関数やコールバックが使える",
  exercises: [
    {
      id: "day6-ex1",
      title: "アロー関数とコールバック",
      description: "配列の各要素に2をかけるアロー関数を作成してください",
      starterCode: `const numbers = [1, 2, 3, 4, 5];
// アロー関数でmapを使って各要素に2をかける
// ここにコードを書いてください`,
      difficulty: 'medium'
    }
  ],
  testCases: [
    {
      id: "day6-test1",
      description: "アロー関数の動作確認",
      expectedOutput: "2,4,6,8,10",
      timeoutMs: 1000
    }
  ]
}

// Day 7: ES6+機能
export const day7TestSuite: TestSuite = {
  id: "day7-es6",
  day: 7,
  title: "ES6+機能",
  description: "分割代入やスプレッド演算子を使ってモダンなJavaScriptを書ける",
  exercises: [
    {
      id: "day7-ex1",
      title: "分割代入とスプレッド演算子",
      description: "オブジェクトからnameとageを分割代入で取り出してください",
      starterCode: `const user = { name: "田中太郎", age: 30, city: "東京" };
// 分割代入でnameとageを取り出して表示
// ここにコードを書いてください`,
      difficulty: 'medium'
    }
  ],
  testCases: [
    {
      id: "day7-test1",
      description: "分割代入の動作確認",
      expectedOutput: "名前: 田中太郎\n年齢: 30",
      timeoutMs: 1000
    }
  ]
}

// Day 8: TypeScriptとは
export const day8TestSuite: TestSuite = {
  id: "day8-typescript-intro",
  day: 8,
  title: "TypeScriptとは",
  description: "型があることの利点を理解し、JSとの違いを説明できる",
  exercises: [
    {
      id: "day8-ex1",
      title: "TypeScriptの基本",
      description: "型注釈を使って変数と関数を定義してください",
      starterCode: `// TypeScriptの基本を体験してみましょう
// 型注釈を使って変数の型を明示的に指定
let message: string = "Hello, TypeScript!";
let count: number = 10;
let isComplete: boolean = false;

// 関数に型注釈を追加
function greet(name: string): string {
  return "こんにちは、" + name + "さん！";
}

// 実行してみましょう
console.log(message);
console.log(greet("太郎"));`,
      difficulty: 'easy'
    }
  ],
  testCases: [
    {
      id: "day8-test1",
      description: "TypeScript基本動作確認",
      expectedOutput: "Hello, TypeScript!\nこんにちは、太郎さん！",
      timeoutMs: 1000
    }
  ]
}

// Day 9: 基本の型
export const day9TestSuite: TestSuite = {
  id: "day9-basic-types",
  day: 9,
  title: "基本の型",
  description: "number, string, boolean を使いこなし、氏名、年齢、ログイン中かどうかのフラグを定義できる",
  exercises: [
    {
      id: "day9-ex1",
      title: "基本型の使い方",
      description: "ユーザー情報を基本型で定義してください",
      starterCode: `// 基本型を使ってユーザー情報を定義してみましょう
// 氏名、年齢、ログイン中かどうかのフラグを定義してください

// 型注釈を使った明示的な型指定
let userName: string = ""; // ここに名前を入力
let userAge: number = 0; // ここに年齢を入力
let isLoggedIn: boolean = false; // ログイン状態を設定

// コンソールに表示
console.log("氏名:", userName);
console.log("年齢:", userAge);
console.log("ログイン中:", isLoggedIn);`,
      difficulty: 'easy'
    }
  ],
  testCases: [
    {
      id: "day9-test1",
      description: "基本型の動作確認",
      expectedOutput: "氏名: 田中太郎\n年齢: 30\nログイン中: true",
      timeoutMs: 1000
    }
  ]
}

// Day 10: 配列とオブジェクトの型
export const day10TestSuite: TestSuite = {
  id: "day10-arrays-objects",
  day: 10,
  title: "配列とオブジェクトの型",
  description: "型付き配列とオブジェクトが作れ、User[] 型を定義し使える",
  exercises: [
    {
      id: "day10-ex1",
      title: "ユーザー配列の作成",
      description: "ユーザーリストを作成し、出力してください",
      starterCode: `// 配列とオブジェクトの型を使ってみましょう
// ユーザーリストを作成し、出力してください

// ユーザーオブジェクトの型を定義
let user1: { name: string; age: number; isActive: boolean } = {
  name: "田中花子",
  age: 25,
  isActive: true
};

let user2: { name: string; age: number; isActive: boolean } = {
  name: "佐藤次郎",
  age: 35,
  isActive: false
};

// ユーザー配列を作成
let users: { name: string; age: number; isActive: boolean }[] = [user1, user2];

// ユーザー情報を表示
console.log("ユーザー一覧:");
for (let user of users) {
  console.log(\`名前: \${user.name}, 年齢: \${user.age}, アクティブ: \${user.isActive}\`);
}`,
      difficulty: 'medium'
    }
  ],
  testCases: [
    {
      id: "day10-test1",
      description: "ユーザー配列の動作確認",
      expectedOutput: "ユーザー一覧:\n名前: 田中花子, 年齢: 25, アクティブ: true\n名前: 佐藤次郎, 年齢: 35, アクティブ: false",
      timeoutMs: 1000
    }
  ]
}

// Day 11-20のテストケースは簡略化して基本的な動作確認のみ実装
// Day 11: 関数に型をつける
export const day11TestSuite: TestSuite = {
  id: "day11-function-types",
  day: 11,
  title: "関数に型をつける",
  description: "関数の引数や戻り値に型をつけて型安全な関数を作成できる",
  exercises: [{
    id: "day11-ex1",
    title: "型付き関数",
    description: "型をつけた関数を定義してください",
    starterCode: `function add(a: number, b: number): number {
  return a + b;
}
console.log(add(5, 3));`,
    difficulty: 'medium'
  }],
  testCases: [{
    id: "day11-test1",
    description: "型付き関数の動作確認",
    expectedOutput: "8",
    timeoutMs: 1000
  }]
}

// Day 12-20の簡略テストケース
export const day12TestSuite: TestSuite = {
  id: "day12-union-literal",
  day: 12,
  title: "Union型とLiteral型",
  description: "Union型とLiteral型を使って柔軟な型定義ができる",
  exercises: [{ id: "day12-ex1", title: "Union型", description: "Union型を使ってみましょう", starterCode: `let role: "admin" | "user" | "guest" = "user";
console.log("ロール:", role);`, difficulty: 'medium' }],
  testCases: [{ id: "day12-test1", description: "Union型動作確認", expectedOutput: "ロール: user", timeoutMs: 1000 }]
}

export const day13TestSuite: TestSuite = {
  id: "day13-interface", day: 13, title: "Interfaceと継承", description: "Interfaceを使って綺麗な型定義ができる",
  exercises: [{ id: "day13-ex1", title: "Interface", description: "Interfaceを定義してみましょう", starterCode: `interface Person {
  name: string;
  age: number;
}
let person: Person = { name: "田中", age: 30 };
console.log(person.name);`, difficulty: 'medium' }],
  testCases: [{ id: "day13-test1", description: "Interface動作確認", expectedOutput: "田中", timeoutMs: 1000 }]
}

export const day14TestSuite: TestSuite = {
  id: "day14-class", day: 14, title: "クラスとTypeScript", description: "TypeScriptのクラス機能を使いこなせる",
  exercises: [{ id: "day14-ex1", title: "クラス", description: "クラスを定義してみましょう", starterCode: `class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
let user = new User("田中");
console.log(user.name);`, difficulty: 'medium' }],
  testCases: [{ id: "day14-test1", description: "クラス動作確認", expectedOutput: "田中", timeoutMs: 1000 }]
}

export const day15TestSuite: TestSuite = {
  id: "day15-generics", day: 15, title: "Generics", description: "ジェネリックを使って再使用可能なコードを書ける",
  exercises: [{ id: "day15-ex1", title: "Generics", description: "ジェネリック関数を作ってみましょう", starterCode: `function getFirst<T>(arr: T[]): T {
  return arr[0];
}
console.log(getFirst([1, 2, 3]));`, difficulty: 'hard' }],
  testCases: [{ id: "day15-test1", description: "Generics動作確認", expectedOutput: "1", timeoutMs: 1000 }]
}

export const day16TestSuite: TestSuite = {
  id: "day16-type-guards", day: 16, title: "型ガード", description: "型ガードで安全な型チェックができる",
  exercises: [{ id: "day16-ex1", title: "型ガード", description: "typeofを使った型ガードを試してみましょう", starterCode: `function check(value: string | number) {
  if (typeof value === "string") {
    console.log("文字列:", value);
  } else {
    console.log("数値:", value);
  }
}
check("hello");`, difficulty: 'hard' }],
  testCases: [{ id: "day16-test1", description: "型ガード動作確認", expectedOutput: "文字列: hello", timeoutMs: 1000 }]
}

export const day17TestSuite: TestSuite = {
  id: "day17-promises", day: 17, title: "Promiseと非同期処理", description: "Promiseとasync/awaitで非同期処理を書ける",
  exercises: [{ id: "day17-ex1", title: "Promise", description: "Promiseを使ってみましょう", starterCode: `async function fetchData(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve("データ"), 100);
  });
}
fetchData().then(data => console.log(data));`, difficulty: 'hard' }],
  testCases: [{ id: "day17-test1", description: "Promise動作確認", expectedOutput: "データ", timeoutMs: 2000 }]
}

export const day18TestSuite: TestSuite = {
  id: "day18-utility-types", day: 18, title: "Utility Types", description: "Utility Typesで効率的な型操作ができる",
  exercises: [{ id: "day18-ex1", title: "Utility Types", description: "Partialを使ってみましょう", starterCode: `interface User {
  name: string;
  age: number;
}
let partialUser: Partial<User> = { name: "田中" };
console.log(partialUser.name);`, difficulty: 'hard' }],
  testCases: [{ id: "day18-test1", description: "Utility Types動作確認", expectedOutput: "田中", timeoutMs: 1000 }]
}

export const day19TestSuite: TestSuite = {
  id: "day19-api-design", day: 19, title: "API設計", description: "型安全なAPIクライアントを設計できる",
  exercises: [{ id: "day19-ex1", title: "API設計", description: "APIレスポンスの型を定義してみましょう", starterCode: `interface ApiResponse<T> {
  data: T;
  status: number;
}
let response: ApiResponse<string> = { data: "success", status: 200 };
console.log(response.data);`, difficulty: 'hard' }],
  testCases: [{ id: "day19-test1", description: "API設計動作確認", expectedOutput: "success", timeoutMs: 1000 }]
}

export const day20TestSuite: TestSuite = {
  id: "day20-final-project", day: 20, title: "総仕上げミニプロジェクト", description: "これまでの学習を統合したミニプロジェクトを完成できる",
  exercises: [{ id: "day20-ex1", title: "ミニプロジェクト", description: "ユーザー管理アプリを作ってみましょう", starterCode: `interface User {
  id: number;
  name: string;
  email: string;
}
let users: User[] = [];
function addUser(user: User) {
  users.push(user);
}
addUser({ id: 1, name: "田中", email: "tanaka@example.com" });
console.log(users.length, "人のユーザーが登録されています");`, difficulty: 'hard' }],
  testCases: [{ id: "day20-test1", description: "ミニプロジェクト動作確認", expectedOutput: "1 人のユーザーが登録されています", timeoutMs: 1000 }]
}

// 全テストスイートのエクスポート
export const allTestSuites: TestSuite[] = [
  day1TestSuite,
  day2TestSuite,
  day3TestSuite,
  day4TestSuite,
  day5TestSuite,
  day6TestSuite,
  day7TestSuite,
  day8TestSuite,
  day9TestSuite,
  day10TestSuite,
  day11TestSuite,
  day12TestSuite,
  day13TestSuite,
  day14TestSuite,
  day15TestSuite,
  day16TestSuite,
  day17TestSuite,
  day18TestSuite,
  day19TestSuite,
  day20TestSuite
]

// Day番号からテストスイートを取得するヘルパー関数
export function getTestSuiteByDay(day: number): TestSuite | undefined {
  return allTestSuites.find(suite => suite.day === day)
}

// 初級レベルのテストスイートを取得
export function getBeginnerTestSuites(): TestSuite[] {
  return allTestSuites.filter(suite => 
    suite.exercises.some(ex => ex.difficulty === 'easy')
  )
}

// デフォルトグレーダー設定
export const defaultGraderConfig = {
  timeout: 5000,
  maxExecutionTime: 1000,
  enableTypeChecking: true,
  enableConsoleCapture: true,
  sandboxMode: 'function' as const
}