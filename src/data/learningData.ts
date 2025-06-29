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
console.log(\`あなたは\${status}です\`);

// 実際のタスク：年齢判定
const userAge = 18;
if (userAge >= 20) {
  console.log("成人の方ですね");
} else if (userAge >= 13) {
  console.log("中高生の方ですね");
} else {
  console.log("小学生の方ですね");
}`,
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

// for文による処理
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
}

// 実際のタスク：果物を大文字で表示
const myFruits = ["apple", "banana", "cherry"];
const capitalizedFruits = myFruits.map(fruit => fruit.toUpperCase());
console.log("大文字の果物リスト:", capitalizedFruits);`,
    explanation: "forEach は副作用のため、map は新しい配列作成のために使用します。用途に応じて使い分けましょう。"
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

console.log(\`税込価格1: \${totalPrice1}円\`); // 1100円
console.log(\`税込価格2: \${totalPrice2}円\`); // 1100円
console.log(\`税込価格3: \${totalPrice3}円\`); // 1100円

// デフォルト引数
const calculateTaxWithDefault = (price, taxRate = 0.1) => {
  return price * (1 + taxRate);
};

console.log(calculateTaxWithDefault(1000)); // デフォルト10%適用

// 実際のタスク：消費税計算
function addConsumptionTax(price) {
  return price * 1.1; // 10%の消費税
}

const itemPrice = 500;
const finalPrice = addConsumptionTax(itemPrice);
console.log(\`商品価格: \${itemPrice}円\`);
console.log(\`税込価格: \${finalPrice}円\`);`,
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
  },

  // 計算されたプロパティ
  getInfo() {
    return \`\${this.name} (\${this.email})\`;
  }
};

// オブジェクトのプロパティにアクセス
console.log(user.name); // ドット記法
console.log(user["email"]); // ブラケット記法

// メソッドの呼び出し
user.sayHello(); // "こんにちは、田中太郎です！"
user.introduce(); // "私は田中太郎、30歳です。"
console.log(user.getInfo()); // "田中太郎 (tanaka@example.com)"

// プロパティの追加・変更
user.city = "東京";
user.age = 31;

console.log(user);

// 分割代入
const { name, age } = user;
console.log(\`\${name}さんは\${age}歳です\`);

// 実際のタスク：ユーザーオブジェクト作成
const myUser = {
  name: "山田花子",
  age: 25,

  sayHello() {
    console.log(\`こんにちは、\${this.name}です！よろしくお願いします。\`);
  }
};

myUser.sayHello();`,
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

// より実用的な例：名前入力と挨拶
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
});

// Enterキーでも実行
nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    greetButton.click();
  }
});

// 実際のタスク：シンプルなクリックイベント
// HTML: <button id="helloButton">挨拶</button>
//       <p id="message"></p>

const helloButton = document.getElementById('helloButton');
const message = document.getElementById('message');

helloButton.addEventListener('click', () => {
  message.textContent = 'こんにちは！ボタンがクリックされました。';
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
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .container { max-width: 500px; margin: 0 auto; }
    input, button { padding: 10px; margin: 5px; font-size: 16px; }
    .output { margin-top: 20px; padding: 10px; border-radius: 5px; }
    .success { background-color: #d4edda; color: #155724; }
    .error { background-color: #f8d7da; color: #721c24; }
  </style>
</head>
<body>
  <div class="container">
    <h1>挨拶アプリ</h1>
    <input id="nameInput" placeholder="お名前を入力">
    <button id="greetButton">挨拶する</button>
    <button id="clearButton">クリア</button>
    <div id="output" class="output"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>
*/

// JavaScript (script.js)
class GreetingApp {
  constructor() {
    this.nameInput = document.getElementById('nameInput');
    this.greetButton = document.getElementById('greetButton');
    this.clearButton = document.getElementById('clearButton');
    this.output = document.getElementById('output');
    this.greetings = ['こんにちは', 'おはよう', 'こんばんは'];
    this.visitCount = 0;

    this.init();
  }

  init() {
    // イベントリスナーの登録
    this.greetButton.addEventListener('click', () => this.greet());
    this.clearButton.addEventListener('click', () => this.clear());
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

    this.visitCount++;
    const randomGreeting = this.getRandomGreeting();
    const message = \`\${randomGreeting}、\${name}さん！（\${this.visitCount}回目の挨拶）\`;

    this.showMessage(message, 'success');
    this.nameInput.value = '';
  }

  getRandomGreeting() {
    const index = Math.floor(Math.random() * this.greetings.length);
    return this.greetings[index];
  }

  showMessage(message, type) {
    this.output.textContent = message;
    this.output.className = \`output \${type}\`;
  }

  clear() {
    this.nameInput.value = '';
    this.output.textContent = '';
    this.output.className = 'output';
    this.visitCount = 0;
  }
}

// アプリの初期化
document.addEventListener('DOMContentLoaded', () => {
  new GreetingApp();
});

// 簡単版（学習用）
const simpleGreeting = () => {
  const name = prompt('お名前を教えてください');
  if (name) {
    alert(\`こんにちは、\${name}さん！\`);
  } else {
    alert('名前が入力されませんでした');
  }
};

// 関数・オブジェクト・DOM操作・イベントを組み合わせた例
const userManager = {
  users: [],

  addUser(name, age) {
    if (name && age) {
      this.users.push({ name, age, id: Date.now() });
      this.displayUsers();
    }
  },

  displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = this.users.map(user =>
      \`<li>\${user.name} (\${user.age}歳)</li>\`
    ).join('');
  }
};`,
    explanation: "クラス、関数、DOM操作、イベント処理を組み合わせて実用的なアプリを作成できます。これまでの学習内容の総まとめです。"
  },

  // Phase 2: TypeScript入門
  {
    day: 8,
    title: "TypeScriptとは",
    goal: "型があることの利点を理解する",
    completion: "JSとの違いを説明できる",
    task: "型あり/なし変数の比較コードを書く",
    phase: 2,
    sampleCode: `// JavaScript（型なし）- 実行時エラーが発生する可能性
let userName = "太郎";
userName = 123; // エラーにならない
userName.toUpperCase(); // 実行時エラー！

// TypeScript（型あり）- コンパイル時にエラーを検出
let userNameTs: string = "太郎";
// userNameTs = 123; // コンパイルエラー！型 'number' を型 'string' に割り当てることはできません

// 型推論 - 明示的に型を書かなくても推論される
let inferredName = "花子"; // 自動的にstring型と推論
// inferredName = 456; // エラー！型 'number' を型 'string' に割り当てることはできません

// 実際のタスク：型の比較
console.log("=== JavaScript（型なし）===");
let jsVar = "文字列";
jsVar = 100;
console.log(typeof jsVar); // "number"

console.log("=== TypeScript（型あり）===");
let tsVar: string = "文字列";
// tsVar = 100; // コンパイルエラー
console.log(typeof tsVar); // "string"

// TypeScriptの利点を実感
function greet(name: string): string {
  return \`こんにちは、\${name}さん！\`;
}

console.log(greet("太郎")); // OK
// console.log(greet(123)); // エラー！引数の型が違う

// 開発時に間違いを発見できる
const user = {
  name: "田中",
  age: 30
};

console.log(user.name); // OK
// console.log(user.nama); // エラー！プロパティ 'nama' は存在しません`,
    explanation: "TypeScriptは開発時に型エラーを検出し、より安全で保守しやすいコードを書けます。JavaScriptの実行時エラーを事前に防げます。"
  },
  {
    day: 9,
    title: "基本の型",
    goal: "number, string, boolean を使いこなす",
    completion: "それぞれの変数が定義・使用できる",
    task: "氏名、年齢、ログイン中かどうかのフラグを定義",
    phase: 2,
    sampleCode: `// 基本的な型定義
// 1. string型 - 文字列
let userName: string = "田中太郎";
let email: string = "tanaka@example.com";
let message: string = \`こんにちは、\${userName}さん\`;

// 2. number型 - 数値（整数・小数・負数）
let age: number = 30;
let height: number = 175.5;
let temperature: number = -5;
let score: number = 0;

// 3. boolean型 - 真偽値
let isLoggedIn: boolean = true;
let isAdmin: boolean = false;
let hasPermission: boolean = age >= 20;

// 4. 型推論を活用
let autoString = "自動推論"; // string型と推論
let autoNumber = 42; // number型と推論
let autoBool = true; // boolean型と推論

// 実際のタスク：ユーザー情報の定義
let fullName: string = "山田花子";
let userAge: number = 25;
let isCurrentlyLoggedIn: boolean = true;

console.log("=== ユーザー情報 ===");
console.log(\`氏名: \${fullName}\`);
console.log(\`年齢: \${userAge}歳\`);
console.log(\`ログイン状態: \${isCurrentlyLoggedIn ? "ログイン中" : "ログアウト中"}\`);

// 型による条件分岐
if (typeof userAge === "number" && userAge >= 18) {
  console.log("成人ユーザーです");
}

// 複合的な使用例
function createWelcomeMessage(name: string, age: number, isLoggedIn: boolean): string {
  if (isLoggedIn) {
    return \`\${name}さん（\${age}歳）、おかえりなさい！\`;
  } else {
    return \`\${name}さん、ログインしてください。\`;
  }
}

const welcomeMsg = createWelcomeMessage(fullName, userAge, isCurrentlyLoggedIn);
console.log(welcomeMsg);

// 型アノテーションの省略も可能
let productName = "TypeScript学習本"; // string型と推論
let price = 2980; // number型と推論
let inStock = true; // boolean型と推論

console.log(\`商品: \${productName}, 価格: \${price}円, 在庫: \${inStock ? "あり" : "なし"}\`);`,
    explanation: "基本型は TypeScript の基礎です。型を明示することで、開発中のミスを防ぎ、コードの意図を明確にできます。"
  },
  {
    day: 10,
    title: "配列とオブジェクトの型",
    goal: "型付き配列とオブジェクトが作れる",
    completion: "User[] 型を定義し使える",
    task: "ユーザーリストを作成し、出力",
    phase: 2,
    sampleCode: `// 配列の型定義
// 1. 基本的な配列型
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["apple", "banana", "orange"];
let flags: boolean[] = [true, false, true];

// 2. Array<T>記法も使用可能
let scores: Array<number> = [85, 92, 78, 95];
let names: Array<string> = ["太郎", "花子", "次郎"];

// オブジェクトの型定義
// 1. インラインでの型定義
let user: { name: string; age: number; email: string } = {
  name: "田中太郎",
  age: 30,
  email: "tanaka@example.com"
};

// 2. オプショナルプロパティ（?をつける）
let product: { name: string; price: number; description?: string } = {
  name: "TypeScript本",
  price: 2980
  // descriptionは省略可能
};

// 3. 読み取り専用プロパティ（readonlyをつける）
let config: { readonly apiUrl: string; readonly version: string } = {
  apiUrl: "https://api.example.com",
  version: "1.0.0"
};
// config.apiUrl = "変更不可"; // エラー！読み取り専用

// 実際のタスク：ユーザーリストの作成
// ユーザー型の定義
type User = {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
  email?: string; // オプショナル
};

// ユーザー配列の作成
let users: User[] = [
  {
    id: 1,
    name: "田中太郎",
    age: 30,
    isActive: true,
    email: "tanaka@example.com"
  },
  {
    id: 2,
    name: "山田花子",
    age: 25,
    isActive: false
  },
  {
    id: 3,
    name: "佐藤次郎",
    age: 35,
    isActive: true,
    email: "sato@example.com"
  }
];

// ユーザーリストの出力
console.log("=== ユーザーリスト ===");
users.forEach((user: User) => {
  const status = user.isActive ? "アクティブ" : "非アクティブ";
  const emailInfo = user.email ? \`(\${user.email})\` : "(メールアドレス未登録)";
  console.log(\`ID: \${user.id}, 名前: \${user.name}, 年齢: \${user.age}歳, 状態: \${status} \${emailInfo}\`);
});

// 配列操作の例
const activeUsers: User[] = users.filter((user: User) => user.isActive);
console.log(\`アクティブユーザー数: \${activeUsers.length}人\`);

const userNames: string[] = users.map((user: User) => user.name);
console.log(\`ユーザー名一覧: \${userNames.join(", ")}\`);

// ネストしたオブジェクトの型
type Company = {
  name: string;
  employees: User[];
  address: {
    prefecture: string;
    city: string;
    zipCode: string;
  };
};

const myCompany: Company = {
  name: "株式会社サンプル",
  employees: users,
  address: {
    prefecture: "東京都",
    city: "渋谷区",
    zipCode: "150-0001"
  }
};

console.log(\`会社名: \${myCompany.name}\`);
console.log(\`所在地: \${myCompany.address.prefecture}\${myCompany.address.city}\`);
console.log(\`従業員数: \${myCompany.employees.length}人\`);`,
    explanation: "配列とオブジェクトに型をつけることで、プロパティへの安全なアクセスや配列操作が可能になります。複雑なデータ構造も型安全に扱えます。"
  },
// Phase 2: TypeScript入門（続き）
  {
    day: 11,
    title: "関数に型をつける",
    goal: "関数の引数と戻り値に型をつける",
    completion: "シグネチャを定義できる",
    task: "2つの数を受け取り加算する関数を作成",
    phase: 2,
    sampleCode: `// 基本的な関数の型定義
// 1. 関数宣言での型注釈
function add(a: number, b: number): number {
  return a + b;
}

// 2. アロー関数での型注釈
const multiply = (x: number, y: number): number => {
  return x * y;
};

// 3. アロー関数（短縮形）
const divide = (x: number, y: number): number => x / y;

// 実際のタスク：2つの数を受け取り加算
function addNumbers(num1: number, num2: number): number {
  return num1 + num2;
}

console.log(addNumbers(5, 3)); // 8
// console.log(addNumbers("5", 3)); // エラー！

// オプション引数（?をつける）
function greetUser(name: string, age?: number): string {
  if (age !== undefined) {
    return \`こんにちは、\${name}さん（\${age}歳）！\`;
  }
  return \`こんにちは、\${name}さん！\`;
}

console.log(greetUser("太郎")); // "こんにちは、太郎さん！"
console.log(greetUser("花子", 25)); // "こんにちは、花子さん（25歳）！"

// デフォルト引数
function calculateArea(width: number, height: number = width): number {
  return width * height;
}

console.log(calculateArea(5)); // 25（正方形）
console.log(calculateArea(4, 6)); // 24（長方形）

// 関数型の定義
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (x, y) => x - y;
const modulo: MathOperation = (x, y) => x % y;

// 関数を引数に取る高階関数
function calculate(a: number, b: number, operation: MathOperation): number {
  return operation(a, b);
}

console.log(calculate(10, 3, add)); // 13
console.log(calculate(10, 3, subtract)); // 7
console.log(calculate(10, 3, modulo)); // 1

// void型（戻り値がない関数）
function logMessage(message: string): void {
  console.log(\`[ログ] \${message}\`);
}

// never型（決して戻らない関数）
function throwError(message: string): never {
  throw new Error(message);
}

// 複数の戻り値型（Union型）
function formatValue(value: number | string): string {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}

console.log(formatValue(123.456)); // "123.46"
console.log(formatValue("hello")); // "HELLO"

// 実用的な例：ユーザー認証関数
type User = {
  id: number;
  name: string;
  email: string;
};

function authenticateUser(email: string, password: string): User | null {
  // 実際の認証ロジック（簡略化）
  if (email === "user@example.com" && password === "password123") {
    return {
      id: 1,
      name: "テストユーザー",
      email: email
    };
  }
  return null; // 認証失敗
}

const result = authenticateUser("user@example.com", "password123");
if (result) {
  console.log(\`ログイン成功: \${result.name}\`);
} else {
  console.log("ログイン失敗");
}`,
    explanation: "関数に型をつけることで、引数の型ミスや戻り値の取り扱いミスを防げます。オプション引数やデフォルト引数も型安全に使えます。"
  },
  {
    day: 12,
    title: "Union型とLiteral型",
    goal: "複数の型や文字列限定型を理解する",
    completion: "Union/Literal型の使い分けができる",
    task: '"admin" | "user" を受け取る関数を定義',
    phase: 2,
    sampleCode: `// Union型（複数の型を許可）
// 1. 基本的なUnion型
let value: string | number;
value = "文字列"; // OK
value = 123; // OK
// value = true; // エラー！boolean型は許可されていない

// 2. null・undefinedを含むUnion型
let nullable: string | null = null;
let optional: number | undefined = undefined;

// 3. 配列のUnion型
let mixedArray: (string | number)[] = ["hello", 123, "world", 456];

// Literal型（特定の値のみを許可）
// 1. 文字列リテラル型
type UserRole = "admin" | "user" | "guest";
type Status = "pending" | "approved" | "rejected";

// 2. 数値リテラル型
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type HttpStatus = 200 | 404 | 500;

// 実際のタスク："admin" | "user" を受け取る関数
function checkPermission(role: "admin" | "user"): string {
  if (role === "admin") {
    return "全ての操作が可能です";
  } else {
    return "制限された操作のみ可能です";
  }
}

console.log(checkPermission("admin")); // "全ての操作が可能です"
console.log(checkPermission("user")); // "制限された操作のみ可能です"
// console.log(checkPermission("guest")); // エラー！

// 実用的な例：API応答の型定義
type ApiResponse<T> = {
  data: T;
  status: "success" | "error";
  message?: string;
};

type User = {
  id: number;
  name: string;
  role: UserRole;
};

function fetchUser(id: number): ApiResponse<User> {
  // 簡略化されたAPI呼び出し
  if (id > 0) {
    return {
      data: {
        id: id,
        name: "田中太郎",
        role: "user"
      },
      status: "success"
    };
  } else {
    return {
      data: { id: 0, name: "", role: "guest" },
      status: "error",
      message: "ユーザーが見つかりません"
    };
  }
}

// 型ガード関数
function isAdmin(role: UserRole): role is "admin" {
  return role === "admin";
}

function handleUserAction(user: User, action: string): void {
  if (isAdmin(user.role)) {
    console.log(\`管理者\${user.name}が\${action}を実行しました\`);
  } else {
    console.log(\`一般ユーザー\${user.name}が\${action}を実行しました\`);
  }
}

// Union型の絞り込み
function processInput(input: string | number): string {
  if (typeof input === "string") {
    // この分岐内では input は string型として扱われる
    return input.toUpperCase();
  } else {
    // この分岐内では input は number型として扱われる
    return input.toString();
  }
}

console.log(processInput("hello")); // "HELLO"
console.log(processInput(123)); // "123"

// 判別可能なUnion型
type LoadingState = {
  status: "loading";
};

type SuccessState = {
  status: "success";
  data: string;
};

type ErrorState = {
  status: "error";
  error: string;
};

type AppState = LoadingState | SuccessState | ErrorState;

function renderState(state: AppState): string {
  switch (state.status) {
    case "loading":
      return "読み込み中...";
    case "success":
      return \`データ: \${state.data}\`;
    case "error":
      return \`エラー: \${state.error}\`;
    default:
      // TypeScriptが全てのケースが処理されていることを確認
      const _exhaustive: never = state;
      return _exhaustive;
  }
}

// 使用例
const loadingState: AppState = { status: "loading" };
const successState: AppState = { status: "success", data: "成功データ" };
const errorState: AppState = { status: "error", error: "何かが間違っています" };

console.log(renderState(loadingState)); // "読み込み中..."
console.log(renderState(successState)); // "データ: 成功データ"
console.log(renderState(errorState)); // "エラー: 何かが間違っています"`,
    explanation: "Union型で複数の型を許可し、Literal型で特定の値のみを許可できます。型ガードを使って安全に型を絞り込めます。"
  },
  {
    day: 13,
    title: "Interfaceと継承",
    goal: "Interfaceの定義と拡張を理解する",
    completion: "複数の型構造を再利用できる",
    task: "Person → Employee を継承してオブジェクト作成",
    phase: 2,
    sampleCode: `// 基本的なInterface定義
interface Person {
  name: string;
  age: number;
  email?: string; // オプショナルプロパティ
}

// Interfaceの使用
const person: Person = {
  name: "田中太郎",
  age: 30,
  email: "tanaka@example.com"
};

// Interfaceの継承（extends）
interface Employee extends Person {
  employeeId: string;
  department: string;
  salary: number;
}

// 実際のタスク：Person → Employee継承
const employee: Employee = {
  name: "山田花子", // Personから継承
  age: 28,         // Personから継承
  email: "yamada@company.com", // Personから継承（オプショナル）
  employeeId: "EMP001", // Employee固有
  department: "開発部",  // Employee固有
  salary: 500000        // Employee固有
};

console.log(\`従業員: \${employee.name} (\${employee.employeeId})\`);
console.log(\`部署: \${employee.department}, 年齢: \${employee.age}歳\`);

// メソッドを含むInterface
interface Greetable {
  greet(): string;
  greetWithMessage(message: string): string;
}

interface Student extends Person, Greetable {
  studentId: string;
  grade: number;
  subjects: string[];
}

// Interfaceの実装
const student: Student = {
  name: "佐藤次郎",
  age: 20,
  studentId: "STU001",
  grade: 2,
  subjects: ["数学", "物理", "化学"],

  greet(): string {
    return \`こんにちは、\${this.name}です。\`;
  },

  greetWithMessage(message: string): string {
    return \`\${message} 私は\${this.grade}年生の\${this.name}です。\`;
  }
};

console.log(student.greet());
console.log(student.greetWithMessage("おはようございます！"));

// 関数パラメータとしてのInterface
function displayPersonInfo(person: Person): void {
  console.log(\`名前: \${person.name}\`);
  console.log(\`年齢: \${person.age}歳\`);
  if (person.email) {
    console.log(\`メール: \${person.email}\`);
  }
}

displayPersonInfo(person);
displayPersonInfo(employee); // Employeeも Personを継承しているので使える
displayPersonInfo(student);  // Studentも Personを継承しているので使える

// Interfaceの結合（Declaration Merging）
interface Product {
  id: string;
  name: string;
}

interface Product {
  price: number;
  category: string;
}

// 上記2つのInterfaceが自動的に結合される
const product: Product = {
  id: "PROD001",
  name: "TypeScript学習本",
  price: 2980,
  category: "技術書"
};

// 読み取り専用プロパティ
interface ReadonlyConfig {
  readonly apiUrl: string;
  readonly version: string;
  settings: {
    readonly maxRetries: number;
    timeout: number; // 変更可能
  };
}

const config: ReadonlyConfig = {
  apiUrl: "https://api.example.com",
  version: "1.0.0",
  settings: {
    maxRetries: 3,
    timeout: 5000
  }
};

// config.apiUrl = "変更不可"; // エラー！
config.settings.timeout = 10000; // OK（readonlyではない）

// インデックスシグネチャ
interface Dictionary {
  [key: string]: string;
}

const dictionary: Dictionary = {
  "hello": "こんにちは",
  "goodbye": "さようなら",
  "thank you": "ありがとう"
};

// 関数型のInterface
interface MathOperation {
  (a: number, b: number): number;
}

const add: MathOperation = (x, y) => x + y;
const multiply: MathOperation = (x, y) => x * y;

// 複雑な例：会社管理システム
interface Company {
  name: string;
  address: string;
  employees: Employee[];

  addEmployee(employee: Employee): void;
  getEmployeeById(id: string): Employee | undefined;
  getEmployeesByDepartment(department: string): Employee[];
}

const company: Company = {
  name: "株式会社TypeScript",
  address: "東京都渋谷区",
  employees: [employee],

  addEmployee(newEmployee: Employee): void {
    this.employees.push(newEmployee);
    console.log(\`従業員\${newEmployee.name}を追加しました\`);
  },

  getEmployeeById(id: string): Employee | undefined {
    return this.employees.find(emp => emp.employeeId === id);
  },

  getEmployeesByDepartment(department: string): Employee[] {
    return this.employees.filter(emp => emp.department === department);
  }
};

// 新しい従業員を追加
const newEmployee: Employee = {
  name: "鈴木一郎",
  age: 35,
  employeeId: "EMP002",
  department: "営業部",
  salary: 450000
};

company.addEmployee(newEmployee);

// 部署別の従業員検索
const devEmployees = company.getEmployeesByDepartment("開発部");
console.log(\`開発部の従業員数: \${devEmployees.length}人\`);`,
    explanation: "Interfaceを使って型の構造を定義し、継承で型を拡張できます。複数のInterfaceを組み合わせて複雑な型システムを構築できます。"
  },
{
    day: 14,
    title: "クラスとTypeScript",
    goal: "クラスの定義と型注釈を理解する",
    completion: "メソッドを含むクラスを作れる",
    task: "User クラスを作り、名前とログインメソッドを実装",
    phase: 2,
    sampleCode: `// 基本的なクラス定義
class Person {
  // プロパティの型定義
  name: string;
  age: number;
  private email: string; // privateアクセス修飾子

  // コンストラクタ
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  // メソッドの定義
  introduce(): string {
    return \`こんにちは、\${this.name}です。\${this.age}歳です。\`;
  }

  // privateメソッド
  private getEmail(): string {
    return this.email;
  }

  // publicメソッド（privateメソッドを使用）
  getContactInfo(): string {
    return \`連絡先: \${this.getEmail()}\`;
  }
}

// 実際のタスク：Userクラスの実装
class User {
  // プロパティ
  public name: string;
  private isLoggedIn: boolean;
  protected createdAt: Date;

  constructor(name: string) {
    this.name = name;
    this.isLoggedIn = false;
    this.createdAt = new Date();
  }

  // ログインメソッド
  login(): void {
    this.isLoggedIn = true;
    console.log(\`\${this.name}さんがログインしました。\`);
  }

  // ログアウトメソッド
  logout(): void {
    this.isLoggedIn = false;
    console.log(\`\${this.name}さんがログアウトしました。\`);
  }

  // ログイン状態確認
  getLoginStatus(): boolean {
    return this.isLoggedIn;
  }

  // ユーザー情報表示
  getUserInfo(): string {
    const status = this.isLoggedIn ? "ログイン中" : "ログアウト中";
    return \`ユーザー: \${this.name} (\${status})\`;
  }
}

// クラスの使用例
const user = new User("田中太郎");
console.log(user.getUserInfo()); // "ユーザー: 田中太郎 (ログアウト中)"

user.login(); // "田中太郎さんがログインしました。"
console.log(user.getUserInfo()); // "ユーザー: 田中太郎 (ログイン中)"

user.logout(); // "田中太郎さんがログアウトしました。"

// 継承（extends）
class Employee extends Person {
  private department: string;
  private salary: number;

  constructor(name: string, age: number, email: string, department: string, salary: number) {
    super(name, age, email); // 親クラスのコンストラクタ呼び出し
    this.department = department;
    this.salary = salary;
  }

  // メソッドのオーバーライド
  introduce(): string {
    return \`\${super.introduce()} \${this.department}部で働いています。\`;
  }

  // 新しいメソッド
  getWorkInfo(): string {
    return \`部署: \${this.department}, 給与: \${this.salary}円\`;
  }
}

const employee = new Employee("山田花子", 28, "yamada@company.com", "開発", 500000);
console.log(employee.introduce()); // "こんにちは、山田花子です。28歳です。 開発部で働いています。"
console.log(employee.getWorkInfo()); // "部署: 開発, 給与: 500000円"

// 抽象クラス（abstract）
abstract class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  // 具象メソッド
  sleep(): void {
    console.log(\`\${this.name}が眠っています。\`);
  }

  // 抽象メソッド（継承先で必ず実装が必要）
  abstract makeSound(): void;
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  // 抽象メソッドの実装
  makeSound(): void {
    console.log(\`\${this.name}が「ワンワン」と鳴いています。\`);
  }

  // 犬特有のメソッド
  fetch(): void {
    console.log(\`\${this.name}がボールを取ってきました。\`);
  }
}

const dog = new Dog("ポチ");
dog.makeSound(); // "ポチが「ワンワン」と鳴いています。"
dog.sleep(); // "ポチが眠っています。"
dog.fetch(); // "ポチがボールを取ってきました。"

// インターフェースの実装（implements）
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Duck extends Animal implements Flyable, Swimmable {
  constructor(name: string) {
    super(name);
  }

  makeSound(): void {
    console.log(\`\${this.name}が「クワクワ」と鳴いています。\`);
  }

  fly(): void {
    console.log(\`\${this.name}が空を飛んでいます。\`);
  }

  swim(): void {
    console.log(\`\${this.name}が水面を泳いでいます。\`);
  }
}

const duck = new Duck("アヒル");
duck.makeSound(); // "アヒルが「クワクワ」と鳴いています。"
duck.fly(); // "アヒルが空を飛んでいます。"
duck.swim(); // "アヒルが水面を泳いでいます。"

// ゲッター・セッター
class Product {
  private _price: number;
  private _name: string;

  constructor(name: string, price: number) {
    this._name = name;
    this._price = price;
  }

  // ゲッター
  get price(): number {
    return this._price;
  }

  get name(): string {
    return this._name;
  }

  // セッター
  set price(newPrice: number) {
    if (newPrice < 0) {
      throw new Error("価格は0以上である必要があります");
    }
    this._price = newPrice;
  }

  // 割引メソッド
  applyDiscount(percentage: number): void {
    const discountAmount = this._price * (percentage / 100);
    this.price = this._price - discountAmount; // セッターを使用
  }

  getInfo(): string {
    return \`商品: \${this.name}, 価格: \${this.price}円\`;
  }
}

const product = new Product("TypeScript本", 3000);
console.log(product.getInfo()); // "商品: TypeScript本, 価格: 3000円"

product.applyDiscount(10); // 10%割引
console.log(product.getInfo()); // "商品: TypeScript本, 価格: 2700円"

// 静的メソッドとプロパティ
class MathUtils {
  static readonly PI = 3.14159;

  static add(a: number, b: number): number {
    return a + b;
  }

  static calculateCircleArea(radius: number): number {
    return MathUtils.PI * radius * radius;
  }
}

console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.calculateCircleArea(5)); // 78.53975
console.log(MathUtils.PI); // 3.14159

// 実用的な例：ショッピングカート
class ShoppingCart {
  private items: { product: Product; quantity: number }[] = [];

  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.items.find(item => item.product.name === product.name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }

    console.log(\`\${product.name} x \${quantity} をカートに追加しました。\`);
  }

  removeItem(productName: string): void {
    this.items = this.items.filter(item => item.product.name !== productName);
    console.log(\`\${productName} をカートから削除しました。\`);
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  displayCart(): void {
    console.log("=== ショッピングカート ===");
    this.items.forEach(item => {
      const subtotal = item.product.price * item.quantity;
      console.log(\`\${item.product.name} x \${item.quantity} = \${subtotal}円\`);
    });
    console.log(\`合計: \${this.getTotalPrice()}円 (\${this.getItemCount()}点)\`);
  }
}

// ショッピングカートの使用例
const cart = new ShoppingCart();
const book1 = new Product("JavaScript本", 2500);
const book2 = new Product("TypeScript本", 3000);

cart.addItem(book1, 2);
cart.addItem(book2, 1);
cart.displayCart();
// "=== ショッピングカート ==="
// "JavaScript本 x 2 = 5000円"
// "TypeScript本 x 1 = 3000円"
// "合計: 8000円 (3点)"`,
    explanation: "TypeScriptのクラスでは、アクセス修飾子、継承、抽象クラス、インターフェース実装などのOOP機能を型安全に使えます。"
  },
// Phase 3: TypeScript実践応用
  {
    day: 15,
    title: "Generics",
    goal: "ジェネリクスの定義と利用方法を理解する",
    completion: "<T>を使った関数が書ける",
    task: "任意の配列の先頭要素を返すgetFirst<T>()を作成",
    phase: 3,
    sampleCode: `// 基本的なジェネリクス関数
function getFirst<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

// 実際のタスク：任意の配列の先頭要素を返す関数
const numbers = [1, 2, 3, 4, 5];
const firstNumber = getFirst(numbers); // number | undefined型

const fruits = ["apple", "banana", "orange"];
const firstFruit = getFirst(fruits); // string | undefined型

const users = [
  { name: "太郎", age: 30 },
  { name: "花子", age: 25 }
];
const firstUser = getFirst(users); // { name: string; age: number } | undefined型

console.log(firstNumber); // 1
console.log(firstFruit); // "apple"
console.log(firstUser?.name); // "太郎"

// 複数の型パラメータ
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const stringNumberPair = pair("hello", 42); // [string, number]型
const booleanDatePair = pair(true, new Date()); // [boolean, Date]型

console.log(stringNumberPair); // ["hello", 42]
console.log(booleanDatePair[1].getFullYear()); // 現在の年

// ジェネリクス制約（extends）
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(item: T): T {
  console.log(\`Length: \${item.length}\`);
  return item;
}

logLength("Hello World"); // OK: string has length
logLength([1, 2, 3, 4]); // OK: array has length
logLength({ length: 10, value: "test" }); // OK: object has length property
// logLength(42); // エラー: number doesn't have length property

// keyof演算子との組み合わせ
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = {
  name: "田中太郎",
  age: 30,
  email: "tanaka@example.com"
};

const personName = getProperty(person, "name"); // string型
const personAge = getProperty(person, "age"); // number型
// const invalid = getProperty(person, "invalid"); // エラー: プロパティが存在しない

console.log(personName); // "田中太郎"
console.log(personAge); // 30

// ジェネリクスクラス
class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  getAll(): T[] {
    return [...this.items]; // 配列のコピーを返す
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  count(): number {
    return this.items.length;
  }
}

// 数値ストア
const numberStore = new DataStore<number>();
numberStore.add(10);
numberStore.add(20);
numberStore.add(30);

console.log(numberStore.getAll()); // [10, 20, 30]
console.log(numberStore.find(n => n > 15)); // 20

// ユーザーストア
type User = {
  id: number;
  name: string;
  email: string;
};

const userStore = new DataStore<User>();
userStore.add({ id: 1, name: "太郎", email: "taro@example.com" });
userStore.add({ id: 2, name: "花子", email: "hanako@example.com" });

const adminUser = userStore.find(user => user.name === "太郎");
console.log(adminUser); // { id: 1, name: "太郎", email: "taro@example.com" }

// ジェネリクスインターフェース
interface Repository<T> {
  create(item: T): T;
  findById(id: string | number): T | null;
  update(id: string | number, item: Partial<T>): T | null;
  delete(id: string | number): boolean;
  findAll(): T[];
}

// ユーザーリポジトリの実装
class UserRepository implements Repository<User> {
  private users: User[] = [];
  private nextId = 1;

  create(user: Omit<User, 'id'>): User {
    const newUser: User = {
      id: this.nextId++,
      ...user
    };
    this.users.push(newUser);
    return newUser;
  }

  findById(id: number): User | null {
    return this.users.find(user => user.id === id) || null;
  }

  update(id: number, userData: Partial<User>): User | null {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = { ...this.users[userIndex], ...userData };
    return this.users[userIndex];
  }

  delete(id: number): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    return this.users.length < initialLength;
  }

  findAll(): User[] {
    return [...this.users];
  }
}

// リポジトリの使用例
const userRepo = new UserRepository();

const user1 = userRepo.create({
  name: "山田太郎",
  email: "yamada@example.com"
});

const user2 = userRepo.create({
  name: "佐藤花子",
  email: "sato@example.com"
});

console.log("全ユーザー:", userRepo.findAll());

// ユーザー更新
userRepo.update(1, { email: "newemail@example.com" });
console.log("更新後のユーザー1:", userRepo.findById(1));

// 条件付き型の基本
type ApiResponse<T> = T extends string
  ? { message: T }
  : T extends number
  ? { count: T }
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type NumberResponse = ApiResponse<number>; // { count: number }
type ObjectResponse = ApiResponse<User>; // { data: User }

// 実用的なヘルパー関数
function createApiResponse<T>(data: T): ApiResponse<T> {
  if (typeof data === 'string') {
    return { message: data } as ApiResponse<T>;
  } else if (typeof data === 'number') {
    return { count: data } as ApiResponse<T>;
  } else {
    return { data } as ApiResponse<T>;
  }
}

const messageResponse = createApiResponse("Success");
const countResponse = createApiResponse(42);
const userResponse = createApiResponse(user1);

console.log(messageResponse); // { message: "Success" }
console.log(countResponse); // { count: 42 }
console.log(userResponse); // { data: User }`,
    explanation: "ジェネリクスを使うことで、型安全性を保ちながら再利用可能で柔軟なコードを書けます。制約や条件付き型で更に強力な型システムを構築できます。"
  },
  {
    day: 16,
    title: "型ガード",
    goal: "型による分岐（型ガード）を理解する",
    completion: "typeof, in, instanceof を使える",
    task: "型に応じて処理が変わる関数を定義",
    phase: 3,
    sampleCode: `// typeof型ガード
function processValue(value: string | number): string {
  if (typeof value === "string") {
    // この分岐内では value は string型として扱われる
    return value.toUpperCase();
  } else {
    // この分岐内では value は number型として扱われる
    return value.toFixed(2);
  }
}

console.log(processValue("hello")); // "HELLO"
console.log(processValue(123.456)); // "123.46"

// in演算子による型ガード
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function isBird(animal: Bird | Fish): animal is Bird {
  return 'fly' in animal;
}

function moveAnimal(animal: Bird | Fish): void {
  if (isBird(animal)) {
    // この分岐内では animal は Bird型
    animal.fly();
  } else {
    // この分岐内では animal は Fish型
    animal.swim();
  }

  // 共通メソッドはどちらでも使える
  animal.layEggs();
}

// 実際のタスク：型に応じて処理が変わる関数
type StringInput = {
  type: "string";
  value: string;
};

type NumberInput = {
  type: "number";
  value: number;
};

type BooleanInput = {
  type: "boolean";
  value: boolean;
};

type InputData = StringInput | NumberInput | BooleanInput;

function processInput(input: InputData): string {
  switch (input.type) {
    case "string":
      // input.value は string型として扱われる
      return \`文字列: "\${input.value}" (長さ: \${input.value.length})\`;

    case "number":
      // input.value は number型として扱われる
      return \`数値: \${input.value} (2倍: \${input.value * 2})\`;

    case "boolean":
      // input.value は boolean型として扱われる
      return \`真偽値: \${input.value} (逆: \${!input.value})\`;

    default:
      // 型の網羅性チェック
      const _exhaustive: never = input;
      return _exhaustive;
  }
}

// テストデータ
const stringInput: StringInput = { type: "string", value: "TypeScript" };
const numberInput: NumberInput = { type: "number", value: 42 };
const booleanInput: BooleanInput = { type: "boolean", value: true };

console.log(processInput(stringInput)); // "文字列: "TypeScript" (長さ: 10)"
console.log(processInput(numberInput)); // "数値: 42 (2倍: 84)"
console.log(processInput(booleanInput)); // "真偽値: true (逆: false)"

// instanceof型ガード
class Dog {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  bark(): void {
    console.log(\`\${this.name}がワンワンと吠えています。\`);
  }
}

class Cat {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  meow(): void {
    console.log(\`\${this.name}がニャーニャー鳴いています。\`);
  }
}

function petAnimal(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    // animal は Dog型として扱われる
    animal.bark();
  } else {
    // animal は Cat型として扱われる
    animal.meow();
  }
}

const dog = new Dog("ポチ");
const cat = new Cat("タマ");

petAnimal(dog); // "ポチがワンワンと吠えています。"
petAnimal(cat); // "タマがニャーニャー鳴いています。"

// カスタム型ガード関数
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

function isArrayOfStrings(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}

function safeProcess(input: unknown): string {
  if (isString(input)) {
    return \`文字列処理: \${input.toUpperCase()}\`;
  } else if (isNumber(input)) {
    return \`数値処理: \${input * 2}\`;
  } else if (isArrayOfStrings(input)) {
    return \`配列処理: [\${input.join(", ")}]\`;
  } else {
    return "未知の型です";
  }
}

console.log(safeProcess("hello")); // "文字列処理: HELLO"
console.log(safeProcess(42)); // "数値処理: 84"
console.log(safeProcess(["a", "b", "c"])); // "配列処理: [a, b, c]"
console.log(safeProcess({})); // "未知の型です"

// 複雑な型ガードの例：APIレスポンス
interface SuccessResponse {
  success: true;
  data: any;
  message?: string;
}

interface ErrorResponse {
  success: false;
  error: string;
  code: number;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function isSuccessResponse(response: ApiResponse): response is SuccessResponse {
  return response.success === true;
}

function isErrorResponse(response: ApiResponse): response is ErrorResponse {
  return response.success === false;
}

function handleApiResponse(response: ApiResponse): void {
  if (isSuccessResponse(response)) {
    console.log("成功:", response.data);
    if (response.message) {
      console.log("メッセージ:", response.message);
    }
  } else if (isErrorResponse(response)) {
    console.log(\`エラー (\${response.code}): \${response.error}\`);
  }
}

// テスト
const successResponse: ApiResponse = {
  success: true,
  data: { users: ["太郎", "花子"] },
  message: "ユーザー一覧を取得しました"
};

const errorResponse: ApiResponse = {
  success: false,
  error: "ユーザーが見つかりません",
  code: 404
};

handleApiResponse(successResponse); // "成功: { users: ['太郎', '花子'] }" "メッセージ: ユーザー一覧を取得しました"
handleApiResponse(errorResponse); // "エラー (404): ユーザーが見つかりません"

// nullish coalescing と optional chaining
type User = {
  id: number;
  name: string;
  profile?: {
    bio?: string;
    avatar?: string;
  };
};

function getUserBio(user: User | null | undefined): string {
  // optional chaining と nullish coalescing の組み合わせ
  return user?.profile?.bio ?? "プロフィールがありません";
}

const userWithProfile: User = {
  id: 1,
  name: "太郎",
  profile: {
    bio: "TypeScript開発者です",
    avatar: "avatar.png"
  }
};

const userWithoutProfile: User = {
  id: 2,
  name: "花子"
};

console.log(getUserBio(userWithProfile)); // "TypeScript開発者です"
console.log(getUserBio(userWithoutProfile)); // "プロフィールがありません"
console.log(getUserBio(null)); // "プロフィールがありません"

// 型の絞り込みを使った実用的な例
function formatUserDisplay(user: User): string {
  const bio = getUserBio(user);
  const avatar = user.profile?.avatar;

  if (avatar) {
    return \`\${user.name} [画像: \${avatar}] - \${bio}\`;
  } else {
    return \`\${user.name} - \${bio}\`;
  }
}

console.log(formatUserDisplay(userWithProfile));
// "太郎 [画像: avatar.png] - TypeScript開発者です"
console.log(formatUserDisplay(userWithoutProfile));
// "花子 - プロフィールがありません"`,
    explanation: "型ガードを使って実行時に型を安全に判定し、TypeScriptの型システムが正しい型を推論できるようにします。typeof、in、instanceof、カスタム型ガードを適切に使い分けることが重要です。"
  },
{
    day: 17,
    title: "Promiseと非同期処理",
    goal: "非同期関数に型を付ける方法を理解する",
    completion: "Promise<T>を返す関数が書ける",
    task: "APIから取得したデータの型を定義して取得関数を実装",
    phase: 3,
    sampleCode: `// 基本的なPromise型定義
// Promise<T>は非同期処理の結果の型を表す
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// 数値を返すPromise
function asyncNumber(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(42), 1000);
  });
}

// 文字列を返すPromise
function asyncString(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Hello TypeScript"), 500);
  });
}

// 実際のタスク：APIデータ型定義と取得関数
// 1. APIレスポンスの型定義
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// 2. ユーザーAPI取得関数
async function fetchUser(userId: number): Promise<ApiResponse<User>> {
  try {
    // 実際のAPI呼び出しをシミュレート
    await delay(1000);

    if (userId > 0) {
      const user: User = {
        id: userId,
        name: \`ユーザー\${userId}\`,
        email: \`user\${userId}@example.com\`,
        createdAt: new Date().toISOString()
      };

      return {
        success: true,
        data: user,
        message: "ユーザー情報を取得しました"
      };
    } else {
      return {
        success: false,
        data: {} as User,
        error: "無効なユーザーIDです"
      };
    }
  } catch (error) {
    return {
      success: false,
      data: {} as User,
      error: "API呼び出しに失敗しました"
    };
  }
}

// 3. ユーザーリスト取得関数
async function fetchUsers(): Promise<ApiResponse<User[]>> {
  try {
    await delay(1500);

    const users: User[] = [
      { id: 1, name: "田中太郎", email: "tanaka@example.com", createdAt: "2024-01-01T00:00:00Z" },
      { id: 2, name: "山田花子", email: "yamada@example.com", createdAt: "2024-01-02T00:00:00Z" },
      { id: 3, name: "佐藤次郎", email: "sato@example.com", createdAt: "2024-01-03T00:00:00Z" }
    ];

    return {
      success: true,
      data: users,
      message: \`\${users.length}人のユーザーを取得しました\`
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: "ユーザー一覧の取得に失敗しました"
    };
  }
}

// async/awaitの使用例
async function displayUserInfo(): Promise<void> {
  console.log("ユーザー情報を取得中...");

  const response = await fetchUser(1);

  if (response.success) {
    const user = response.data;
    console.log(\`ID: \${user.id}\`);
    console.log(\`名前: \${user.name}\`);
    console.log(\`メール: \${user.email}\`);
    console.log(\`作成日: \${user.createdAt}\`);
  } else {
    console.error("エラー:", response.error);
  }
}

// Promise.all()の型安全な使用
async function fetchMultipleData(): Promise<void> {
  try {
    console.log("複数のデータを並行取得中...");

    const [userResponse, usersResponse, delayResult] = await Promise.all([
      fetchUser(1),
      fetchUsers(),
      asyncNumber()
    ]);

    console.log("ユーザー:", userResponse.data.name);
    console.log("ユーザー数:", usersResponse.data.length);
    console.log("非同期番号:", delayResult);
  } catch (error) {
    console.error("並行処理でエラーが発生しました:", error);
  }
}

// エラーハンドリングとカスタムエラー型
class ApiError extends Error {
  constructor(
    public code: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchUserWithErrorHandling(userId: number): Promise<User> {
  if (userId <= 0) {
    throw new ApiError(400, "無効なユーザーIDです", { userId });
  }

  try {
    const response = await fetchUser(userId);

    if (!response.success) {
      throw new ApiError(404, response.error || "ユーザーが見つかりません");
    }

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // カスタムエラーはそのまま再スロー
    }
    throw new ApiError(500, "予期しないエラーが発生しました", error);
  }
}

// ジェネリクスとPromiseの組み合わせ
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to Live (milliseconds)
}

class AsyncCache<T> {
  private cache = new Map<string, CacheEntry<T>>();

  async get(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 60000 // デフォルト1分
  ): Promise<T> {
    const cached = this.cache.get(key);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < cached.ttl) {
      console.log(\`キャッシュヒット: \${key}\`);
      return cached.data;
    }

    console.log(\`データ取得: \${key}\`);
    const data = await fetcher();

    this.cache.set(key, {
      data,
      timestamp: now,
      ttl
    });

    return data;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }
}

// キャッシュの使用例
const userCache = new AsyncCache<User>();

async function getCachedUser(userId: number): Promise<User> {
  return userCache.get(
    \`user_\${userId}\`,
    () => fetchUserWithErrorHandling(userId),
    30000 // 30秒キャッシュ
  );
}

// Promise型の高度な使用例
type DataLoader<T> = {
  load(): Promise<T>;
  isLoading(): boolean;
  reset(): void;
};

function createDataLoader<T>(fetcher: () => Promise<T>): DataLoader<T> {
  let loading = false;
  let promise: Promise<T> | null = null;

  return {
    async load(): Promise<T> {
      if (promise) {
        return promise;
      }

      loading = true;
      promise = fetcher().finally(() => {
        loading = false;
      });

      return promise;
    },

    isLoading(): boolean {
      return loading;
    },

    reset(): void {
      loading = false;
      promise = null;
    }
  };
}

// データローダーの使用例
const userLoader = createDataLoader(() => fetchUsers());

async function useDataLoader(): Promise<void> {
  console.log("ローディング状態:", userLoader.isLoading()); // false

  const users1 = await userLoader.load(); // 実際のAPI呼び出し
  console.log("最初の呼び出し:", users1.data.length);

  const users2 = await userLoader.load(); // キャッシュされた結果
  console.log("2回目の呼び出し:", users2.data.length);

  userLoader.reset(); // キャッシュをクリア
}

// 実際の使用例
async function runExamples(): Promise<void> {
  try {
    // 基本的な使用例
    await displayUserInfo();

    // 並行処理
    await fetchMultipleData();

    // エラーハンドリング
    try {
      const user = await fetchUserWithErrorHandling(-1);
      console.log(user);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(\`API エラー (\${error.code}): \${error.message}\`);
      }
    }

    // キャッシュ使用例
    const cachedUser1 = await getCachedUser(1); // API呼び出し
    const cachedUser2 = await getCachedUser(1); // キャッシュヒット

    // データローダー使用例
    await useDataLoader();

  } catch (error) {
    console.error("予期しないエラー:", error);
  }
}

// 型安全なPromise型定義の例
type AsyncResult<T, E = Error> = Promise<
  | { success: true; data: T }
  | { success: false; error: E }
>;

async function safeAsyncOperation<T>(
  operation: () => Promise<T>
): AsyncResult<T, string> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
}

// 使用例
async function safeFetchExample(): Promise<void> {
  const result = await safeAsyncOperation(() => fetchUserWithErrorHandling(1));

  if (result.success) {
    console.log("ユーザー:", result.data.name);
  } else {
    console.error("エラー:", result.error);
  }
}

console.log("非同期処理の例を実行中...");
// runExamples(); // 実際に実行する場合はコメントアウトを外す`,
    explanation: "TypeScriptでPromiseを使う際は、Promise<T>で非同期処理の結果型を明確にします。async/awaitと組み合わせることで、型安全な非同期プログラミングが可能になります。"
  },
  {
    day: 18,
    title: "Utility Types",
    goal: "Partial, Pick, Record の使い方を理解",
    completion: "Utility Typesを使って型を柔軟に変更できる",
    task: "User から一部のプロパティだけを抽出して使う",
    phase: 3,
    sampleCode: `// ベースとなる型定義
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  address: {
    prefecture: string;
    city: string;
    zipCode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// 1. Partial<T> - 全てのプロパティをオプショナルにする
type PartialUser = Partial<User>;
// 結果: { id?: number; name?: string; email?: string; ... }

function updateUser(id: number, updates: Partial<User>): User {
  // 既存のユーザーデータ（簡略化）
  const existingUser: User = {
    id: 1,
    name: "田中太郎",
    email: "tanaka@example.com",
    age: 30,
    address: { prefecture: "東京都", city: "渋谷区", zipCode: "150-0001" },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date()
  };

  // 部分的な更新
  return { ...existingUser, ...updates, updatedAt: new Date() };
}

// 使用例
const updatedUser = updateUser(1, {
  name: "田中花子",
  age: 31
}); // emailやaddressは変更しない

console.log(updatedUser.name); // "田中花子"
console.log(updatedUser.age); // 31

// 2. Pick<T, K> - 指定したプロパティのみを抽出
type UserSummary = Pick<User, 'id' | 'name' | 'email'>;
// 結果: { id: number; name: string; email: string; }

// 実際のタスク：一部プロパティを抽出
type UserProfile = Pick<User, 'name' | 'email' | 'age'>;

function createUserProfile(user: User): UserProfile {
  return {
    name: user.name,
    email: user.email,
    age: user.age
  };
}

function displayUserProfile(profile: UserProfile): void {
  console.log(\`名前: \${profile.name}\`);
  console.log(\`メール: \${profile.email}\`);
  console.log(\`年齢: \${profile.age}歳\`);
}

const user: User = {
  id: 1,
  name: "山田太郎",
  email: "yamada@example.com",
  age: 28,
  address: { prefecture: "大阪府", city: "大阪市", zipCode: "530-0001" },
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date()
};

const profile = createUserProfile(user);
displayUserProfile(profile);

// 3. Omit<T, K> - 指定したプロパティを除外
type UserWithoutTimestamps = Omit<User, 'createdAt' | 'updatedAt'>;
// 結果: id, name, email, age, address のみ

type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

function createUser(userData: CreateUserRequest): User {
  return {
    id: Math.floor(Math.random() * 1000) + 1,
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

const newUserData: CreateUserRequest = {
  name: "佐藤花子",
  email: "sato@example.com",
  age: 25,
  address: { prefecture: "愛知県", city: "名古屋市", zipCode: "460-0001" }
};

const newUser = createUser(newUserData);
console.log(\`新規ユーザー: \${newUser.name} (ID: \${newUser.id})\`);

// 4. Record<K, T> - キーと値の型を指定してオブジェクト型を作成
type UserRole = 'admin' | 'user' | 'guest';
type RolePermissions = Record<UserRole, string[]>;

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete', 'manage'],
  user: ['read', 'write'],
  guest: ['read']
};

function checkPermission(role: UserRole, action: string): boolean {
  return permissions[role].includes(action);
}

console.log(checkPermission('admin', 'delete')); // true
console.log(checkPermission('user', 'delete')); // false

// 5. Required<T> - 全てのプロパティを必須にする
interface OptionalConfig {
  host?: string;
  port?: number;
  database?: string;
  ssl?: boolean;
}

type RequiredConfig = Required<OptionalConfig>;
// 結果: { host: string; port: number; database: string; ssl: boolean; }

function validateConfig(config: RequiredConfig): boolean {
  return config.host.length > 0 &&
         config.port > 0 &&
         config.database.length > 0;
}

// 6. Readonly<T> - 全てのプロパティを読み取り専用にする
type ReadonlyUser = Readonly<User>;

const readonlyUser: ReadonlyUser = user;
// readonlyUser.name = "変更不可"; // エラー！

// 7. ReturnType<T> - 関数の戻り値の型を抽出
function getUsers(): User[] {
  return [user];
}

type GetUsersReturnType = ReturnType<typeof getUsers>;
// 結果: User[]

// 8. Parameters<T> - 関数のパラメータの型をタプルとして抽出
function createUserProfile2(name: string, email: string, age: number): UserProfile {
  return { name, email, age };
}

type CreateUserProfileParams = Parameters<typeof createUserProfile2>;
// 結果: [string, string, number]

// 9. NonNullable<T> - nullとundefinedを除外
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;
// 結果: string

// 10. Extract<T, U> - Tの中からUに代入可能な型を抽出
type StatusCode = 200 | 400 | 404 | 500;
type SuccessCode = Extract<StatusCode, 200>;
// 結果: 200

type ErrorCode = Extract<StatusCode, 400 | 404 | 500>;
// 結果: 400 | 404 | 500

// 11. Exclude<T, U> - Tの中からUに代入可能な型を除外
type NonErrorCode = Exclude<StatusCode, 400 | 404 | 500>;
// 結果: 200

// 実用的な組み合わせ例
interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  requiresAuth: boolean;
  params?: Record<string, string>;
  body?: any;
}

// POST/PUTエンドポイントのみ抽出
type MutationEndpoint = Pick<ApiEndpoint, 'path' | 'body'> & {
  method: Extract<ApiEndpoint['method'], 'POST' | 'PUT'>;
};

// 認証不要なエンドポイント
type PublicEndpoint = Omit<ApiEndpoint, 'requiresAuth'> & {
  requiresAuth: false;
};

// エンドポイント設定
const endpoints: Record<string, ApiEndpoint> = {
  getUsers: {
    path: '/api/users',
    method: 'GET',
    requiresAuth: true
  },
  createUser: {
    path: '/api/users',
    method: 'POST',
    requiresAuth: true,
    body: {} as CreateUserRequest
  },
  getPublicInfo: {
    path: '/api/public/info',
    method: 'GET',
    requiresAuth: false
  }
};

// 複雑なUtility Types組み合わせ
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepPartialUser = DeepPartial<User>;
// addressの中身も全てオプショナルになる

const partialUserWithAddress: DeepPartialUser = {
  name: "一部更新ユーザー",
  address: {
    city: "新宿区" // prefecture や zipCode は省略可能
  }
};

// 型安全なオブジェクト操作関数
function pickFields<T, K extends keyof T>(obj: T, fields: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const field of fields) {
    result[field] = obj[field];
  }

  return result;
}

// 使用例
const pickedData = pickFields(user, ['name', 'email', 'age']);
console.log(pickedData); // { name: "山田太郎", email: "yamada@example.com", age: 28 }

// 型の変換関数
function mapUser<T>(user: User, mapper: (user: User) => T): T {
  return mapper(user);
}

const userDto = mapUser(user, (u) => ({
  displayName: u.name,
  contactEmail: u.email,
  years: u.age
}));

console.log(userDto); // { displayName: "山田太郎", contactEmail: "yamada@example.com", years: 28 }`,
    explanation: "Utility Typesを使うことで、既存の型から新しい型を効率的に作成できます。Partial、Pick、Omit、Recordなどを適切に使い分けることで、型の再利用性と保守性が向上します。"
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
    sampleCode: `// JavaScript（型なし）の例
let userName = "田中太郎";
let userAge = 30;
let isLoggedIn = true;

// 実行時エラーが起こりやすい例
userName = 123; // 文字列のつもりが数値に
userAge = "不明"; // 数値のつもりが文字列に
console.log(userName.toUpperCase()); // エラー！数値にはtoUpperCaseメソッドはない

// TypeScript（型あり）の例
let userName: string = "田中太郎";
let userAge: number = 30;
let isLoggedIn: boolean = true;

// コンパイル時エラーで事前に防げる
// userName = 123; // ⛔ エラー: Type 'number' is not assignable to type 'string'
// userAge = "不明"; // ⛔ エラー: Type 'string' is not assignable to type 'number'

// TypeScriptの利点デモ
interface User {
  name: string;
  age: number;
  email: string;
}

function createUser(name: string, age: number, email: string): User {
  return {
    name,
    age,
    email
  };
}

// 型安全な関数呼び出し
const user = createUser("田中太郎", 30, "tanaka@example.com");
console.log(\`ユーザー: \${user.name}（\${user.age}歳）\`);

// createUser("田中太郎", "30", "tanaka@example.com"); // ⛔ エラー: 年齢は数値である必要があります

// 型推論の例
const autoTypedName = "佐藤花子"; // TypeScriptが自動的にstring型と推論
const autoTypedAge = 25; // TypeScriptが自動的にnumber型と推論

// 実際のタスク：型あり/なし変数の比較
console.log("=== JavaScript vs TypeScript 比較 ===");

// JavaScript風（型注釈なし、でもTypeScriptでは型推論される）
let jsStyleName = "JavaScript太郎";
let jsStyleAge = 30;

// TypeScript風（明示的な型注釈）
let tsStyleName: string = "TypeScript花子";
let tsStyleAge: number = 25;

console.log(\`JS風: \${jsStyleName}（\${jsStyleAge}歳）\`);
console.log(\`TS風: \${tsStyleName}（\${tsStyleAge}歳）\`);

// TypeScriptの型チェックの強力さを示す例
function calculateTax(price: number, rate: number): number {
  return price * (1 + rate);
}

const price = 1000;
const taxRate = 0.1;
const totalPrice = calculateTax(price, taxRate);
console.log(\`税込価格: \${totalPrice}円\`);

// calculateTax("1000", "0.1"); // ⛔ エラー: 文字列は受け取れません`,
    explanation: "TypeScriptは型システムによって、実行前にエラーを発見でき、コードの安全性と保守性が大幅に向上します。"
  },
  {
    day: 9,
    title: "基本の型",
    goal: "number, string, boolean を使いこなす",
    completion: "それぞれの変数が定義・使用できる",
    task: "氏名、年齢、ログイン中かどうかのフラグを定義",
    phase: 2,
    sampleCode: `// TypeScriptの基本型：number, string, boolean

// string型（文字列）
let userName: string = "田中太郎";
let userEmail: string = "tanaka@example.com";
let message: string = \`こんにちは、\${userName}さん！\`;

console.log("=== string型の例 ===");
console.log(\`名前: \${userName}\`);
console.log(\`メール: \${userEmail}\`);
console.log(message);

// number型（数値）
let userAge: number = 30;
let height: number = 175.5;
let score: number = 85;
let temperature: number = -5;

console.log("\\n=== number型の例 ===");
console.log(\`年齢: \${userAge}歳\`);
console.log(\`身長: \${height}cm\`);
console.log(\`スコア: \${score}点\`);
console.log(\`気温: \${temperature}℃\`);

// boolean型（真偽値）
let isLoggedIn: boolean = true;
let isAdult: boolean = userAge >= 18;
let hasPermission: boolean = false;

console.log("\\n=== boolean型の例 ===");
console.log(\`ログイン中: \${isLoggedIn}\`);
console.log(\`成人: \${isAdult}\`);
console.log(\`権限あり: \${hasPermission}\`);

// 実際のタスク：氏名、年齢、ログイン中かどうかのフラグを定義
console.log("\\n=== 課題：ユーザー情報の定義 ===");

// 課題の変数定義
let fullName: string = "佐藤花子";
let currentAge: number = 28;
let isCurrentlyLoggedIn: boolean = true;

// 定義した変数の使用例
console.log(\`氏名: \${fullName}\`);
console.log(\`年齢: \${currentAge}歳\`);
console.log(\`ログイン状態: \${isCurrentlyLoggedIn ? 'ログイン中' : 'ログアウト中'}\`);

// 型安全な関数の例
function displayUserInfo(name: string, age: number, loggedIn: boolean): string {
  const status = loggedIn ? "オンライン" : "オフライン";
  return \`\${name}（\${age}歳）- \${status}\`;
}

const userInfo = displayUserInfo(fullName, currentAge, isCurrentlyLoggedIn);
console.log(\`ユーザー情報: \${userInfo}\`);

// 基本型の型チェック例
function isValidAge(age: number): boolean {
  return age >= 0 && age <= 150;
}

function formatName(name: string): string {
  return name.trim().toLowerCase().replace(/\\b\\w/g, l => l.toUpperCase());
}

function toggleLoginStatus(currentStatus: boolean): boolean {
  return !currentStatus;
}

console.log("\\n=== 型安全な関数の使用例 ===");
console.log(\`年齢が有効: \${isValidAge(currentAge)}\`);
console.log(\`整形された名前: \${formatName("  tanaka taro  ")}\`);
console.log(\`ログイン状態切り替え後: \${toggleLoginStatus(isCurrentlyLoggedIn)}\`);

// 複数の基本型を組み合わせた例
interface UserProfile {
  name: string;
  age: number;
  isActive: boolean;
}

const profile: UserProfile = {
  name: fullName,
  age: currentAge,
  isActive: isCurrentlyLoggedIn
};

console.log("\\n=== ユーザープロフィール ===");
console.log(profile);

// リテラル型との組み合わせ例
let status: "online" | "offline" | "away" = "online";
let priority: 1 | 2 | 3 | 4 | 5 = 3;

console.log(\`ステータス: \${status}\`);
console.log(\`優先度: \${priority}\`);`,
    explanation: "TypeScriptの基本型は、JavaScriptの値に対応しており、型注釈により変数の型を明示的に指定できます。"
  },
  {
    day: 10,
    title: "配列とオブジェクトの型",
    goal: "型付き配列とオブジェクトが作れる",
    completion: "User[] 型を定義し使える",
    task: "ユーザーリストを作成し、出力",
    phase: 2,
    sampleCode: `// 配列の型定義

// 基本的な配列の型定義
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["田中", "佐藤", "鈴木"];
let flags: boolean[] = [true, false, true];

// ジェネリクス記法でも書ける
let scores: Array<number> = [85, 92, 78, 96];
let colors: Array<string> = ["red", "blue", "green"];

console.log("=== 基本的な配列 ===");
console.log("数値配列:", numbers);
console.log("名前配列:", names);
console.log("スコア配列:", scores);

// オブジェクトの型定義
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

// 単一のオブジェクト
const user: User = {
  id: 1,
  name: "田中太郎",
  email: "tanaka@example.com",
  age: 30,
  isActive: true
};

console.log("\\n=== 単一ユーザー ===");
console.log(user);

// 実際のタスク：User[] 型を定義し使用
const users: User[] = [
  {
    id: 1,
    name: "田中太郎",
    email: "tanaka@example.com",
    age: 30,
    isActive: true
  },
  {
    id: 2,
    name: "佐藤花子",
    email: "sato@example.com",
    age: 25,
    isActive: false
  },
  {
    id: 3,
    name: "鈴木一郎",
    email: "suzuki@example.com",
    age: 35,
    isActive: true
  }
];

console.log("\\n=== ユーザーリスト ===");
users.forEach(user => {
  const status = user.isActive ? "アクティブ" : "非アクティブ";
  console.log(\`[ID: \${user.id}] \${user.name} (\${user.age}歳) - \${status}\`);
});

// 配列操作の型安全な例
function getActiveUsers(userList: User[]): User[] {
  return userList.filter(user => user.isActive);
}

function getUserNames(userList: User[]): string[] {
  return userList.map(user => user.name);
}

function getAverageAge(userList: User[]): number {
  const totalAge = userList.reduce((sum, user) => sum + user.age, 0);
  return Math.round(totalAge / userList.length);
}

const activeUsers = getActiveUsers(users);
const userNames = getUserNames(users);
const averageAge = getAverageAge(users);

console.log("\\n=== 配列操作の結果 ===");
console.log(\`アクティブユーザー数: \${activeUsers.length}人\`);
console.log(\`全ユーザー名: \${userNames.join(", ")}\`);
console.log(\`平均年齢: \${averageAge}歳\`);

// ネストしたオブジェクトの型定義
interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface UserWithAddress {
  id: number;
  name: string;
  email: string;
  age: number;
  address: Address;
  hobbies: string[];
}

const userWithAddress: UserWithAddress = {
  id: 4,
  name: "山田太郎",
  email: "yamada@example.com",
  age: 28,
  address: {
    street: "1-2-3 東京街",
    city: "東京",
    zipCode: "100-0001"
  },
  hobbies: ["読書", "映画鑑賞", "料理"]
};

console.log("\\n=== 詳細ユーザー情報 ===");
console.log(\`名前: \${userWithAddress.name}\`);
console.log(\`住所: \${userWithAddress.address.city}\${userWithAddress.address.street}\`);
console.log(\`趣味: \${userWithAddress.hobbies.join(", ")}\`);

// 複雑な配列操作の例
const usersWithAddress: UserWithAddress[] = [userWithAddress];

function searchUsersByCity(userList: UserWithAddress[], cityName: string): UserWithAddress[] {
  return userList.filter(user => user.address.city === cityName);
}

function getUsersWithHobby(userList: UserWithAddress[], hobby: string): UserWithAddress[] {
  return userList.filter(user => user.hobbies.includes(hobby));
}

const tokyoUsers = searchUsersByCity(usersWithAddress, "東京");
const readingUsers = getUsersWithHobby(usersWithAddress, "読書");

console.log("\\n=== 検索結果 ===");
console.log(\`東京在住ユーザー: \${tokyoUsers.length}人\`);
console.log(\`読書好きユーザー: \${readingUsers.length}人\`);

// 型安全な配列の初期化
const emptyUsers: User[] = [];
const initialUsers: User[] = [];

// push操作も型安全
emptyUsers.push({
  id: 5,
  name: "新規ユーザー",
  email: "new@example.com",
  age: 22,
  isActive: true
});

console.log("\\n=== 追加後のユーザー ===");
console.log(emptyUsers);`,
    explanation: "TypeScriptでは配列やオブジェクトにも型を定義でき、複雑なデータ構造でも型安全性を保つことができます。"
  },

  // Phase 3: TypeScript実践応用
  {
    day: 19,
    title: "API設計",
    goal: "フロントエンドの型安全なAPI呼び出しを設計する",
    completion: "fetchの戻り値に型を定義できる",
    task: "データ取得関数とレスポンス型を分けて記述",
    phase: 3,
    sampleCode: `// API エンドポイントの型定義
interface ApiEndpoint {
  readonly baseUrl: string;
  readonly endpoints: {
    readonly users: '/api/users';
    readonly userById: '/api/users/{id}';
    readonly posts: '/api/posts';
    readonly postById: '/api/posts/{id}';
    readonly auth: '/api/auth/login';
  };
}

const API: ApiEndpoint = {
  baseUrl: 'https://api.example.com',
  endpoints: {
    users: '/api/users',
    userById: '/api/users/{id}',
    posts: '/api/posts',
    postById: '/api/posts/{id}',
    auth: '/api/auth/login'
  }
} as const;

// 共通のAPIレスポンス型
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

// エラーレスポンス型
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// ユーザー関連の型定義
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar?: string;
}

  // 汎用的なHTTPクライアントクラス
class HttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // 認証トークンを設定
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = \`Bearer \${token}\`;
  }

  // 認証トークンを削除
  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  // 汎用リクエストメソッド
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = \`\${this.baseUrl}\${endpoint}\`;

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${data.message || 'Unknown error'}\`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // GET リクエスト
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST リクエスト
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// API サービスクラス
class ApiService {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient(API.baseUrl);
  }

  // 実際のタスク：データ取得関数とレスポンス型の分離

  // ユーザー関連API
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.http.get<User[]>(API.endpoints.users);
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    const endpoint = API.endpoints.userById.replace('{id}', id.toString());
    return this.http.get<User>(endpoint);
  }

  async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.http.post<User>(API.endpoints.users, userData);
  }
}

// エラーハンドリング付きのAPIラッパー
class SafeApiService {
  private api: ApiService;

  constructor() {
    this.api = new ApiService();
  }

  // 安全なAPI呼び出しラッパー
  private async safeCall<T>(
    apiCall: () => Promise<ApiResponse<T>>
  ): Promise<{ data: T | null; error: string | null }> {
    try {
      const response = await apiCall();

      if (response.success) {
        return { data: response.data, error: null };
      } else {
        return { data: null, error: response.error || 'Unknown API error' };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { data: null, error: errorMessage };
    }
  }

  // 型安全なユーザー取得
  async fetchUsers(): Promise<{ data: User[] | null; error: string | null }> {
    return this.safeCall(() => this.api.getUsers());
  }

  async fetchUserById(id: number): Promise<{ data: User | null; error: string | null }> {
    return this.safeCall(() => this.api.getUserById(id));
  }
}

// 実際の使用例
async function demonstrateApiUsage(): Promise<void> {
  const safeApi = new SafeApiService();

  // ユーザー一覧取得
  console.log("=== ユーザー一覧取得 ===");
  const usersResult = await safeApi.fetchUsers();

  if (usersResult.data) {
    console.log(\`\${usersResult.data.length}人のユーザーを取得しました\`);
    usersResult.data.forEach(user => {
      console.log(\`- \${user.name} (\${user.email})\`);
    });
  } else {
    console.error(\`ユーザー取得失敗: \${usersResult.error}\`);
  }
}

// 型ガードを使った安全なAPI レスポンス処理
function isUser(data: any): data is User {
  return data &&
         typeof data.id === 'number' &&
         typeof data.name === 'string' &&
         typeof data.email === 'string';
}

`,
    explanation: "型安全なAPI設計では、エンドポイント、リクエスト、レスポンスの型を明確に定義し、エラーハンドリングも含めた包括的な設計が重要です。"
  },
  {
    day: 20,
    title: "総仕上げミニプロジェクト",
    goal: "TypeScriptの型システム全般を応用できる",
    completion: "型安全なフォームアプリを実装できる",
    task: "名前と年齢を入力して出力するTypeScript製アプリ（Playground上）",
    phase: 3,
    sampleCode: `// 総仕上げプロジェクト: TypeScript製ユーザー管理システム
// これまで学んだすべての機能を統合した実践的なアプリケーション

// 1. 基本的な型定義
interface User {
  readonly id: number;
  name: string;
  age: number;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

type UserRole = 'admin' | 'user' | 'guest';
type SortField = 'name' | 'age' | 'createdAt';
type SortOrder = 'asc' | 'desc';

// 2. フォーム用の型定義
interface UserFormData {
  name: string;
  age: string; // フォームでは文字列として受け取る
  email: string;
  role: UserRole;
}

interface ValidationError {
  field: keyof UserFormData;
  message: string;
}

interface FormState {
  data: UserFormData;
  errors: ValidationError[];
  isSubmitting: boolean;
  isValid: boolean;
}

// 3. バリデーション関数（型ガードを活用）
class UserValidator {
  static validateName(name: string): string | null {
    if (!name.trim()) return '名前は必須です';
    if (name.length < 2) return '名前は2文字以上で入力してください';
    if (name.length > 50) return '名前は50文字以内で入力してください';
    return null;
  }

  static validateAge(ageStr: string): string | null {
    const age = parseInt(ageStr, 10);
    if (isNaN(age)) return '年齢は数値で入力してください';
    if (age < 0) return '年齢は0以上で入力してください';
    if (age > 150) return '年齢は150以下で入力してください';
    return null;
  }

  static validateEmail(email: string): string | null {
    if (!email.trim()) return 'メールアドレスは必須です';
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) return '正しいメールアドレスを入力してください';
    return null;
  }

  static validateRole(role: string): role is UserRole {
    return ['admin', 'user', 'guest'].includes(role);
  }

  static validateForm(formData: UserFormData): ValidationError[] {
    const errors: ValidationError[] = [];

    const nameError = this.validateName(formData.name);
    if (nameError) errors.push({ field: 'name', message: nameError });

    const ageError = this.validateAge(formData.age);
    if (ageError) errors.push({ field: 'age', message: ageError });

    const emailError = this.validateEmail(formData.email);
    if (emailError) errors.push({ field: 'email', message: emailError });

    if (!this.validateRole(formData.role)) {
      errors.push({ field: 'role', message: '無効なロールです' });
    }

    return errors;
  }
}

// 4. ユーザー管理クラス（ジェネリクス、Utility Types活用）
class UserManager {
  private users: User[] = [];
  private nextId = 1;

  // 新規ユーザー作成
  createUser(formData: UserFormData): Promise<User> {
    return new Promise((resolve, reject) => {
      const errors = UserValidator.validateForm(formData);

      if (errors.length > 0) {
        reject(new Error(\`バリデーションエラー: \${errors.map(e => e.message).join(', ')}\`));
        return;
      }

      // メールアドレスの重複チェック
      if (this.users.some(user => user.email === formData.email)) {
        reject(new Error('このメールアドレスは既に使用されています'));
        return;
      }

      const user: User = {
        id: this.nextId++,
        name: formData.name,
        age: parseInt(formData.age, 10),
        email: formData.email,
        role: formData.role,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.users.push(user);
      resolve(user);
    });
  }

  // ユーザー更新（Partial型活用）
  updateUser(id: number, updates: Partial<Omit<User, 'id' | 'createdAt'>>): User | null {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date()
    };

    return this.users[userIndex];
  }

  // ユーザー検索（高階関数活用）
  findUsers(predicate: (user: User) => boolean): User[] {
    return this.users.filter(predicate);
  }

  // ソート機能（Union型活用）
  getSortedUsers(field: SortField, order: SortOrder = 'asc'): User[] {
    return [...this.users].sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (field) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'age':
          valueA = a.age;
          valueB = b.age;
          break;
        case 'createdAt':
          valueA = a.createdAt.getTime();
          valueB = b.createdAt.getTime();
          break;
      }

      if (order === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
  }

  // 統計情報取得（Record型活用）
  getStatistics(): Record<string, number> {
    const roleCount = this.users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<UserRole, number>);

    const avgAge = this.users.length > 0
      ? this.users.reduce((sum, user) => sum + user.age, 0) / this.users.length
      : 0;

    return {
      total: this.users.length,
      averageAge: Math.round(avgAge * 100) / 100,
      ...roleCount
    };
  }

  // 全ユーザー取得
  getAllUsers(): User[] {
    return [...this.users];
  }

  // ID でユーザー取得
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}

// 5. アプリケーションメインクラス（全機能統合）
class UserManagementApp {
  private userManager: UserManager;

  constructor() {
    this.userManager = new UserManager();
    this.init();
  }

  private init(): void {
    console.log('TypeScript ユーザー管理アプリケーションを初期化しました');
  }

  // 実際のタスク：名前と年齢を入力して出力するアプリ
  async createUserFromInput(name: string, age: string, email: string): Promise<void> {
    try {
      // フォームデータを作成
      const formData: UserFormData = {
        name,
        age,
        email,
        role: 'user'
      };

      // ユーザー作成
      const newUser = await this.userManager.createUser(formData);

      console.log('\\n=== ユーザー作成成功 ===');
      console.log(\`ID: \${newUser.id}\`);
      console.log(\`名前: \${newUser.name}\`);
      console.log(\`年齢: \${newUser.age}歳\`);
      console.log(\`メール: \${newUser.email}\`);
      console.log(\`ロール: \${newUser.role}\`);
      console.log(\`作成日時: \${newUser.createdAt.toLocaleString()}\`);

      // 統計情報も表示
      this.displayStatistics();

    } catch (error) {
      console.error('\\n=== ユーザー作成失敗 ===');
      console.error(error instanceof Error ? error.message : 'unknown error');
    }
  }

  // 統計情報表示
  displayStatistics(): void {
    const stats = this.userManager.getStatistics();
    console.log('\\n=== 統計情報 ===');
    console.log(\`総ユーザー数: \${stats.total}人\`);
    console.log(\`平均年齢: \${stats.averageAge}歳\`);
    console.log(\`管理者: \${stats.admin || 0}人\`);
    console.log(\`一般ユーザー: \${stats.user || 0}人\`);
    console.log(\`ゲスト: \${stats.guest || 0}人\`);
  }

  // 全ユーザー表示
  displayAllUsers(): void {
    const users = this.userManager.getAllUsers();
    console.log('\\n=== 全ユーザー一覧 ===');

    if (users.length === 0) {
      console.log('ユーザーが登録されていません');
      return;
    }

    users.forEach(user => {
      console.log(\`[ID: \${user.id}] \${user.name} (\${user.age}歳) - \${user.email} [\${user.role}]\`);
    });
  }

  // ユーザー検索デモ
  searchUsersDemo(): void {
    console.log('\\n=== ユーザー検索デモ ===');

    // 20歳以上のユーザー
    const adults = this.userManager.findUsers(user => user.age >= 20);
    console.log(\`20歳以上のユーザー: \${adults.length}人\`);

    // 年齢でソート
    const sortedByAge = this.userManager.getSortedUsers('age', 'desc');
    console.log('年齢降順:', sortedByAge.map(u => \`\${u.name}(\${u.age}歳)\`).join(', '));
  }

  // パブリックAPI
  getUserManager(): UserManager {
    return this.userManager;
  }
}

// 6. アプリケーション実行例
console.log('TypeScript総仕上げプロジェクト - ユーザー管理システム');
console.log('='.repeat(50));

// アプリケーション初期化
const app = new UserManagementApp();

// 実際のタスク実行例
async function runDemo(): Promise<void> {
  // サンプルユーザーを作成
  console.log('\\n🚀 デモンストレーション開始');

  // 課題：名前と年齢を入力して出力
  await app.createUserFromInput('田中太郎', '30', 'tanaka@example.com');
  await app.createUserFromInput('佐藤花子', '25', 'sato@example.com');
  await app.createUserFromInput('鈴木一郎', '35', 'suzuki@example.com');

  // 全ユーザー表示
  app.displayAllUsers();

  // 検索機能のデモ
  app.searchUsersDemo();

  console.log('\\n✅ 20日間のTypeScript学習完了おめでとうございます！');
  console.log('🎯 学習したトピック:');
  console.log('   - 基本型（string, number, boolean）');
  console.log('   - 配列とオブジェクトの型');
  console.log('   - Interface と継承');
  console.log('   - Generics と型ガード');
  console.log('   - Utility Types');
  console.log('   - API設計と型安全性');
  console.log('   - 実践的なアプリケーション構築');
  console.log('\\n🌟 これで実際のプロジェクトでTypeScriptを活用できます！');
}

// デモを実行
runDemo().catch(console.error);

// 簡単な使用例（小課題の直接実装）
console.log('\\n📝 小課題：シンプルな名前・年齢入力システム');

interface SimpleUser {
  name: string;
  age: number;
}

function createSimpleUser(name: string, age: number): SimpleUser {
  return { name, age };
}

function displayUser(user: SimpleUser): void {
  console.log(\`ユーザー情報: \${user.name}さん（\${user.age}歳）\`);
}

// 小課題の実行
const user1 = createSimpleUser('山田太郎', 28);
const user2 = createSimpleUser('田村花子', 32);

displayUser(user1);
displayUser(user2);

`,
    explanation: "20日間の学習の集大成として、TypeScriptの型システム、クラス、ジェネリクス、エラーハンドリングなど、すべての概念を統合した実践的なユーザー管理システムを構築できます。これで実際のプロジェクトでTypeScriptを活用する準備が整いました！"
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
