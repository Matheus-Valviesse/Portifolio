import React, { useState, useEffect, forwardRef } from 'react';
import { CODE_TOKENS } from '../../data/constants';

const fullTextLength = CODE_TOKENS.reduce((acc, token) => acc + token.text.length, 0);

const CodeTyper = forwardRef<HTMLDivElement>((props, ref) => {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [shouldType, setShouldType] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setShouldType(true), 2200);
    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (!shouldType) return;
    const interval = setInterval(() => {
      setDisplayedChars((prev) => {
        if (prev >= fullTextLength) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [shouldType]);

  const renderCode = () => {
    let currentCount = 0;
    return CODE_TOKENS.map((token, index) => {
      if (currentCount >= displayedChars) return null;
      const sliceEnd = displayedChars - currentCount;
      const content = token.text.slice(0, sliceEnd);
      currentCount += token.text.length;
      return <span key={index} className={`${token.color}`}>{content}</span>;
    });
  };

  return (
    <div 
      ref={ref} 
      className="w-full max-w-lg bg-[#1e1e1e]/90 backdrop-blur-md rounded-xl border border-zinc-700/50 shadow-2xl overflow-hidden h-56 md:h-72 flex items-start relative group transition-all duration-300 hover:border-pink-500/30 opacity-0"
    >
      <div className="absolute top-0 left-0 w-full h-8 bg-[#252526] flex items-center gap-2 px-4 border-b border-zinc-800 z-10">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <span className="ml-2 text-xs text-zinc-500 font-mono">portfolio.tsx</span>
      </div>
      <pre className="font-mono text-sm md:text-xl p-6 pt-12 md:pt-14 text-left w-full overflow-x-auto leading-relaxed scrollbar-hide">
        <code>
          {renderCode()}
          <span className="animate-pulse text-pink-500 font-bold">|</span>
        </code>
      </pre>
    </div>
  );
});

CodeTyper.displayName = 'CodeTyper';
export default CodeTyper;