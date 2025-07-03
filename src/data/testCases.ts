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

// 全テストスイートのエクスポート
export const allTestSuites: TestSuite[] = [
  day1TestSuite,
  day2TestSuite,
  day3TestSuite,
  day4TestSuite,
  day5TestSuite
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