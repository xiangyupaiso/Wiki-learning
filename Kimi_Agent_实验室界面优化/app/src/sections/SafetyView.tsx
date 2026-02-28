import { Shield, AlertTriangle } from 'lucide-react';
import type { Experiment } from '@/types';

interface SafetyViewProps {
  experiment: Experiment;
}

export default function SafetyView({ experiment }: SafetyViewProps) {
  return (
    <div className="flex-1 bg-[#2a2a3e] p-8 overflow-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Shield size={32} className="text-red-400" />
        <h2 className="text-2xl font-bold text-white">实验室安全</h2>
      </div>

      {/* Warning banner */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8 flex items-center gap-3">
        <AlertTriangle size={24} className="text-red-400 flex-shrink-0" />
        <p className="text-red-300">
          进行实验前，请务必仔细阅读并遵守以下安全注意事项
        </p>
      </div>

      {/* Safety items list */}
      <div className="space-y-4">
        {experiment.safety.map((item, index) => (
          <div
            key={item.id}
            className="bg-[#1a1a2e] rounded-xl p-5 flex items-start gap-4 border border-white/5 hover:border-red-500/30 transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold flex-shrink-0">
              {index + 1}
            </span>
            <p className="text-gray-300 leading-relaxed pt-1">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Footer reminder */}
      <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
        <p className="text-amber-400 text-center text-sm">
          安全第一，规范操作。如有疑问，请及时咨询指导老师。
        </p>
      </div>
    </div>
  );
}
