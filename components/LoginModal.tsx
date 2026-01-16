
import React, { useState } from 'react';
import { useApp } from '../App';

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setLoginModalOpen, loginWithEmail, signUp } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signin') {
      loginWithEmail(email, password);
    } else {
      signUp(name, email);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-[#01120b]/95 backdrop-blur-xl"
        onClick={() => setLoginModalOpen(false)}
      ></div>
      
      <div className="relative z-10 w-full max-w-md bg-black border border-emerald-900 shadow-2xl overflow-hidden animate-fadeIn">
        <div className="flex border-b border-emerald-900/50">
          <button 
            onClick={() => setMode('signin')}
            className={`flex-1 py-4 text-[10px] uppercase tracking-[0.2em] transition-colors ${mode === 'signin' ? 'text-[#d4af37] bg-emerald-900/10 font-bold' : 'text-gray-500'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setMode('signup')}
            className={`flex-1 py-4 text-[10px] uppercase tracking-[0.2em] transition-colors ${mode === 'signup' ? 'text-[#d4af37] bg-emerald-900/10 font-bold' : 'text-gray-500'}`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-6 sm:p-10 space-y-6 sm:space-y-8">
          <div className="text-center">
            <h3 className="font-serif-cinzel text-xl sm:text-2xl gold-text mb-2">
              {mode === 'signin' ? 'Welcome Back' : 'Join the Legacy'}
            </h3>
            <p className="text-gray-500 text-[9px] sm:text-[10px] uppercase tracking-widest leading-relaxed">
              Access the future of cinematic creation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold">Full Name</label>
                <input 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-emerald-950/20 border border-emerald-900 p-3 sm:p-4 outline-none focus:border-[#d4af37] text-white text-sm"
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold">Email Address</label>
              <input 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-emerald-950/20 border border-emerald-900 p-3 sm:p-4 outline-none focus:border-[#d4af37] text-white text-sm"
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold">Password</label>
              <input 
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-emerald-950/20 border border-emerald-900 p-3 sm:p-4 outline-none focus:border-[#d4af37] text-white text-sm"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full py-4 gold-gradient text-black font-bold uppercase text-[9px] sm:text-[10px] tracking-[0.2em] hover:scale-[1.02] transition-transform mt-2">
              {mode === 'signin' ? 'Sign Into Account' : 'Create Legacy Account'}
            </button>
          </form>
        </div>

        <button 
          onClick={() => setLoginModalOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#d4af37] transition-colors p-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
