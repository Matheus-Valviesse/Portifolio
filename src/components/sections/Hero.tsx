import React, { forwardRef, useRef } from 'react';
import CodeTyper from '../ui/hero/CodeTyper';
import { GlitchText } from '../ui/hero/GlitchText';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const HeroBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.05) 1.1px, transparent 1.1px), 
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1.1px, transparent 1.1px)
        `,
        backgroundSize: '22px 22px'
      }}
    />
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_80%,#050505_100%)]" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-700/10 rounded-full blur-[128px]" />
  </div>
);

const TerminalLoader = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="absolute z-50 flex items-center justify-center w-11/12 max-w-lg p-6 bg-[#0a0a0a] border border-[#00FF41]/30 rounded-lg shadow-[0_0_20px_rgba(0,255,65,0.15)]">
    <div className="font-mono text-[#00FF41] text-sm md:text-lg w-full">
      <span className="text-white/50">{'>'}</span> <span className="typing-text"></span><span className="animate-pulse">_</span>
    </div>
  </div>
));

const ProfileImage = forwardRef<HTMLDivElement>((props, ref) => (
 
  <div ref={ref} className="relative group w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 shrink-0 opacity-0 scale-0 z-20">
    <div className="absolute inset-0 rounded-full border-2 border-[#00FF41]/30 group-hover:border-[#00FF41] transition-colors duration-500 z-10" />
    <div className="relative w-full h-full rounded-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#00FF41]/50 animate-[scanline_3s_linear_infinite] shadow-[0_0_15px_rgba(0,255,65,0.8)] z-20" />
      <img 
        src="https://plaguedoctormasks.com/wp-content/uploads/2017/07/plague-doctor-masks.jpg" 
        alt="Profile" 
        className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 transition-all duration-700" 
      />
    </div>
  </div>
));

const AboutBox = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="w-full max-w-3xl flex flex-col items-center mt-8 opacity-0 translate-y-10 z-20">
    
    <div className="mb-6 text-center">
      <div className="text-4xl md:text-5xl lg:text-7xl font-black italic tracking-tighter">
        <GlitchText text="OLÁ, BEM VINDO(A)." />
      </div>
    </div>

    <div className="w-full text-gray-300 font-mono text-sm md:text-base leading-relaxed text-left px-4 md:px-0">
       <CodeTyper startDelay={4.2} /> 
    </div>
  </div>
));

export const Hero = forwardRef<HTMLDivElement, { codeBoxRef?: React.Ref<HTMLDivElement> }>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    const textToType = "npm run init --load-profile";
    
    tl.to({ val: 0 }, {
      val: textToType.length,
      duration: 1.5,
      ease: "none",
      onUpdate: function() {
        const el = document.querySelector('.typing-text');
        if (el) el.textContent = textToType.substring(0, Math.round(this.targets()[0].val));
      }
    });

    tl.to(terminalRef.current, { 
      scale: 0.8,
      opacity: 0, 
      duration: 0.4, 
      ease: "power2.in",
      delay: 0.5, 
      display: "none"
    });

    tl.to(imageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.4)" 
    }, "-=0.1"); 
    
    tl.to(aboutRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.8"); 

  }, { scope: containerRef });

  return (
    
    <section 
      ref={ref} 
      className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] text-white overflow-hidden font-display py-12 px-4 snap-start"
    >
      <HeroBackground />

      <div ref={containerRef} className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        
        <TerminalLoader ref={terminalRef} />
        
        <div className="flex flex-col items-center justify-center w-full">
          <ProfileImage ref={imageRef} />
          <AboutBox ref={aboutRef} />
        </div>

      </div>
    </section>
  );
});

Hero.displayName = 'Hero';