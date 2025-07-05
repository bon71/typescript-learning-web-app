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
  initialCode: `// ジェネリクスを学ぼう
// TODO: 任意の配列の先頭要素を返す getFirst<T>() を作成

// 1. 基本的なジェネリック関数
// TypeScriptでは: function getFirst<T>(array: T[]): T | undefined {
// JavaScriptではジェネリクスは使用できませんが、同じ動作を実現できます
function getFirst(array) {
  // TODO: 配列の先頭要素を返す処理を実装してください
  // 配列が空の場合は undefined を返す
  return undefined; // この行を修正してください
}

// 2. 複数の型パラメータを持つジェネリック関数
// TypeScriptでは: function swap<T, U>(tuple: [T, U]): [U, T] {
// JavaScriptでは型パラメータなしで同じ動作を実装
function swap(tuple) {
  // TODO: タプルの要素を入れ替えて返す処理を実装してください
  return [tuple[1], tuple[0]];
}

// 3. 基本的なジェネリッククラス
// TypeScriptでは: class Stack<T> { private items: T[] = []; ... }
// JavaScriptではジェネリクスなしで同等の機能を実装
class Stack {
  constructor() {
    this.items = []; // private items: T[] 相当
  }

  // TypeScriptでは: push(item: T): void {
  push(item) {
    this.items.push(item);
  }

  // TypeScriptでは: pop(): T | undefined {
  pop() {
    return this.items.pop();
  }

  // TODO: peek メソッドを実装してください
  // スタックの一番上の要素を削除せずに返す
  // TypeScriptでは: peek(): T | undefined {
  peek() {
    return undefined; // この行を修正してください
  }

  // TypeScriptでは: isEmpty(): boolean {
  isEmpty() {
    return this.items.length === 0;
  }
}

// 4. 使用例
const numbers = [1, 2, 3, 4, 5];
const strings = ["apple", "banana", "cherry"];

console.log(getFirst(numbers)); // 1 が出力されるはずです
console.log(getFirst(strings)); // "apple" が出力されるはずです

const swapped = swap(["hello", 42]);
console.log(swapped); // [42, "hello"] が出力されるはずです

// TypeScriptでは: const numberStack = new Stack<number>();
const numberStack = new Stack(); // 数値用のスタックとして使用
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.peek()); // 2 が出力されるはずです
console.log(numberStack.pop()); // 2 が出力されるはずです
console.log(numberStack.peek()); // 1 が出力されるはずです`,
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
  explanation: "ジェネリクスは型を引数として受け取る機能で、再利用可能で型安全なコードを書くために不可欠です。型制約（extends）、複数の型パラメータ、条件型などと組み合わせることで、非常に柔軟で強力な型定義が可能になります。関数、クラス、インターフェースなど様々な場面で活用でき、TypeScriptの型システムの真価を発揮する重要な機能です。",

  // 演習機能追加
  exerciseCode: `// 演習: 汎用的なデータ処理ライブラリを作成しよう
// Genericsを使って型安全で再利用可能なユーティリティ関数とクラスを実装してください

// TODO: 1. 配列操作のユーティリティ関数を作成してください

// 配列の最初の要素を取得する関数
function getFirst(array) {
  // TypeScriptでは: function getFirst<T>(array: T[]): T | undefined
  if (array.length === 0) {
    return undefined;
  }
  return array[0];
}

// 配列の最後の要素を取得する関数
function getLast(array) {
  // TypeScriptでは: function getLast<T>(array: T[]): T | undefined
  if (array.length === 0) {
    return undefined;
  }
  return array[array.length - 1];
}

// 配列をフィルタリングする関数
function filterArray(array, predicate) {
  // TypeScriptでは: function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[]
  let result = [];
  for (let item of array) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

// 配列をマッピングする関数
function mapArray(array, transform) {
  // TypeScriptでは: function mapArray<T, U>(array: T[], transform: (item: T) => U): U[]
  let result = [];
  for (let item of array) {
    result.push(transform(item));
  }
  return result;
}

// TODO: 2. 汎用的なデータストレージクラスを作成してください
class DataStorage {
  // TypeScriptでは: class DataStorage<T>
  constructor() {
    this.items = []; // private items: T[] = [];
  }
  
  // アイテムを追加する
  add(item) {
    // TypeScriptでは: add(item: T): void
    this.items.push(item);
  }
  
  // インデックスでアイテムを取得する
  get(index) {
    // TypeScriptでは: get(index: number): T | undefined
    if (index >= 0 && index < this.items.length) {
      return this.items[index];
    }
    return undefined;
  }
  
  // すべてのアイテムを取得する
  getAll() {
    // TypeScriptでは: getAll(): T[]
    return [...this.items]; // コピーを返す
  }
  
  // アイテムを削除する
  remove(index) {
    // TypeScriptでは: remove(index: number): T | undefined
    if (index >= 0 && index < this.items.length) {
      return this.items.splice(index, 1)[0];
    }
    return undefined;
  }
  
  // ストレージのサイズを取得する
  size() {
    // TypeScriptでは: size(): number
    return this.items.length;
  }
  
  // ストレージが空かどうか確認する
  isEmpty() {
    // TypeScriptでは: isEmpty(): boolean
    return this.items.length === 0;
  }
  
  // ストレージをクリアする
  clear() {
    // TypeScriptでは: clear(): void
    this.items = [];
  }
}

// TODO: 3. キューとスタックを実装してください

// キュー（FIFO: First In, First Out）
class Queue {
  // TypeScriptでは: class Queue<T>
  constructor() {
    this.items = [];
  }
  
  // 要素を追加（enqueue）
  enqueue(item) {
    // TypeScriptでは: enqueue(item: T): void
    this.items.push(item);
  }
  
  // 要素を取り出し（dequeue）
  dequeue() {
    // TypeScriptでは: dequeue(): T | undefined
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items.shift();
  }
  
  // 先頭要素を確認
  front() {
    // TypeScriptでは: front(): T | undefined
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items[0];
  }
  
  // サイズを取得
  size() {
    return this.items.length;
  }
  
  // 空かどうか確認
  isEmpty() {
    return this.items.length === 0;
  }
}

// スタック（LIFO: Last In, First Out）
class Stack {
  // TypeScriptでは: class Stack<T>
  constructor() {
    this.items = [];
  }
  
  // 要素を追加（push）
  push(item) {
    // TypeScriptでは: push(item: T): void
    this.items.push(item);
  }
  
  // 要素を取り出し（pop）
  pop() {
    // TypeScriptでは: pop(): T | undefined
    return this.items.pop();
  }
  
  // 最上位要素を確認（peek）
  peek() {
    // TypeScriptでは: peek(): T | undefined
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }
  
  // サイズを取得
  size() {
    return this.items.length;
  }
  
  // 空かどうか確認
  isEmpty() {
    return this.items.length === 0;
  }
}

// TODO: 4. 実装をテストしてください

console.log("=== 配列ユーティリティのテスト ===");

// 数値配列のテスト
let numbers = [1, 2, 3, 4, 5];
console.log("最初の数値:", getFirst(numbers));
console.log("最後の数値:", getLast(numbers));

// 偶数をフィルタリング
let evenNumbers = filterArray(numbers, num => num % 2 === 0);
console.log("偶数:", evenNumbers);

// 数値を2倍にマッピング
let doubledNumbers = mapArray(numbers, num => num * 2);
console.log("2倍した数値:", doubledNumbers);

// 文字列配列のテスト
let fruits = ["apple", "banana", "cherry"];
console.log("\\n=== 文字列配列のテスト ===");
console.log("最初の果物:", getFirst(fruits));

// 長い名前の果物をフィルタリング
let longNames = filterArray(fruits, fruit => fruit.length > 5);
console.log("長い名前の果物:", longNames);

// 大文字にマッピング
let upperFruits = mapArray(fruits, fruit => fruit.toUpperCase());
console.log("大文字の果物:", upperFruits);

console.log("\\n=== データストレージのテスト ===");

// 文字列ストレージ
let stringStorage = new DataStorage();
stringStorage.add("Hello");
stringStorage.add("World");
stringStorage.add("TypeScript");

console.log("文字列ストレージのサイズ:", stringStorage.size());
console.log("インデックス1の要素:", stringStorage.get(1));
console.log("すべての要素:", stringStorage.getAll());

// 数値ストレージ
let numberStorage = new DataStorage();
numberStorage.add(10);
numberStorage.add(20);
numberStorage.add(30);

console.log("数値ストレージの要素:", numberStorage.getAll());

console.log("\\n=== キューのテスト ===");

let queue = new Queue();
queue.enqueue("最初の客");
queue.enqueue("2番目の客");
queue.enqueue("3番目の客");

console.log("キューの先頭:", queue.front());
console.log("取り出し:", queue.dequeue());
console.log("取り出し後の先頭:", queue.front());

console.log("\\n=== スタックのテスト ===");

let stack = new Stack();
stack.push("bottom");
stack.push("middle");
stack.push("top");

console.log("スタックの最上位:", stack.peek());
console.log("取り出し:", stack.pop());
console.log("取り出し後の最上位:", stack.peek());`,

  exerciseHints: [
    "Genericsは型を引数として受け取る機能です（<T>のように表現）",
    "配列の操作では、length プロパティで要素数を確認できます",
    "filter()やmap()のような高階関数では、関数を引数として受け取ります",
    "キューは先入れ先出し（FIFO）、スタックは後入れ先出し（LIFO）です",
    "undefined を返すことで、存在しない要素を安全に表現できます"
  ],

  testCases: [
    {
      id: "test1",
      description: "getFirst関数が正しく動作する",
      testFunction: "() => { let result = getFirst([1, 2, 3]); return result === 1; }"
    },
    {
      id: "test2",
      description: "getLast関数が正しく動作する",
      testFunction: "() => { let result = getLast(['a', 'b', 'c']); return result === 'c'; }"
    },
    {
      id: "test3",
      description: "filterArray関数が正しく動作する",
      testFunction: "() => { let result = filterArray([1, 2, 3, 4], x => x % 2 === 0); return result.length === 2 && result[0] === 2 && result[1] === 4; }"
    },
    {
      id: "test4",
      description: "DataStorageクラスが正しく動作する",
      testFunction: "() => { let storage = new DataStorage(); storage.add('test'); return storage.size() === 1 && storage.get(0) === 'test'; }"
    },
    {
      id: "test5",
      description: "Queueクラスが正しく動作する",
      testFunction: "() => { let queue = new Queue(); queue.enqueue('first'); queue.enqueue('second'); let first = queue.dequeue(); return first === 'first' && queue.front() === 'second'; }"
    },
    {
      id: "test6",
      description: "Stackクラスが正しく動作する",
      testFunction: "() => { let stack = new Stack(); stack.push('first'); stack.push('second'); let top = stack.pop(); return top === 'second' && stack.peek() === 'first'; }"
    }
  ],

  exerciseDifficulty: 'hard'
} as const