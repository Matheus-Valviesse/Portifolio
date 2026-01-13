import React, { forwardRef, useRef } from 'react';
import CodeTyper from '../ui/hero/CodeTyper'; // Verifique o caminho
import { GlitchText } from '../ui/hero/GlitchText';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Hero = forwardRef<HTMLDivElement, { codeBoxRef: React.Ref<HTMLDivElement> | undefined }>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // 1. Fade Inicial do Background
    tl.from(containerRef.current, { opacity: 0, duration: 0.5 });
    
    // 2. Título (GlitchText) entra subindo
    tl.from(titleRef.current, { 
      y: 30, 
      opacity: 0, 
      duration: 0.8, 
      ease: "power4.out" 
    });

    // O CodeTyper agora cuida da sua própria animação!
    // Não precisamos animar o container dele aqui.
  }, { scope: containerRef });

  return (
    <>
      <section ref={ref} className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] text-white overflow-hidden font-display py-12 md:py-0">
        
        {/* === BACKGROUND === */}
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
           <div 
             className="absolute inset-0"
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255, 255, 255, 0.05) 1.1px, transparent 1.1px), 
                 linear-gradient(to right, rgba(255, 255, 255, 0.05) 1.1px, transparent 1.1px)
               `,
               backgroundSize: '22px 22px'
             }}
           ></div>
           
           <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_80%,#050505_100%)]"></div>
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-700/10 rounded-full blur-[128px]"></div>
        </div>

        {/* Container Principal */}
        <div className="relative z-10 max-w-7xl w-full p-6 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* 1. IMAGEM DE PERFIL */}
          <div className="relative group w-48 h-48 md:w-80 md:h-80 shrink-0 lg:mr-auto ">
             <div className="absolute inset-0 rounded-full border-2 border-[#00FF41]/30 group-hover:border-[#00FF41] transition-colors duration-500"></div>
             <div className="relative w-full h-full rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-[#00FF41]/50 animate-[scanline_3s_linear_infinite] shadow-[0_0_15px_rgba(0,255,65,0.8)] z-20"></div>
                <img src="https://plaguedoctormasks.com/wp-content/uploads/2017/07/plague-doctor-masks.jpg" alt="Profile" className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 transition-all duration-700" />
             </div>
          </div>

          {/* 2. CONTEÚDO (Texto + Código) */}
          <div className="flex-1 w-full text-center lg:text-right flex flex-col items-center lg:items-end">
            
            {/* TÍTULO GLITCH */}
            <div ref={titleRef} className="mb-8 relative flex flex-col items-center lg:items-end z-20">
               <div className="text-5xl md:text-7xl font-black italic tracking-tighter">
                 <GlitchText text="OLÁ, BEM VINDO(A)." />
               </div>
            </div>

            <CodeTyper startDelay={1.4} />

          </div>
        </div>
      </section>
    </>
  );
});

Hero.displayName = 'Hero';