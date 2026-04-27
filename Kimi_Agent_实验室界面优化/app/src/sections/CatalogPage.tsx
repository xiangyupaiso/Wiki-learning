import { useState } from 'react';
import { ArrowLeft, Beaker } from 'lucide-react';
import type { Experiment, Difficulty } from '@/types';

interface CatalogPageProps {
  experiments: Experiment[];
  onSelectExperiment: (experiment: Experiment) => void;
  onBackToHome: () => void;
}

export default function CatalogPage({ experiments, onSelectExperiment, onBackToHome }: CatalogPageProps) {
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('easy');

  const difficultyConfig = {
    easy: {
      label: 'EZ',
      name: '简单',
      color: '#4ade80',
      bgColor: 'bg-green-500',
      textColor: 'text-green-400',
      borderColor: 'border-green-500',
      glowColor: 'shadow-green-500/50',
    },
    medium: {
      label: 'NM',
      name: '中等',
      color: '#fbbf24',
      bgColor: 'bg-amber-500',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500',
      glowColor: 'shadow-amber-500/50',
    },
    hard: {
      label: 'HD',
      name: '困难',
      color: '#f87171',
      bgColor: 'bg-red-500',
      textColor: 'text-red-400',
      borderColor: 'border-red-500',
      glowColor: 'shadow-red-500/50',
    },
  };

  const toggleDifficulty = () => {
    if (currentDifficulty === 'easy') {
      setCurrentDifficulty('medium');
    } else if (currentDifficulty === 'medium') {
      setCurrentDifficulty('hard');
    } else {
      setCurrentDifficulty('easy');
    }
  };

  const getExperimentsByDifficulty = (difficulty: Difficulty) => {
    return experiments.filter(exp => exp.difficulty === difficulty);
  };

  const getCardOpacity = (difficulty: Difficulty) => {
    if (difficulty === currentDifficulty) {
      return 'opacity-100';
    }
    return 'opacity-40';
  };

  const currentConfig = difficultyConfig[currentDifficulty];

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#1a1a2e] border-b border-white/10">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>返回首页</span>
        </button>
        <h1 className="text-xl font-semibold text-white">实验目录</h1>
        <div className="w-20" />
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-400 text-center mb-8">选择要进行的实验</p>

          {/* Three difficulty sections */}
          <div className="space-y-8">
            {/* Easy experiments */}
            <section className={`transition-all duration-500 ${getCardOpacity('easy')}`}>
              <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${difficultyConfig.easy.textColor}`}>
                <span className="w-3 h-3 rounded-full bg-green-500" />
                简单难度实验
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getExperimentsByDifficulty('easy').map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => onSelectExperiment(exp)}
                    className="group bg-[#1a1a2e] rounded-xl p-5 border border-white/10 cursor-pointer transition-all duration-300 hover:border-green-500/50 hover:bg-[#252540]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Beaker className="text-green-400" size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                            简单
                          </span>
                          <span className="text-xs text-gray-500">实验{exp.id}</span>
                        </div>
                        <h3 className="font-medium text-white mb-1 line-clamp-1">{exp.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Medium experiments */}
            <section className={`transition-all duration-500 ${getCardOpacity('medium')}`}>
              <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${difficultyConfig.medium.textColor}`}>
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                中等难度实验
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getExperimentsByDifficulty('medium').map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => onSelectExperiment(exp)}
                    className="group bg-[#1a1a2e] rounded-xl p-5 border border-white/10 cursor-pointer transition-all duration-300 hover:border-amber-500/50 hover:bg-[#252540]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Beaker className="text-amber-400" size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                            中等
                          </span>
                          <span className="text-xs text-gray-500">实验{exp.id}</span>
                        </div>
                        <h3 className="font-medium text-white mb-1 line-clamp-1">{exp.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Hard experiments */}
            <section className={`transition-all duration-500 ${getCardOpacity('hard')}`}>
              <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${difficultyConfig.hard.textColor}`}>
                <span className="w-3 h-3 rounded-full bg-red-500" />
                困难难度实验
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getExperimentsByDifficulty('hard').map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => onSelectExperiment(exp)}
                    className="group bg-[#1a1a2e] rounded-xl p-5 border border-white/10 cursor-pointer transition-all duration-300 hover:border-red-500/50 hover:bg-[#252540]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <Beaker className="text-red-400" size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                            困难
                          </span>
                          <span className="text-xs text-gray-500">实验{exp.id}</span>
                        </div>
                        <h3 className="font-medium text-white mb-1 line-clamp-1">{exp.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Difficulty toggle button - Fixed at bottom right */}
      <button
        onClick={toggleDifficulty}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full ${currentConfig.bgColor} text-white font-bold text-lg shadow-lg transition-all duration-300 hover:scale-110 z-50`}
        style={{
          boxShadow: `0 0 20px ${currentConfig.color}, 0 0 40px ${currentConfig.color}80`,
        }}
      >
        {currentConfig.label}
      </button>
    </div>
  );
}
