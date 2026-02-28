import { useState } from 'react';
import { Home, Lightbulb, Beaker, BookOpen, Shield, List, ChevronRight } from 'lucide-react';
import type { Experiment, ViewType, InfoTabType } from '@/types';
import InstrumentsView from '@/sections/InstrumentsView';
import PrincipleView from '@/sections/PrincipleView';
import SafetyView from '@/sections/SafetyView';
import Experiment1Lab from '@/sections/Experiment1Lab';

interface ExperimentPageProps {
  experiment: Experiment;
  currentView: ViewType;
  currentInfoTab: InfoTabType;
  onBackToHome: () => void;
  onInfoTabChange: (tab: InfoTabType) => void;
}

export default function ExperimentPage({
  experiment,
  currentView,
  currentInfoTab,
  onBackToHome,
  onInfoTabChange,
}: ExperimentPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = experiment.steps;
  const totalSteps = steps.length;

  // Get content for the left panel (previous step or hovered step)
  const getLeftPanelContent = () => {
    if (hoveredStep !== null) {
      // Show hovered step content
      const step = steps.find(s => s.id === hoveredStep);
      return {
        title: step?.title || '',
        content: step?.content || '',
        isHovered: true,
      };
    }
    // Show previous step content (or default for step 1)
    if (currentStep === 1) {
      return {
        title: '虚拟实验室',
        content: '欢迎使用虚拟实验室系统。请按照步骤指引完成实验操作。',
        isHovered: false,
      };
    }
    const prevStep = steps.find(s => s.id === currentStep - 1);
    return {
      title: prevStep?.title || '',
      content: prevStep?.content || '',
      isHovered: false,
    };
  };

  const leftPanelContent = getLeftPanelContent();
  const currentStepData = steps.find(s => s.id === currentStep);

  const infoTabs = [
    { id: 'catalog' as InfoTabType, label: '目录页', icon: List },
    { id: 'safety' as InfoTabType, label: '实验室安全', icon: Shield },
    { id: 'principle' as InfoTabType, label: '原理', icon: BookOpen },
    { id: 'instruments' as InfoTabType, label: '仪器/试剂', icon: Beaker },
    { id: 'steps' as InfoTabType, label: '步骤', icon: ChevronRight },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex">
      {/* Left sidebar - Steps panel */}
      <aside className="w-72 bg-[#1a1a2e] border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <h2 className="text-sm text-gray-400">实验{experiment.id}：{experiment.title.split('：')[1]?.substring(0, 15)}...</h2>
        </div>

        {/* Previous step / Hovered step content */}
        <div className="p-4 bg-[#252540] border-b border-white/10 min-h-[120px]">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className={leftPanelContent.isHovered ? 'text-amber-400' : 'text-blue-400'} />
            <span className={`text-xs ${leftPanelContent.isHovered ? 'text-amber-400' : 'text-blue-400'}`}>
              {leftPanelContent.isHovered ? '步骤预览' : '上一步'}
            </span>
          </div>
          <h3 className="text-sm font-medium text-white mb-2">{leftPanelContent.title}</h3>
          <p className="text-xs text-gray-400 leading-relaxed">{leftPanelContent.content}</p>
        </div>

        {/* Steps list */}
        <div className="flex-1 overflow-auto p-4">
          <h3 className="text-xs text-gray-500 mb-3 uppercase tracking-wider">实验步骤</h3>
          <div className="space-y-2">
            {steps.map((step) => (
              <div
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  step.id === currentStep
                    ? 'bg-blue-500/20 border-l-2 border-blue-500'
                    : step.id < currentStep
                    ? 'bg-green-500/10 border-l-2 border-green-500'
                    : 'bg-white/5 hover:bg-white/10 border-l-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    step.id === currentStep
                      ? 'bg-blue-500 text-white'
                      : step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {step.id < currentStep ? '✓' : step.id}
                  </span>
                  <span className={`text-sm ${
                    step.id === currentStep ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="p-4 border-t border-white/10">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>总体进度</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col">
        {/* Top bar with experiment title */}
        <header className="h-14 bg-[#1a1a2e] border-b border-white/10 flex items-center px-6">
          <h1 className="text-lg font-medium text-white">
            实验{experiment.id}：{experiment.title.split('：')[1]}
          </h1>
        </header>

        {/* Content based on current view */}
        <div className="flex-1 flex">
          {/* Center content */}
          <div className="flex-1 flex flex-col">
            {currentView === 'experiment' && (
              <>
                {/* Main experiment area - expanded */}
                <div className="flex-1 bg-[#0a0a1a] overflow-hidden">
                  {experiment.id === 1 ? (
                    <Experiment1Lab 
                      currentStep={currentStep} 
                      onStepComplete={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Beaker size={80} className="mx-auto text-blue-400/50 mb-4" />
                        <p className="text-gray-400">实验操作区域</p>
                        <p className="text-sm text-gray-500 mt-2">步骤 {currentStep}/{totalSteps}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Current step panel at bottom */}
                <div className="bg-[#1a1a2e] border-t border-white/10 p-4">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-400 text-sm font-medium">
                        步骤 {currentStep}/{totalSteps}
                      </span>
                      <span className="text-gray-500">|</span>
                      <span className="text-white font-medium">{currentStepData?.title}</span>
                    </div>
                    <div className="bg-[#252540] rounded-lg p-3">
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                        {currentStepData?.detailContent}
                      </p>
                    </div>
                    <div className="mt-3 flex justify-between">
                      <button
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                        className="px-4 py-2 bg-white/10 rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                      >
                        上一步
                      </button>
                      <button
                        onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                        disabled={currentStep === totalSteps}
                        className="px-4 py-2 bg-blue-600 rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                      >
                        下一步
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentView === 'instruments' && (
              <InstrumentsView experiment={experiment} />
            )}

            {currentView === 'principle' && (
              <PrincipleView experiment={experiment} />
            )}

            {currentView === 'safety' && (
              <SafetyView experiment={experiment} />
            )}
          </div>

          {/* Right sidebar - Info panel (fixed) */}
          <aside className="w-48 bg-[#1a1a2e] border-l border-white/10 flex flex-col">
            {/* Home icon */}
            <div className="p-6 flex flex-col items-center border-b border-white/10">
              <button
                onClick={onBackToHome}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors mb-2"
              >
                <Home size={24} className="text-gray-300" />
              </button>
            </div>

            {/* Title */}
            <div className="p-4 text-center border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">实验信息</h3>
            </div>

            {/* Navigation tabs */}
            <nav className="flex-1 p-4 space-y-3">
              {infoTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentInfoTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onInfoTabChange(tab.id)}
                    className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-400 border border-amber-500/50 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span>{tab.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      </main>
    </div>
  );
}
