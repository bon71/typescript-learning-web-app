import type { LearningDay } from '@/types/learning'

// Phase 3: TypeScript実践応用（Day 15-20）
export const phase3Data: LearningDay[] = [
  {
    day: 15,
    title: "Generics",
    goal: "ジェネリクスの定義と利用方法を理解する",
    completion: "<T> を使った関数が書ける",
    task: "任意の配列の先頭要素を返す getFirst<T>() を作成",
    phase: 3,
    sampleCode: `// 基本的なジェネリクス関数
function getFirst<T>(array: T[]): T | undefined {
  return array[0];
}

// 使用例
const numbers = [1, 2, 3, 4, 5];
const firstNumber = getFirst(numbers); // number型
console.log(firstNumber); // 1

const fruits = ["apple", "banana", "orange"];
const firstFruit = getFirst(fruits); // string型
console.log(firstFruit); // "apple"

// ジェネリクスを使ったクラス
class Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

// 使用例
const numberContainer = new Container<number>();
numberContainer.add(10);
numberContainer.add(20);
console.log(numberContainer.getAll()); // [10, 20]

// keyof を使った高度なジェネリクス
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "太郎", age: 30 };
const name = getProperty(person, "name"); // string型`,
    explanation: "ジェネリクスにより、型安全性を保ちながら再利用可能なコンポーネントを作成できます。"
  },
  {
    day: 16,
    title: "型ガード",
    goal: "型による分岐（型ガード）を理解する",
    completion: "typeof, in, instanceof を使える",
    task: "型に応じて処理が変わる関数を定義",
    phase: 3,
    sampleCode: `// typeof を使った型ガード
function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return \`文字列: "\${value}"\`;
  } else if (typeof value === "number") {
    return \`数値: \${value}\`;
  } else {
    return \`真偽値: \${value}\`;
  }
}

console.log(formatValue("Hello")); // "文字列: "Hello""
console.log(formatValue(42)); // "数値: 42"

// in を使った型ガード
interface Dog {
  name: string;
  breed: string;
  bark(): void;
}

interface Cat {
  name: string;
  color: string;
  meow(): void;
}

function handlePet(pet: Dog | Cat): void {
  if ("bark" in pet) {
    console.log(\`犬種: \${pet.breed}\`);
    pet.bark();
  } else {
    console.log(\`毛色: \${pet.color}\`);
    pet.meow();
  }
}

// カスタム型ガード関数
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown): string {
  if (isString(value)) {
    return value.toUpperCase();
  } else {
    return "不明な型";
  }
}`,
    explanation: "型ガードを使うことで、Union型の値を安全に処理できます。TypeScriptが各分岐で正しい型を推論してくれます。"
  },
  {
    day: 17,
    title: "Promiseと非同期処理",
    goal: "非同期関数に型を付ける方法を理解する",
    completion: "Promise<T> を返す関数が書ける",
    task: "APIから取得したデータの型を定義して取得関数を実装",
    phase: 3,
    sampleCode: `// 基本的なPromise型
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// async/await を使った非同期関数
async function greetAfterDelay(name: string, delayMs: number): Promise<string> {
  await delay(delayMs);
  return \`こんにちは、\${name}さん！\`;
}

// API レスポンスの型定義
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ユーザー取得API
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  
  if (!response.ok) {
    throw new Error(\`ユーザー取得エラー: \${response.status}\`);
  }
  
  const apiResponse: ApiResponse<User> = await response.json();
  
  if (!apiResponse.success) {
    throw new Error(apiResponse.message || "データ取得に失敗しました");
  }
  
  return apiResponse.data;
}

// ジェネリクスを使った汎用API関数
async function apiCall<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(\`API呼び出しエラー: \${response.status}\`);
  }
  
  return response.json();
}`,
    explanation: "Promise<T>型により非同期処理でも型安全性を保てます。async/awaitと組み合わせて堅牢な処理を実装しましょう。"
  },
  {
    day: 18,
    title: "Utility Types",
    goal: "Partial, Pick, Record の使い方を理解",
    completion: "Utility Typesを使って型を柔軟に変更できる",
    task: "User から一部のプロパティだけを抽出して使う",
    phase: 3,
    sampleCode: `// 基本のUser型
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

// Partial<T> - すべてのプロパティをオプショナルにする
type PartialUser = Partial<User>;

function updateUser(id: number, updates: PartialUser): void {
  console.log(\`ユーザー \${id} を更新:\`, updates);
}

updateUser(1, { name: "新しい名前" }); // nameだけ更新

// Pick<T, K> - 特定のプロパティのみを選択
type UserProfile = Pick<User, 'id' | 'name' | 'email'>;

function displayProfile(profile: UserProfile): void {
  console.log(\`\${profile.name} (\${profile.email})\`);
}

const profile: UserProfile = {
  id: 1,
  name: "田中太郎",
  email: "tanaka@example.com"
};

displayProfile(profile);

// Record<K, T> - キーと値の型を指定したオブジェクト型
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;

const roles: UserRoles = {
  "user1": "admin",
  "user2": "user",
  "user3": "guest"
};

// 実践的な組み合わせ例
type CreateUserRequest = Omit<User, 'id'>;
type UpdateUserRequest = Partial<Pick<User, 'name' | 'email' | 'age'>>;

function createUser(userData: CreateUserRequest): User {
  return {
    id: Math.floor(Math.random() * 1000),
    ...userData
  };
}`,
    explanation: "Utility Typesは既存の型から新しい型を生成する強力なツールです。実践的な場面で大活躍します。"
  },
  {
    day: 19,
    title: "API設計",
    goal: "フロントエンドの型安全なAPI呼び出しを設計する",
    completion: "fetchの戻り値に型を定義できる",
    task: "データ取得関数とレスポンス型を分けて記述",
    phase: 3,
    sampleCode: `// API レスポンスの基本型定義
interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

// ドメイン型の定義
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: 'admin' | 'user' | 'guest';
}

// 汎用的なHTTPクライアント
class HttpClient {
  private baseUrl: string;
  
  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }
  
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(\`\${this.baseUrl}\${url}\`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(\`API呼び出しエラー: \${response.status}\`);
    }
    
    return response.json();
  }
  
  async get<T>(url: string): Promise<T> {
    return this.request<T>(url);
  }
  
  async post<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

// API サービスクラス
class UserService {
  private client = new HttpClient();
  
  async getUsers(): Promise<User[]> {
    const response = await this.client.get<ApiResponse<User[]>>('/users');
    return response.data;
  }
  
  async getUserById(id: number): Promise<User> {
    const response = await this.client.get<ApiResponse<User>>(\`/users/\${id}\`);
    return response.data;
  }
  
  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await this.client.post<ApiResponse<User>>('/users', userData);
    return response.data;
  }
}

// 使用例
async function handleUserOperations(): Promise<void> {
  const userService = new UserService();
  
  try {
    const users = await userService.getUsers();
    console.log('ユーザーリスト:', users);
    
    const newUser = await userService.createUser({
      name: "新しいユーザー",
      email: "new@example.com",
      age: 25,
      role: "user"
    });
    console.log('作成されたユーザー:', newUser);
    
  } catch (error) {
    console.error('API エラー:', error);
  }
}`,
    explanation: "型安全なAPI設計により、フロントエンドとバックエンド間の通信エラーを大幅に削減できます。"
  },
  {
    day: 20,
    title: "総仕上げミニプロジェクト",
    goal: "TypeScriptの型システム全般を応用できる",
    completion: "型安全なフォームアプリを実装できる",
    task: "名前と年齢を入力して出力するTypeScript製アプリ",
    phase: 3,
    sampleCode: `// TypeScript フォームアプリケーション

// 1. ドメイン型定義
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

interface FormField<T> {
  value: T;
  rules: ValidationRule<T>[];
  errors: string[];
  touched: boolean;
}

// 2. バリデーション関数
const validationRules = {
  required: <T>(message = "必須項目です"): ValidationRule<T> => ({
    validate: (value: T): boolean => {
      if (typeof value === "string") return value.trim().length > 0;
      if (typeof value === "number") return !isNaN(value);
      return value != null;
    },
    message
  }),

  minLength: (min: number): ValidationRule<string> => ({
    validate: (value: string): boolean => value.trim().length >= min,
    message: \`\${min}文字以上で入力してください\`
  }),

  range: (min: number, max: number): ValidationRule<number> => ({
    validate: (value: number): boolean => value >= min && value <= max,
    message: \`\${min}から\${max}の間で入力してください\`
  })
};

// 3. フォーム管理クラス
class UserFormManager {
  private fields = {
    name: {
      value: "",
      rules: [validationRules.required(), validationRules.minLength(2)],
      errors: [] as string[],
      touched: false
    },
    age: {
      value: 0,
      rules: [validationRules.required(), validationRules.range(1, 120)],
      errors: [] as string[],
      touched: false
    },
    email: {
      value: "",
      rules: [validationRules.required()],
      errors: [] as string[],
      touched: false
    }
  };

  updateField(fieldName: keyof typeof this.fields, value: any): void {
    const field = this.fields[fieldName];
    field.value = value;
    field.touched = true;
    this.validateField(fieldName);
  }

  private validateField(fieldName: keyof typeof this.fields): boolean {
    const field = this.fields[fieldName];
    field.errors = [];

    for (const rule of field.rules) {
      if (!rule.validate(field.value)) {
        field.errors.push(rule.message);
      }
    }

    return field.errors.length === 0;
  }

  validateAll(): boolean {
    let isValid = true;
    for (const fieldName in this.fields) {
      const fieldValid = this.validateField(fieldName as keyof typeof this.fields);
      if (!fieldValid) isValid = false;
    }
    return isValid;
  }

  getFormData(): Omit<User, 'id'> {
    return {
      name: this.fields.name.value,
      age: this.fields.age.value,
      email: this.fields.email.value
    };
  }

  hasErrors(): boolean {
    return Object.values(this.fields).some(field => field.errors.length > 0);
  }
}

// 4. 使用例
const form = new UserFormManager();

// フォーム操作のシミュレーション
form.updateField('name', '田中太郎');
form.updateField('age', 30);
form.updateField('email', 'tanaka@example.com');

if (form.validateAll() && !form.hasErrors()) {
  const userData = form.getFormData();
  const user: User = {
    id: Date.now(),
    ...userData
  };
  console.log('作成されたユーザー:', user);
} else {
  console.log('バリデーションエラーがあります');
}`,
    explanation: "TypeScriptの型システムを活用して、型安全なフォームバリデーションシステムを構築できます。ジェネリクス、ユーティリティ型、クラスなど、学習した機能を総合的に応用しています。"
  }
]