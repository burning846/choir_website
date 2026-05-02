import { z } from 'zod';

export type Lang = 'en' | 'zh';

export const MemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  joinYear: z.number(),
  avatar: z.string().optional(),
  voice: z.string().optional(),
});
export type Member = z.infer<typeof MemberSchema>;

export const ConductorSchema = z.object({
  name: z.string(),
  title: z.string(),
  experience: z.string(),
  education: z.string(),
  achievements: z.array(z.string()),
  bio: z.string(),
  philosophy: z.string(),
  avatar: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});
export type Conductor = z.infer<typeof ConductorSchema>;

export const VideoSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  date: z.string().optional(),
  venue: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
});
export type Video = z.infer<typeof VideoSchema>;

export const PerformanceSchema = z.object({
  name: z.string(),
  date: z.string(),
  intro: z.string(),
  image: z.string().optional(),
  venue: z.string().optional(),
  link: z.string().optional(),
});
export type Performance = z.infer<typeof PerformanceSchema>;

export const SocialSchema = z.object({
  name: z.string(),
  href: z.string(),
  icon: z.string().optional(),
});
export type Social = z.infer<typeof SocialSchema>;

export const ContactInfoSchema = z.object({
  title: z.string().optional(),
  intro: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().optional(),
  socials: z.array(SocialSchema).optional(),
});
export type ContactInfo = z.infer<typeof ContactInfoSchema>;

export const FooterInfoSchema = z.object({
  about: z.string().optional(),
  schedule: z.array(z.string()).optional(),
  location: z.string().optional(),
  copyright: z.string().optional(),
});
export type FooterInfo = z.infer<typeof FooterInfoSchema>;

export const HeroInfoSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  primaryCta: z.string().optional(),
  secondaryCta: z.string().optional(),
});
export type HeroInfo = z.infer<typeof HeroInfoSchema>;

export const DocSchema = z.object({
  choirName: z.string().optional(),
  choirNameEn: z.string().optional(),
  logo: z.string().optional(),
  intro: z.string().optional(),
  aboutImage: z.string().optional(),
  images: z.array(z.object({ file: z.string() })).optional(),
  members: z.array(MemberSchema).optional(),
  conductors: z.array(ConductorSchema).optional(),
  videos: z.array(VideoSchema).optional(),
  youtube: z.object({ channel: z.string() }).optional(),
  performances: z.array(PerformanceSchema).optional(),
  contact: ContactInfoSchema.optional(),
  qrcode: z.string().optional(),
  footer: FooterInfoSchema.optional(),
  keywords: z.array(z.string()).optional(),
  hero: HeroInfoSchema.optional(),
});
export type Doc = z.infer<typeof DocSchema>;
