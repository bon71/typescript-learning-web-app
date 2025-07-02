<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-accent">TypeScript</span>を
          <br>楽しく学ぼう！
        </h1>
        <p class="hero-subtitle">
          インタラクティブな学習環境で、基礎から実践まで段階的にマスターできます
        </p>
        <div class="hero-actions">
          <router-link to="/phases" class="cta-button primary">
            🚀 学習を始める
          </router-link>
          <router-link to="/progress" class="cta-button secondary">
            📊 進捗を確認
          </router-link>
        </div>
      </div>
      <div class="hero-visual">
        <div class="code-preview">
          <div class="code-header">
            <div class="dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="filename">example.ts</span>
          </div>
          <div class="code-content">
            <pre><code><span class="keyword">const</span> <span class="variable">message</span>: <span class="type">string</span> = <span class="string">"Hello, TypeScript!"</span>;
<span class="keyword">function</span> <span class="function">greet</span>(<span class="parameter">name</span>: <span class="type">string</span>) {
  <span class="keyword">return</span> <span class="template">`${message} ${name}`</span>;
}

<span class="function">console.log</span>(<span class="function">greet</span>(<span class="string">"World"</span>));</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">学習の特徴</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">💻</div>
            <h3 class="feature-title">実践的な学習</h3>
            <p class="feature-description">
              リアルタイムでコードを実行して、即座に結果を確認できます
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h3 class="feature-title">段階的なカリキュラム</h3>
            <p class="feature-description">
              基礎から応用まで、3つのフェーズで体系的に学習できます
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3 class="feature-title">明確な目標設定</h3>
            <p class="feature-description">
              各レッスンに明確なゴールがあり、達成感を感じながら学習できます
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📈</div>
            <h3 class="feature-title">進捗管理</h3>
            <p class="feature-description">
              学習の進捗を可視化して、モチベーションを維持できます
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{ stats.totalLessons }}</div>
            <div class="stat-label">レッスン数</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ stats.totalPhases }}</div>
            <div class="stat-label">学習フェーズ</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ Math.round(stats.averageTimePerLesson) }}</div>
            <div class="stat-label">分/レッスン</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ progressStats.completedLessons }}</div>
            <div class="stat-label">完了済み</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Start Section -->
    <section class="quick-start">
      <div class="container">
        <h2 class="section-title">学習フェーズ</h2>
        <div class="phases-preview">
          <div 
            v-for="phase in allPhases" 
            :key="phase.id"
            class="phase-card"
            @click="$router.push(`/phase/${phase.id}`)"
          >
            <div class="phase-header">
              <div class="phase-number">{{ phase.id }}</div>
              <div class="phase-progress">
                <div 
                  class="progress-bar" 
                  :style="{ width: getPhaseProgress(phase.id) + '%' }"
                ></div>
              </div>
            </div>
            <h3 class="phase-title">{{ phase.title }}</h3>
            <p class="phase-description">{{ phase.description }}</p>
            <div class="phase-stats">
              <span class="lesson-count">{{ getLessonCount(phase.id) }}レッスン</span>
              <span class="difficulty">{{ phase.difficulty }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { allPhases, getContentStatistics, getLessonsByPhase } from '@/data'
import { useLearningProgress } from '@/composables/useLearningProgress'

// Get content statistics
const stats = getContentStatistics()

// Get learning progress
const { progressStats } = useLearningProgress()

// Get lesson count for each phase
const getLessonCount = (phaseId: number): number => {
  return getLessonsByPhase(phaseId).length
}

// Calculate phase progress
const getPhaseProgress = (phaseId: number): number => {
  const lessons = getLessonsByPhase(phaseId)
  if (lessons.length === 0) return 0
  
  const completed = lessons.filter(lesson => 
    progressStats.value.completedDays.includes(lesson.day)
  ).length
  
  return Math.round((completed / lessons.length) * 100)
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  gap: 4rem;
}

.hero-content {
  padding: 2rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.title-accent {
  background: linear-gradient(45deg, #ffd700, #ffeb3b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.cta-button.primary {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

/* Code Preview */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.code-preview {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #2d2d2d;
}

.dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27ca3f; }

.filename {
  color: #ccc;
  font-size: 0.9rem;
}

.code-content {
  padding: 1.5rem;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.code-content .keyword { color: #569cd6; }
.code-content .variable { color: #9cdcfe; }
.code-content .type { color: #4ec9b0; }
.code-content .string { color: #ce9178; }
.code-content .function { color: #dcdcaa; }
.code-content .parameter { color: #9cdcfe; }
.code-content .template { color: #ce9178; }

/* Features Section */
.features {
  padding: 5rem 2rem;
  background: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #1e293b;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}

.feature-description {
  color: #64748b;
  line-height: 1.6;
}

/* Stats Section */
.stats {
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Quick Start Section */
.quick-start {
  padding: 5rem 2rem;
  background: white;
}

.phases-preview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.phase-card {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.phase-card:hover {
  transform: translateY(-5px);
  border-color: #667eea;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
}

.phase-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.phase-number {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.phase-progress {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  transition: width 0.3s ease;
}

.phase-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.phase-description {
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.phase-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #64748b;
}

.lesson-count {
  font-weight: 500;
}

.difficulty {
  background: #fbbf24;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 1rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .phases-preview {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>