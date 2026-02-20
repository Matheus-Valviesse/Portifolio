import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GlitchTitleProps {
  text?: string;
}

export const GlitchTitle: React.FC<GlitchTitleProps> = ({ text = "MAIN STACK" }) => {
  const mainRef = useRef<HTMLHeadingElement>(null);
  const layer1Ref = useRef<HTMLHeadingElement>(null);
  const layer2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const anim1 = () => {
      if (!layer1Ref.current) return;
      
      gsap.to(layer1Ref.current, {
        duration: 5,
        clipPath: `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)`,
        ease: "none",
        onComplete: anim1
      });
    };

    const anim2 = () => {
      if (!layer2Ref.current || !mainRef.current) return;
      
      const top = Math.random() * 100;
      const bottom = Math.random() * 100;
      const oppX = (Math.random() - 0.5) * -10;
      const oppY = (Math.random() - 0.5) * -10;

      gsap.to(layer2Ref.current, {
        duration: 2,
        clipPath: `inset(${top}% 0 ${bottom}% 0)`,
        ease: "none",
        onComplete: anim2
      });

      gsap.to(mainRef.current, {
        duration: 0.15,
        textShadow: `${oppX}px ${oppY}px 0 rgba(0, 255, 65, 0.8)`,
        ease: "none"
      });
    };

    anim1();
    anim2();

    return () => {
      if (layer1Ref.current) gsap.killTweensOf(layer1Ref.current);
      if (layer2Ref.current) gsap.killTweensOf(layer2Ref.current);
      if (mainRef.current) gsap.killTweensOf(mainRef.current);
    };
  }, []);

  return (
    <div className="relative inline-block text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none select-none">
      <h1
        ref={mainRef}
        className="relative z-10 text-gray-300"
        style={{ textShadow: "4px 4px 0 rgba(0, 255, 65, 0.8)" }}
      >
        {text}
      </h1>

      <h1
        ref={layer1Ref}
        className="absolute top-0 left-[-2px] w-full h-full z-20 text-gray-300 bg-[#050505] overflow-hidden"
        style={{ textShadow: "-2px 0 #FF00FF" }}
      >
        {text}
      </h1>

      <h1
        ref={layer2Ref}
        className="absolute top-0 left-[2px] w-full h-full z-20 text-gray-300 bg-[#050505] overflow-hidden"
        style={{ textShadow: "2px 0 #00FF41" }}
      >
        {text}
      </h1>
    </div>
  );
};

export default GlitchTitle;