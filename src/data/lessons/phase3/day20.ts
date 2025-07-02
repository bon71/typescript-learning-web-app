import type { LessonContent } from '@/types/content'

export const day20: LessonContent = {
  day: 20,
  title: "総仕上げミニプロジェクト",
  goal: "TypeScriptの型システム全般を応用できる",
  completion: "型安全なフォームアプリを実装できる",
  task: "名前と年齢を入力して出力するTypeScript製APIアプリ（Playground上）",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 45,
  tags: ['総仕上げ', 'プロジェクト', 'フォーム', '実装'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  hints: [
    "これまで学習した全ての概念（ジェネリクス、型ガード、Utility Types等）を組み合わせて使用しましょう",
    "実際のフロントエンドアプリケーションを想定し、コンポーネント、状態管理、バリデーションを実装します",
    "型の再利用性と保守性を重視し、適切な抽象化レベルで設計を行います",
    "エラーハンドリングとユーザビリティを考慮した堅牢なアプリケーションを目指します",
    "このプロジェクトは実際の開発現場で役立つパターンとベストプラクティスを含んでいます"
  ],
  sampleCode: `// ===== 型定義 =====

// ユーザー関連の型
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  bio?: string;
  avatar?: string;
  skills: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// フォーム関連の型
interface FormField<T = string> {
  value: T;
  error?: string;
  touched: boolean;
  required: boolean;
}

interface UserFormData {
  name: FormField;
  email: FormField;
  age: FormField<number>;
  bio: FormField;
  skills: FormField<string[]>;
}

// バリデーション関連の型
type ValidationRule<T> = (value: T) => string | null;

interface ValidationRules<T> {
  [K in keyof T]?: ValidationRule<T[K]>[];
}

// API関連の型
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    field?: string;
  };
}

// アプリケーション状態の型
interface AppState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

// ===== ユーティリティ関数 =====

// バリデーションルール
const validationRules: ValidationRules<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>> = {
  name: [
    (value: string) => value.trim().length === 0 ? "名前は必須です" : null,
    (value: string) => value.length < 2 ? "名前は2文字以上で入力してください" : null,
    (value: string) => value.length > 50 ? "名前は50文字以内で入力してください" : null,
  ],
  email: [
    (value: string) => value.trim().length === 0 ? "メールアドレスは必須です" : null,
    (value: string) => {
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      return emailRegex.test(value) ? null : "有効なメールアドレスを入力してください";
    },
  ],
  age: [
    (value: number) => value < 0 ? "年齢は0以上で入力してください" : null,
    (value: number) => value > 150 ? "年齢は150以下で入力してください" : null,
  ],
  bio: [
    (value: string) => value.length > 500 ? "自己紹介は500文字以内で入力してください" : null,
  ],
  skills: [
    (value: string[]) => value.length === 0 ? "スキルを最低1つは入力してください" : null,
    (value: string[]) => value.length > 10 ? "スキルは10個まで登録できます" : null,
  ],
};

// 汎用バリデーション関数
function validateField<T>(value: T, rules: ValidationRule<T>[]): string | null {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
}

// フォームの初期状態を生成
function createInitialFormState(): UserFormData {
  return {
    name: { value: '', touched: false, required: true },
    email: { value: '', touched: false, required: true },
    age: { value: 0, touched: false, required: true },
    bio: { value: '', touched: false, required: false },
    skills: { value: [], touched: false, required: true },
  };
}

// ===== API シミュレーション =====

class UserApi {
  private users: User[] = [
    {
      id: '1',
      name: '田中太郎',
      email: 'tanaka@example.com',
      age: 30,
      bio: 'フロントエンドエンジニアです',
      skills: ['TypeScript', 'React', 'Node.js'],
      isActive: true,
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    {
      id: '2',
      name: '佐藤花子',
      email: 'sato@example.com',
      age: 28,
      bio: 'バックエンドエンジニアです',
      skills: ['TypeScript', 'Python', 'PostgreSQL'],
      isActive: true,
      createdAt: new Date('2023-01-02'),
      updatedAt: new Date('2023-01-02'),
    },
  ];

  async getUsers(): Promise<ApiResponse<User[]>> {
    await this.delay(500);
    return {
      success: true,
      data: [...this.users],
    };
  }

  async getUser(id: string): Promise<ApiResponse<User> | ApiError> {
    await this.delay(300);
    const user = this.users.find(u => u.id === id);
    
    if (!user) {
      return {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'ユーザーが見つかりません',
        },
      };
    }

    return {
      success: true,
      data: user,
    };
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<ApiResponse<User> | ApiError> {
    await this.delay(800);

    // メールアドレスの重複チェック
    if (this.users.some(u => u.email === userData.email)) {
      return {
        success: false,
        error: {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'このメールアドレスは既に使用されています',
          field: 'email',
        },
      };
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);

    return {
      success: true,
      data: newUser,
    };
  }

  async updateUser(id: string, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ApiResponse<User> | ApiError> {
    await this.delay(600);

    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'ユーザーが見つかりません',
        },
      };
    }

    const updatedUser: User = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;

    return {
      success: true,
      data: updatedUser,
    };
  }

  async deleteUser(id: string): Promise<ApiResponse<void> | ApiError> {
    await this.delay(400);

    const userIndex = this.users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'ユーザーが見つかりません',
        },
      };
    }

    this.users.splice(userIndex, 1);

    return {
      success: true,
      data: undefined as any,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ===== 状態管理 =====

class AppStateManager {
  private state: AppState = {
    users: [],
    currentUser: null,
    isLoading: false,
    error: null,
  };

  private listeners: Set<(state: AppState) => void> = new Set();

  getState(): AppState {
    return { ...this.state };
  }

  setState(partial: Partial<AppState>): void {
    this.state = { ...this.state, ...partial };
    this.notifyListeners();
  }

  subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// ===== フォーム管理 =====

class UserFormManager {
  private formData: UserFormData;
  private listeners: Set<(formData: UserFormData) => void> = new Set();

  constructor() {
    this.formData = createInitialFormState();
  }

  getFormData(): UserFormData {
    return JSON.parse(JSON.stringify(this.formData));
  }

  updateField<K extends keyof UserFormData>(
    fieldName: K,
    value: UserFormData[K]['value']
  ): void {
    this.formData[fieldName] = {
      ...this.formData[fieldName],
      value,
      touched: true,
      error: this.validateFieldValue(fieldName, value),
    };
    this.notifyListeners();
  }

  validateForm(): boolean {
    let isValid = true;

    (Object.keys(this.formData) as Array<keyof UserFormData>).forEach(fieldName => {
      const field = this.formData[fieldName];
      const error = this.validateFieldValue(fieldName, field.value);
      
      this.formData[fieldName] = {
        ...field,
        touched: true,
        error,
      };

      if (error && field.required) {
        isValid = false;
      }
    });

    this.notifyListeners();
    return isValid;
  }

  private validateFieldValue<K extends keyof UserFormData>(
    fieldName: K,
    value: UserFormData[K]['value']
  ): string | null {
    const rules = validationRules[fieldName as keyof typeof validationRules];
    if (!rules) return null;

    return validateField(value as any, rules as any);
  }

  reset(): void {
    this.formData = createInitialFormState();
    this.notifyListeners();
  }

  subscribe(listener: (formData: UserFormData) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.formData));
  }
}

// ===== メインアプリケーション =====

class UserManagementApp {
  private api: UserApi;
  private stateManager: AppStateManager;
  private formManager: UserFormManager;

  constructor() {
    this.api = new UserApi();
    this.stateManager = new AppStateManager();
    this.formManager = new UserFormManager();
    
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.loadUsers();
    this.setupEventListeners();
    this.render();
  }

  private async loadUsers(): Promise<void> {
    try {
      this.stateManager.setState({ isLoading: true, error: null });
      const response = await this.api.getUsers();
      
      if (response.success) {
        this.stateManager.setState({ 
          users: response.data, 
          isLoading: false 
        });
      }
    } catch (error) {
      this.stateManager.setState({ 
        error: 'ユーザーの読み込みに失敗しました',
        isLoading: false 
      });
    }
  }

  private setupEventListeners(): void {
    this.stateManager.subscribe((state) => {
      this.renderUserList(state.users);
      this.renderLoadingState(state.isLoading);
      this.renderError(state.error);
    });

    this.formManager.subscribe((formData) => {
      this.renderForm(formData);
    });
  }

  private async handleCreateUser(): Promise<void> {
    if (!this.formManager.validateForm()) {
      console.log('フォームにエラーがあります');
      return;
    }

    const formData = this.formManager.getFormData();
    const userData = {
      name: formData.name.value,
      email: formData.email.value,
      age: formData.age.value,
      bio: formData.bio.value,
      skills: formData.skills.value,
    };

    try {
      this.stateManager.setState({ isLoading: true });
      const response = await this.api.createUser(userData);

      if (response.success) {
        console.log('ユーザーを作成しました:', response.data);
        this.formManager.reset();
        await this.loadUsers();
      } else {
        console.error('ユーザー作成エラー:', response.error.message);
        this.stateManager.setState({ 
          error: response.error.message,
          isLoading: false 
        });
      }
    } catch (error) {
      this.stateManager.setState({ 
        error: 'ユーザーの作成に失敗しました',
        isLoading: false 
      });
    }
  }

  private async handleDeleteUser(userId: string): Promise<void> {
    if (!confirm('このユーザーを削除しますか？')) {
      return;
    }

    try {
      this.stateManager.setState({ isLoading: true });
      const response = await this.api.deleteUser(userId);

      if (response.success) {
        console.log('ユーザーを削除しました');
        await this.loadUsers();
      } else {
        console.error('ユーザー削除エラー:', response.error.message);
        this.stateManager.setState({ 
          error: response.error.message,
          isLoading: false 
        });
      }
    } catch (error) {
      this.stateManager.setState({ 
        error: 'ユーザーの削除に失敗しました',
        isLoading: false 
      });
    }
  }

  private render(): void {
    const state = this.stateManager.getState();
    const formData = this.formManager.getFormData();

    console.log('=== TypeScript ユーザー管理アプリ ===');
    this.renderForm(formData);
    this.renderUserList(state.users);
    this.renderLoadingState(state.isLoading);
    this.renderError(state.error);
  }

  private renderForm(formData: UserFormData): void {
    console.log('\\n--- ユーザー作成フォーム ---');
    
    Object.entries(formData).forEach(([key, field]) => {
      const fieldName = key as keyof UserFormData;
      const displayValue = Array.isArray(field.value) 
        ? field.value.join(', ') 
        : field.value;
      
      console.log(\`\${fieldName}: \${displayValue}\`);
      
      if (field.error && field.touched) {
        console.log(\`  エラー: \${field.error}\`);
      }
    });
  }

  private renderUserList(users: User[]): void {
    console.log('\\n--- ユーザー一覧 ---');
    
    if (users.length === 0) {
      console.log('ユーザーがいません');
      return;
    }

    users.forEach((user, index) => {
      console.log(\`\${index + 1}. \${user.name} (\${user.email})\`);
      console.log(\`   年齢: \${user.age}, スキル: \${user.skills.join(', ')}\`);
      if (user.bio) {
        console.log(\`   自己紹介: \${user.bio}\`);
      }
    });
  }

  private renderLoadingState(isLoading: boolean): void {
    if (isLoading) {
      console.log('\\n読み込み中...');
    }
  }

  private renderError(error: string | null): void {
    if (error) {
      console.log(\`\\nエラー: \${error}\`);
    }
  }

  // パブリックAPI（デモ用）
  async createSampleUser(): Promise<void> {
    this.formManager.updateField('name', '鈴木次郎');
    this.formManager.updateField('email', 'suzuki@example.com');
    this.formManager.updateField('age', 32);
    this.formManager.updateField('bio', 'フルスタックエンジニアです');
    this.formManager.updateField('skills', ['TypeScript', 'React', 'Express', 'MongoDB']);
    
    await this.handleCreateUser();
  }

  async deleteSampleUser(): Promise<void> {
    const state = this.stateManager.getState();
    if (state.users.length > 0) {
      await this.handleDeleteUser(state.users[0].id);
    }
  }

  updateFormField<K extends keyof UserFormData>(
    fieldName: K,
    value: UserFormData[K]['value']
  ): void {
    this.formManager.updateField(fieldName, value);
  }
}

// ===== アプリケーション実行 =====

// アプリケーションのインスタンスを作成
const app = new UserManagementApp();

// デモ用の操作を実行
setTimeout(async () => {
  console.log('\\n=== デモ操作を開始 ===');
  
  // サンプルユーザーを作成
  await app.createSampleUser();
  
  console.log('\\n3秒後にユーザーを削除します...');
  setTimeout(async () => {
    await app.deleteSampleUser();
  }, 3000);
}, 2000);

// 手動でフォームを操作する場合の例
// app.updateFormField('name', '新しいユーザー');
// app.updateFormField('email', 'newuser@example.com');

console.log('\\nTypeScript ユーザー管理アプリが正常に起動しました！');
console.log('このアプリでは以下の機能を型安全に実装しています:');
console.log('- ジェネリクスを使った汎用的なAPI型定義');
console.log('- 型ガードによるランタイム型チェック');
console.log('- Utility Typesを使った柔軟な型変換');
console.log('- interfaceとクラスを使ったオブジェクト指向設計');
console.log('- Promise/async-awaitによる非同期処理');
console.log('- Union型とLiteral型による堅牢なエラーハンドリング');`,
  explanation: "この総仕上げプロジェクトでは、TypeScriptの主要機能を統合した実用的なユーザー管理アプリケーションを実装しています。ジェネリクス、型ガード、Utility Types、interface、クラス、Promise、Union型など、これまで学習した全ての概念を組み合わせて使用します。実際のフロントエンドアプリケーション開発で必要な状態管理、フォーム処理、API通信、バリデーション、エラーハンドリングを型安全に実装する方法を学べます。"
} as const