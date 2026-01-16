
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../App';
import { Video } from '../types';

const Dashboard: React.FC = () => {
  const { user, courses, updateUser, progress, toggleVideoCompletion } = useApp();
  const [activeTab, setActiveTab] = useState<'library' | 'account'>('library');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const purchasedCourses = courses.filter(c => user?.purchasedCourses.includes(c.id));
  const currentCourse = courses.find(c => c.id === activeCourseId);
  
  // Security Check: Verify if the user truly owns the course they are trying to watch
  const isAuthorizedToWatch = activeCourseId && user?.purchasedCourses.includes(activeCourseId);

  const getProgress = (courseId: string) => {
    const p = progress.find(p => p.userId === user?.id && p.courseId === courseId);
    if (!p) return 0;
    const course = courses.find(c => c.id === courseId);
    if (!course || course.videos.length === 0) return 0;
    return Math.round((p.completedVideoIds.length / course.videos.length) * 100);
  };

  const isVideoDone = (courseId: string, videoId: string) => {
    return progress.find(p => p.userId === user?.id && p.courseId === courseId)?.completedVideoIds.includes(videoId);
  };

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    
    updateUser({ name, phone });
    setSaveStatus("Profile updated successfully");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateUser({ avatar: base64String });
        setSaveStatus("Photo updated successfully");
        setTimeout(() => setSaveStatus(null), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[10px] md:text-xs uppercase tracking-[0.4em] gold-text mb-2 font-bold">Portal</h1>
          <h2 className="text-3xl md:text-4xl font-serif-cinzel uppercase tracking-tighter">My Academy</h2>
        </div>
        <div className="flex bg-black/40 border border-emerald-900/30 p-1 w-full md:w-auto overflow-x-auto">
          {['library', 'account'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 md:px-8 py-2 text-[9px] md:text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-500 hover:text-white'}`}
            >
              {tab.replace(/^\w/, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'library' && (
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-10">
          <div className="lg:col-span-4 space-y-4 md:space-y-6">
            <h3 className="text-[10px] md:text-xs uppercase tracking-widest gold-text font-bold">Course Modules</h3>
            {purchasedCourses.map(course => {
              const perc = getProgress(course.id);
              return (
                <button 
                  key={course.id}
                  onClick={() => { setActiveCourseId(course.id); setActiveVideo(course.videos[0]); }}
                  className={`w-full text-left border p-4 md:p-6 transition-all group ${activeCourseId === course.id ? 'bg-emerald-900/10 border-[#d4af37]' : 'bg-black/20 border-emerald-900/30 hover:border-emerald-700'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] uppercase tracking-widest text-emerald-500">{course.videos.length} Lectures</span>
                    <span className="text-[8px] uppercase tracking-widest gold-text">{perc}% Done</span>
                  </div>
                  <h4 className={`font-serif-cinzel text-base md:text-lg mb-3 ${activeCourseId === course.id ? 'gold-text' : 'text-gray-200'}`}>{course.title}</h4>
                  <div className="h-1 bg-emerald-950 w-full rounded-full overflow-hidden">
                    <div className="h-full bg-[#d4af37] transition-all duration-500" style={{ width: `${perc}%` }}></div>
                  </div>
                </button>
              );
            })}
            {purchasedCourses.length === 0 && (
              <div className="p-10 border border-dashed border-emerald-900 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-widest">No active enrollments found.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            {activeVideo && currentCourse && isAuthorizedToWatch ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="aspect-video bg-black border border-emerald-900/50 relative overflow-hidden group shadow-2xl">
                  {/* Security-Enhanced Video Player */}
                  <video 
                    key={activeVideo.url} 
                    src={activeVideo.url} 
                    controls 
                    className="w-full h-full" 
                    poster={currentCourse.image}
                    controlsList="nodownload" // Disable standard download button
                    disablePictureInPicture // Disable PiP (often used to extract URLs)
                    onContextMenu={(e) => e.preventDefault()} // Block right-click on video specifically
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-emerald-900/50 px-3 py-1 rounded text-[8px] uppercase tracking-widest text-emerald-500 font-bold pointer-events-none">
                    Protected Content Stream
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-emerald-900/30 pb-6">
                   <div className="space-y-1">
                      <h3 className="text-xl md:text-2xl font-serif-cinzel gold-text">{activeVideo.title}</h3>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => toggleVideoCompletion(currentCourse.id, activeVideo.id)}
                          className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 border transition-all ${isVideoDone(currentCourse.id, activeVideo.id) ? 'bg-emerald-500 text-black border-emerald-500' : 'text-gray-500 border-gray-800 hover:border-emerald-500'}`}
                        >
                          {isVideoDone(currentCourse.id, activeVideo.id) ? 'Completed' : 'Mark as Complete'}
                        </button>
                        <span className="text-[9px] uppercase tracking-widest text-gray-500">{activeVideo.duration}</span>
                      </div>
                   </div>
                </div>
                <div className="space-y-2">
                   <h4 className="text-[9px] uppercase tracking-widest gold-text font-bold mb-4">Module Selection</h4>
                   <div className="grid grid-cols-1 gap-1">
                      {currentCourse.videos.map((vid, idx) => {
                        const done = isVideoDone(currentCourse.id, vid.id);
                        return (
                          <button 
                            key={vid.id}
                            onClick={() => setActiveVideo(vid)}
                            className={`w-full flex items-center gap-4 p-4 text-left transition-all ${activeVideo.id === vid.id ? 'bg-emerald-900/30 border-l-2 border-[#d4af37] text-[#d4af37]' : 'hover:bg-emerald-900/10 text-gray-400'}`}
                          >
                            <span className="text-xs font-serif-cinzel opacity-30 w-4">{idx + 1}</span>
                            <span className={`text-sm flex-1 truncate ${done ? 'line-through opacity-40' : ''}`}>{vid.title}</span>
                            {done && <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>}
                            <span className="text-[8px] font-mono">{vid.duration}</span>
                          </button>
                        );
                      })}
                   </div>
                </div>
              </div>
            ) : (
              <div className="h-64 md:h-[500px] border border-emerald-900/20 bg-emerald-950/5 flex flex-col items-center justify-center text-center p-6 md:p-10 space-y-4">
                <div className="w-16 h-16 rounded-full border border-emerald-900 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <p className="text-gray-500 font-serif-cinzel italic text-base">Select an authorized module to begin the visual synthesis.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'account' && (
        <div className="max-w-2xl mx-auto animate-fadeIn">
          <div className="p-8 border border-emerald-900/30 bg-black/40 space-y-10">
            <div className="flex flex-col items-center gap-6 pb-10 border-b border-emerald-900/20">
              <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
                <img 
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=064e3b&color=d4af37`} 
                  className="w-32 h-32 rounded-full border-2 border-[#d4af37] p-1 object-cover transition-opacity group-hover:opacity-75" 
                  alt="Profile" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/60 rounded-full p-2">
                    <svg className="w-6 h-6 gold-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-serif-cinzel gold-text">{user?.name}</h3>
                <p className="text-xs uppercase tracking-widest text-gray-500">{user?.email}</p>
                <button 
                  onClick={handlePhotoClick}
                  className="mt-3 text-[9px] uppercase tracking-widest text-[#d4af37] hover:underline"
                >
                  Change Profile Photo
                </button>
              </div>
            </div>

            {saveStatus && (
              <div className="bg-emerald-900/20 border border-emerald-500 text-emerald-500 p-4 text-xs uppercase tracking-widest font-bold text-center">
                {saveStatus}
              </div>
            )}

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Full Identity</label>
                <input 
                  name="name"
                  defaultValue={user?.name}
                  required
                  className="w-full bg-black border border-emerald-900 p-4 outline-none focus:border-[#d4af37] text-white font-serif-cinzel"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Mobile Link (Phone)</label>
                <input 
                  name="phone"
                  defaultValue={user?.phone || ''}
                  className="w-full bg-black border border-emerald-900 p-4 outline-none focus:border-[#d4af37] text-white"
                  placeholder="+1 000 000 0000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email (System Fixed)</label>
                <input 
                  value={user?.email}
                  disabled
                  className="w-full bg-black/50 border border-emerald-900/30 p-4 text-gray-600 outline-none cursor-not-allowed"
                />
              </div>
              
              <div className="pt-4">
                <button type="submit" className="w-full py-4 gold-gradient text-black font-bold uppercase text-xs tracking-[0.2em] hover:scale-[1.02] transition-transform">
                  Commit Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
