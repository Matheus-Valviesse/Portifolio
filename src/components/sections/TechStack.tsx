import { forwardRef, useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TECH_STACK } from '../../data/constants';
import GlitchTitle from '../ui/GlitchTitle';

export const TechStack = forwardRef<HTMLDivElement, { isActive: boolean }>((props, ref) => {
  const [filter, setFilter] = useState("ALL");
  const filteredTechs = TECH_STACK.filter(t => filter === "ALL" || t.cat === filter);

  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const previousFilterRef = useRef(filter);

  useLayoutEffect(() => {

    if (!props.isActive) return;

    const ctx = gsap.context(() => {

      const isFilterChange = previousFilterRef.current !== filter;
      
      const shouldAnimate = !hasAnimatedRef.current || isFilterChange;

      if (shouldAnimate) {

        gsap.set(".tech-card", { 
          autoAlpha: 0, 
          scale: 0.5, 
          y: 50 
        });

        gsap.to(".tech-card", {
          duration: 0.5,
          autoAlpha: 1, 
          scale: 1, 
          y: 0, 
          stagger: 0.05, 
          ease: "back.out(1.7)",
          overwrite: true
        });

        hasAnimatedRef.current = true;
        previousFilterRef.current = filter;

      } else {     
        gsap.set(".tech-card", { 
          autoAlpha: 1, 
          scale: 1, 
          y: 0,
          overwrite: true 
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [props.isActive, filter]);

  return (
    <section ref={ref} className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full p-4">
        
        <div ref={containerRef} className="w-full max-w-6xl px-4">
            
            <div className='w-full flex justify-center py-10'>
              <GlitchTitle />
            </div>
            

            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
              {['ALL', 'FRONT', 'BACK', 'LANG'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)} 
                  className={`px-4 md:px-6 py-2  border text-xs md:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap 
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
                  
                  className="tech-card opacity-0 flex flex-col items-center justify-center gap-3 p-4 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 hover:border-[#00FF41] hover:bg-zinc-800/60 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="text-zinc-400 group-hover:text-[#00FF41] transition-colors duration-300 transform group-hover:scale-110">
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