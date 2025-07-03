import type { LessonContent } from '@/types/content'

export const day12: LessonContent = {
  day: 12,
  title: "Union型とLiteral型",
  goal: "複数の型や文字列限定型を理解する",
  completion: "Union/Literal型の使い分けができる",
  task: '"admin" | "user" を受け取る関数を定義',
  phase: 2,
  difficulty: 'intermediate',
  estimatedTime: 20,
  tags: ['Union型', 'Literal型', '高度な型'],
  prerequisites: [8, 9, 10, 11],
  hints: [
    "Union型は「|」を使って複数の型を組み合わせます（例：string | number）",
    "Literal型は特定の値のみを許可する型です（例：'admin' | 'user'）",
    "Union型を使う際は、型ガードで分岐処理を行うことが多いです",
    "Literal型はEnumの代替として使うことができ、より軽量です",
    "Union型とLiteral型を組み合わせることで柔軟な型定義が可能になります"
  ],
  initialCode: `// Union型とLiteral型を学ぼう
// TODO: "admin" | "user" を受け取る関数を定義してください

// 1. Union型の基本 - 複数の型を組み合わせる
function formatId(id: string | number): string {
  // typeof を使って型を判定し、適切な処理を行う
  if (typeof id === "string") {
    return \`ID: \${id}\`;
  } else {
    return \`ID: \${id.toString()}\`;
  }
}

// 2. Literal型の定義 - 特定の文字列のみを許可
type UserRole = 'admin' | 'user' | 'guest';

// 3. Literal型を使った関数を定義してみよう
function checkPermission(role: UserRole): boolean {
  // TODO: roleに応じて権限の有無を返すswitch文を書いてください
  switch (role) {
    case 'admin':
      return true; // 管理者は全ての権限を持つ
    case 'user':
      return true; // ユーザーは基本的な権限を持つ
    case 'guest':
      return false; // ゲストは権限なし
    default:
      // すべてのケースを網羅していることを確認
      const exhaustiveCheck: never = role;
      return exhaustiveCheck;
  }
}

// 4. 使用例
console.log(formatId("ABC123")); // "ID: ABC123"
console.log(formatId(42)); // "ID: 42"

const userRole: UserRole = 'admin';
console.log(checkPermission(userRole)); // true

// 5. 試してみよう
// 以下のコードを実行して、型エラーが発生することを確認してください
// const invalidRole: UserRole = 'manager'; // エラー: 'manager' は 'admin' | 'user' | 'guest' に割り当てできません`,
  sampleCode: `// Union型の基本
function formatId(id: string | number): string {
  // 型ガードを使って分岐
  if (typeof id === "string") {
    return \`ID: \${id.toUpperCase()}\`;
  } else {
    return \`ID: \${id.toString().padStart(6, '0')}\`;
  }
}

// Literal型の定義
type UserRole = 'admin' | 'user' | 'guest';
type Status = 'pending' | 'approved' | 'rejected';

// Literal型を使った関数
function checkPermission(role: UserRole): boolean {
  switch (role) {
    case 'admin':
      return true;
    case 'user':
      return true;
    case 'guest':
      return false;
    default:
      // TypeScriptが全てのケースをチェックしていることを保証
      const exhaustiveCheck: never = role;
      return exhaustiveCheck;
  }
}

// 複雑なUnion型の例
type ApiResponse = 
  | { success: true; data: any }
  | { success: false; error: string };

function handleApiResponse(response: ApiResponse): void {
  if (response.success) {
    console.log('データ:', response.data);
  } else {
    console.error('エラー:', response.error);
  }
}

// オブジェクトのUnion型
type Shape = 
  | { type: 'circle'; radius: number }
  | { type: 'rectangle'; width: number; height: number }
  | { type: 'triangle'; base: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.type) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
    default:
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck;
  }
}

// 実用例
const userRole: UserRole = 'admin';
console.log(checkPermission(userRole)); // true

console.log(formatId("ABC123")); // ID: ABC123
console.log(formatId(42)); // ID: 000042

const successResponse: ApiResponse = { success: true, data: { name: "田中" } };
const errorResponse: ApiResponse = { success: false, error: "ユーザーが見つかりません" };

handleApiResponse(successResponse); // データ: { name: "田中" }
handleApiResponse(errorResponse); // エラー: ユーザーが見つかりません

const circle: Shape = { type: 'circle', radius: 5 };
const rectangle: Shape = { type: 'rectangle', width: 10, height: 20 };

console.log(calculateArea(circle)); // 78.54
console.log(calculateArea(rectangle)); // 200`,
  explanation: "Union型（|）は複数の型のいずれかを表現し、Literal型は特定の値のみを許可します。Union型を使用する際は型ガードで分岐処理を行い、Literal型は型安全な定数値の定義に適しています。この組み合わせにより、柔軟で安全な型定義が可能になり、APIレスポンスの型定義や状態管理などで威力を発揮します。"
} as const