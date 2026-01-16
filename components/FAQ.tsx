
import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants.tsx';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 px-6 bg-[#01120b]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-[0.4em] gold-text mb-4 font-bold">Curiosity</h2>
          <h3 className="text-4xl font-serif-cinzel">Common Inquiries</h3>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="border border-emerald-900/30 bg-black/40 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-emerald-900/10 transition-colors"
              >
                <span className="font-serif-cinzel text-lg">{item.question}</span>
                <span className={`text-[#d4af37] transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>
              <div className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 py-6' : 'max-h-0'} px-6 border-t border-emerald-900/10`}>
                <p className="text-gray-400 font-light leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
