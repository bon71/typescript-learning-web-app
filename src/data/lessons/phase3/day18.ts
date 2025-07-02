import type { LessonContent } from '@/types/content'

export const day18: LessonContent = {
  day: 18,
  title: "Utility Types",
  goal: "Partial, Pick, Record の使い方を理解",
  completion: "Utility Typesを使って型を柔軟に変更できる",
  task: "User から一部のプロパティだけを抽出して使う",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 30,
  tags: ['Utility Types', 'Partial', 'Pick', 'Record'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  hints: [
    "Utility Typesは既存の型を変換して新しい型を作る機能です",
    "Partialは全てのプロパティをオプションにし、Requiredは全てを必須にします",
    "PickとOmitは特定のプロパティを選択・除外する際に使用します",
    "Recordは動的なキーを持つオブジェクトの型を定義するのに便利です",
    "これらを組み合わせることで、非常に柔軟で再利用可能な型定義が可能になります"
  ],
  sampleCode: `// 基本的な型定義
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Partial<T> - すべてのプロパティをオプションにする
type PartialUser = Partial<User>;
// 結果: { id?: string; name?: string; email?: string; ... }

function updateUser(userId: string, updates: PartialUser): User {
  // 既存のユーザーデータを取得（模擬）
  const existingUser: User = {
    id: userId,
    name: "田中太郎",
    email: "tanaka@example.com",
    age: 30,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date()
  };

  // 一部のプロパティのみを更新
  return { ...existingUser, ...updates, updatedAt: new Date() };
}

// Required<T> - すべてのプロパティを必須にする
interface OptionalConfig {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

type RequiredConfig = Required<OptionalConfig>;
// 結果: { apiUrl: string; timeout: number; retries: number; }

function createApiClient(config: RequiredConfig): void {
  console.log(\`API URL: \${config.apiUrl}\`);
  console.log(\`Timeout: \${config.timeout}ms\`);
  console.log(\`Retries: \${config.retries}\`);
}

// Pick<T, K> - 特定のプロパティのみを抽出
type UserSummary = Pick<User, 'id' | 'name' | 'email'>;
// 結果: { id: string; name: string; email: string; }

type UserProfile = Pick<User, 'name' | 'email' | 'age'>;
// 結果: { name: string; email: string; age: number; }

function displayUserSummary(user: UserSummary): string {
  return \`\${user.name} (\${user.email})\`;
}

// Omit<T, K> - 特定のプロパティを除外
type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
// 結果: { name: string; email: string; age: number; isActive: boolean; }

type UserUpdateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
  id: string; // idは更新時に必要
};

function createUser(input: UserCreateInput): User {
  return {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

// Record<K, T> - 動的なキーを持つオブジェクト
type UserRole = 'admin' | 'editor' | 'viewer';
type RolePermissions = Record<UserRole, string[]>;

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete', 'manage'],
  editor: ['read', 'write'],
  viewer: ['read']
};

type StatusCodes = Record<number, string>;
const httpStatuses: StatusCodes = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not Found',
  500: 'Internal Server Error'
};

// Exclude<T, U> と Extract<T, U>
type AllColors = 'red' | 'green' | 'blue' | 'yellow' | 'purple';
type PrimaryColors = 'red' | 'green' | 'blue';

type SecondaryColors = Exclude<AllColors, PrimaryColors>;
// 結果: 'yellow' | 'purple'

type ExtractedPrimary = Extract<AllColors, PrimaryColors>;
// 結果: 'red' | 'green' | 'blue'

// NonNullable<T> - null と undefined を除外
type NullableString = string | null | undefined;
type NonNullableString = NonNullable<NullableString>;
// 結果: string

// ReturnType<T> - 関数の戻り値の型を取得
function getUser(): User {
  return {
    id: "1",
    name: "田中太郎",
    email: "tanaka@example.com",
    age: 30,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

type GetUserReturnType = ReturnType<typeof getUser>;
// 結果: User

// Parameters<T> - 関数の引数の型を取得
function updateUserProfile(id: string, name: string, email: string): void {
  console.log(\`Updating user \${id}\`);
}

type UpdateUserParams = Parameters<typeof updateUserProfile>;
// 結果: [string, string, string]

// より複雑な例：フォームの型定義
interface FormFieldConfig {
  type: 'text' | 'email' | 'password' | 'number' | 'checkbox';
  label: string;
  required: boolean;
  placeholder?: string;
  validation?: (value: any) => string | null;
}

type FormConfig = Record<string, FormFieldConfig>;

const userFormConfig: FormConfig = {
  name: {
    type: 'text',
    label: '名前',
    required: true,
    placeholder: '名前を入力してください'
  },
  email: {
    type: 'email',
    label: 'メールアドレス',
    required: true,
    placeholder: 'email@example.com'
  },
  age: {
    type: 'number',
    label: '年齢',
    required: false
  },
  isActive: {
    type: 'checkbox',
    label: 'アクティブ',
    required: false
  }
};

// フォームデータの型を動的に生成
type FormData<T extends FormConfig> = {
  [K in keyof T]: T[K]['type'] extends 'checkbox' 
    ? boolean 
    : T[K]['type'] extends 'number' 
      ? number 
      : string;
};

type UserFormData = FormData<typeof userFormConfig>;
// 結果: { name: string; email: string; age: number; isActive: boolean; }

// API レスポンスの型変換
interface ApiUser {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  age_years: number;
  is_active: boolean;
  created_timestamp: string;
  updated_timestamp: string;
}

// API レスポンスをアプリケーション内部の型に変換
type AppUser = {
  id: Pick<ApiUser, 'id'>['id'];
  name: string; // first_name + last_name
  email: ApiUser['email_address'];
  age: ApiUser['age_years'];
  isActive: ApiUser['is_active'];
  createdAt: Date;
  updatedAt: Date;
};

function transformApiUser(apiUser: ApiUser): AppUser {
  return {
    id: apiUser.id,
    name: \`\${apiUser.first_name} \${apiUser.last_name}\`,
    email: apiUser.email_address,
    age: apiUser.age_years,
    isActive: apiUser.is_active,
    createdAt: new Date(apiUser.created_timestamp),
    updatedAt: new Date(apiUser.updated_timestamp)
  };
}

// 実用例
const userUpdates: PartialUser = {
  name: "佐藤花子",
  age: 25
};

const updatedUser = updateUser("user123", userUpdates);
console.log(\`更新されたユーザー: \${updatedUser.name}\`);

const userSummary: UserSummary = {
  id: "user123",
  name: "佐藤花子",
  email: "sato@example.com"
};

console.log(displayUserSummary(userSummary));

const createInput: UserCreateInput = {
  name: "鈴木次郎",
  email: "suzuki@example.com",
  age: 28,
  isActive: true
};

const newUser = createUser(createInput);
console.log(\`新しいユーザーID: \${newUser.id}\`);

// ロールベースの権限チェック
function hasPermission(role: UserRole, permission: string): boolean {
  return permissions[role].includes(permission);
}

console.log(hasPermission('admin', 'delete')); // true
console.log(hasPermission('viewer', 'write')); // false`,
  explanation: "Utility Typesは既存の型を変換して新しい型を作る強力な機能です。Partial、Required、Pick、Omit、Record、Exclude、Extract、NonNullable、ReturnType、Parametersなど多様な変換が可能で、これらを組み合わることで柔軟で再利用可能な型定義が実現できます。フォームやAPI、コンポーネントの型定義において威力を発揮し、型安全性を保ちながらコードの保守性を大幅に向上させます。"
} as const