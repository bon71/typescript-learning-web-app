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
  explanation: "型安全なAPI設計では、リクエスト・レスポンスの型定義、エラーハンドリング、ページネーション、フィルタリングを包括的にカバーします。HTTPクライアントの基底クラス、具体的なAPIクライアント、型ガード、レスポンス変換層、サービス層を適切に分離することで、保守性が高く拡張しやすいアーキテクチャを実現できます。実際のプロダクション環境で必要な要素を全て含んだ実践的な設計パターンです。",

  // 演習機能追加
  exerciseCode: `// 演習: 型安全なブログAPIクライアントを作成しよう
// API設計のベストプラクティスを使って、包括的なブログシステムを実装してください

// TODO: 1. API レスポンスとエラーの基本型を定義してください

// API レスポンスの型
// TypeScriptでは以下のような定義
// interface ApiResponse<T> { success: boolean; data: T; message?: string; timestamp: string; }
// interface ApiError { success: false; error: { code: string; message: string; details?: any; }; timestamp: string; }

// TODO: 2. ブログエンティティの型を定義してください

// ブログ記事の型
// TypeScriptでは以下のような定義
// interface BlogPost { id: string; title: string; content: string; excerpt: string; authorId: string; author?: User; tags: string[]; publishedAt: string | null; createdAt: string; updatedAt: string; }

// ユーザーの型
// TypeScriptでは以下のような定義
// interface User { id: string; name: string; email: string; avatar?: string; bio?: string; createdAt: string; }

// コメントの型
// TypeScriptでは以下のような定義
// interface Comment { id: string; postId: string; authorId: string; author?: User; content: string; createdAt: string; }

// TODO: 3. HTTP クライアントの基底クラスを実装してください

class HttpClient {
  constructor(baseUrl, defaultHeaders = {}) {
    // TypeScriptでは: constructor(private baseUrl: string, private defaultHeaders: Record<string, string> = {})
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }
  
  // プライベートリクエストメソッド
  async request(endpoint, options = {}) {
    // TypeScriptでは: private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T>
    
    let url = this.baseUrl + endpoint;
    
    try {
      let response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...this.defaultHeaders,
          ...options.headers,
        },
      });
      
      let data = await response.json();
      
      if (!response.ok) {
        throw {
          status: response.status,
          code: data.error?.code || 'UNKNOWN_ERROR',
          message: data.error?.message || response.statusText,
          details: data.error?.details
        };
      }
      
      return data;
    } catch (error) {
      // ネットワークエラーなどの場合はモック処理
      if (error.status) {
        throw error;
      }
      
      // fetch失敗の場合はモックレスポンスを返す
      return this.getMockResponse(endpoint, options);
    }
  }
  
  // モックレスポンス（fetchが利用できない環境用）
  getMockResponse(endpoint, options) {
    // TypeScriptでは: private getMockResponse(endpoint: string, options: RequestInit): any
    
    console.log("モック API 呼び出し:", options.method || 'GET', endpoint);
    
    // 簡単なモックデータを返す
    return {
      success: true,
      data: { message: "モックレスポンス: " + endpoint },
      timestamp: new Date().toISOString()
    };
  }
  
  // protected HTTP メソッド
  get(endpoint, params) {
    // TypeScriptでは: protected get<T>(endpoint: string, params?: Record<string, any>): Promise<T>
    let url = endpoint;
    if (params) {
      let searchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          searchParams.append(key, params[key].toString());
        }
      });
      url += "?" + searchParams.toString();
    }
    return this.request(url);
  }
  
  post(endpoint, data) {
    // TypeScriptでは: protected post<T>(endpoint: string, data?: any): Promise<T>
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  
  put(endpoint, data) {
    // TypeScriptでは: protected put<T>(endpoint: string, data?: any): Promise<T>
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  
  patch(endpoint, data) {
    // TypeScriptでは: protected patch<T>(endpoint: string, data?: any): Promise<T>
    return this.request(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  
  delete(endpoint) {
    // TypeScriptでは: protected delete<T>(endpoint: string): Promise<T>
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// TODO: 4. ブログAPIクライアントを実装してください

class BlogApiClient extends HttpClient {
  constructor(baseUrl, authToken) {
    // TypeScriptでは: constructor(baseUrl: string, authToken?: string)
    let headers = {};
    if (authToken) {
      headers.Authorization = "Bearer " + authToken;
    }
    super(baseUrl, headers);
  }
  
  // ブログ記事関連のAPI
  async getPosts(filters = {}) {
    // TypeScriptでは: async getPosts(filters?: { authorId?: string; tags?: string[]; search?: string; page?: number; limit?: number; }): Promise<ApiResponse<BlogPost[]>>
    return this.get('/posts', filters);
  }
  
  async getPost(id) {
    // TypeScriptでは: async getPost(id: string): Promise<ApiResponse<BlogPost>>
    return this.get("/posts/" + id);
  }
  
  async createPost(postData) {
    // TypeScriptでは: async createPost(postData: { title: string; content: string; excerpt?: string; tags?: string[]; }): Promise<ApiResponse<BlogPost>>
    return this.post('/posts', postData);
  }
  
  async updatePost(id, updateData) {
    // TypeScriptでは: async updatePost(id: string, updateData: { title?: string; content?: string; excerpt?: string; tags?: string[]; }): Promise<ApiResponse<BlogPost>>
    return this.patch("/posts/" + id, updateData);
  }
  
  async publishPost(id) {
    // TypeScriptでは: async publishPost(id: string): Promise<ApiResponse<BlogPost>>
    return this.post("/posts/" + id + "/publish");
  }
  
  async unpublishPost(id) {
    // TypeScriptでは: async unpublishPost(id: string): Promise<ApiResponse<BlogPost>>
    return this.post("/posts/" + id + "/unpublish");
  }
  
  async deletePost(id) {
    // TypeScriptでは: async deletePost(id: string): Promise<ApiResponse<void>>
    return this.delete("/posts/" + id);
  }
  
  // ユーザー関連のAPI
  async getUsers() {
    // TypeScriptでは: async getUsers(): Promise<ApiResponse<User[]>>
    return this.get('/users');
  }
  
  async getUser(id) {
    // TypeScriptでは: async getUser(id: string): Promise<ApiResponse<User>>
    return this.get("/users/" + id);
  }
  
  async createUser(userData) {
    // TypeScriptでは: async createUser(userData: { name: string; email: string; bio?: string; }): Promise<ApiResponse<User>>
    return this.post('/users', userData);
  }
  
  // コメント関連のAPI
  async getPostComments(postId) {
    // TypeScriptでは: async getPostComments(postId: string): Promise<ApiResponse<Comment[]>>
    return this.get("/posts/" + postId + "/comments");
  }
  
  async createComment(postId, content) {
    // TypeScriptでは: async createComment(postId: string, content: string): Promise<ApiResponse<Comment>>
    return this.post("/posts/" + postId + "/comments", { content });
  }
  
  async deleteComment(commentId) {
    // TypeScriptでは: async deleteComment(commentId: string): Promise<ApiResponse<void>>
    return this.delete("/comments/" + commentId);
  }
}

// TODO: 5. サービス層を実装してください

class BlogService {
  constructor(apiClient) {
    // TypeScriptでは: constructor(private apiClient: BlogApiClient)
    this.apiClient = apiClient;
  }
  
  // 公開済み記事を取得
  async getPublishedPosts(page = 1, limit = 10) {
    // TypeScriptでは: async getPublishedPosts(page: number = 1, limit: number = 10): Promise<BlogPost[]>
    try {
      let response = await this.apiClient.getPosts({
        published: true,
        page: page,
        limit: limit
      });
      
      return response.success ? response.data : [];
    } catch (error) {
      console.error('公開記事取得エラー:', error);
      return [];
    }
  }
  
  // 記事を検索
  async searchPosts(query, tags = []) {
    // TypeScriptでは: async searchPosts(query: string, tags: string[] = []): Promise<BlogPost[]>
    try {
      let filters = { search: query };
      if (tags.length > 0) {
        filters.tags = tags;
      }
      
      let response = await this.apiClient.getPosts(filters);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('記事検索エラー:', error);
      return [];
    }
  }
  
  // 下書きを作成
  async createDraft(title, content, tags = []) {
    // TypeScriptでは: async createDraft(title: string, content: string, tags: string[] = []): Promise<BlogPost | null>
    try {
      let postData = {
        title: title,
        content: content,
        excerpt: content.substring(0, 100) + "...",
        tags: tags
      };
      
      let response = await this.apiClient.createPost(postData);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('下書き作成エラー:', error);
      return null;
    }
  }
  
  // 記事を公開
  async publishDraft(postId) {
    // TypeScriptでは: async publishDraft(postId: string): Promise<boolean>
    try {
      let response = await this.apiClient.publishPost(postId);
      return response.success;
    } catch (error) {
      console.error('記事公開エラー:', error);
      return false;
    }
  }
}

class UserService {
  constructor(apiClient) {
    // TypeScriptでは: constructor(private apiClient: BlogApiClient)
    this.apiClient = apiClient;
  }
  
  // 全ユーザーを取得
  async getAllUsers() {
    // TypeScriptでは: async getAllUsers(): Promise<User[]>
    try {
      let response = await this.apiClient.getUsers();
      return response.success ? response.data : [];
    } catch (error) {
      console.error('ユーザー取得エラー:', error);
      return [];
    }
  }
  
  // ユーザーを作成
  async createUser(name, email, bio = '') {
    // TypeScriptでは: async createUser(name: string, email: string, bio: string = ''): Promise<User | null>
    try {
      let userData = { name, email, bio };
      let response = await this.apiClient.createUser(userData);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('ユーザー作成エラー:', error);
      return null;
    }
  }
  
  // ユーザープロフィールを取得
  async getUserProfile(userId) {
    // TypeScriptでは: async getUserProfile(userId: string): Promise<User | null>
    try {
      let response = await this.apiClient.getUser(userId);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('ユーザープロフィール取得エラー:', error);
      return null;
    }
  }
}

class CommentService {
  constructor(apiClient) {
    // TypeScriptでは: constructor(private apiClient: BlogApiClient)
    this.apiClient = apiClient;
  }
  
  // 記事のコメントを取得
  async getPostComments(postId) {
    // TypeScriptでは: async getPostComments(postId: string): Promise<Comment[]>
    try {
      let response = await this.apiClient.getPostComments(postId);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('コメント取得エラー:', error);
      return [];
    }
  }
  
  // コメントを追加
  async addComment(postId, content) {
    // TypeScriptでは: async addComment(postId: string, content: string): Promise<Comment | null>
    try {
      let response = await this.apiClient.createComment(postId, content);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('コメント追加エラー:', error);
      return null;
    }
  }
}

// TODO: 6. ブログアプリケーションクラスを作成してください

class BlogApp {
  constructor(apiBaseUrl, authToken) {
    // TypeScriptでは: constructor(apiBaseUrl: string, authToken?: string)
    this.apiClient = new BlogApiClient(apiBaseUrl, authToken);
    this.blogService = new BlogService(this.apiClient);
    this.userService = new UserService(this.apiClient);
    this.commentService = new CommentService(this.apiClient);
  }
  
  // アプリケーションの初期化
  async initialize() {
    console.log("=== ブログアプリケーション初期化 ===");
    
    try {
      // ユーザー一覧を取得
      let users = await this.userService.getAllUsers();
      console.log("登録ユーザー数:", users.length);
      
      // 公開記事を取得
      let posts = await this.blogService.getPublishedPosts(1, 5);
      console.log("公開記事数:", posts.length);
      
      return true;
    } catch (error) {
      console.error("初期化エラー:", error);
      return false;
    }
  }
  
  // 記事作成のデモ
  async createPostDemo() {
    console.log("\\n=== 記事作成デモ ===");
    
    // 新しい記事を作成
    let newPost = await this.blogService.createDraft(
      "TypeScriptで型安全なAPIクライアントを作る方法",
      "この記事では、TypeScriptを使って型安全なAPIクライアントを作成する方法について詳しく解説します。まず、API レスポンスの型定義から始めて、HTTPクライアントの実装、エラーハンドリング、そしてサービス層の設計まで、実践的なアプローチで学んでいきます。",
      ["TypeScript", "API", "型安全性", "ウェブ開発"]
    );
    
    if (newPost) {
      console.log("✅ 下書きを作成しました:", newPost.title);
      
      // 作成した記事を公開
      let published = await this.blogService.publishDraft(newPost.id);
      if (published) {
        console.log("✅ 記事を公開しました");
      } else {
        console.log("❌ 記事の公開に失敗しました");
      }
    } else {
      console.log("❌ 下書きの作成に失敗しました");
    }
  }
  
  // 記事検索のデモ
  async searchPostsDemo() {
    console.log("\\n=== 記事検索デモ ===");
    
    // キーワード検索
    let searchResults = await this.blogService.searchPosts("TypeScript");
    console.log("'TypeScript'の検索結果:", searchResults.length + "件");
    
    // タグ検索
    let tagResults = await this.blogService.searchPosts("", ["API", "型安全性"]);
    console.log("タグ検索結果:", tagResults.length + "件");
  }
  
  // ユーザー作成のデモ
  async createUserDemo() {
    console.log("\\n=== ユーザー作成デモ ===");
    
    let newUser = await this.userService.createUser(
      "田中太郎",
      "tanaka@example.com",
      "TypeScriptとReactが好きなフロントエンドエンジニアです"
    );
    
    if (newUser) {
      console.log("✅ ユーザーを作成しました:", newUser.name);
      
      // 作成したユーザーのプロフィールを取得
      let profile = await this.userService.getUserProfile(newUser.id);
      if (profile) {
        console.log("ユーザープロフィール:", profile.name, "-", profile.bio);
      }
    } else {
      console.log("❌ ユーザーの作成に失敗しました");
    }
  }
  
  // コメント機能のデモ
  async commentDemo() {
    console.log("\\n=== コメント機能デモ ===");
    
    // 記事一覧を取得
    let posts = await this.blogService.getPublishedPosts(1, 1);
    
    if (posts.length > 0) {
      let post = posts[0];
      console.log("記事:", post.title);
      
      // コメントを追加
      let newComment = await this.commentService.addComment(
        post.id,
        "素晴らしい記事ですね！TypeScriptの型安全性についてとても勉強になりました。"
      );
      
      if (newComment) {
        console.log("✅ コメントを追加しました");
        
        // 記事のコメント一覧を取得
        let comments = await this.commentService.getPostComments(post.id);
        console.log("この記事のコメント数:", comments.length);
      } else {
        console.log("❌ コメントの追加に失敗しました");
      }
    } else {
      console.log("記事が見つかりません");
    }
  }
}

// TODO: 7. アプリケーションをテストしてください

console.log("=== ブログAPI設計演習を開始します ===");

async function runBlogAppDemo() {
  // ブログアプリケーションを初期化
  let app = new BlogApp("https://api.blog.example.com", "demo-auth-token");
  
  // 初期化
  let initialized = await app.initialize();
  if (!initialized) {
    console.log("❌ アプリケーションの初期化に失敗しました");
    return;
  }
  
  // 各機能のデモを実行
  await app.createUserDemo();
  await app.createPostDemo();
  await app.searchPostsDemo();
  await app.commentDemo();
  
  console.log("\\n=== すべてのデモが完了しました ===");
  console.log("学習したAPI設計の要素:");
  console.log("- HTTPクライアントの基底クラス設計");
  console.log("- API レスポンス・エラーの型定義");
  console.log("- エンティティ型の設計");
  console.log("- サービス層による抽象化");
  console.log("- エラーハンドリングとログ出力");
  console.log("- RESTful APIの設計パターン");
}

// デモを実行
runBlogAppDemo().catch(console.error);`,

  exerciseHints: [
    "API レスポンスの型定義では、成功・失敗の両方のケースを考慮しましょう",
    "HTTPクライアントの基底クラスで共通処理をまとめることで再利用性が向上します",
    "サービス層でAPIクライアントをラップすることでビジネスロジックを分離できます",
    "エラーハンドリングは各層で適切に行い、ユーザーにとって有用な情報を提供しましょう",
    "実際のAPIが利用できない環境ではモックデータを使って動作を確認できます"
  ],

  testCases: [
    {
      id: "test1",
      description: "HttpClientクラスが正しく動作する",
      testFunction: "() => { let client = new HttpClient('https://api.example.com'); return typeof client.get === 'function' && typeof client.post === 'function'; }"
    },
    {
      id: "test2",
      description: "BlogApiClientクラスが正しく動作する",
      testFunction: "() => { let client = new BlogApiClient('https://api.example.com'); return typeof client.getPosts === 'function' && typeof client.createPost === 'function'; }"
    },
    {
      id: "test3",
      description: "BlogServiceクラスが正しく動作する",
      testFunction: "() => { let apiClient = new BlogApiClient('https://api.example.com'); let service = new BlogService(apiClient); return typeof service.getPublishedPosts === 'function'; }"
    },
    {
      id: "test4",
      description: "UserServiceクラスが正しく動作する",
      testFunction: "() => { let apiClient = new BlogApiClient('https://api.example.com'); let service = new UserService(apiClient); return typeof service.getAllUsers === 'function'; }"
    },
    {
      id: "test5",
      description: "BlogAppクラスが正しく動作する",
      testFunction: "() => { let app = new BlogApp('https://api.example.com'); return typeof app.initialize === 'function' && app.blogService && app.userService; }"
    }
  ],

  exerciseDifficulty: 'hard'
} as const