import type { LessonContent } from '@/types/content'

export const day09: LessonContent = {
  day: 9,
  title: "基本の型",
  goal: "number, string, boolean を使いこなす",
  completion: "それぞれの変数が定義・使用できる",
  task: "氏名、年齢、ログイン中かどうかのフラグを定義",
  phase: 2,
  difficulty: 'beginner',
  estimatedTime: 15,
  tags: ['number', 'string', 'boolean', 'プリミティブ型'],
  prerequisites: [8],
  hints: [
    "プリミティブ型（string, number, boolean）はTypeScriptの基本となる型です",
    "型注釈は「変数名: 型名」の形式で記述します",
    "文字列は'または\"で囲み、数値は整数・小数点数ともにnumber型です",
    "booleanは true または false の2つの値のみを持ちます",
    "型推論により、初期値から型が自動的に決まることも多いです"
  ],
  initialCode: `// 基本型を使ってユーザー情報を定義してみましょう
// 氏名、年齢、ログイン中かどうかのフラグを定義してください

// 基本型の変数定義（本来はTypeScriptで型注釈を付けます）
let userName = "田中太郎"; // string型（本来: let userName: string）
let userAge = 30; // number型（本来: let userAge: number）
let isLoggedIn = true; // boolean型（本来: let isLoggedIn: boolean）

// コンソールに表示
console.log("氏名:", userName);
console.log("年齢:", userAge);
console.log("ログイン中:", isLoggedIn);

// TypeScriptでは以下のように型注釈を付けます：
// let userName: string = "田中太郎";
// let userAge: number = 30;
// let isLoggedIn: boolean = true;`,
  sampleCode: `// 基本のプリミティブ型
let userName: string = "田中太郎";
let userAge: number = 25;
let isLoggedIn: boolean = true;

// 型推論を使った場合（型注釈を省略）
let companyName = "株式会社TypeScript"; // string型として推論
let employeeCount = 150; // number型として推論
let hasOffice = true; // boolean型として推論

// 数値の詳細例
let integer: number = 42;
let decimal: number = 3.14;
let negative: number = -100;
let scientific: number = 1e5; // 100000

// 文字列の詳細例
let singleQuote: string = '単一引用符';
let doubleQuote: string = "二重引用符";
let templateLiteral: string = \`テンプレートリテラル: \${userName}\`;

// 実用例：ユーザー情報の表示
function displayUserInfo(name: string, age: number, loggedIn: boolean): string {
  return \`ユーザー: \${name}, 年齢: \${age}, ログイン状態: \${loggedIn ? "ログイン中" : "ログアウト"}\`;
}

console.log(displayUserInfo(userName, userAge, isLoggedIn));`,
  explanation: "TypeScriptの基本型（string, number, boolean）はプリミティブ型と呼ばれ、最も基本的なデータ型です。これらの型を適切に使うことで、型安全なコードを書くことができます。型推論により、初期値から自動的に型が決まることも多いため、常に型注釈を書く必要はありません。",

  // 演習機能追加
  exerciseCode: `// 演習: 基本型を使った学生管理システム
// 学生の基本情報を管理するシステムを作成してください

// TODO: 1. 学生の基本情報を定義してください
let studentName = ""; // 学生の名前を入力してください
let studentAge = 0;   // 学生の年齢を入力してください  
let hasLicense = false; // 運転免許を持っているかどうか

// TODO: 2. 科目の点数を定義してください
let mathScore = 0;     // 数学の点数（0-100）
let englishScore = 0;  // 英語の点数（0-100）
let scienceScore = 0;  // 理科の点数（0-100）

// TODO: 3. 学生情報を表示する関数を作成してください
function displayStudentInfo(name, age, license, math, english, science) {
  // 平均点を計算
  let average = (math + english + science) / 3;
  
  // 等級を判定
  let grade;
  if (average >= 90) {
    grade = "A";
  } else if (average >= 80) {
    grade = "B"; 
  } else if (average >= 70) {
    grade = "C";
  } else {
    grade = "D";
  }
  
  // 結果を文字列で返す
  return "学生名: " + name + 
         ", 年齢: " + age + 
         ", 免許: " + (license ? "あり" : "なし") +
         ", 平均点: " + Math.round(average) + 
         ", 評価: " + grade;
}

// TODO: 4. 値を設定して実行してください
studentName = "田中花子";
studentAge = 18;
hasLicense = false;
mathScore = 85;
englishScore = 92;
scienceScore = 78;

// 結果を表示
let result = displayStudentInfo(studentName, studentAge, hasLicense, mathScore, englishScore, scienceScore);
console.log(result);

// TODO: 5. 型推論の確認
let schoolName = "〇〇高等学校"; // 自動的にstring型として推論
let studentCount = 500;        // 自動的にnumber型として推論
let isPublic = true;          // 自動的にboolean型として推論

console.log("学校名:", schoolName);
console.log("生徒数:", studentCount);
console.log("公立:", isPublic);`,

  exerciseHints: [
    "string型: 文字列データを格納します（名前、メッセージなど）",
    "number型: 数値データを格納します（年齢、点数など）",
    "boolean型: true/falseの真偽値を格納します",
    "if文で条件分岐を行い、平均点から等級を判定します",
    "Math.round()で小数点以下を四捨五入できます"
  ],

  testCases: [
    {
      id: "test1",
      description: "studentName変数に空でない文字列が設定されている",
      testFunction: "() => typeof studentName === 'string' && studentName.length > 0"
    },
    {
      id: "test2", 
      description: "studentAge変数に0より大きい数値が設定されている",
      testFunction: "() => typeof studentAge === 'number' && studentAge > 0"
    },
    {
      id: "test3",
      description: "hasLicense変数がboolean型で設定されている", 
      testFunction: "() => typeof hasLicense === 'boolean'"
    },
    {
      id: "test4",
      description: "点数が0-100の範囲で設定されている",
      testFunction: "() => typeof mathScore === 'number' && mathScore >= 0 && mathScore <= 100 && typeof englishScore === 'number' && englishScore >= 0 && englishScore <= 100"
    },
    {
      id: "test5",
      description: "displayStudentInfo関数が正しく動作する",
      testFunction: "() => { let result = displayStudentInfo('テスト', 20, true, 80, 85, 90); return typeof result === 'string' && result.includes('テスト') && result.includes('20'); }"
    }
  ],

  exerciseDifficulty: 'easy'
} as const