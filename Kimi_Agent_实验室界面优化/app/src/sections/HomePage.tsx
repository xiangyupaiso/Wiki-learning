import { FlaskConical, Atom, Dna, Microscope } from 'lucide-react';

interface HomePageProps {
  onEnterExperiment: () => void;
}

export default function HomePage({ onEnterExperiment }: HomePageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3e] to-[#0a0a1a]">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating icons */}
        <div className="absolute top-[15%] left-[10%] text-blue-500/20 animate-pulse">
          <FlaskConical size={80} />
        </div>
        <div className="absolute top-[25%] right-[15%] text-green-500/20 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Atom size={100} />
        </div>
        <div className="absolute bottom-[20%] left-[15%] text-purple-500/20 animate-pulse" style={{ animationDelay: '1s' }}>
          <Dna size={90} />
        </div>
        <div className="absolute bottom-[25%] right-[10%] text-cyan-500/20 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <Microscope size={70} />
        </div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        {/* Title section */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl text-blue-400 mb-4 tracking-wider">
            Construction of GFP
          </h2>
          <h3 className="text-lg md:text-xl text-green-400 mb-6 tracking-wide">
            Gene-Expressing Engineered Bacteria
          </h3>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 mx-auto mb-8 rounded-full" />
        </div>

        {/* Main title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
          实验一
        </h1>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-10 border border-white/10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
            实验室大肠杆菌 DH5α 的复苏与活化培养
          </h2>
          <p className="text-lg text-gray-300 mb-2">
            设计者：周建宇
          </p>
          <p className="text-lg text-blue-400">
            虚拟实验室演示系统
          </p>
        </div>

        {/* Enter button */}
        <button
          onClick={onEnterExperiment}
          className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] overflow-hidden"
        >
          <span className="relative z-10">进入实验</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm">
        Virtual Laboratory System v1.0
      </div>
    </div>
  );
}
