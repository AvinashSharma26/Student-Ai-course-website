
import React, { useState } from 'react';
import { useApp } from '../App';
import { CheckoutStep } from '../types';
import { Link } from 'react-router-dom';

const COUNTRIES = [
  "United States", "India", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "Brazil", "Russia", "Other"
];

const Checkout: React.FC = () => {
  const { cart, removeFromCart, clearCart, enrollInCourse, user, setLoginModalOpen } = useApp();
  const [step, setStep] = useState<CheckoutStep>(CheckoutStep.CART);
  const [isProcessing, setIsProcessing] = useState(false);
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleNext = () => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }
    if (step === CheckoutStep.CART) {
      setStep(CheckoutStep.DETAILS);
    } else if (step === CheckoutStep.DETAILS) {
      if (!phone || !country) {
        setValidationError("All student nodes must be verified. Please fill all fields.");
        return;
      }
      setValidationError('');
      setStep(CheckoutStep.PAYMENT);
    }
  };

  const simulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      cart.forEach(item => enrollInCourse(item.courseId));
      setIsProcessing(false);
      setStep(CheckoutStep.SUCCESS);
      clearCart();
    }, 2000);
  };

  if (cart.length === 0 && step !== CheckoutStep.SUCCESS) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-serif-cinzel mb-4">Your selection is empty.</h2>
        <Link to="/courses" className="px-8 py-4 border border-[#d4af37] text-[#d4af37] uppercase tracking-widest text-xs">Browse Curriculum</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-16 relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-emerald-900/30 z-0"></div>
        {[CheckoutStep.CART, CheckoutStep.DETAILS, CheckoutStep.PAYMENT, CheckoutStep.SUCCESS].map((s, idx) => (
          <div key={s} className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs bg-black ${step === s ? 'border-[#d4af37] text-[#d4af37]' : 'border-emerald-900 text-gray-700'}`}>
              {idx + 1}
            </div>
            <span className={`mt-2 text-[10px] uppercase tracking-widest font-bold ${step === s ? 'text-[#d4af37]' : 'text-gray-600'}`}>{s}</span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-12 text-left">
        <div className="md:col-span-2 space-y-8">
          {step === CheckoutStep.CART && (
            <div className="space-y-6">
              <h3 className="text-2xl font-serif-cinzel gold-text">Cart Summary</h3>
              {cart.map(item => (
                <div key={item.courseId} className="flex gap-6 p-6 border border-emerald-900/30 bg-emerald-950/10">
                  <img src={item.image} className="w-24 h-24 object-cover" />
                  <div className="flex-1">
                    <h4 className="font-serif-cinzel text-lg">{item.title}</h4>
                    <button onClick={() => removeFromCart(item.courseId)} className="text-[10px] uppercase text-red-900 mt-4 font-bold">Remove</button>
                  </div>
                  <p className="font-serif-cinzel text-[#d4af37] text-xl">${item.price}</p>
                </div>
              ))}
            </div>
          )}

          {step === CheckoutStep.DETAILS && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-2xl font-serif-cinzel gold-text">Student Verification</h3>
              {validationError && <p className="text-red-500 text-[10px] uppercase font-bold bg-red-950/20 p-3 border border-red-900">{validationError}</p>}
              <div className="space-y-6">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Phone Axis</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-transparent border border-emerald-900 p-4 focus:border-[#d4af37] outline-none text-sm text-white" placeholder="+1..." />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Geographic Region</label>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} className="bg-[#01120b] border border-emerald-900 p-4 focus:border-[#d4af37] outline-none text-sm text-gray-300">
                    <option value="">Select Origin</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === CheckoutStep.PAYMENT && (
            <div className="space-y-6 animate-fadeIn text-center py-10">
              <h3 className="text-2xl font-serif-cinzel gold-text">Razorpay Synchronization</h3>
              <p className="text-gray-400 text-sm">Initializing encrypted link to Razorpay Secure Core...</p>
              <div className="p-8 border border-[#d4af37]/30 bg-black/40 rounded-xl">
                 <button onClick={simulatePayment} disabled={isProcessing} className="w-full py-5 gold-gradient text-black font-bold uppercase text-xs tracking-[0.2em]">{isProcessing ? 'Syncing...' : 'Authorize Transaction'}</button>
              </div>
            </div>
          )}

          {step === CheckoutStep.SUCCESS && (
            <div className="text-center py-10 space-y-6 animate-fadeIn">
              <h3 className="text-4xl font-serif-cinzel gold-text">Legacy Initiated</h3>
              <p className="text-gray-400">Welcome to the Academy. Your synthesis begins now.</p>
              <Link to="/dashboard" className="px-10 py-4 gold-gradient text-black font-bold uppercase text-xs inline-block">Command Dashboard</Link>
            </div>
          )}
        </div>

        {step !== CheckoutStep.SUCCESS && (
          <div className="p-8 border border-emerald-900 bg-emerald-950/20 h-fit">
            <h4 className="text-[10px] uppercase tracking-widest gold-text font-bold mb-6">Investment</h4>
            <div className="flex justify-between items-end mb-8">
              <span className="text-[10px] uppercase text-gray-500">Total USD</span>
              <span className="text-3xl font-serif-cinzel gold-text">${cart.reduce((acc, curr) => acc + curr.price, 0)}</span>
            </div>
            {step !== CheckoutStep.PAYMENT && (
              <button onClick={handleNext} className="w-full py-4 bg-[#d4af37] text-black font-bold uppercase text-[10px] tracking-widest">Continue Selection</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
