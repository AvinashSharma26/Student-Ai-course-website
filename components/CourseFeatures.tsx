
import React from 'react';
import { useApp } from '../App';
import { PRIMARY_COURSE } from '../constants.tsx';
import { useNavigate } from 'react-router-dom';

const CourseFeatures: React.FC = () => {
  const { addToCart } = useApp();
  const navigate = useNavigate();

  const handleEnroll = () => {
    addToCart({
      courseId: PRIMARY_COURSE.id,
      title: PRIMARY_COURSE.title,
      price: PRIMARY_COURSE.price,
      image: PRIMARY_COURSE.image,
    });
    navigate('/checkout');
  };

  return (
    <section id="course-details" className="py-32 px-6 bg-emerald-950/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.4em] gold-text mb-4 font-bold">The Curriculum</h2>
          <h3 className="text-4xl md:text-5xl font-serif-cinzel">Artistic Mastery Modules</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRIMARY_COURSE.features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-10 border border-emerald-900/30 bg-[#01120b]/50 hover:border-[#d4af37]/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-900/10 -mr-12 -mt-12 rounded-full group-hover:bg-[#d4af37]/10 transition-colors"></div>
              <span className="text-4xl font-serif-cinzel text-emerald-900 mb-6 block group-hover:text-[#d4af37]/30 transition-colors">0{idx + 1}</span>
              <h4 className="text-xl font-serif-cinzel mb-4 group-hover:gold-text transition-colors">{feature}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Comprehensive training focusing on {feature.toLowerCase()} through hands-on practical assignments and real-world project files.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 border border-[#d4af37]/20 bg-gradient-to-r from-emerald-950 to-black text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h4 className="text-3xl font-serif-cinzel mb-4 relative z-10">Ready to start your legacy?</h4>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto relative z-10">Join over 5,000 students worldwide who are already redefining visual storytelling with our AI workflows.</p>
          <button 
            onClick={handleEnroll}
            className="relative z-10 px-10 py-4 gold-gradient text-black font-bold uppercase text-xs tracking-[0.2em] hover:scale-105 transition-transform"
          >
            Enroll for ${PRIMARY_COURSE.price}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseFeatures;
