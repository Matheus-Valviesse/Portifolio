import React, { forwardRef, useRef } from 'react';
import CodeTyper from '../ui/CodeTyper'; // Verifique se o caminho está correto
import { GlitchText } from '../ui/GlitchText'; 
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=VT323&display=swap');
  .font-pixel { font-family: 'VT323', monospace; }
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  /* Removi o CSS de glitch antigo pois o componente GlitchText resolve isso com GSAP */
`;

export const Hero = forwardRef<HTMLDivElement, { codeBoxRef: React.Ref<HTMLDivElement> | undefined }>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null); // Mudei para Div pois vai envolver o componente
  const boxWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // 1. Fade Inicial
    tl.from(containerRef.current, { opacity: 0, duration: 0.5 });
    
    // 2. Título (GlitchText) entra subindo
    tl.from(titleRef.current, { 
      y: 30, 
      opacity: 0, 
      duration: 0.8, 
      ease: "power4.out" 
    });

    // 3. CAIXA VERDE CRESCE
    if (boxWrapperRef.current) {
      tl.from(boxWrapperRef.current, {
        scale: 0,         
        opacity: 0,       
        transformOrigin: "center center", 
        duration: 0.8,    
        ease: "back.out(1.2)" 
      }, "-=0.4"); // Ajustei um pouco o tempo para ficar mais dinâmico
    }
  }, { scope: containerRef });

  return (
    <>
      <style>{STYLES}</style>
      <section ref={ref} className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] text-white overflow-hidden font-display py-12 md:py-0">
        
        {/* === BACKGROUND === */}
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
           {/* Grid Layer */}
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
            
            {/* === BLOCO DO TÍTULO GLITCH === */}
            <div ref={titleRef} className="mb-8 relative flex flex-col items-center lg:items-end z-20">
                {/* Ajuste o text-5xl/8xl aqui para controlar o tamanho do texto glitch */}
                <div className="text-5xl md:text-8xl font-black italic tracking-tighter">
                  <GlitchText text="OLÁ, BEM VINDO" />
                </div>
            </div>

            {/* Terminal Box Wrapper */}
            <div ref={boxWrapperRef} className="relative w-full max-w-2xl group mt-4">
                <div className="absolute -top-6 right-0 lg:right-0 left-0 lg:left-auto mx-auto lg:mx-0 w-fit bg-[#00FF41] px-3 py-1 text-lg text-black font-pixel z-10 leading-none tracking-widest">
                    SRC_CODE
                </div>
                
                <div className="border-2 border-[#00FF41] bg-[#050505] p-6 shadow-[0_0_30px_rgba(0,255,65,0.15)] text-left relative z-20">
                   <CodeTyper ref={props.codeBoxRef} startDelay={1.6} />
                </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
});

Hero.displayName = 'Hero';