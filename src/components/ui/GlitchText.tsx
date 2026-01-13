import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLParagraphElement>(null); // Texto principal (Branco)
  const textRef2 = useRef<HTMLParagraphElement>(null); // Camada Vermelha (Skew)
  const textRef3 = useRef<HTMLParagraphElement>(null); // Camada Ciano (Glitch)

  useGSAP(() => {
    const duration = 7; //                                           3s igual ao CSS original

    // 1. Animação da Camada Vermelha (baseada em skewAnim)
    // O CSS original tem pausas longas, então usamos keyframes precisos
    gsap.to(textRef2.current, {
      keyframes: {
        "0%":   { skewX: 0, skewY: 0, x: 0, y: 0 },
        "20%":  { skewX: 0, skewY: 0, x: 0, y: 0 },
        "23%":  { skewX: 5, skewY: -5, x: 10, y: 5 }, // CSS: skew(5deg, -5deg) translate(10px, 5px)
        "24%":  { skewX: 0, skewY: 0, x: 0, y: 0 },
        "40%":  { skewX: 0, skewY: 0, x: 0, y: 0 },
        "43%":  { skewX: 5, skewY: -10, x: -5, y: 2 }, // CSS: skew(5deg, -10deg) translate(-5px, 2px)
        "44%":  { skewX: 0, skewY: 0, x: 0, y: 0 },
        "100%": { skewX: 0, skewY: 0, x: 0, y: 0 },
      },
      duration: duration,
      repeat: -1,
      ease: "none"
    });

    // 2. Animação da Camada Ciano (baseada em glitchAnim2)
    gsap.to(textRef3.current, {
      keyframes: {
        "0%":   { x: 0, y: 0 },
        "7%":   { x: 0, y: 0 },
        "10%":  { x: -6, y: 2 },
        "13%":  { x: 0, y: 0 },
        "20%":  { x: 0, y: 0 },
        "23%":  { x: 12, y: 7 },
        "24%":  { x: 0, y: 0 },
        "40%":  { x: 0, y: 0 },
        "43%":  { x: -10, y: 9 },
        "45%":  { x: 0, y: 0 },
        "65%":  { x: 0, y: 0 },
        "68%":  { x: -7, y: 5 },
        "69%":  { x: 0, y: 0 },
        "100%": { x: 0, y: 0 },
      },
      duration: duration,
      repeat: -1,
      ease: "none"
    });

    // 3. Animação da Camada Branca/Principal (baseada em glitchAnim1)
    gsap.to(textRef1.current, {
      keyframes: {
        "0%":   { x: 0, y: 0 },
        "7%":   { x: 0, y: 0 },
        "10%":  { x: 6, y: -2 },
        "13%":  { x: 0, y: 0 },
        "20%":  { x: 0, y: 0 },
        "23%":  { x: -12, y: -7 },
        "24%":  { x: 0, y: 0 },
        "40%":  { x: 0, y: 0 },
        "43%":  { x: 10, y: -9 },
        "44%":  { x: 0, y: 0 },
        "65%":  { x: 0, y: 0 },
        "68%":  { x: 7, y: 5 },
        "69%":  { x: 0, y: 0 },
        "100%": { x: 0, y: 0 },
      },
      duration: duration,
      repeat: -1,
      ease: "none"
    });

  }, { scope: containerRef });

  // Estilos base compartilhados
  const baseStyles = "absolute top-0 left-0 w-full h-full font-bold select-none leading-[1.1]";
  
  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Texto invisível para ocupar espaço relativo */}
      <span className="invisible font-bold leading-[1.1]">{text}</span>
      
      {/* Camada 2: Vermelho (atrás) */}
      <p ref={textRef2} className={`${baseStyles} text-[#f03e3e] opacity-90 mix-blend-screen`}>
        {text}
      </p>

      {/* Camada 3: Ciano (atrás) */}
      <p ref={textRef3} className={`${baseStyles} text-[#3df0cf] opacity-90 mix-blend-screen`}>
        {text}
      </p>

      {/* Camada 1: Branco (Frente) */}
      <p ref={textRef1} className={`${baseStyles} text-white opacity-90 `}>
        {text}
      </p>
      
    </div>
  );
};