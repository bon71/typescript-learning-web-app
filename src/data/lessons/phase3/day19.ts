import type { LessonContent } from '@/types/content'

export const day19: LessonContent = {
  day: 19,
  title: "API設計",
  goal: "フロントエンドの型安全なAPI呼び出しを設計する",
  completion: "fetchの戻り値に型を定義できる",
  task: "データ取得関数とレスポンス型を分けて記述",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 35,
  tags: ['API設計', 'fetch', '型安全性', 'レスポンス型'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  hints: [
    "APIレスポンスの型定義は実際のサーバーレスポンスと一致させることが重要です",
    "エラーレスポンスも含めて包括的に型定義することで堅牢なAPIクライアントを作れます",
    "ジェネリクスを活用してCRUD操作を汎用化し、再利用性を高めます",
    "リクエスト・レスポンスの変換層を作ることで、API仕様の変更に柔軟に対応できます",
    "型ガードを使ってランタイムでの型チェックも行い、完全な型安全性を実現します"
  ],
  initialCode: `// API設計を学ぼう
// TODO: データ取得関数とレスポンス型を分けて記述

// 1. API レスポンスの基本型定義
// TypeScriptでは: interface ApiResponse<T> { success: boolean; data: T; message?: string; }
// ApiResponse構造: { success: boolean, data: any, message?: string }

// TypeScriptでは: interface ApiError { success: false; error: { code: string; message: string; }; }
// ApiError構造: { success: false, error: { code: string, message: string } }

// 2. エンティティの型定義
// TypeScriptでは: interface User { id: string; name: string; email: string; createdAt: string; }
// User構造: { id: string, name: string, email: string, createdAt: string }

// TypeScriptでは: interface Post { id: string; title: string; content: string; authorId: string; createdAt: string; }
// Post構造: { id: string, title: string, content: string, authorId: string, createdAt: string }

// 3. HTTP クライアントの基底クラス
class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // TypeScriptでは: private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  async request(endpoint, options = {}) {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    
    // TODO: fetchを使ってAPIを呼び出し、レスポンスをJSONとして返してください
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }

    return response.json();
  }

  // TypeScriptでは: protected get<T>(endpoint: string): Promise<T> {
  get(endpoint) {
    return this.request(endpoint);
  }

  // TypeScriptでは: protected post<T>(endpoint: string, data?: any): Promise<T> {
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// 4. 具体的なAPIクライアント
class ApiClient extends HttpClient {
  constructor(baseUrl) {
    super(baseUrl);
  }

  // TODO: getUsers メソッドを実装してください
  // TypeScriptでは: async getUsers(): Promise<ApiResponse<User[]>> {
  async getUsers() {
    // '/users' エンドポイントからユーザー一覧を取得
    return this.get('/users');
  }

  // TODO: getUser メソッドを実装してください
  // TypeScriptでは: async getUser(id: string): Promise<ApiResponse<User>> {
  async getUser(id) {
    // '/users/{id}' エンドポイントから特定のユーザーを取得
    return this.get(\`/users/\${id}\`);
  }

  // TODO: createUser メソッドを実装してください
  // TypeScriptでは: async createUser(userData: { name: string; email: string }): Promise<ApiResponse<User>> {
  async createUser(userData) {
    // '/users' エンドポイントに新しいユーザーを作成
    return this.post('/users', userData);
  }

  // TypeScriptでは: async getPosts(): Promise<ApiResponse<Post[]>> {
  async getPosts() {
    return this.get('/posts');
  }
}

// 5. サービス層 - APIクライアントをラップして使いやすくする
class UserService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  // TypeScriptでは: async getAllUsers(): Promise<User[]> {
  async getAllUsers() {
    try {
      const response = await this.apiClient.getUsers();
      return response.success ? response.data : [];
    } catch (error) {
      console.error('ユーザー取得エラー:', error);
      return [];
    }
  }

  // TypeScriptでは: async getUserById(id: string): Promise<User | null> {
  async getUserById(id) {
    try {
      const response = await this.apiClient.getUser(id);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('ユーザー取得エラー:', error);
      return null;
    }
  }

  // TODO: createNewUser メソッドを実装してください
  // TypeScriptでは: async createNewUser(name: string, email: string): Promise<User | null> {
  async createNewUser(name, email) {
    try {
      // apiClient.createUser を呼び出して新しいユーザーを作成
      const response = await this.apiClient.createUser({ name, email });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('ユーザー作成エラー:', error);
      return null;
    }
  }
}

// 6. 使用例
async function main() {
  // APIクライアントとサービスを初期化
  const apiClient = new ApiClient('https://jsonplaceholder.typicode.com');
  const userService = new UserService(apiClient);

  try {
    console.log('ユーザー一覧を取得中...');
    const users = await userService.getAllUsers();
    console.log(\`\${users.length}人のユーザーを取得しました\`);

    if (users.length > 0) {
      console.log('最初のユーザー:', users[0]);
      
      // 特定のユーザーを取得
      const firstUser = await userService.getUserById(users[0].id);
      console.log('取得したユーザー詳細:', firstUser);
    }

    // 新しいユーザーを作成（テスト用）
    const newUser = await userService.createNewUser('田中太郎', 'tanaka@example.com');
    console.log('作成されたユーザー:', newUser);

  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

// 実行
main().catch(console.error);`,
  sampleCode: `// API レスポンスの基本型定義
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

// エンティティの型定義
interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  author?: User;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author?: User;
  content: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

// リクエスト用の型定義
interface CreateUserRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface UpdateUserRequest {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

interface CreatePostRequest {
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  publishedAt?: string;
}

interface UpdatePostRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  tags?: string[];
  publishedAt?: string | null;
}

// ページネーション
interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// フィルタリング・検索
interface PostFilters {
  authorId?: string;
  tags?: string[];
  publishedAfter?: string;
  publishedBefore?: string;
  search?: string;
}

interface UserFilters {
  search?: string;
  createdAfter?: string;
  createdBefore?: string;
}

// API エラー処理
class ApiClientError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

// HTTP クライアントの基底クラス
class HttpClient {
  constructor(private baseUrl: string, private defaultHeaders: Record<string, string> = {}) {}

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiClientError(
        response.status,
        errorData?.error?.code || 'UNKNOWN_ERROR',
        errorData?.error?.message || response.statusText,
        errorData?.error?.details
      );
    }

    return response.json();
  }

  protected get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = params 
      ? \`\${endpoint}?\${new URLSearchParams(params).toString()}\`
      : endpoint;
    return this.request<T>(url);
  }

  protected post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// 具体的なAPIクライアント
class ApiClient extends HttpClient {
  constructor(baseUrl: string, authToken?: string) {
    super(baseUrl, authToken ? { Authorization: \`Bearer \${authToken}\` } : {});
  }

  // ユーザー関連のAPI
  async getUsers(filters?: UserFilters & PaginationParams): Promise<PaginatedResponse<User>> {
    return this.get<PaginatedResponse<User>>('/users', filters);
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.get<ApiResponse<User>>(\`/users/\${id}\`);
  }

  async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.post<ApiResponse<User>>('/users', data);
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<ApiResponse<User>> {
    return this.patch<ApiResponse<User>>(\`/users/\${id}\`, data);
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(\`/users/\${id}\`);
  }

  // 投稿関連のAPI
  async getPosts(filters?: PostFilters & PaginationParams): Promise<PaginatedResponse<Post>> {
    return this.get<PaginatedResponse<Post>>('/posts', filters);
  }

  async getPost(id: string): Promise<ApiResponse<Post>> {
    return this.get<ApiResponse<Post>>(\`/posts/\${id}\`);
  }

  async createPost(data: CreatePostRequest): Promise<ApiResponse<Post>> {
    return this.post<ApiResponse<Post>>('/posts', data);
  }

  async updatePost(id: string, data: UpdatePostRequest): Promise<ApiResponse<Post>> {
    return this.patch<ApiResponse<Post>>(\`/posts/\${id}\`, data);
  }

  async deletePost(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(\`/posts/\${id}\`);
  }

  async publishPost(id: string): Promise<ApiResponse<Post>> {
    return this.post<ApiResponse<Post>>(\`/posts/\${id}/publish\`);
  }

  async unpublishPost(id: string): Promise<ApiResponse<Post>> {
    return this.post<ApiResponse<Post>>(\`/posts/\${id}/unpublish\`);
  }

  // コメント関連のAPI
  async getPostComments(postId: string, params?: PaginationParams): Promise<PaginatedResponse<Comment>> {
    return this.get<PaginatedResponse<Comment>>(\`/posts/\${postId}/comments\`, params);
  }

  async createComment(postId: string, content: string, parentId?: string): Promise<ApiResponse<Comment>> {
    return this.post<ApiResponse<Comment>>(\`/posts/\${postId}/comments\`, {
      content,
      parentId,
    });
  }

  async updateComment(id: string, content: string): Promise<ApiResponse<Comment>> {
    return this.patch<ApiResponse<Comment>>(\`/comments/\${id}\`, { content });
  }

  async deleteComment(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(\`/comments/\${id}\`);
  }
}

// 型ガードとバリデーション
function isUser(obj: any): obj is User {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.username === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.firstName === 'string' &&
    typeof obj.lastName === 'string' &&
    typeof obj.createdAt === 'string' &&
    typeof obj.updatedAt === 'string'
  );
}

function isPost(obj: any): obj is Post {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.content === 'string' &&
    typeof obj.authorId === 'string' &&
    Array.isArray(obj.tags) &&
    typeof obj.createdAt === 'string' &&
    typeof obj.updatedAt === 'string'
  );
}

// APIレスポンスの変換層
class ApiResponseTransformer {
  static transformUser(apiUser: any): User {
    if (!isUser(apiUser)) {
      throw new Error('Invalid user data received from API');
    }
    return apiUser;
  }

  static transformPost(apiPost: any): Post {
    if (!isPost(apiPost)) {
      throw new Error('Invalid post data received from API');
    }
    return apiPost;
  }

  static transformPaginatedResponse<T>(
    response: any,
    itemTransformer: (item: any) => T
  ): PaginatedResponse<T> {
    if (
      !response ||
      !Array.isArray(response.data) ||
      !response.pagination ||
      typeof response.pagination.total !== 'number'
    ) {
      throw new Error('Invalid paginated response format');
    }

    return {
      data: response.data.map(itemTransformer),
      pagination: response.pagination,
    };
  }
}

// 使用例とサービス層
class UserService {
  constructor(private apiClient: ApiClient) {}

  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const response = await this.apiClient.createUser(userData);
      return ApiResponseTransformer.transformUser(response.data);
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw new Error(\`ユーザー作成に失敗しました: \${error.message}\`);
      }
      throw error;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await this.apiClient.getUser(id);
      return ApiResponseTransformer.transformUser(response.data);
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async searchUsers(query: string, page = 1, limit = 10): Promise<PaginatedResponse<User>> {
    const response = await this.apiClient.getUsers({
      search: query,
      page,
      limit,
    });

    return ApiResponseTransformer.transformPaginatedResponse(
      response,
      ApiResponseTransformer.transformUser
    );
  }
}

class PostService {
  constructor(private apiClient: ApiClient) {}

  async getPublishedPosts(page = 1, limit = 10): Promise<PaginatedResponse<Post>> {
    const response = await this.apiClient.getPosts({
      publishedAfter: '1970-01-01', // 公開済みのものだけ
      page,
      limit,
      sortBy: 'publishedAt',
      sortOrder: 'desc',
    });

    return ApiResponseTransformer.transformPaginatedResponse(
      response,
      ApiResponseTransformer.transformPost
    );
  }

  async createDraftPost(postData: CreatePostRequest): Promise<Post> {
    const response = await this.apiClient.createPost({
      ...postData,
      publishedAt: undefined, // 下書きとして作成
    });

    return ApiResponseTransformer.transformPost(response.data);
  }

  async publishPost(id: string): Promise<Post> {
    const response = await this.apiClient.publishPost(id);
    return ApiResponseTransformer.transformPost(response.data);
  }
}

// 実用例
async function main() {
  try {
    const apiClient = new ApiClient('https://api.example.com', 'your-auth-token');
    const userService = new UserService(apiClient);
    const postService = new PostService(apiClient);

    // ユーザー作成
    const newUser = await userService.createUser({
      username: 'tanaka_taro',
      email: 'tanaka@example.com',
      firstName: '太郎',
      lastName: '田中',
      password: 'secure-password',
    });

    console.log(\`新しいユーザーを作成しました: \${newUser.username}\`);

    // 投稿の検索と表示
    const publishedPosts = await postService.getPublishedPosts(1, 5);
    console.log(\`公開済み投稿数: \${publishedPosts.data.length}\`);

    publishedPosts.data.forEach(post => {
      console.log(\`- \${post.title} by \${post.author?.firstName || 'Unknown'}\`);
    });

  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(\`API エラー (\${error.status}): \${error.message}\`);
    } else {
      console.error('予期しないエラー:', error);
    }
  }
}

main().catch(console.error);`,
  explanation: "型安全なAPI設計では、リクエスト・レスポンスの型定義、エラーハンドリング、ページネーション、フィルタリングを包括的にカバーします。HTTPクライアントの基底クラス、具体的なAPIクライアント、型ガード、レスポンス変換層、サービス層を適切に分離することで、保守性が高く拡張しやすいアーキテクチャを実現できます。実際のプロダクション環境で必要な要素を全て含んだ実践的な設計パターンです。"
} as const