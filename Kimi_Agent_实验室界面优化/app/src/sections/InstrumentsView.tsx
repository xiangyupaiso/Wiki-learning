import { useState } from 'react';
import { Lightbulb, Beaker, FlaskConical, Microscope, Droplets, Disc, CircleDot, Flame } from 'lucide-react';
import type { Experiment, Instrument, Reagent } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface InstrumentsViewProps {
  experiment: Experiment;
}

interface DragItem {
  id: string;
  name: string;
  englishName: string;
  type: 'instrument' | 'reagent';
}

export default function InstrumentsView({ experiment }: InstrumentsViewProps) {
  const [gameMode, setGameMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Instrument | Reagent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [matchedItems, setMatchedItems] = useState<Set<string>>(new Set());
  const [shuffledTargets, setShuffledTargets] = useState<DragItem[]>([]);

  // Combine instruments and reagents
  const allItems: DragItem[] = [
    ...experiment.instruments.map(i => ({ ...i, type: 'instrument' as const })),
    ...experiment.reagents.map(r => ({ ...r, type: 'reagent' as const })),
  ];

  const toggleGameMode = () => {
    if (!gameMode) {
      // Enter game mode - shuffle targets
      const shuffled = [...allItems].sort(() => Math.random() - 0.5);
      setShuffledTargets(shuffled);
      setMatchedItems(new Set());
    }
    setGameMode(!gameMode);
  };

  const handleDragStart = (item: DragItem) => {
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (targetId: string) => {
    if (draggedItem && draggedItem.id === targetId) {
      setMatchedItems(prev => new Set([...prev, targetId]));
    }
    setDraggedItem(null);
  };

  const handleItemClick = (item: DragItem) => {
    if (!gameMode) {
      // Find the full item data from instruments or reagents
      const fullItem = experiment.instruments.find(i => i.id === item.id) || 
                       experiment.reagents.find(r => r.id === item.id);
      if (fullItem) {
        setSelectedItem(fullItem);
        setDialogOpen(true);
      }
    }
  };

  const getIcon = (id: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      dropper: <Droplets size={40} className="text-blue-400" />,
      burner: <Flame size={40} className="text-orange-400" />,
      coverslip: <Disc size={40} className="text-cyan-400" />,
      petri: <CircleDot size={40} className="text-green-400" />,
      loop: <div className="w-10 h-10 rounded-full border-2 border-amber-400" />,
      microscope: <Microscope size={40} className="text-purple-400" />,
      incubator: <div className="w-10 h-10 bg-gray-400 rounded flex items-center justify-center text-xs">恒温</div>,
      lb: <FlaskConical size={40} className="text-yellow-400" />,
      glycerol: <Beaker size={40} className="text-pink-400" />,
    };
    return iconMap[id] || <Beaker size={40} className="text-gray-400" />;
  };

  return (
    <div className="flex-1 bg-[#2a2a3e] p-6 overflow-auto">
      {/* Header with lightbulb */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">仪器/试剂</h2>
        <button
          onClick={toggleGameMode}
          className={`p-3 rounded-full transition-all duration-300 ${
            gameMode
              ? 'bg-amber-500/20 bulb-glow'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          <Lightbulb
            size={28}
            className={gameMode ? 'text-amber-400' : 'text-gray-400'}
          />
        </button>
      </div>

      {!gameMode ? (
        /* Normal mode - Display all items */
        <div className="grid grid-cols-3 gap-8">
          {allItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="flex flex-col items-center p-6 bg-[#1a1a2e] rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#252540] hover:scale-105"
            >
              <div className="mb-4">{getIcon(item.id)}</div>
              <span className="text-white font-medium text-center">{item.englishName}</span>
            </div>
          ))}
        </div>
      ) : (
        /* Game mode - Drag and drop matching */
        <div className="space-y-8">
          {/* Target names (drop zones) */}
          <div className="grid grid-cols-3 gap-4">
            {shuffledTargets.map((target) => (
              <div
                key={target.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(target.id);
                }}
                className={`p-4 rounded-xl border-2 border-dashed transition-all duration-300 ${
                  matchedItems.has(target.id)
                    ? 'bg-green-500/20 border-green-500'
                    : 'bg-[#1a1a2e] border-gray-600'
                }`}
              >
                <span className={`text-center block ${
                  matchedItems.has(target.id) ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {matchedItems.has(target.id) ? `✓ ${target.englishName}` : target.englishName}
                </span>
              </div>
            ))}
          </div>

          {/* Draggable icons */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-gray-400 text-center mb-6">将下方图标拖拽到上方对应名称处</p>
            <div className="flex flex-wrap justify-center gap-6">
              {allItems.map((item) => (
                <div
                  key={item.id}
                  draggable={!matchedItems.has(item.id)}
                  onDragStart={() => handleDragStart(item)}
                  onDragEnd={handleDragEnd}
                  className={`p-4 bg-[#1a1a2e] rounded-xl cursor-grab transition-all duration-300 ${
                    matchedItems.has(item.id)
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:bg-[#252540] active:cursor-grabbing'
                  }`}
                >
                  {getIcon(item.id)}
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="text-center">
            <p className="text-gray-400">
              匹配进度: {matchedItems.size} / {allItems.length}
            </p>
            {matchedItems.size === allItems.length && (
              <p className="text-green-400 text-xl font-bold mt-4">🎉 恭喜完成所有匹配!</p>
            )}
          </div>
        </div>
      )}

      {/* Item detail dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedItem && getIcon(selectedItem.id)}
              <span>{selectedItem?.name} ({selectedItem?.englishName})</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-1">描述</h4>
              <p className="text-gray-200">{selectedItem?.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-1">使用说明</h4>
              <p className="text-gray-200">{selectedItem?.usage}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
