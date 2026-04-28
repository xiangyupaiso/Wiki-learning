import { FlaskConical, ChevronRight, Beaker, Microscope, Dna } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { allExperiments } from '@/data/experiments';

interface CatalogPageProps {
  onSelectExperiment: (id: string) => void;
  onBack: () => void;
}

const difficultyConfig = {
  easy: { label: '简单', className: 'difficulty-easy', icon: Beaker },
  medium: { label: '中等', className: 'difficulty-medium', icon: Microscope },
  hard: { label: '困难', className: 'difficulty-hard', icon: Dna }
};

export function CatalogPage({ onSelectExperiment, onBack }: CatalogPageProps) {
  const groupedExperiments = {
    easy: allExperiments.filter(e => e.difficulty === 'easy'),
    medium: allExperiments.filter(e => e.difficulty === 'medium'),
    hard: allExperiments.filter(e => e.difficulty === 'hard')
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* 头部导航 */}
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">实验目录</h1>
            <p className="text-sm text-muted-foreground">选择要进行的实验</p>
          </div>
        </div>
        <Button variant="outline" onClick={onBack} size="sm">
          返回首页
        </Button>
      </header>

      {/* 实验列表 */}
      <div className="max-w-6xl mx-auto space-y-10">
        {/* 简单难度 */}
        <section className="animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <Beaker className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-semibold text-green-400">简单难度实验</h2>
            <div className="flex-1 h-px bg-green-400/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupedExperiments.easy.map((exp, index) => (
              <ExperimentCard 
                key={exp.id} 
                experiment={exp} 
                onClick={() => onSelectExperiment(exp.id)}
                delay={index * 100}
              />
            ))}
          </div>
        </section>

        {/* 中等难度 */}
        <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <Microscope className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold text-yellow-400">中等难度实验</h2>
            <div className="flex-1 h-px bg-yellow-400/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupedExperiments.medium.map((exp, index) => (
              <ExperimentCard 
                key={exp.id} 
                experiment={exp} 
                onClick={() => onSelectExperiment(exp.id)}
                delay={index * 100 + 200}
              />
            ))}
          </div>
        </section>

        {/* 困难难度 */}
        <section className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <Dna className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-semibold text-red-400">困难难度实验</h2>
            <div className="flex-1 h-px bg-red-400/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupedExperiments.hard.map((exp, index) => (
              <ExperimentCard 
                key={exp.id} 
                experiment={exp} 
                onClick={() => onSelectExperiment(exp.id)}
                delay={index * 100 + 400}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

interface ExperimentCardProps {
  experiment: typeof allExperiments[0];
  onClick: () => void;
  delay: number;
}

function ExperimentCard({ experiment, onClick, delay }: ExperimentCardProps) {
  const config = difficultyConfig[experiment.difficulty];
  const Icon = config.icon;

  return (
    <div 
      className="group relative bg-card border border-border rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <Badge variant="outline" className={config.className}>
          <Icon className="w-3 h-3 mr-1" />
          {config.label}
        </Badge>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
      
      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
        {experiment.title}
      </h3>
      
      <p className="text-sm text-muted-foreground line-clamp-2">
        {experiment.description}
      </p>
      
      {/* 悬停光效 */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
