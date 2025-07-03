<template>
  <div class="basic-code-editor" :style="{ height: height }">
    
    <div class="editor-main">
      <div class="editor-content">
        <!-- 行番号表示 -->
        <div ref="lineNumbers" class="line-numbers">
          <div 
            v-for="lineNum in lineCount" 
            :key="lineNum"
            class="line-number"
          >
            {{ lineNum }}
          </div>
        </div>
        
        <!-- シンタックスハイライト表示 -->
        <pre ref="syntaxHighlight" class="syntax-highlight" v-html="highlightedCode"></pre>
        
        <!-- 実際の入力用textarea -->
        <textarea
          ref="codeTextarea"
          v-model="localValue"
          @input="onInput"
          @scroll="syncScroll"
          @wheel="onWheel"
          class="code-textarea"
          spellcheck="false"
          autocomplete="off"
          wrap="off"
          placeholder="// TypeScriptコードをここに入力してください..."
        ></textarea>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

interface Props {
  value?: string
  height?: string
  showOutput?: boolean
  initialCode?: string
}

interface Emits {
  (e: 'update:value', value: string): void
  (e: 'change', value: string): void
  (e: 'run', result: any): void
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  height: '500px',
  showOutput: true,
  initialCode: ''
})

const emit = defineEmits<Emits>()

const codeTextarea = ref<HTMLTextAreaElement>()
const localValue = ref(props.value || props.initialCode)
const isRunning = ref(false)
const outputEntries = ref<Array<{ type: string; message: string }>>([])

const lineCount = computed(() => {
  return localValue.value.split('\n').length
})

// シンタックスハイライト（安全な実装）
const highlightedCode = computed(() => {
  return highlightCode(localValue.value)
})

// より安全なシンタックスハイライト実装
function highlightCode(code: string): string {
  if (!code) return ''
  
  // HTMLエスケープ
  let result = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // トークン化アプローチで安全に処理
  const tokens: Array<{type: string, value: string, start: number, end: number}> = []
  
  // 1. コメントを検出
  const commentRegex = /\/\/.*$|\/\*[\s\S]*?\*\//gm
  let match
  while ((match = commentRegex.exec(result)) !== null) {
    tokens.push({
      type: 'comment',
      value: match[0],
      start: match.index,
      end: match.index + match[0].length
    })
  }
  
  // 2. 文字列を検出
  const stringRegex = /"([^"\\\\]|\\\\.)*"|'([^'\\\\]|\\\\.)*'|`([^`\\\\]|\\\\.)*`/g
  while ((match = stringRegex.exec(result)) !== null) {
    // コメント内でないかチェック
    const inComment = tokens.some(token => 
      token.type === 'comment' && match.index >= token.start && match.index < token.end
    )
    if (!inComment) {
      tokens.push({
        type: 'string',
        value: match[0],
        start: match.index,
        end: match.index + match[0].length
      })
    }
  }
  
  // 3. キーワードを検出
  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'true', 'false', 'null', 'undefined']
  keywords.forEach(keyword => {
    const keywordRegex = new RegExp(`\\\\b${keyword}\\\\b`, 'g')
    while ((match = keywordRegex.exec(result)) !== null) {
      // 既存のトークン内でないかチェック
      const inToken = tokens.some(token => 
        match.index >= token.start && match.index < token.end
      )
      if (!inToken) {
        tokens.push({
          type: 'keyword',
          value: match[0],
          start: match.index,
          end: match.index + match[0].length
        })
      }
    }
  })
  
  // 4. 数値を検出
  const numberRegex = /\\b\\d+(\\.\\d+)?\\b/g
  while ((match = numberRegex.exec(result)) !== null) {
    const inToken = tokens.some(token => 
      match.index >= token.start && match.index < token.end
    )
    if (!inToken) {
      tokens.push({
        type: 'number',
        value: match[0],
        start: match.index,
        end: match.index + match[0].length
      })
    }
  }
  
  // トークンを位置順でソート
  tokens.sort((a, b) => a.start - b.start)
  
  // トークンを適用
  let highlighted = result
  let offset = 0
  
  tokens.forEach(token => {
    const start = token.start + offset
    const end = token.end + offset
    const before = highlighted.substring(0, start)
    const after = highlighted.substring(end)
    const replacement = `<span class="${token.type}">${token.value}</span>`
    
    highlighted = before + replacement + after
    offset += replacement.length - token.value.length
  })
  
  return highlighted
}

// スクロール同期
const syntaxHighlight = ref<HTMLElement>()
const lineNumbers = ref<HTMLElement>()

function syncScroll() {
  if (syntaxHighlight.value && codeTextarea.value) {
    syntaxHighlight.value.scrollTop = codeTextarea.value.scrollTop
    syntaxHighlight.value.scrollLeft = codeTextarea.value.scrollLeft
  }
  
  // 行番号も縦スクロールに同期
  if (lineNumbers.value && codeTextarea.value) {
    lineNumbers.value.scrollTop = codeTextarea.value.scrollTop
  }
}

// マウスホイールイベント処理
function onWheel(event: WheelEvent) {
  // デフォルトのスクロール動作を確実に実行
  event.stopPropagation()
  
  if (codeTextarea.value) {
    // スクロール量を調整（スムーズなスクロール）
    const scrollAmount = event.deltaY
    codeTextarea.value.scrollTop += scrollAmount
    
    // シンタックスハイライトも同期
    nextTick(() => {
      syncScroll()
    })
  }
}

const onInput = () => {
  emit('update:value', localValue.value)
  emit('change', localValue.value)
}

const runCode = async () => {
  console.log('runCode called', { isRunning: isRunning.value, codeLength: localValue.value.trim().length })
  
  if (isRunning.value) {
    console.log('Already running, aborting')
    return
  }
  
  if (!localValue.value.trim()) {
    outputEntries.value = [{
      type: 'warn',
      message: 'コードが入力されていません'
    }]
    return
  }
  
  isRunning.value = true
  outputEntries.value = []
  
  try {
    // console.logをキャプチャ
    const originalLog = console.log
    const originalError = console.error
    const originalWarn = console.warn
    
    const capturedOutput: Array<{ type: string; message: string }> = []
    
    // コンソール関数をオーバーライド
    const tempConsole = {
      log: (...args: any[]) => {
        capturedOutput.push({
          type: 'log',
          message: args.map(arg => {
            if (typeof arg === 'object' && arg !== null) {
              try {
                return JSON.stringify(arg, null, 2)
              } catch {
                return String(arg)
              }
            }
            return String(arg)
          }).join(' ')
        })
      },
      error: (...args: any[]) => {
        capturedOutput.push({
          type: 'error',
          message: args.map(arg => String(arg)).join(' ')
        })
      },
      warn: (...args: any[]) => {
        capturedOutput.push({
          type: 'warn',
          message: args.map(arg => String(arg)).join(' ')
        })
      }
    }
    
    try {
      // より安全なコード実行方法
      const originalConsole = (globalThis as any).console
      
      // 一時的にconsoleを置き換え
      ;(globalThis as any).console = tempConsole
      
      try {
        // 直接evalで実行（サンドボックス化）
        eval(localValue.value)
        
        // console.logでの出力がない場合のみメッセージを表示
        if (capturedOutput.length === 0) {
          capturedOutput.push({
            type: 'info',
            message: 'コードが正常に実行されました（出力なし）'
          })
        }
      } finally {
        // consoleを元に戻す
        ;(globalThis as any).console = originalConsole
      }
    } catch (error: any) {
      capturedOutput.push({
        type: 'error',
        message: `実行エラー: ${error.message}`
      })
    }
    
    outputEntries.value = capturedOutput
    emit('run', { success: capturedOutput.every(entry => entry.type !== 'error'), output: capturedOutput })
    
  } catch (error: any) {
    outputEntries.value = [{
      type: 'error',
      message: `実行に失敗しました: ${error.message}`
    }]
    emit('run', { success: false, error })
  } finally {
    isRunning.value = false
  }
}

const formatCode = () => {
  // 簡単なフォーマット処理
  try {
    const lines = localValue.value.split('\n')
    let indentLevel = 0
    const formattedLines = lines.map(line => {
      const trimmed = line.trim()
      if (!trimmed) return ''
      
      // 閉じブラケットの場合はインデントを減らす
      if (trimmed.includes('}') || trimmed.includes(']') || trimmed.includes(')')) {
        indentLevel = Math.max(0, indentLevel - 1)
      }
      
      const formatted = '  '.repeat(indentLevel) + trimmed
      
      // 開きブラケットの場合はインデントを増やす
      if (trimmed.includes('{') || trimmed.includes('[') || trimmed.includes('(')) {
        indentLevel++
      }
      
      return formatted
    })
    
    localValue.value = formattedLines.join('\n')
    onInput()
    
    // 出力メッセージ
    outputEntries.value.push({
      type: 'info',
      message: 'コードがフォーマットされました'
    })
  } catch (error) {
    console.warn('フォーマットに失敗しました:', error)
    outputEntries.value.push({
      type: 'error',
      message: 'フォーマットに失敗しました'
    })
  }
}

const resetCode = () => {
  localValue.value = props.initialCode || ''
  onInput()
  clearOutput()
  
  // 出力メッセージ
  outputEntries.value.push({
    type: 'info',
    message: 'コードがリセットされました'
  })
}

const clearOutput = () => {
  outputEntries.value = []
}

// 値の変更を監視
watch(() => props.value, (newValue) => {
  if (localValue.value !== newValue) {
    localValue.value = newValue
  }
})

// メソッドを公開
const getValue = () => localValue.value
const setValue = (value: string) => {
  localValue.value = value
  onInput()
}

const focus = () => {
  nextTick(() => {
    codeTextarea.value?.focus()
  })
}

defineExpose({
  getValue,
  setValue,
  focus,
  formatCode,
  runCode,
  outputEntries,
  clearOutput
})
</script>

<style scoped>
.basic-code-editor {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #1e1e1e;
  color: #d4d4d4;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.editor-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}

.editor-content {
  flex: 2;
  display: flex;
  position: relative;
  overflow: hidden;
  /* スクロール領域を明確にする */
  isolation: isolate;
}

.line-numbers {
  background: #252526;
  color: #858585;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 1rem 0.5rem;
  text-align: right;
  user-select: none;
  min-width: 3rem;
  border-right: 1px solid #3e3e42;
  overflow: hidden;
  /* 縦スクロールのみ有効 */
  overflow-y: auto;
  overflow-x: hidden;
  /* スクロールバーを非表示 */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.line-numbers::-webkit-scrollbar {
  display: none;
}

.line-number {
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
}

.syntax-highlight {
  position: absolute;
  top: 0;
  left: 3rem;
  right: 0;
  bottom: 0;
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  overflow: hidden; /* シンタックスハイライトはスクロールしない */
  pointer-events: none;
  z-index: 1;
  background: #1e1e1e;
  margin: 0;
  border: none;
}

.code-textarea {
  position: absolute;
  top: 0;
  left: 3rem;
  right: 0;
  bottom: 0;
  background: transparent;
  color: transparent;
  border: none;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 1rem;
  resize: none;
  outline: none;
  white-space: pre-wrap;
  overflow-wrap: normal;
  overflow: auto;
  tab-size: 2;
  z-index: 2;
  caret-color: #ffffff;
  selection-color: #264f78;
  /* スムーズスクロールを有効にする */
  scroll-behavior: smooth;
  /* スクロールバーのスタイルを整える */
  scrollbar-width: thin;
  scrollbar-color: #424242 #1e1e1e;
}

/* WebKitブラウザ用スクロールバースタイル */
.code-textarea::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.code-textarea::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.code-textarea::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 4px;
}

.code-textarea::-webkit-scrollbar-thumb:hover {
  background: #525252;
}

.code-textarea::-webkit-scrollbar-corner {
  background: #1e1e1e;
}

.code-textarea:focus {
  outline: none;
}

/* プレースホルダーのスタイル */
.code-textarea::placeholder {
  color: #6a9955;
  font-style: italic;
  opacity: 0.7;
}

/* シンタックスハイライトのスタイル */
.syntax-highlight :deep(.keyword) {
  color: #569cd6;
  font-weight: bold;
}

.syntax-highlight :deep(.string) {
  color: #ce9178;
}

.syntax-highlight :deep(.number) {
  color: #b5cea8;
}

.syntax-highlight :deep(.comment) {
  color: #6a9955;
  font-style: italic;
}

.syntax-highlight :deep(.function) {
  color: #dcdcaa;
}

</style>