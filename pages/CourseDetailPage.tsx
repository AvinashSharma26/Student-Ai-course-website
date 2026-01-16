
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import Footer from '../components/Footer';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams();
  const { courses, addToCart, user, setLoginModalOpen } = useApp();
  const navigate = useNavigate();
  
  const course = courses.find(c => c.id === courseId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-serif-cinzel gold-text mb-4">Curriculum Not Found</h2>
        <Link to="/courses" className="px-8 py-3 border border-emerald-900 text-gray-400 uppercase tracking-widest text-[10px]">Back to Academy</Link>
      </div>
    );
  }

  const isPurchased = user?.purchasedCourses.includes(course.id);

  const handleEnroll = () => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }
    addToCart({
      courseId: course.id,
      title: course.title,
      price: course.price,
      image: course.image
    });
    navigate('/checkout');
  };

  return (
    <main className="pt-20">
      {/* Hero Header */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end pb-20 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src={course.image} 
            className="w-full h-full object-cover grayscale opacity-40" 
            alt={course.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#01120b] via-[#01120b]/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-bold block">{course.subtitle}</span>
            <h1 className="text-4xl md:text-7xl font-serif-cinzel leading-tight">{course.title}</h1>
            <div className="flex flex-wrap gap-4 pt-4">
              {course.instructors.map(name => (
                <div key={name} className="flex items-center gap-3 bg-emerald-950/40 border border-emerald-900/30 px-4 py-2">
                  <div className="w-6 h-6 rounded-full bg-[#d4af37] flex items-center justify-center text-[10px] text-black font-bold">{name[0]}</div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">{name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-4 flex flex-col gap-4">
            {isPurchased ? (
              <Link 
                to="/dashboard"
                className="w-full py-5 gold-gradient text-black font-bold uppercase text-center tracking-widest text-[11px]"
              >
                Enter Course Portal
              </Link>
            ) : (
              <button 
                onClick={handleEnroll}
                className="w-full py-5 gold-gradient text-black font-bold uppercase tracking-widest text-[11px] shadow-[0_0_30px_rgba(212,175,55,0.2)]"
              >
                Enroll for ${course.price}
              </button>
            )}
            <p className="text-[9px] uppercase tracking-widest text-gray-500 text-center">Instant Lifetime Access • Secure Checkout</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-12 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-20">
          <section className="space-y-8">
            <h2 className="text-xs uppercase tracking-[0.4em] gold-text font-bold">The Narrative</h2>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              {course.description}
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-xs uppercase tracking-[0.4em] gold-text font-bold">The Curriculum</h2>
            <div className="space-y-4">
              {course.videos.map((vid, idx) => (
                <div key={vid.id} className="group p-6 border border-emerald-900/30 bg-black/20 flex items-center gap-6 hover:border-[#d4af37]/30 transition-all">
                  <span className="text-2xl font-serif-cinzel text-emerald-900 group-hover:text-[#d4af37]/40 transition-colors">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  <div className="flex-1">
                    <h4 className="text-base md:text-lg font-serif-cinzel group-hover:gold-text transition-colors">{vid.title}</h4>
                    <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">Full HD Video • {vid.duration}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-emerald-900/50 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-[#d4af37] transition-all">
                    <svg className="w-4 h-4 gold-text" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          <div className="p-8 border border-emerald-900 bg-emerald-950/10 space-y-8">
            <h3 className="text-[10px] uppercase tracking-widest gold-text font-bold">What's Included</h3>
            <ul className="space-y-4">
              {course.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  <span>{f}</span>
                </li>
              ))}
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                <span>Private Student Community</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                <span>Regular Content Updates</span>
              </li>
            </ul>
          </div>

          <div className="p-8 border border-emerald-900 bg-black/40">
            <h3 className="text-[10px] uppercase tracking-widest gold-text font-bold mb-6">Course Status</h3>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] uppercase tracking-widest text-gray-300">Live & Available</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">Join {course.purchaseCount}+ creators already synthesizing the future.</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CourseDetailPage;
