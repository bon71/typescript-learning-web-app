<template>
  <header class="header">
    <h1>TypeScript学習ガイド</h1>
    <p>20日間でマスターするTypeScript - 1日10分からスタート</p>
    
    <div class="progress-summary">
      <div class="progress-item">
        <span class="progress-number">{{ progressStats.totalProgress }}</span>
        <span class="progress-label">全体進捗 (%)</span>
      </div>
      <div class="progress-item">
        <span class="progress-number">{{ progressStats.completedDays }}</span>
        <span class="progress-label">完了日数 (日)</span>
      </div>
      <div class="progress-item">
        <span class="progress-number">{{ progressStats.remainingDays }}</span>
        <span class="progress-label">残り日数 (日)</span>
      </div>
    </div>
    
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${progressStats.totalProgress}%` }"
      ></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { ProgressStats } from '@/types/learning'

interface Props {
  progressStats: ProgressStats
}

defineProps<Props>()
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #2196F3 0%, #21CBF3 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.progress-summary {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
}

.progress-item {
  text-align: center;
}

.progress-number {
  font-size: 2rem;
  font-weight: bold;
  display: block;
}

.progress-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin: 20px 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s ease;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .progress-summary {
    flex-direction: column;
    gap: 15px;
  }
}
</style>