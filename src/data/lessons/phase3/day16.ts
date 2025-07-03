import type { LessonContent } from '@/types/content'

export const day16: LessonContent = {
  day: 16,
  title: "型ガード",
  goal: "型による分岐（型ガード）を理解する",
  completion: "typeof, in, instanceof を使える",
  task: "型に応じて処理が変わる関数を定義",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 30,
  tags: ['型ガード', 'typeof', 'instanceof', '型安全性'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14, 15],
  hints: [
    "型ガードはUnion型を安全に分岐処理するための仕組みです",
    "typeof演算子はプリミティブ型（string, number, boolean等）の判定に使用します",
    "instanceof演算子はクラスのインスタンスかどうかを判定します",
    "in演算子はオブジェクトに特定のプロパティが存在するかを判定します",
    "カスタム型ガード関数（user-defined type guards）でより複雑な型判定が可能です"
  ],
  initialCode: `// 型ガードを学ぼう
// TODO: 型に応じて処理が変わる関数を定義

// 1. typeof型ガード - プリミティブ型の判定
function processValue(value: string | number | boolean): string {
  // TODO: 型に応じて適切な処理を実装してください
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    // boolean の場合
    return value ? "true" : "false";
  }
}

// 2. instanceof型ガード - クラスのインスタンス判定
class Dog {
  constructor(public name: string) {}
  bark(): string {
    return \`\${this.name} is barking\`;
  }
}

class Cat {
  constructor(public name: string) {}
  meow(): string {
    return \`\${this.name} is meowing\`;
  }
}

function makeSound(animal: Dog | Cat): string {
  // TODO: instanceof を使って型を判定し、適切なメソッドを呼び出してください
  if (animal instanceof Dog) {
    return animal.bark();
  } else {
    return animal.meow();
  }
}

// 3. in演算子による型ガード - プロパティの存在確認
interface Bird {
  type: "bird";
  fly(): void;
}

interface Fish {
  type: "fish";
  swim(): void;
}

function move(animal: Bird | Fish): void {
  // TODO: in演算子を使って型を判定し、適切なメソッドを呼び出してください
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}

// 4. 使用例
console.log(processValue("hello")); // "HELLO"
console.log(processValue(3.14159)); // "3.14"
console.log(processValue(true)); // "true"

const dog = new Dog("ポチ");
const cat = new Cat("ミケ");

console.log(makeSound(dog)); // "ポチ is barking"
console.log(makeSound(cat)); // "ミケ is meowing"

const bird: Bird = {
  type: "bird",
  fly: () => console.log("Flying high!")
};

const fish: Fish = {
  type: "fish",
  swim: () => console.log("Swimming deep!")
};

move(bird); // "Flying high!"
move(fish); // "Swimming deep!"`,
  sampleCode: `// typeof型ガード
function processValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    // ここでvalueはstring型として扱われる
    return value.toUpperCase();
  } else if (typeof value === "number") {
    // ここでvalueはnumber型として扱われる
    return value.toFixed(2);
  } else {
    // ここでvalueはboolean型として扱われる
    return value ? "true" : "false";
  }
}

console.log(processValue("hello")); // "HELLO"
console.log(processValue(3.14159)); // "3.14"
console.log(processValue(true)); // "true"

// instanceof型ガード
class Dog {
  constructor(public name: string) {}
  bark(): string {
    return \`\${this.name} is barking\`;
  }
}

class Cat {
  constructor(public name: string) {}
  meow(): string {
    return \`\${this.name} is meowing\`;
  }
}

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    // ここでanimalはDog型として扱われる
    return animal.bark();
  } else {
    // ここでanimalはCat型として扱われる
    return animal.meow();
  }
}

const dog = new Dog("ポチ");
const cat = new Cat("ミケ");

console.log(makeSound(dog)); // "ポチ is barking"
console.log(makeSound(cat)); // "ミケ is meowing"

// in演算子による型ガード
interface Bird {
  type: "bird";
  fly(): void;
  layEggs(): void;
}

interface Fish {
  type: "fish";
  swim(): void;
  layEggs(): void;
}

function move(animal: Bird | Fish): void {
  if ("fly" in animal) {
    // ここでanimalはBird型として扱われる
    animal.fly();
  } else {
    // ここでanimalはFish型として扱われる
    animal.swim();
  }
}

// より複雑な例：判別可能なUnion型
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // ここでshapeは{ kind: "circle"; radius: number }型
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      // ここでshapeは{ kind: "rectangle"; width: number; height: number }型
      return shape.width * shape.height;
    case "triangle":
      // ここでshapeは{ kind: "triangle"; base: number; height: number }型
      return (shape.base * shape.height) / 2;
    default:
      // 網羅性チェック
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck;
  }
}

// カスタム型ガード関数
interface User {
  id: string;
  name: string;
  email: string;
}

interface Admin {
  id: string;
  name: string;
  email: string;
  permissions: string[];
}

// type predicateを使用したカスタム型ガード
function isAdmin(user: User | Admin): user is Admin {
  return 'permissions' in user;
}

function handleUser(user: User | Admin): string {
  if (isAdmin(user)) {
    // ここでuserはAdmin型として扱われる
    return \`管理者 \${user.name} (権限: \${user.permissions.join(", ")})\`;
  } else {
    // ここでuserはUser型として扱われる
    return \`一般ユーザー \${user.name}\`;
  }
}

// より高度なカスタム型ガード
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

function isArray<T>(value: unknown, itemGuard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(itemGuard);
}

// API レスポンスの型ガード
interface ApiSuccessResponse {
  success: true;
  data: any;
}

interface ApiErrorResponse {
  success: false;
  error: string;
  code: number;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

function isSuccessResponse(response: ApiResponse): response is ApiSuccessResponse {
  return response.success === true;
}

function handleApiResponse(response: ApiResponse): void {
  if (isSuccessResponse(response)) {
    console.log("成功:", response.data);
  } else {
    console.error(\`エラー (\${response.code}): \${response.error}\`);
  }
}

// 実用例
const shapes: Shape[] = [
  { kind: "circle", radius: 5 },
  { kind: "rectangle", width: 10, height: 20 },
  { kind: "triangle", base: 8, height: 12 }
];

shapes.forEach(shape => {
  console.log(\`\${shape.kind}の面積: \${calculateArea(shape)}\`);
});

const users: (User | Admin)[] = [
  { id: "1", name: "田中", email: "tanaka@example.com" },
  { id: "2", name: "佐藤", email: "sato@example.com", permissions: ["read", "write"] }
];

users.forEach(user => {
  console.log(handleUser(user));
});

// 型ガードのチェーン
function processUnknownValue(value: unknown): string {
  if (isString(value)) {
    return \`文字列: \${value}\`;
  } else if (isNumber(value)) {
    return \`数値: \${value}\`;
  } else if (isArray(value, isString)) {
    return \`文字列配列: [\${value.join(", ")}]\`;
  } else {
    return "未知の型";
  }
}

console.log(processUnknownValue("hello")); // 文字列: hello
console.log(processUnknownValue(42)); // 数値: 42
console.log(processUnknownValue(["a", "b", "c"])); // 文字列配列: [a, b, c]`,
  explanation: "型ガードはUnion型を安全に分岐処理するための重要な機能です。typeof、instanceof、in演算子による組み込み型ガードに加え、カスタム型ガード関数を定義することで、複雑な型判定も可能になります。判別可能なUnion型や網羅性チェックと組み合わせることで、型安全で保守性の高いコードを書くことができます。"
} as const