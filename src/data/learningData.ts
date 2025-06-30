import type { LearningDay, PhaseInfo } from '@/types/learning'

export const learningData: LearningDay[] = [
  // Phase 1: JavaScript復習（基礎文法）
  {
    day: 1,
    title: "変数の宣言と基本型の理解",
    goal: "let, const, var の違いが説明できる",
    completion: "基本的な変数の使い分けができる",
    task: "名前と年齢を変数に代入してコンソールに表示",
    phase: 1
  },
  {
    day: 2,
    title: "条件分岐と比較演算子",
    goal: "条件分岐を用いた基本ロジックが書ける",
    completion: "if/switch 文を使える",
    task: "年齢に応じた出力（例: 未成年/成人）を表示",
    phase: 1
  },
  {
    day: 3,
    title: "配列とループ",
    goal: "配列操作と繰り返し処理の基礎を理解する",
    completion: "for, forEach, map を使い分けできる",
    task: "果物リストをすべて大文字にして出力",
    phase: 1
  },
  {
    day: 4,
    title: "関数の定義と使い方",
    goal: "関数定義とアロー関数を理解する",
    completion: "引数・戻り値のある関数を定義できる",
    task: "税率を加算する関数を定義して呼び出し",
    phase: 1
  },
  {
    day: 5,
    title: "オブジェクトの基本",
    goal: "オブジェクトの作成とアクセスを理解する",
    completion: "メソッド付きオブジェクトを使える",
    task: "user オブジェクトと sayHello() メソッドを実装",
    phase: 1
  },
  {
    day: 6,
    title: "DOM操作とイベント",
    goal: "DOMへのアクセスとイベント処理の基本を学ぶ",
    completion: "簡単なイベントリスナーが書ける",
    task: "ボタンを押したら「こんにちは」と表示",
    phase: 1
  },
  {
    day: 7,
    title: "総復習とミニアプリ",
    goal: "一連の構文を組み合わせて使える",
    completion: "JSでUI操作ができる",
    task: "入力された名前を使って挨拶を表示するHTML+JSアプリ",
    phase: 1
  },
  // Phase 2: TypeScript入門
  {
    day: 8,
    title: "TypeScriptとは",
    goal: "型があることの利点を理解する",
    completion: "JSとの違いを説明できる",
    task: "型あり/なし変数の比較コードを書く",
    phase: 2
  },
  {
    day: 9,
    title: "基本の型",
    goal: "number, string, boolean を使いこなす",
    completion: "それぞれの変数が定義・使用できる",
    task: "氏名、年齢、ログイン中かどうかのフラグを定義",
    phase: 2
  },
  {
    day: 10,
    title: "配列とオブジェクトの型",
    goal: "型付き配列とオブジェクトが作れる",
    completion: "User[] 型を定義し使える",
    task: "ユーザーリストを作成し、出力",
    phase: 2
  },
  {
    day: 11,
    title: "関数に型をつける",
    goal: "関数の引数と戻り値に型をつける",
    completion: "シグネチャを定義できる",
    task: "2つの数を受け取り加算する関数を作成",
    phase: 2
  },
  {
    day: 12,
    title: "Union型とLiteral型",
    goal: "複数の型や文字列限定型を理解する",
    completion: "Union/Literal型の使い分けができる",
    task: '"admin" | "user" を受け取る関数を定義',
    phase: 2
  },
  {
    day: 13,
    title: "Interfaceと継承",
    goal: "Interfaceの定義と拡張を理解する",
    completion: "複数の型構造を再利用できる",
    task: "Person → Employee を継承してオブジェクト作成",
    phase: 2
  },
  {
    day: 14,
    title: "クラスとTypeScript",
    goal: "クラスの定義と型注釈を理解する",
    completion: "メソッドを含むクラスを作れる",
    task: "User クラスを作り、名前とログインメソッドを実装",
    phase: 2
  },
  // Phase 3: TypeScript実践応用
  {
    day: 15,
    title: "Generics",
    goal: "ジェネリクスの定義と利用方法を理解する",
    completion: "<T> を使った関数が書ける",
    task: "任意の配列の先頭要素を返す getFirst<T>() を作成",
    phase: 3
  },
  {
    day: 16,
    title: "型ガード",
    goal: "型による分岐（型ガード）を理解する",
    completion: "typeof, in, instanceof を使える",
    task: "型に応じて処理が変わる関数を定義",
    phase: 3
  },
  {
    day: 17,
    title: "Promiseと非同期処理",
    goal: "非同期関数に型を付ける方法を理解する",
    completion: "Promise<T> を返す関数が書ける",
    task: "APIから取得したデータの型を定義して取得関数を実装",
    phase: 3
  },
  {
    day: 18,
    title: "Utility Types",
    goal: "Partial, Pick, Record の使い方を理解",
    completion: "Utility Typesを使って型を柔軟に変更できる",
    task: "User から一部のプロパティだけを抽出して使う",
    phase: 3
  },
  {
    day: 19,
    title: "API設計",
    goal: "フロントエンドの型安全なAPI呼び出しを設計する",
    completion: "fetchの戻り値に型を定義できる",
    task: "データ取得関数とレスポンス型を分けて記述",
    phase: 3
  },
  {
    day: 20,
    title: "総仕上げミニプロジェクト",
    goal: "TypeScriptの型システム全般を応用できる",
    completion: "型安全なフォームアプリを実装できる",
    task: "名前と年齢を入力して出力するTypeScript製アプリ（Playground上）",
    phase: 3
  }
]

export const phaseInfo: PhaseInfo[] = [
  {
    id: 1,
    title: "Phase 1: JavaScript復習（基礎文法）",
    description: "TypeScriptを学ぶ前に、JavaScriptの基礎をしっかりと固めましょう。7日間でJavaScriptの核となる概念を復習します。",
    color: "#2196F3"
  },
  {
    id: 2,
    title: "Phase 2: TypeScript入門",
    description: "いよいよTypeScriptの世界へ！型システムの基礎から、実践的な使い方まで7日間で学習します。",
    color: "#FF9800"
  },
  {
    id: 3,
    title: "Phase 3: TypeScript実践応用",
    description: "高度なTypeScript機能を学び、実際のプロジェクトで使える実践的なスキルを身につけます。",
    color: "#9C27B0"
  }
]