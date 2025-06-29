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