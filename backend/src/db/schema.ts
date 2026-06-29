import { boolean, integer, jsonb, pgTable, text } from "drizzle-orm/pg-core";

// Admin accounts (for /api/auth/login).
export const admins = pgTable("admins", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

// --- Collections ---------------------------------------------------------
export const openings = pgTable("openings", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  location: text("location").notNull(),
  qualifications: jsonb("qualifications").$type<string[]>().notNull().default([]),
  experience: jsonb("experience").$type<string[]>().notNull().default([]),
  applyEmail: text("apply_email").notNull(),
  active: boolean("active").notNull().default(true),
});

export const chatbotEntries = pgTable("chatbot_entries", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  priority: integer("priority").notNull().default(50),
  keywords: jsonb("keywords").$type<string[]>().notNull().default([]),
  answer: text("answer").notNull(),
});

export const programs = pgTable("programs", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  code: text("code").notNull().default(""),
  description: text("description").notNull().default(""),
  duration: text("duration").notNull().default(""),
  credits: text("credits").notNull().default(""),
  highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
  careers: jsonb("careers").$type<string[]>().notNull().default([]),
  curriculum: jsonb("curriculum").$type<unknown[]>().notNull().default([]),
});

export const news = pgTable("news", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  category: text("category").notNull().default(""),
  body: text("body").notNull(),
  imageUrl: text("image_url").notNull().default(""),
});

export const scholarships = pgTable("scholarships", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull().default(""),
  coverage: text("coverage").notNull().default(""),
  eligibility: jsonb("eligibility").$type<string[]>().notNull().default([]),
  description: text("description").notNull().default(""),
});

// --- Singletons (site-wide settings) -------------------------------------
// One row per settings key; `value` holds the JSON document.
export const singletons = pgTable("singletons", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
});
