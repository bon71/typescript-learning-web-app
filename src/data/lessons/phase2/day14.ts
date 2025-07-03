import type { LessonContent } from '@/types/content'

export const day14: LessonContent = {
  day: 14,
  title: "クラスとTypeScript",
  goal: "クラスの定義と型注釈を理解する",
  completion: "メソッドを含むクラスを作れる",
  task: "User クラスを作り、名前とログインメソッドを実装",
  phase: 2,
  difficulty: 'intermediate',
  estimatedTime: 25,
  tags: ['クラス', 'メソッド', 'コンストラクタ'],
  prerequisites: [8, 9, 10, 11, 12, 13],
  hints: [
    "クラスのプロパティには型注釈を指定し、アクセス修飾子（public, private, protected）を使えます",
    "コンストラクタでパラメータプロパティを使うと宣言と初期化を同時に行えます",
    "abstractクラスを使って基底クラスを定義し、継承で実装を強制できます",
    "staticメソッドやプロパティはクラス名から直接アクセスできます",
    "interfaceをimplementsして、クラスが特定の構造を満たすことを保証できます"
  ],
  initialCode: `// クラスとTypeScriptを学ぼう
// TODO: User クラスを作り、名前とログインメソッドを実装

// 1. 基本的なクラス定義
class User {
  // プロパティの型定義
  // TypeScriptでは: public name: string; private isLoggedIn: boolean = false;
  // JavaScriptではアクセス修飾子は使用できませんが、#で private を表現可能

  constructor(name) {
    this.name = name;
    this.isLoggedIn = false; // private プロパティ（慣例的に_を付ける場合もあります）
  }

  // メソッド
  // TypeScriptでは: login(): void {
  login() {
    this.isLoggedIn = true;
    console.log(\`\${this.name}がログインしました\`);
  }

  // TypeScriptでは: logout(): void {
  logout() {
    this.isLoggedIn = false;
    console.log(\`\${this.name}がログアウトしました\`);
  }

  // TODO: getStatus メソッドを実装してください
  // ログイン状態を文字列で返す（"ログイン中" or "ログアウト"）
  // TypeScriptでは: getStatus(): string {
  getStatus() {
    return ""; // この行を修正してください
  }
}

// 2. パラメータプロパティを使った簡潔な書き方
// TypeScriptのパラメータプロパティはJavaScriptでは使用できません
class Employee {
  // TypeScriptでは: constructor(private readonly id: string, public name: string, private department: string) {}
  constructor(id, name, department) {
    this.id = id;        // readonly相当（変更しない約束）
    this.name = name;    // public相当
    this.department = department; // private相当
  }

  // TypeScriptでは: getInfo(): string {
  getInfo() {
    return \`ID: \${this.id}, 名前: \${this.name}, 部署: \${this.department}\`;
  }
}

// 3. 継承の例
class Manager extends Employee {
  constructor(id, name, department) {
    super(id, name, department);
  }

  // TODO: conduct メソッドを追加してください
  // "会議を開催します" というメッセージを出力
  // TypeScriptでは: conduct(): void {
  conduct() {
    // ここに実装してください
  }
}

// 4. 使用例
const user = new User("田中太郎");
user.login();
console.log(user.getStatus()); // "ログイン中" が出力されるはずです

const employee = new Employee("e001", "佐藤花子", "開発部");
console.log(employee.getInfo());

const manager = new Manager("m001", "山田次郎", "開発部");
console.log(manager.getInfo());
manager.conduct(); // "会議を開催します" が出力されるはずです`,
  sampleCode: `// 基本的なクラス定義
class User {
  // プロパティの型定義
  private id: string;
  public name: string;
  protected email: string;
  private isLoggedIn: boolean = false;

  // コンストラクタ
  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // メソッド
  login(): void {
    this.isLoggedIn = true;
    console.log(\`\${this.name}がログインしました\`);
  }

  logout(): void {
    this.isLoggedIn = false;
    console.log(\`\${this.name}がログアウトしました\`);
  }

  getStatus(): string {
    return this.isLoggedIn ? "ログイン中" : "ログアウト";
  }

  // getter/setter
  get userId(): string {
    return this.id;
  }

  set userName(newName: string) {
    if (newName.length > 0) {
      this.name = newName;
    }
  }
}

// パラメータプロパティを使った簡潔な書き方
class Employee {
  constructor(
    private readonly id: string,
    public name: string,
    protected department: string,
    private salary: number
  ) {}

  getInfo(): string {
    return \`ID: \${this.id}, 名前: \${this.name}, 部署: \${this.department}\`;
  }

  increaseSalary(amount: number): void {
    this.salary += amount;
  }
}

// 継承
class Manager extends Employee {
  private teamMembers: Employee[] = [];

  constructor(id: string, name: string, department: string, salary: number) {
    super(id, name, department, salary);
  }

  addTeamMember(employee: Employee): void {
    this.teamMembers.push(employee);
  }

  getTeamSize(): number {
    return this.teamMembers.length;
  }

  // オーバーライド
  getInfo(): string {
    return super.getInfo() + \`, チームサイズ: \${this.getTeamSize()}\`;
  }
}

// Abstract クラス
abstract class Shape {
  constructor(protected name: string) {}

  abstract calculateArea(): number;
  abstract calculatePerimeter(): number;

  // 共通メソッド
  getInfo(): string {
    return \`\${this.name} - 面積: \${this.calculateArea()}, 周囲: \${this.calculatePerimeter()}\`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super("円");
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }

  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super("長方形");
  }

  calculateArea(): number {
    return this.width * this.height;
  }

  calculatePerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// Interfaceの実装
interface Drawable {
  draw(): void;
}

interface Movable {
  move(x: number, y: number): void;
}

class GameCharacter implements Drawable, Movable {
  constructor(
    private x: number = 0,
    private y: number = 0,
    private name: string
  ) {}

  draw(): void {
    console.log(\`\${this.name}を(\${this.x}, \${this.y})に描画\`);
  }

  move(x: number, y: number): void {
    this.x = x;
    this.y = y;
    console.log(\`\${this.name}が(\${this.x}, \${this.y})に移動\`);
  }

  // Static メソッド
  static createCharacter(name: string): GameCharacter {
    return new GameCharacter(0, 0, name);
  }
}

// 使用例
const user = new User("u001", "田中太郎", "tanaka@example.com");
user.login();
console.log(user.getStatus()); // ログイン中
console.log(user.userId); // u001

const employee = new Employee("e001", "佐藤花子", "開発部", 500000);
console.log(employee.getInfo());

const manager = new Manager("m001", "山田次郎", "開発部", 800000);
manager.addTeamMember(employee);
console.log(manager.getInfo());

const circle = new Circle(5);
const rectangle = new Rectangle(10, 20);
console.log(circle.getInfo());
console.log(rectangle.getInfo());

const character = GameCharacter.createCharacter("勇者");
character.move(10, 20);
character.draw();`,
  explanation: "TypeScriptのクラスは、アクセス修飾子、型注釈、パラメータプロパティなど多くの機能を提供します。継承、抽象クラス、インターフェースの実装により、オブジェクト指向プログラミングの原則を型安全に実現できます。これらの機能を適切に使うことで、保守性が高く、拡張しやすいコードを書くことができます。"
} as const