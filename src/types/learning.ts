export interface LearningDay {
  day: number
  title: string
  goal: string
  completion: string
  task: string
  phase: number
  sampleCode?: string
  explanation?: string
}

export interface ProgressStats {
  totalProgress: number
  completedDays: number
  remainingDays: number
  phase1Progress: number
  phase2Progress: number
  phase3Progress: number
  studyStreak: number
}

export interface PhaseInfo {
  id: number
  title: string
  description: string
  color: string
}