import { FlaskConical, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HomePageProps {
  onEnter: () => void;
}

export function HomePage({ onEnter }: HomePageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      {/* 内容 */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* 图标 */}
        <div className="mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 mb-6">
            <FlaskConical className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        {/* 主标题 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <span className="gradient-text">Construction of GFP</span>
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-foreground/90 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Gene-Expressing Engineered Bacteria
        </h2>
        
        {/* 分隔线 */}
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full animate-fade-in-up" style={{ animationDelay: '300ms' }} />
        
        {/* 实验标题 */}
        <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/30 mb-4">
            实验一
          </span>
        </div>
        <p className="text-xl md:text-2xl text-foreground/80 mb-12 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          实验室大肠杆菌 DH5α 的复苏与活化培养
        </p>
        
        {/* 作者 */}
        <p className="text-muted-foreground mb-10 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          设计者：周建宇
        </p>
        
        {/* 进入按钮 */}
        <div className="animate-fade-in-up" style={{ animationDelay: '700ms' }}>
          <Button 
            size="lg" 
            onClick={onEnter}
            className="group px-8 py-6 text-lg rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            进入实验
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
      
      {/* 底部装饰 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-sm animate-fade-in" style={{ animationDelay: '1s' }}>
        虚拟实验室演示系统
      </div>
    </div>
  );
}
