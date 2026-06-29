import type {
  BotSettings,
  ChatbotEntry,
  ChatbotEntryInput,
  HomeStats,
  NewsItem,
  NewsItemInput,
  Opening,
  OpeningInput,
  Program,
  ProgramInput,
  Scholarship,
  ScholarshipInput,
  SiteContact,
  SiteMeta,
} from "./types";

// A collection of records identified by `id`.
export interface Collection<T, TInput> {
  list(): Promise<T[]>;
  get(id: string): Promise<T | null>;
  create(input: TInput): Promise<T>;
  update(id: string, input: TInput): Promise<T>;
  remove(id: string): Promise<void>;
}

// A single editable record (site-wide settings).
export interface Singleton<T> {
  get(): Promise<T>;
  update(value: T): Promise<T>;
}

// The full data contract. Both the localStorage adapter (now) and the HTTP
// adapter (future Node/SQL backend) implement this exact shape.
export interface CmsAdapter {
  openings: Collection<Opening, OpeningInput>;
  chatbotEntries: Collection<ChatbotEntry, ChatbotEntryInput>;
  programs: Collection<Program, ProgramInput>;
  news: Collection<NewsItem, NewsItemInput>;
  scholarships: Collection<Scholarship, ScholarshipInput>;
  botSettings: Singleton<BotSettings>;
  siteContact: Singleton<SiteContact>;
  siteMeta: Singleton<SiteMeta>;
  homeStats: Singleton<HomeStats>;
}
