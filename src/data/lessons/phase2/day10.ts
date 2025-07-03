import type { LessonContent } from '@/types/content'

export const day10: LessonContent = {
  day: 10,
  title: "配列とオブジェクトの型",
  goal: "型付き配列とオブジェクトが作れる",
  completion: "User[] 型を定義し使える",
  task: "ユーザーリストを作成し、出力",
  phase: 2,
  difficulty: 'beginner',
  estimatedTime: 20,
  tags: ['配列型', 'オブジェクト型', 'User'],
  prerequisites: [8, 9],
  hints: [
    "配列の型は「要素の型[]」または「Array<要素の型>」で表現します",
    "オブジェクトの型は波括弧{}内にプロパティと型を定義します",
    "オブジェクトのプロパティは「プロパティ名: 型」の形式で記述します",
    "配列の要素やオブジェクトのプロパティにアクセスする際も型チェックが働きます",
    "複雑な構造になる場合は、後で学ぶinterfaceやtype aliasを使うと管理しやすくなります"
  ],
  initialCode: `// 配列とオブジェクトの型を使ってみましょう
// ユーザーリストを作成し、出力してください

// ユーザーオブジェクトの型を定義
let user1: { name: string; age: number; isActive: boolean } = {
  name: "田中花子",
  age: 25,
  isActive: true
};

let user2: { name: string; age: number; isActive: boolean } = {
  name: "佐藤次郎",
  age: 35,
  isActive: false
};

// ユーザー配列を作成
let users: { name: string; age: number; isActive: boolean }[] = [user1, user2];

// ユーザー情報を表示
console.log("ユーザー一覧:");
for (let user of users) {
  console.log(\`名前: \${user.name}, 年齢: \${user.age}, アクティブ: \${user.isActive}\`);
}`,
  sampleCode: `// 配列の型定義
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["田中", "佐藤", "鈴木"];
let flags: boolean[] = [true, false, true];

// 別の配列型の書き方
let scores: Array<number> = [85, 92, 78, 96];

// オブジェクトの型定義
let user: { name: string; age: number; isActive: boolean } = {
  name: "山田太郎",
  age: 30,
  isActive: true
};

// ユーザーオブジェクトの配列
let users: { name: string; age: number; isActive: boolean }[] = [
  { name: "田中花子", age: 25, isActive: true },
  { name: "佐藤次郎", age: 35, isActive: false },
  { name: "鈴木三郎", age: 28, isActive: true }
];

// 配列の操作例
function addUser(userList: { name: string; age: number; isActive: boolean }[], newUser: { name: string; age: number; isActive: boolean }) {
  userList.push(newUser);
}

function getActiveUsers(userList: { name: string; age: number; isActive: boolean }[]): { name: string; age: number; isActive: boolean }[] {
  return userList.filter(user => user.isActive);
}

// 使用例
addUser(users, { name: "高橋四郎", age: 32, isActive: true });
const activeUsers = getActiveUsers(users);

console.log("アクティブユーザー:", activeUsers);

// 配列の要素にアクセス
console.log("最初のユーザー:", users[0].name);
console.log("ユーザー数:", users.length);`,
  explanation: "配列とオブジェクトに型をつけることで、要素やプロパティへのアクセス時に型安全性が保たれます。配列は「型[]」、オブジェクトは「{プロパティ: 型}」の形式で定義します。複雑な構造の場合は、同じ型定義を繰り返し書くことになるため、後で学ぶinterfaceやtype aliasを使うとより効率的になります。"
} as const