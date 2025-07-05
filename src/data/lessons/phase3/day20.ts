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
  initialCode: `// 総仕上げミニプロジェクト
// TODO: 名前と年齢を入力して出力するTypeScript製APIアプリ（Playground上）

// ===== 基本的な型定義 =====

// ユーザー情報の型
// TypeScriptでは: interface User { id: string; name: string; age: number; email?: string; createdAt: Date; }
// User構造: { id: string, name: string, age: number, email?: string, createdAt: Date }

// フォームデータの型
// TypeScriptでは: interface UserFormData { name: string; age: number; email?: string; }
// UserFormData構造: { name: string, age: number, email?: string }

// API レスポンスの型
// TypeScriptでは: interface ApiResponse<T> { success: boolean; data: T; message?: string; }
// ApiResponse構造: { success: boolean, data: any, message?: string }

// ===== バリデーション機能 =====

// バリデーションルールの型
// TypeScriptでは: type ValidationRule<T> = (value: T) => string | null;
// ValidationRule構造: (value: any) => string | null

// バリデーション関数
// TypeScriptでは: function validateName(name: string): string | null {
function validateName(name) {
  if (name.trim().length === 0) return "名前は必須です";
  if (name.length < 2) return "名前は2文字以上で入力してください";
  return null;
}

// TypeScriptでは: function validateAge(age: number): string | null {
function validateAge(age) {
  if (age < 0) return "年齢は0以上で入力してください";
  if (age > 150) return "年齢は150以下で入力してください";
  return null;
}

// TypeScriptでは: function validateEmail(email?: string): string | null {
function validateEmail(email) {
  if (!email) return null; // オプショナルなのでOK
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email) ? null : "有効なメールアドレスを入力してください";
}

// ===== User管理クラス =====

class UserManager {
  constructor() {
    // TypeScriptでは: private users: User[] = [];
    this.users = [];
    // TypeScriptでは: private nextId: number = 1;
    this.nextId = 1;
  }

  // TODO: ユーザーを追加するメソッドを実装してください
  // TypeScriptでは: addUser(formData: UserFormData): ApiResponse<User> {
  addUser(formData) {
    // 1. バリデーションを実行
    const nameError = validateName(formData.name);
    const ageError = validateAge(formData.age);
    const emailError = validateEmail(formData.email);

    // エラーがある場合はエラーレスポンスを返す
    if (nameError || ageError || emailError) {
      return {
        success: false,
        data: {} as User, // 型を満たすためのダミー
        message: nameError || ageError || emailError || "バリデーションエラー"
      };
    }

    // 2. 新しいユーザーを作成
    // TypeScriptでは: const newUser: User = {
    const newUser = {
      id: this.nextId.toString(),
      name: formData.name,
      age: formData.age,
      email: formData.email,
      createdAt: new Date()
    };

    // 3. ユーザーリストに追加
    this.users.push(newUser);
    this.nextId++;

    return {
      success: true,
      data: newUser,
      message: "ユーザーを正常に作成しました"
    };
  }

  // TODO: 全ユーザーを取得するメソッドを実装してください
  // TypeScriptでは: getAllUsers(): ApiResponse<User[]> {
  getAllUsers() {
    return {
      success: true,
      data: [...this.users], // 配列のコピーを返す
      message: \`\${this.users.length}人のユーザーが見つかりました\`
    };
  }

  // TODO: IDでユーザーを検索するメソッドを実装してください
  // TypeScriptでは: getUserById(id: string): ApiResponse<User> | null {
  getUserById(id) {
    const user = this.users.find(u => u.id === id);
    
    if (!user) {
      return null;
    }

    return {
      success: true,
      data: user,
      message: "ユーザーが見つかりました"
    };
  }
}

// ===== フォーム処理クラス =====

class UserForm {
  constructor() {
    // TypeScriptでは: private formData: UserFormData = {
    this.formData = {
      name: "",
      age: 0,
      email: ""
    };
  }

  // フォームデータを更新
  // TypeScriptでは: updateField<K extends keyof UserFormData>(field: K, value: UserFormData[K]): void {
  updateField(field, value) {
    this.formData[field] = value;
  }

  // フォームデータを取得
  // TypeScriptでは: getFormData(): UserFormData {
  getFormData() {
    return { ...this.formData };
  }

  // フォームをリセット
  // TypeScriptでは: reset(): void {
  reset() {
    this.formData = {
      name: "",
      age: 0,
      email: ""
    };
  }

  // フォームの全体バリデーション
  // TypeScriptでは: validate(): string[] {
  validate() {
    // TypeScriptでは: const errors: string[] = [];
    const errors = [];
    
    const nameError = validateName(this.formData.name);
    const ageError = validateAge(this.formData.age);
    const emailError = validateEmail(this.formData.email);

    if (nameError) errors.push(nameError);
    if (ageError) errors.push(ageError);
    if (emailError) errors.push(emailError);

    return errors;
  }
}

// ===== メインアプリケーション =====

class UserApp {
  constructor() {
    // TypeScriptでは: private userManager: UserManager;
    // TypeScriptでは: private userForm: UserForm;
    this.userManager = new UserManager();
    this.userForm = new UserForm();
  }

  // ユーザー作成のデモ
  // TypeScriptでは: async createUserDemo(): Promise<void> {
  async createUserDemo() {
    console.log("=== ユーザー作成デモ ===");

    // フォームにサンプルデータを設定
    this.userForm.updateField("name", "田中太郎");
    this.userForm.updateField("age", 30);
    this.userForm.updateField("email", "tanaka@example.com");

    // バリデーション
    const errors = this.userForm.validate();
    if (errors.length > 0) {
      console.log("バリデーションエラー:", errors);
      return;
    }

    // ユーザー作成
    const result = this.userManager.addUser(this.userForm.getFormData());
    
    if (result.success) {
      console.log("✅ 成功:", result.message);
      console.log("作成されたユーザー:", result.data);
    } else {
      console.log("❌ エラー:", result.message);
    }

    this.userForm.reset();
  }

  // 全ユーザー表示のデモ
  // TypeScriptでは: displayAllUsers(): void {
  displayAllUsers() {
    console.log("\\n=== 全ユーザー一覧 ===");
    
    const result = this.userManager.getAllUsers();
    
    if (result.success && result.data.length > 0) {
      result.data.forEach((user, index) => {
        console.log(\`\${index + 1}. \${user.name} (年齢: \${user.age})\`);
        if (user.email) {
          console.log(\`   メール: \${user.email}\`);
        }
        console.log(\`   作成日時: \${user.createdAt.toLocaleString()}\`);
      });
    } else {
      console.log("ユーザーが見つかりません");
    }
  }

  // TODO: 複数のユーザーを作成するメソッドを実装してください
  // TypeScriptでは: async createMultipleUsers(): Promise<void> {
  async createMultipleUsers() {
    console.log("\\n=== 複数ユーザー作成デモ ===");
    
    // TypeScriptでは: const sampleUsers: UserFormData[] = [
    const sampleUsers = [
      { name: "佐藤花子", age: 25, email: "sato@example.com" },
      { name: "鈴木次郎", age: 32, email: "suzuki@example.com" },
      { name: "田中三郎", age: 28 } // メールなし
    ];

    for (const userData of sampleUsers) {
      this.userForm.updateField("name", userData.name);
      this.userForm.updateField("age", userData.age);
      this.userForm.updateField("email", userData.email || "");

      const result = this.userManager.addUser(this.userForm.getFormData());
      
      if (result.success) {
        console.log(\`✅ \${userData.name} を作成しました\`);
      } else {
        console.log(\`❌ \${userData.name} の作成に失敗: \${result.message}\`);
      }

      this.userForm.reset();
    }
  }
}

// ===== アプリケーション実行 =====

async function main() {
  console.log("🚀 TypeScript ユーザー管理アプリを開始します！\\n");

  const app = new UserApp();

  // デモの実行
  await app.createUserDemo();
  app.displayAllUsers();
  
  await app.createMultipleUsers();
  app.displayAllUsers();

  console.log("\\n✨ デモが完了しました！");
  console.log("このアプリで学習した内容:");
  console.log("- 型安全なクラス設計");
  console.log("- ジェネリクスを使った API レスポンス型");
  console.log("- バリデーション機能の実装");
  console.log("- インターフェースとタイプエイリアス");
  console.log("- Union型とLiteral型");
  console.log("- 実践的なTypeScriptアプリケーション構造");
}

// アプリケーションを実行
main().catch(console.error);`,
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
  explanation: "この総仕上げプロジェクトでは、TypeScriptの主要機能を統合した実用的なユーザー管理アプリケーションを実装しています。ジェネリクス、型ガード、Utility Types、interface、クラス、Promise、Union型など、これまで学習した全ての概念を組み合わせて使用します。実際のフロントエンドアプリケーション開発で必要な状態管理、フォーム処理、API通信、バリデーション、エラーハンドリングを型安全に実装する方法を学べます。",

  // 演習機能追加
  exerciseCode: `// 総仕上げ演習: 完全な在庫管理システムを作成しよう
// これまで学習したTypeScriptの全ての機能を組み合わせて、実用的なアプリケーションを実装してください

// TODO: 1. 基本的な型定義を作成してください

// 商品の型
// TypeScriptでは以下のような定義
// interface Product { id: string; name: string; category: string; price: number; stock: number; description?: string; supplier: string; createdAt: Date; updatedAt: Date; }

// 在庫移動の型
// TypeScriptでは以下のような定義
// interface StockMovement { id: string; productId: string; type: 'in' | 'out' | 'adjustment'; quantity: number; reason: string; userId: string; timestamp: Date; }

// ユーザーの型
// TypeScriptでは以下のような定義
// interface User { id: string; name: string; email: string; role: 'admin' | 'manager' | 'staff'; isActive: boolean; createdAt: Date; }

// API レスポンスの型
// TypeScriptでは以下のような定義
// interface ApiResponse<T> { success: boolean; data: T; message?: string; errors?: string[]; }

// TODO: 2. バリデーション機能を実装してください

// バリデーションルールの型
// TypeScriptでは: type ValidationRule<T> = (value: T) => string | null;

// 商品名のバリデーション
function validateProductName(name) {
  // TypeScriptでは: function validateProductName(name: string): string | null
  if (!name || name.trim().length === 0) {
    return "商品名は必須です";
  }
  if (name.length < 2) {
    return "商品名は2文字以上で入力してください";
  }
  if (name.length > 100) {
    return "商品名は100文字以内で入力してください";
  }
  return null;
}

// 価格のバリデーション
function validatePrice(price) {
  // TypeScriptでは: function validatePrice(price: number): string | null
  if (price < 0) {
    return "価格は0以上で入力してください";
  }
  if (price > 1000000) {
    return "価格は1,000,000円以下で入力してください";
  }
  return null;
}

// 在庫数のバリデーション
function validateStock(stock) {
  // TypeScriptでは: function validateStock(stock: number): string | null
  if (stock < 0) {
    return "在庫数は0以上で入力してください";
  }
  if (!Number.isInteger(stock)) {
    return "在庫数は整数で入力してください";
  }
  return null;
}

// TODO: 3. 商品管理クラスを実装してください

class ProductManager {
  constructor() {
    // TypeScriptでは: private products: Product[] = [];
    this.products = [];
    // TypeScriptでは: private nextId: number = 1;
    this.nextId = 1;
  }
  
  // 商品を追加
  addProduct(productData) {
    // TypeScriptでは: addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): ApiResponse<Product>
    
    // バリデーション
    let nameError = validateProductName(productData.name);
    let priceError = validatePrice(productData.price);
    let stockError = validateStock(productData.stock);
    
    if (nameError || priceError || stockError) {
      return {
        success: false,
        data: null,
        message: "バリデーションエラーが発生しました",
        errors: [nameError, priceError, stockError].filter(Boolean)
      };
    }
    
    // 商品名の重複チェック
    if (this.products.some(p => p.name === productData.name)) {
      return {
        success: false,
        data: null,
        message: "この商品名は既に使用されています"
      };
    }
    
    // 新しい商品を作成
    let newProduct = {
      id: "PROD_" + this.nextId.toString().padStart(4, '0'),
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.products.push(newProduct);
    this.nextId++;
    
    return {
      success: true,
      data: newProduct,
      message: "商品を正常に追加しました"
    };
  }
  
  // 商品を更新
  updateProduct(productId, updateData) {
    // TypeScriptでは: updateProduct(productId: string, updateData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): ApiResponse<Product>
    
    let productIndex = this.products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      return {
        success: false,
        data: null,
        message: "商品が見つかりません"
      };
    }
    
    // バリデーション（更新されるフィールドのみ）
    let errors = [];
    if (updateData.name !== undefined) {
      let nameError = validateProductName(updateData.name);
      if (nameError) errors.push(nameError);
    }
    if (updateData.price !== undefined) {
      let priceError = validatePrice(updateData.price);
      if (priceError) errors.push(priceError);
    }
    if (updateData.stock !== undefined) {
      let stockError = validateStock(updateData.stock);
      if (stockError) errors.push(stockError);
    }
    
    if (errors.length > 0) {
      return {
        success: false,
        data: null,
        message: "バリデーションエラーが発生しました",
        errors: errors
      };
    }
    
    // 商品を更新
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateData,
      updatedAt: new Date()
    };
    
    return {
      success: true,
      data: this.products[productIndex],
      message: "商品を正常に更新しました"
    };
  }
  
  // 商品を検索
  searchProducts(criteria) {
    // TypeScriptでは: searchProducts(criteria: { name?: string; category?: string; minPrice?: number; maxPrice?: number; }): Product[]
    
    return this.products.filter(product => {
      // 名前での検索
      if (criteria.name && !product.name.toLowerCase().includes(criteria.name.toLowerCase())) {
        return false;
      }
      
      // カテゴリでの検索
      if (criteria.category && product.category !== criteria.category) {
        return false;
      }
      
      // 価格範囲での検索
      if (criteria.minPrice !== undefined && product.price < criteria.minPrice) {
        return false;
      }
      if (criteria.maxPrice !== undefined && product.price > criteria.maxPrice) {
        return false;
      }
      
      return true;
    });
  }
  
  // 全商品を取得
  getAllProducts() {
    // TypeScriptでは: getAllProducts(): Product[]
    return [...this.products];
  }
  
  // 商品を削除
  deleteProduct(productId) {
    // TypeScriptでは: deleteProduct(productId: string): ApiResponse<void>
    let productIndex = this.products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      return {
        success: false,
        data: null,
        message: "商品が見つかりません"
      };
    }
    
    this.products.splice(productIndex, 1);
    
    return {
      success: true,
      data: null,
      message: "商品を正常に削除しました"
    };
  }
}

// TODO: 4. 在庫移動管理クラスを実装してください

class StockMovementManager {
  constructor(productManager) {
    // TypeScriptでは: constructor(private productManager: ProductManager)
    this.productManager = productManager;
    // TypeScriptでは: private movements: StockMovement[] = [];
    this.movements = [];
    // TypeScriptでは: private nextId: number = 1;
    this.nextId = 1;
  }
  
  // 入庫処理
  stockIn(productId, quantity, reason, userId) {
    // TypeScriptでは: stockIn(productId: string, quantity: number, reason: string, userId: string): ApiResponse<StockMovement>
    return this.processStockMovement(productId, 'in', quantity, reason, userId);
  }
  
  // 出庫処理
  stockOut(productId, quantity, reason, userId) {
    // TypeScriptでは: stockOut(productId: string, quantity: number, reason: string, userId: string): ApiResponse<StockMovement>
    
    // 在庫チェック
    let products = this.productManager.getAllProducts();
    let product = products.find(p => p.id === productId);
    
    if (!product) {
      return {
        success: false,
        data: null,
        message: "商品が見つかりません"
      };
    }
    
    if (product.stock < quantity) {
      return {
        success: false,
        data: null,
        message: "在庫が不足しています（現在の在庫: " + product.stock + "）"
      };
    }
    
    return this.processStockMovement(productId, 'out', quantity, reason, userId);
  }
  
  // 在庫調整
  stockAdjustment(productId, newStock, reason, userId) {
    // TypeScriptでは: stockAdjustment(productId: string, newStock: number, reason: string, userId: string): ApiResponse<StockMovement>
    
    let products = this.productManager.getAllProducts();
    let product = products.find(p => p.id === productId);
    
    if (!product) {
      return {
        success: false,
        data: null,
        message: "商品が見つかりません"
      };
    }
    
    let adjustmentQuantity = newStock - product.stock;
    
    // 在庫を直接更新
    let updateResult = this.productManager.updateProduct(productId, { stock: newStock });
    if (!updateResult.success) {
      return updateResult;
    }
    
    // 移動記録を作成
    let movement = {
      id: "MOV_" + this.nextId.toString().padStart(6, '0'),
      productId: productId,
      type: 'adjustment',
      quantity: adjustmentQuantity,
      reason: reason,
      userId: userId,
      timestamp: new Date()
    };
    
    this.movements.push(movement);
    this.nextId++;
    
    return {
      success: true,
      data: movement,
      message: "在庫を調整しました"
    };
  }
  
  // 在庫移動処理の共通ロジック
  processStockMovement(productId, type, quantity, reason, userId) {
    // TypeScriptでは: private processStockMovement(productId: string, type: 'in' | 'out', quantity: number, reason: string, userId: string): ApiResponse<StockMovement>
    
    if (quantity <= 0) {
      return {
        success: false,
        data: null,
        message: "数量は1以上で入力してください"
      };
    }
    
    // 商品の在庫を更新
    let products = this.productManager.getAllProducts();
    let product = products.find(p => p.id === productId);
    
    if (!product) {
      return {
        success: false,
        data: null,
        message: "商品が見つかりません"
      };
    }
    
    let newStock = type === 'in' ? product.stock + quantity : product.stock - quantity;
    let updateResult = this.productManager.updateProduct(productId, { stock: newStock });
    
    if (!updateResult.success) {
      return updateResult;
    }
    
    // 移動記録を作成
    let movement = {
      id: "MOV_" + this.nextId.toString().padStart(6, '0'),
      productId: productId,
      type: type,
      quantity: quantity,
      reason: reason,
      userId: userId,
      timestamp: new Date()
    };
    
    this.movements.push(movement);
    this.nextId++;
    
    return {
      success: true,
      data: movement,
      message: type === 'in' ? "入庫処理が完了しました" : "出庫処理が完了しました"
    };
  }
  
  // 在庫移動履歴を取得
  getMovementHistory(productId, limit = 50) {
    // TypeScriptでは: getMovementHistory(productId?: string, limit: number = 50): StockMovement[]
    
    let filteredMovements = productId 
      ? this.movements.filter(m => m.productId === productId)
      : this.movements;
    
    return filteredMovements
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
}

// TODO: 5. レポート生成クラスを実装してください

class ReportGenerator {
  constructor(productManager, stockMovementManager) {
    // TypeScriptでは: constructor(private productManager: ProductManager, private stockMovementManager: StockMovementManager)
    this.productManager = productManager;
    this.stockMovementManager = stockMovementManager;
  }
  
  // 在庫状況レポート
  generateStockReport() {
    // TypeScriptでは: generateStockReport(): { summary: any; lowStockItems: Product[]; highValueItems: Product[]; }
    
    let products = this.productManager.getAllProducts();
    
    // 基本統計
    let totalProducts = products.length;
    let totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    let avgPrice = totalProducts > 0 ? totalValue / totalProducts : 0;
    
    // カテゴリ別統計
    let categoryStats = {};
    products.forEach(product => {
      if (!categoryStats[product.category]) {
        categoryStats[product.category] = {
          count: 0,
          totalValue: 0,
          totalStock: 0
        };
      }
      categoryStats[product.category].count++;
      categoryStats[product.category].totalValue += product.price * product.stock;
      categoryStats[product.category].totalStock += product.stock;
    });
    
    // 低在庫商品（在庫10個以下）
    let lowStockItems = products.filter(p => p.stock <= 10);
    
    // 高額商品（価格10,000円以上）
    let highValueItems = products.filter(p => p.price >= 10000);
    
    return {
      summary: {
        totalProducts: totalProducts,
        totalValue: Math.round(totalValue),
        averagePrice: Math.round(avgPrice),
        categoryStats: categoryStats
      },
      lowStockItems: lowStockItems,
      highValueItems: highValueItems
    };
  }
  
  // 移動履歴レポート
  generateMovementReport(days = 7) {
    // TypeScriptでは: generateMovementReport(days: number = 7): { summary: any; recentMovements: StockMovement[]; }
    
    let cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    let recentMovements = this.stockMovementManager.getMovementHistory()
      .filter(m => m.timestamp >= cutoffDate);
    
    // 移動タイプ別の統計
    let inCount = recentMovements.filter(m => m.type === 'in').length;
    let outCount = recentMovements.filter(m => m.type === 'out').length;
    let adjustmentCount = recentMovements.filter(m => m.type === 'adjustment').length;
    
    // 移動量の統計
    let totalInQuantity = recentMovements
      .filter(m => m.type === 'in')
      .reduce((sum, m) => sum + m.quantity, 0);
    
    let totalOutQuantity = recentMovements
      .filter(m => m.type === 'out')
      .reduce((sum, m) => sum + m.quantity, 0);
    
    return {
      summary: {
        period: days + "日間",
        totalMovements: recentMovements.length,
        inCount: inCount,
        outCount: outCount,
        adjustmentCount: adjustmentCount,
        totalInQuantity: totalInQuantity,
        totalOutQuantity: totalOutQuantity
      },
      recentMovements: recentMovements.slice(0, 20) // 最新20件
    };
  }
}

// TODO: 6. メインアプリケーションクラスを実装してください

class InventoryManagementApp {
  constructor() {
    this.productManager = new ProductManager();
    this.stockMovementManager = new StockMovementManager(this.productManager);
    this.reportGenerator = new ReportGenerator(this.productManager, this.stockMovementManager);
    
    // 現在のユーザー（デモ用）
    this.currentUser = {
      id: "USER_001",
      name: "管理者",
      email: "admin@example.com",
      role: "admin",
      isActive: true,
      createdAt: new Date()
    };
  }
  
  // アプリケーション初期化
  async initialize() {
    console.log("=== 在庫管理システム初期化 ===");
    console.log("ユーザー:", this.currentUser.name, "(" + this.currentUser.role + ")");
    
    // サンプルデータを作成
    await this.createSampleData();
    
    console.log("✅ 初期化が完了しました");
    return true;
  }
  
  // サンプルデータの作成
  async createSampleData() {
    console.log("\\nサンプルデータを作成中...");
    
    // サンプル商品を追加
    let sampleProducts = [
      {
        name: "ワイヤレスマウス",
        category: "電子機器",
        price: 2500,
        stock: 15,
        description: "2.4GHz ワイヤレス光学マウス",
        supplier: "テックサプライ株式会社"
      },
      {
        name: "USB-Cケーブル",
        category: "電子機器",
        price: 800,
        stock: 50,
        description: "USB-C to USB-A データ転送ケーブル 1m",
        supplier: "ケーブルワークス"
      },
      {
        name: "A4コピー用紙",
        category: "事務用品",
        price: 500,
        stock: 8,
        description: "高品質コピー用紙 500枚入り",
        supplier: "オフィス用品センター"
      },
      {
        name: "ボールペン（黒）",
        category: "事務用品",
        price: 100,
        stock: 120,
        description: "油性ボールペン 0.7mm",
        supplier: "文具の山田"
      },
      {
        name: "ノートPC",
        category: "電子機器",
        price: 89800,
        stock: 3,
        description: "15インチ ビジネス用ノートパソコン",
        supplier: "PCワールド"
      }
    ];
    
    for (let productData of sampleProducts) {
      let result = this.productManager.addProduct(productData);
      if (result.success) {
        console.log("✅ 商品追加:", result.data.name);
      }
    }
  }
  
  // 商品管理デモ
  async productManagementDemo() {
    console.log("\\n=== 商品管理デモ ===");
    
    // 新しい商品を追加
    let newProductResult = this.productManager.addProduct({
      name: "プロジェクター",
      category: "電子機器",
      price: 45000,
      stock: 2,
      description: "フルHD プロジェクター",
      supplier: "映像機器商事"
    });
    
    if (newProductResult.success) {
      console.log("✅ 新商品追加:", newProductResult.data.name);
    }
    
    // 商品検索
    let searchResults = this.productManager.searchProducts({
      category: "電子機器",
      minPrice: 1000
    });
    console.log("検索結果（電子機器、1000円以上）:", searchResults.length + "件");
    
    // 価格更新
    let products = this.productManager.getAllProducts();
    if (products.length > 0) {
      let updateResult = this.productManager.updateProduct(products[0].id, {
        price: products[0].price * 1.1 // 10%値上げ
      });
      if (updateResult.success) {
        console.log("✅ 価格更新:", updateResult.data.name);
      }
    }
  }
  
  // 在庫移動デモ
  async stockMovementDemo() {
    console.log("\\n=== 在庫移動デモ ===");
    
    let products = this.productManager.getAllProducts();
    
    if (products.length >= 3) {
      // 入庫処理
      let stockInResult = this.stockMovementManager.stockIn(
        products[0].id,
        10,
        "定期発注による補充",
        this.currentUser.id
      );
      if (stockInResult.success) {
        console.log("✅ 入庫完了:", products[0].name, "+10個");
      }
      
      // 出庫処理
      let stockOutResult = this.stockMovementManager.stockOut(
        products[1].id,
        5,
        "販売による出庫",
        this.currentUser.id
      );
      if (stockOutResult.success) {
        console.log("✅ 出庫完了:", products[1].name, "-5個");
      } else {
        console.log("❌ 出庫失敗:", stockOutResult.message);
      }
      
      // 在庫調整
      let adjustmentResult = this.stockMovementManager.stockAdjustment(
        products[2].id,
        products[2].stock + 3,
        "棚卸による調整",
        this.currentUser.id
      );
      if (adjustmentResult.success) {
        console.log("✅ 在庫調整完了:", products[2].name);
      }
    }
  }
  
  // レポート生成デモ
  generateReportsDemo() {
    console.log("\\n=== レポート生成デモ ===");
    
    // 在庫状況レポート
    let stockReport = this.reportGenerator.generateStockReport();
    console.log("\\n--- 在庫状況レポート ---");
    console.log("総商品数:", stockReport.summary.totalProducts);
    console.log("総在庫価値:", stockReport.summary.totalValue.toLocaleString() + "円");
    console.log("低在庫商品:", stockReport.lowStockItems.length + "件");
    console.log("高額商品:", stockReport.highValueItems.length + "件");
    
    if (stockReport.lowStockItems.length > 0) {
      console.log("\\n【要注意】低在庫商品:");
      stockReport.lowStockItems.forEach(item => {
        console.log("- " + item.name + " (残り" + item.stock + "個)");
      });
    }
    
    // 移動履歴レポート
    let movementReport = this.reportGenerator.generateMovementReport(7);
    console.log("\\n--- 移動履歴レポート (" + movementReport.summary.period + ") ---");
    console.log("総移動件数:", movementReport.summary.totalMovements);
    console.log("入庫件数:", movementReport.summary.inCount);
    console.log("出庫件数:", movementReport.summary.outCount);
    console.log("調整件数:", movementReport.summary.adjustmentCount);
  }
  
  // 統合デモ実行
  async runFullDemo() {
    await this.initialize();
    await this.productManagementDemo();
    await this.stockMovementDemo();
    this.generateReportsDemo();
    
    console.log("\\n=== デモ完了 ===");
    console.log("学習したTypeScriptの機能:");
    console.log("- interface と type による型定義");
    console.log("- Generics を使った再利用可能な API 型");
    console.log("- Utility Types (Omit, Partial) による型変換");
    console.log("- クラスとメソッドによるオブジェクト指向設計");
    console.log("- バリデーション関数による型安全性");
    console.log("- Union 型による状態管理");
    console.log("- 実践的なエラーハンドリング");
    console.log("- データ構造の設計と操作");
  }
}

// TODO: 7. アプリケーションを実行してください

console.log("🚀 TypeScript 在庫管理システムを開始します！");

async function runInventoryApp() {
  let app = new InventoryManagementApp();
  await app.runFullDemo();
  
  console.log("\\n✨ TypeScript学習が完了しました！");
  console.log("これで実践的なWebアプリケーション開発に挑戦する準備が整いました。");
}

// メインアプリケーションを実行
runInventoryApp().catch(console.error);`,

  exerciseHints: [
    "これまで学習したすべてのTypeScriptの機能を組み合わせて使いましょう",
    "interface でエンティティの型定義を明確にしましょう",
    "Generics を使って API レスポンスの型を汎用的に定義しましょう",
    "バリデーション関数で実行時の型安全性を確保しましょう",
    "クラス設計では単一責任の原則を意識しましょう"
  ],

  testCases: [
    {
      id: "test1",
      description: "ProductManagerクラスが正しく動作する",
      testFunction: "() => { let manager = new ProductManager(); let result = manager.addProduct({name: 'テスト商品', category: 'テスト', price: 1000, stock: 10, supplier: 'テストサプライヤー'}); return result.success && result.data.name === 'テスト商品'; }"
    },
    {
      id: "test2",
      description: "バリデーション関数が正しく動作する",
      testFunction: "() => { let nameError = validateProductName(''); let priceError = validatePrice(-100); return nameError !== null && priceError !== null; }"
    },
    {
      id: "test3",
      description: "StockMovementManagerクラスが正しく動作する",
      testFunction: "() => { let productManager = new ProductManager(); productManager.addProduct({name: 'テスト', category: 'テスト', price: 100, stock: 5, supplier: 'テスト'}); let stockManager = new StockMovementManager(productManager); return typeof stockManager.stockIn === 'function'; }"
    },
    {
      id: "test4",
      description: "ReportGeneratorクラスが正しく動作する",
      testFunction: "() => { let productManager = new ProductManager(); let stockManager = new StockMovementManager(productManager); let reportGenerator = new ReportGenerator(productManager, stockManager); let report = reportGenerator.generateStockReport(); return typeof report.summary === 'object'; }"
    },
    {
      id: "test5",
      description: "InventoryManagementAppクラスが正しく動作する",
      testFunction: "() => { let app = new InventoryManagementApp(); return app.productManager && app.stockMovementManager && app.reportGenerator && typeof app.initialize === 'function'; }"
    }
  ],

  exerciseDifficulty: 'hard'
} as const