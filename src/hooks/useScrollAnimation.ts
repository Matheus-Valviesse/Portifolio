import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/all';

gsap.registerPlugin(Observer);

export const useScrollAnimation = (
  sections: React.RefObject<HTMLDivElement | null>[], 
  codeBoxRef: React.RefObject<HTMLDivElement | null>
) => {
  const currentIndex = useRef(0);
  const animating = useRef(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0); 

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Setup Inicial - Define quem está visível
      sections.forEach((sec, i) => {
        if (!sec.current) return;
        if (i === 0) {
            gsap.set(sec.current, { autoAlpha: 1, pointerEvents: "auto", yPercent: 0 });
        } else {
            gsap.set(sec.current, { autoAlpha: 0, pointerEvents: "none", yPercent: 100 });
        }
      });

      // 2. Intro (Hero)
      if (currentIndex.current === 0) {
          const introTl = gsap.timeline({ delay: 0.2 });
          introTl
            .from(".hero-img", { scale: 0, rotation: -15, autoAlpha: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" })
            .from(".hero-title", { y: 50, autoAlpha: 0, duration: 1, ease: "power3.out" }, "-=0.8")
            .from(".hero-desc", { x: -30, autoAlpha: 0, duration: 0.8 }, "-=0.8")
            .add(() => {
               if(codeBoxRef.current) {
                 gsap.fromTo(codeBoxRef.current, {y: 40, autoAlpha:0}, {y:0, autoAlpha:1, duration: 1, ease: "back.out(1.7)"})
               }
            }, "-=0.6")
            .from(".hero-status", { width: 0, autoAlpha: 0, duration: 0.5 }, "-=0.2");
      }

      // 3. Transição
      const gotoSection = (index: number) => {
        if (animating.current) return;
        animating.current = true;
        
        const currentRef = sections[currentIndex.current]?.current;
        const nextRef = sections[index]?.current;
        
        if (!currentRef || !nextRef) { animating.current = false; return; }

        const tl = gsap.timeline({
          defaults: { duration: 1.2, ease: "power3.inOut" },
          onComplete: () => { 
             animating.current = false; 
             currentIndex.current = index;
             setActiveSectionIndex(index); // Atualiza o React, mas NÃO reinicia este Hook
          }
        });

        const isNext = index > currentIndex.current;
        if (isNext) {
            tl.to(currentRef, { yPercent: -100, autoAlpha: 0 })
              .fromTo(nextRef, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, pointerEvents: "auto" }, "<");
        } else {
            tl.to(currentRef, { yPercent: 100, autoAlpha: 0 })
              .fromTo(nextRef, { yPercent: -100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, pointerEvents: "auto" }, "<");
        }
      };

      // 4. Observer
      Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: 1,
        onUp: () => { if (!animating.current && currentIndex.current > 0) gotoSection(currentIndex.current - 1); },
        onDown: () => { if (!animating.current && currentIndex.current < sections.length - 1) gotoSection(currentIndex.current + 1); },
        tolerance: 10,
        preventDefault: true,
      });

    });
    return () => ctx.revert();
    
    // --- CORREÇÃO FINAL ---
    // Deixe este array VAZIO []. 
    // Isso impede que o Hook rode de novo quando 'activeSectionIndex' mudar.
  }, []); 

  return { activeSectionIndex };
};