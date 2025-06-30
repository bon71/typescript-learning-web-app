import type { LearningDay, PhaseInfo } from '@/types/learning'

export const learningData: LearningDay[] = [
  // Phase 1: JavaScript復習
  {
    day: 1,
    title: "変数の宣言と基本型の理解",
    goal: "let, const, var の違いが説明できる",
    completion: "基本的な変数の使い分けができる",
    task: "名前と年齢を変数に代入してコンソールに表示",
    phase: 1,
    sampleCode: `// 変数宣言の違い
// const: 再代入不可、ブロックスコープ
const name = "太郎";

// let: 再代入可能、ブロックスコープ
let age = 25;
age = 26; // OK

// var: 再代入可能、関数スコープ（非推奨）
var oldStyle = "古い書き方";

// 実際のタスク
const userName = "田中太郎";
let userAge = 30;

console.log(\`名前: \${userName}\`);
console.log(\`年齢: \${userAge}歳\`);`,
    explanation: "const は定数、let は変数として使用します。var は古い書き方なので避けましょう。",
    exercise: {
      description: "ユーザーの名前（定数）と年齢（変数）を定義し、1年後の年齢を計算して表示するmain関数を作成してください。",
      startCode: `// ここにコードを書いてください
function main(input: {name: string, age: number}) {
  // input.name と input.age を使って処理を書く
  
}`,
      solution: `function main(input: {name: string, age: number}) {
  const name = input.name;
  let age = input.age;
  
  // 1年後の年齢を計算
  age = age + 1;
  
  console.log(\`\${name}さんは現在\${input.age}歳です\`);
  console.log(\`来年は\${age}歳になります\`);
  
  return \`\${name}さんは来年\${age}歳になります\`;
}`,
      hints: [
        "constは再代入できない定数を定義します",
        "letは再代入可能な変数を定義します",
        "input.nameとinput.ageを使って処理を書きましょう",
        "テンプレートリテラル（\`\${}\`）を使って文字列を組み立てます"
      ],
      testCases: [
        {
          input: { name: "田中太郎", age: 25 },
          expected: "田中太郎さんは来年26歳になります",
          description: "基本的なケース"
        },
        {
          input: { name: "山田花子", age: 30 },
          expected: "山田花子さんは来年31歳になります",
          description: "別の名前と年齢"
        },
        {
          input: { name: "佐藤次郎", age: 0 },
          expected: "佐藤次郎さんは来年1歳になります",
          description: "0歳の赤ちゃん"
        }
      ]
    }
  },
  {
    day: 2,
    title: "条件分岐と比較演算子",
    goal: "条件分岐を用いた基本ロジックが書ける",
    completion: "if/switch 文を使える",
    task: "年齢に応じた出力（例: 未成年/成人）を表示",
    phase: 1,
    sampleCode: `// if文による条件分岐
const age = 20;

if (age >= 20) {
  console.log("成人です");
} else {
  console.log("未成年です");
}

// switch文の例
const grade = "A";

switch (grade) {
  case "A":
    console.log("優秀");
    break;
  case "B":
    console.log("良好");
    break;
  case "C":
    console.log("普通");
    break;
  default:
    console.log("要努力");
}

// 三項演算子も便利
const status = age >= 20 ? "成人" : "未成年";
console.log(\`あなたは\${status}です\`);`,
    explanation: "if文、switch文、三項演算子を使い分けて条件分岐を実装しましょう。",
    exercise: {
      description: "年齢を受け取り、0-12歳は「子供」、13-19歳は「ティーンエイジャー」、20-64歳は「大人」、65歳以上は「シニア」を返すmain関数を作成してください。",
      startCode: `function main(age: number): string {
  // ここに条件分岐のコードを書いてください
  
}`,
      solution: `function main(age: number): string {
  if (age >= 0 && age <= 12) {
    return "子供";
  } else if (age >= 13 && age <= 19) {
    return "ティーンエイジャー";
  } else if (age >= 20 && age <= 64) {
    return "大人";
  } else if (age >= 65) {
    return "シニア";
  } else {
    return "無効な年齢";
  }
}`,
      hints: [
        "if-else if-else構文を使いましょう",
        "年齢の範囲を適切に判定する必要があります",
        "&&演算子で複数の条件を組み合わせられます",
        "負の数など無効な入力も考慮しましょう"
      ],
      testCases: [
        {
          input: 10,
          expected: "子供",
          description: "子供の年齢"
        },
        {
          input: 16,
          expected: "ティーンエイジャー",
          description: "ティーンエイジャーの年齢"
        },
        {
          input: 35,
          expected: "大人",
          description: "大人の年齢"
        },
        {
          input: 70,
          expected: "シニア",
          description: "シニアの年齢"
        },
        {
          input: -5,
          expected: "無効な年齢",
          description: "負の年齢"
        }
      ]
    }
  },
  {
    day: 3,
    title: "配列とループ",
    goal: "配列操作と繰り返し処理の基礎を理解する",
    completion: "for, forEach, map を使い分けできる",
    task: "果物リストをすべて大文字にして出力",
    phase: 1,
    sampleCode: `// 配列の作成
const fruits = ["apple", "banana", "orange", "grape"];

// for文
console.log("=== for文 ===");
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i].toUpperCase());
}

// forEach（配列の各要素に処理を実行）
console.log("=== forEach ===");
fruits.forEach(fruit => {
  console.log(fruit.toUpperCase());
});

// map（新しい配列を作成）
console.log("=== map ===");
const upperFruits = fruits.map(fruit => fruit.toUpperCase());
console.log(upperFruits); // ["APPLE", "BANANA", "ORANGE", "GRAPE"]

// for...of（シンプルなループ）
console.log("=== for...of ===");
for (const fruit of fruits) {
  console.log(fruit.toUpperCase());
}`,
    explanation: "forEach は副作用のため、map は新しい配列作成のために使用します。",
    exercise: {
      description: "数値の配列を受け取り、偶数のみを抽出して2倍にした新しい配列を返すmain関数を作成してください。",
      startCode: `function main(numbers: number[]): number[] {
  // ここに配列操作のコードを書いてください
  
}`,
      solution: `function main(numbers: number[]): number[] {
  return numbers
    .filter(num => num % 2 === 0)  // 偶数のみを抽出
    .map(num => num * 2);          // 2倍にする
}`,
      hints: [
        "filter()メソッドで条件に合う要素を抽出できます",
        "map()メソッドで配列の各要素を変換できます",
        "偶数判定は num % 2 === 0 で行えます",
        "メソッドチェーンを使うと簡潔に書けます"
      ],
      testCases: [
        {
          input: [1, 2, 3, 4, 5, 6],
          expected: [4, 8, 12],
          description: "基本的なケース"
        },
        {
          input: [1, 3, 5, 7],
          expected: [],
          description: "偶数がない場合"
        },
        {
          input: [2, 4, 6, 8],
          expected: [4, 8, 12, 16],
          description: "すべて偶数の場合"
        },
        {
          input: [],
          expected: [],
          description: "空配列の場合"
        }
      ]
    }
  }
]

export const phaseInfo: PhaseInfo[] = [
  {
    id: 1,
    title: "Phase 1: JavaScript復習（基礎文法）",
    description: "TypeScriptを学ぶ前に、JavaScriptの基礎をしっかりと固めましょう。7日間でJavaScriptの核となる概念を復習します。",
    color: "#2196F3"
  },
  {
    id: 2,
    title: "Phase 2: TypeScript入門",
    description: "いよいよTypeScriptの世界へ！型システムの基礎から、実践的な使い方まで7日間で学習します。",
    color: "#FF9800"
  },
  {
    id: 3,
    title: "Phase 3: TypeScript実践応用",
    description: "高度なTypeScript機能を学び、実際のプロジェクトで使える実践的なスキルを身につけます。",
    color: "#9C27B0"
  }
]