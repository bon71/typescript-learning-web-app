import type { LearningDay } from '@/types/learning'

// Phase 2: TypeScript入門（Day 8-14）
export const phase2Data: LearningDay[] = [
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
  },
  {
    day: 10,
    title: "配列とオブジェクトの型",
    goal: "型付き配列とオブジェクトが作れる",
    completion: "User[] 型を定義し使える",
    task: "ユーザーリストを作成し、出力",
    phase: 2,
    sampleCode: `// 配列の型定義
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["apple", "banana", "orange"];
let flags: boolean[] = [true, false, true];

// 配列のジェネリック記法
let scores: Array<number> = [85, 92, 78, 96];
let names: Array<string> = ["太郎", "花子", "次郎"];

// オブジェクトの型定義
let user: {
  name: string;
  age: number;
  email: string;
} = {
  name: "田中太郎",
  age: 30,
  email: "tanaka@example.com"
};

// User型の定義とユーザーリスト
type User = {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
};

let userList: User[] = [
  { id: 1, name: "田中太郎", age: 30, isActive: true },
  { id: 2, name: "山田花子", age: 25, isActive: false },
  { id: 3, name: "佐藤次郎", age: 35, isActive: true }
];

// 配列操作の関数
function getActiveUsers(users: User[]): User[] {
  return users.filter(user => user.isActive);
}

function getUserNames(users: User[]): string[] {
  return users.map(user => user.name);
}

function findUserById(users: User[], id: number): User | undefined {
  return users.find(user => user.id === id);
}

// 使用例
console.log("アクティブユーザー:", getActiveUsers(userList));
console.log("全ユーザー名:", getUserNames(userList));
console.log("ID=2のユーザー:", findUserById(userList, 2));

// 配列への要素追加（型安全）
userList.push({ id: 4, name: "高橋三郎", age: 28, isActive: true });

// forEach での型安全な処理
userList.forEach((user: User) => {
  console.log(\`\${user.name}(\${user.age}歳) - \${user.isActive ? "アクティブ" : "非アクティブ"}\`);
});`,
    explanation: "配列とオブジェクトに型を付けることで、データ操作が型安全になり、エディタの補完も効きます。"
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

// アロー関数での型注釈
const subtract = (a: number, b: number): number => {
  return a - b;
};

// 戻り値の型推論（型注釈省略可）
const multiply = (a: number, b: number) => a * b; // number型と推論

// より複雑な関数例
function greetUser(name: string, age?: number): string {
  if (age !== undefined) {
    return \`こんにちは、\${name}さん（\${age}歳）！\`;
  }
  return \`こんにちは、\${name}さん！\`;
}

// デフォルト引数付きの関数
function calculateTax(price: number, rate: number = 0.1): number {
  return price * (1 + rate);
}

// 複数の戻り値パターン（Union型）
function divide(a: number, b: number): number | string {
  if (b === 0) {
    return "ゼロで割ることはできません";
  }
  return a / b;
}

// 関数型の変数
let mathOperation: (x: number, y: number) => number;

mathOperation = add;
console.log(mathOperation(10, 5)); // 15

mathOperation = multiply;
console.log(mathOperation(10, 5)); // 50

// コールバック関数の型
function processNumbers(
  numbers: number[], 
  callback: (num: number) => number
): number[] {
  return numbers.map(callback);
}

const double = (n: number): number => n * 2;
const square = (n: number): number => n * n;

console.log(processNumbers([1, 2, 3, 4], double)); // [2, 4, 6, 8]
console.log(processNumbers([1, 2, 3, 4], square)); // [1, 4, 9, 16]

// 実際のタスク：計算機関数
function calculator(
  operation: 'add' | 'subtract' | 'multiply' | 'divide',
  a: number,
  b: number
): number | string {
  switch (operation) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      return b !== 0 ? a / b : "ゼロ除算エラー";
    default:
      return "不正な操作";
  }
}

console.log(calculator('add', 10, 5)); // 15
console.log(calculator('divide', 10, 0)); // "ゼロ除算エラー"`,
    explanation: "関数に型を付けることで、引数の渡し間違いや戻り値の型ミスを防げます。オプショナル引数やUnion型も活用しましょう。"
  },
  {
    day: 12,
    title: "Union型とLiteral型",
    goal: "複数の型や文字列限定型を理解する",
    completion: "Union/Literal型の使い分けができる",
    task: '"admin" | "user" を受け取る関数を定義',
    phase: 2,
    sampleCode: `// Union型（複数の型を許可）
let id: string | number;
id = "USER001"; // OK
id = 12345; // OK
// id = true; // Error

// Literal型（特定の値のみ許可）
let status: "pending" | "approved" | "rejected";
status = "pending"; // OK
status = "approved"; // OK
// status = "unknown"; // Error

// 実際のタスク実装
type UserRole = "admin" | "user" | "guest";

function getPermissions(role: UserRole): string[] {
  switch (role) {
    case "admin":
      return ["create", "read", "update", "delete"];
    case "user":
      return ["read", "update"];
    case "guest":
      return ["read"];
    default:
      return []; // TypeScriptが全ケースをチェック
  }
}

// 使用例
console.log("管理者権限:", getPermissions("admin"));
console.log("一般ユーザー権限:", getPermissions("user"));

// より複雑なUnion型
type Size = "small" | "medium" | "large";
type Color = "red" | "blue" | "green";

interface Product {
  name: string;
  size: Size;
  color: Color;
  price: number;
}

const products: Product[] = [
  { name: "Tシャツ", size: "medium", color: "red", price: 2000 },
  { name: "パンツ", size: "large", color: "blue", price: 3000 }
];

// Union型を使った関数
function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return \`文字列: \${value}\`;
  } else if (typeof value === "number") {
    return \`数値: \${value}\`;
  } else {
    return \`真偽値: \${value}\`;
  }
}

console.log(formatValue("Hello")); // "文字列: Hello"
console.log(formatValue(42)); // "数値: 42"
console.log(formatValue(true)); // "真偽値: true"

// 配列のUnion型
let mixedArray: (string | number)[] = ["apple", 1, "banana", 2];

// オブジェクトのUnion型
type SuccessResponse = {
  success: true;
  data: any;
};

type ErrorResponse = {
  success: false;
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse): void {
  if (response.success) {
    console.log("成功:", response.data);
  } else {
    console.log("エラー:", response.error);
  }
}

// 使用例
handleResponse({ success: true, data: { name: "太郎" } });
handleResponse({ success: false, error: "データが見つかりません" });`,
    explanation: "Union型で複数の型を許可し、Literal型で特定の値に制限できます。型ガードと組み合わせて安全な処理を実装しましょう。"
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
  email: string;
}

// Interfaceを使ったオブジェクト作成
const person: Person = {
  name: "田中太郎",
  age: 30,
  email: "tanaka@example.com"
};

// Interface の継承（extends）
interface Employee extends Person {
  employeeId: string;
  department: string;
  salary: number;
}

// 継承したInterfaceの使用
const employee: Employee = {
  name: "山田花子",
  age: 28,
  email: "yamada@company.com",
  employeeId: "EMP001",
  department: "開発部",
  salary: 500000
};

// オプショナルプロパティ
interface User {
  id: number;
  name: string;
  email: string;
  phone?: string; // オプショナル
  address?: {
    city: string;
    prefecture: string;
  };
}

const user1: User = {
  id: 1,
  name: "佐藤次郎",
  email: "sato@example.com"
  // phoneは省略可能
};

const user2: User = {
  id: 2,
  name: "鈴木三郎",
  email: "suzuki@example.com",
  phone: "090-1234-5678",
  address: {
    city: "東京",
    prefecture: "東京都"
  }
};

// メソッドを含むInterface
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply?(a: number, b: number): number; // オプショナルメソッド
}

// Interfaceを実装するクラス
class BasicCalculator implements Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  // オプショナルメソッドの実装
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// 複数のInterfaceを継承
interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

interface Document extends Printable, Saveable {
  title: string;
  content: string;
}

class TextDocument implements Document {
  constructor(public title: string, public content: string) {}

  print(): void {
    console.log(\`印刷中: \${this.title}\`);
  }

  save(): void {
    console.log(\`保存中: \${this.title}\`);
  }
}

// 使用例
const calc = new BasicCalculator();
console.log(calc.add(10, 5)); // 15
console.log(calc.multiply!(8, 3)); // 24

const doc = new TextDocument("企画書", "新製品の企画内容...");
doc.print();
doc.save();

// Interface vs Type
// Interfaceは拡張しやすい
interface Animal {
  name: string;
}

interface Animal {
  age: number; // 同名のInterfaceは自動的にマージされる
}

const dog: Animal = {
  name: "ポチ",
  age: 3
};`,
    explanation: "Interfaceは型の構造を定義し、継承によって再利用性を高めます。クラスの実装やオブジェクトの型定義に活用しましょう。"
  },
  {
    day: 14,
    title: "クラスとTypeScript",
    goal: "クラスの定義と型注釈を理解する",
    completion: "メソッドを含むクラスを作れる",
    task: "User クラスを作り、名前とログインメソッドを実装",
    phase: 2,
    sampleCode: `// 基本的なクラス定義
class User {
  // プロパティの型定義
  name: string;
  age: number;
  private email: string; // プライベートプロパティ

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  // メソッドの定義
  login(): void {
    console.log(\`\${this.name}さんがログインしました\`);
  }

  getInfo(): string {
    return \`名前: \${this.name}, 年齢: \${this.age}歳\`;
  }

  // プライベートメソッド
  private validateEmail(): boolean {
    return this.email.includes('@');
  }

  // ゲッター
  get userEmail(): string {
    return this.email;
  }

  // セッター
  set userEmail(email: string) {
    if (email.includes('@')) {
      this.email = email;
    }
  }
}

// クラスのインスタンス作成
const user = new User("田中太郎", 30, "tanaka@example.com");
user.login(); // "田中太郎さんがログインしました"
console.log(user.getInfo()); // "名前: 田中太郎, 年齢: 30歳"

// 継承
class AdminUser extends User {
  private permissions: string[];

  constructor(name: string, age: number, email: string, permissions: string[]) {
    super(name, age, email); // 親クラスのコンストラクタを呼び出し
    this.permissions = permissions;
  }

  // メソッドのオーバーライド
  login(): void {
    super.login(); // 親クラスのloginを呼び出し
    console.log("管理者権限でログインしました");
  }

  getPermissions(): string[] {
    return this.permissions;
  }

  addPermission(permission: string): void {
    this.permissions.push(permission);
  }
}

// 管理者ユーザーの作成
const admin = new AdminUser(
  "山田花子", 
  35, 
  "yamada@admin.com", 
  ["read", "write", "delete"]
);

admin.login();
console.log("権限:", admin.getPermissions());
admin.addPermission("admin");

// 抽象クラス
abstract class Shape {
  abstract area(): number; // 抽象メソッド

  // 具体的なメソッド
  describe(): string {
    return \`面積は \${this.area()} です\`;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// 使用例
const rect = new Rectangle(10, 5);
const circle = new Circle(3);

console.log(rect.describe()); // "面積は 50 です"
console.log(circle.describe()); // "面積は 28.274... です"

// インターフェースの実装
interface Flyable {
  fly(): void;
}

class Bird implements Flyable {
  constructor(private name: string) {}

  fly(): void {
    console.log(\`\${this.name}が飛んでいます\`);
  }
}

const eagle = new Bird("ワシ");
eagle.fly(); // "ワシが飛んでいます"`,
    explanation: "TypeScriptのクラスは、アクセス修飾子、継承、抽象クラス、インターフェース実装などの機能で、堅牢なオブジェクト指向プログラミングを実現できます。"
  }
]