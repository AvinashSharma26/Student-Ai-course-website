
import React from 'react';
import Footer from '../components/Footer';

const StoryPage: React.FC = () => {
  return (
    <main className="pt-20">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30"
            alt="The Creators"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#01120b]/50 to-[#01120b]"></div>
        </div>
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-5xl md:text-8xl font-serif-cinzel gold-text">The Genesis</h1>
          <p className="text-xs uppercase tracking-[0.6em] text-gray-400">Authenticity in a Synthetic Era</p>
        </div>
      </section>

      <section className="py-24 px-6 max-w-4xl mx-auto space-y-24">
        <div className="space-y-8">
          <h2 className="text-3xl font-serif-cinzel border-l-4 border-[#d4af37] pl-8">Two Brothers, One Vision</h2>
          <p className="text-lg text-gray-300 leading-relaxed font-light">
            Valerchik and Mijas didn't start in a lab or a tech hub. They started in the mountains, in the streets, and in the quiet moments of the dawn where reality feels most vibrant. As seasoned cinematographers, they spent a decade perfecting the "Human Eye" look—the subtle imperfections that make a video feel real.
          </p>
          <div className="grid grid-cols-2 gap-4 h-96">
            <img src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover rounded-lg" alt="Photography" />
            <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover rounded-lg" alt="AI Experiments" />
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-serif-cinzel border-l-4 border-[#d4af37] pl-8">The AI Paradox</h2>
          <p className="text-lg text-gray-300 leading-relaxed font-light">
            When Artificial Intelligence emerged, the creative world panicked. But Valerchik and Mijas saw a paradox: the more digital we become, the more we crave the human touch. They developed a unique methodology that uses AI as a high-speed brush to paint stories rooted in real human experience. 
          </p>
          <blockquote className="p-12 border border-emerald-900 bg-emerald-950/20 italic text-2xl font-serif-cinzel text-[#d4af37] text-center">
            "Nasledie is not about the software. It is about the soul we breathe into the machine."
          </blockquote>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-serif-cinzel border-l-4 border-[#d4af37] pl-8">The Legacy (Nasledie)</h2>
          <p className="text-lg text-gray-300 leading-relaxed font-light">
            Nasledie translates to "Legacy." This platform was built to ensure that as storytelling evolves into the AI age, the cinematic heritage of the past isn't lost. We teach the next generation of digital artists to respect the light, the shadow, and the narrative, regardless of the tools they use.
          </p>
        </div>
      </section>

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <span className="text-5xl font-serif-cinzel gold-text">50k+</span>
            <p className="text-xs uppercase tracking-widest text-gray-500">Community Members</p>
          </div>
          <div className="space-y-4">
            <span className="text-5xl font-serif-cinzel gold-text">120+</span>
            <p className="text-xs uppercase tracking-widest text-gray-500">Countries Reached</p>
          </div>
          <div className="space-y-4">
            <span className="text-5xl font-serif-cinzel gold-text">10m+</span>
            <p className="text-xs uppercase tracking-widest text-gray-500">Visual Impressions</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default StoryPage;
