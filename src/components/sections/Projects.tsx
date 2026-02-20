import { forwardRef } from 'react';
import { MousePointer2 } from 'lucide-react';
import { PROJECTS } from '../../data/constants';

export const Projects = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full">
      <div className="container mx-auto px-4 max-w-6xl w-full">
        <h2 className="text-3xl md:text-7xl uppercase mb-6 md:mb-12 text-center text-tv font-sans font-bold " data-text="Selected Works">
          Selected <span className=" text-[#00FF41]">Works</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-[#00ff40] transition-all duration-500 cursor-pointer overflow-hidden h-40 md:h-70 shadow-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]">
              
              {/* Overlay de fundo */}
              <div className="absolute inset-0 bg-zinc-800 transition-transform duration-700 group-hover:scale-110"></div>
              
              {/* Conteúdo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-xl md:text-2xl font-bold uppercase text-white">{project.title}</h3>
                      <p className="text-zinc-400 text-xs md:text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                        {project.desc}
                      </p>
                      <span className="text-[12px] text-[#00ff40] font-mono mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        [ {project.techs} ]
                      </span>
                  </div>
                  
                  {/* Ícone de seta */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ">
                      <MousePointer2 className="text-[#00ff40] rotate-90" size={20} />
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';