
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 border border-emerald-900 group-hover:border-[#d4af37]/50 transition-colors duration-500"></div>
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000" 
            alt="Valerchik and Mijas" 
            className="relative z-10 w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-10 right-10 z-20 text-right">
            <p className="font-serif-cinzel gold-text text-2xl">Valerchik & Mijas</p>
            <p className="text-xs uppercase tracking-widest text-gray-400">The Researchers</p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-xs uppercase tracking-[0.4em] gold-text font-bold">The Storytellers</h2>
          <h3 className="text-4xl md:text-5xl font-serif-cinzel leading-tight">Authenticity in a <br />Synthetic World</h3>
          
          <div className="space-y-6 text-gray-400 font-light leading-loose text-lg">
            <p>
              We began as explorers of reality, capturing the pulse of the world through our lenses. When AI arrived, we didn't see a threat—we saw a new dimension of creativity.
            </p>
            <p>
              Nasledie is our legacy. It's the intersection of high-fidelity cinematic techniques and the infinite scalability of AI. We don't just teach you how to use tools; we teach you how to infuse your digital creations with human emotion.
            </p>
            <p>
              Through our academy, we empower thousands of creators to tell stories that resonate deep within the soul, using the most powerful technology ever conceived by man.
            </p>
          </div>

          <div className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-emerald-800 flex items-center justify-center">
                <svg className="w-5 h-5 gold-text" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
              </div>
              <span className="text-sm uppercase tracking-widest font-medium">Watch our manifesto</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
