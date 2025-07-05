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
// TypeScriptでは: function delay(ms: number): Promise<void> {
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 2. データを返すPromise関数
// TypeScriptでは: function fetchUserData(): Promise<{ name: string; age: number }> {
function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 成功時のデータ
      resolve({ name: "田中太郎", age: 30 });
    }, 1000);
  });
}

// 3. async/await を使用した関数
// TypeScriptでは: async function getUserInfo(): Promise<string> {
async function getUserInfo() {
  try {
    // TODO: fetchUserData() を呼び出して結果を取得してください
    const user = await fetchUserData();
    return \`ユーザー: \${user.name}, 年齢: \${user.age}\`;
  } catch (error) {
    return "ユーザー情報の取得に失敗しました";
  }
}

// 4. API レスポンスの型定義
// TypeScriptでは: interface User { id: number; name: string; email: string; }
// User構造: { id: number, name: string, email: string }

// TypeScriptでは: interface ApiResponse<T> { success: boolean; data: T; message?: string; }
// ApiResponse構造: { success: boolean, data: any, message?: string }

// 5. 型安全なAPI関数
// TypeScriptでは: async function fetchUser(id: number): Promise<ApiResponse<User>> {
async function fetchUser(id) {
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
// TypeScriptでは: async function fetchMultipleUsers(): Promise<User[]> {
async function fetchMultipleUsers() {
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
  explanation: "TypeScriptにおける非同期処理では、Promise<T>型を使って戻り値の型を明確にし、async/await構文で可読性を向上させます。APIレスポンスの型定義、エラーハンドリング、並列処理、タイムアウト、リトライ機能など、実際のアプリケーション開発で必要な要素を型安全に実装できます。Result型パターンなどの高度な型設計により、より堅牢な非同期処理を実現できます。",

  // 演習機能追加
  exerciseCode: `// 演習: 非同期データフェッチシステムを作成しよう
// Promiseとasync/awaitを使って、API呼び出しとエラーハンドリングを実装してください

// TODO: 1. 基本的なPromise関数を実装してください

// 遅延を作成する関数
function delay(ms) {
  // TypeScriptでは: function delay(ms: number): Promise<void>
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ランダムな成功/失敗を返すPromise
function randomSuccess() {
  // TypeScriptでは: function randomSuccess(): Promise<string>
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve("成功しました！");
      } else {
        reject(new Error("ランダムエラーが発生しました"));
      }
    }, 1000);
  });
}

// TODO: 2. APIレスポンスの型を定義してください
// TypeScriptでは以下のようなインターフェースを定義
// interface User { id: number; name: string; email: string; avatar: string; }
// interface Post { id: number; title: string; content: string; userId: number; createdAt: string; }
// interface ApiResponse<T> { success: boolean; data: T; message: string; }

// TODO: 3. ユーザー情報を取得するAPI関数を実装してください
async function fetchUser(userId) {
  // TypeScriptでは: async function fetchUser(userId: number): Promise<ApiResponse<User>>
  
  // API呼び出しをシミュレート
  await delay(800);
  
  // ユーザーが存在しない場合のエラー処理
  if (userId < 1 || userId > 10) {
    throw new Error("ユーザーが見つかりません");
  }
  
  // モックデータを返す
  return {
    success: true,
    data: {
      id: userId,
      name: "ユーザー" + userId,
      email: "user" + userId + "@example.com",
      avatar: "https://via.placeholder.com/64"
    },
    message: "ユーザー情報を取得しました"
  };
}

// TODO: 4. 投稿情報を取得するAPI関数を実装してください
async function fetchUserPosts(userId) {
  // TypeScriptでは: async function fetchUserPosts(userId: number): Promise<ApiResponse<Post[]>>
  
  await delay(1200);
  
  // 投稿データをシミュレート
  let posts = [];
  for (let i = 1; i <= 3; i++) {
    posts.push({
      id: i,
      title: "投稿タイトル" + i,
      content: "これは投稿" + i + "の内容です。",
      userId: userId,
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return {
    success: true,
    data: posts,
    message: posts.length + "件の投稿を取得しました"
  };
}

// TODO: 5. 複数のAPIを並列で呼び出す関数を実装してください
async function fetchUserWithPosts(userId) {
  // TypeScriptでは: async function fetchUserWithPosts(userId: number): Promise<{user: User, posts: Post[]}>
  
  try {
    console.log("ユーザー情報と投稿を並列取得中...");
    
    // Promise.allを使って並列実行
    let [userResponse, postsResponse] = await Promise.all([
      fetchUser(userId),
      fetchUserPosts(userId)
    ]);
    
    return {
      user: userResponse.data,
      posts: postsResponse.data
    };
  } catch (error) {
    console.error("データ取得エラー:", error.message);
    throw error;
  }
}

// TODO: 6. エラーハンドリングを含むAPIクライアントクラスを作成してください
class ApiClient {
  constructor(baseUrl) {
    // TypeScriptでは: constructor(private baseUrl: string)
    this.baseUrl = baseUrl || "https://api.example.com";
  }
  
  // リトライ機能付きのHTTPリクエスト
  async request(endpoint, options = {}) {
    // TypeScriptでは: async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T>
    
    let maxRetries = options.maxRetries || 3;
    let retryDelay = options.retryDelay || 1000;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log("API呼び出し試行 " + attempt + "/" + maxRetries + ": " + endpoint);
        
        // 実際のHTTPリクエストの代わりにモックを使用
        await delay(500);
        
        // 30%の確率でエラーをシミュレート
        if (Math.random() < 0.3) {
          throw new Error("ネットワークエラー");
        }
        
        return {
          success: true,
          data: { message: "APIレスポンス: " + endpoint },
          timestamp: new Date().toISOString()
        };
        
      } catch (error) {
        console.log("試行 " + attempt + " 失敗:", error.message);
        
        if (attempt === maxRetries) {
          throw new Error("最大リトライ回数に達しました: " + error.message);
        }
        
        // 指数バックオフ
        await delay(retryDelay * Math.pow(2, attempt - 1));
      }
    }
  }
  
  // 特定のAPIエンドポイント
  async getUser(id) {
    // TypeScriptでは: async getUser(id: number): Promise<ApiResponse<User>>
    return this.request("/users/" + id);
  }
  
  async getPosts() {
    // TypeScriptでは: async getPosts(): Promise<ApiResponse<Post[]>>
    return this.request("/posts");
  }
  
  async createPost(postData) {
    // TypeScriptでは: async createPost(postData: Omit<Post, 'id' | 'createdAt'>): Promise<ApiResponse<Post>>
    return this.request("/posts", {
      method: "POST",
      data: postData
    });
  }
}

// TODO: 7. タイムアウト機能を実装してください
async function withTimeout(promise, timeoutMs) {
  // TypeScriptでは: async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T>
  
  let timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("タイムアウト: " + timeoutMs + "ms"));
    }, timeoutMs);
  });
  
  return Promise.race([promise, timeoutPromise]);
}

// TODO: 8. バッチ処理関数を実装してください
async function processBatch(items, processor, batchSize = 3) {
  // TypeScriptでは: async function processBatch<T, U>(items: T[], processor: (item: T) => Promise<U>, batchSize: number = 3): Promise<U[]>
  
  let results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    let batch = items.slice(i, i + batchSize);
    console.log("バッチ処理中:", batch);
    
    let batchResults = await Promise.all(
      batch.map(item => processor(item))
    );
    
    results.push(...batchResults);
    
    // バッチ間の待機
    if (i + batchSize < items.length) {
      await delay(500);
    }
  }
  
  return results;
}

// TODO: 9. 実装をテストしてください

console.log("=== 非同期処理テスト開始 ===");

// 基本的なPromiseのテスト
async function testBasicPromises() {
  console.log("\\n--- 基本的なPromiseテスト ---");
  
  try {
    await delay(500);
    console.log("遅延完了");
    
    let result = await randomSuccess();
    console.log("ランダム成功:", result);
  } catch (error) {
    console.log("ランダム失敗:", error.message);
  }
}

// API呼び出しのテスト
async function testApiCalls() {
  console.log("\\n--- API呼び出しテスト ---");
  
  try {
    let userResponse = await fetchUser(1);
    console.log("ユーザー取得成功:", userResponse.data.name);
    
    let userWithPosts = await fetchUserWithPosts(1);
    console.log("ユーザーと投稿取得成功:");
    console.log("- ユーザー:", userWithPosts.user.name);
    console.log("- 投稿数:", userWithPosts.posts.length);
    
  } catch (error) {
    console.log("API呼び出し失敗:", error.message);
  }
}

// リトライ機能のテスト
async function testRetryLogic() {
  console.log("\\n--- リトライ機能テスト ---");
  
  let apiClient = new ApiClient("https://api.example.com");
  
  try {
    let response = await apiClient.getUser(1);
    console.log("API成功:", response.data.message);
  } catch (error) {
    console.log("API失敗:", error.message);
  }
}

// タイムアウト機能のテスト
async function testTimeout() {
  console.log("\\n--- タイムアウト機能テスト ---");
  
  try {
    // 2秒でタイムアウト
    let result = await withTimeout(delay(1000), 2000);
    console.log("タイムアウト内で完了");
  } catch (error) {
    console.log("タイムアウト:", error.message);
  }
}

// バッチ処理のテスト
async function testBatchProcessing() {
  console.log("\\n--- バッチ処理テスト ---");
  
  let userIds = [1, 2, 3, 4, 5];
  
  try {
    let results = await processBatch(userIds, async (id) => {
      let response = await fetchUser(id);
      return response.data;
    }, 2);
    
    console.log("バッチ処理完了:", results.length + "件");
  } catch (error) {
    console.log("バッチ処理失敗:", error.message);
  }
}

// すべてのテストを実行
async function runAllTests() {
  try {
    await testBasicPromises();
    await testApiCalls();
    await testRetryLogic();
    await testTimeout();
    await testBatchProcessing();
    
    console.log("\\n=== すべてのテストが完了しました ===");
  } catch (error) {
    console.error("テスト実行中にエラーが発生しました:", error);
  }
}

// テスト実行
runAllTests().catch(console.error);`,

  exerciseHints: [
    "Promise<T>は非同期処理の結果の型を表現します",
    "async/await構文を使うことで、同期的なコードのように書けます",
    "Promise.allを使って複数の非同期処理を並列実行できます",
    "try-catch文で非同期処理のエラーをキャッチできます",
    "Promise.raceを使ってタイムアウト機能を実装できます"
  ],

  testCases: [
    {
      id: "test1",
      description: "delay関数が正しく動作する",
      testFunction: "() => { let start = Date.now(); return delay(100).then(() => Date.now() - start >= 100); }"
    },
    {
      id: "test2",
      description: "fetchUser関数が正しく動作する",
      testFunction: "() => { return fetchUser(1).then(response => response.success && response.data.id === 1); }"
    },
    {
      id: "test3",
      description: "ApiClientクラスが正しく動作する",
      testFunction: "() => { let client = new ApiClient('https://api.example.com'); return client.getUser(1).then(response => response.success); }"
    },
    {
      id: "test4",
      description: "withTimeout関数が正しく動作する",
      testFunction: "() => { return withTimeout(Promise.resolve('success'), 1000).then(result => result === 'success'); }"
    },
    {
      id: "test5",
      description: "fetchUserWithPosts関数が正しく動作する",
      testFunction: "() => { return fetchUserWithPosts(1).then(result => result.user && result.posts && result.posts.length > 0); }"
    }
  ],

  exerciseDifficulty: 'hard'
} as const