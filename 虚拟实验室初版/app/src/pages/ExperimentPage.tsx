import { useState, useCallback, useMemo, useEffect } from 'react';
import { Home, Info, ChevronLeft, Lightbulb, X } from 'lucide-react';
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
  const [isSlidePrepared, setIsSlidePrepared] = useState(false);
  const [showColonyDetail, setShowColonyDetail] = useState(false);
  const [isDropperMoving, setIsDropperMoving] = useState(false);
  // 步骤三增强状态
  const [isDropperUsed, setIsDropperUsed] = useState(false);       // 标记图22是否出现
  const [isDropperInserted, setIsDropperInserted] = useState(false); // 标记滴管是否已移入瓶子(变图23)
  const [waitingForLampClick, setWaitingForLampClick] = useState(false);
  // 在 ExperimentPage 组件顶部，与其他 useState 一起添加
const [lampClickable, setLampClickable] = useState(false);   // 控制酒精灯(图6)是否高亮可点
const [item3Clickable, setItem3Clickable] = useState(false); // 控制图3是否高亮可点
const [lampLit, setLampLit] = useState(false);      // 酒精灯是否已点燃（控制图片26.png）
const [coolingMessage, setCoolingMessage] = useState(''); // 冷却提示文字
const [loopClickable, setLoopClickable] = useState(false); // 接种环是否高亮可点
  // 坐标调试工具
  useEffect(() => {
    const handleDebugClick = (e: MouseEvent) => {
      const stage = document.getElementById('experiment-canvas');
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      console.log(`Debug坐标: left-[${x.toFixed(1)}%] top-[${y.toFixed(1)}%]`);
    };
    window.addEventListener('click', handleDebugClick);
    return () => window.removeEventListener('click', handleDebugClick);
  }, []);

  const executeStepAnimation = useCallback((stepIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        // 步骤1和步骤2、3的特定阶段不自动进入下一步，由交互触发
        if (experiment.id === 'exp2' && (stepIndex === 1 || stepIndex === 2)) return;
        
        setIsAnimating(false);
        setCompletedSteps(prev => [...prev, stepIndex]);
        setCurrentStep(stepIndex + 1);
      }
    });

    if (experiment.id === 'exp2') {
      if (stepIndex === 0) {
        tl.to("#petri-dish", { 
          left: "50%", top: "60%", xPercent: -50, yPercent: -50, 
          scale: 1.2, duration: 1.2, ease: "power2.inOut" 
        }).call(() => setShowBacteria(true));

      } else if (stepIndex === 2) {
        // 步骤三第一阶段：镊子移动
        tl.to("#tweezers", {
          left: "24.5%", top: "62.5%", rotation: 20, duration: 1, ease: "back.out(1.2)"
        }).call(() => {
          setIsSlidePrepared(true);
          setIsAnimating(false);
        });
      }
    }
  }, [experiment, isAnimating]);

 const handleItemClick = useCallback((itemId: string) => {
  if (isAnimating) return;

  // 步骤二：点击培养皿打开详情（exp2专用）
  if (experiment.id === 'exp2' && currentStep === 1 && itemId === 'petri-dish') {
    setShowColonyDetail(true);
    return;
  }

  // 步骤三：分阶段交互（exp2专用）
  if (experiment.id === 'exp2' && currentStep === 2) {
    // 1. 点击载玻片
    if (itemId === 'item-2' && !isSlidePrepared) {
      executeStepAnimation(2);
      return;
    }
    // 2. 点击底座滴管（图7）
    if (itemId === 'item-7' && currentStep === 2 && !completedSteps.includes(2) && isSlidePrepared && !isDropperUsed) {
  setIsDropperUsed(true);
  return;
}
    // 3. 点击悬浮滴管（图22）-> 移动到瓶子变成图23
    if (itemId === 'item-22' && isDropperUsed && !isDropperInserted && !isDropperMoving && !completedSteps.includes(2)) {
      setIsAnimating(true);
      gsap.to("#item-22", {
        left: "82.2%",
        top: "58.5%",
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setIsDropperInserted(true);
          setIsAnimating(false);
        }
      });
      return;
    }
    // 4. 点击图23（已插入的滴管）-> 移动到中央变成图25，同时移动镊子
    if (itemId === 'item-22' && isDropperUsed && isDropperInserted && !isDropperMoving && !completedSteps.includes(2)) {
  setIsDropperMoving(true);
  setIsAnimating(true);
  
  // 强制清除滴管的所有transform和缩放样式，确保从原始大小开始移动
  gsap.set("#item-22", { clearProps: "transform,scale" });
  // 移除可能残留的高亮类
  const dropperElem = document.querySelector("#item-22");
  if (dropperElem) dropperElem.classList.remove("scale-110", "drop-shadow-[0_0_30px_#ffcc00]");
  
  const tl = gsap.timeline({
  onComplete: () => {
  setIsDropperMoving(false);
  setIsAnimating(false);
  setCompletedSteps(prev => [...prev, 2]);
  setLampClickable(true);   // 滴管操作完成，高亮酒精灯，等待点击
}
});
  
  // 只改变位置，不改变宽高和缩放
  tl.to("#item-22", {
    left: "35.8%",
    top: "79%",
    xPercent: -50,
    yPercent: -50,
    duration: 0.5,
    ease: "linear",  // 最简单的线性移动
    onUpdate: () => {
      const img = document.querySelector("#item-22") as HTMLImageElement;
      if (img && img.src && !img.src.includes("25.png")) {
        img.src = "/images/experiment2/25.png";
      }
    }
  }, 0)
  .to("#tweezers", {
    left: "35%",
    top: "82%",
    xPercent: -50,
    yPercent: -50,
    duration: 0.5,
    ease: "linear"
  }, 0);
  
  return;
}

    if (itemId === 'item-6') {
  if (!lampClickable || isAnimating) return;   // 必须高亮且未动画中
  setLampClickable(false);                     // 取消高亮，防止重复点
  setLampLit(true);                            // 切换到点燃图片
  setIsAnimating(true);

  // 获取接种环元素
  const loop = document.querySelector("#item-5");
  if (!loop) {
    setIsAnimating(false);
    return;
  }

  // 1. 移动接种环到酒精灯火焰上方（假设火焰位置在(54%,62%)，接种环原位置在(19%,82%)）
  const startX = "13%";
  const startY = "82%";
  const flameX = "50%";
  const flameY = "62%";

  const tl = gsap.timeline({
    onComplete: () => {
      // 左右移动三次（每次0.3秒，左右偏移10%）
      gsap.to(loop, {
        xPercent: -100, duration: 0.2, repeat: 5, yoyo: true,
        ease: "power1.inOut",
        onComplete: () => {
          // 最后静止到酒精灯旁边（比如酒精灯右侧偏下）
          gsap.to(loop, {
            left: "55%", top: "65%", duration: 0.5,
            ease: "back.out(1)",
            onComplete: () => {
              setIsAnimating(false);
              // 显示冷却提示文字
              setCoolingMessage("冷却数秒");
              setLoopClickable(true); // 接种环操作完成，高亮，等待点击
              // 可选：5秒后自动隐藏文字
               setTimeout(() => setCoolingMessage(''), 2000);
               gsap.set(loop, { clearProps: "transform" });
               setLoopClickable(true);
            }
          });
        }
      });
    }
  });

  // 先移动接种环到火焰位置
  tl.to(loop, {
    left: flameX, top: flameY, duration: 0.6,
    ease: "power2.inOut"
  }, 0);
  
  return;
}
if (itemId === 'item-5') {
  if (!loopClickable || isAnimating) return; // 必须高亮且未动画中
  setLoopClickable(false);
  setCoolingMessage(''); // 清除冷却提示

  setIsAnimating(true);

  // 1. 替换镊子图片为 27.png
  const tweezers = document.querySelector("#tweezers") as HTMLImageElement;
  if (tweezers) tweezers.src = "/images/experiment2/27.png";

  // 2. 删除滴管图片 25.png（隐藏 item-22）
  const dropper = document.querySelector("#item-22") as HTMLImageElement;
  if (dropper) dropper.style.display = "none";

  // 3. 接种环移动到培养皿并划线
  const loop = document.querySelector("#item-5") as HTMLImageElement;
  const dish = document.querySelector("#petri-dish") as HTMLElement;
  if (!loop || !dish) {
    setIsAnimating(false);
    return;
  }

  // 获取培养皿的中心位置（百分比）
  const dishLeft = 37; // %，根据实际布局调整
  const dishTop = 63;  // %
  // 接种环移动到培养皿上方稍微偏下（模拟接触琼脂面）
  const loopOnDishLeft = dishLeft + 5;  // 偏移几个百分点，让接种环位于培养皿中央偏左
  const loopOnDishTop = dishTop + 2;

  // 动画序列
  const tl = gsap.timeline({
    onComplete: () => {
      // 在培养皿上左右轻移三次（模拟划线）
      gsap.to(loop, {
        xPercent: -30, duration: 0.2, repeat: 5, yoyo: true,
        ease: "power1.inOut",
        onComplete: () => {
          // 移回中央或停在培养皿中心
          gsap.to(loop, {
            left: `${loopOnDishLeft}%`, top: `${loopOnDishTop}%`,
            xPercent: -50, yPercent: -50,
            duration: 0.3,
            onComplete: () => {
              setIsAnimating(false);
              // 标记步骤二完成，允许进入完成界面或下一步
              setCompletedSteps(prev => [...prev, 2]);
              setLoopClickable(true);
              // 如果需要自动进入下一步，可以加上：
              // setCurrentStep(3);
              // 如果希望显示“实验完成”提示，可以设置一个完成状态变量
            }
          });
        }
      });
    }
  });

  // 先移动接种环到培养皿中心（视觉上覆盖培养皿）
  tl.to(loop, {
    left: `${loopOnDishLeft}%`, top: `${loopOnDishTop}%`,
    xPercent: -50, yPercent: -50,
    duration: 0.6,
    ease: "power2.inOut"
  }, 0);
  return;
}
    return;
  }

  // 常规步骤检测
  const currentStepData = experiment.steps[currentStep];
  if (currentStepData?.highlightItems.includes(itemId)) {
    executeStepAnimation(currentStep);
  }
}, [experiment, currentStep, isAnimating, executeStepAnimation, isSlidePrepared, isDropperUsed, isDropperInserted, isDropperMoving, setShowColonyDetail, setCompletedSteps, setCurrentStep]);

  const currentStepData = experiment.steps[currentStep];
  const isCompleted = currentStep >= experiment.steps.length;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-950 text-white font-sans">
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

        <main className="flex-1 bg-black flex items-center justify-center p-4 relative overflow-hidden min-w-0">
          <div id="experiment-canvas" className="relative aspect-video w-full h-full max-w-full max-h-full shadow-2xl bg-[#1e293b] overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/background_blue.jpg')" }} />

            {/* 后景层 */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
              <img src="/images/pool.png" className="absolute left-[8%] top-[18%] w-[18%] pointer-events-auto" />
              <img src="/images/blue_table.png" className="absolute left-[50%] top-[18%] -translate-x-1/2 w-[35%] pointer-events-auto" />
              <img src="/images/table_normal.png" className="absolute left-[72%] top-[16%] w-[25%] pointer-events-auto" />
              <img src="/images/experiment2/13.png" className="absolute left-[42%] top-[17.5%] w-[6.5%] z-10 pointer-events-auto" alt="培养箱" />
              <img src="/images/experiment2/15.png" className="absolute left-[78%] top-[12%] w-[9.5%] z-10 pointer-events-auto" alt="显微镜" />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-[68%] bg-[length:100%_100%] bg-bottom bg-no-repeat z-10 pointer-events-none" style={{ backgroundImage: "url('/images/Cleanbench_part.png')" }} />

            {/* 器材层 */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <img id="pipette" src="/images/experiment2/24.png" className="absolute left-[6.5%] top-[47%] w-[11%] pointer-events-auto cursor-pointer hover:scale-110 transition-transform" />

                {/* 培养皿 */}
                <div id="petri-dish" onClick={() => handleItemClick('petri-dish')}
                  className={`absolute left-[35%] top-[65%] w-[12%] pointer-events-auto cursor-pointer
                    ${currentStep < 2 ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] z-30 transition-all' : 'z-20'}
                  `}>
                  <img src="/images/experiment2/18.png" className="w-full" />
                  {showBacteria && currentStep < 2 && (
                    <div className="absolute inset-0 bg-yellow-200/20 rounded-full animate-pulse blur-md pointer-events-none" />
                  )}
                </div>

                {/* 载玻片 */}
                <img id="item-2"
                  src={isSlidePrepared ? "/images/experiment2/19.png" : "/images/experiment2/2.png"} 
                  onClick={() => handleItemClick('item-2')}
                  className={`absolute left-[20%] top-[68%] w-[8%] pointer-events-auto cursor-pointer transition-all
                    ${(currentStep === 2 && !isSlidePrepared) ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.9)] z-30 scale-110' : 'z-20'}
                  `} 
                />

                {/* 镊子 */}
                <img id="tweezers"
                  src={isSlidePrepared ? "/images/experiment2/20.png" : "/images/experiment2/4.png"} 
                  className={`absolute pointer-events-auto z-40 transition-all
                    ${isSlidePrepared ? 'left-[18%] top-[65%] w-[11%] rotate-0' : 'left-[17.5%] top-[83%] w-[5%] -rotate-12'}
                  `}
                  style={{ transformOrigin: 'bottom left' }}
                />

                {/* 静态器材：找回 3, 5, 6, 8-11 */}
               <img 
  id="item-3" 
  src="/images/experiment2/3.png" 
  className={`absolute left-[15%] top-[79%] w-[10%] pointer-events-auto cursor-pointer transition-all
   
  `}
  onClick={() => handleItemClick('item-3')}
/>
{/* 接种环 - 图片5 */}
<img 
  id="item-5" 
  src="/images/experiment2/5.png" 
  className={`absolute left-[19%] top-[82%] w-[4%] -rotate-12 pointer-events-auto cursor-pointer transition-all z-30
    ${loopClickable ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.9)] scale-110' : ''}
  `}
  onClick={() => handleItemClick('item-5')}
/>
              <img 
  id="item-6" 
  src={lampLit ? "/images/experiment2/26.png" : "/images/experiment2/6.png"} 
  className={`absolute left-[48%] top-[68%] w-[7%] pointer-events-auto cursor-pointer transition-all
    ${(experiment.id === 'exp2' && lampClickable) 
      ? 'drop-shadow-[0_0_30px_#ffcc00] z-40 scale-110' 
      : 'z-20'
    }
  `}
  onClick={() => handleItemClick('item-6')}
/>
                <div className="absolute left-[58%] top-[65%] flex gap-[1%] w-[20%]">
                   {[8, 9, 10, 11].map(n => (
                     <img key={n} src={`/images/experiment2/${n}.png`} className="w-[20%]" />
                   ))}
                </div>

                {/* 滴管底座 (图7) */}
                <img id="item-7"
                  src={isDropperUsed ? "/images/experiment2/21.png" : "/images/experiment2/7.png"} 
                  className={`absolute left-[68%] top-[77%] w-[5%] pointer-events-auto transition-all
                    ${(isSlidePrepared && !isDropperUsed && currentStep === 2) ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.9)] z-30 scale-110 cursor-pointer' : 'z-20'}
                  `}
                  onClick={() => handleItemClick('item-7')}
                />

                {/* 试剂瓶 (图12) */}
                {/* 找到 id="item-12" 的 img 标签 */}
<img 
  id="item-12" 
  src="/images/experiment2/12.png" 
  className="absolute left-[82%] top-[65%] w-[8%] pointer-events-auto z-20" // 去掉高亮判断，回归普通层级
/>
             {/* 悬浮滴管 (图22 -> 23) */}
{isDropperUsed && (
  <img 
    id="item-22"
    src={isDropperInserted ? "/images/experiment2/23.png" : "/images/experiment2/22.png"} 
    className={`absolute left-[78%] top-[52%] w-[7%] pointer-events-auto transition-all
      ${(currentStep === 2 && isDropperUsed) 
        ? 'drop-shadow-[0_0_30px_#ffcc00] z-[100] cursor-pointer scale-110' 
        : 'z-20'
      }
    `}
    onClick={() => handleItemClick('item-22')}
  />
)}
            </div>
{coolingMessage && (
  <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-4 py-2 rounded-full text-sm animate-fade-in pointer-events-none">
    {coolingMessage}
  </div>
)}
            {/* 观察菌落详情 */}
            {showColonyDetail && (
              <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-auto">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" 
                  onClick={() => {
                    setShowColonyDetail(false);
                    setCompletedSteps(prev => [...prev, 1]); 
                    setCurrentStep(2); 
                    gsap.to("#petri-dish", {
                      left: "35%", top: "65%", xPercent: 0, yPercent: 0, 
                      scale: 1, duration: 0.5, ease: "power2.out"
                    });
                  }}
                />
                <div className="relative flex flex-col md:flex-row items-center gap-8 bg-slate-900/90 p-8 rounded-3xl border border-white/20 shadow-2xl animate-in zoom-in duration-300">
                  <div className="space-y-2 text-center">
                    <img src="/images/experiment2/16.png" className="w-[280px] rounded-xl border-2 border-white/30 shadow-2xl" alt="菌落分布" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">放大观察视图</p>
                  </div>
                  <div className="flex flex-col gap-4 max-w-[240px]">
                    <div className="border-l-4 border-blue-500 pl-4 space-y-3">
                      <h4 className="text-blue-400 font-bold text-lg">菌落形态特征</h4>
                      <div className="text-sm space-y-1 text-slate-300">
                        <p>● 大小：中等偏小</p>
                        <p>● 颜色：乳白色</p>
                        <p>● 边缘：整齐光滑</p>
                        <p>● 表面：湿润、有光泽</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-blue-400/60 animate-pulse mt-4">点击灰色背景返回并进入第三步...</p>
                  </div>
                </div>
              </div>
            )}

            {/* 完成界面 */}
            {isCompleted && (
              <div className="absolute inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-6 text-center animate-in fade-in">
                <div className="max-w-xs">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl">✓</div>
                  </div>
                  <h2 className="text-3xl font-black mb-6 text-white tracking-tight">实验圆满完成</h2>
                  <div className="flex gap-3">
                    <Button onClick={() => window.location.reload()} className="flex-1 bg-blue-600">再次尝试</Button>
                    <Button onClick={onBack} variant="outline" className="flex-1">返回</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {showInfo && (
          <aside className="hidden xl:flex flex-col w-80 p-3 border-l border-slate-800 bg-slate-900/50 shrink-0 overflow-y-auto">
            <InfoPanel onClose={() => setShowInfo(false)} />
          </aside>
        )}
      </div>

      {/* 横屏提示 */}
      <div className="fixed inset-0 z-[2000] bg-slate-950 flex flex-col items-center justify-center lg:hidden portrait:flex hidden px-8 text-center text-white">
        <div className="w-16 h-16 mb-4 animate-bounce text-4xl">🔄</div>
        <h2 className="text-xl font-bold">请横屏进行实验</h2>
      </div>
    </div>
  );
}