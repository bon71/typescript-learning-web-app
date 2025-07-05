import type { LessonContent } from '@/types/content'

export const day01: LessonContent = {
  day: 1,
  title: "変数の宣言と基本型の理解",
  goal: "let, const, var の違いが説明できる",
  completion: "基本的な変数の使い分けができる",
  task: "名前と年齢を変数に代入してコンソールに表示",
  phase: 1,
  difficulty: 'beginner',
  estimatedTime: 15,
  tags: ['変数', 'スコープ', '基本文法', 'JavaScript'],
  prerequisites: [],
  hints: [
    "letは再代入可能な変数宣言です",
    "constは定数（再代入不可）の宣言です",
    "varは古い書き方なので、現在は避けましょう",
    "console.log()を使って値を確認できます"
  ],
  sampleCode: `// 変数の宣言と基本型
let name = "太郎";     // 文字列型（再代入可能）
const age = 25;       // 数値型（再代入不可）
var isStudent = true; // ブール型（古い書き方、できるだけ避ける）

// コンソールに表示
console.log("名前:", name);
console.log("年齢:", age);
console.log("学生かどうか:", isStudent);

// let と const の違い
let changeable = "変更可能";
changeable = "変更されました";  // OK

// const の値は変更できない
// const unchangeable = "変更不可";
// unchangeable = "変更しようとする"; // エラー！

console.log("変更可能な変数:", changeable);`,
  explanation: "let は再代入可能、const は再代入不可能です。var は古い書き方なので、現在では let や const を使いましょう。",
  
  // 演習機能追加
  exerciseCode: `// 演習: 自己紹介プログラムを作成してください
// TODO: あなたの名前を変数に代入してください
const myName = "";

// TODO: あなたの年齢を変数に代入してください  
const myAge = 0;

// TODO: あなたの趣味を変数に代入してください
let myHobby = "";

// TODO: 自己紹介メッセージを作成してください
// ヒント: テンプレートリテラル \`\${}\` を使用
const introduction = "";

// 結果をコンソールに表示
console.log(introduction);`,

  exerciseHints: [
    "myName には文字列で名前を入れましょう（例: \"田中太郎\"）",
    "myAge には数値で年齢を入れましょう（例: 25）",
    "myHobby には趣味を文字列で入れましょう（例: \"読書\"）",
    "テンプレートリテラルを使って文字列を組み合わせます: \`私の名前は\${myName}です\`",
    "完成例: \`私の名前は\${myName}、年齢は\${myAge}歳、趣味は\${myHobby}です。\`"
  ],

  testCases: [
    {
      id: "test1",
      description: "myName変数が空でない文字列で定義されている",
      testFunction: "() => typeof myName === 'string' && myName.length > 0"
    },
    {
      id: "test2", 
      description: "myAge変数が正の数値で定義されている",
      testFunction: "() => typeof myAge === 'number' && myAge > 0"
    },
    {
      id: "test3",
      description: "myHobby変数が文字列で定義されている", 
      testFunction: "() => typeof myHobby === 'string'"
    },
    {
      id: "test4",
      description: "introduction変数に自己紹介文が作成されている",
      testFunction: "() => typeof introduction === 'string' && introduction.length > 10 && introduction.includes(myName)"
    }
  ],

  exerciseDifficulty: 'easy'
} as const