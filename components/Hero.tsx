
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';
import { PRIMARY_COURSE } from '../constants.tsx';

const Hero: React.FC = () => {
  const { addToCart } = useApp();

  const handleBuyNow = () => {
    addToCart({
      courseId: PRIMARY_COURSE.id,
      title: PRIMARY_COURSE.title,
      price: PRIMARY_COURSE.price,
      image: PRIMARY_COURSE.image,
    });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Cinematic Video/Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_10s_infinite]"
          alt="Cinematic AI background"
        />
        <div className="absolute inset-0 emerald-overlay"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-8">
        <div className="inline-block px-4 py-1 border border-[#d4af37]/30 rounded-full mb-4">
          <span className="gold-text text-xs uppercase tracking-[0.3em]">Redefining the Future of Creation</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-serif-cinzel font-bold leading-tight tracking-tight">
          Where AI Meets <br />
          <span className="gold-text">Human Soul</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          Master the art of AI cinematic storytelling. Learn from Valerchik and Mijas how to bridge reality and the digital horizon through the power of artificial intelligence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
          <a 
            href="#course-details"
            className="group relative px-12 py-5 overflow-hidden border border-[#d4af37] text-[#d4af37] uppercase tracking-widest text-sm transition-all hover:text-black"
          >
            <div className="absolute inset-0 gold-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10">Explore the Academy</span>
          </a>
          
          <Link 
            to="/checkout"
            onClick={handleBuyNow}
            className="px-12 py-5 bg-emerald-900/40 border border-emerald-700/50 text-white uppercase tracking-widest text-sm hover:bg-emerald-800/60 transition-colors backdrop-blur-sm"
          >
            Enroll Now
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-0.5 h-16 bg-gradient-to-b from-[#d4af37] to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
