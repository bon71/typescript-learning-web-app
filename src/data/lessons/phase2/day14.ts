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
  explanation: "TypeScriptのクラスは、アクセス修飾子、型注釈、パラメータプロパティなど多くの機能を提供します。継承、抽象クラス、インターフェースの実装により、オブジェクト指向プログラミングの原則を型安全に実現できます。これらの機能を適切に使うことで、保守性が高く、拡張しやすいコードを書くことができます。",

  // 演習機能追加
  exerciseCode: `// 演習: 図書館管理システムをクラスで実装しよう
// TypeScriptのクラス機能を使って図書館の本とユーザーを管理するシステムを作成してください

// TODO: 1. 基本のBookクラスを作成してください
class Book {
  // TypeScriptでは: 
  // private id: string;
  // public title: string;
  // public author: string;
  // protected publishedYear: number;
  // private isAvailable: boolean = true;
  
  constructor(id, title, author, publishedYear) {
    // TypeScriptでは: constructor(id: string, title: string, author: string, publishedYear: number)
    this.id = id;
    this.title = title;
    this.author = author;
    this.publishedYear = publishedYear;
    this.isAvailable = true; // 初期状態は貸出可能
  }
  
  // TODO: 本を借りるメソッドを実装してください
  borrow() {
    // TypeScriptでは: borrow(): boolean
    if (this.isAvailable) {
      this.isAvailable = false;
      return true;
    } else {
      return false;
    }
  }
  
  // TODO: 本を返すメソッドを実装してください
  returnBook() {
    // TypeScriptでは: returnBook(): void
    this.isAvailable = true;
  }
  
  // TODO: 本の情報を取得するメソッドを実装してください
  getInfo() {
    // TypeScriptでは: getInfo(): string
    let status = this.isAvailable ? "貸出可能" : "貸出中";
    return "『" + this.title + "』 著者: " + this.author + 
           " (" + this.publishedYear + "年) - " + status;
  }
  
  // TODO: 貸出状況を確認するメソッドを実装してください
  checkAvailability() {
    // TypeScriptでは: checkAvailability(): boolean
    return this.isAvailable;
  }
}

// TODO: 2. Userクラスを作成してください
class User {
  // TypeScriptでは:
  // private id: string;
  // public name: string;
  // private borrowedBooks: Book[] = [];
  
  constructor(id, name) {
    // TypeScriptでは: constructor(id: string, name: string)
    this.id = id;
    this.name = name;
    this.borrowedBooks = [];
  }
  
  // TODO: 本を借りるメソッドを実装してください
  borrowBook(book) {
    // TypeScriptでは: borrowBook(book: Book): boolean
    if (book.checkAvailability()) {
      if (book.borrow()) {
        this.borrowedBooks.push(book);
        console.log(this.name + "が『" + book.title + "』を借りました");
        return true;
      }
    }
    console.log("『" + book.title + "』は現在貸出中です");
    return false;
  }
  
  // TODO: 本を返すメソッドを実装してください
  returnBook(book) {
    // TypeScriptでは: returnBook(book: Book): boolean
    let bookIndex = this.borrowedBooks.indexOf(book);
    if (bookIndex !== -1) {
      book.returnBook();
      this.borrowedBooks.splice(bookIndex, 1);
      console.log(this.name + "が『" + book.title + "』を返却しました");
      return true;
    } else {
      console.log(this.name + "は『" + book.title + "』を借りていません");
      return false;
    }
  }
  
  // TODO: 借りている本の一覧を取得するメソッドを実装してください
  getBorrowedBooks() {
    // TypeScriptでは: getBorrowedBooks(): string[]
    return this.borrowedBooks.map(book => book.title);
  }
  
  // TODO: ユーザー情報を取得するメソッドを実装してください
  getUserInfo() {
    // TypeScriptでは: getUserInfo(): string
    let borrowedCount = this.borrowedBooks.length;
    return this.name + " (借りている本: " + borrowedCount + "冊)";
  }
}

// TODO: 3. Libraryクラスを作成してください（本とユーザーを管理）
class Library {
  constructor() {
    this.books = [];
    this.users = [];
  }
  
  // TODO: 本を追加するメソッドを実装してください
  addBook(book) {
    // TypeScriptでは: addBook(book: Book): void
    this.books.push(book);
    console.log("図書館に『" + book.title + "』を追加しました");
  }
  
  // TODO: ユーザーを登録するメソッドを実装してください
  registerUser(user) {
    // TypeScriptでは: registerUser(user: User): void
    this.users.push(user);
    console.log("ユーザー『" + user.name + "』を登録しました");
  }
  
  // TODO: 利用可能な本の一覧を取得するメソッドを実装してください
  getAvailableBooks() {
    // TypeScriptでは: getAvailableBooks(): Book[]
    return this.books.filter(book => book.checkAvailability());
  }
  
  // TODO: 図書館の状況を表示するメソッドを実装してください
  getLibraryStatus() {
    // TypeScriptでは: getLibraryStatus(): string
    let totalBooks = this.books.length;
    let availableBooks = this.getAvailableBooks().length;
    let borrowedBooks = totalBooks - availableBooks;
    
    return "図書館の状況: 総蔵書" + totalBooks + "冊 / 貸出可能" + availableBooks + "冊 / 貸出中" + borrowedBooks + "冊";
  }
}

// TODO: 4. システムをテストしてください

// 図書館の作成
let library = new Library();

// 本の作成と追加
let book1 = new Book("B001", "TypeScript入門", "山田太郎", 2023);
let book2 = new Book("B002", "JavaScript完全ガイド", "佐藤花子", 2022);
let book3 = new Book("B003", "Web開発の基礎", "鈴木次郎", 2024);

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// ユーザーの作成と登録
let user1 = new User("U001", "田中一郎");
let user2 = new User("U002", "高橋二郎");

library.registerUser(user1);
library.registerUser(user2);

// 貸出テスト
console.log("\\n=== 貸出テスト ===");
console.log(library.getLibraryStatus());

user1.borrowBook(book1);
user1.borrowBook(book2);
user2.borrowBook(book1); // すでに貸出中

console.log("\\n" + library.getLibraryStatus());

// ユーザー情報の確認
console.log("\\n=== ユーザー情報 ===");
console.log(user1.getUserInfo());
console.log("借りている本:", user1.getBorrowedBooks());

// 返却テスト
console.log("\\n=== 返却テスト ===");
user1.returnBook(book1);
user2.borrowBook(book1); // 返却されたので借りることができる

console.log("\\n" + library.getLibraryStatus());

// 利用可能な本の一覧
console.log("\\n=== 利用可能な本 ===");
let availableBooks = library.getAvailableBooks();
availableBooks.forEach(book => {
  console.log(book.getInfo());
});`,

  exerciseHints: [
    "クラスのコンストラクタで初期値を設定します",
    "メソッドはクラス内で function キーワードなしで定義します",
    "this キーワードでクラスのプロパティにアクセスします",
    "配列のfilter()メソッドで条件に合う要素を抽出できます",
    "map()メソッドで配列の各要素を変換できます"
  ],

  testCases: [
    {
      id: "test1",
      description: "Bookクラスが正しく動作する",
      testFunction: "() => { let book = new Book('test', 'Test Book', 'Test Author', 2023); return book.checkAvailability() === true; }"
    },
    {
      id: "test2",
      description: "本の貸出が正しく動作する",
      testFunction: "() => { let book = new Book('test', 'Test Book', 'Test Author', 2023); book.borrow(); return book.checkAvailability() === false; }"
    },
    {
      id: "test3",
      description: "Userクラスが正しく動作する",
      testFunction: "() => { let user = new User('U001', 'Test User'); return user.getBorrowedBooks().length === 0; }"
    },
    {
      id: "test4",
      description: "ユーザーが本を借りることができる",
      testFunction: "() => { let book = new Book('test', 'Test Book', 'Test Author', 2023); let user = new User('U001', 'Test User'); user.borrowBook(book); return user.getBorrowedBooks().length === 1; }"
    },
    {
      id: "test5",
      description: "Libraryクラスが正しく動作する",
      testFunction: "() => { let library = new Library(); let book = new Book('test', 'Test Book', 'Test Author', 2023); library.addBook(book); return library.getAvailableBooks().length === 1; }"
    }
  ],

  exerciseDifficulty: 'hard'
} as const