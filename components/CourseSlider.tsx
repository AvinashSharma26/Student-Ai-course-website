
import React, { useRef } from 'react';
import { useApp } from '../App';
import { Link } from 'react-router-dom';

const CourseSlider: React.FC = () => {
  const { courses, addToCart } = useApp();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-xs uppercase tracking-[0.4em] gold-text mb-4 font-bold">The Archives</h2>
          <h3 className="text-4xl md:text-5xl font-serif-cinzel">Explore the Academy</h3>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 border border-emerald-900 rounded-full flex items-center justify-center text-gray-500 hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 border border-emerald-900 rounded-full flex items-center justify-center text-gray-500 hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div 
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="flex-shrink-0 w-[300px] md:w-[400px] snap-start group bg-[#01120b] border border-emerald-900/30 hover:border-[#d4af37]/50 transition-all duration-500"
          >
            <Link to={`/courses/${course.id}`} className="aspect-video overflow-hidden relative block">
              <img 
                src={course.image} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                alt={course.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01120b] via-transparent to-transparent opacity-60"></div>
            </Link>
            <div className="p-8 space-y-4">
              <span className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold">{course.subtitle}</span>
              <Link to={`/courses/${course.id}`}>
                <h4 className="text-xl font-serif-cinzel gold-text">{course.title}</h4>
              </Link>
              <p className="text-gray-500 text-sm line-clamp-2 h-10">{course.description}</p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {course.instructors.map(name => (
                  <span key={name} className="text-[8px] uppercase tracking-widest bg-emerald-950 px-2 py-1 text-gray-400 border border-emerald-900">{name}</span>
                ))}
              </div>

              <div className="pt-6 flex gap-4">
                <Link 
                  to={`/courses/${course.id}`}
                  className="flex-1 py-3 border border-[#d4af37] text-[#d4af37] uppercase text-[10px] tracking-widest font-bold text-center hover:bg-[#d4af37] hover:text-black transition-all"
                >
                  View Course
                </Link>
                <button 
                  onClick={() => addToCart({
                    courseId: course.id,
                    title: course.title,
                    price: course.price,
                    image: course.image
                  })}
                  className="px-6 py-3 gold-gradient text-black font-bold uppercase text-[10px] tracking-widest hover:scale-105 transition-transform"
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseSlider;
