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
          
          <div className="scanlines absolute inset-0 z-50 pointer-events-none opacity-20"></div>

          <div className="flex items-center gap-4">
            <Briefcase className="text-accent-glitch animate-pulse text-[#f200f2]" size={40} />
            <h2 
              className="text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white text-shadow-neon" 
              data-text="EXPERIÊNCIA"
            >
              EXPERIÊNCIA
            </h2>
          </div>

            <button className="hidden md:flex group relative px-6 py-3 font-mono font-bold text-black bg-white hover:bg-primary transition-all duration-200 uppercase tracking-wider items-center gap-2 border-2 border-transparent hover:border-white hover:shadow-[0_0_15px_rgba(0,255,65,0.6)]">
              <Download className="group-hover:animate-bounce" size={20} />
              Baixar CV
              <div className="absolute inset-0 border-2 border-white scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 pointer-events-none"></div>
          </button>
        </div>

        <div className="relative border-l-2 border-zinc-800 ml-3 md:ml-6 space-y-10">
          {EXPERIENCES.map((exp, i) => (
            <div data-current={exp.current}  key={i} className={`exp-item relative pl-8 md:pl-12 group `}>
              
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-3 border-zinc-600 transition-all shadow-[0_0_0_10px_rgba(0,0,0,1)] group-hover:border-[#00fa3e] group-hover:shadow-[0_0_10px_6px_rgba(0,255,65,0.3)]"></div>

              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#f200f2] transition-colors">
                  {exp.role}
                </h3>
                
                <div className="flex items-center gap-2 text-[14px] font-mono group-data-[current=true]:text-[#00fa3e] group-data-[current='true']:bg-[#00fa3e10] uppercase tracking-wider border p-1">
                  // {exp.period}
                </div>
              </div>
              
              <span className="text-lg text-[#6b6e6c] uppercase font-medium ">
                {exp.company}
              </span>
              
              <div className=' bg-white/5 p-6 border-l-3 border-[#00fa3e] mt-2'>
                <p className="text-zinc-400 text-[14px] md:text-[18px] max-w-2xl leading-relaxed">
                  {exp.desc}
                </p>

                <div className="mt-2 flex gap-4 text-zinc-400 group-data-[current=true]:text-[#f200f2] transition-colors">
                  {exp.stack.map((stk,i)=>(
                    <span id={stk+i} className='uppercase'>[ {stk} ]</span>
                  ))}
              </div>
            </div>

          

            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

Experience.displayName = 'Experience';