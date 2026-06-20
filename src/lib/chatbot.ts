export type ChatbotEntry = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
  priority?: number;
  topic?: string;
  matchWords?: string[];
};

export type ChatbotData = {
  botName: string;
  status: string;
  welcomeMessage: string;
  fallbackMessage: string;
  offTopicMessage: string;
  domainKeywords?: string[];
  quickQuestions: string[];
  entries: ChatbotEntry[];
};

const MIN_MATCH_SCORE = 3;
const SHORT_REPLY_IDS = new Set(["g7", "g8"]);
const MAX_SHORT_REPLY_WORDS = 3;
const CONVERSATION_PREFIX = "g";
const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "must",
  "shall",
  "can",
  "need",
  "dare",
  "ought",
  "used",
  "to",
  "of",
  "in",
  "for",
  "on",
  "with",
  "at",
  "by",
  "from",
  "up",
  "about",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "between",
  "out",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "just",
  "and",
  "but",
  "if",
  "or",
  "because",
  "as",
  "until",
  "while",
  "what",
  "which",
  "who",
  "whom",
  "this",
  "that",
  "these",
  "those",
  "am",
  "i",
  "me",
  "my",
  "we",
  "our",
  "you",
  "your",
  "he",
  "him",
  "his",
  "she",
  "her",
  "it",
  "its",
  "they",
  "them",
  "their",
  "any",
  "tell",
  "please",
]);

const ENTRY_TOPICS: Record<string, string> = {
  q1: "WCBT (WhiteHouse College of Business & Technology)",
  q2: "WhiteHouse Education Foundation (WEF)",
  q3: "WCBT campus location",
  q4: "why choose WCBT",
  q5: "programs offered at WCBT",
  q6: "the BIT program",
  q7: "the B.Tech Ed IT program",
  q8: "BIT eligibility",
  q9: "B.Tech Ed IT eligibility",
  q10: "the application process",
  q11: "the entrance examination",
  q12: "admission opening dates",
  q13: "BIT fee structure",
  q14: "B.Tech Ed IT fee structure",
  q15: "scholarships",
  q16: "campus facilities",
  q17: "the library",
  q18: "computer labs",
  q19: "internship opportunities",
  q20: "career opportunities after BIT",
  q21: "career opportunities after B.Tech Ed IT",
  q22: "student clubs and activities",
  q23: "hackathons",
  q24: "campus safety",
  q25: "contact information",
  q26: "parent trust in WCBT",
  q27: "student success support",
  q28: "tuition and fees",
  q29: "career opportunities",
  q30: "KU affiliation",
  q31: "hostel accommodation",
  q32: "office hours",
  q33: "program duration",
  q34: "required admission documents",
  q35: "campus visit",
  q36: "admission eligibility",
  q37: "online or distance learning",
  q38: "cafeteria facilities",
  q39: "sports facilities",
  q40: "what makes WCBT different",
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text).split(" ").filter(Boolean);
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasWordBoundary(message: string, word: string): boolean {
  if (!word) return false;
  return new RegExp(`(?:^|\\s)${escapeRegex(word)}(?:\\s|$)`).test(message);
}

function collectEntryWords(entry: ChatbotEntry): Set<string> {
  const words = new Set<string>();
  const addText = (text: string) => {
    for (const word of normalize(text).split(" ")) {
      if (word.length >= 2 && !STOP_WORDS.has(word)) words.add(word);
    }
  };

  addText(entry.question);
  for (const keyword of entry.keywords) addText(keyword);
  for (const word of entry.matchWords ?? []) addText(word);

  return words;
}

function scoreKeyword(
  normalizedMessage: string,
  tokens: string[],
  keyword: string,
): { score: number; matched: boolean } {
  const normalizedKeyword = normalize(keyword);
  if (!normalizedKeyword) return { score: 0, matched: false };

  const parts = normalizedKeyword.split(" ").filter(Boolean);

  if (parts.length === 1) {
    const word = parts[0];
    if (tokens.includes(word)) return { score: word.length >= 4 ? 10 : 8, matched: true };
    if (word.length >= 4 && hasWordBoundary(normalizedMessage, word)) {
      return { score: 8, matched: true };
    }
    return { score: 0, matched: false };
  }

  if (normalizedMessage.includes(normalizedKeyword)) {
    return { score: parts.length * 14, matched: true };
  }

  const matchedParts = parts.filter(
    (part) =>
      !STOP_WORDS.has(part) &&
      (tokens.includes(part) || (part.length >= 3 && hasWordBoundary(normalizedMessage, part))),
  );

  if (matchedParts.length === parts.length) return { score: parts.length * 10, matched: true };
  if (matchedParts.length > 0) return { score: matchedParts.length * 6, matched: true };

  return { score: 0, matched: false };
}

function scoreTokenOverlap(tokens: string[], entryWords: Set<string>): number {
  let score = 0;

  for (const token of tokens) {
    if (token.length < 2 || STOP_WORDS.has(token)) continue;
    if (entryWords.has(token)) {
      score += token.length >= 4 ? 12 : 9;
    }
  }

  return score;
}

function scoreEntry(normalizedMessage: string, tokens: string[], entry: ChatbotEntry): number {
  const normalizedQuestion = normalize(entry.question);
  const entryWords = collectEntryWords(entry);

  if (normalizedMessage === normalizedQuestion) return 1000;
  if (normalizedMessage.includes(normalizedQuestion)) return 500;

  let score = 0;
  let hasMatch = false;

  for (const keyword of entry.keywords) {
    const result = scoreKeyword(normalizedMessage, tokens, keyword);
    if (result.matched) {
      score += result.score;
      hasMatch = true;
    }
  }

  for (const word of entry.matchWords ?? []) {
    const normalizedWord = normalize(word);
    if (!normalizedWord) continue;
    if (tokens.includes(normalizedWord) || hasWordBoundary(normalizedMessage, normalizedWord)) {
      score += 14;
      hasMatch = true;
    }
  }

  const overlapScore = scoreTokenOverlap(tokens, entryWords);
  if (overlapScore > 0) {
    score += overlapScore;
    hasMatch = true;
  }

  if (!hasMatch) return 0;

  return score + (entry.priority ?? 0);
}

function buildDomainTerms(entries: ChatbotEntry[], extra: string[] = []): string[] {
  const terms = new Set<string>();

  for (const term of extra) {
    const normalized = normalize(term);
    if (normalized.length >= 3) terms.add(normalized);
  }

  for (const entry of entries) {
    for (const word of collectEntryWords(entry)) {
      if (word.length >= 3) terms.add(word);
    }
  }

  return [...terms];
}

function isCollegeRelated(tokens: string[], domainTerms: string[]): boolean {
  return tokens.some((token) => token.length >= 3 && domainTerms.includes(token));
}

function getTopicLabel(entry: ChatbotEntry): string {
  return entry.topic ?? ENTRY_TOPICS[entry.id] ?? entry.question.replace(/\?$/, "");
}

function formatConfirmedAnswer(entry: ChatbotEntry): string {
  if (entry.id.startsWith(CONVERSATION_PREFIX)) return entry.answer;
  return `Are you referring to ${getTopicLabel(entry)}?\n\n${entry.answer}`;
}

export function findChatbotAnswer(
  userMessage: string,
  entries: ChatbotEntry[],
  fallback: string,
  offTopic: string,
  domainKeywords: string[] = [],
): string {
  const normalized = normalize(userMessage);
  if (!normalized) return offTopic;

  const tokens = tokenize(userMessage);
  const domainTerms = buildDomainTerms(entries, domainKeywords);
  const collegeRelated = isCollegeRelated(tokens, domainTerms);

  let bestScore = 0;
  let bestEntry: ChatbotEntry | null = null;

  for (const entry of entries) {
    const score = scoreEntry(normalized, tokens, entry);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (
    bestScore >= MIN_MATCH_SCORE &&
    bestEntry &&
    !(
      SHORT_REPLY_IDS.has(bestEntry.id) &&
      (tokens.length > MAX_SHORT_REPLY_WORDS || collegeRelated)
    )
  ) {
    return formatConfirmedAnswer(bestEntry);
  }

  if (collegeRelated) return fallback;

  return offTopic;
}
