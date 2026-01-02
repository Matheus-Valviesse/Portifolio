import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/all';

gsap.registerPlugin(Observer);

export const useScrollAnimation = (
  sections: React.RefObject<HTMLDivElement | null>[] , 
  codeBoxRef: React.RefObject<HTMLDivElement>
) => {
  const currentIndex = useRef(0);
  const animating = useRef(false);
  // Estado para forçar re-render e avisar as seções qual está ativa (útil para animações internas)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0); 

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Setup Inicial
      sections?.forEach((sec, i) => {
        if (i === 0) gsap.set(sec.current, { autoAlpha: 1, pointerEvents: "auto" });
        else gsap.set(sec.current, { autoAlpha: 0, pointerEvents: "none" });
      });
dasdadsad
      // 2. Animação Intro (Hero)
      const introTl = gsap.timeline({ delay: 0.2 });
      introTl
        .from(".hero-img", { scale: 0, rotation: -15, autoAlpha: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" })
        .from(".hero-title", { y: 50, autoAlpha: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .from(".hero-desc", { x: -30, autoAlpha: 0, duration: 0.8 }, "-=0.8")
        .fromTo(codeBoxRef.current, 
          { y: 40, autoAlpha: 0, scale: 0.95 }, 
          { y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, "-=0.6"
        )
        .from(".hero-status", { width: 0, autoAlpha: 0, duration: 0.5 }, "-=0.2");

      // 3. Função de Transição
      const gotoSection = (index: number) => {
        console.log(index)
        if (animating.current) return;
        animating.current = true;
        const currentRef = sections?.[currentIndex.current].current;
        const nextRef = sections?.[index].current;
        
        const tl = gsap.timeline({
          defaults: { duration: 1.2, ease: "power3.inOut" },
          onComplete: () => { 
             animating.current = false; 
             currentIndex.current = index;
             setActiveSectionIndex(index);
          }
        });

        // Lógica simplificada de transição baseada na direção (Index novo vs Index velho)
        const isNext = index > currentIndex.current;
        
        // Exemplo genérico de transição (pode ser customizado por case como no original)
        if (isNext) {
          console.log(isNext)
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
        onUp: () => { if (currentIndex.current > 0) gotoSection(currentIndex.current - 1); },
        onDown: () => { if (currentIndex.current < sections.length - 1) gotoSection(currentIndex.current + 1); },
        tolerance: 10,
        preventDefault: true,
      });

    });
    return () => ctx.revert();
  }, []);

  return { activeSectionIndex };
};