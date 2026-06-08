export type ChatbotEntry = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
  priority?: number;
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

function scoreKeyword(normalizedMessage: string, tokens: string[], keyword: string): number {
  const normalizedKeyword = normalize(keyword);
  if (!normalizedKeyword) return 0;

  const parts = normalizedKeyword.split(" ").filter(Boolean);

  if (parts.length === 1) {
    const word = parts[0];
    if (tokens.includes(word)) return word.length >= 4 ? 8 : 6;
    if (word.length >= 4 && hasWordBoundary(normalizedMessage, word)) return 7;
    return 0;
  }

  if (normalizedMessage.includes(normalizedKeyword)) {
    return parts.length * 12;
  }

  const matchedParts = parts.filter(
    (part) => tokens.includes(part) || (part.length >= 4 && hasWordBoundary(normalizedMessage, part)),
  );

  if (matchedParts.length === parts.length) return parts.length * 8;
  if (matchedParts.length >= Math.ceil(parts.length * 0.6)) return matchedParts.length * 4;
  return 0;
}

function scoreEntry(normalizedMessage: string, tokens: string[], entry: ChatbotEntry): number {
  const normalizedQuestion = normalize(entry.question);

  if (normalizedMessage === normalizedQuestion) return 1000 + (entry.priority ?? 0);
  if (normalizedMessage.includes(normalizedQuestion)) return 500 + (entry.priority ?? 0);

  let score = entry.priority ?? 0;

  for (const keyword of entry.keywords) {
    score += scoreKeyword(normalizedMessage, tokens, keyword);
  }

  return score;
}

function buildDomainTerms(entries: ChatbotEntry[], extra: string[] = []): string[] {
  const terms = new Set<string>();

  for (const term of extra) {
    const normalized = normalize(term);
    if (normalized.length >= 3) terms.add(normalized);
  }

  for (const entry of entries) {
    for (const keyword of entry.keywords) {
      const normalized = normalize(keyword);
      if (normalized.length >= 3) terms.add(normalized);
    }
  }

  return [...terms];
}

function isCollegeRelated(message: string, tokens: string[], domainTerms: string[]): boolean {
  if (domainTerms.some((term) => term.includes(" ") && message.includes(term))) return true;
  return tokens.some((token) => token.length >= 3 && domainTerms.includes(token));
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
  const collegeRelated = isCollegeRelated(normalized, tokens, domainTerms);

  let bestScore = 0;
  let bestAnswer: string | null = null;
  let bestId: string | null = null;

  for (const entry of entries) {
    const score = scoreEntry(normalized, tokens, entry);
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = entry.answer;
      bestId = entry.id;
    }
  }

  if (
    bestScore >= MIN_MATCH_SCORE &&
    bestAnswer &&
    !(
      bestId &&
      SHORT_REPLY_IDS.has(bestId) &&
      (tokens.length > MAX_SHORT_REPLY_WORDS || collegeRelated)
    )
  ) {
    return bestAnswer;
  }

  if (collegeRelated) return fallback;

  return offTopic;
}
