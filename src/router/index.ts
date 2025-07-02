import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Lazy load components for better performance
const HomePage = () => import('@/views/HomePage.vue')
const PhaseOverview = () => import('@/views/PhaseOverview.vue')
const PhaseDetail = () => import('@/views/PhaseDetail.vue')
const LessonView = () => import('@/views/LessonView.vue')
const ProgressDashboard = () => import('@/views/ProgressDashboard.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'TypeScript Learning - ホーム'
    }
  },
  {
    path: '/phases',
    name: 'Phases',
    component: PhaseOverview,
    meta: {
      title: 'TypeScript Learning - フェーズ選択'
    }
  },
  {
    path: '/phase/:id',
    name: 'PhaseDetail',
    component: PhaseDetail,
    meta: {
      title: 'TypeScript Learning - フェーズ詳細'
    },
    props: route => ({ 
      id: parseInt(route.params.id as string) 
    })
  },
  {
    path: '/lesson/:id',
    name: 'Lesson',
    component: LessonView,
    meta: {
      title: 'TypeScript Learning - レッスン'
    },
    props: route => ({ 
      id: parseInt(route.params.id as string) 
    })
  },
  {
    path: '/progress',
    name: 'Progress',
    component: ProgressDashboard,
    meta: {
      title: 'TypeScript Learning - 学習進捗'
    }
  },
  {
    // Redirect old routes for backward compatibility
    path: '/typescript-learning-web-app/',
    redirect: '/'
  },
  {
    // 404 fallback
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Update document title
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
  
  // Add loading state
  document.body.classList.add('page-loading')
  
  next()
})

router.afterEach(() => {
  // Remove loading state
  setTimeout(() => {
    document.body.classList.remove('page-loading')
  }, 150)
})

export default router