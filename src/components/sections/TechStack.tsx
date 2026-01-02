import { forwardRef, useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TECH_STACK } from '../../data/constants';

export const TechStack = forwardRef<HTMLDivElement, { isActive: boolean }>((props, ref) => {
  const [filter, setFilter] = useState("ALL");

  const filteredTechs = TECH_STACK.filter(t => filter === "ALL" || t.cat === filter);

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Só roda se a seção estiver ativa
    if (!props.isActive) return;

    // Contexto do GSAP para limpeza automática e escopo
    const ctx = gsap.context(() => {
      // 1. Mata animações anteriores imediatamente
      gsap.killTweensOf(".tech-card");

      // 2. Força o estado inicial (Invisível) imediatamente
      gsap.set(".tech-card", { opacity: 0, scale: 0.8, y: 20 });

      // 3. Anima para o estado visível
      gsap.to(".tech-card", {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.7)",
        overwrite: "auto"
      });
    }, containerRef); // Escopo definido na ref da section

    return () => ctx.revert(); // Limpa tudo ao desmontar ou mudar o filtro
  }, [props.isActive, filter]);

  return (
    <section ref={ref} className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full p-4">
        <div className="w-full max-w-6xl px-4">
            {/* Título */}
            <h2 className="text-3xl md:text-6xl font-black uppercase mb-8 text-center text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600 tracking-tighter">
              Arsenal
            </h2>

            {/* Botões de Filtro - SEM SCROLL (flex-wrap e justify-center) */}
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

            {/* Grid de Cards */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
              {filteredTechs.map((tech, i) => (
                <div 
                  key={`${tech.name}-${i}`} 
                  // ADICIONEI 'opacity-0' AQUI PARA GARANTIR QUE COMEÇA INVISÍVEL NO CSS
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