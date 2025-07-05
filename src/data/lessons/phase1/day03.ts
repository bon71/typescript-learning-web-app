import type { LessonContent } from '@/types/content'

export const day03: LessonContent = {
  day: 3,
  title: "配列とループ",
  goal: "配列操作と繰り返し処理の基礎を理解する",
  completion: "for, forEach, map を使い分けできる",
  task: "果物リストをすべて大文字にして出力",
  phase: 1,
  difficulty: 'beginner',
  estimatedTime: 20,
  tags: ['配列', 'ループ', 'for文', 'forEach', 'map', 'JavaScript'],
  prerequisites: [1, 2],
  hints: [
    "配列は [ ] で定義し、インデックス（番号）で要素にアクセスできます",
    "for文は for(let i = 0; i < array.length; i++) の形で書きます",
    "forEach は array.forEach(item => {}) の形でより簡潔に書けます",
    "map は新しい配列を作成して返します: array.map(item => item.toUpperCase())",
    "toUpperCase() メソッドで文字列を大文字に変換できます"
  ],
  sampleCode: `// 配列の定義
const fruits = ["apple", "banana", "orange"];

// for文を使った繰り返し処理
console.log("=== for文 ===");
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// forEach を使った繰り返し処理
console.log("=== forEach ===");
fruits.forEach(fruit => {
    console.log(fruit);
});

// map を使って新しい配列を作成
console.log("=== map（大文字変換）===");
const upperFruits = fruits.map(fruit => fruit.toUpperCase());
console.log(upperFruits);

// 課題：すべての果物を大文字にして出力
console.log("=== 課題の答え ===");
upperFruits.forEach(fruit => {
    console.log(fruit);
});`,
  explanation: "配列は複数のデータを格納するためのデータ構造です。for文、forEach、mapはそれぞれ異なる用途で使い分けます。for文は最も基本的、forEachは関数型、mapは新しい配列を作成したい時に使います。",

  // 演習機能追加
  exerciseCode: `// 演習: 数値配列の処理プログラムを作成してください
// TODO: 1から5までの数値を含む配列を作成してください
const numbers = [];

// TODO: 配列の各要素を2倍にした新しい配列を作成してください
const doubledNumbers = [];

// TODO: 元の配列と2倍にした配列を表示してください
console.log("元の配列:", numbers);
console.log("2倍にした配列:", doubledNumbers);`,

  exerciseHints: [
    "numbersに [1, 2, 3, 4, 5] を代入しましょう",
    "mapメソッドを使って新しい配列を作成します",
    "numbers.map(num => num * 2) で各要素を2倍にできます",
    "console.logで配列を表示して結果を確認しましょう",
    "期待結果: [2, 4, 6, 8, 10]"
  ],

  testCases: [
    {
      id: "test1",
      description: "numbers配列が正しく定義されている",
      testFunction: "() => Array.isArray(numbers) && numbers.length === 5 && numbers[0] === 1"
    },
    {
      id: "test2",
      description: "doubledNumbers配列が正しく作成されている",
      testFunction: "() => Array.isArray(doubledNumbers) && doubledNumbers.length === 5"
    },
    {
      id: "test3",
      description: "要素が正しく2倍になっている",
      testFunction: "() => doubledNumbers[0] === 2 && doubledNumbers[1] === 4 && doubledNumbers[4] === 10"
    },
    {
      id: "test4",
      description: "元の配列は変更されていない",
      testFunction: "() => numbers[0] === 1 && numbers[1] === 2"
    }
  ],

  exerciseDifficulty: 'easy'
} as const