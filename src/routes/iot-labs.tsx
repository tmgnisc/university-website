import { createFileRoute } from "@tanstack/react-router";
import { Cpu, Gauge, RadioTower, Settings, Wifi } from "lucide-react";

import smartClass from "@/assets/smart-classroom.jpg";
import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/iot-labs")({
  head: () => ({
    meta: [
      { title: "IoT Labs — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "IoT lab learning, sensors, automation, and connected systems exposure at WCBT.",
      },
    ],
    links: [{ rel: "canonical", href: "/iot-labs" }],
  }),
  component: IotLabsPage,
});

function IotLabsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="IoT Labs"
        title="Connected systems and smart technology"
        description="IoT lab activities help students understand sensors, devices, data, networks, and automation."
        image={smartClass}
      />
      <PageSection
        eyebrow="Lab Focus"
        title="How students learn IoT"
        description="Students connect hardware, software, and data to understand how modern smart systems work."
      >
        <IconFeatureGrid
          items={[
            {
              icon: Cpu,
              title: "Device Basics",
              description:
                "Hands-on exposure to microcontrollers, sensors, actuators, and embedded systems.",
            },
            {
              icon: Wifi,
              title: "Connectivity",
              description:
                "Understand how devices communicate through networks, protocols, and cloud services.",
            },
            {
              icon: Gauge,
              title: "Data Monitoring",
              description:
                "Collect, visualize, and interpret sensor data for practical decision-making.",
            },
            {
              icon: Settings,
              title: "Automation",
              description:
                "Build simple automated responses for classrooms, farms, homes, and workplaces.",
            },
            {
              icon: RadioTower,
              title: "Smart Applications",
              description:
                "Explore IoT applications in agriculture, education, health, and local businesses.",
            },
          ]}
        />
      </PageSection>
      <CtaBand
        title="Build practical connected systems"
        description="Learn more about technology programs and student project opportunities."
        primaryLabel="Explore Programs"
        secondaryLabel="Industry Exposure"
      />
    </PageShell>
  );
}
