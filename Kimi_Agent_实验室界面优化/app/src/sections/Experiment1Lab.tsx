import { useState } from 'react';

interface Experiment1LabProps {
  currentStep: number;
  onStepComplete: () => void;
}

// 实验器材位置配置
const equipmentPositions: Record<number, { id: string; name: string; left: string; top: string; width: string; height: string }> = {
  1: { id: 'freezer', name: '-80℃冰箱', left: '5%', top: '8%', width: '12%', height: '25%' },
  2: { id: 'glycerol-tube', name: '甘油菌管', left: '18%', top: '20%', width: '6%', height: '12%' },
  3: { id: 'ice-box', name: '冰盒', left: '15%', top: '60%', width: '18%', height: '22%' },
  4: { id: 'inoculation-loop', name: '接种环', left: '45%', top: '35%', width: '15%', height: '5%' },
  5: { id: 'alcohol-lamp', name: '酒精灯', left: '50%', top: '65%', width: '10%', height: '18%' },
  6: { id: 'petri-dish', name: '培养皿', left: '70%', top: '60%', width: '12%', height: '18%' },
  7: { id: 'incubator', name: '恒温培养箱', left: '75%', top: '8%', width: '15%', height: '25%' },
};

export default function Experiment1Lab({ currentStep, onStepComplete }: Experiment1LabProps) {
  const [animating, setAnimating] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [tubePosition, setTubePosition] = useState(equipmentPositions[2]);
  const [loopPosition, setLoopPosition] = useState(equipmentPositions[4]);
  const [loopOnLamp, setLoopOnLamp] = useState(false);
  const [loopCooling, setLoopCooling] = useState(false);
  const [tubeOpened, setTubeOpened] = useState(false);

  // 获取当前步骤需要点击的器材
  const getTargetEquipment = () => {
    switch (currentStep) {
      case 1: return equipmentPositions[1]; // 冰箱
      case 2: return equipmentPositions[4]; // 接种环（步骤二：接种环灭菌与取样）
      case 3: return equipmentPositions[3]; // 冰盒
      case 4: return equipmentPositions[4]; // 接种环
      case 5: return equipmentPositions[5]; // 酒精灯
      case 6: return equipmentPositions[6]; // 培养皿
      case 7: return equipmentPositions[7]; // 培养箱
      default: return null;
    }
  };

  const targetEquipment = getTargetEquipment();

  // 点击器材
  const handleEquipmentClick = (equipmentId: string) => {
    if (animating) return;
    
    const target = getTargetEquipment();
    if (target && equipmentId === target.id) {
      // 步骤 1：点击冰箱时，在主场景内完成「开门 + 取出甘油菌管并移动到冰盒」整套动画
      if (currentStep === 1 && equipmentId === 'freezer') {
        setAnimating(true);
        setShowHint(false);

        // 先开门（通过 JSX 中的 animating && currentStep === 1 触发）
        // 稍后再更新甘油菌管的位置到冰盒附近，形成移动轨迹
        setTimeout(() => {
          setTubePosition({
            ...equipmentPositions[2],
            left: '16%',
            top: '56%',
          });
        }, 600);

        // 整个动画结束后进入下一步
        setTimeout(() => {
          setAnimating(false);
          onStepComplete();
          setShowHint(true);
        }, 2000);

        return;
      }

      // 步骤 2：点击接种环，完成「接种环灭菌 + 冷却 + 打开菌管并取样」的连续动画
      if (currentStep === 2 && equipmentId === 'inoculation-loop') {
        setAnimating(true);
        setShowHint(false);
        setLoopOnLamp(true);
      
        // 移动到酒精灯火焰上方
        setLoopPosition(prev => ({
          ...prev,
          left: '50%',
          top: '57%',
        }));
      
        // 灭菌 2 秒后，移开酒精灯，进入冷却
        setTimeout(() => {
          setLoopOnLamp(false);
          setLoopCooling(true);
          setLoopPosition(prev => ({
            ...prev,
            left: '40%',  // 冷却位置
            top: '50%',
          }));
        }, 2000);
      
        // 冷却 5 秒后（2+3），开始取样
        setTimeout(() => {
          setLoopCooling(false);
      
          // 移动菌管到桌面中心（如果需要）
          setTubePosition({
            ...tubePosition,
            left: '40%',
            top: '60%',
          });
      
          // 第一步：接种环平移到菌管正上方
          setLoopPosition({
            ...loopPosition,
            left: '36%',  // 与菌管水平对齐
            top: '48%',   // 高于菌管
          });
      
          // 第二步：垂直下降进入菌管（延迟 700ms 后）
          setTimeout(() => {
            setLoopPosition(prev => ({
              ...prev,
              top: '56%',  // 下降到菌管口
            }));
            setTubeOpened(true); // 打开盖子
      
            // ==== 新增：蘸取后取出来（第三步） ====
            // 下降后停留 0.8 秒，然后上升回到菌管上方
            setTimeout(() => {
              setLoopPosition(prev => ({
                ...prev,
                top: '48%',  // 回到上方
              }));
              // 可选：如果希望盖回盖子，可以设置 setTubeOpened(false);
            }, 800); // 停留时间可调整
      
          }, 700); // 水平移动完成后再下降
      
        }, 5000); // 冷却结束（2000 + 3000 = 5000，假设冷却原本应为3秒，但这里用了2000ms灭菌+3000ms冷却？代码中灭菌是2000，冷却结束在5000，即冷却实际占3000ms）
      
        // ==== 调整：步骤结束定时器延长，确保上升完成 ====
        // 原结束时间为 6000ms，现在需要延长到 5000 + 700 + 800 + 500缓冲 = 7000ms
        setTimeout(() => {
          setAnimating(false);
          onStepComplete();
          setShowHint(true);
        }, 7000); // 从6000改为7000
      
        return;
      }

      // 其他步骤保持原有的「操作中」时长逻辑
      setAnimating(true);
      setShowHint(false);

      setTimeout(() => {
        setAnimating(false);
        onStepComplete();
        setShowHint(true);
      }, 800);
    }
  };

  // 步骤提示文字
  const getStepHint = () => {
    switch (currentStep) {
      case 1: return '点击 -80℃冰箱 打开冰箱门并取出甘油菌管到冰上';
      case 2: return '点击 接种环 在酒精灯上灭菌并取样';
      case 3: return '点击 冰盒 将菌管置于冰上';
      case 4: return '点击 接种环 准备接种工具';
      case 5: return '点击 酒精灯 灼烧接种环灭菌';
      case 6: return '点击 培养皿 进行平板划线';
      case 7: return '点击 恒温培养箱 放入培养';
      default: return '';
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#4a7c9b] via-[#5a8cab] to-[#6a9cbb] overflow-hidden">
      {/* 实验室背景 */}
      <div className="absolute inset-0">
        {/* 后墙 */}
        <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-[#3a6c8b] to-[#4a7c9b]" />
        
        {/* 操作台台面 */}
        <div className="absolute top-[45%] left-0 right-0 h-[55%] bg-gradient-to-b from-[#8a9cab] via-[#7a8c9b] to-[#6a7c8b]">
          {/* 台面反光 */}
          <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/20 to-transparent" />
        </div>
        
        {/* 后墙设备平台 */}
        <div className="absolute top-[35%] left-[5%] right-[5%] h-[12%] bg-gradient-to-b from-[#9ab] to-[#8a9] rounded-sm" />
      </div>

      {/* -80℃冰箱 */}
      <div 
        className={`absolute cursor-pointer transition-all duration-300 ${
          targetEquipment?.id === 'freezer' ? 'z-20' : 'z-10'
        }`}
        style={{ 
          left: equipmentPositions[1].left, 
          top: equipmentPositions[1].top, 
          width: equipmentPositions[1].width, 
          height: equipmentPositions[1].height 
        }}
        onClick={() => handleEquipmentClick('freezer')}
      >
        <div className="relative w-full h-full">
          {/* 冰箱箱体 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#c0d0e0] via-[#d0e0f0] to-[#c0d0e0] rounded-t-lg shadow-xl">
            {/* 顶部 */}
            <div className="absolute -top-[8%] left-0 right-0 h-[10%] bg-gradient-to-b from-[#a0b0c0] to-[#90a0b0] rounded-t-md" />
            {/* 控制面板 */}
            <div className="absolute top-[10%] left-[15%] right-[15%] h-[20%] bg-[#2a3a4a] rounded flex items-center justify-center">
              <span className="text-[8px] text-green-400 font-mono">-80℃</span>
            </div>
            {/* 冰箱门：在原位置做开门动画 */}
            <div
              className={`
                absolute top-[26%] right-[6%] w-[32%] h-[50%]
                bg-gradient-to-r from-[#dde6f2] to-[#c3d0e2]
                rounded-md shadow-md origin-left
                ${animating && currentStep === 1 ? 'freezer-door-anim' : ''}
              `}
            >
              <div className="absolute top-[30%] right-[12%] w-[18%] h-[40%] bg-gradient-to-r from-[#8090a0] to-[#607080] rounded" />
            </div>
          </div>
          {/* 黄色光晕提示 */}
          {showHint && targetEquipment?.id === 'freezer' && (
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute -inset-2 bg-yellow-400/40 rounded-lg blur-md" />
              <div className="absolute -inset-1 bg-yellow-400/60 rounded-lg" />
            </div>
          )}
        </div>
      </div>

      {/* 恒温培养箱 */}
      <div 
        className={`absolute cursor-pointer transition-all duration-300 ${
          targetEquipment?.id === 'incubator' ? 'z-20' : 'z-10'
        }`}
        style={{ 
          left: equipmentPositions[7].left, 
          top: equipmentPositions[7].top, 
          width: equipmentPositions[7].width, 
          height: equipmentPositions[7].height 
        }}
        onClick={() => handleEquipmentClick('incubator')}
      >
        <div className="relative w-full h-full">
          {/* 培养箱主体 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#e0e8f0] via-[#f0f4f8] to-[#e0e8f0] rounded-lg shadow-xl">
            {/* 控制面板 */}
            <div className="absolute top-[8%] left-[10%] right-[10%] h-[25%] bg-[#3a4a5a] rounded flex items-center justify-center">
              <span className="text-[8px] text-green-400 font-mono">37℃</span>
            </div>
            {/* 玻璃门 */}
            <div className="absolute top-[40%] left-[15%] right-[15%] bottom-[10%] bg-gradient-to-br from-[#a0c0e0]/60 to-[#80a0c0]/40 rounded border-2 border-[#90a0b0]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
            </div>
          </div>
          {/* 黄色光晕提示 */}
          {showHint && targetEquipment?.id === 'incubator' && (
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute -inset-2 bg-yellow-400/40 rounded-lg blur-md" />
              <div className="absolute -inset-1 bg-yellow-400/60 rounded-lg" />
            </div>
          )}
        </div>
      </div>

      {/* 超净台（背景） */}
      <div className="absolute left-[35%] top-[10%] w-[30%] h-[30%] z-5">
        <div className="w-full h-full bg-gradient-to-b from-[#c0d0e0]/40 to-transparent rounded-lg">
          {/* 超净台玻璃 */}
          <div className="absolute inset-[5%] bg-gradient-to-b from-[#a0c0e0]/30 to-[#80a0c0]/20 rounded border border-[#90a0b0]/50" />
        </div>
      </div>

      {/* 操作台上的设备 */}
      
      {/* 移液器（左侧） */}
      <div className="absolute left-[3%] top-[50%] w-[8%] h-[35%] z-10">
        <div className="w-full h-full relative">
          {/* 移液器主体 */}
          <div className="absolute top-0 left-[30%] w-[40%] h-[60%] bg-gradient-to-b from-[#4a90d0] to-[#3a80c0] rounded-t-lg" />
          {/* 吸头 */}
          <div className="absolute top-[60%] left-[40%] w-[20%] h-[40%] bg-gradient-to-b from-[#2a3a4a] to-[#1a2a3a]" />
        </div>
      </div>

      {/* 冰盒 */}
      <div 
        className={`absolute cursor-pointer transition-all duration-300 ${
          targetEquipment?.id === 'ice-box' ? 'z-20' : 'z-10'
        }`}
        style={{ 
          left: equipmentPositions[3].left, 
          top: equipmentPositions[3].top, 
          width: equipmentPositions[3].width, 
          height: equipmentPositions[3].height 
        }}
        onClick={() => handleEquipmentClick('ice-box')}
      >
        <div className="relative w-full h-full">
          {/* 冰盒主体 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0d040] to-[#e0c030] rounded-lg shadow-xl">
            {/* 冰块 */}
            <div className="absolute inset-[10%] grid grid-cols-4 grid-rows-3 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-[#a0d0f0] to-[#80c0e0] rounded-sm opacity-80" />
              ))}
            </div>
          </div>
          {/* 黄色光晕提示 */}
          {showHint && targetEquipment?.id === 'ice-box' && (
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute -inset-2 bg-yellow-400/40 rounded-lg blur-md" />
              <div className="absolute -inset-1 bg-yellow-400/60 rounded-lg" />
            </div>
          )}
        </div>
      </div>

      {/* 酒精灯 */}
      <div 
        className={`absolute cursor-pointer transition-all duration-300 ${
          targetEquipment?.id === 'alcohol-lamp' ? 'z-20' : 'z-10'
        }`}
        style={{ 
          left: equipmentPositions[5].left, 
          top: equipmentPositions[5].top, 
          width: equipmentPositions[5].width, 
          height: equipmentPositions[5].height 
        }}
        onClick={() => handleEquipmentClick('alcohol-lamp')}
      >
        <div className="relative w-full h-full">
          {/* 灯座 */}
          <div className="absolute bottom-0 left-[10%] right-[10%] h-[60%] bg-gradient-to-b from-[#d0a0e0] to-[#b080c0] rounded-b-full">
            {/* 液体 */}
            <div className="absolute bottom-[10%] left-[20%] right-[20%] top-[30%] bg-[#8040a0]/50 rounded-b-full" />
          </div>
          {/* 灯芯管 */}
          <div className="absolute top-[20%] left-[40%] w-[20%] h-[25%] bg-gradient-to-b from-[#a0a0a0] to-[#808080]" />
          {/* 火焰（当前步骤时显示） */}
          {currentStep >= 5 && (
            <div className="absolute -top-[20%] left-[35%] w-[30%] h-[40%]">
              <div className="w-full h-full bg-gradient-to-t from-[#ff8040] via-[#ffcc40] to-[#ffff80] rounded-full opacity-80 animate-pulse" />
            </div>
          )}
          {/* 步骤二：接种环在火焰上方灭菌的高亮区域 */}
          {loopOnLamp && (
            <div className="absolute -top-[10%] left-[28%] w-[44%] h-[28%] flex items-center justify-center">
              <div className="w-full h-[32%] bg-gradient-to-r from-[#facc15] to-[#f97316] rounded-full shadow-[0_0_14px_rgba(250,204,21,0.9)] opacity-90" />
            </div>
          )}
          {/* 黄色光晕提示 */}
          {showHint && targetEquipment?.id === 'alcohol-lamp' && (
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute -inset-2 bg-yellow-400/40 rounded-lg blur-md" />
              <div className="absolute -inset-1 bg-yellow-400/60 rounded-lg" />
            </div>
          )}
        </div>
      </div>

      {/* 培养皿 */}
      <div 
        className={`absolute cursor-pointer transition-all duration-300 ${
          targetEquipment?.id === 'petri-dish' ? 'z-20' : 'z-10'
        }`}
        style={{ 
          left: equipmentPositions[6].left, 
          top: equipmentPositions[6].top, 
          width: equipmentPositions[6].width, 
          height: equipmentPositions[6].height 
        }}
        onClick={() => handleEquipmentClick('petri-dish')}
      >
        <div className="relative w-full h-full">
          {/* 培养皿底部 */}
          <div className="absolute inset-[5%] bg-gradient-to-br from-[#f0f0e0] to-[#e0e0d0] rounded-full shadow-lg">
            {/* 培养基 */}
            <div className="absolute inset-[10%] bg-gradient-to-br from-[#f8f4e8] to-[#e8e4d8] rounded-full">
              {/* 菌落（划线后显示） */}
              {currentStep >= 6 && (
                <div className="absolute inset-0">
                  {/* 划线痕迹 */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path d="M20 30 Q40 25 60 35" stroke="#804020" strokeWidth="2" fill="none" opacity="0.6" />
                    <path d="M25 40 Q45 35 65 45" stroke="#804020" strokeWidth="2" fill="none" opacity="0.5" />
                    <path d="M30 50 Q50 45 70 55" stroke="#804020" strokeWidth="2" fill="none" opacity="0.4" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          {/* 培养皿边缘高光 */}
          <div className="absolute inset-0 rounded-full border-4 border-white/30" />
          {/* 黄色光晕提示 */}
          {showHint && targetEquipment?.id === 'petri-dish' && (
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute -inset-2 bg-yellow-400/40 rounded-full blur-md" />
              <div className="absolute -inset-1 bg-yellow-400/60 rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* 接种环 */}
      <div 
        className={`absolute cursor-pointer transition-all duration-700 ease-in-out ${
          targetEquipment?.id === 'inoculation-loop' ? 'z-20' : 'z-10'
        }`}
        style={{ 
          left: loopPosition.left, 
          top: loopPosition.top, 
          width: loopPosition.width, 
          height: loopPosition.height 
        }}
        onClick={() => handleEquipmentClick('inoculation-loop')}
      >
        <div
          className="relative w-full h-full"
          style={{
            // 接种环始终保持立起来，环口朝下
            transform: 'rotate(90deg)',
            transformOrigin: '50% 50%',
            transition: 'transform 0.0s',
          }}
        >
          {/* 接种环手柄 */}
          <div className="absolute left-0 top-[30%] w-[70%] h-[40%] bg-gradient-to-r from-[#6a5a4a] to-[#5a4a3a] rounded" />
          {/* 金属丝 */}
          <div className="absolute right-0 top-[45%] w-[30%] h-[10%] bg-gradient-to-r from-[#a0a0a0] to-[#c0c0c0]" />
          {/* 环 */}
          <div className="absolute right-0 top-[20%] w-[15%] h-[60%] border-2 border-[#c0c0c0] rounded-full" />
          {/* 步骤二：无菌接种环高亮效果 */}
          {(currentStep === 2 || loopOnLamp || loopCooling) && (
            <div className="absolute inset-0 rounded-xl shadow-[0_0_16px_rgba(250,204,21,0.8)] ring-2 ring-yellow-300/80 pointer-events-none" />
          )}
          {/* 黄色光晕提示 */}
          {showHint && targetEquipment?.id === 'inoculation-loop' && (
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute -inset-2 bg-yellow-400/40 rounded-lg blur-md" />
              <div className="absolute -inset-1 bg-yellow-400/60 rounded-lg" />
            </div>
          )}
        </div>
      </div>

      {/* 甘油菌管 */}
      <div 
        className={`absolute cursor-pointer transition-all duration-700 ease-in-out ${
          currentStep === 2 && animating ? 'z-30' : (targetEquipment?.id === 'glycerol-tube' ? 'z-20' : 'z-10')
        }`}
        style={{ 
          left: tubePosition.left, 
          top: tubePosition.top, 
          width: equipmentPositions[2].width, 
          height: equipmentPositions[2].height 
        }}
        onClick={() => handleEquipmentClick('glycerol-tube')}
      >
        <div className="relative w-full h-full">
          {/* 试管贴图本身，位置由 tubePosition 控制 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#c02040] to-[#a01030] rounded-b-full">
            {/* 液体 */}
            <div className="absolute bottom-[10%] left-[10%] right-[10%] h-[60%] bg-gradient-to-b from-[#d03050] to-[#b02040] rounded-b-full" />
            {/* 盖子：步骤二结束后稍微抬起，表示已打开 */}
            <div
              className={`absolute left-[10%] right-[10%] h-[20%] bg-gradient-to-b from-[#e0e0e0] to-[#c0c0c0] rounded-t-md transition-transform duration-500 ${
                tubeOpened ? '-top-[24%] rotate-6 origin-right' : '-top-[15%]'
              }`}
            />
          </div>
          {/* 黄色光晕提示 */}
          {showHint && targetEquipment?.id === 'glycerol-tube' && (
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute -inset-2 bg-yellow-400/40 rounded-lg blur-md" />
              <div className="absolute -inset-1 bg-yellow-400/60 rounded-lg" />
            </div>
          )}
        </div>
      </div>

      {/* 步骤提示 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-black/70 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-500/50">
          <p className="text-yellow-400 text-sm font-medium whitespace-nowrap">
            {getStepHint()}
          </p>
        </div>
      </div>

      {/* 步骤二：接种环离开酒精灯后的冷却提示文案 */}
      {loopCooling && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
          <div className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-sky-400/60">
            <p className="text-[12px] text-sky-100">
              冷却数秒，避免高温杀死菌体…
            </p>
          </div>
        </div>
      )}

      {/* 操作动画遮罩已移除：所有关键动画直接在主场景内完成 */}
    </div>
  );
}
