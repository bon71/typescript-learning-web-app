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
    explanation: "const は定数、let は変数として使用します。var は古い書き方なので避けましょう。"
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
    explanation: "if文、switch文、三項演算子を使い分けて条件分岐を実装しましょう。"
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
    explanation: "forEach は副作用のため、map は新しい配列作成のために使用します。"
  },
  {
    day: 4,
    title: "関数の定義と使い方",
    goal: "関数定義とアロー関数を理解する",
    completion: "引数・戻り値のある関数を定義できる",
    task: "税率を加算する関数を定義して呼び出し",
    phase: 1,
    sampleCode: `// 通常の関数定義
function calculateTax(price, taxRate) {
  return price * (1 + taxRate);
}

// アロー関数
const calculateTaxArrow = (price, taxRate) => {
  return price * (1 + taxRate);
};

// アロー関数（短縮形）
const calculateTaxShort = (price, taxRate) => price * (1 + taxRate);

// 使用例
const originalPrice = 1000;
const taxRate = 0.1; // 10%

const totalPrice1 = calculateTax(originalPrice, taxRate);
const totalPrice2 = calculateTaxArrow(originalPrice, taxRate);
const totalPrice3 = calculateTaxShort(originalPrice, taxRate);

console.log(\`税込価格: \${totalPrice1}円\`); // 1100円
console.log(\`税込価格: \${totalPrice2}円\`); // 1100円
console.log(\`税込価格: \${totalPrice3}円\`); // 1100円

// デフォルト引数
const calculateTaxWithDefault = (price, taxRate = 0.1) => {
  return price * (1 + taxRate);
};

console.log(calculateTaxWithDefault(1000)); // デフォルト10%適用`,
    explanation: "アロー関数は簡潔な書き方ができ、thisの扱いが異なります。デフォルト引数も便利です。"
  },
  {
    day: 5,
    title: "オブジェクトの基本",
    goal: "オブジェクトの作成とアクセスを理解する",
    completion: "メソッド付きオブジェクトを使える",
    task: "user オブジェクトと sayHello() メソッドを実装",
    phase: 1,
    sampleCode: `// オブジェクトの作成
const user = {
  name: "田中太郎",
  age: 30,
  email: "tanaka@example.com",
  
  // メソッドの定義
  sayHello: function() {
    console.log(\`こんにちは、\${this.name}です！\`);
  },
  
  // ES6の短縮記法
  introduce() {
    console.log(\`私は\${this.name}、\${this.age}歳です。\`);
  }
};

// オブジェクトのプロパティにアクセス
console.log(user.name); // ドット記法
console.log(user["email"]); // ブラケット記法

// メソッドの呼び出し
user.sayHello(); // "こんにちは、田中太郎です！"
user.introduce(); // "私は田中太郎、30歳です。"

// プロパティの追加・変更
user.city = "東京";
user.age = 31;

console.log(user);

// 分割代入
const { name, age } = user;
console.log(\`\${name}さんは\${age}歳です\`);`,
    explanation: "オブジェクトにはプロパティとメソッドを持たせることができます。thisはメソッドが呼ばれたオブジェクトを指します。"
  },
  {
    day: 6,
    title: "DOM操作とイベント",
    goal: "DOMへのアクセスとイベント処理の基本を学ぶ",
    completion: "簡単なイベントリスナーが書ける",
    task: "ボタンを押したら「こんにちは」と表示",
    phase: 1,
    sampleCode: `// HTML例:
// <button id="myButton">クリック</button>
// <div id="output"></div>

// DOM要素の取得
const button = document.getElementById('myButton');
const output = document.getElementById('output');

// イベントリスナーの追加
button.addEventListener('click', function() {
  output.textContent = 'こんにちは！';
});

// アロー関数でも書ける
button.addEventListener('click', () => {
  output.innerHTML = '<strong>こんにちは！</strong>';
});

// より実用的な例
const nameInput = document.getElementById('nameInput');
const greetButton = document.getElementById('greetButton');
const greeting = document.getElementById('greeting');

greetButton.addEventListener('click', () => {
  const name = nameInput.value;
  if (name) {
    greeting.textContent = \`こんにちは、\${name}さん！\`;
  } else {
    greeting.textContent = '名前を入力してください';
  }
});`,
    explanation: "DOM操作でHTMLを動的に変更できます。イベントリスナーでユーザーの操作に反応できます。"
  },
  {
    day: 7,
    title: "総復習とミニアプリ",
    goal: "一連の構文を組み合わせて使える",
    completion: "JSでUI操作ができる",
    task: "入力された名前を使って挨拶を表示するHTML+JSアプリ",
    phase: 1,
    sampleCode: `// HTML構造例:
/*
<!DOCTYPE html>
<html>
<head>
  <title>挨拶アプリ</title>
</head>
<body>
  <h1>挨拶アプリ</h1>
  <input id="nameInput" placeholder="お名前を入力">
  <button id="greetButton">挨拶する</button>
  <div id="output"></div>
  <script src="script.js"></script>
</body>
</html>
*/

// JavaScript (script.js)
class GreetingApp {
  constructor() {
    this.nameInput = document.getElementById('nameInput');
    this.greetButton = document.getElementById('greetButton');
    this.output = document.getElementById('output');
    this.greetings = ['こんにちは', 'おはよう', 'こんばんは'];
    
    this.init();
  }
  
  init() {
    this.greetButton.addEventListener('click', () => this.greet());
    this.nameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.greet();
    });
  }
  
  greet() {
    const name = this.nameInput.value.trim();
    
    if (!name) {
      this.showMessage('名前を入力してください', 'error');
      return;
    }
    
    const randomGreeting = this.getRandomGreeting();
    this.showMessage(\`\${randomGreeting}、\${name}さん！\`, 'success');
    this.nameInput.value = '';
  }
  
  getRandomGreeting() {
    const index = Math.floor(Math.random() * this.greetings.length);
    return this.greetings[index];
  }
  
  showMessage(message, type) {
    this.output.textContent = message;
    this.output.className = type;
  }
}

// アプリの初期化
document.addEventListener('DOMContentLoaded', () => {
  new GreetingApp();
});`,
    explanation: "クラスを使ってコードを整理し、イベント処理やDOM操作を組み合わせて実用的なアプリを作成できます。"
  },
  // Phase 2: TypeScript入門
  {
    day: 8,
    title: "TypeScriptとは",
    goal: "型があることの利点を理解する",
    completion: "JSとの違いを説明できる",
    task: "型あり/なし変数の比較コードを書く",
    phase: 2,
    sampleCode: `// JavaScript（型なし）
let userName = "田中太郎";
userName = 123; // エラーにならない！

// TypeScript（型あり）
let userName: string = "田中太郎";
// userName = 123; // コンパイルエラー！

// 型推論（TypeScriptが自動で型を判定）
let age = 30; // number型と推論される
// age = "三十歳"; // エラー！

// 関数の型注釈
function greet(name: string): string {
  return \`こんにちは、\${name}さん！\`;
}

// greet(123); // エラー！引数はstring型である必要がある
console.log(greet("山田花子")); // OK

// TypeScriptの利点
// 1. コンパイル時にエラーを発見
// 2. IDEでの自動補完
// 3. リファクタリングの安全性
// 4. 型情報による自己文書化

// 実際のタスク - 型あり/なしの比較
console.log("=== JavaScript（型なし）===");
let jsVariable = "文字列";
jsVariable = 42;
jsVariable = true;
console.log("JSは何でも代入可能:", jsVariable);

console.log("\\n=== TypeScript（型あり）===");
let tsVariable: string = "文字列";
console.log("TSは型安全:", tsVariable);
// tsVariable = 42; // この行のコメントを外すとエラー！`,
    explanation: "TypeScriptは型システムによって、開発時にエラーを早期発見し、より安全なコードが書けます。"
  },
  {
    day: 9,
    title: "基本の型",
    goal: "number, string, boolean を使いこなす",
    completion: "それぞれの変数が定義・使用できる",
    task: "氏名、年齢、ログイン中かどうかのフラグを定義",
    phase: 2,
    sampleCode: `// 基本的な型の定義
let userName: string = "田中太郎";
let age: number = 30;
let isLoggedIn: boolean = true;

// 型推論を活用（推奨）
let companyName = "株式会社サンプル"; // string型と推論
let employeeCount = 150; // number型と推論
let isActive = true; // boolean型と推論

// 配列の型
let hobbies: string[] = ["読書", "映画鑑賞", "プログラミング"];
let scores: number[] = [85, 92, 78, 96];
let flags: boolean[] = [true, false, true];

// 配列の別記法（Array<T>）
let languages: Array<string> = ["JavaScript", "TypeScript", "Python"];

// 型注釈の実用例
function createUserProfile(
  name: string,
  age: number,
  isActive: boolean
): string {
  const status = isActive ? "アクティブ" : "非アクティブ";
  return \`名前: \${name}, 年齢: \${age}歳, 状態: \${status}\`;
}

// 実際のタスク - 氏名、年齢、ログイン状態を定義
console.log("=== 基本型の実践 ===");
console.log(createUserProfile(userName, age, isLoggedIn));

// 配列操作の例
console.log("\\n=== 配列操作 ===");
console.log("趣味:", hobbies.join(", "));
console.log("平均点:", scores.reduce((a, b) => a + b) / scores.length);
console.log("アクティブフラグ:", flags.filter(flag => flag).length, "個");

// 型の安全性を確認
console.log("\\n=== 型安全性 ===");
console.log("userName型:", typeof userName);
console.log("age型:", typeof age);
console.log("isLoggedIn型:", typeof isLoggedIn);`,
    explanation: "TypeScriptの基本型（string, number, boolean）を理解し、配列の型注釈も使えるようになりましょう。"
  },
  {
    day: 10,
    title: "配列とオブジェクトの型",
    goal: "型付き配列とオブジェクトが作れる",
    completion: "User[] 型を定義し使える",
    task: "ユーザーリストを作成し、出力",
    phase: 2,
    sampleCode: `// オブジェクトの型定義
type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};

// ユーザー配列の型定義
let users: User[] = [
  {
    id: 1,
    name: "田中太郎",
    email: "tanaka@example.com",
    isActive: true
  },
  {
    id: 2,
    name: "山田花子",
    email: "yamada@example.com",
    isActive: false
  }
];

// オブジェクトの配列操作
function getActiveUsers(users: User[]): User[] {
  return users.filter(user => user.isActive);
}

function getUserNames(users: User[]): string[] {
  return users.map(user => user.name);
}

// 実際のタスク - ユーザーリスト作成と出力
console.log("=== 全ユーザー ===");
users.forEach(user => {
  console.log(\`ID: \${user.id}, 名前: \${user.name}, アクティブ: \${user.isActive}\`);
});

console.log("\\n=== アクティブユーザー ===");
const activeUsers = getActiveUsers(users);
activeUsers.forEach(user => {
  console.log(\`\${user.name} (\${user.email})\`);
});

console.log("\\n=== ユーザー名一覧 ===");
const userNames = getUserNames(users);
console.log(userNames.join(", "));

// ネストしたオブジェクトの型
type Address = {
  prefecture: string;
  city: string;
  zipCode: string;
};

type UserWithAddress = {
  id: number;
  name: string;
  address: Address;
};

const userWithAddress: UserWithAddress = {
  id: 3,
  name: "佐藤次郎",
  address: {
    prefecture: "東京都",
    city: "渋谷区",
    zipCode: "150-0002"
  }
};

console.log("\\n=== 住所付きユーザー ===");
console.log(\`\${userWithAddress.name}: \${userWithAddress.address.prefecture}\${userWithAddress.address.city}\`);`,
    explanation: "オブジェクトの型定義にはtypeキーワードを使用し、配列の型は[]を使って表現します。"
  },
  {
    day: 11,
    title: "関数に型をつける",
    goal: "関数の引数と戻り値に型をつける",
    completion: "シグネチャを定義できる",
    task: "2つの数を受け取り加算する関数を作成",
    phase: 2,
    sampleCode: `// 基本的な関数の型注釈
function add(a: number, b: number): number {
  return a + b;
}

// アロー関数の型注釈
const multiply = (a: number, b: number): number => {
  return a * b;
};

// 戻り値の型推論
const subtract = (a: number, b: number) => {
  return a - b; // number型と推論される
};

// オプショナル引数
function greet(name: string, greeting?: string): string {
  return \`\${greeting || "こんにちは"}, \${name}さん！\`;
}

// デフォルト引数
function createMessage(
  name: string, 
  age: number = 20, 
  prefix: string = "Mr."
): string {
  return \`\${prefix} \${name} (\${age}歳)\`;
}

// 実際のタスク - 2つの数を受け取り加算
console.log("=== 基本的な計算関数 ===");
console.log("加算結果:", add(5, 3));
console.log("乗算結果:", multiply(4, 7));
console.log("減算結果:", subtract(10, 3));

console.log("\\n=== オプショナル・デフォルト引数 ===");
console.log(greet("田中太郎"));
console.log(greet("山田花子", "おはよう"));
console.log(createMessage("佐藤次郎"));
console.log(createMessage("鈴木花子", 25, "Ms."));

// 関数型の定義
type Calculator = (a: number, b: number) => number;

const divide: Calculator = (a, b) => {
  if (b === 0) {
    throw new Error("0で割ることはできません");
  }
  return a / b;
};

// 高階関数
function calculate(
  a: number, 
  b: number, 
  operation: Calculator
): number {
  return operation(a, b);
}

console.log("\\n=== 高階関数と関数型 ===");
console.log("除算結果:", calculate(10, 2, divide));
console.log("カスタム計算:", calculate(8, 3, (x, y) => x * y + 1));

// 複数の戻り値を持つ関数
function calculateStats(numbers: number[]): {
  sum: number;
  average: number;
  max: number;
  min: number;
} {
  const sum = numbers.reduce((a, b) => a + b, 0);
  return {
    sum,
    average: sum / numbers.length,
    max: Math.max(...numbers),
    min: Math.min(...numbers)
  };
}

const stats = calculateStats([10, 20, 30, 40, 50]);
console.log("\\n=== 統計計算 ===");
console.log(\`合計: \${stats.sum}, 平均: \${stats.average}\`);
console.log(\`最大: \${stats.max}, 最小: \${stats.min}\`);`,
    explanation: "関数の引数と戻り値に型をつけることで、安全で予測可能な関数を作成できます。"
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