<template>
  <footer class="stats">
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-number">{{ progressStats.phase1Progress }}</span>
        <div class="stat-label">Phase 1 完了率 (%)</div>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ progressStats.phase2Progress }}</span>
        <div class="stat-label">Phase 2 完了率 (%)</div>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ progressStats.phase3Progress }}</span>
        <div class="stat-label">Phase 3 完了率 (%)</div>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ progressStats.studyStreak }}</span>
        <div class="stat-label">学習継続日数 (日)</div>
      </div>
    </div>
    <button class="reset-button" @click="$emit('reset-progress')">
      進捗をリセット
    </button>
  </footer>
</template>

<script setup lang="ts">
import type { ProgressStats } from '@/types/learning'

interface Props {
  progressStats: ProgressStats
}

interface Emits {
  (e: 'reset-progress'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.stats {
  background: #f8f9fa;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #e9ecef;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.stat-item {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #2196F3;
  display: block;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
  margin-top: 5px;
}

.reset-button {
  background: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 20px;
  transition: background 0.3s ease;
}

.reset-button:hover {
  background: #d32f2f;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>