export interface Region {
  id: string;
  name: string;
  completion: number;
  isUnlocked: boolean;
  description: string;
  totalQuestions: number;
  correctAnswers: number;
  x: number; // position on map
  y: number;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  funFact?: string;
  image?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  region: string;
}

export interface UserProfile {
  nickname: string;
  avatar: string;
  totalQuestions: number;
  accuracy: number;
  consecutiveDays: number;
  achievements: Achievement[];
  level: number;
  experience: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface QuizAnswer {
  questionId: string;
  userAnswer: string;
  correct: boolean;
  timeTaken: number;
}

export interface QuizSession {
  regionId: string;
  regionName: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: (number | null)[];
  score: number;
  startTime: number;
}

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type MapType = 'china' | 'world';
export type SchoolStage = 'primary' | 'middle' | 'high' | 'general';
export type AgeRange = '6-9' | '10-12' | '13-15' | '16+';

export interface FilterOptions {
  mapType: MapType;
  regions: string[];
  schoolStage: SchoolStage[];
  ageRange: AgeRange[];
  difficulty: DifficultyLevel;
}

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  1: '入门',
  2: '基础',
  3: '进阶',
  4: '挑战',
  5: '专家',
};

export const SCHOOL_STAGE_LABELS: Record<SchoolStage, string> = {
  primary: '小学',
  middle: '初中',
  high: '高中',
  general: '通用',
};