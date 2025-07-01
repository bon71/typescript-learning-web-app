<template>
  <nav class="tabs">
    <button 
      v-for="phase in phaseInfo" 
      :key="phase.id"
      :class="['tab', { 'active': currentPhase === phase.id }]"
      @click="$emit('change-phase', phase.id)"
    >
      {{ phase.title }}
    </button>
  </nav>
</template>

<script setup lang="ts">
import { phaseInfo } from '@/data'

interface Props {
  currentPhase: number
}

interface Emits {
  (e: 'change-phase', phase: number): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.tabs {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.tab {
  flex: 1;
  padding: 20px;
  text-align: center;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
}

.tab.active {
  background: white;
  color: #2196F3;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #2196F3;
}

@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
  }
}
</style>