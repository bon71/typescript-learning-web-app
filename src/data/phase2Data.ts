import type { LearningDay } from '@/types/learning'

export const phase2Data: LearningDay[] = [
  {
    day: 10,
    title: "配列とオブジェクトの型",
    goal: "型付き配列とオブジェクトが作れる",
    completion: "User[] 型を定義し使える",
    task: "ユーザーリストを作成し、出力",
    phase: 2,
    sampleCode: `// 配列の型定義
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["太郎", "花子", "一郎"];
let flags: boolean[] = [true, false, true];

// 別の記法（ジェネリクス）
let scores: Array<number> = [90, 85, 78, 92];
let cities: Array<string> = ["東京", "大阪", "名古屋"];

// オブジェクトの型定義
let user: {
  name: string;
  age: number;
  isActive: boolean;
} = {
  name: "田中太郎",
  age: 30,
  isActive: true
};

// ユーザー型の定義と配列
type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
};

// ユーザーリストの作成
let userList: User[] = [
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
    name: "山田一郎",
    email: "yamada@example.com",
    age: 35,
    isActive: true
  }
];

// 配列操作の型安全性
function getActiveUsers(users: User[]): User[] {
  return users.filter(user => user.isActive);
}

function getUserNames(users: User[]): string[] {
  return users.map(user => user.name);
}

function findUserById(users: User[], id: number): User | undefined {
  return users.find(user => user.id === id);
}

// 実行例
console.log("全ユーザー:", userList);
console.log("アクティブユーザー:", getActiveUsers(userList));
console.log("ユーザー名一覧:", getUserNames(userList));

const foundUser = findUserById(userList, 2);
if (foundUser) {
  console.log(\`見つかったユーザー: \${foundUser.name}\`);
}`,
    explanation: "配列とオブジェクトに型を付けることで、データ構造が明確になり、安全な操作ができます。"
  },
  {
    day: 11,
    title: "関数に型をつける",
    goal: "関数の引数と戻り値に型をつける",
    completion: "シグネチャを定義できる",
    task: "2つの数を受け取り加算する関数を作成",
    phase: 2,
    sampleCode: `// 基本的な関数の型定義
function add(a: number, b: number): number {
  return a + b;
}

// アロー関数での型定義
const multiply = (a: number, b: number): number => {
  return a * b;
};

// 短縮形
const subtract = (a: number, b: number): number => a - b;

// オプショナル引数（?をつける）
function greet(name: string, greeting?: string): string {
  const defaultGreeting = greeting || "こんにちは";
  return \`\${defaultGreeting}、\${name}さん！\`;
}

// デフォルト引数
function calculateTax(price: number, taxRate: number = 0.1): number {
  return price * (1 + taxRate);
}

// 複数の戻り値の型（Union型）
function parseNumber(value: string): number | null {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
}

// 配列を処理する関数
function sumNumbers(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// コールバック関数の型定義
function processNumbers(
  numbers: number[], 
  callback: (num: number) => number
): number[] {
  return numbers.map(callback);
}

// 実行例
console.log(add(5, 3)); // 8
console.log(multiply(4, 6)); // 24
console.log(greet("太郎")); // "こんにちは、太郎さん！"
console.log(calculateTax(1000)); // 1100

const numbers = [1, 2, 3, 4, 5];
console.log(sumNumbers(numbers)); // 15

const doubled = processNumbers(numbers, (num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]`,
    explanation: "関数に型を付けることで、引数や戻り値の型が保証され、より安全なコードが書けます。"
  },
  {
    day: 12,
    title: "Union型とLiteral型",
    goal: "複数の型や文字列限定型を理解する",
    completion: "Union/Literal型の使い分けができる",
    task: '"admin" | "user" を受け取る関数を定義',
    phase: 2,
    sampleCode: `// Union型（複数の型を許可）
let value: string | number = "こんにちは";
value = 42; // OK

// Literal型（特定の値のみ許可）
type UserRole = "admin" | "user" | "guest";
type Status = "pending" | "approved" | "rejected";

let userRole: UserRole = "admin";

// 実際のタスク実装
function checkPermission(role: "admin" | "user"): string {
  if (role === "admin") {
    return "全ての操作が可能です";
  } else if (role === "user") {
    return "限定的な操作が可能です";
  }
  return "";
}

// より実践的な例
type Theme = "light" | "dark";
type Size = "small" | "medium" | "large";

interface ButtonProps {
  text: string;
  theme: Theme;
  size: Size;
  disabled?: boolean;
}

function createButton(props: ButtonProps): string {
  const { text, theme, size, disabled = false } = props;
  
  let classes = \`btn btn-\${theme} btn-\${size}\`;
  if (disabled) {
    classes += " btn-disabled";
  }
  
  return \`<button class="\${classes}">\${text}</button>\`;
}

// タグ付きUnion（判別可能Union）
type Animal = 
  | { type: "dog"; breed: string; barkVolume: number }
  | { type: "cat"; breed: string; meowVolume: number }
  | { type: "fish"; species: string; waterType: "fresh" | "salt" };

function describeAnimal(animal: Animal): string {
  switch (animal.type) {
    case "dog":
      return \`犬（\${animal.breed}）、吠える音量: \${animal.barkVolume}\`;
    case "cat":
      return \`猫（\${animal.breed}）、鳴く音量: \${animal.meowVolume}\`;
    case "fish":
      return \`魚（\${animal.species}）、\${animal.waterType}水\`;
    default:
      const _exhaustiveCheck: never = animal;
      return _exhaustiveCheck;
  }
}

// 実行例
console.log(checkPermission("admin"));
console.log(checkPermission("user"));`,
    explanation: "Union型とLiteral型により、より厳密で安全な型定義ができます。判別可能Unionは特に便利です。"
  },
  {
    day: 13,
    title: "Interfaceと継承",
    goal: "Interfaceの定義と拡張を理解する",
    completion: "複数の型構造を再利用できる",
    task: "Person → Employee を継承してオブジェクト作成",
    phase: 2,
    sampleCode: `// 基本的なInterface
interface Person {
  name: string;
  age: number;
  email: string;
}

// Interfaceの継承
interface Employee extends Person {
  employeeId: string;
  department: string;
  salary: number;
}

// さらなる継承
interface Manager extends Employee {
  teamSize: number;
  budget: number;
}

// Interfaceの実装
const person: Person = {
  name: "田中太郎",
  age: 30,
  email: "tanaka@example.com"
};

const employee: Employee = {
  name: "佐藤花子",
  age: 28,
  email: "sato@company.com",
  employeeId: "EMP001",
  department: "開発部",
  salary: 500000
};

const manager: Manager = {
  name: "山田次郎",
  age: 35,
  email: "yamada@company.com",
  employeeId: "MGR001",
  department: "開発部",
  salary: 800000,
  teamSize: 5,
  budget: 10000000
};

// オプショナルプロパティ
interface User {
  id: number;
  name: string;
  email: string;
  phone?: string; // オプショナル
  address?: {
    street: string;
    city: string;
    zipCode: string;
  };
}

// 読み取り専用プロパティ
interface Config {
  readonly apiUrl: string;
  readonly version: string;
  maxRetries: number;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  version: "1.0.0",
  maxRetries: 3
};

// メソッドを含むInterface
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

class BasicCalculator implements Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
  
  subtract(a: number, b: number): number {
    return a - b;
  }
  
  multiply(a: number, b: number): number {
    return a * b;
  }
  
  divide(a: number, b: number): number {
    if (b === 0) throw new Error("0で割ることはできません");
    return a / b;
  }
}

// 実行例
console.log("Person:", person);
console.log("Employee:", employee);
console.log("Manager:", manager);

const calc = new BasicCalculator();
console.log("5 + 3 =", calc.add(5, 3));`,
    explanation: "Interfaceの継承により、型の再利用と拡張が可能になります。複数継承も支援されています。"
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
  private id: number;
  public name: string;
  protected email: string;
  private isLoggedIn: boolean = false;

  // コンストラクタ
  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // パブリックメソッド
  login(): void {
    this.isLoggedIn = true;
    console.log(\`\${this.name}さんがログインしました\`);
  }

  logout(): void {
    this.isLoggedIn = false;
    console.log(\`\${this.name}さんがログアウトしました\`);
  }

  getInfo(): string {
    return \`ID: \${this.id}, 名前: \${this.name}, ログイン状態: \${this.isLoggedIn ? "ログイン中" : "ログアウト中"}\`;
  }

  // ゲッター・セッター
  get userId(): number {
    return this.id;
  }

  get loginStatus(): boolean {
    return this.isLoggedIn;
  }
}

// クラスの継承
class AdminUser extends User {
  private adminLevel: number;

  constructor(id: number, name: string, email: string, adminLevel: number) {
    super(id, name, email);
    this.adminLevel = adminLevel;
  }

  // メソッドのオーバーライド
  login(): void {
    super.login();
    console.log(\`管理者レベル \${this.adminLevel} でログインしました\`);
  }

  deleteUser(userId: number): void {
    console.log(\`ユーザー ID: \${userId} を削除しました\`);
  }
}

// 抽象クラス
abstract class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract makeSound(): void;

  move(): void {
    console.log(\`\${this.name}が移動しています\`);
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log(\`\${this.name}がワンワンと鳴いています\`);
  }
}

// staticメソッドとプロパティ
class MathUtil {
  static readonly PI = 3.14159;

  static add(a: number, b: number): number {
    return a + b;
  }

  static calculateCircleArea(radius: number): number {
    return MathUtil.PI * radius * radius;
  }
}

// 実行例
const user = new User(1, "田中太郎", "tanaka@example.com");
console.log(user.getInfo());
user.login();

const admin = new AdminUser(2, "佐藤花子", "sato@admin.com", 5);
admin.login();

const dog = new Dog("ポチ");
dog.move();
dog.makeSound();`,
    explanation: "TypeScriptのクラスは、アクセス修飾子、継承、抽象クラスなど、オブジェクト指向の機能を完全にサポートします。"
  }
]