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
// TypeScriptでは: function formatId(id: string | number): string {
function formatId(id) {
  // typeof を使って型を判定し、適切な処理を行う
  if (typeof id === "string") {
    return \`ID: \${id}\`;
  } else {
    return \`ID: \${id.toString()}\`;
  }
}

// 2. Literal型の定義 - 特定の文字列のみを許可
// TypeScriptでは: type UserRole = 'admin' | 'user' | 'guest';
// JavaScriptでは型は定義しませんが、'admin' | 'user' | 'guest' のいずれかの値を使用

// 3. Literal型を使った関数を定義してみよう
// TypeScriptでは: function checkPermission(role: UserRole): boolean {
function checkPermission(role) {
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
      // TypeScriptでは: const exhaustiveCheck: never = role;
      console.error("予期しないrole:", role);
      return false;
  }
}

// 4. 使用例
console.log(formatId("ABC123")); // "ID: ABC123"
console.log(formatId(42)); // "ID: 42"

// TypeScriptでは: const userRole: UserRole = 'admin';
const userRole = 'admin';
console.log(checkPermission(userRole)); // true

// 5. 試してみよう
// TypeScriptでは以下はエラーになりますが、JavaScriptでは実行時エラーになります
// const invalidRole = 'manager'; // 'admin' | 'user' | 'guest' 以外の値`,
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
  explanation: "Union型（|）は複数の型のいずれかを表現し、Literal型は特定の値のみを許可します。Union型を使用する際は型ガードで分岐処理を行い、Literal型は型安全な定数値の定義に適しています。この組み合わせにより、柔軟で安全な型定義が可能になり、APIレスポンスの型定義や状態管理などで威力を発揮します。",

  // 演習機能追加
  exerciseCode: `// 演習: 注文システムの状態管理を作成しよう
// Union型とLiteral型を使って注文の状態を管理するシステムを実装してください

// TODO: 1. 注文状態の型を定義してください（Literal型）
// TypeScriptでは: type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
// JavaScriptでは状態の値として 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled' を使用

// TODO: 2. 商品IDの型を定義してください（Union型）
// TypeScriptでは: type ProductId = string | number;
// JavaScriptでは文字列または数値のIDを使用

// TODO: 3. 注文オブジェクトを定義してください
let order1 = {
  id: "", // 注文ID（文字列または数値）
  status: "", // 注文状態（上記のいずれか）
  productName: "",
  quantity: 0,
  price: 0
};

// TODO: 4. 注文状態をチェックする関数を作成してください
function checkOrderStatus(status) {
  // TypeScriptでは: function checkOrderStatus(status: OrderStatus): string
  switch (status) {
    case 'pending':
      return "注文受付中です";
    case 'confirmed':
      return "注文が確定しました";
    case 'shipped':
      return "商品が発送されました";
    case 'delivered':
      return "商品が配達されました";
    case 'cancelled':
      return "注文がキャンセルされました";
    default:
      return "不明な状態です";
  }
}

// TODO: 5. 商品IDを整形する関数を作成してください
function formatProductId(id) {
  // TypeScriptでは: function formatProductId(id: ProductId): string
  if (typeof id === "string") {
    return "PROD-" + id.toUpperCase();
  } else {
    return "PROD-" + id.toString().padStart(6, "0");
  }
}

// TODO: 6. 注文を更新する関数を作成してください
function updateOrderStatus(order, newStatus) {
  // TypeScriptでは: function updateOrderStatus(order: any, newStatus: OrderStatus): void
  let oldStatus = order.status;
  order.status = newStatus;
  
  console.log("注文 " + order.id + " の状態が " + oldStatus + " から " + newStatus + " に更新されました");
  console.log("現在の状態: " + checkOrderStatus(newStatus));
}

// TODO: 7. 実際の注文データを設定してテストしてください
order1.id = "ORD001";
order1.status = "pending";
order1.productName = "TypeScript入門書";
order1.quantity = 2;
order1.price = 3000;

// テスト実行
console.log("=== 注文情報 ===");
console.log("注文ID:", formatProductId(order1.id));
console.log("商品名:", order1.productName);
console.log("数量:", order1.quantity);
console.log("価格:", order1.price + "円");
console.log("状態:", checkOrderStatus(order1.status));

console.log("\\n=== 状態更新テスト ===");
updateOrderStatus(order1, "confirmed");
updateOrderStatus(order1, "shipped");
updateOrderStatus(order1, "delivered");

// TODO: 8. 数値IDのテスト
let order2 = {
  id: 12345,
  status: "pending",
  productName: "JavaScript完全ガイド",
  quantity: 1,
  price: 4500
};

console.log("\\n=== 数値ID注文テスト ===");
console.log("注文ID:", formatProductId(order2.id));
console.log("状態:", checkOrderStatus(order2.status));`,

  exerciseHints: [
    "Literal型は特定の文字列値のみを許可する型です（例: 'pending' | 'confirmed'）",
    "Union型は複数の型を組み合わせます（例: string | number）",
    "switch文でLiteral型の全ケースを処理できます",
    "typeof演算子を使ってUnion型の型ガードを行います",
    "padStart()メソッドで数値を指定桁数の文字列に変換できます"
  ],

  testCases: [
    {
      id: "test1",
      description: "order1オブジェクトが正しく設定されている",
      testFunction: "() => typeof order1.id === 'string' && order1.id.length > 0 && typeof order1.status === 'string'"
    },
    {
      id: "test2",
      description: "checkOrderStatus関数が正しく動作する",
      testFunction: "() => { let result = checkOrderStatus('pending'); return typeof result === 'string' && result.includes('受付中'); }"
    },
    {
      id: "test3", 
      description: "formatProductId関数が文字列IDで正しく動作する",
      testFunction: "() => { let result = formatProductId('abc123'); return typeof result === 'string' && result.includes('PROD-') && result.includes('ABC123'); }"
    },
    {
      id: "test4",
      description: "formatProductId関数が数値IDで正しく動作する",
      testFunction: "() => { let result = formatProductId(123); return typeof result === 'string' && result.includes('PROD-') && result.includes('000123'); }"
    },
    {
      id: "test5",
      description: "updateOrderStatus関数が正しく動作する",
      testFunction: "() => { let testOrder = {id: 'test', status: 'pending'}; updateOrderStatus(testOrder, 'confirmed'); return testOrder.status === 'confirmed'; }"
    }
  ],

  exerciseDifficulty: 'medium'
} as const