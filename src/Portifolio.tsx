import React, { useRef, useMemo } from 'react'; // <--- ADICIONE useMemo
import { Background } from './components/ui/Background';
import { Hero } from './components/sections/Hero';
import { TechStack } from './components/sections/TechStack';
import { Experience } from './components/sections/Experience';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const codeBoxRef = useRef<HTMLDivElement>(null);

  // --- CORREÇÃO AQUI ---
  // O useMemo 'congela' essa lista. Sem isso, toda vez que muda o slide,
  // o código acha que é uma lista nova e reseta a animação.
  const sectionsRefs = useMemo(() => [heroRef, techRef, expRef], []);

  const { activeSectionIndex } = useScrollAnimation(sectionsRefs, codeBoxRef);

  return (
    <div ref={containerRef} className="h-[100dvh] w-full bg-[#050505] text-white overflow-hidden relative font-sans selection:bg-pink-500/30 selection:text-pink-200">
      
      <Background />

      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {sectionsRefs.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 border border-white/20 ${activeSectionIndex === i ? 'bg-pink-500 scale-150 border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-transparent hover:bg-white/20'}`} />
        ))}
      </div>

      <Hero ref={heroRef} codeBoxRef={codeBoxRef} />
      <TechStack ref={techRef} isActive={activeSectionIndex === 1} />
      <Experience ref={expRef} isActive={activeSectionIndex === 2} />
      
      <div className="absolute bottom-4 w-full text-center text-[10px] text-zinc-700 font-mono pointer-events-none z-50">
        © 2025 DEV.INIT • SCROLL TO NAVIGATE
      </div>
    </div>
  );
};

export default Portfolio;