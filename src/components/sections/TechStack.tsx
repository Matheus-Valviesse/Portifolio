import { forwardRef, useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TECH_STACK } from '../../data/constants';

export const TechStack = forwardRef<HTMLDivElement, { isActive: boolean }>((props, ref) => {
  const [filter, setFilter] = useState("ALL");
  const filteredTechs = TECH_STACK.filter(t => filter === "ALL" || t.cat === filter);

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Controle de estado da animação
  const hasAnimatedRef = useRef(false);
  const previousFilterRef = useRef(filter);

  useLayoutEffect(() => {
    // Se a seção não está ativa, não fazemos nada. 
    // Deixamos o Pai controlar a opacidade da seção inteira.
    if (!props.isActive) return;

    const ctx = gsap.context(() => {
      // Verifica se o filtro mudou desde a última vez
      const isFilterChange = previousFilterRef.current !== filter;
      
      // PRECISA ANIMAR SE: É a primeira vez (load) OU o filtro mudou
      const shouldAnimate = !hasAnimatedRef.current || isFilterChange;

      if (shouldAnimate) {
        // --- CENÁRIO 1: TROCA DE FILTRO OU CARGA INICIAL ---
        // Queremos que TUDO anime do zero.

        // 1. Garante estado inicial INVISÍVEL
        gsap.set(".tech-card", { 
          autoAlpha: 0, 
          scale: 0.5, 
          y: 50 
        });

        // 2. Anima entrada
        gsap.to(".tech-card", {
          duration: 0.5,
          autoAlpha: 1, 
          scale: 1, 
          y: 0, 
          stagger: 0.05, 
          ease: "back.out(1.7)",
          overwrite: true
        });

        // Marca que já animamos e salva o filtro atual
        hasAnimatedRef.current = true;
        previousFilterRef.current = filter;

      } else {
        // --- CENÁRIO 2: VOLTANDO DE OUTRA SEÇÃO ---
        // NÃO anima. Apenas garante que está visível e parado.
        
        gsap.set(".tech-card", { 
          autoAlpha: 1, 
          scale: 1, 
          y: 0,
          overwrite: true // Para qualquer animação anterior
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [props.isActive, filter]);

  return (
    <section ref={ref} className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full p-4">
        
        <div ref={containerRef} className="w-full max-w-6xl px-4">
            
            <h2 className="text-3xl md:text-6xl font-black uppercase mb-8 text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 tracking-tighter">
              Arsenal
            </h2>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
              {['ALL', 'FRONT', 'BACK', 'LANG'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)} 
                  className={`px-4 md:px-6 py-2 rounded-full border text-xs md:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap 
                    ${filter === cat 
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105' 
                      : 'bg-zinc-900/50 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
                    }`}
                >
                  {cat === 'LANG' ? 'Languages' : cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
              {filteredTechs.map((tech) => (
                <div 
  
                  key={`${tech.name}-${filter}`} 
                  
                  // Mantemos opacity-0 para nascer invisível e o GSAP assumir
                  className="tech-card opacity-0 flex flex-col items-center justify-center gap-3 p-4 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-xl hover:border-purple-500/50 hover:bg-zinc-800/60 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="text-zinc-400 group-hover:text-purple-400 transition-colors duration-300 transform group-hover:scale-110">
                    {tech.icon}
                  </div>
                  <span className="font-bold text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 group-hover:text-zinc-200">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
        </div>
    </section>
  );
});

TechStack.displayName = 'TechStack';