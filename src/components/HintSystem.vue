<template>
  <div class="hint-system">
    <div class="hint-header">
      <h4>💡 ヒント</h4>
      <span class="hint-progress">{{ revealedCount }}/{{ totalHints }}</span>
    </div>

    <div class="hints-container">
      <!-- 既に表示されているヒント -->
      <div 
        v-for="(hint, index) in visibleHints" 
        :key="index"
        class="hint-item revealed"
      >
        <div class="hint-number">{{ index + 1 }}</div>
        <div class="hint-content">{{ hint }}</div>
      </div>

      <!-- 次のヒントを表示するボタン -->
      <div v-if="hasMoreHints" class="hint-item next">
        <div class="hint-number">{{ revealedCount + 1 }}</div>
        <button @click="revealNextHint" class="reveal-button">
          次のヒントを表示 ({{ revealedCount + 1 }}/{{ totalHints }})
        </button>
      </div>

      <!-- 全て表示済みの場合 -->
      <div v-if="allHintsRevealed" class="all-hints-shown">
        🎉 すべてのヒントを表示しました
      </div>
    </div>

    <!-- ヒントリセットボタン -->
    <div v-if="revealedCount > 0" class="hint-actions">
      <button @click="resetHints" class="reset-hints-button">
        🔄 ヒントをリセット
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  hints: readonly string[]
  maxRevealed?: number
}

interface Emits {
  (e: 'reveal-hint', index: number): void
  (e: 'reset-hints'): void
}

const props = withDefaults(defineProps<Props>(), {
  maxRevealed: 0
})

const emit = defineEmits<Emits>()

// リアクティブな状態
const revealedCount = ref(props.maxRevealed)

// 計算プロパティ
const totalHints = computed(() => props.hints.length)

const visibleHints = computed(() => {
  return props.hints.slice(0, revealedCount.value)
})

const hasMoreHints = computed(() => {
  return revealedCount.value < totalHints.value
})

const allHintsRevealed = computed(() => {
  return revealedCount.value === totalHints.value && totalHints.value > 0
})

// propsの変更を監視してローカル状態を更新
watch(() => props.maxRevealed, (newValue) => {
  revealedCount.value = newValue
}, { immediate: true })

// メソッド
function revealNextHint() {
  if (hasMoreHints.value) {
    revealedCount.value++
    emit('reveal-hint', revealedCount.value - 1)
  }
}

function resetHints() {
  revealedCount.value = 0
  emit('reset-hints')
}
</script>

<style scoped>
.hint-system {
  background: #fffbeb;
  border: 1px solid #fbbf24;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.hint-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #fbbf24;
}

.hint-header h4 {
  margin: 0;
  color: #92400e;
  font-size: 1.1rem;
  font-weight: 600;
}

.hint-progress {
  background: #fbbf24;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.hints-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.hint-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.hint-item.revealed {
  background: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #fbbf24;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.hint-item.next {
  background: #fef3c7;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #fbbf24;
}

.hint-number {
  background: #fbbf24;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.hint-content {
  flex: 1;
  color: #374151;
  line-height: 1.6;
  font-size: 0.95rem;
}

.reveal-button {
  flex: 1;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.reveal-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.reveal-button:active {
  transform: translateY(0);
}

.all-hints-shown {
  text-align: center;
  color: #059669;
  font-weight: 500;
  padding: 1rem;
  background: #d1fae5;
  border-radius: 8px;
  border: 1px solid #10b981;
}

.hint-actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #fbbf24;
  display: flex;
  justify-content: center;
}

.reset-hints-button {
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.reset-hints-button:hover {
  background: #e5e7eb;
  color: #374151;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .hint-system {
    padding: 1rem;
  }
  
  .hint-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .hint-item.revealed {
    padding: 0.75rem;
  }
  
  .hint-content {
    font-size: 0.9rem;
  }
}
</style>