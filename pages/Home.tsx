
import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import CourseFeatures from '../components/CourseFeatures';
import CourseSlider from '../components/CourseSlider';
import Showcase from '../components/Showcase';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import OfferPopup from '../components/OfferPopup';

const Home: React.FC = () => {
  return (
    <main>
      <OfferPopup />
      <Hero />
      <AboutSection />
      
      {/* Course Slider Section */}
      <CourseSlider />

      <CourseFeatures />
      
      {/* Visual Separation / Mid-section Quote */}
      <section className="py-40 bg-fixed bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2000')" }}>
        <div className="absolute inset-0 bg-[#01120b]/90 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <svg className="w-16 h-16 gold-text mx-auto mb-8 opacity-40" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L20.017 3C21.1216 3 22.017 3.89543 22.017 5V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.98305 21L3.98305 18C3.98305 16.8954 4.87848 16 5.98305 16H8.98305C9.53533 16 9.98305 15.5523 9.98305 15V9C9.98305 8.44772 9.53533 8 8.98305 8H5.98305C4.87848 8 3.98305 7.10457 3.98305 6V3L9.98305 3C11.0876 3 11.9831 3.89543 11.9831 5V15C11.9831 18.3137 9.29672 21 5.98305 21H3.98305Z"/></svg>
          <h2 className="text-3xl md:text-5xl font-serif-cinzel italic leading-relaxed text-white">
            "Art is the only way to run away without leaving home, and AI is the vehicle that takes us to worlds we never dared to imagine."
          </h2>
        </div>
      </section>

      <Showcase />

      <section className="py-24 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-xs uppercase tracking-[0.4em] gold-text mb-12 font-bold">As Seen On</h2>
          <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="font-serif-cinzel text-2xl font-bold">VOGUE</div>
             <div className="font-serif-cinzel text-2xl font-bold">TECHCRUNCH</div>
             <div className="font-serif-cinzel text-2xl font-bold">BEHANCE</div>
             <div className="font-serif-cinzel text-2xl font-bold">ARTSTATION</div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Final Call to Action Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-black p-16 relative overflow-hidden text-center group">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif-cinzel mb-8 leading-tight">Begin Your <span className="gold-text">Creation Journey</span> Today</h2>
            <p className="text-emerald-100/60 text-lg mb-12 leading-relaxed">
              Don't just watch the future happen. Build it. Join the elite academy of AI cinematographers.
            </p>
            <button className="px-12 py-5 gold-gradient text-black font-bold uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-1">
              Enroll in the AI Course
            </button>
            <p className="mt-8 text-[10px] uppercase tracking-widest text-emerald-400">Secure payment via Razorpay • Instant Lifetime Access</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
