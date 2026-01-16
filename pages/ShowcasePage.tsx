
import React from 'react';
import Footer from '../components/Footer';
import { SHOWCASE_VIDEOS } from '../constants.tsx';

const ShowcasePage: React.FC = () => {
  return (
    <main className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 space-y-6">
          <h1 className="text-xs uppercase tracking-[0.4em] gold-text font-bold">The Visual Archive</h1>
          <h2 className="text-4xl md:text-7xl font-serif-cinzel">Cinematic <br />Excellence</h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed italic">
            "A collection of dreams rendered into reality. Each piece is a testament to the synergy between human prompt engineering and neural network aesthetics."
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SHOWCASE_VIDEOS.map((item) => (
            <div key={item.id} className="group relative overflow-hidden bg-black/40 border border-emerald-900/30">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] uppercase tracking-widest gold-text font-bold mb-2 block">Project 0{item.id}</span>
                <h3 className="text-xl font-serif-cinzel mb-4">{item.title}</h3>
                <div className="flex gap-2">
                  <span className="text-[8px] border border-emerald-800 px-2 py-1 rounded uppercase tracking-widest text-emerald-500">Midjourney V6</span>
                  <span className="text-[8px] border border-emerald-800 px-2 py-1 rounded uppercase tracking-widest text-emerald-500">Runway Gen-2</span>
                </div>
              </div>

              <div className="absolute top-6 right-6 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md cursor-pointer hover:bg-white/10">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-40 text-center py-32 border-t border-emerald-900/20">
          <h2 className="text-3xl font-serif-cinzel mb-8 italic">"The screen is a window into a future <br />we are building frame by frame."</h2>
          <button className="px-12 py-5 border border-[#d4af37] text-[#d4af37] uppercase tracking-widest text-[10px] hover:bg-[#d4af37] hover:text-black transition-all">
            Join the Creators
          </button>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default ShowcasePage;
