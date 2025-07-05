import type { LessonContent } from '@/types/content'

export const day05: LessonContent = {
  day: 5,
  title: "オブジェクトの基本",
  goal: "オブジェクトの作成とアクセスを理解する",
  completion: "メソッド付きオブジェクトを使える",
  task: "user オブジェクトと sayHello() メソッドを実装",
  phase: 1,
  difficulty: 'beginner',
  estimatedTime: 20,
  tags: ['オブジェクト', 'メソッド', 'プロパティ', 'JavaScript'],
  prerequisites: [1, 2, 3, 4],
  hints: [
    "オブジェクトは {} で囲んで作成します",
    "プロパティはオブジェクトの属性（データ）です",
    "メソッドはオブジェクトの関数です",
    "ドット記法 (obj.property) でアクセスできます",
    "オブジェクトは複数のデータをまとめて管理できます"
  ],
  sampleCode: `// オブジェクトの作成
const user = {
  name: "田中太郎",
  age: 25,
  email: "tanaka@example.com",
  
  // メソッド（関数）の定義
  sayHello: function() {
    return "Hello, 私の名前は" + this.name + "です。";
  },
  
  // アロー関数でメソッド定義（非推奨：thisが使えない）
  getInfo: () => {
    return "情報を表示します";
  }
};

// プロパティへのアクセス
console.log("名前:", user.name);
console.log("年齢:", user.age);

// メソッドの呼び出し
console.log(user.sayHello());
console.log(user.getInfo());

// プロパティの変更
user.age = 26;
console.log("更新後の年齢:", user.age);`,
  explanation: "オブジェクトは関連するデータと機能（メソッド）をまとめて管理できる便利なデータ構造です。",

  // 演習機能追加
  exerciseCode: `// 演習: 商品オブジェクトを作成してください
// TODO: productオブジェクトを作成してください
const product = {
  // TODO: 商品名（name）を追加
  
  // TODO: 価格（price）を追加
  
  // TODO: 在庫数（stock）を追加
  
  // TODO: 商品情報を表示するメソッド（getInfo）を追加
  getInfo: function() {
    // ここに実装
  }
};

// TODO: 商品情報を表示してください
console.log(product.getInfo());`,

  exerciseHints: [
    "name, price, stock のプロパティを追加しましょう",
    "price は数値、name は文字列で設定します",
    "getInfoメソッドで this.name, this.price を使います",
    "return で文字列を返します： 「商品: マグカップ, 価格: 500円」",
    "this キーワードで自分自身のプロパティにアクセス"
  ],

  testCases: [
    {
      id: "test1",
      description: "productオブジェクトはnameプロパティが定義されている",
      testFunction: "() => typeof product.name === 'string' && product.name.length > 0"
    },
    {
      id: "test2",
      description: "productオブジェクトにpriceプロパティが定義されている",
      testFunction: "() => typeof product.price === 'number' && product.price > 0"
    },
    {
      id: "test3",
      description: "getInfoメソッドが正しく定義されている",
      testFunction: "() => typeof product.getInfo === 'function'"
    },
    {
      id: "test4",
      description: "getInfoメソッドが適切な文字列を返す",
      testFunction: "() => { const info = product.getInfo(); return typeof info === 'string' && info.includes(product.name); }"
    }
  ],

  exerciseDifficulty: 'easy'
} as const