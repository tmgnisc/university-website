import chatbot from "@/data/chatbot.json";

import type {
  BotSettings,
  ChatbotEntry,
  HomeStats,
  NewsItem,
  Opening,
  Program,
  Scholarship,
  SiteContact,
  SiteMeta,
} from "./types";

// Initial data mirrored from the current (hardcoded) site. The local adapter
// loads this on first run; editing in the admin only changes localStorage and
// does NOT affect the live public pages yet.

export const seedOpenings: Opening[] = [
  {
    id: "coordinator-head-of-studies",
    title: "Coordinator / Head of Studies",
    type: "Full-time",
    location: "Jhapa, Nepal",
    qualifications: [
      "Minimum a Master's degree in MIT, M.Tech, MSc CSIT, or MCA",
      "Bachelor's degree in Engineering or a related field",
    ],
    experience: ["At least 3 to 5 years of experience in higher education"],
    applyEmail: "hr@whitehouseeducation.edu.np",
    active: true,
  },
];

export const seedChatbotEntries: ChatbotEntry[] = (chatbot.entries as ChatbotEntry[]).map((e) => ({
  id: e.id,
  question: e.question,
  priority: e.priority ?? 50,
  keywords: e.keywords ?? [],
  answer: e.answer,
}));

export const seedBotSettings: BotSettings = {
  botName: chatbot.botName,
  status: chatbot.status,
  welcomeMessage: chatbot.welcomeMessage,
  fallbackMessage: chatbot.fallbackMessage,
  offTopicMessage: chatbot.offTopicMessage,
  domainKeywords: chatbot.domainKeywords ?? [],
  quickQuestions: chatbot.quickQuestions ?? [],
};

export const seedPrograms: Program[] = [
  {
    id: "bit",
    title: "BIT — Bachelor of Information Technology",
    code: "BIT",
    description:
      "A 4-year Kathmandu University affiliated program covering software, hardware, data, and management foundations.",
    duration: "4 Years · 8 Semesters",
    credits: "127 Credit Hours",
    highlights: [
      "Software, hardware, and data/intelligence core",
      "Management and communication foundation",
      "Seven semester projects plus a final internship",
    ],
    careers: [
      "Software developer",
      "IT systems and network administrator",
      "Data / AI analyst",
      "Tech entrepreneur or product builder",
    ],
    curriculum: [
      {
        title: "Year 1",
        subtitle: "Foundation Year — Building Core Knowledge",
        semesters: [
          {
            title: "Semester 1",
            courses: [
              { name: "Advanced Communication Skills", credits: 3 },
              { name: "Calculus and Linear Algebra", credits: 3 },
              { name: "Computer Programming", credits: 3 },
              { name: "Digital Logic", credits: 3 },
              { name: "Introduction to Information System Technology", credits: 2 },
              { name: "Project I", credits: 2 },
            ],
          },
          {
            title: "Semester 2",
            courses: [
              { name: "Mathematics II (Advanced Calculus)", credits: 3 },
              { name: "Management Principles", credits: 3 },
              { name: "Microprocessor and Assembly Language Programming", credits: 3 },
              { name: "Object Oriented Programming", credits: 3 },
              { name: "Discrete Mathematics", credits: 3 },
              { name: "Project II", credits: 2 },
            ],
          },
        ],
      },
    ],
  },
];

export const seedNews: NewsItem[] = [
  {
    id: "admissions-open",
    title: "Admissions open for the new intake",
    date: "2026-06-01",
    category: "Admissions",
    body: "Applications for BIT and B.Tech Ed IT are now open. Contact admissions to begin your application.",
    imageUrl: "",
  },
];

export const seedScholarships: Scholarship[] = [
  {
    id: "merit",
    name: "Merit Scholarship",
    category: "Merit-based",
    coverage: "Up to 75% of tuition",
    eligibility: ["Strong academic record", "Maintain minimum GPA each semester"],
    description: "Awarded to high-achieving students based on academic performance.",
  },
  {
    id: "need-based",
    name: "Need-based Grant",
    category: "Need-based",
    coverage: "Partial tuition support",
    eligibility: ["Demonstrated financial need", "Complete the financial aid form"],
    description: "Support for students who require financial assistance to enroll.",
  },
];

export const seedSiteMeta: SiteMeta = {
  favicon: "https://ik.imagekit.io/qn3m81dsk/university/Address%20(13).png",
  title: "WhiteHouse College of Business & Technology",
  description: "KU Affiliated technology programs in Eastern Nepal.",
};

export const seedSiteContact: SiteContact = {
  phones: ["9714530056", "9714530057"],
  email: "info@whitehouseeducation.edu.np",
  address: "Jhapa, Nepal",
};

export const seedHomeStats: HomeStats = {
  stats: [
    { label: "Affiliation", value: "Kathmandu University" },
    { label: "Programs", value: "BIT & B.Tech Ed IT" },
    { label: "Location", value: "Jhapa, Nepal" },
  ],
  highlights: [
    {
      title: "KU Affiliated",
      description: "Technology programs delivered under Kathmandu University affiliation.",
    },
    {
      title: "Industry-ready",
      description: "Project-driven curriculum with internships and real-world exposure.",
    },
  ],
};
