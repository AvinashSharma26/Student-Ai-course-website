
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { Link } from 'react-router-dom';

const OfferPopup: React.FC = () => {
  const { offers, courses, addToCart } = useApp();
  const [activeOffer, setActiveOffer] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const liveOffer = offers.find(o => o.isActive);
    if (liveOffer) {
      setActiveOffer(liveOffer);
      // Delay showing the popup slightly for effect
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [offers]);

  if (!activeOffer || !isVisible) return null;

  const course = courses.find(c => c.id === activeOffer.courseId);

  const handleClaim = () => {
    if (course) {
      addToCart({
        courseId: course.id,
        title: course.title,
        price: course.price,
        image: course.image
      });
      setIsVisible(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fadeIn">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsVisible(false)}
      ></div>
      
      <div className="relative z-10 w-full max-w-lg bg-emerald-950 border border-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 -mr-16 -mt-16 rounded-full"></div>
        
        <div className="p-10 text-center space-y-6">
          <div className="inline-block px-3 py-1 border border-[#d4af37] rounded-full">
            <span className="text-[10px] gold-text uppercase tracking-widest font-bold">Special Legacy Offer</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif-cinzel gold-text">{activeOffer.title}</h2>
          
          <p className="text-gray-300 font-light leading-relaxed">
            {activeOffer.description}
          </p>
          
          {course && (
            <div className="py-4 border-y border-emerald-900/50">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Exclusive for</p>
              <p className="font-serif-cinzel text-xl">{course.title}</p>
            </div>
          )}

          <div className="flex flex-col gap-4 pt-4">
            <Link 
              to="/checkout"
              onClick={handleClaim}
              className="w-full py-4 gold-gradient text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:scale-105 transition-transform"
            >
              Claim This Offer
            </Link>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-[9px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
            >
              Dismiss for now
            </button>
          </div>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#d4af37] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
};

export default OfferPopup;
