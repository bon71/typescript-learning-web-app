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
    
    <div 
      :class="['completion-checkbox', { 'completed': isCompleted }]" 
      @click="$emit('toggle-completion', learningDay.day)"
    >
      <div :class="['checkbox', { 'checked': isCompleted }]"></div>
      <span class="checkbox-label">完了</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LearningDay } from '@/types/learning'

interface Props {
  learningDay: LearningDay
  isCompleted: boolean
}

interface Emits {
  (e: 'toggle-completion', day: number): void
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

.completion-checkbox {
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.completion-checkbox:hover {
  background: #e9ecef;
}

.completion-checkbox.completed {
  background: #e8f5e8;
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
</style>