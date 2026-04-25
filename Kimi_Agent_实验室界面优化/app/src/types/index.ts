// 实验难度类型
export type Difficulty = 'easy' | 'medium' | 'hard';

// 实验信息
export interface Experiment {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: Difficulty;
  steps: ExperimentStep[];
  instruments: Instrument[];
  reagents: Reagent[];
  principles: Principle;
  safety: SafetyItem[];
}

// 实验步骤
export interface ExperimentStep {
  id: number;
  title: string;
  content: string;
  detailContent: string;
}

// 仪器
export interface Instrument {
  id: string;
  name: string;
  englishName: string;
  description: string;
  usage: string;
  icon: string;
}

// 试剂
export interface Reagent {
  id: string;
  name: string;
  englishName: string;
  description: string;
  usage: string;
  icon: string;
}

// 实验原理
export interface Principle {
  content: string;
  questions: Question[];
}

// 选择题
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

// 安全事项
export interface SafetyItem {
  id: number;
  content: string;
}

// 视图类型
export type ViewType = 'home' | 'catalog' | 'experiment' | 'instruments' | 'principle' | 'safety';

// 信息栏按钮类型
export type InfoTabType = 'catalog' | 'steps' | 'instruments' | 'principle' | 'safety';
