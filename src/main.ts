import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Monaco Editorの設定をインポート
import { 
  setupMonacoEnvironment, 
  setupCustomThemes, 
  setupCodeCompletion 
} from './monaco-worker'

// Monaco Editorの初期化
async function initializeMonaco() {
  try {
    // 基本環境設定
    setupMonacoEnvironment()
    
    // カスタムテーマ設定
    setupCustomThemes()
    
    // コード補完設定
    setupCodeCompletion()
    
    console.log('✅ Monaco Editor が正常に初期化されました')
  } catch (error) {
    console.error('❌ Monaco Editor の初期化に失敗しました:', error)
  }
}

// アプリケーション初期化
async function initializeApp() {
  // Monaco Editorを最初に初期化
  await initializeMonaco()
  
  // Vueアプリケーションを作成・マウント
  const app = createApp(App)
  app.mount('#app')
  
  console.log('🎉 TypeScript学習アプリケーションが開始されました')
}

// アプリケーション開始
initializeApp().catch(error => {
  console.error('アプリケーションの初期化に失敗しました:', error)
})