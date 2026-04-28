// src/pages/ExperimentPage1.tsx
import { ChevronLeft, Home } from 'lucide-react';

interface ExperimentPageProps {
  onBack: () => void;
  onHome: () => void;
}

export function ExperimentPage({ onBack, onHome }: ExperimentPageProps) {
  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-white">
      {/* 顶部栏 */}
      <header className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <ChevronLeft className="cursor-pointer hover:text-blue-400" onClick={onBack} />
          <h1 className="font-bold text-xs text-blue-400 uppercase tracking-widest">实验1 - 占位</h1>
        </div>
        <Home className="w-5 h-5 cursor-pointer hover:text-white" onClick={onHome} />
      </header>

      {/* 主要内容区 */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
            <span className="text-4xl">🧪</span>
          </div>
          <h2 className="text-2xl font-bold">实验1</h2>
          <p className="text-slate-400 max-w-md">这里是实验1的占位内容，后续替换为实际实验逻辑</p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            返回目录
          </button>
        </div>
      </div>
    </div>
  );
}