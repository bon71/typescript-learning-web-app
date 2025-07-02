<template>
  <div id="app">
    <!-- Page loading indicator -->
    <Transition name="fade">
      <div v-if="isPageLoading" class="page-loading-overlay">
        <div class="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </Transition>

    <!-- Router View -->
    <router-view v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Page loading state
const isPageLoading = ref(false)

// Monitor page loading state
onMounted(() => {
  // Listen for page loading events
  document.body.classList.contains('page-loading')
    ? isPageLoading.value = true
    : isPageLoading.value = false
    
  // Watch for body class changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        isPageLoading.value = document.body.classList.contains('page-loading')
      }
    })
  })
  
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  })
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Page loading overlay */
.page-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.page-loading-overlay p {
  color: #64748b;
  font-size: 1rem;
  margin: 0;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Global body loading state */
:global(body.page-loading) {
  overflow: hidden;
}

/* Responsive improvements */
@media (max-width: 768px) {
  #app {
    font-size: 14px;
  }
}
</style>