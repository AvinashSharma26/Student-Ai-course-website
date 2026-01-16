
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../App';

const Navbar: React.FC = () => {
  const { cart, user, setLoginModalOpen, logout } = useApp();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Academy', path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'The Story', path: '/story' },
    { label: 'Showcase', path: '/showcase' },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#01120b]/90 backdrop-blur-md border-b border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
          <div className="w-8 h-8 md:w-10 md:h-10 border border-[#d4af37] rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="gold-text font-serif-cinzel font-bold text-sm md:text-base">N</span>
          </div>
          <span className="font-serif-cinzel text-lg md:text-xl font-bold tracking-widest uppercase gold-text">Nasledie</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-[10px] tracking-[0.2em] uppercase hover:text-[#d4af37] transition-colors ${location.pathname === link.path ? 'text-[#d4af37]' : 'text-gray-400'}`}
            >
              {link.label}
            </Link>
          ))}
          {user?.isAdmin && (
            <Link 
              to="/admin" 
              className={`text-[10px] tracking-[0.2em] uppercase hover:text-[#d4af37] transition-colors ${location.pathname === '/admin' ? 'text-[#d4af37]' : 'text-emerald-500 font-bold'}`}
            >
              Command Center
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/checkout" className="relative group p-2" onClick={closeMobileMenu}>
            <svg className="w-5 h-5 text-gray-300 group-hover:text-[#d4af37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#d4af37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3 md:gap-4">
              <Link to={user.isAdmin ? "/admin" : "/dashboard"} className="w-8 h-8 rounded-full overflow-hidden border border-[#d4af37]" onClick={closeMobileMenu}>
                <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt="Avatar" className="w-full h-full object-cover" />
              </Link>
              <button onClick={() => { logout(); closeMobileMenu(); }} className="hidden sm:block text-[9px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors border border-gray-800 px-3 py-1">Logout</button>
            </div>
          ) : (
            <button 
              onClick={() => setLoginModalOpen(true)}
              className="px-4 md:px-5 py-2 border border-[#d4af37] text-[#d4af37] text-[10px] uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all flex items-center gap-2"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-gray-400 hover:text-[#d4af37]" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen border-b border-emerald-900/50' : 'max-h-0'}`}>
        <div className="bg-[#01120b] px-6 py-8 flex flex-col gap-6">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-xs tracking-[0.2em] uppercase ${location.pathname === link.path ? 'text-[#d4af37]' : 'text-gray-400'}`}
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          {user?.isAdmin && (
            <Link 
              to="/admin" 
              className={`text-xs tracking-[0.2em] uppercase text-emerald-500 font-bold`}
              onClick={closeMobileMenu}
            >
              Command Center
            </Link>
          )}
          {user && !user.isAdmin && (
             <Link 
             to="/dashboard" 
             className={`text-xs tracking-[0.2em] uppercase text-[#d4af37] font-bold`}
             onClick={closeMobileMenu}
           >
             Student Dashboard
           </Link>
          )}
          {user && (
            <button onClick={() => { logout(); closeMobileMenu(); }} className="text-left text-xs tracking-[0.2em] uppercase text-red-900">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
