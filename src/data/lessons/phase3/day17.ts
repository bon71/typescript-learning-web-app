import type { LessonContent } from '@/types/content'

export const day17: LessonContent = {
  day: 17,
  title: "Promiseと非同期処理",
  goal: "非同期関数に型を付ける方法を理解する",
  completion: "Promise<T> を返す関数が書ける",
  task: "APIから取得したデータの型を定義して取得関数を実装",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 35,
  tags: ['Promise', '非同期', 'async/await', 'API'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14, 15, 16],
  hints: [
    "Promise<T>は非同期処理の結果として返される値の型Tを指定します",
    "async関数は自動的にPromiseを返すため、戻り値の型はPromise<T>になります",
    "エラーハンドリングではtry-catch文を使用し、エラー型も適切に定義します",
    "複数の非同期処理を並列実行する場合はPromise.allを使用します",
    "APIのレスポンス型を明確に定義することで、型安全なデータ取得が可能になります"
  ],
  initialCode: `// Promiseと非同期処理を学ぼう
// TODO: APIから取得したデータの型を定義して取得関数を実装

// 1. 基本的なPromise型定義
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 2. データを返すPromise関数
function fetchUserData(): Promise<{ name: string; age: number }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 成功時のデータ
      resolve({ name: "田中太郎", age: 30 });
    }, 1000);
  });
}

// 3. async/await を使用した関数
async function getUserInfo(): Promise<string> {
  try {
    // TODO: fetchUserData() を呼び出して結果を取得してください
    const user = await fetchUserData();
    return \`ユーザー: \${user.name}, 年齢: \${user.age}\`;
  } catch (error) {
    return "ユーザー情報の取得に失敗しました";
  }
}

// 4. API レスポンスの型定義
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 5. 型安全なAPI関数
async function fetchUser(id: number): Promise<ApiResponse<User>> {
  // TODO: 実際のAPI呼び出しをシミュレート
  await delay(500);
  
  // モックデータを返す
  return {
    success: true,
    data: {
      id: id,
      name: "佐藤花子",
      email: "sato@example.com"
    },
    message: "ユーザー情報を取得しました"
  };
}

// 6. 複数の非同期処理を並列実行
async function fetchMultipleUsers(): Promise<User[]> {
  try {
    // TODO: Promise.all を使って複数のユーザーを同時に取得してください
    const responses = await Promise.all([
      fetchUser(1),
      fetchUser(2),
      fetchUser(3)
    ]);
    
    return responses.map(response => response.data);
  } catch (error) {
    console.error("ユーザー取得エラー:", error);
    return [];
  }
}

// 7. 使用例
async function main() {
  console.log("非同期処理を開始します...");
  
  // 基本的な非同期処理
  const userInfo = await getUserInfo();
  console.log(userInfo);
  
  // 単一ユーザーの取得
  const userResponse = await fetchUser(1);
  if (userResponse.success) {
    console.log("取得したユーザー:", userResponse.data);
  }
  
  // 複数ユーザーの並列取得
  const users = await fetchMultipleUsers();
  console.log("取得したユーザー一覧:", users);
}

// 実行
main().catch(console.error);`,
  sampleCode: `// 基本的なPromise型定義
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchNumber(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(42);
      } else {
        reject(new Error("Failed to fetch number"));
      }
    }, 1000);
  });
}

// async/await を使用した関数
async function getMessage(): Promise<string> {
  await delay(500);
  return "Hello, TypeScript!";
}

async function getRandomNumber(): Promise<number> {
  try {
    const number = await fetchNumber();
    return number;
  } catch (error) {
    console.error("Error:", error);
    return 0; // デフォルト値
  }
}

// API レスポンスの型定義
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface ApiError {
  message: string;
  status: number;
}

// カスタムエラークラス
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// APIクライアントクラス
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string): Promise<T> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`);
    
    if (!response.ok) {
      throw new ApiError(response.status, \`HTTP \${response.status}: \${response.statusText}\`);
    }

    return response.json();
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(\`/users/\${id}\`);
  }

  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async getPosts(): Promise<Post[]> {
    return this.request<Post[]>('/posts');
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return this.request<Post[]>(\`/users/\${userId}/posts\`);
  }
}

// より複雑な非同期処理の例
interface UserWithPosts {
  user: User;
  posts: Post[];
}

async function getUserWithPosts(apiClient: ApiClient, userId: number): Promise<UserWithPosts> {
  try {
    // 並列実行でパフォーマンスを向上
    const [user, posts] = await Promise.all([
      apiClient.getUser(userId),
      apiClient.getUserPosts(userId)
    ]);

    return { user, posts };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(\`APIエラー (status: \${error.status}): \${error.message}\`);
    }
    throw error;
  }
}

// レスポンス型の検証
function isUser(obj: any): obj is User {
  return typeof obj === 'object' && 
         typeof obj.id === 'number' &&
         typeof obj.name === 'string' &&
         typeof obj.email === 'string' &&
         typeof obj.username === 'string';
}

function isPost(obj: any): obj is Post {
  return typeof obj === 'object' &&
         typeof obj.id === 'number' &&
         typeof obj.title === 'string' &&
         typeof obj.body === 'string' &&
         typeof obj.userId === 'number';
}

// 型安全なAPIクライアント
class SafeApiClient extends ApiClient {
  async getUser(id: number): Promise<User> {
    const data = await super.getUser(id);
    if (!isUser(data)) {
      throw new Error("Invalid user data received");
    }
    return data;
  }

  async getPosts(): Promise<Post[]> {
    const data = await super.getPosts();
    if (!Array.isArray(data) || !data.every(isPost)) {
      throw new Error("Invalid posts data received");
    }
    return data;
  }
}

// 非同期処理のユーティリティ関数
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}

async function retry<T>(
  fn: () => Promise<T>, 
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(delayMs);
    }
  }
  throw new Error("Max retries exceeded");
}

// 実用例
async function main(): Promise<void> {
  try {
    console.log("メッセージを取得中...");
    const message = await getMessage();
    console.log(message);

    console.log("ランダムな数値を取得中...");
    const number = await getRandomNumber();
    console.log(\`数値: \${number}\`);

    // APIクライアントの使用例
    const apiClient = new SafeApiClient("https://jsonplaceholder.typicode.com");

    console.log("ユーザー情報を取得中...");
    const userWithPosts = await withTimeout(
      getUserWithPosts(apiClient, 1),
      5000 // 5秒でタイムアウト
    );

    console.log(\`ユーザー: \${userWithPosts.user.name}\`);
    console.log(\`投稿数: \${userWithPosts.posts.length}\`);

    // リトライ機能付きの API 呼び出し
    console.log("リトライ機能付きでユーザー一覧を取得中...");
    const users = await retry(() => apiClient.getUsers(), 3, 1000);
    console.log(\`\${users.length}人のユーザーを取得しました\`);

  } catch (error) {
    if (error instanceof ApiError) {
      console.error(\`API エラー: \${error.message} (status: \${error.status})\`);
    } else if (error instanceof Error) {
      console.error(\`エラー: \${error.message}\`);
    } else {
      console.error("予期しないエラーが発生しました");
    }
  }
}

// 型定義の拡張：結果型パターン
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function safeApiCall<T>(apiCall: () => Promise<T>): Promise<Result<T, ApiError>> {
  try {
    const data = await apiCall();
    return { success: true, data };
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error };
    }
    return { success: false, error: new ApiError(500, "Unknown error") };
  }
}

// 使用例
async function exampleUsage(): Promise<void> {
  const apiClient = new SafeApiClient("https://jsonplaceholder.typicode.com");
  
  const result = await safeApiCall(() => apiClient.getUser(1));
  
  if (result.success) {
    console.log(\`ユーザー名: \${result.data.name}\`);
  } else {
    console.error(\`エラー: \${result.error.message}\`);
  }
}

// 実行
main().catch(console.error);`,
  explanation: "TypeScriptにおける非同期処理では、Promise<T>型を使って戻り値の型を明確にし、async/await構文で可読性を向上させます。APIレスポンスの型定義、エラーハンドリング、並列処理、タイムアウト、リトライ機能など、実際のアプリケーション開発で必要な要素を型安全に実装できます。Result型パターンなどの高度な型設計により、より堅牢な非同期処理を実現できます。"
} as const