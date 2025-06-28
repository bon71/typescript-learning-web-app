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

  // Phase 2: TypeScript入門（Day 8-14 を続ける）
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
console.log(message.toUpperCase()); // 実行時エラー！

// TypeScript（型あり）
let typedMessage: string = "Hello";
// typedMessage = 42; // コンパイル時エラー！型安全
console.log(typedMessage.toUpperCase()); // 安全

// 基本的な型の例
let userName: string = "田中太郎";
let userAge: number = 30;
let isLoggedIn: boolean = true;
let data: any = "何でも入る"; // any型は避けるべき

// 型推論（TypeScriptが型を自動で推測）
let autoString = "自動で string型";
let autoNumber = 100; // 自動で number型
let autoBool = false; // 自動で boolean型

// 関数の型
function greet(name: string): string {
  return \`こんにちは、\${name}さん！\`;
}

// 型注釈なしの場合（推論される）
function add(a: number, b: number) {
  return a + b; // 戻り値の型は自動でnumber
}

console.log(greet("太郎"));
console.log(add(5, 3));

// 型によるエラーの防止
// greet(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'
// add("1", "2"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'`,
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

// より詳細な型の使用例
let firstName: string = "太郎";
let lastName: string = "田中";
let fullName: string = \`\${lastName} \${firstName}\`;

let price: number = 1000;
let taxRate: number = 0.1;
let totalPrice: number = price * (1 + taxRate);

let hasPermission: boolean = true;
let isAdmin: boolean = false;
let canEdit: boolean = hasPermission && isAdmin;

// 型推論の活用（型注釈を省略）
let autoName = "山田花子"; // string型
let autoAge = 30; // number型
let autoFlag = true; // boolean型

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

console.log(displayUserInfo(studentName, studentAge, isCurrentlyLoggedIn));

// 条件分岐での活用
if (isCurrentlyLoggedIn && studentAge >= 18) {
  console.log(\`\${studentName}さんは成人でログイン中です\`);
}

// 型安全な計算
function calculateDiscount(
  originalPrice: number, 
  isStudent: boolean
): number {
  const discountRate = isStudent ? 0.2 : 0;
  return originalPrice * (1 - discountRate);
}

console.log(calculateDiscount(1000, true)); // 800`,
    explanation: "基本型の組み合わせで、型安全なプログラムを作成できます。型推論も活用しましょう。"
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