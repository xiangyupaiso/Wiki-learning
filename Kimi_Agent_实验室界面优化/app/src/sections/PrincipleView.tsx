import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import type { Experiment } from '@/types';

interface PrincipleViewProps {
  experiment: Experiment;
}

export default function PrincipleView({ experiment }: PrincipleViewProps) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});

  const toggleShowAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (!showAnswers) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: optionIndex,
      }));
    }
  };

  const getOptionStyle = (questionId: number, optionIndex: number, correctIndex: number) => {
    if (showAnswers) {
      // Show correct answer
      if (optionIndex === correctIndex) {
        return 'border-green-500 bg-green-500/20 text-green-400';
      }
      // Show wrong answer if selected
      if (selectedAnswers[questionId] === optionIndex && optionIndex !== correctIndex) {
        return 'border-red-500 bg-red-500/20 text-red-400';
      }
      return 'border-gray-600 bg-[#1a1a2e] text-gray-400';
    }

    // Normal selection mode
    if (selectedAnswers[questionId] === optionIndex) {
      return 'border-blue-500 bg-blue-500/20 text-blue-400';
    }
    return 'border-gray-600 bg-[#1a1a2e] text-gray-300 hover:border-gray-500';
  };

  return (
    <div className="flex-1 bg-[#2a2a3e] p-8 overflow-auto">
      {/* Header with lightbulb */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">实验原理</h2>
        <button
          onClick={toggleShowAnswers}
          className={`p-3 rounded-full transition-all duration-300 ${
            showAnswers
              ? 'bg-amber-500/20 bulb-glow'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          <Lightbulb
            size={28}
            className={showAnswers ? 'text-amber-400' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* Principle content */}
      <div className="bg-[#1a1a2e] rounded-xl p-6 mb-8">
        <p className="text-gray-300 leading-relaxed text-lg">
          {experiment.principles.content}
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">思考题</h3>
        {experiment.principles.questions.map((question, index) => (
          <div key={question.id} className="bg-[#1a1a2e] rounded-xl p-6 border border-amber-500/30">
            <div className="flex items-start gap-3 mb-4">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm flex-shrink-0">
                {index + 1}
              </span>
              <p className="text-white text-lg">{question.question}</p>
            </div>
            <div className="space-y-3 ml-9">
              {question.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleSelectAnswer(question.id, optionIndex)}
                  disabled={showAnswers}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                    getOptionStyle(question.id, optionIndex, question.correctIndex)
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      showAnswers && optionIndex === question.correctIndex
                        ? 'border-green-500 bg-green-500'
                        : showAnswers && selectedAnswers[question.id] === optionIndex && optionIndex !== question.correctIndex
                        ? 'border-red-500 bg-red-500'
                        : selectedAnswers[question.id] === optionIndex
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-500'
                    }`}>
                      {(showAnswers && optionIndex === question.correctIndex) ||
                       selectedAnswers[question.id] === optionIndex ? (
                        <span className="text-white text-xs">
                          {showAnswers && optionIndex === question.correctIndex ? '✓' : '●'}
                        </span>
                      ) : null}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hint text */}
      {!showAnswers && (
        <p className="text-gray-500 text-center mt-6 text-sm">
          点击灯泡图标查看正确答案
        </p>
      )}
    </div>
  );
}
