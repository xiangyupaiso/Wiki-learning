import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Home, Info, ChevronLeft, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { allExperiments } from '@/data/experiments';
import { StepIndicator } from '@/components/StepIndicator';
import { InfoPanel } from '@/components/InfoPanel';
import gsap from 'gsap';
interface ExperimentPageProps {
  experimentId: string;
  onBack: () => void;
  onHome: () => void;
}
export function ExperimentPage({ experimentId, onBack, onHome }: ExperimentPageProps) {
  const experiment = useMemo(() => 
    allExperiments.find(e => e.id === experimentId) || allExperiments[0],
  [experimentId]);

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showInfo, setShowInfo] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBacteria, setShowBacteria] = useState(false);
  const [showStainEffect, setShowStainEffect] = useState<string | null>(null);

  // 🚀 找回来的调试工具：点击画布精准获取百分比坐标
  useEffect(() => {
    const handleDebugClick = (e: MouseEvent) => {
      const stage = document.getElementById('experiment-canvas');
      if (!stage) return;
      
      const rect = stage.getBoundingClientRect();
      // 计算相对于 16:9 画布内部的百分比
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // 同时帮你算一下当前屏幕下 100px 对应多少宽度百分比
      const w100 = (100 / rect.width) * 100;

      console.log(`--- 坐标调试 ---`);
      console.log(`位置: left-[${x.toFixed(1)}%] top-[${y.toFixed(1)}%]`);
      console.log(`参考: 100px 宽度对应 w-[${w100.toFixed(1)}%]`);
    };

    window.addEventListener('click', handleDebugClick);
    return () => window.removeEventListener('click', handleDebugClick);
  }, []);

  const executeStepAnimation = useCallback((stepIndex: number) => {
    if (isAnimating) return;
    const step = experiment.steps[stepIndex];
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setCompletedSteps(prev => [...prev, stepIndex]);
        setCurrentStep(stepIndex + 1);
      }
    });

    if (experiment.id === 'exp2') {
      if (step.id === 1) {
        tl.to("#petri-dish", { left: "50%", top: "50%", xPercent: -50, yPercent: -50, scale: 1.2, duration: 1.2, ease: "power2.inOut" })
          .call(() => setShowBacteria(true));
      } else {
        tl.to({}, { duration: 1 });
      }
    }
  }, [experiment, isAnimating]);

  const currentStepData = experiment.steps[currentStep];
  const isCompleted = currentStep >= experiment.steps.length;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-950 text-white font-sans">
      {/* 顶部导航 */}
      <header className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <ChevronLeft className="cursor-pointer hover:text-blue-400" onClick={onBack} />
          <h1 className="font-bold text-xs text-blue-400 uppercase tracking-widest">{experiment.title}</h1>
        </div>
        <div className="flex gap-3 text-slate-400">
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(!showInfo)} className={`h-8 text-[10px] ${showInfo ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800'}`}>
             {showInfo ? '隐藏面板' : '实验信息'}
          </Button>
          <Home className="w-5 h-5 cursor-pointer hover:text-white" onClick={onHome} />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* 左侧边栏 - shrink-0 防止挤压 */}
        <aside className="hidden lg:flex flex-col w-64 p-3 border-r border-slate-800 bg-slate-900/50 shrink-0 overflow-y-auto">
          {currentStepData && !isCompleted && (
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-3 mb-4 shrink-0">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Lightbulb className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">STEP {currentStep + 1}</span>
              </div>
              <h3 className="text-xs font-bold mb-1">{currentStepData.title}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">{currentStepData.description}</p>
            </div>
          )}
          <StepIndicator steps={experiment.steps} currentStep={currentStep} completedSteps={completedSteps} onStepClick={() => {}} />
        </aside>

        {/* 🚀 中央实验区 - min-w-0 是防挤压的关键 */}
        <main className="flex-1 bg-black flex items-center justify-center p-4 relative overflow-hidden min-w-0">
          
          {/* 🚀 核心画布 - 锁定比例 & 响应式适配 */}
          <div 
            id="experiment-canvas"
            className="relative aspect-video w-full h-full max-w-full max-h-full shadow-2xl bg-[#1e293b] overflow-hidden"
          >
            {/* 1. 背景底层 */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/background_blue.jpg')" }} />

            {/* 2. 背景设备层 */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
              <div className="absolute left-[8%] top-[18%] w-[18%] h-[15%] bg-contain bg-no-repeat" style={{ backgroundImage: "url('/images/pool.png')" }} />
              <div className="absolute left-[50%] -translate-x-1/2 top-[15%] w-[45%] h-[18%] bg-contain bg-no-repeat" style={{ backgroundImage: "url('/images/blue_table.png')" }} />
              <div className="absolute left-[75%] top-[16%] w-[25%] h-[18%] bg-contain bg-no-repeat" style={{ backgroundImage: "url('/images/table_normal.png')" }} />
              <img src="/images/experiment2/13.png" className="absolute left-[42%] top-[14%] w-[6%]" />
              <img src="/images/experiment2/15.png" className="absolute left-[78%] top-[10%] w-[9%]" />
            </div>

            {/* 3. 中景：超净台 */}
            <div className="absolute inset-x-0 bottom-0 h-[68%] bg-[length:100%_100%] bg-bottom bg-no-repeat z-10" style={{ backgroundImage: "url('/images/Cleanbench_part.png')" }} />

            {/* 4. 前景：器材 (全部使用 % 宽度实现同步缩放) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <img id="pipette" src="/images/pipette.png" className="absolute left-[10%] top-[60%] w-[7%] pointer-events-auto cursor-pointer hover:scale-110 transition-transform" />
                
                <div 
                  id="petri-dish"
                  onClick={() => { if(currentStepData?.highlightItems.includes('petri-dish')) executeStepAnimation(currentStep); }}
                  className={`absolute left-[35%] top-[65%] w-[12%] pointer-events-auto cursor-pointer transition-all
                    ${currentStepData?.highlightItems.includes('petri-dish') ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)]' : ''}
                  `}
                >
                  <img src="/images/experiment2/1.png" className="w-full" />
                  {showBacteria && <div className="absolute inset-0 bg-yellow-200/20 rounded-full animate-pulse blur-sm" />}
                </div>

                <img src="/images/experiment2/6.png" className="absolute left-[48%] top-[68%] w-[7%] pointer-events-auto" />
                
                {/* 滴瓶组 */}
                <div className="absolute left-[58%] top-[65%] flex gap-[1%] w-[20%] pointer-events-auto">
                   {[8, 9, 10, 11].map(n => (
                     <img key={n} src={`/images/experiment2/${n}.png`} className="w-[20%] cursor-pointer hover:-translate-y-2 transition-transform" />
                   ))}
                </div>

                <img src="/images/experiment2/7.png" className="absolute left-[68%] top-[77%] w-[8%] pointer-events-auto" />
                <img src="/images/experiment2/12.png" className="absolute left-[82%] top-[65%] w-[8%]" />
                <img src="/images/experiment2/2.png" className="absolute left-[20%] top-[68%] w-[8%]" />
                <div className="absolute left-[15%] top-[74%] w-[10%]">
                   <img src="/images/experiment2/3.png" className="w-full" />
                   <img src="/images/experiment2/4.png" className="absolute top-[20%] left-[20%] w-[60%] -rotate-12" />
                    <img src="/images/experiment2/5.png" className="absolute top-[20%] left-[33%] w-[50%] -rotate-12" />
                </div>
            </div>

            {/* 完成蒙层 */}
            {isCompleted && (
              <div className="absolute inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6 text-center animate-in zoom-in">
                <div className="max-w-xs">
                  <h2 className="text-2xl font-black mb-4 text-emerald-400">实验完成!</h2>
                  <div className="flex gap-2">
                    <Button onClick={() => window.location.reload()} className="flex-1 bg-blue-600 hover:bg-blue-700">重做</Button>
                    <Button onClick={onBack} variant="outline" className="flex-1 border-slate-700">返回目录</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* 🚀 右侧边栏 - shrink-0 防止挤压 */}
        {showInfo && (
          <aside className="hidden xl:flex flex-col w-80 p-3 border-l border-slate-800 bg-slate-900/50 shrink-0 overflow-y-auto">
            <InfoPanel onClose={() => setShowInfo(false)} />
          </aside>
        )}
      </div>

      {/* 手机强制横屏提示 */}
      <div className="fixed inset-0 z-[2000] bg-slate-950 flex flex-col items-center justify-center lg:hidden portrait:flex hidden px-8 text-center text-white">
        <div className="w-16 h-16 mb-4 animate-bounce">🔄</div>
        <h2 className="text-xl font-bold mb-1">请横屏进行实验</h2>
        <p className="text-slate-500 text-xs">检测到竖屏模式，横过手机以获得最佳视野</p>
      </div>
    </div>
  );
}