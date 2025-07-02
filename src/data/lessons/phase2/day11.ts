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
  explanation: "関数に型をつけることで、引数の型チェックと戻り値の型保証が行われます。引数には「引数名: 型」、戻り値には「: 戻り値の型」を指定します。オプション引数（?）やデフォルト値も使用でき、アロー関数でも同様に型を指定できます。関数型の変数を定義することで、関数を値として扱う際の型安全性も確保できます。"
} as const