import { z } from "zod";

// Validation schemas for incoming request bodies. These mirror the frontend's
// src/lib/cms/types.ts (input shapes, i.e. without `id`). Keep the two in sync;
// they are the contract between the admin UI and this API.

export const openingInput = z.object({
  title: z.string().min(1),
  type: z.string().min(1),
  location: z.string().min(1),
  qualifications: z.array(z.string().min(1)).default([]),
  experience: z.array(z.string().min(1)).default([]),
  applyEmail: z.string().email(),
  active: z.boolean().default(true),
});

export const chatbotEntryInput = z.object({
  question: z.string().min(1),
  priority: z.number().int().min(0).default(50),
  keywords: z.array(z.string().min(1)).default([]),
  answer: z.string().min(1),
});

const courseSchema = z.object({ name: z.string().min(1), credits: z.number().int().min(0) });
const semesterSchema = z.object({
  title: z.string().min(1),
  courses: z.array(courseSchema).default([]),
});
const curriculumYearSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().default(""),
  semesters: z.array(semesterSchema).default([]),
});

export const programInput = z.object({
  title: z.string().min(1),
  code: z.string().default(""),
  description: z.string().default(""),
  duration: z.string().default(""),
  credits: z.string().default(""),
  highlights: z.array(z.string().min(1)).default([]),
  careers: z.array(z.string().min(1)).default([]),
  curriculum: z.array(curriculumYearSchema).default([]),
});

export const newsItemInput = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  category: z.string().default(""),
  body: z.string().min(1),
  imageUrl: z.string().url().or(z.literal("")).default(""),
});

export const scholarshipInput = z.object({
  name: z.string().min(1),
  category: z.string().default(""),
  coverage: z.string().default(""),
  eligibility: z.array(z.string().min(1)).default([]),
  description: z.string().default(""),
});

// Singletons
export const botSettingsSchema = z.object({
  botName: z.string().min(1),
  status: z.string().min(1),
  welcomeMessage: z.string().min(1),
  fallbackMessage: z.string().min(1),
  offTopicMessage: z.string().min(1),
  domainKeywords: z.array(z.string().min(1)).default([]),
  quickQuestions: z.array(z.string().min(1)).default([]),
});

export const siteContactSchema = z.object({
  phones: z.array(z.string().min(1)).default([]),
  email: z.string().email(),
  address: z.string().min(1),
});

export const siteMetaSchema = z.object({
  favicon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const homeStatsSchema = z.object({
  stats: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).default([]),
  highlights: z
    .array(z.object({ title: z.string().min(1), description: z.string().min(1) }))
    .default([]),
});

export const loginInput = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const requestFormInput = z.object({
  name: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().default("New website request"),
  program: z.string().default(""),
  purpose: z.string().default(""),
  address: z.string().default(""),
  message: z.string().default(""),
});

export type RequestFormInput = z.infer<typeof requestFormInput>;
