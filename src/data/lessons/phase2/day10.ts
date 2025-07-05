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
// TypeScriptでは: let user1: { name: string; age: number; isActive: boolean } = {
let user1 = {
  name: "田中花子",
  age: 25,
  isActive: true
};

// TypeScriptでは: let user2: { name: string; age: number; isActive: boolean } = {
let user2 = {
  name: "佐藤次郎",
  age: 35,
  isActive: false
};

// ユーザー配列を作成
// TypeScriptでは: let users: { name: string; age: number; isActive: boolean }[] = [user1, user2];
let users = [user1, user2];

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
  explanation: "配列とオブジェクトに型をつけることで、要素やプロパティへのアクセス時に型安全性が保たれます。配列は「型[]」、オブジェクトは「{プロパティ: 型}」の形式で定義します。複雑な構造の場合は、同じ型定義を繰り返し書くことになるため、後で学ぶinterfaceやtype aliasを使うとより効率的になります。",

  // 演習機能追加
  exerciseCode: `// 演習: 書籍管理システムを作成しよう
// 配列とオブジェクトの型を使って書籍を管理するシステムを作成してください

// TODO: 1. 書籍オブジェクトを定義してください
// TypeScriptでは: { title: string; author: string; price: number; inStock: boolean }
let book1 = {
  title: "",     // 書籍タイトルを入力
  author: "",    // 著者名を入力  
  price: 0,      // 価格を入力
  inStock: false // 在庫ありかどうか
};

let book2 = {
  title: "",     // 書籍タイトルを入力
  author: "",    // 著者名を入力
  price: 0,      // 価格を入力
  inStock: false // 在庫ありかどうか
};

// TODO: 2. 書籍配列を作成してください
// TypeScriptでは: { title: string; author: string; price: number; inStock: boolean }[]
let books = []; // book1, book2を追加してください

// TODO: 3. 在庫のある書籍をフィルタする関数を作成してください
function getAvailableBooks(bookList) {
  // 在庫のある書籍のみを返す配列
  let availableBooks = [];
  
  for (let book of bookList) {
    if (book.inStock) {
      availableBooks.push(book);
    }
  }
  
  return availableBooks;
}

// TODO: 4. 書籍情報を表示する関数を作成してください  
function displayBook(book) {
  let stockStatus = book.inStock ? "在庫あり" : "在庫切れ";
  return "『" + book.title + "』 著者: " + book.author + 
         " 価格: " + book.price + "円 (" + stockStatus + ")";
}

// TODO: 5. 実際の書籍データを設定してテストしてください
book1.title = "TypeScript入門";
book1.author = "山田太郎";
book1.price = 2500;
book1.inStock = true;

book2.title = "JavaScript完全ガイド";
book2.author = "佐藤花子";  
book2.price = 3200;
book2.inStock = false;

// 配列に追加
books.push(book1);
books.push(book2);

// 結果を表示
console.log("=== 全書籍一覧 ===");
for (let book of books) {
  console.log(displayBook(book));
}

console.log("=== 在庫のある書籍 ===");
let availableBooks = getAvailableBooks(books);
for (let book of availableBooks) {
  console.log(displayBook(book));
}

// TODO: 6. 書籍の価格配列を作成してください
let prices = []; // 全書籍の価格を格納する配列
for (let book of books) {
  prices.push(book.price);
}

console.log("価格一覧:", prices);`,

  exerciseHints: [
    "オブジェクトは { プロパティ名: 型 } の形式で型を定義します",
    "配列は 型[] または Array<型> の形式で定義します",
    "オブジェクトの配列は { プロパティ: 型 }[] と表現します",
    "for...of文を使って配列の要素を順次処理できます",
    "配列のpush()メソッドで要素を追加できます"
  ],

  testCases: [
    {
      id: "test1",
      description: "book1オブジェクトが正しく設定されている",
      testFunction: "() => typeof book1.title === 'string' && book1.title.length > 0 && typeof book1.author === 'string' && book1.author.length > 0"
    },
    {
      id: "test2", 
      description: "book2オブジェクトが正しく設定されている",
      testFunction: "() => typeof book2.price === 'number' && book2.price > 0 && typeof book2.inStock === 'boolean'"
    },
    {
      id: "test3",
      description: "books配列に書籍が追加されている",
      testFunction: "() => Array.isArray(books) && books.length >= 2"
    },
    {
      id: "test4",
      description: "getAvailableBooks関数が正しく動作する",
      testFunction: "() => { let testBooks = [{title: 'Test', author: 'Test', price: 1000, inStock: true}, {title: 'Test2', author: 'Test2', price: 2000, inStock: false}]; let result = getAvailableBooks(testBooks); return Array.isArray(result) && result.length === 1; }"
    },
    {
      id: "test5", 
      description: "displayBook関数が正しく動作する",
      testFunction: "() => { let testBook = {title: 'テスト本', author: 'テスト著者', price: 1500, inStock: true}; let result = displayBook(testBook); return typeof result === 'string' && result.includes('テスト本') && result.includes('在庫あり'); }"
    }
  ],

  exerciseDifficulty: 'medium'
} as const