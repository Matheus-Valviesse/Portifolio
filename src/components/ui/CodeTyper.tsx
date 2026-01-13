import React, { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// --- ESTILOS DO CURSOR ---
const STYLES = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .cursor-blink {
    display: inline-block;
    width: 0.6em;
    height: 1.1em;
    background-color: #00FF41;
    margin-left: 2px;
    vertical-align: sub; /* Ajuste fino para alinhar na base */
    animation: blink 1s step-end infinite;
  }
`;

// --- DEFINIÇÃO DOS DADOS ---
// Adicionei um tipo "flex-block" para a linha do About
const CODE_LINES = [
  { t: "const", c: "text-[#FF00FF]" }, 
  { t: " Dev", c: "text-white" },
  { t: " =", c: "text-[#00FF41]" },
  { t: " {", c: "text-yellow-400" },
  { t: "\n" },
  { t: "  name:", c: "text-white" },
  { t: ' "Matheus B. Valviesse"', c: "text-[#00FF41]" },
  { t: ",", c: "text-white" },
  { t: "\n" },
  { t: "  role:", c: "text-white" },
  { t: ' "Software Developer"', c: "text-[#00FF41]" },
  { t: ",", c: "text-white" },
  { t: "\n" },
  { t: "  exp:", c: "text-white" },
  { t: " 99", c: "text-orange-500" },
  { t: ",", c: "text-white" },
  { t: "\n" },

  // --- MUDANÇA AQUI: BLOCO FLEX PARA O ABOUT ---
  {
    type: "flex-block", // Identificador especial
    children: [
      // LADO ESQUERDO (Label)
      { t: "  About: ", c: "text-white shrink-0 mr-2" }, 
      // LADO DIREITO (Texto que quebra bonito)
      { t: '"Transformo ideias complexas em experiências digitais fluidas. Sou um desenvolvedor focado em criar interfaces que não apenas funcionam, mas que conectam."', c: "text-[#00FF41]" }
    ]
  },
  
  { t: "\n" },
  { t: "};", c: "text-yellow-400" },
];

interface CodeTyperProps {
  startDelay?: number;
}

const CodeTyper = React.forwardRef<HTMLDivElement, CodeTyperProps>(({ startDelay = 0 }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const internalRef = (ref as React.RefObject<HTMLDivElement>) || containerRef;

  // Função auxiliar para renderizar caracteres individuais
  const renderChars = (text: string, className: string, isGhost: boolean, keyPrefix: string) => {
    return text.split("").map((char, i) => (
      <span
        key={`${keyPrefix}-${i}`}
        className={`${className} whitespace-pre-wrap`} // pre-wrap permite quebrar linha se necessário
        style={isGhost ? {} : { display: 'none' }}
        data-char="true"
      >
        {char}
      </span>
    ));
  };

  const generateElements = (isGhost: boolean) => {
    return CODE_LINES.map((line: any, lineIdx) => {
      
      // 1. SE FOR QUEBRA DE LINHA
      if (line.t === "\n") {
        return (
          <div 
            key={`br-${lineIdx}`} 
            className="basis-full h-0" 
            style={isGhost ? {} : { display: 'none' }} 
            data-char="true" // O cursor "digita" a quebra de linha também
          />
        );
      }

      // 2. SE FOR O BLOCO FLEX (O CASO DO "ABOUT")
      if (line.type === "flex-block") {
        return (
          <div key={`flex-${lineIdx}`} className="basis-full flex items-start">
             {line.children.map((child: any, childIdx: number) => (
               <div key={`child-${childIdx}`} className={child.c || ""}>
                 {renderChars(child.t, "", isGhost, `f-${lineIdx}-${childIdx}`)}
               </div>
             ))}
          </div>
        );
      }

      // 3. SE FOR LINHA COMUM
      return renderChars(line.t, line.c, isGhost, `l-${lineIdx}`);
    });
  };

  const ghostLayer = useMemo(() => generateElements(true), []);
  const activeLayer = useMemo(() => generateElements(false), []);

  useGSAP(() => {
    const activeContainer = internalRef.current?.querySelector('.active-layer');
    // O seletor pega TODOS os data-char, inclusive os que estão dentro das divs flex
    // Isso garante que a animação siga a ordem visual correta
    const chars = activeContainer?.querySelectorAll('[data-char="true"]');
    
    if (chars && chars.length > 0) {
      const tl = gsap.timeline({ delay: startDelay });

      tl.to(chars, {
        display: "inline", // Para os spans de texto
        onStart: function() {
          // Pequeno hack: Se o elemento for uma div (quebra de linha), mudamos para 'block' ou 'flex'
          if (this.targets()[0].tagName === "DIV") {
             this.targets()[0].style.display = "block"; // ou flex, mas block funciona pra quebra
          }
        },
        stagger: 0.03, // Aumentei um pouco a velocidade para texto longo não demorar tanto
        duration: 0,
      });
    }
  }, { scope: internalRef, dependencies: [startDelay] });

  return (
    <>
      <style>{STYLES}</style>

      <div ref={internalRef} className="font-pixel text-[16px] sm:text-[18px] lg:text-[26px] leading-relaxed relative w-full h-full">
        
        {/* Camada Fantasma */}
        <div className="ghost-layer flex flex-wrap content-start items-center invisible select-none" aria-hidden="true">
          {ghostLayer}
          <span className="cursor-blink opacity-0"></span>
        </div>

        {/* Camada Ativa */}
        <div className="active-layer absolute inset-0 flex flex-wrap content-start items-center">
          {activeLayer}
          <span className="cursor-blink"></span>
        </div>

      </div>
    </>
  );
});

CodeTyper.displayName = "CodeTyper";

export default CodeTyper;