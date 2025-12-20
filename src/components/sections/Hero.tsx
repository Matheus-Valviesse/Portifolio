import React, { forwardRef } from 'react';
import CodeTyper from '../ui/CodeTyper';

export const Hero = forwardRef<HTMLDivElement, { codeBoxRef: React.RefObject<HTMLDivElement> }>((props, ref) => {
  return (
    <section ref={ref} className="absolute inset-0 flex items-center justify-center z-10 w-full h-full p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 max-w-7xl w-full">
        <div className="hero-img relative group w-28 h-28 md:w-80 md:h-80 flex-shrink-0">
           {/* ...resto do HTML da imagem... */}
           <div className="absolute inset-0 border border-pink-500/50 rounded-full animate-[spin_10s_linear_infinite] border-dashed"></div>
           <div className="w-full h-full rounded-full overflow-hidden border-4 border-zinc-900 shadow-2xl relative z-10">
               <img src="https://plaguedoctormasks.com/wp-content/uploads/2017/07/plague-doctor-masks.jpg" alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"/>
           </div>
        </div>
        <div className="flex-1 space-y-4 md:space-y-8 w-full max-w-xl text-center md:text-left">
          <div>
            <h1 className="hero-title text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-gradient">Dev</span>.init
            </h1>
            <p className="hero-desc text-zinc-400 font-mono text-xs md:text-lg mt-2">
              Construindo o futuro, <span className="text-zinc-200 decoration-pink-500 underline underline-offset-4">linha por linha</span>.
            </p>
          </div>
          <CodeTyper ref={props.codeBoxRef} />
          <div className="hero-status flex items-center justify-center md:justify-start gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 animate-pulse">
            <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            System Online • Rio de Janeiro
          </div>
        </div>
      </div>
    </section>
  );
});
Hero.displayName = 'Hero';