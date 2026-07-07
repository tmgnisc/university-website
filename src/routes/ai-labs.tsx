import { createFileRoute } from "@tanstack/react-router";
import { Bot, BrainCircuit, Code2, Database, MessageSquareCode } from "lucide-react";

import aiLab from "@/assets/ai-lab.jpg";
import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/ai-labs")({
  head: () => ({
    meta: [
      { title: "AI Labs — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "AI learning, projects, and lab exposure for WCBT students.",
      },
    ],
    links: [{ rel: "canonical", href: "/ai-labs" }],
  }),
  component: AiLabsPage,
});

function AiLabsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="AI Labs"
        title="Applied AI learning for real problems"
        description="The AI lab focus introduces students to intelligent systems, data, automation, and practical AI project development."
        image={aiLab}
      />
      <PageSection
        eyebrow="Learning Areas"
        title="What students explore in AI"
        description="Students learn AI through guided experimentation, project work, and connections to real-world use cases."
      >
        <IconFeatureGrid
          items={[
            {
              icon: BrainCircuit,
              title: "AI Fundamentals",
              description:
                "Core concepts in machine learning, intelligent systems, model thinking, and responsible use.",
            },
            {
              icon: Database,
              title: "Data Practice",
              description:
                "Cleaning, organizing, analyzing, and interpreting data for practical decisions.",
            },
            {
              icon: Code2,
              title: "Prototype Building",
              description:
                "Student projects turn AI ideas into simple working tools, demos, and experiments.",
            },
            {
              icon: MessageSquareCode,
              title: "NLP & Chatbots",
              description:
                "Language tools, conversational interfaces, and local-language technology exposure.",
            },
            {
              icon: Bot,
              title: "Automation",
              description:
                "Using AI to support workflows in education, business, agriculture, and services.",
            },
          ]}
        />
      </PageSection>
      <CtaBand
        title="Interested in AI projects?"
        description="Explore our programs and research activities to learn how students build practical technology."
        primaryLabel="Explore Programs"
        secondaryLabel="Research"
      />
    </PageShell>
  );
}
