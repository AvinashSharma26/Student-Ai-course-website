
import React, { useState } from 'react';
import { useApp } from '../App';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const CoursesPage: React.FC = () => {
  const { courses, addToCart } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'AI Cinematic', 'Music & Sound', 'Editing', 'Storytelling'];

  const filteredCourses = activeFilter === 'All' 
    ? courses 
    : courses.filter(c => c.subtitle.includes(activeFilter) || c.title.includes(activeFilter));

  return (
    <main className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16 space-y-4">
          <h1 className="text-xs uppercase tracking-[0.4em] gold-text font-bold">Academy Curriculum</h1>
          <h2 className="text-4xl md:text-5xl font-serif-cinzel">Pathways to <br />Neural Creativity</h2>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-16 pb-6 border-b border-emerald-900/20">
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${activeFilter === filter ? 'bg-[#d4af37] text-black font-bold' : 'border border-emerald-900 text-gray-500 hover:border-[#d4af37] hover:text-[#d4af37]'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCourses.map(course => (
            <div key={course.id} className="group border border-emerald-900/30 bg-black/40 flex flex-col h-full hover:border-[#d4af37]/50 transition-all duration-500">
              <Link to={`/courses/${course.id}`} className="aspect-video overflow-hidden relative">
                <img src={course.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={course.title} />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-[#d4af37]/40 px-3 py-1">
                   <span className="gold-text font-serif-cinzel text-lg">${course.price}</span>
                </div>
              </Link>
              <div className="p-8 flex-1 flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-emerald-500 mb-2 font-bold">{course.subtitle}</span>
                <Link to={`/courses/${course.id}`} className="block">
                  <h3 className="text-2xl font-serif-cinzel mb-4 group-hover:gold-text transition-colors">{course.title}</h3>
                </Link>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
                  {course.description.substring(0, 120)}...
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => addToCart({
                      courseId: course.id,
                      title: course.title,
                      price: course.price,
                      image: course.image
                    })}
                    className="flex-1 py-4 gold-gradient text-black font-bold uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-transform"
                  >
                    Enroll Now
                  </button>
                  <Link to={`/courses/${course.id}`} className="px-6 py-4 border border-emerald-800 text-gray-400 hover:text-white transition-colors flex items-center justify-center">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-32 space-y-4">
             <p className="text-gray-500 font-serif-cinzel text-xl">No courses found in this category.</p>
             <button onClick={() => setActiveFilter('All')} className="text-emerald-500 uppercase tracking-widest text-xs underline underline-offset-4">View All Modules</button>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default CoursesPage;
