import type { LessonContent } from '@/types/content'

export const day11: LessonContent = {
  day: 11,
  title: "関数に型をつける",
  goal: "関数の引数と戻り値に型をつける",
  completion: "シグネチャを定義できる",
  task: "2つの数を受け取り加算する関数を作成",
  phase: 2,
  difficulty: 'beginner',
  estimatedTime: 20,
  tags: ['関数型', '引数', '戻り値', 'シグネチャ'],
  prerequisites: [8, 9, 10],
  hints: [
    "関数の引数は「引数名: 型」の形式で型を指定します",
    "戻り値の型は関数名の後に「: 戻り値の型」で指定します",
    "voidは何も返さない関数の戻り値型として使います",
    "オプション引数は「引数名?: 型」で定義し、デフォルト値も設定できます",
    "アロー関数でも同様に型を指定できます"
  ],
  initialCode: `// 基本的な関数の型定義を学ぼう
// TODO: 2つの数を受け取り加算する関数を作成してください

// 1. 基本的な関数を定義してみよう
// TypeScriptでは: function add(a: number, b: number): number {
function add(a, b) {
  // ここに加算の処理を書いてください
  return 0; // この行を修正してください
}

// 2. 戻り値がない関数を定義してみよう
// TypeScriptでは: function greet(name: string): void {
function greet(name) {
  // ここに挨拶を出力する処理を書いてください
}

// 3. オプション引数を持つ関数を定義してみよう
// TypeScriptでは: function createMessage(text: string, prefix?: string): string {
function createMessage(text, prefix) {
  // prefixがある場合は前に付けて返す
  // ない場合はそのまま返す
  return text;
}

// 4. 使用例
console.log(add(5, 3)); // 8 が出力されるはずです
greet("田中"); // "こんにちは、田中さん！" が出力されるはずです
console.log(createMessage("こんにちは")); // "こんにちは" が出力されるはずです
console.log(createMessage("こんにちは", "【お知らせ】")); // "【お知らせ】こんにちは" が出力されるはずです`,
  sampleCode: `// 基本的な関数の型定義
function add(a: number, b: number): number {
  return a + b;
}

// 戻り値がない関数（void）
function greet(name: string): void {
  console.log(\`こんにちは、\${name}さん！\`);
}

// オプション引数を持つ関数
function formatName(firstName: string, lastName?: string): string {
  if (lastName) {
    return \`\${lastName} \${firstName}\`;
  }
  return firstName;
}

// デフォルト値を持つ引数
function createUser(name: string, age: number = 20): { name: string; age: number } {
  return { name, age };
}

// アロー関数での型定義
const multiply = (x: number, y: number): number => x * y;

const logMessage = (message: string): void => {
  console.log(\`[LOG] \${message}\`);
};

// 関数型の変数
let calculator: (a: number, b: number) => number;
calculator = add; // OK
calculator = multiply; // OK
// calculator = greet; // エラー：型が合わない

// 複雑な例：配列を操作する関数
function filterUsers(
  users: { name: string; age: number }[], 
  minAge: number
): { name: string; age: number }[] {
  return users.filter(user => user.age >= minAge);
}

function mapUserNames(users: { name: string; age: number }[]): string[] {
  return users.map(user => user.name);
}

// 使用例
console.log(add(5, 3)); // 8
greet("田中"); // こんにちは、田中さん！
console.log(formatName("太郎")); // 太郎
console.log(formatName("太郎", "田中")); // 田中 太郎
console.log(createUser("佐藤")); // { name: "佐藤", age: 20 }

const users = [
  { name: "田中", age: 25 },
  { name: "佐藤", age: 17 },
  { name: "鈴木", age: 30 }
];

const adults = filterUsers(users, 18);
const names = mapUserNames(adults);
console.log(names); // ["田中", "鈴木"]`,
  explanation: "関数に型をつけることで、引数の型チェックと戻り値の型保証が行われます。引数には「引数名: 型」、戻り値には「: 戻り値の型」を指定します。オプション引数（?）やデフォルト値も使用でき、アロー関数でも同様に型を指定できます。関数型の変数を定義することで、関数を値として扱う際の型安全性も確保できます。",

  // 演習機能追加
  exerciseCode: `// 演習: 型安全な計算機能を作成しよう
// 関数の引数と戻り値に型をつけて計算機能を実装してください

// TODO: 1. 基本的な四則演算関数を作成してください
function add(a, b) {
  // 2つの数を足す関数
  return 0; // ここを実装してください
}

function subtract(a, b) {
  // 2つの数を引く関数
  return 0; // ここを実装してください
}

function multiply(a, b) {
  // 2つの数をかける関数
  return 0; // ここを実装してください
}

// TODO: 2. より複雑な関数を作成してください
function calculateAverage(numbers) {
  // 数値配列の平均を計算する関数
  // TypeScriptでは: function calculateAverage(numbers: number[]): number
  
  if (numbers.length === 0) {
    return 0;
  }
  
  let sum = 0;
  for (let num of numbers) {
    sum += num;
  }
  
  return sum / numbers.length;
}

// TODO: 3. オプション引数を持つ関数を作成してください
function greetUser(name, title) {
  // nameは必須、titleはオプション
  // TypeScriptでは: function greetUser(name: string, title?: string): string
  
  if (title) {
    return title + " " + name + "さん、こんにちは！";
  } else {
    return name + "さん、こんにちは！";
  }
}

// TODO: 4. 戻り値がない関数を作成してください
function logCalculation(operation, num1, num2, result) {
  // 計算結果をログ出力する関数
  // TypeScriptでは: function logCalculation(operation: string, num1: number, num2: number, result: number): void
  
  console.log(operation + ": " + num1 + " と " + num2 + " の結果は " + result + " です");
}

// TODO: 5. 実装をテストしてください
let x = 10;
let y = 5;

// 基本演算のテスト
let addResult = add(x, y);
let subResult = subtract(x, y);
let mulResult = multiply(x, y);

console.log("=== 基本演算テスト ===");
logCalculation("加算", x, y, addResult);
logCalculation("減算", x, y, subResult);
logCalculation("乗算", x, y, mulResult);

// 平均計算のテスト
let scores = [85, 92, 78, 96, 88];
let average = calculateAverage(scores);
console.log("\\n=== 平均計算テスト ===");
console.log("点数:", scores);
console.log("平均点:", average);

// 挨拶関数のテスト
console.log("\\n=== 挨拶テスト ===");
console.log(greetUser("田中"));
console.log(greetUser("佐藤", "部長"));`,

  exerciseHints: [
    "関数の引数は (引数名: 型) の形式で型を指定します",
    "戻り値の型は関数名の後に : 型 で指定します",
    "オプション引数は 引数名?: 型 で定義します",
    "戻り値がない関数は : void を使います",
    "配列の型は number[] または Array<number> で表現します"
  ],

  testCases: [
    {
      id: "test1",
      description: "add関数が正しく動作する",
      testFunction: "() => { let result = add(5, 3); return result === 8; }"
    },
    {
      id: "test2",
      description: "subtract関数が正しく動作する",
      testFunction: "() => { let result = subtract(10, 4); return result === 6; }"
    },
    {
      id: "test3",
      description: "multiply関数が正しく動作する",
      testFunction: "() => { let result = multiply(6, 7); return result === 42; }"
    },
    {
      id: "test4",
      description: "calculateAverage関数が正しく動作する",
      testFunction: "() => { let result = calculateAverage([10, 20, 30]); return result === 20; }"
    },
    {
      id: "test5",
      description: "greetUser関数がオプション引数なしで動作する",
      testFunction: "() => { let result = greetUser('テスト'); return typeof result === 'string' && result.includes('テスト'); }"
    },
    {
      id: "test6",
      description: "greetUser関数がオプション引数ありで動作する",
      testFunction: "() => { let result = greetUser('テスト', '課長'); return typeof result === 'string' && result.includes('課長') && result.includes('テスト'); }"
    }
  ],

  exerciseDifficulty: 'medium'
} as const