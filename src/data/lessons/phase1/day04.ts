import type { LessonContent } from '@/types/content'

export const day04: LessonContent = {
  day: 4,
  title: "関数の定義と使い方",
  goal: "関数定義とアロー関数を理解する",
  completion: "引数・戻り値のある関数を定義できる",
  task: "税率を加算する関数を定義して呼び出し",
  phase: 1,
  difficulty: 'beginner',
  estimatedTime: 20,
  tags: ['関数', 'アロー関数', '引数', '戻り値', 'JavaScript'],
  prerequisites: [1, 2, 3],
  hints: [
    "function キーワードを使って関数を定義できます",
    "アロー関数 (=>) はより短い書き方です",
    "引数は関数に渡すデータです",
    "return で値を関数から返すことができます",
    "関数名は動詞で始めると分かりやすいです"
  ],
  sampleCode: `// 関数の定義と使い方
// 通常の関数定義
function addTax(price, taxRate) {
  return price * (1 + taxRate);
}

// アロー関数
const multiply = (a, b) => {
  return a * b;
};

// 短縮形のアロー関数（1行の場合）
const square = x => x * x;

// 関数の呼び出し
const priceWithTax = addTax(1000, 0.1); // 1100
const result = multiply(5, 3); // 15
const squared = square(4); // 16

console.log("税込価格:", priceWithTax);
console.log("掛け算結果:", result);
console.log("二乗:", squared);`,
  explanation: "関数は処理をまとめて再利用可能にする仕組みです。function文とアロー関数の2つの書き方があります。",

  // 演習機能追加
  exerciseCode: `// 演習: 計算機能を持つ関数を作成してください
// TODO: 2つの数値を受け取り、その平均を計算して返す関数を作成
function calculateAverage(num1, num2) {
  // ここに実装
}

// TODO: 文字列を受け取り、その文字数を返すアロー関数を作成
const countCharacters = (text) => {
  // ここに実装
};

// TODO: 作成した関数をテストしてください
const average = calculateAverage(10, 20);
const charCount = countCharacters("Hello");

console.log("平均値:", average);
console.log("文字数:", charCount);`,

  exerciseHints: [
    "平均は (num1 + num2) / 2 で計算できます",
    "return文で計算結果を返します",
    "文字数は text.length で取得できます",
    "アロー関数では => の後に処理を書きます",
    "期待結果: 平均値 15, 文字数 5"
  ],

  testCases: [
    {
      id: "test1",
      description: "calculateAverage関数が正しく定義されている",
      testFunction: "() => typeof calculateAverage === 'function'"
    },
    {
      id: "test2",
      description: "平均値が正しく計算される",
      testFunction: "() => calculateAverage(10, 20) === 15"
    },
    {
      id: "test3",
      description: "countCharacters関数が正しく定義されている",
      testFunction: "() => typeof countCharacters === 'function'"
    },
    {
      id: "test4",
      description: "文字数が正しく計算される",
      testFunction: "() => countCharacters('Hello') === 5"
    }
  ],

  exerciseDifficulty: 'easy'
} as const