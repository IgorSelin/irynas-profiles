export interface Review {
  id?: string;
  name: string;
  text: string;
  rating: number;
  date: string;
  approved?: boolean;
  tourId?: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  price?: string;
  languages?: string[];
  highlights?: string[];
  type?: 'individual' | 'corporate' | 'both';
  tags?: string[];
}

export interface GuideInfo {
  name: string;
  bio: string;
  experience: string;
  photo: string;
  specialties?: string[];
}
