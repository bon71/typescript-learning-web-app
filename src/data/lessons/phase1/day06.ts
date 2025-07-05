import type { LessonContent } from '@/types/content'

export const day06: LessonContent = {
  day: 6,
  title: "DOM操作とイベント",
  goal: "DOMへのアクセスとイベント処理の基本を学ぶ",
  completion: "簡単なイベントリスナーが書ける",
  task: "ボタンを押したら「こんにちは」と表示",
  phase: 1,
  difficulty: 'intermediate',
  estimatedTime: 25,
  tags: ['DOM', 'イベント', 'HTML', 'JavaScript'],
  prerequisites: [1, 2, 3, 4, 5],
  hints: [
    "document.getElementById() で要素を取得できます",
    "addEventListener() でイベントを監視できます",
    "innerHTML や textContent で要素の内容を変更できます",
    "click イベントはボタンがクリックされた時に発生します",
    "DOM操作はHTMLとJavaScriptを連携させる基本技術です"
  ],
  sampleCode: `// DOM操作とイベント処理
// シミュレーション用のダミーDOM操作

// シミュレーション用のダミー要素オブジェクト
const simulateButton = {
  textContent: "クリック",
  listeners: [],
  addEventListener: function(event, callback) {
    this.listeners.push({ event, callback });
  },
  click: function() {
    this.listeners.forEach(listener => {
      if (listener.event === 'click') {
        listener.callback();
      }
    });
  }
};

const simulateOutput = {
  textContent: "",
  innerHTML: ""
};

// イベントリスナーの設定
simulateButton.addEventListener('click', function() {
  simulateOutput.textContent = "こんにちは！";
  console.log("ボタンがクリックされました");
  console.log("表示内容:", simulateOutput.textContent);
});

// シミュレーション実行
console.log("初期状態:", simulateOutput.textContent);
simulateButton.click(); // クリックシミュレーション`,
  explanation: "DOM操作はWebページの要素をJavaScriptで制御する技術です。イベントリスナーでユーザーの操作に反応できます。",

  // 演習機能追加
  exerciseCode: `// 演習: カウンターアプリを作成してください
// シミュレーション用のダミー要素
const counter = {
  value: 0,
  textContent: "0",
  updateDisplay: function() {
    this.textContent = this.value.toString();
  }
};

const incrementButton = {
  listeners: [],
  addEventListener: function(event, callback) {
    this.listeners.push({ event, callback });
  },
  click: function() {
    this.listeners.forEach(listener => {
      if (listener.event === 'click') {
        listener.callback();
      }
    });
  }
};

// TODO: カウンターを增加する関数を作成
function incrementCounter() {
  // ここに実装
}

// TODO: イベントリスナーを設定
// incrementButton.addEventListener('click', incrementCounter);

// テスト実行
console.log("初期値:", counter.textContent);
incrementButton.click();
console.log("1回クリック後:", counter.textContent);
incrementButton.click();
console.log("2回クリック後:", counter.textContent);`,

  exerciseHints: [
    "incrementCounter関数で counter.value を增加します",
    "counter.value++ で値を1增やします",
    "counter.updateDisplay() で表示を更新します",
    "addEventListener でクリックイベントを設定します",
    "コメントアウトした行を有効にしてください"
  ],

  testCases: [
    {
      id: "test1",
      description: "incrementCounter関数が正しく定義されている",
      testFunction: "() => typeof incrementCounter === 'function'"
    },
    {
      id: "test2",
      description: "カウンターが正しく增加する",
      testFunction: "() => { const initial = counter.value; incrementCounter(); return counter.value === initial + 1; }"
    },
    {
      id: "test3",
      description: "表示が正しく更新される",
      testFunction: "() => { incrementCounter(); return counter.textContent === counter.value.toString(); }"
    },
    {
      id: "test4",
      description: "イベントリスナーが正しく設定されている",
      testFunction: "() => incrementButton.listeners.some(l => l.event === 'click')"
    }
  ],

  exerciseDifficulty: 'medium'
} as const