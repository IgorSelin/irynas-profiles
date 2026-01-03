export interface Review {
  id?: string;
  name: string;
  text: string;
  rating: number;
  date: string;
  approved?: boolean;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  price?: string;
  languages?: string[];
  highlights?: string[];
}

export interface GuideInfo {
  name: string;
  bio: string;
  experience: string;
  photo: string;
  specialties?: string[];
}

