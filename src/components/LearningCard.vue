<template>
  <div 
    :class="[
      'learning-card',
      { 'completed': isCompleted },
      `phase-${learningDay.phase}`
    ]"
    :data-day="learningDay.day"
  >
    <div class="day-number">{{ learningDay.day }}</div>
    <h3 class="card-title">{{ learningDay.title }}</h3>
    
    <div class="card-section">
      <div class="section-label">ゴール</div>
      <div class="section-content">{{ learningDay.goal }}</div>
    </div>
    
    <div class="card-section">
      <div class="section-label">完了の定義</div>
      <div class="section-content">{{ learningDay.completion }}</div>
    </div>
    
    <div class="card-section">
      <div class="section-label">小課題</div>
      <div class="task-content">{{ learningDay.task }}</div>
    </div>
    
    <!-- 完了チェックボックス -->
    <div 
      :class="['completion-checkbox', { 'completed': isCompleted }]" 
      @click="$emit('toggle-completion', learningDay.day)"
    >
      <div :class="['checkbox', { 'checked': isCompleted }]"></div>
      <span class="checkbox-label">完了</span>
    </div>
    
    <!-- サンプルコード表示チェックボックス -->
    <div 
      v-if="learningDay.sampleCode"
      :class="['sample-code-checkbox', { 'active': isSampleCodeShown }]" 
      @click="$emit('toggle-sample-code', learningDay.day)"
    >
      <div :class="['checkbox', { 'checked': isSampleCodeShown }]"></div>
      <span class="checkbox-label">サンプルコード・解説を表示</span>
    </div>
    
    <!-- サンプルコード表示エリア -->
    <Transition name="slide-down">
      <div v-if="isSampleCodeShown && learningDay.sampleCode" class="sample-code-section">
        <div class="sample-code-header">
          <span class="code-icon">💻</span>
          <span class="sample-title">サンプルコード</span>
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
</template>

<script setup lang="ts">
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

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.learning-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border-left: 5px solid #2196F3;
  transition: all 0.3s ease;
  position: relative;
  animation: fadeIn 0.5s ease forwards;
}

.learning-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.learning-card.completed {
  border-left-color: #4CAF50;
  background: #f8fff8;
}

.learning-card.phase-2 {
  border-left-color: #FF9800;
}

.learning-card.phase-2.completed {
  border-left-color: #4CAF50;
  background: #f8fff8;
}

.learning-card.phase-3 {
  border-left-color: #9C27B0;
}

.learning-card.phase-3.completed {
  border-left-color: #4CAF50;
  background: #f8fff8;
}

.day-number {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #2196F3;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
}

.learning-card.completed .day-number {
  background: #4CAF50;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
  padding-right: 50px;
}

.card-section {
  margin-bottom: 15px;
}

.section-label {
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-content {
  color: #666;
  line-height: 1.6;
}

.task-content {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 5px;
  border-left: 3px solid #2196F3;
}

.completion-checkbox, .sample-code-checkbox {
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.completion-checkbox:hover, .sample-code-checkbox:hover {
  background: #e9ecef;
}

.completion-checkbox.completed {
  background: #e8f5e8;
}

.sample-code-checkbox.active {
  background: #e3f2fd;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-right: 12px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox.checked {
  background: #4CAF50;
  border-color: #4CAF50;
}

.sample-code-checkbox .checkbox.checked {
  background: #2196F3;
  border-color: #2196F3;
}

.checkbox.checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 14px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.checkbox-label {
  font-weight: 500;
  color: #333;
}

.sample-code-section {
  margin-top: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

.sample-code-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #2196F3;
  color: white;
  font-weight: 600;
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
  background: white;
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
  transform: translateY(-20px);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .sample-code {
    font-size: 0.8rem;
    padding: 15px;
  }
}
</style>