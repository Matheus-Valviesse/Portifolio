import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// ==========================================
// 1. ESTILO DO CURSOR
// ==========================================
const STYLES = `
  .simple-cursor {
    display: inline-block;
    width: 0.6em;
    height: 1em;
    background-color: #00FF41;
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: simple-blink 1s infinite;
  }

  @keyframes simple-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

// ==========================================
// 2. DADOS
// ==========================================
const CODE_DATA = [
  { t: "const", c: "text-fuchsia-500" }, 
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
  { t: " 99", c: "text-orange-400" },
  { t: ",", c: "text-white" },
  { t: "\n" },
  { 
    type: 'hanging', 
    parts: [
      { t: "  About: ", c: "text-white" },
      { t: '"Transformo ideias complexas em experiências digitais fluidas. Sou um desenvolvedor focado em criar interfaces que não apenas funcionam, mas que conectam."', c: "text-[#00FF41]" }
    ]
  },
  { t: "\n" },
  { t: "};", c: "text-yellow-400" },
];

const generateFullHTML = () => {
  let html = "";
  CODE_DATA.forEach(line => {
    if (line.t === "\n") { html += "<br/>"; return; }
    if (line.type === 'hanging' && line.parts) {
      html += `<div class="pl-[4.8rem] indent-[-4.8rem] block w-full box-border">`;
      line.parts.forEach((p: any) => html += `<span class="${p.c}">${p.t}</span>`);
      html += `</div>`;
      return;
    }
    html += `<span class="${line.c}">${line.t}</span>`;
  });
  return html;
};

// ==========================================
// 3. COMPONENTE
// ==========================================
interface CodeTyperProps {
  startDelay?: number;
}

const CodeTyper = ({ startDelay = 0 }: CodeTyperProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [canType, setCanType] = useState(false);

  // --- ANIMAÇÃO DE ENTRADA (Linha -> Caixa -> Label) ---
  useEffect(() => {
    const box = boxRef.current;
    const label = labelRef.current;
    if (!box || !label) return;

    // Configuração Inicial
    gsap.set(box, {
      opacity: 0,
      width: 0,
      height: "2px",
      border: "2px solid #00FF41", // Borda Verde
      background: "#050505",       // Fundo Preto
      padding: 0
    });
    
    gsap.set(label, { opacity: 0, y: 10 }); // Label escondida

    const tl = gsap.timeline({ delay: startDelay });

    tl
    // 1. Linha cresce horizontalmente
    .to(box, {
      opacity: 1,
      width: "100%",
      duration: 0.8,
      ease: "power2.out"
    })
    // 2. Caixa abre verticalmente
    .to(box, {
      height: "auto", // Altura automática baseada no conteúdo (ou defina 100%)
      padding: "1.5rem",
      duration: 0.6,
      ease: "power2.out"
    })
    // 3. Label "SRC_CODE" aparece
    .to(label, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      onComplete: () => setCanType(true) // Libera digitação
    });

  }, [startDelay]);

  // --- LÓGICA DE DIGITAÇÃO ---
  useEffect(() => {
    if (!canType) return;
    const element = boxRef.current;
    if (!element) return;

    const fullHTML = generateFullHTML();
    const cursorHTML = '<span class="simple-cursor"></span>';
    
    let cursorIndex = 0;
    let currentText = "";
    let isInsideTag = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeLoop = () => {
      if (cursorIndex >= fullHTML.length) {
        element.innerHTML = currentText + cursorHTML;
        return;
      }
      const char = fullHTML[cursorIndex];
      if (char === "<") isInsideTag = true;

      if (isInsideTag) {
        currentText += char;
        cursorIndex++;
        if (char === ">") isInsideTag = false;
        typeLoop();
      } else {
        currentText += char;
        cursorIndex++;
        element.innerHTML = currentText + cursorHTML;
        const randomSpeed = Math.random() * 40 + 30; 
        timeoutId = setTimeout(typeLoop, randomSpeed);
      }
    };
    timeoutId = setTimeout(typeLoop, 200);
    return () => clearTimeout(timeoutId);
  }, [canType]);

  return (
    <>
      <style>{STYLES}</style>
      
      {/* Wrapper Invisível apenas para posicionamento relativo da Label */}
      <div className="relative w-full max-w-2xl mt-4 group">
        
        {/* A ETIQUETA (LABEL) */}
        <div 
          ref={labelRef}
          className="absolute -top-6 right-0 lg:right-0 left-0 lg:left-auto mx-auto lg:mx-0 w-fit bg-[#00FF41] px-3 py-1 text-lg text-black font-pixel z-10 leading-none tracking-widest"
        >
          SRC_CODE
        </div>

        {/* A CAIXA PRINCIPAL (BoxRef) */}
        {/* Ela contém a borda, o fundo e o texto digitado */}
        <div 
          ref={boxRef}
          className="relative w-full overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.15)] text-left z-20 font-mono leading-relaxed whitespace-pre-wrap text-[16px] sm:text-[18px] lg:text-[22px]"
        >
          {/* O texto entra aqui */}
        </div>
      </div>
    </>
  );
};

export default CodeTyper;