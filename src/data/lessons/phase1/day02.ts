import type { LessonContent } from '@/types/content'

export const day02: LessonContent = {
  day: 2,
  title: "条件分岐と比較演算子",
  goal: "条件分岐を用いた基本ロジックが書ける",
  completion: "if/switch 文を使える",
  task: "年齢に応じた出力（例: 未成年/成人）を表示",
  phase: 1,
  difficulty: 'beginner',
  estimatedTime: 15,
  tags: ['条件分岐', 'if文', 'switch文', 'JavaScript'],
  prerequisites: [1],
  hints: [
    "if文は if (条件) { 処理 } の形で書きます",
    "比較演算子: >= (以上), <= (以下), === (等しい), !== (等しくない)",
    "else文でif文の条件が偽の場合の処理を書けます",
    "三項演算子 (条件 ? 真の値 : 偽の値) で短く書けます",
    "switch文は複数の値を比較したい時に便利です"
  ],
  sampleCode: `// 条件分岐と比較演算子
const age = 20;

// if文による条件分岐
if (age >= 20) {
  console.log("成人です");
} else {
  console.log("未成年です");
}

// 三項演算子
const status = age >= 20 ? "成人" : "未成年";
console.log("ステータス:", status);

// switch文
const dayOfWeek = 1;
switch (dayOfWeek) {
  case 1:
    console.log("月曜日");
    break;
  case 2:
    console.log("火曜日");
    break;
  default:
    console.log("その他の曜日");
}`,
  explanation: "if文は条件に応じて処理を分岐させます。switch文は複数の値に対する条件分岐に便利です。",

  // 演習機能追加
  exerciseCode: `// 演習: 成績判定プログラムを作成してください
// TODO: 点数を変数に代入してください（0-100の数値）
const score = 0;

// TODO: 点数に応じて成績を判定してください
// 90以上: "A", 80以上: "B", 70以上: "C", 60以上: "D", 60未満: "F"
let grade = "";

// TODO: 判定結果をコンソールに表示してください
console.log("点数: " + score + ", 成績: " + grade);`,

  exerciseHints: [
    "scoreに0-100の数値を代入しましょう（例: 85）",
    "if-else if-else文を使って段階的に判定します",
    "条件は上から順に評価されるので、高い点数から判定しましょう",
    "例: if (score >= 90) { grade = \"A\"; } else if (score >= 80) { grade = \"B\"; }",
    "最後に結果をconsole.logで表示します"
  ],

  testCases: [
    {
      id: "test1",
      description: "score変数が0-100の範囲内の数値で定義されている",
      testFunction: "() => typeof score === 'number' && score >= 0 && score <= 100"
    },
    {
      id: "test2",
      description: "grade変数が適切な成績（A, B, C, D, F）で定義されている",
      testFunction: "() => ['A', 'B', 'C', 'D', 'F'].includes(grade)"
    },
    {
      id: "test3",
      description: "90以上の点数でA判定が正しく動作する",
      testFunction: "() => { if (score >= 90) return grade === 'A'; return true; }"
    },
    {
      id: "test4",
      description: "点数と成績が正しく対応している",
      testFunction: "() => { if (score >= 90) return grade === 'A'; if (score >= 80) return grade === 'B'; if (score >= 70) return grade === 'C'; if (score >= 60) return grade === 'D'; return grade === 'F'; }"
    }
  ],

  exerciseDifficulty: 'easy'
} as const