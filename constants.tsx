
import { Course } from './types';

export const INITIAL_VIDEOS = [
  { id: 'v1', title: 'The Soul of AI: Introduction', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '12:45' },
  { id: 'v2', title: 'Midjourney Mastery: Lighting', url: 'https://www.w3schools.com/html/movie.mp4', duration: '45:10' },
  { id: 'v3', title: 'Runway Gen-2 Advanced Motion', url: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '32:20' }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'mastering-ai-cinema-01',
    title: 'Cinematic AI Storytelling',
    subtitle: 'The Art of Digital Reality',
    description: 'Learn the complete workflow of creating world-class AI cinematic videos, from prompt engineering to advanced motion generation and post-production storytelling.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
    features: [
      'AI-generated Short Video Mastering',
      'Cinematic Visual Language with Midjourney',
      'Motion Generation with Runway Gen-2 & Luma',
      'Emotional Storytelling Frameworks',
      'Professional Music & SFX Integration',
      'Lifetime Access to Private Community'
    ],
    videos: INITIAL_VIDEOS,
    purchaseCount: 1240,
    instructors: ['Valerchik', 'Mijas']
  }
];

export const PRIMARY_COURSE = INITIAL_COURSES[0];

export const FAQ_ITEMS = [
  {
    question: "Do I need prior AI knowledge?",
    answer: "No. This course is designed for absolute beginners and creative professionals alike. We start from the core concepts and move to advanced workflows."
  },
  {
    question: "How do I access the content?",
    answer: "You can watch all cinematic lectures directly through your student dashboard on any device."
  },
  {
    question: "Is there lifetime access?",
    answer: "Yes, once enrolled, you have permanent access to all current and future modules of the course."
  }
];

export const SHOWCASE_VIDEOS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800', title: 'The Emerald Realm' },
  { id: 2, url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800', title: 'Cybernetic Dreams' },
  { id: 3, url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800', title: 'Ancient Future' },
  { id: 4, url: 'https://images.unsplash.com/photo-1620121692029-d088224efc74?auto=format&fit=crop&q=80&w=800', title: 'Liquid Gold' },
  { id: 5, url: 'https://images.unsplash.com/photo-1635833215424-0268ec3872c0?auto=format&fit=crop&q=80&w=800', title: 'Astral Nomad' },
  { id: 6, url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800', title: 'Glass Cathedral' }
];
