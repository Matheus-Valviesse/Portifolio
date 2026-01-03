import { forwardRef, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Briefcase, Download, Calendar } from 'lucide-react';
import { EXPERIENCES } from '../../data/constants';

export const Experience = forwardRef<HTMLDivElement, { isActive: boolean }>((props, ref) => {

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.killTweensOf(".exp-item");

      if (props.isActive) {
        // --- ATIVO: FORÇA A ANIMAÇÃO DO ZERO ---
        // DE: Invisível, deslocado para a esquerda (-50px)
        // PARA: Visível, posição original (0)
        gsap.fromTo(".exp-item", 
          { 
            autoAlpha: 0, 
            x: -50 
          },
          {
            duration: 0.6,
            autoAlpha: 1,
            x: 0,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.2
          }
        );
      } else {
        // --- INATIVO: RESET ---
        gsap.set(".exp-item", { autoAlpha: 0 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [props.isActive]);

  return (
    <section 
      ref={ref} 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full bg-[#050505] p-4"
    >
      <div ref={containerRef} className="w-full max-w-5xl px-4 flex flex-col h-full justify-center">
        
        <div className="flex items-center justify-between mb-10 border-b border-zinc-800 pb-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white flex items-center gap-3">
            <Briefcase className="text-pink-500" size={32} /> Experiência
          </h2>
          
          <button className="flex items-center gap-2 bg-white text-black px-4 md:px-6 py-2 md:py-3 rounded-full font-bold uppercase hover:bg-pink-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] active:scale-95 text-xs md:text-base">
            <Download size={18} /> <span className="hidden md:inline">Baixar CV</span>
            <span className="md:hidden">CV</span>
          </button>
        </div>

        <div className="relative border-l-2 border-zinc-800 ml-3 md:ml-6 space-y-10">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="exp-item relative pl-8 md:pl-12 group">
              
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-600 group-hover:border-pink-500 group-hover:bg-pink-500 transition-all shadow-[0_0_0_4px_rgba(0,0,0,1)]"></div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">
                  {exp.role}
                </h3>
                <span className="text-zinc-500 hidden md:block">•</span>
                <span className="text-lg text-zinc-300 font-medium">
                  {exp.company}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-3 uppercase tracking-wider">
                <Calendar size={12} /> {exp.period}
              </div>
              
              <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

Experience.displayName = 'Experience';