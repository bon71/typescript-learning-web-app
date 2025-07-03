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
interface Person {
  name: string;
  age: number;
  email?: string; // オプションプロパティ
}

// 2. Interfaceの継承 - Person を拡張して Employee を作成
interface Employee extends Person {
  employeeId: string;
  department: string;
  // TODO: salary プロパティを追加してください（number型）
}

// 3. Interface を実装するオブジェクトを作成してみよう
const person: Person = {
  name: "田中太郎",
  age: 30,
  email: "tanaka@example.com"
};

// 4. Employee オブジェクトを作成してみよう
const employee: Employee = {
  name: "佐藤花子",
  age: 28,
  employeeId: "EMP001",
  department: "開発部",
  // TODO: salary プロパティを追加してください
};

// 5. メソッドを含むInterface
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

// 6. Interface を実装するクラスを作成してみよう
class BasicCalculator implements Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
  
  subtract(a: number, b: number): number {
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
  explanation: "interfaceはオブジェクトの構造を定義する強力な機能です。extendsによる継承、オプション・読み取り専用プロパティ、メソッドの定義、同名interfaceの自動マージなど多彩な機能があります。クラスでの実装、関数型の定義、型ガードとの組み合わせにより、型安全で保守性の高いコードを書くことができます。"
} as const