import { Check } from 'lucide-react';
import type { ExperimentStep } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StepIndicatorProps {
  steps: ExperimentStep[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (stepIndex: number) => void;
}

export function StepIndicator({ 
  steps, 
  currentStep, 
  completedSteps,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="h-full bg-card/80 backdrop-blur-sm border border-border rounded-lg p-2.5 flex flex-col">
      <h3 className="font-semibold text-xs mb-2 flex items-center gap-2 shrink-0">
        <span className="w-5 h-5 rounded-md bg-primary/20 flex items-center justify-center text-[10px] text-primary">
          {currentStep + 1}
        </span>
        <span className="text-foreground/90">实验步骤</span>
      </h3>
      
      <ScrollArea className="flex-1 -mx-1">
        <div className="space-y-1 px-1">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = index === currentStep;
            const isPending = index > currentStep;
            
            return (
              <div
                key={step.id}
                onClick={() => onStepClick?.(index)}
                className={`
                  flex items-center gap-2 p-1.5 rounded-md transition-all duration-200
                  ${onStepClick ? 'cursor-pointer' : 'cursor-default'}
                  ${isActive ? 'bg-primary/20 border border-primary/40' : ''}
                  ${isCompleted ? 'bg-green-500/10 border border-green-500/30' : ''}
                  ${isPending ? 'bg-secondary/30 opacity-50' : 'hover:bg-secondary/50'}
                  border border-transparent
                `}
              >
                <div className={`
                  w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${isActive ? 'bg-primary text-white animate-pulse' : ''}
                  ${isPending ? 'bg-secondary text-muted-foreground' : ''}
                `}>
                  {isCompleted ? (
                    <Check className="w-2.5 h-2.5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`
                    text-[11px] font-medium truncate
                    ${isActive ? 'text-primary' : ''}
                    ${isPending ? 'text-muted-foreground' : ''}
                  `}>
                    {step.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      
      {/* 进度条 */}
      <div className="mt-2 pt-2 border-t border-border shrink-0">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
          <span>总体进度</span>
          <span>{Math.round((completedSteps.length / steps.length) * 100)}%</span>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
