import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import StoryPage from './pages/StoryPage';
import ShowcasePage from './pages/ShowcasePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import LegalPage from './pages/LegalPage';
import { CartItem, User, Course, Offer, UserProgress } from './types';
import { INITIAL_COURSES } from './constants.tsx';

interface AppContextType {
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  offers: Offer[];
  addOffer: (offer: Offer) => void;
  toggleOffer: (id: string) => void;
  deleteOffer: (id: string) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  user: User | null;
  loginWithEmail: (email: string, pass: string) => void;
  signUp: (name: string, email: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  enrollInCourse: (courseId: string) => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  progress: UserProgress[];
  toggleVideoCompletion: (courseId: string, videoId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('nasledie_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });
  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem('nasledie_offers');
    return saved ? JSON.parse(saved) : [];
  });
  const [progress, setProgress] = useState<UserProgress[]>(() => {
    const saved = localStorage.getItem('nasledie_progress');
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nasledie_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => localStorage.setItem('nasledie_courses', JSON.stringify(courses)), [courses]);
  useEffect(() => localStorage.setItem('nasledie_offers', JSON.stringify(offers)), [offers]);
  useEffect(() => localStorage.setItem('nasledie_progress', JSON.stringify(progress)), [progress]);
  useEffect(() => localStorage.setItem('nasledie_user', JSON.stringify(user)), [user]);

  const addCourse = (course: Course) => setCourses(prev => [...prev, course]);
  const updateCourse = (updatedCourse: Course) => setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  const deleteCourse = (id: string) => setCourses(prev => prev.filter(c => c.id !== id));
  const addOffer = (offer: Offer) => setOffers(prev => [...prev, offer]);
  const toggleOffer = (id: string) => setOffers(prev => prev.map(o => o.id === id ? { ...o, isActive: !o.isActive } : o));
  const deleteOffer = (id: string) => setOffers(prev => prev.filter(o => o.id !== id));

  const toggleVideoCompletion = (courseId: string, videoId: string) => {
    if (!user) return;
    setProgress(prev => {
      const existing = prev.find(p => p.userId === user.id && p.courseId === courseId);
      if (existing) {
        const alreadyCompleted = existing.completedVideoIds.includes(videoId);
        return prev.map(p => {
          if (p.userId === user.id && p.courseId === courseId) {
            return {
              ...p,
              completedVideoIds: alreadyCompleted 
                ? p.completedVideoIds.filter(id => id !== videoId)
                : [...p.completedVideoIds, videoId]
            };
          }
          return p;
        });
      } else {
        return [...prev, { userId: user.id, courseId, completedVideoIds: [videoId] }];
      }
    });
  };

  const addToCart = (item: CartItem) => {
    if (!cart.find(c => c.courseId === item.courseId)) setCart([...cart, item]);
  };
  const removeFromCart = (courseId: string) => setCart(cart.filter(item => item.courseId !== courseId));
  const clearCart = () => setCart([]);

  const loginWithEmail = (email: string, pass: string) => {
    const isAdmin = email === 'bittusha411@gmail.com' && pass === 'admin@123';
    const mockUser: User = {
      id: isAdmin ? 'admin-1' : 'e-' + Math.random().toString(36).substr(2, 9),
      name: isAdmin ? 'Master Admin' : email.split('@')[0],
      email: email,
      purchasedCourses: [],
      isAdmin: isAdmin
    };
    setUser(mockUser);
    setLoginModalOpen(false);
  };

  const signUp = (name: string, email: string) => {
    const mockUser: User = {
      id: 's-' + Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      purchasedCourses: [],
      isAdmin: false
    };
    setUser(mockUser);
    setLoginModalOpen(false);
  };

  const logout = () => setUser(null);
  const updateUser = (data: Partial<User>) => user && setUser({ ...user, ...data });
  const enrollInCourse = (courseId: string) => {
    if (user) {
      setUser({ ...user, purchasedCourses: Array.from(new Set([...user.purchasedCourses, courseId])) });
      setCourses(prev => prev.map(c => c.id === courseId ? { ...c, purchaseCount: (c.purchaseCount || 0) + 1 } : c));
    }
  };

  return (
    <AppContext.Provider value={{ 
      courses, addCourse, updateCourse, deleteCourse, offers, addOffer, toggleOffer, deleteOffer,
      cart, addToCart, removeFromCart, clearCart, user, loginWithEmail, signUp, logout, updateUser, enrollInCourse,
      isLoginModalOpen, setLoginModalOpen, progress, toggleVideoCompletion
    }}>
      <Router>
        <div className="min-h-screen bg-[#01120b] selection:bg-[#d4af37] selection:text-black font-sans">
          <Navbar />
          <LoginModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/legal/:policy" element={<LegalPage />} />
            <Route path="/dashboard" element={user ? (user.isAdmin ? <Navigate to="/admin" /> : <Dashboard />) : <Navigate to="/" />} />
            <Route path="/admin" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;