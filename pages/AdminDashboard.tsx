
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { Course, Video, Offer } from '../types';

const AdminDashboard: React.FC = () => {
  const { courses, addCourse, updateCourse, deleteCourse, offers, addOffer, toggleOffer, deleteOffer } = useApp();
  const [activePanel, setActivePanel] = useState<'courses' | 'offers'>('courses');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newPrice, setNewPrice] = useState(199);
  const [newDesc, setNewDesc] = useState('');
  const [newImg, setNewImg] = useState('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e');
  
  const [instructorInput, setInstructorInput] = useState('');
  const [instructors, setInstructors] = useState<string[]>([]);
  
  const [lectureTitle, setLectureTitle] = useState('');
  const [lectureUrl, setLectureUrl] = useState('');
  const [lectureDuration, setLectureDuration] = useState('10:00');
  const [tempVideos, setTempVideos] = useState<Video[]>([]);

  const [offerTitle, setOfferTitle] = useState('');
  const [offerDesc, setOfferDesc] = useState('');

  // Handle Edit Logic
  const startEdit = (course: Course) => {
    setIsEditing(course.id);
    setNewTitle(course.title);
    setNewSubtitle(course.subtitle);
    setNewPrice(course.price);
    setNewDesc(course.description);
    setNewImg(course.image);
    setInstructors(course.instructors || []);
    setTempVideos(course.videos);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddInstructor = () => {
    if (instructorInput.trim() && !instructors.includes(instructorInput.trim())) {
      setInstructors([...instructors, instructorInput.trim()]);
      setInstructorInput('');
    }
  };

  const handleRemoveInstructor = (name: string) => {
    setInstructors(instructors.filter(i => i !== name));
  };

  const handleAddLecture = () => {
    if (lectureTitle && lectureUrl) {
      setTempVideos([...tempVideos, { id: `v-${Date.now()}`, title: lectureTitle, url: lectureUrl, duration: lectureDuration }]);
      setLectureTitle(''); setLectureUrl(''); setLectureDuration('10:00');
    }
  };

  const handlePublishOrUpdate = () => {
    if (!newTitle || tempVideos.length === 0) return alert("Missing data.");
    
    const courseData: Course = {
      id: isEditing || `c-${Date.now()}`,
      title: newTitle,
      subtitle: newSubtitle,
      description: newDesc,
      price: newPrice,
      image: newImg,
      features: ['Community Support', 'Lecture Files'],
      videos: tempVideos,
      purchaseCount: isEditing ? (courses.find(c => c.id === isEditing)?.purchaseCount || 0) : 0,
      instructors: instructors
    };

    if (isEditing) {
      updateCourse(courseData);
      setIsEditing(null);
    } else {
      addCourse(courseData);
    }
    resetForm();
  };

  const resetForm = () => {
    setNewTitle(''); setNewSubtitle(''); setNewPrice(199); setNewDesc(''); setTempVideos([]); setInstructors([]); setNewImg('');
    setIsEditing(null);
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col sm:flex-row justify-between items-center gap-8">
        <div>
          <h1 className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 mb-2 font-bold">System Admin</h1>
          <h2 className="text-3xl md:text-4xl font-serif-cinzel uppercase">Command Center</h2>
        </div>
        <div className="flex bg-black/40 border border-emerald-900/30 p-1 w-full sm:w-auto">
          {['courses', 'offers'].map(panel => (
            <button 
              key={panel}
              onClick={() => setActivePanel(panel as any)}
              className={`relative px-6 py-2 text-[10px] uppercase tracking-widest transition-all ${activePanel === panel ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-500'}`}
            >
              {panel}
            </button>
          ))}
        </div>
      </header>

      {activePanel === 'courses' && (
        <div className="space-y-12">
          <div className="flex justify-between items-center">
            <h3 className="text-xs uppercase tracking-widest gold-text font-bold">
              {isEditing ? 'Editing Live Content' : 'Course Architect'}
            </h3>
            {isEditing && (
              <button onClick={resetForm} className="text-red-500 text-[10px] uppercase font-bold hover:underline">Cancel Edit</button>
            )}
          </div>
          
          <div className="p-8 border border-[#d4af37]/30 bg-emerald-950/10 animate-fadeIn space-y-8">
             <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-emerald-500">Course Title</label>
                  <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Title" className="w-full bg-black border border-emerald-900 p-4 text-sm outline-none focus:border-[#d4af37]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-emerald-500">Featured Image URL</label>
                  <input value={newImg} onChange={e => setNewImg(e.target.value)} placeholder="Image Link" className="w-full bg-black border border-emerald-900 p-4 text-sm outline-none focus:border-[#d4af37]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-emerald-500">Price ($)</label>
                  <input type="number" value={newPrice} onChange={e => setNewPrice(Number(e.target.value))} className="w-full bg-black border border-emerald-900 p-4 text-sm outline-none focus:border-[#d4af37]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-emerald-500">Category / Subtitle</label>
                  <input value={newSubtitle} onChange={e => setNewSubtitle(e.target.value)} placeholder="Subtitle" className="w-full bg-black border border-emerald-900 p-4 text-sm outline-none focus:border-[#d4af37]" />
                </div>
             </div>

             <div className="space-y-2 text-left">
                <label className="text-[9px] uppercase tracking-widest text-emerald-500">Course Narrative</label>
                <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Description..." rows={3} className="w-full bg-black border border-emerald-900 p-4 text-sm outline-none focus:border-[#d4af37]" />
             </div>

             <div className="pt-8 border-t border-emerald-900/30 text-left">
                <h4 className="text-[10px] uppercase text-emerald-500 font-bold mb-4">Lecture Architects (Instructors)</h4>
                <div className="flex gap-2 mb-4">
                  <input 
                    value={instructorInput} 
                    onChange={e => setInstructorInput(e.target.value)} 
                    placeholder="Instructor Name" 
                    className="flex-1 bg-black border border-emerald-900 p-3 text-sm" 
                    onKeyDown={(e) => e.key === 'Enter' && handleAddInstructor()}
                  />
                  <button onClick={handleAddInstructor} className="bg-emerald-900 px-6 text-xs uppercase font-bold">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {instructors.map(name => (
                    <span key={name} className="flex items-center gap-2 bg-emerald-950 px-3 py-1 border border-emerald-900 text-xs rounded text-gray-300">
                      {name}
                      <button onClick={() => handleRemoveInstructor(name)} className="text-red-500 font-bold">×</button>
                    </span>
                  ))}
                </div>
             </div>

             <div className="pt-8 border-t border-emerald-900/30 text-left">
                <h4 className="text-[10px] uppercase text-emerald-500 font-bold mb-4">Module Management</h4>
                <div className="flex flex-col md:flex-row gap-2 mb-4">
                  <input value={lectureTitle} onChange={e => setLectureTitle(e.target.value)} placeholder="Video Title" className="flex-1 bg-black border border-emerald-900 p-3 text-sm" />
                  <input value={lectureUrl} onChange={e => setLectureUrl(e.target.value)} placeholder="Video URL" className="flex-1 bg-black border border-emerald-900 p-3 text-sm" />
                  <button onClick={handleAddLecture} className="bg-emerald-900 px-6 text-xs uppercase font-bold">Add Module</button>
                </div>
                <div className="space-y-2">
                  {tempVideos.map((vid, idx) => (
                    <div key={vid.id} className="flex items-center justify-between p-3 bg-black/40 border border-emerald-900/30">
                      <span className="text-xs text-gray-400">{idx + 1}. {vid.title}</span>
                      <button onClick={() => setTempVideos(tempVideos.filter(v => v.id !== vid.id))} className="text-red-900 font-bold text-xs uppercase">Delete</button>
                    </div>
                  ))}
                </div>
             </div>
             
             <button onClick={handlePublishOrUpdate} className="w-full py-5 gold-gradient text-black font-bold uppercase text-xs tracking-widest">
                {isEditing ? 'Update Live Syllabus' : 'Authorize New Course Deployment'}
             </button>
          </div>

          <div className="mt-20 border border-emerald-900/30 bg-black/20 overflow-x-auto">
             <table className="w-full text-left min-w-[600px]">
                <thead className="bg-emerald-950/20 text-[9px] uppercase tracking-widest text-gray-500">
                  <tr><th className="p-4">Academy Curriculum</th><th className="p-4">Students</th><th className="p-4">Price</th><th className="p-4 text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/10">
                  {courses.map(c => (
                    <tr key={c.id}>
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-12 h-8 border border-emerald-900 overflow-hidden">
                          <img src={c.image} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-serif-cinzel">{c.title}</span>
                      </td>
                      <td className="p-4 text-xs font-mono text-gray-500">{c.purchaseCount || 0}</td>
                      <td className="p-4 gold-text">${c.price}</td>
                      <td className="p-4 text-right flex justify-end gap-4">
                        <button onClick={() => startEdit(c)} className="text-emerald-500 uppercase font-bold text-[9px]">Modify</button>
                        <button onClick={() => deleteCourse(c.id)} className="text-red-900 uppercase font-bold text-[9px]">Expunge</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </div>
      )}

      {activePanel === 'offers' && (
        <div className="space-y-12 animate-fadeIn">
          <button onClick={() => {}} className="px-8 py-3 border border-[#d4af37] text-[#d4af37] font-bold uppercase text-[10px] tracking-widest">New Offer</button>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {offers.map(o => (
              <div key={o.id} className="p-6 border border-emerald-900 bg-black/40">
                <div className="flex justify-between mb-4">
                  <h4 className="font-serif-cinzel gold-text">{o.title}</h4>
                  <button onClick={() => toggleOffer(o.id)} className={`px-2 py-1 text-[8px] border ${o.isActive ? 'bg-emerald-500 text-black border-emerald-500' : 'text-gray-500 border-gray-800'}`}>{o.isActive ? 'Active' : 'Silent'}</button>
                </div>
                <button onClick={() => deleteOffer(o.id)} className="text-red-900 text-[8px] uppercase font-bold">Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
