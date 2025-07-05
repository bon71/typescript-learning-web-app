import type { LessonContent } from '@/types/content'

export const day16: LessonContent = {
  day: 16,
  title: "型ガード",
  goal: "型による分岐（型ガード）を理解する",
  completion: "typeof, in, instanceof を使える",
  task: "型に応じて処理が変わる関数を定義",
  phase: 3,
  difficulty: 'advanced',
  estimatedTime: 30,
  tags: ['型ガード', 'typeof', 'instanceof', '型安全性'],
  prerequisites: [8, 9, 10, 11, 12, 13, 14, 15],
  hints: [
    "型ガードはUnion型を安全に分岐処理するための仕組みです",
    "typeof演算子はプリミティブ型（string, number, boolean等）の判定に使用します",
    "instanceof演算子はクラスのインスタンスかどうかを判定します",
    "in演算子はオブジェクトに特定のプロパティが存在するかを判定します",
    "カスタム型ガード関数（user-defined type guards）でより複雑な型判定が可能です"
  ],
  initialCode: `// 型ガードを学ぼう
// TODO: 型に応じて処理が変わる関数を定義

// 1. typeof型ガード - プリミティブ型の判定
// TypeScriptでは: function processValue(value: string | number | boolean): string {
function processValue(value) {
  // TODO: 型に応じて適切な処理を実装してください
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    // boolean の場合
    return value ? "true" : "false";
  }
}

// 2. instanceof型ガード - クラスのインスタンス判定
class Dog {
  // TypeScriptでは: constructor(public name: string) {}
  constructor(name) {
    this.name = name;
  }
  
  // TypeScriptでは: bark(): string {
  bark() {
    return \`\${this.name} is barking\`;
  }
}

class Cat {
  // TypeScriptでは: constructor(public name: string) {}
  constructor(name) {
    this.name = name;
  }
  
  // TypeScriptでは: meow(): string {
  meow() {
    return \`\${this.name} is meowing\`;
  }
}

// TypeScriptでは: function makeSound(animal: Dog | Cat): string {
function makeSound(animal) {
  // TODO: instanceof を使って型を判定し、適切なメソッドを呼び出してください
  if (animal instanceof Dog) {
    return animal.bark();
  } else {
    return animal.meow();
  }
}

// 3. in演算子による型ガード - プロパティの存在確認
// TypeScriptでは: interface Bird { type: "bird"; fly(): void; }
// Bird構造: { type: "bird", fly: function }

// TypeScriptでは: interface Fish { type: "fish"; swim(): void; }
// Fish構造: { type: "fish", swim: function }

// TypeScriptでは: function move(animal: Bird | Fish): void {
function move(animal) {
  // TODO: in演算子を使って型を判定し、適切なメソッドを呼び出してください
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}

// 4. 使用例
console.log(processValue("hello")); // "HELLO"
console.log(processValue(3.14159)); // "3.14"
console.log(processValue(true)); // "true"

const dog = new Dog("ポチ");
const cat = new Cat("ミケ");

console.log(makeSound(dog)); // "ポチ is barking"
console.log(makeSound(cat)); // "ミケ is meowing"

// TypeScriptでは: const bird: Bird = {
const bird = {
  type: "bird",
  fly: () => console.log("Flying high!")
};

// TypeScriptでは: const fish: Fish = {
const fish = {
  type: "fish",
  swim: () => console.log("Swimming deep!")
};

move(bird); // "Flying high!"
move(fish); // "Swimming deep!"`,
  sampleCode: `// typeof型ガード
function processValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    // ここでvalueはstring型として扱われる
    return value.toUpperCase();
  } else if (typeof value === "number") {
    // ここでvalueはnumber型として扱われる
    return value.toFixed(2);
  } else {
    // ここでvalueはboolean型として扱われる
    return value ? "true" : "false";
  }
}

console.log(processValue("hello")); // "HELLO"
console.log(processValue(3.14159)); // "3.14"
console.log(processValue(true)); // "true"

// instanceof型ガード
class Dog {
  constructor(public name: string) {}
  bark(): string {
    return \`\${this.name} is barking\`;
  }
}

class Cat {
  constructor(public name: string) {}
  meow(): string {
    return \`\${this.name} is meowing\`;
  }
}

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    // ここでanimalはDog型として扱われる
    return animal.bark();
  } else {
    // ここでanimalはCat型として扱われる
    return animal.meow();
  }
}

const dog = new Dog("ポチ");
const cat = new Cat("ミケ");

console.log(makeSound(dog)); // "ポチ is barking"
console.log(makeSound(cat)); // "ミケ is meowing"

// in演算子による型ガード
interface Bird {
  type: "bird";
  fly(): void;
  layEggs(): void;
}

interface Fish {
  type: "fish";
  swim(): void;
  layEggs(): void;
}

function move(animal: Bird | Fish): void {
  if ("fly" in animal) {
    // ここでanimalはBird型として扱われる
    animal.fly();
  } else {
    // ここでanimalはFish型として扱われる
    animal.swim();
  }
}

// より複雑な例：判別可能なUnion型
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // ここでshapeは{ kind: "circle"; radius: number }型
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      // ここでshapeは{ kind: "rectangle"; width: number; height: number }型
      return shape.width * shape.height;
    case "triangle":
      // ここでshapeは{ kind: "triangle"; base: number; height: number }型
      return (shape.base * shape.height) / 2;
    default:
      // 網羅性チェック
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck;
  }
}

// カスタム型ガード関数
interface User {
  id: string;
  name: string;
  email: string;
}

interface Admin {
  id: string;
  name: string;
  email: string;
  permissions: string[];
}

// type predicateを使用したカスタム型ガード
function isAdmin(user: User | Admin): user is Admin {
  return 'permissions' in user;
}

function handleUser(user: User | Admin): string {
  if (isAdmin(user)) {
    // ここでuserはAdmin型として扱われる
    return \`管理者 \${user.name} (権限: \${user.permissions.join(", ")})\`;
  } else {
    // ここでuserはUser型として扱われる
    return \`一般ユーザー \${user.name}\`;
  }
}

// より高度なカスタム型ガード
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

function isArray<T>(value: unknown, itemGuard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(itemGuard);
}

// API レスポンスの型ガード
interface ApiSuccessResponse {
  success: true;
  data: any;
}

interface ApiErrorResponse {
  success: false;
  error: string;
  code: number;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

function isSuccessResponse(response: ApiResponse): response is ApiSuccessResponse {
  return response.success === true;
}

function handleApiResponse(response: ApiResponse): void {
  if (isSuccessResponse(response)) {
    console.log("成功:", response.data);
  } else {
    console.error(\`エラー (\${response.code}): \${response.error}\`);
  }
}

// 実用例
const shapes: Shape[] = [
  { kind: "circle", radius: 5 },
  { kind: "rectangle", width: 10, height: 20 },
  { kind: "triangle", base: 8, height: 12 }
];

shapes.forEach(shape => {
  console.log(\`\${shape.kind}の面積: \${calculateArea(shape)}\`);
});

const users: (User | Admin)[] = [
  { id: "1", name: "田中", email: "tanaka@example.com" },
  { id: "2", name: "佐藤", email: "sato@example.com", permissions: ["read", "write"] }
];

users.forEach(user => {
  console.log(handleUser(user));
});

// 型ガードのチェーン
function processUnknownValue(value: unknown): string {
  if (isString(value)) {
    return \`文字列: \${value}\`;
  } else if (isNumber(value)) {
    return \`数値: \${value}\`;
  } else if (isArray(value, isString)) {
    return \`文字列配列: [\${value.join(", ")}]\`;
  } else {
    return "未知の型";
  }
}

console.log(processUnknownValue("hello")); // 文字列: hello
console.log(processUnknownValue(42)); // 数値: 42
console.log(processUnknownValue(["a", "b", "c"])); // 文字列配列: [a, b, c]`,
  explanation: "型ガードはUnion型を安全に分岐処理するための重要な機能です。typeof、instanceof、in演算子による組み込み型ガードに加え、カスタム型ガード関数を定義することで、複雑な型判定も可能になります。判別可能なUnion型や網羅性チェックと組み合わせることで、型安全で保守性の高いコードを書くことができます。",

  // 演習機能追加
  exerciseCode: `// 演習: メディアプレーヤーシステムを作成しよう
// 型ガードを使って、異なるメディアタイプを安全に処理するシステムを実装してください

// TODO: 1. メディアタイプの定義
// TypeScriptでは:
// interface AudioFile { type: 'audio'; name: string; duration: number; bitrate: number; }
// interface VideoFile { type: 'video'; name: string; duration: number; resolution: string; }
// interface ImageFile { type: 'image'; name: string; width: number; height: number; }
// type MediaFile = AudioFile | VideoFile | ImageFile;

// JavaScriptではオブジェクトで表現

// TODO: 2. メディアファイルを処理する関数を作成してください
function processMediaFile(file) {
  // TypeScriptでは: function processMediaFile(file: MediaFile): string
  
  // 判別可能なUnion型を使った型ガード
  if (file.type === 'audio') {
    // ここでfileはAudioFile型として扱われる
    return "音声ファイル: " + file.name + 
           " (長さ: " + file.duration + "秒, ビットレート: " + file.bitrate + "kbps)";
  } else if (file.type === 'video') {
    // ここでfileはVideoFile型として扱われる
    return "動画ファイル: " + file.name + 
           " (長さ: " + file.duration + "秒, 解像度: " + file.resolution + ")";
  } else if (file.type === 'image') {
    // ここでfileはImageFile型として扱われる
    return "画像ファイル: " + file.name + 
           " (サイズ: " + file.width + "x" + file.height + ")";
  } else {
    return "未知のファイルタイプ";
  }
}

// TODO: 3. 型ガード関数を作成してください

// 音声ファイルかどうかを判定する関数
function isAudioFile(file) {
  // TypeScriptでは: function isAudioFile(file: MediaFile): file is AudioFile
  return file.type === 'audio';
}

// 動画ファイルかどうかを判定する関数
function isVideoFile(file) {
  // TypeScriptでは: function isVideoFile(file: MediaFile): file is VideoFile
  return file.type === 'video';
}

// 画像ファイルかどうかを判定する関数
function isImageFile(file) {
  // TypeScriptでは: function isImageFile(file: MediaFile): file is ImageFile
  return file.type === 'image';
}

// TODO: 4. メディアファイルのサイズを計算する関数
function calculateFileSize(file) {
  // TypeScriptでは: function calculateFileSize(file: MediaFile): number
  
  if (isAudioFile(file)) {
    // 音声ファイルのサイズ計算 (ビットレート * 長さ / 8)
    return (file.bitrate * file.duration) / 8; // KB
  } else if (isVideoFile(file)) {
    // 動画ファイルのサイズ計算 (簡略化)
    let resolutionMultiplier = 1;
    if (file.resolution === '1080p') {
      resolutionMultiplier = 8;
    } else if (file.resolution === '720p') {
      resolutionMultiplier = 4;
    } else if (file.resolution === '480p') {
      resolutionMultiplier = 2;
    }
    return file.duration * resolutionMultiplier * 1000; // KB
  } else if (isImageFile(file)) {
    // 画像ファイルのサイズ計算 (簡略化)
    return (file.width * file.height * 3) / 1024; // KB (ピクセルあたり3バイトと仮定)
  } else {
    return 0;
  }
}

// TODO: 5. メディアプレイリストクラスを作成してください
class MediaPlaylist {
  // TypeScriptでは: class MediaPlaylist { private files: MediaFile[] = []; }
  constructor() {
    this.files = [];
  }
  
  // ファイルを追加
  addFile(file) {
    // TypeScriptでは: addFile(file: MediaFile): void
    this.files.push(file);
  }
  
  // 特定タイプのファイルを取得
  getFilesByType(type) {
    // TypeScriptでは: getFilesByType(type: 'audio' | 'video' | 'image'): MediaFile[]
    return this.files.filter(file => file.type === type);
  }
  
  // 総サイズを計算
  getTotalSize() {
    // TypeScriptでは: getTotalSize(): number
    return this.files.reduce((total, file) => {
      return total + calculateFileSize(file);
    }, 0);
  }
  
  // プレイリストの情報を表示
  getPlaylistInfo() {
    // TypeScriptでは: getPlaylistInfo(): string
    let audioCount = this.getFilesByType('audio').length;
    let videoCount = this.getFilesByType('video').length;
    let imageCount = this.getFilesByType('image').length;
    
    return "プレイリスト情報: 音声" + audioCount + "件, 動画" + videoCount + "件, 画像" + imageCount + "件 (総サイズ: " + Math.round(this.getTotalSize()) + "KB)";
  }
}

// TODO: 6. メディアファイルとプレイリストをテストしてください

// サンプルメディアファイルの作成
let audioFile = {
  type: 'audio',
  name: '楽曲.mp3',
  duration: 180,  // 3分
  bitrate: 320    // 320kbps
};

let videoFile = {
  type: 'video',
  name: '動画.mp4',
  duration: 600,  // 10分
  resolution: '1080p'
};

let imageFile = {
  type: 'image',
  name: '写真.jpg',
  width: 1920,
  height: 1080
};

// ファイル処理のテスト
console.log("=== メディアファイル処理テスト ===");
console.log(processMediaFile(audioFile));
console.log(processMediaFile(videoFile));
console.log(processMediaFile(imageFile));

// 型ガードのテスト
console.log("\n=== 型ガードテスト ===");
console.log("音声ファイルか:", isAudioFile(audioFile));
console.log("動画ファイルか:", isVideoFile(videoFile));
console.log("画像ファイルか:", isImageFile(imageFile));

// ファイルサイズ計算のテスト
console.log("\n=== ファイルサイズ計算テスト ===");
console.log("音声ファイルサイズ:", Math.round(calculateFileSize(audioFile)) + "KB");
console.log("動画ファイルサイズ:", Math.round(calculateFileSize(videoFile)) + "KB");
console.log("画像ファイルサイズ:", Math.round(calculateFileSize(imageFile)) + "KB");

// プレイリストのテスト
console.log("\n=== プレイリストテスト ===");
let playlist = new MediaPlaylist();
playlist.addFile(audioFile);
playlist.addFile(videoFile);
playlist.addFile(imageFile);

console.log(playlist.getPlaylistInfo());

// タイプ別ファイル一覧
console.log("\n=== タイプ別ファイル一覧 ===");
let audioFiles = playlist.getFilesByType('audio');
let videoFiles = playlist.getFilesByType('video');
let imageFiles = playlist.getFilesByType('image');

console.log("音声ファイル:", audioFiles.map(f => f.name));
console.log("動画ファイル:", videoFiles.map(f => f.name));
console.log("画像ファイル:", imageFiles.map(f => f.name));`,

  exerciseHints: [
    "型ガードはtypeof、instanceof、in演算子で実現できます",
    "判別可能なUnion型ではtypeプロパティで分岐できます",
    "カスタム型ガード関数で複雑な判定をカプセル化できます",
    "switch文を使うことで網羅性チェックが可能です",
    "filter()メソッドと型ガードを組み合わせて使えます"
  ],

  testCases: [
    {
      id: "test1",
      description: "processMediaFile関数が音声ファイルを正しく処理する",
      testFunction: "() => { let file = {type: 'audio', name: 'test.mp3', duration: 120, bitrate: 192}; let result = processMediaFile(file); return typeof result === 'string' && result.includes('音声ファイル') && result.includes('test.mp3'); }"
    },
    {
      id: "test2",
      description: "isAudioFile関数が正しく動作する",
      testFunction: "() => { let audioFile = {type: 'audio', name: 'test.mp3', duration: 120, bitrate: 192}; let videoFile = {type: 'video', name: 'test.mp4', duration: 300, resolution: '720p'}; return isAudioFile(audioFile) === true && isAudioFile(videoFile) === false; }"
    },
    {
      id: "test3",
      description: "calculateFileSize関数が正しく動作する",
      testFunction: "() => { let audioFile = {type: 'audio', name: 'test.mp3', duration: 60, bitrate: 128}; let size = calculateFileSize(audioFile); return typeof size === 'number' && size > 0; }"
    },
    {
      id: "test4",
      description: "MediaPlaylistクラスが正しく動作する",
      testFunction: "() => { let playlist = new MediaPlaylist(); let file = {type: 'audio', name: 'test.mp3', duration: 60, bitrate: 128}; playlist.addFile(file); return playlist.getFilesByType('audio').length === 1; }"
    },
    {
      id: "test5",
      description: "getPlaylistInfo関数が正しく動作する",
      testFunction: "() => { let playlist = new MediaPlaylist(); let file = {type: 'video', name: 'test.mp4', duration: 120, resolution: '480p'}; playlist.addFile(file); let info = playlist.getPlaylistInfo(); return typeof info === 'string' && info.includes('プレイリスト情報'); }"
    }
  ],

  exerciseDifficulty: 'hard'
} as const