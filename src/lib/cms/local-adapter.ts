import type { Collection, CmsAdapter, Singleton } from "./adapter";
import {
  seedBotSettings,
  seedChatbotEntries,
  seedHomeStats,
  seedNews,
  seedOpenings,
  seedPrograms,
  seedScholarships,
  seedSiteContact,
  seedSiteMeta,
} from "./seed";

// localStorage-backed implementation of CmsAdapter. Data is seeded from the
// current site on first access and persists per-browser only. Swap this for
// the HTTP adapter once the Node/SQL backend exists — no component changes.

const PREFIX = "wcbt-cms:";

function delay<T>(value: T, ms = 120): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Math.random().toString(36).slice(2)}`;
}

function collection<T extends { id: string }, TInput>(
  name: string,
  seed: T[],
): Collection<T, TInput> {
  const key = PREFIX + name;

  function load(): T[] {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T[];
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }
  function save(items: T[]) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  return {
    list: () => delay(load()),
    get: (id) => delay(load().find((item) => item.id === id) ?? null),
    create: (input) => {
      const item = { ...(input as object), id: newId() } as T;
      const items = load();
      items.push(item);
      save(items);
      return delay(item);
    },
    update: (id, input) => {
      const items = load();
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) return Promise.reject(new Error(`${name} ${id} not found`));
      const item = { ...(input as object), id } as T;
      items[index] = item;
      save(items);
      return delay(item);
    },
    remove: (id) => {
      save(load().filter((item) => item.id !== id));
      return delay(undefined);
    },
  };
}

function singleton<T>(name: string, seed: T): Singleton<T> {
  const key = PREFIX + name;

  function load(): T {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }

  return {
    get: () => delay(load()),
    update: (value) => {
      localStorage.setItem(key, JSON.stringify(value));
      return delay(value);
    },
  };
}

export const localAdapter: CmsAdapter = {
  openings: collection("openings", seedOpenings),
  chatbotEntries: collection("chatbotEntries", seedChatbotEntries),
  programs: collection("programs", seedPrograms),
  news: collection("news", seedNews),
  scholarships: collection("scholarships", seedScholarships),
  botSettings: singleton("botSettings", seedBotSettings),
  siteContact: singleton("siteContact", seedSiteContact),
  siteMeta: singleton("siteMeta", seedSiteMeta),
  homeStats: singleton("homeStats", seedHomeStats),
};
