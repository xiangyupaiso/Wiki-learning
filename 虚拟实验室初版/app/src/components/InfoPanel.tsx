import { BookOpen, FlaskConical, Beaker, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { infoContent } from '@/data/experiments';
import { ScrollArea } from '@/components/ui/scroll-area';

interface InfoPanelProps {
  onClose?: () => void;
}

export function InfoPanel({ onClose }: InfoPanelProps) {
  return (
    <div className="h-full bg-card/80 backdrop-blur-sm border border-border rounded-xl p-3 flex flex-col animate-slide-in-right">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <h3 className="font-semibold text-sm">实验信息</h3>
        {onClose && (
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      
      <Tabs defaultValue="principle" className="flex-1 flex flex-col">
        <TabsList className="w-full grid grid-cols-3 mb-3 shrink-0 h-8">
          <TabsTrigger value="principle" className="text-[10px]">
            <BookOpen className="w-3 h-3 mr-1" />
            原理
          </TabsTrigger>
          <TabsTrigger value="instruments" className="text-[10px]">
            <FlaskConical className="w-3 h-3 mr-1" />
            仪器
          </TabsTrigger>
          <TabsTrigger value="reagents" className="text-[10px]">
            <Beaker className="w-3 h-3 mr-1" />
            试剂
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="principle" className="mt-0 h-full">
            <ScrollArea className="h-full">
              <div className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line pr-3">
                {infoContent.principle.content}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="instruments" className="mt-0 h-full">
            <ScrollArea className="h-full">
              <div className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line pr-3">
                {infoContent.instruments.content}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="reagents" className="mt-0 h-full">
            <ScrollArea className="h-full">
              <div className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line pr-3">
                {infoContent.reagents.content}
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
