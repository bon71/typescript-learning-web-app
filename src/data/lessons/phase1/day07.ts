import type { LessonContent } from '@/types/content'

export const day07: LessonContent = {
  day: 7,
  title: "総復習とミニアプリ",
  goal: "一連の構文を組み合わせて使える",
  completion: "JSでUI操作ができる",
  task: "入力された名前を使って挨拶を表示するHTML+JSアプリ",
  phase: 1,
  difficulty: 'intermediate',
  estimatedTime: 30,
  tags: ['総復習', 'アプリ開発', 'HTML', 'JavaScript'],
  prerequisites: [1, 2, 3, 4, 5, 6],
  hints: [
    "これまで学んだ変数、関数、オブジェクト、DOM操作を組み合わせます",
    "input要素の value プロパティで入力値を取得できます",
    "段階的に機能を追加していくと作りやすいです",
    "エラーが出たらコンソールを確認しましょう",
    "実際に動くアプリを作ることで理解が深まります"
  ],
  sampleCode: `// 総復習: 挑拶アプリの作成
// シミュレーション用のダミー要素
const nameInput = {
  value: "",
  setValue: function(val) {
    this.value = val;
  }
};

const greetButton = {
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

const output = {
  textContent: ""
};

// 挑拶関数
function createGreeting(name) {
  if (!name) {
    return "名前を入力してください。";
  }
  
  const currentHour = new Date().getHours();
  let timeGreeting;
  
  if (currentHour < 12) {
    timeGreeting = "おはよう";
  } else if (currentHour < 18) {
    timeGreeting = "こんにちは";
  } else {
    timeGreeting = "こんばんは";
  }
  
  return timeGreeting + "、" + name + "さん！";
}

// イベントリスナー
greetButton.addEventListener('click', function() {
  const greeting = createGreeting(nameInput.value);
  output.textContent = greeting;
  console.log("挑拶メッセージ:", greeting);
});

// テスト実行
nameInput.setValue("山田太郎");
greetButton.click();`,
  explanation: "Phase 1の総まとめとして、これまで学んだ全ての概念を組み合わせたアプリを作成します。",

  // 演習機能追加
  exerciseCode: `// 演習: TODOリストアプリを作成してください
// シミュレーション用のダミー要素
const taskInput = {
  value: "",
  setValue: function(val) { this.value = val; }
};

const addButton = {
  listeners: [],
  addEventListener: function(event, callback) {
    this.listeners.push({ event, callback });
  },
  click: function() {
    this.listeners.forEach(l => l.event === 'click' && l.callback());
  }
};

const taskList = {
  tasks: [],
  display: function() {
    console.log("=== TODOリスト ===");
    this.tasks.forEach((task, index) => {
      console.log((index + 1) + ". " + task);
    });
  }
};

// TODO: タスクを追加する関数を作成
function addTask() {
  // ここに実装
  // 1. taskInput.value を取得
  // 2. 空でないかチェック
  // 3. taskList.tasks に追加
  // 4. 入力をクリア
  // 5. リストを表示
}

// TODO: イベントリスナーを設定
// addButton.addEventListener('click', addTask);

// テスト実行
taskInput.setValue("買い物に行く");
addButton.click();
taskInput.setValue("勉強する");
addButton.click();`,

  exerciseHints: [
    "addTask関数で taskInput.value を取得します",
    "if文で空の入力をチェックします",
    "taskList.tasks.push() でタスクを追加します",
    "taskInput.setValue('') で入力をクリアします",
    "コメントアウトしたイベントリスナーを有効にしてください"
  ],

  testCases: [
    {
      id: "test1",
      description: "addTask関数が正しく定義されている",
      testFunction: "() => typeof addTask === 'function'"
    },
    {
      id: "test2",
      description: "タスクが正しく追加される",
      testFunction: "() => { const initial = taskList.tasks.length; taskInput.setValue('テスト'); addTask(); return taskList.tasks.length === initial + 1; }"
    },
    {
      id: "test3",
      description: "空の入力は追加されない",
      testFunction: "() => { const initial = taskList.tasks.length; taskInput.setValue(''); addTask(); return taskList.tasks.length === initial; }"
    },
    {
      id: "test4",
      description: "イベントリスナーが設定されている",
      testFunction: "() => addButton.listeners.some(l => l.event === 'click')"
    }
  ],

  exerciseDifficulty: 'medium'
} as const