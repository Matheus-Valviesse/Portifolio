import { forwardRef } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

export const Contact = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full p-4">
      <div className="p-8 md:p-12 border border-zinc-800/50 bg-zinc-900/60 backdrop-blur-xl max-w-2xl w-full text-center rounded-2xl relative overflow-hidden shadow-2xl">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"></div>
        
        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 mt-2 text-white">Let's Talk</h2>
        <p className="text-zinc-400 mb-8 font-mono text-sm md:text-base leading-relaxed">
          Tem um projeto insano? Ou apenas quer debater sobre qual a melhor <span className="text-pink-500">stack</span>? <br className="hidden md:block" /> Minha caixa de entrada está sempre aberta.
        </p>
        
        <div className="flex flex-col gap-4">
          <button className="group relative flex items-center justify-center gap-3 w-full py-4 bg-white text-black font-bold uppercase overflow-hidden rounded-lg transition-all hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
            <Mail size={20} className="relative z-10 group-hover:text-white transition-colors" />
            <span className="relative z-10 group-hover:text-white transition-colors">Enviar Email</span>
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 border border-zinc-700 text-zinc-300 rounded-lg hover:border-white hover:text-white hover:bg-white/5 transition-all">
              <Linkedin size={20} /> <span className="hidden md:inline">LinkedIn</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 border border-zinc-700 text-zinc-300 rounded-lg hover:border-white hover:text-white hover:bg-white/5 transition-all">
              <Github size={20} /> <span className="hidden md:inline">GitHub</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
});

Contact.displayName = 'Contact';