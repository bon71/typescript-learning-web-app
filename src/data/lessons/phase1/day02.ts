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
  explanation: "if文は条件に応じて処理を分岐させます。switch文は複数の値に対する条件分岐に便利です。"
} as const