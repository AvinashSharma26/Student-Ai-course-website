
export interface Video {
  id: string;
  title: string;
  url: string;
  duration: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  videos: Video[];
  purchaseCount: number;
  instructors: string[]; // Added Lecture Architects
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  purchasedCourses: string[];
  isAdmin?: boolean;
  phone?: string;
}

export interface CartItem {
  courseId: string;
  title: string;
  price: number;
  image: string;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedVideoIds: string[];
}

export interface Offer {
  id: string;
  courseId: string;
  title: string;
  description: string;
  isActive: boolean;
}

export enum CheckoutStep {
  CART = 'CART',
  DETAILS = 'DETAILS',
  PAYMENT = 'PAYMENT',
  SUCCESS = 'SUCCESS'
}
