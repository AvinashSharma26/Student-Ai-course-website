
import React from 'react';
import { SHOWCASE_VIDEOS } from '../constants.tsx';

const Showcase: React.FC = () => {
  return (
    <section id="showcase" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] gold-text mb-4 font-bold">The Creations</h2>
            <h3 className="text-4xl md:text-5xl font-serif-cinzel">Cinematic Horizons</h3>
          </div>
          <p className="text-gray-500 max-w-md text-sm italic">
            "Every pixel is a brushstroke. Every frame is a narrative. This is the new age of digital painting."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SHOWCASE_VIDEOS.map((item) => (
            <div key={item.id} className="relative aspect-[9/16] overflow-hidden group">
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-serif-cinzel text-white text-lg">{item.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-8 h-px bg-[#d4af37]"></div>
                  <span className="text-[10px] uppercase tracking-widest gold-text">AI Generation</span>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/30 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 backdrop-blur-sm cursor-pointer hover:bg-white/10">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
