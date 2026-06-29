import { randomUUID } from "node:crypto";

import bcrypt from "bcryptjs";

import { db } from "./db/client";
import {
  admins,
  chatbotEntries,
  news,
  openings,
  programs,
  scholarships,
  singletons,
} from "./db/schema";

// Populate the database with an admin account and starter content mirrored from
// the current site. Idempotent: re-running skips rows that already exist.
// Run with: npm run seed

async function seed() {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  await db
    .insert(admins)
    .values({
      id: randomUUID(),
      username,
      passwordHash: bcrypt.hashSync(password, 10),
    })
    .onConflictDoNothing({ target: admins.username });
  console.log(`✓ admin "${username}" ready`);

  await db
    .insert(openings)
    .values({
      id: randomUUID(),
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
    })
    .onConflictDoNothing();

  await db
    .insert(programs)
    .values({
      id: randomUUID(),
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
          ],
        },
      ],
    })
    .onConflictDoNothing();

  await db
    .insert(news)
    .values({
      id: randomUUID(),
      title: "Admissions open for the new intake",
      date: "2026-06-01",
      category: "Admissions",
      body: "Applications for BIT and B.Tech Ed IT are now open. Contact admissions to begin your application.",
      imageUrl: "",
    })
    .onConflictDoNothing();

  await db
    .insert(scholarships)
    .values([
      {
        id: randomUUID(),
        name: "Merit Scholarship",
        category: "Merit-based",
        coverage: "Up to 75% of tuition",
        eligibility: ["Strong academic record", "Maintain minimum GPA each semester"],
        description: "Awarded to high-achieving students based on academic performance.",
      },
      {
        id: randomUUID(),
        name: "Need-based Grant",
        category: "Need-based",
        coverage: "Partial tuition support",
        eligibility: ["Demonstrated financial need", "Complete the financial aid form"],
        description: "Support for students who require financial assistance to enroll.",
      },
    ])
    .onConflictDoNothing();

  const singletonSeed: { key: string; value: unknown }[] = [
    {
      key: "bot-settings",
      value: {
        botName: "WH Assistant",
        status: "Online",
        welcomeMessage:
          "Hello! Welcome to WhiteHouse Education Foundation. How can I assist you today?",
        fallbackMessage:
          "I couldn't find a specific answer to that. Please contact us at info@whitehouseeducation.edu.np or call 9714530056. You can also reach us at 9714530057.",
        offTopicMessage:
          "I'm here to help with questions about WhiteHouse College of Business & Technology (WCBT) only.",
        domainKeywords: ["college", "course", "admission", "scholarship", "wcbt", "bit"],
        quickQuestions: ["What programs do you offer?", "How do I apply?", "Tell me about scholarships"],
      },
    },
    {
      key: "site-contact",
      value: {
        phones: ["9714530056", "9714530057"],
        email: "info@whitehouseeducation.edu.np",
        address: "Jhapa, Nepal",
      },
    },
    {
      key: "site-meta",
      value: {
        favicon: "https://ik.imagekit.io/qn3m81dsk/university/Address%20(13).png",
        title: "WhiteHouse College of Business & Technology",
        description: "KU Affiliated technology programs in Eastern Nepal.",
      },
    },
    {
      key: "home-stats",
      value: {
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
      },
    },
  ];

  for (const row of singletonSeed) {
    await db.insert(singletons).values(row).onConflictDoNothing({ target: singletons.key });
  }

  console.log("✓ seed complete");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
