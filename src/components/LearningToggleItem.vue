<template>
  <div class="learning-item">
    <!-- トグルヘッダー -->
    <div 
      :class="[
        'learning-header',
        { 'completed': isCompleted, 'expanded': isExpanded },
        `phase-${learningDay.phase}`
      ]"
      @click="toggleExpand"
    >
      <div class="header-left">
        <div class="day-badge">{{ learningDay.day }}</div>
        <h3 class="learning-title">{{ learningDay.title }}</h3>
      </div>
      
      <div class="header-right">
        <div 
          v-if="isCompleted"
          class="completion-badge"
        >
          ✓ 完了
        </div>
        <div class="expand-icon">
          {{ isExpanded ? '−' : '+' }}
        </div>
      </div>
    </div>

    <!-- 展開コンテンツ -->
    <Transition name="slide-down">
      <div v-if="isExpanded" class="learning-content">
        <div class="content-grid">
          <!-- 左側：学習内容 -->
          <div class="learning-details">
            <div class="detail-section">
              <div class="section-label">🎯 ゴール</div>
              <div class="section-content">{{ learningDay.goal }}</div>
            </div>
            
            <div class="detail-section">
              <div class="section-label">✅ 完了の定義</div>
              <div class="section-content">{{ learningDay.completion }}</div>
            </div>
            
            <div class="detail-section">
              <div class="section-label">📝 小課題</div>
              <div class="task-content">{{ learningDay.task }}</div>
            </div>
          </div>

          <!-- 右側：アクションエリア -->
          <div class="action-area">
            <!-- 完了チェックボックス -->
            <div 
              :class="['action-button', 'completion-button', { 'completed': isCompleted }]" 
              @click="$emit('toggle-completion', learningDay.day)"
            >
              <div :class="['checkbox', { 'checked': isCompleted }]"></div>
              <span class="button-label">学習完了</span>
            </div>
            
            <!-- サンプルコード表示ボタン -->
            <div 
              v-if="learningDay.sampleCode"
              :class="['action-button', 'sample-button', { 'active': isSampleCodeShown }]" 
              @click="$emit('toggle-sample-code', learningDay.day)"
            >
              <div :class="['checkbox', { 'checked': isSampleCodeShown }]"></div>
              <span class="button-label">サンプルコード表示</span>
            </div>
          </div>
        </div>

        <!-- サンプルコード表示エリア -->
        <Transition name="fade">
          <div v-if="isSampleCodeShown && learningDay.sampleCode" class="sample-code-section">
            <div class="sample-code-header">
              <div class="header-left">
                <span class="code-icon">💻</span>
                <span class="sample-title">サンプルコード</span>
              </div>
              <button 
                class="copy-button"
                @click="copyToClipboard"
                :class="{ 'copied': isCopied }"
              >
                {{ isCopied ? '✓ コピー完了' : '📋 コピー' }}
              </button>
            </div>
            <pre class="sample-code"><code>{{ learningDay.sampleCode }}</code></pre>
            
            <div v-if="learningDay.explanation" class="explanation">
              <div class="explanation-header">
                <span class="explanation-icon">💡</span>
                <span class="explanation-title">解説</span>
              </div>
              <p class="explanation-content">{{ learningDay.explanation }}</p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { LearningDay } from '@/types/learning'

interface Props {
  learningDay: LearningDay
  isCompleted: boolean
  isSampleCodeShown: boolean
}

interface Emits {
  (e: 'toggle-completion', day: number): void
  (e: 'toggle-sample-code', day: number): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const isExpanded = ref(false)
const isCopied = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const copyToClipboard = async () => {
  const codeText = props.learningDay.sampleCode
  
  if (!codeText) return
  
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // モダンブラウザでの実装
      await navigator.clipboard.writeText(codeText)
    } else {
      // フォールバック実装
      const textArea = document.createElement('textarea')
      textArea.value = codeText
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
    }
    
    // 成功フィードバック
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
    
  } catch (err) {
    console.error('コピーに失敗しました:', err)
    // エラー時はプロンプトでコードを表示
    prompt('コードをコピーしてください:', codeText)
  }
}
</script>

<style scoped>
.learning-item {
  margin-bottom: 8px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background: white;
}

.learning-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid #2196F3;
  background: #fafafa;
}

.learning-header:hover {
  background: #f0f0f0;
}

.learning-header.expanded {
  background: #e3f2fd;
}

.learning-header.completed {
  border-left-color: #4CAF50;
  background: #f1f8e9;
}

.learning-header.phase-2 {
  border-left-color: #FF9800;
}

.learning-header.phase-3 {
  border-left-color: #9C27B0;
}

.learning-header.phase-2.completed,
.learning-header.phase-3.completed {
  border-left-color: #4CAF50;
}

.header-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.day-badge {
  background: #2196F3;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  margin-right: 16px;
  flex-shrink: 0;
}

.learning-header.completed .day-badge {
  background: #4CAF50;
}

.learning-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.completion-badge {
  background: #4CAF50;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.expand-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(33, 150, 243, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #2196F3;
  transition: all 0.3s ease;
}

.learning-header.expanded .expand-icon {
  background: #2196F3;
  color: white;
  transform: rotate(180deg);
}

.learning-content {
  padding: 24px;
  background: white;
  border-top: 1px solid #e9ecef;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  margin-bottom: 24px;
}

.learning-details {
  flex: 1;
}

.detail-section {
  margin-bottom: 20px;
}

.section-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-content {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

.task-content {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 3px solid #2196F3;
  color: #555;
  line-height: 1.6;
}

.action-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 200px;
}

.action-button {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
  background: #fafafa;
}

.action-button:hover {
  background: #f0f0f0;
  border-color: #ddd;
}

.completion-button.completed {
  background: #e8f5e8;
  border-color: #4CAF50;
}

.sample-button.active {
  background: #e3f2fd;
  border-color: #2196F3;
}

.checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.checkbox.checked {
  background: #4CAF50;
  border-color: #4CAF50;
}

.sample-button .checkbox.checked {
  background: #2196F3;
  border-color: #2196F3;
}

.checkbox.checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 12px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.button-label {
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.sample-code-section {
  margin-top: 24px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

.sample-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #2196F3;
  color: white;
  font-weight: 600;
}

.sample-code-header .header-left {
  display: flex;
  align-items: center;
}

.copy-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.copy-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.copy-button.copied {
  background: #4CAF50;
  border-color: #4CAF50;
}

.code-icon {
  margin-right: 8px;
  font-size: 1.1rem;
}

.sample-code {
  margin: 0;
  padding: 20px;
  background: #2d3748;
  color: #e2e8f0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre-wrap;
}

.explanation {
  padding: 16px;
  background: #f8f9fa;
}

.explanation-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 600;
  color: #333;
}

.explanation-icon {
  margin-right: 8px;
  font-size: 1.1rem;
}

.explanation-content {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* アニメーション */
.slide-down-enter-active {
  transition: all 0.3s ease-out;
}

.slide-down-leave-active {
  transition: all 0.3s ease-in;
}

.slide-down-enter-from {
  opacity: 0;
  max-height: 0;
}

.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* レスポンシブ */
@media (max-width: 768px) {
  .learning-header {
    padding: 16px 20px;
  }
  
  .learning-content {
    padding: 20px;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .action-area {
    min-width: auto;
  }
  
  .learning-title {
    font-size: 1rem;
  }
  
  .sample-code {
    font-size: 0.8rem;
    padding: 15px;
  }
}
</style>