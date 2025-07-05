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
  initialCode: `// Utility Typesを学ぼう
// TODO: User から一部のプロパティだけを抽出して使う

// 1. 基本的な型定義
// TypeScriptでは: interface User { id: string; name: string; email: string; age: number; isActive: boolean; createdAt: Date; }
// User構造: { id: string, name: string, email: string, age: number, isActive: boolean, createdAt: Date }

// 2. Partial<T> - すべてのプロパティをオプションにする
// TypeScriptでは: type PartialUser = Partial<User>;
// PartialUser構造: { id?: string, name?: string, email?: string, age?: number, isActive?: boolean, createdAt?: Date }

function updateUser(userId, updates) {
  console.log('ユーザー ' + userId + ' を更新:', updates);
}

// 3. Pick<T, K> - 特定のプロパティのみを抽出
// TypeScriptでは: type UserSummary = Pick<User, 'id' | 'name' | 'email'>;
// UserSummary構造: { id: string, name: string, email: string }

// TypeScriptでは: function displayUserSummary(user: UserSummary): string {
function displayUserSummary(user) {
  return user.name + ' (' + user.email + ')';
}

// 4. Omit<T, K> - 特定のプロパティを除外
// TypeScriptでは: type UserCreateInput = Omit<User, 'id' | 'createdAt'>;
// UserCreateInput構造: { name: string, email: string, age: number, isActive: boolean }

// TypeScriptでは: function createUser(input: UserCreateInput): User {
function createUser(input) {
  return {
    ...input,
    id: Math.random().toString(36),
    createdAt: new Date()
  };
}

// 5. Record<K, T> - 動的なキーを持つオブジェクト
// TypeScriptでは: type UserRole = 'admin' | 'editor' | 'viewer';
// TypeScriptでは: type RolePermissions = Record<UserRole, string[]>;
// RolePermissions構造: { admin: string[], editor: string[], viewer: string[] }

const permissions = {
  admin: ['read', 'write', 'delete'],
  editor: ['read', 'write'],
  viewer: ['read']
};

// TODO: getPermissions 関数を実装してください
// TypeScriptでは: function getPermissions(role: UserRole): string[] {
function getPermissions(role) {
  // permissions オブジェクトから指定されたロールの権限を返す
  return []; // この行を修正してください
}

// 6. Required<T> - すべてのプロパティを必須にする
// TypeScriptでは: interface OptionalConfig { apiUrl?: string; timeout?: number; }
// OptionalConfig構造: { apiUrl?: string, timeout?: number }

// TypeScriptでは: type RequiredConfig = Required<OptionalConfig>;
// RequiredConfig構造: { apiUrl: string, timeout: number }

// TODO: createApiClient 関数を実装してください
// TypeScriptでは: function createApiClient(config: RequiredConfig): string {
function createApiClient(config) {
  // config.apiUrl と config.timeout を使って文字列を返す
  return ""; // この行を修正してください
}

// 7. 使用例
// TypeScriptでは: const userUpdates: PartialUser = {
const userUpdates = {
  name: "佐藤花子",
  age: 25
};

updateUser("user123", userUpdates);

// TypeScriptでは: const userSummary: UserSummary = {
const userSummary = {
  id: "user123",
  name: "佐藤花子",
  email: "sato@example.com"
};

console.log(displayUserSummary(userSummary));

// TypeScriptでは: const createInput: UserCreateInput = {
const createInput = {
  name: "鈴木次郎",
  email: "suzuki@example.com",
  age: 28,
  isActive: true
};

const newUser = createUser(createInput);
console.log("新しいユーザー:", newUser);

console.log("管理者の権限:", getPermissions('admin'));
console.log("閲覧者の権限:", getPermissions('viewer'));

// TypeScriptでは: const config: RequiredConfig = {
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

console.log(createApiClient(config));`,
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
  explanation: "Utility Typesは既存の型を変換して新しい型を作る強力な機能です。Partial、Required、Pick、Omit、Record、Exclude、Extract、NonNullable、ReturnType、Parametersなど多様な変換が可能で、これらを組み合わることで柔軟で再利用可能な型定義が実現できます。フォームやAPI、コンポーネントの型定義において威力を発揮し、型安全性を保ちながらコードの保守性を大幅に向上させます。",

  // 演習機能追加
  exerciseCode: `// 演習: ユーザー管理システムを作成しよう
// Utility Typesを使って柔軟で型安全なユーザー管理システムを実装してください

// TODO: 1. 基本的なユーザー型を定義してください
// TypeScriptでは以下のようなインターフェースを定義
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   age: number;
//   role: 'admin' | 'user' | 'guest';
//   isActive: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   profile?: {
//     avatar?: string;
//     bio?: string;
//     location?: string;
//   };
// }

// JavaScriptでは型情報なしでユーザーオブジェクトを作成

// TODO: 2. Partial を使った更新機能を実装してください
function updateUser(userId, updates) {
  // TypeScriptでは: function updateUser(userId: string, updates: Partial<User>): User
  
  // 既存のユーザー情報を取得（モック）
  let existingUser = getUserById(userId);
  
  if (!existingUser) {
    throw new Error("ユーザーが見つかりません: " + userId);
  }
  
  // 部分的な更新を適用
  let updatedUser = {
    ...existingUser,
    ...updates,
    updatedAt: new Date()
  };
  
  console.log("ユーザー更新:", updatedUser.name);
  return updatedUser;
}

// TODO: 3. Pick を使った公開プロフィール機能を実装してください
function getPublicProfile(user) {
  // TypeScriptでは: function getPublicProfile(user: User): Pick<User, 'id' | 'name' | 'profile'>
  
  return {
    id: user.id,
    name: user.name,
    profile: user.profile || {}
  };
}

// TODO: 4. Omit を使った新規作成機能を実装してください
function createUser(userData) {
  // TypeScriptでは: function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User
  
  let newUser = {
    ...userData,
    id: "user_" + Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  console.log("新規ユーザー作成:", newUser.name);
  return newUser;
}

// TODO: 5. Record を使った権限管理システムを実装してください

// 権限の定義
let permissions = {
  admin: ["read", "write", "delete", "manage_users", "manage_system"],
  user: ["read", "write"],
  guest: ["read"]
};
// TypeScriptでは: const permissions: Record<'admin' | 'user' | 'guest', string[]>

// ユーザーの権限を確認する関数
function hasPermission(user, permission) {
  // TypeScriptでは: function hasPermission(user: User, permission: string): boolean
  
  let userPermissions = permissions[user.role] || [];
  return userPermissions.includes(permission);
}

// TODO: 6. Required を使った設定管理機能を実装してください

// オプションの設定
let defaultConfig = {
  theme: "light",
  language: "ja",
  notifications: true,
  autoSave: true
};
// TypeScriptでは: interface Config { theme?: string; language?: string; notifications?: boolean; autoSave?: boolean; }

// 設定を検証する関数
function validateConfig(config) {
  // TypeScriptでは: function validateConfig(config: Required<Config>): boolean
  
  let requiredFields = ["theme", "language", "notifications", "autoSave"];
  
  for (let field of requiredFields) {
    if (config[field] === undefined) {
      console.log("必須フィールドが不足:", field);
      return false;
    }
  }
  
  return true;
}

// TODO: 7. ユーザー検索・フィルタリング機能を実装してください

// ユーザー検索の条件
function searchUsers(users, criteria) {
  // TypeScriptでは: function searchUsers(users: User[], criteria: Partial<Pick<User, 'name' | 'email' | 'role' | 'isActive'>>): User[]
  
  return users.filter(user => {
    // 名前での検索
    if (criteria.name && !user.name.toLowerCase().includes(criteria.name.toLowerCase())) {
      return false;
    }
    
    // メールでの検索
    if (criteria.email && !user.email.toLowerCase().includes(criteria.email.toLowerCase())) {
      return false;
    }
    
    // ロールでの検索
    if (criteria.role && user.role !== criteria.role) {
      return false;
    }
    
    // アクティブ状態での検索
    if (criteria.isActive !== undefined && user.isActive !== criteria.isActive) {
      return false;
    }
    
    return true;
  });
}

// TODO: 8. 統計情報を計算する機能を実装してください

// ユーザー統計の型定義
// TypeScriptでは: interface UserStats { totalUsers: number; activeUsers: number; roleDistribution: Record<string, number>; }

function calculateUserStats(users) {
  // TypeScriptでは: function calculateUserStats(users: User[]): UserStats
  
  let stats = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.isActive).length,
    roleDistribution: {}
  };
  
  // ロール別の分布を計算
  users.forEach(user => {
    if (stats.roleDistribution[user.role]) {
      stats.roleDistribution[user.role]++;
    } else {
      stats.roleDistribution[user.role] = 1;
    }
  });
  
  return stats;
}

// TODO: 9. ユーザー管理クラスを実装してください

class UserManager {
  constructor() {
    this.users = [];
  }
  
  // ユーザー追加
  addUser(userData) {
    // TypeScriptでは: addUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User
    let newUser = createUser(userData);
    this.users.push(newUser);
    return newUser;
  }
  
  // ユーザー更新
  updateUser(userId, updates) {
    // TypeScriptでは: updateUser(userId: string, updates: Partial<User>): User | null
    let index = this.users.findIndex(user => user.id === userId);
    if (index === -1) {
      return null;
    }
    
    this.users[index] = updateUser(userId, updates);
    return this.users[index];
  }
  
  // ユーザー削除
  deleteUser(userId) {
    // TypeScriptでは: deleteUser(userId: string): boolean
    let index = this.users.findIndex(user => user.id === userId);
    if (index === -1) {
      return false;
    }
    
    this.users.splice(index, 1);
    return true;
  }
  
  // ユーザー検索
  searchUsers(criteria) {
    // TypeScriptでは: searchUsers(criteria: Partial<Pick<User, 'name' | 'email' | 'role' | 'isActive'>>): User[]
    return searchUsers(this.users, criteria);
  }
  
  // 統計情報取得
  getStats() {
    // TypeScriptでは: getStats(): UserStats
    return calculateUserStats(this.users);
  }
  
  // 全ユーザー取得
  getAllUsers() {
    // TypeScriptでは: getAllUsers(): User[]
    return [...this.users];
  }
  
  // 公開プロフィール取得
  getPublicProfile(userId) {
    // TypeScriptでは: getPublicProfile(userId: string): Pick<User, 'id' | 'name' | 'profile'> | null
    let user = this.users.find(user => user.id === userId);
    if (!user) {
      return null;
    }
    
    return getPublicProfile(user);
  }
}

// TODO: 10. ヘルパー関数を実装してください

// ユーザーを取得する関数（モック）
function getUserById(userId) {
  // TypeScriptでは: function getUserById(userId: string): User | null
  // 実際の実装では、データベースから取得
  let mockUsers = [
    {
      id: "user_001",
      name: "田中太郎",
      email: "tanaka@example.com",
      age: 30,
      role: "admin",
      isActive: true,
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2023-01-01"),
      profile: {
        avatar: "https://example.com/avatar1.jpg",
        bio: "システム管理者です",
        location: "東京"
      }
    },
    {
      id: "user_002",
      name: "佐藤花子",
      email: "sato@example.com",
      age: 25,
      role: "user",
      isActive: true,
      createdAt: new Date("2023-01-02"),
      updatedAt: new Date("2023-01-02")
    }
  ];
  
  return mockUsers.find(user => user.id === userId) || null;
}

// TODO: 11. 実装をテストしてください

console.log("=== Utility Types ユーザー管理システムテスト ===");

// UserManagerのテスト
let userManager = new UserManager();

// 新規ユーザー作成
console.log("\\n--- 新規ユーザー作成テスト ---");
let newUser1 = userManager.addUser({
  name: "鈴木次郎",
  email: "suzuki@example.com",
  age: 28,
  role: "user",
  isActive: true,
  profile: {
    bio: "フロントエンドエンジニアです"
  }
});

let newUser2 = userManager.addUser({
  name: "山田三郎",
  email: "yamada@example.com",
  age: 35,
  role: "admin",
  isActive: true
});

console.log("作成されたユーザー1:", newUser1.name);
console.log("作成されたユーザー2:", newUser2.name);

// ユーザー更新テスト
console.log("\\n--- ユーザー更新テスト ---");
let updatedUser = userManager.updateUser(newUser1.id, {
  age: 29,
  profile: {
    bio: "シニアフロントエンドエンジニアです",
    location: "大阪"
  }
});

if (updatedUser) {
  console.log("更新されたユーザー:", updatedUser.name, "年齢:", updatedUser.age);
}

// 検索テスト
console.log("\\n--- ユーザー検索テスト ---");
let adminUsers = userManager.searchUsers({ role: "admin" });
console.log("管理者ユーザー:", adminUsers.map(u => u.name));

let suzukiUsers = userManager.searchUsers({ name: "鈴木" });
console.log("鈴木を含むユーザー:", suzukiUsers.map(u => u.name));

// 統計情報テスト
console.log("\\n--- 統計情報テスト ---");
let stats = userManager.getStats();
console.log("統計情報:");
console.log("- 総ユーザー数:", stats.totalUsers);
console.log("- アクティブユーザー数:", stats.activeUsers);
console.log("- ロール分布:", stats.roleDistribution);

// 公開プロフィールテスト
console.log("\\n--- 公開プロフィールテスト ---");
let publicProfile = userManager.getPublicProfile(newUser1.id);
if (publicProfile) {
  console.log("公開プロフィール:", publicProfile.name);
  console.log("プロフィール情報:", publicProfile.profile);
}

// 権限テスト
console.log("\\n--- 権限管理テスト ---");
console.log("管理者の削除権限:", hasPermission(newUser2, "delete"));
console.log("一般ユーザーの削除権限:", hasPermission(newUser1, "delete"));

// 設定テスト
console.log("\\n--- 設定管理テスト ---");
let completeConfig = {
  theme: "dark",
  language: "en",
  notifications: false,
  autoSave: true
};

let incompleteConfig = {
  theme: "light",
  language: "ja"
};

console.log("完全な設定の検証:", validateConfig(completeConfig));
console.log("不完全な設定の検証:", validateConfig(incompleteConfig));

console.log("\\n=== すべてのテストが完了しました ===");`,

  exerciseHints: [
    "Partial<T>は全てのプロパティをオプションにします",
    "Pick<T, K>は特定のプロパティのみを選択します",
    "Omit<T, K>は特定のプロパティを除外します",
    "Record<K, T>は動的なキーを持つオブジェクトを定義します",
    "Required<T>は全てのプロパティを必須にします"
  ],

  testCases: [
    {
      id: "test1",
      description: "updateUser関数が正しく動作する",
      testFunction: "() => { let user = {id: '1', name: 'test', email: 'test@example.com', age: 30, role: 'user', isActive: true, createdAt: new Date(), updatedAt: new Date()}; let result = updateUser('1', {age: 31}); return result && result.age === 31; }"
    },
    {
      id: "test2",
      description: "getPublicProfile関数が正しく動作する",
      testFunction: "() => { let user = {id: '1', name: 'test', email: 'test@example.com', profile: {bio: 'test'}}; let result = getPublicProfile(user); return result && result.id === '1' && result.name === 'test' && !result.email; }"
    },
    {
      id: "test3",
      description: "hasPermission関数が正しく動作する",
      testFunction: "() => { let user = {role: 'admin'}; return hasPermission(user, 'delete') === true; }"
    },
    {
      id: "test4",
      description: "UserManagerクラスが正しく動作する",
      testFunction: "() => { let manager = new UserManager(); let user = manager.addUser({name: 'test', email: 'test@example.com', age: 30, role: 'user', isActive: true}); return manager.getAllUsers().length === 1 && user.name === 'test'; }"
    },
    {
      id: "test5",
      description: "searchUsers関数が正しく動作する",
      testFunction: "() => { let users = [{name: 'John', role: 'admin'}, {name: 'Jane', role: 'user'}]; let result = searchUsers(users, {role: 'admin'}); return result.length === 1 && result[0].name === 'John'; }"
    }
  ],

  exerciseDifficulty: 'hard'
} as const