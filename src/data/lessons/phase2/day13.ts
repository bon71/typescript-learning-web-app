import type { LessonContent } from '@/types/content'

export const day13: LessonContent = {
  day: 13,
  title: "Interfaceと継承",
  goal: "Interfaceの定義と拡張を理解する",
  completion: "複数の型構造を再利用できる",
  task: "Person → Employee を継承してオブジェクト作成",
  phase: 2,
  difficulty: 'intermediate',
  estimatedTime: 25,
  tags: ['Interface', '継承', '型の拡張'],
  prerequisites: [8, 9, 10, 11, 12],
  hints: [
    "interfaceは型の構造を定義するためのキーワードです",
    "extendsキーワードを使って既存のinterfaceを継承・拡張できます",
    "同じ名前のinterfaceを複数定義すると自動的にマージされます",
    "オプションプロパティ（?）や読み取り専用プロパティ（readonly）も定義できます",
    "interfaceはオブジェクト指向プログラミングの設計原則を型レベルで実現します"
  ],
  initialCode: `// Interfaceと継承を学ぼう
// TODO: Person → Employee を継承してオブジェクト作成

// 1. 基本的なInterface定義
// TypeScriptでは: interface Person { name: string; age: number; email?: string; }
// JavaScriptでは型定義の代わりにコメントで構造を示します
// Person構造: { name: string, age: number, email?: string }

// 2. Interfaceの継承 - Person を拡張して Employee を作成
// TypeScriptでは: interface Employee extends Person { employeeId: string; department: string; }
// Employee構造: Person の全プロパティ + { employeeId: string, department: string }
// TODO: salary プロパティを追加してください（number型）

// 3. Interface を実装するオブジェクトを作成してみよう
// TypeScriptでは: const person: Person = {
const person = {
  name: "田中太郎",
  age: 30,
  email: "tanaka@example.com"
};

// 4. Employee オブジェクトを作成してみよう
// TypeScriptでは: const employee: Employee = {
const employee = {
  name: "佐藤花子",
  age: 28,
  employeeId: "EMP001",
  department: "開発部",
  // TODO: salary プロパティを追加してください
};

// 5. メソッドを含むInterface
// TypeScriptでは: interface Calculator { add(a: number, b: number): number; subtract(a: number, b: number): number; }
// Calculator構造: { add: function, subtract: function }

// 6. Interface を実装するクラスを作成してみよう
// TypeScriptでは: class BasicCalculator implements Calculator {
class BasicCalculator {
  // TypeScriptでは: add(a: number, b: number): number {
  add(a, b) {
    return a + b;
  }
  
  // TypeScriptでは: subtract(a: number, b: number): number {
  subtract(a, b) {
    // TODO: 引き算の処理を実装してください
    return 0;
  }
}

// 7. 使用例
console.log(\`従業員: \${employee.name}, 部署: \${employee.department}\`);

const calc = new BasicCalculator();
console.log(calc.add(10, 5)); // 15
console.log(calc.subtract(10, 5)); // 5 が出力されるはずです`,
  sampleCode: `// 基本的なInterface定義
interface Person {
  name: string;
  age: number;
  email?: string; // オプションプロパティ
  readonly id: string; // 読み取り専用
}

// Interfaceの継承
interface Employee extends Person {
  employeeId: string;
  department: string;
  salary: number;
  startDate: Date;
}

// 複数のinterfaceを継承
interface Manager extends Employee {
  teamSize: number;
  reports: Employee[];
}

// Interfaceを実装するオブジェクト
const person: Person = {
  id: "p001",
  name: "田中太郎",
  age: 30,
  email: "tanaka@example.com"
};

const employee: Employee = {
  id: "e001",
  name: "佐藤花子",
  age: 28,
  employeeId: "EMP001",
  department: "開発部",
  salary: 500000,
  startDate: new Date("2023-04-01")
};

const manager: Manager = {
  id: "m001",
  name: "山田次郎",
  age: 35,
  employeeId: "MGR001",
  department: "開発部",
  salary: 800000,
  startDate: new Date("2020-01-01"),
  teamSize: 5,
  reports: [employee]
};

// メソッドを含むInterface
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

// Interfaceの実装
class BasicCalculator implements Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
  
  subtract(a: number, b: number): number {
    return a - b;
  }
  
  multiply(a: number, b: number): number {
    return a * b;
  }
  
  divide(a: number, b: number): number {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }
}

// Interface マージ（同名interfaceの自動結合）
interface Config {
  apiUrl: string;
}

interface Config {
  timeout: number;
}

// 結果：Config = { apiUrl: string; timeout: number; }

// 関数の型もInterfaceで定義可能
interface StringFormatter {
  (input: string): string;
}

const upperCaseFormatter: StringFormatter = (input: string) => input.toUpperCase();
const lowerCaseFormatter: StringFormatter = (input: string) => input.toLowerCase();

// 使用例
console.log(\`従業員: \${employee.name}, 部署: \${employee.department}\`);
console.log(\`マネージャー: \${manager.name}, チームサイズ: \${manager.teamSize}\`);

const calc = new BasicCalculator();
console.log(calc.add(10, 5)); // 15
console.log(calc.divide(10, 2)); // 5

console.log(upperCaseFormatter("hello")); // HELLO
console.log(lowerCaseFormatter("WORLD")); // world

// 型ガードの実装
function isEmployee(person: Person): person is Employee {
  return 'employeeId' in person;
}

function isManager(employee: Employee): employee is Manager {
  return 'teamSize' in employee;
}

if (isEmployee(person)) {
  // ここでpersonはEmployee型として扱われる
  console.log(person.department);
}`,
  explanation: "interfaceはオブジェクトの構造を定義する強力な機能です。extendsによる継承、オプション・読み取り専用プロパティ、メソッドの定義、同名interfaceの自動マージなど多彩な機能があります。クラスでの実装、関数型の定義、型ガードとの組み合わせにより、型安全で保守性の高いコードを書くことができます。",

  // 演習機能追加
  exerciseCode: `// 演習: 社員管理システムをInterfaceで設計しよう
// Interfaceと継承を使って社員情報を管理するシステムを作成してください

// TODO: 1. 基本のPerson Interfaceを実装してください
// TypeScriptでは:
// interface Person {
//   id: string;
//   name: string;
//   age: number;
//   email?: string;
// }

// JavaScriptではオブジェクトの構造で表現
let person1 = {
  id: "",     // 個人識別ID
  name: "",   // 氏名
  age: 0,     // 年齢
  email: ""   // メールアドレス（オプション）
};

// TODO: 2. Employee Interfaceを実装してください（Personを継承）
// TypeScriptでは:
// interface Employee extends Person {
//   employeeId: string;
//   department: string;
//   position: string;
//   salary: number;
// }

let employee1 = {
  // Personのプロパティ
  id: "",
  name: "",
  age: 0,
  email: "",
  // Employee固有のプロパティ
  employeeId: "",
  department: "",
  position: "",
  salary: 0
};

// TODO: 3. Manager Interfaceを実装してください（Employeeを継承）
// TypeScriptでは:
// interface Manager extends Employee {
//   teamSize: number;
//   subordinates: Employee[];
// }

let manager1 = {
  // Personのプロパティ
  id: "",
  name: "",
  age: 0,
  email: "",
  // Employeeのプロパティ
  employeeId: "",
  department: "",
  position: "",
  salary: 0,
  // Manager固有のプロパティ
  teamSize: 0,
  subordinates: []
};

// TODO: 4. 社員情報を表示する関数を作成してください
function displayPersonInfo(person) {
  // TypeScriptでは: function displayPersonInfo(person: Person): string
  let info = "氏名: " + person.name + ", 年齢: " + person.age;
  
  if (person.email) {
    info += ", メール: " + person.email;
  }
  
  return info;
}

// TODO: 5. 社員情報を表示する関数を作成してください
function displayEmployeeInfo(employee) {
  // TypeScriptでは: function displayEmployeeInfo(employee: Employee): string
  let basicInfo = displayPersonInfo(employee);
  let employeeInfo = ", 社員ID: " + employee.employeeId + 
                    ", 部署: " + employee.department + 
                    ", 職位: " + employee.position;
  
  return basicInfo + employeeInfo;
}

// TODO: 6. マネージャー情報を表示する関数を作成してください
function displayManagerInfo(manager) {
  // TypeScriptでは: function displayManagerInfo(manager: Manager): string
  let employeeInfo = displayEmployeeInfo(manager);
  let managerInfo = ", チームサイズ: " + manager.teamSize + "人";
  
  return employeeInfo + managerInfo;
}

// TODO: 7. 部下を追加する関数を作成してください
function addSubordinate(manager, employee) {
  // TypeScriptでは: function addSubordinate(manager: Manager, employee: Employee): void
  manager.subordinates.push(employee);
  manager.teamSize = manager.subordinates.length;
  
  console.log(employee.name + "を" + manager.name + "のチームに追加しました");
}

// TODO: 8. 実際のデータを設定してテストしてください

// 一般社員のデータ設定
employee1.id = "p001";
employee1.name = "田中太郎";
employee1.age = 28;
employee1.email = "tanaka@company.com";
employee1.employeeId = "EMP001";
employee1.department = "開発部";
employee1.position = "エンジニア";
employee1.salary = 5000000;

// マネージャーのデータ設定
manager1.id = "p002";
manager1.name = "佐藤花子";
manager1.age = 35;
manager1.email = "sato@company.com";
manager1.employeeId = "MGR001";
manager1.department = "開発部";
manager1.position = "マネージャー";
manager1.salary = 8000000;
manager1.teamSize = 0;
manager1.subordinates = [];

// 結果を表示
console.log("=== 社員情報 ===");
console.log(displayEmployeeInfo(employee1));

console.log("\\n=== マネージャー情報 ===");
console.log(displayManagerInfo(manager1));

console.log("\\n=== チーム編成 ===");
addSubordinate(manager1, employee1);
console.log(displayManagerInfo(manager1));

// オプションプロパティのテスト
let person2 = {
  id: "p003",
  name: "鈴木三郎",
  age: 30
  // emailはオプションなので省略
};

console.log("\\n=== オプションプロパティテスト ===");
console.log(displayPersonInfo(person2));`,

  exerciseHints: [
    "Interfaceはオブジェクトの構造を定義します（{ プロパティ: 型 }）",
    "extendsキーワードでInterfaceを継承できます",
    "?を付けるとオプションプロパティになります",
    "継承したInterfaceは親のすべてのプロパティを持ちます",
    "関数の引数や戻り値にinterfaceで型安全性を保てます"
  ],

  testCases: [
    {
      id: "test1",
      description: "employee1オブジェクトが正しく設定されている",
      testFunction: "() => typeof employee1.name === 'string' && employee1.name.length > 0 && typeof employee1.employeeId === 'string' && employee1.employeeId.length > 0"
    },
    {
      id: "test2",
      description: "manager1オブジェクトが正しく設定されている",
      testFunction: "() => typeof manager1.teamSize === 'number' && Array.isArray(manager1.subordinates)"
    },
    {
      id: "test3",
      description: "displayPersonInfo関数が正しく動作する",
      testFunction: "() => { let result = displayPersonInfo({name: 'テスト', age: 25}); return typeof result === 'string' && result.includes('テスト') && result.includes('25'); }"
    },
    {
      id: "test4",
      description: "displayEmployeeInfo関数が正しく動作する",
      testFunction: "() => { let result = displayEmployeeInfo({name: 'テスト', age: 30, employeeId: 'E001', department: 'テスト部', position: 'テスター'}); return typeof result === 'string' && result.includes('E001'); }"
    },
    {
      id: "test5",
      description: "addSubordinate関数が正しく動作する",
      testFunction: "() => { let testManager = {subordinates: [], teamSize: 0}; let testEmployee = {name: 'テスト'}; addSubordinate(testManager, testEmployee); return testManager.subordinates.length === 1 && testManager.teamSize === 1; }"
    }
  ],

  exerciseDifficulty: 'medium'
} as const