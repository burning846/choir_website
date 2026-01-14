export type Lang = 'en' | 'zh';

export interface Member {
  name: string;
  role: string;
  joinYear: number;
  avatar?: string;
  voice?: string;
}

export interface Conductor {
  name: string;
  title: string;
  experience: string;
  education: string;
  achievements: string[];
  bio: string;
  philosophy: string;
  avatar?: string;
  highlights?: string[];
  raw?: string;
}

export interface Video {
  id?: string;
  title: string;
  date?: string;
  venue?: string;
  description?: string;
  url?: string;
}

export interface Performance {
  name: string;
  date: string;
  intro: string;
  image?: string;
  venue?: string;
}

export interface Social {
  name: string;
  href: string;
  icon: string;
}

export interface ContactInfo {
  title?: string;
  intro?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  socials?: Social[];
}

export interface FooterInfo {
  about?: string;
  schedule?: string[];
  location?: string;
  copyright?: string;
}

export interface Doc {
  choirName?: string;
  choirNameEn?: string;
  logo?: string;
  intro?: string;
  aboutImage?: string;
  images?: { file: string }[];
  members?: (string | Member)[];
  conductor?: Conductor;
  conductors?: Conductor[];
  videos?: Video[];
  youtube?: { channel: string };
  performances?: Performance[];
  contact?: ContactInfo;
  qrcode?: string;
  footer?: FooterInfo;
  keywords?: string[];
  [key: string]: unknown;
}
