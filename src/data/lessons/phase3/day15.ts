import type { LessonContent } from '@/types/content'

export const day15: LessonContent = {
  day: 15,
  title: "Generics",
  goal: "ジェネリクスの定義と利用方法を理解する",
  completion: "<T> を使った関数が書ける",
  task: "任意の配列の先頭要素を返す getFirst<T>() を作成",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 30,
  tags: ['Generics', 'ジェネリクス', '高度な型'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14],
  hints: [
    "ジェネリクスは型を引数として受け取る機能で、再利用可能な型安全なコードを書けます",
    "型パラメータは<T>のように山括弧で囲み、慣習的にT、U、Vなどの大文字を使います",
    "extendsキーワードで型制約を設けることで、特定の条件を満たす型のみを受け入れられます",
    "複数の型パラメータや、デフォルト型パラメータも定義できます",
    "条件型（Conditional Types）と組み合わせることで、非常に柔軟な型定義が可能になります"
  ],
  sampleCode: `// 基本的なジェネリック関数
function getFirst<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

function getLast<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[array.length - 1] : undefined;
}

// 使用例
const numbers = [1, 2, 3, 4, 5];
const strings = ["apple", "banana", "cherry"];
const booleans = [true, false, true];

const firstNumber = getFirst(numbers); // number | undefined
const firstString = getFirst(strings); // string | undefined
const lastBoolean = getLast(booleans); // boolean | undefined

// ジェネリッククラス
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// 使用例
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.peek()); // 2

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.pop()); // "world"

// 型制約（extends）
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(\`Length: \${arg.length}\`);
  return arg;
}

logLength("Hello"); // OK: string has length
logLength([1, 2, 3]); // OK: array has length
logLength({ length: 10, value: 42 }); // OK: object has length
// logLength(42); // Error: number doesn't have length

// 複数の型パラメータ
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

const swapped = swap(["hello", 42]); // [number, string]

// キー制約
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "田中", age: 30, city: "東京" };
const name = getProperty(person, "name"); // string
const age = getProperty(person, "age"); // number
// const invalid = getProperty(person, "salary"); // Error: 存在しないプロパティ

// ジェネリックインターフェース
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
  findAll(): Promise<T[]>;
}

interface User {
  id: string;
  name: string;
  email: string;
}

class UserRepository implements Repository<User> {
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async save(user: User): Promise<User> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      this.users[index] = user;
    } else {
      this.users.push(user);
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }
}

// 条件型の例
type NonNullable<T> = T extends null | undefined ? never : T;
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringOrNumber = NonNullable<string | null>; // string
type NumberFromArray = ArrayElement<number[]>; // number

// ユーティリティ関数
function identity<T>(arg: T): T {
  return arg;
}

function map<T, U>(array: T[], fn: (item: T) => U): U[] {
  return array.map(fn);
}

function filter<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}

// 実用例
const users = [
  { id: "1", name: "田中", age: 30 },
  { id: "2", name: "佐藤", age: 25 },
  { id: "3", name: "鈴木", age: 35 }
];

const names = map(users, user => user.name); // string[]
const adults = filter(users, user => user.age >= 30); // User[]

console.log(names); // ["田中", "鈴木"]
console.log(adults); // [{ id: "1", name: "田中", age: 30 }, { id: "3", name: "鈴木", age: 35 }]`,
  explanation: "ジェネリクスは型を引数として受け取る機能で、再利用可能で型安全なコードを書くために不可欠です。型制約（extends）、複数の型パラメータ、条件型などと組み合わせることで、非常に柔軟で強力な型定義が可能になります。関数、クラス、インターフェースなど様々な場面で活用でき、TypeScriptの型システムの真価を発揮する重要な機能です。"
} as const