import { z } from "zod";

// Single source of truth for every CMS resource. These zod schemas validate
// admin forms today and define the contract the future Node/SQL backend must
// honour. Types are inferred from the schemas.

const id = z.string().min(1);

// --- Current Openings ----------------------------------------------------
export const openingSchema = z.object({
  id,
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Type is required"), // e.g. Full-time
  location: z.string().min(1, "Location is required"),
  qualifications: z.array(z.string().min(1)).default([]),
  experience: z.array(z.string().min(1)).default([]),
  applyEmail: z.string().email("Enter a valid email"),
  active: z.boolean().default(true),
});
export type Opening = z.infer<typeof openingSchema>;

// --- Chatbot -------------------------------------------------------------
export const chatbotEntrySchema = z.object({
  id,
  question: z.string().min(1, "Question is required"),
  priority: z.number().int().min(0).default(50),
  keywords: z.array(z.string().min(1)).default([]),
  answer: z.string().min(1, "Answer is required"),
});
export type ChatbotEntry = z.infer<typeof chatbotEntrySchema>;

export const botSettingsSchema = z.object({
  botName: z.string().min(1),
  status: z.string().min(1),
  welcomeMessage: z.string().min(1),
  fallbackMessage: z.string().min(1),
  offTopicMessage: z.string().min(1),
  domainKeywords: z.array(z.string().min(1)).default([]),
  quickQuestions: z.array(z.string().min(1)).default([]),
});
export type BotSettings = z.infer<typeof botSettingsSchema>;

// --- Programs ------------------------------------------------------------
export const courseSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  credits: z.number().int().min(0, "Credits must be 0 or more"),
});
export type Course = z.infer<typeof courseSchema>;

export const semesterSchema = z.object({
  title: z.string().min(1, "Semester title is required"),
  courses: z.array(courseSchema).default([]),
});
export type Semester = z.infer<typeof semesterSchema>;

export const curriculumYearSchema = z.object({
  title: z.string().min(1, "Year title is required"),
  subtitle: z.string().default(""),
  semesters: z.array(semesterSchema).default([]),
});
export type CurriculumYear = z.infer<typeof curriculumYearSchema>;

export const programSchema = z.object({
  id,
  title: z.string().min(1, "Title is required"),
  code: z.string().default(""),
  description: z.string().default(""),
  duration: z.string().default(""),
  credits: z.string().default(""),
  highlights: z.array(z.string().min(1)).default([]),
  careers: z.array(z.string().min(1)).default([]),
  curriculum: z.array(curriculumYearSchema).default([]),
});
export type Program = z.infer<typeof programSchema>;

// --- News & Events -------------------------------------------------------
export const newsItemSchema = z.object({
  id,
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  category: z.string().default(""),
  body: z.string().min(1, "Body is required"),
  imageUrl: z.string().url("Enter a valid URL").or(z.literal("")).default(""),
});
export type NewsItem = z.infer<typeof newsItemSchema>;

// --- Scholarships --------------------------------------------------------
export const scholarshipSchema = z.object({
  id,
  name: z.string().min(1, "Name is required"),
  category: z.string().default(""),
  coverage: z.string().default(""),
  eligibility: z.array(z.string().min(1)).default([]),
  description: z.string().default(""),
});
export type Scholarship = z.infer<typeof scholarshipSchema>;

// --- Site singletons -----------------------------------------------------
export const siteContactSchema = z.object({
  phones: z.array(z.string().min(1)).default([]),
  email: z.string().email("Enter a valid email"),
  address: z.string().min(1),
});
export type SiteContact = z.infer<typeof siteContactSchema>;

export const siteMetaSchema = z.object({
  favicon: z.string().min(1, "Favicon URL is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});
export type SiteMeta = z.infer<typeof siteMetaSchema>;

export const homeStatsSchema = z.object({
  stats: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).default([]),
  highlights: z
    .array(z.object({ title: z.string().min(1), description: z.string().min(1) }))
    .default([]),
});
export type HomeStats = z.infer<typeof homeStatsSchema>;

// Input schemas (no id) for create/update forms.
export const openingInput = openingSchema.omit({ id: true });
export const chatbotEntryInput = chatbotEntrySchema.omit({ id: true });
export const programInput = programSchema.omit({ id: true });
export const newsItemInput = newsItemSchema.omit({ id: true });
export const scholarshipInput = scholarshipSchema.omit({ id: true });

export type OpeningInput = z.infer<typeof openingInput>;
export type ChatbotEntryInput = z.infer<typeof chatbotEntryInput>;
export type ProgramInput = z.infer<typeof programInput>;
export type NewsItemInput = z.infer<typeof newsItemInput>;
export type ScholarshipInput = z.infer<typeof scholarshipInput>;
