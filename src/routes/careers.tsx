import { createFileRoute } from "@tanstack/react-router";
import { Code, Network, Lightbulb, BookOpen, TrendingUp, Rocket } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CareerGrid, CtaBand, HighlightBand, IconFeatureGrid, PageSection } from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Discover the diverse career paths and opportunities available to WCBT graduates.",
      },
      { property: "og:title", content: "Careers — WCBT Jhapa Campus" },
      {
        property: "og:description",
        content: "Explore where our graduates go and the opportunities awaiting them.",
      },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

const CAREER_PATHS = [
  {
    title: "Software Developer",
    description: "Graduates can work with technology companies, startups, financial institutions, and government organizations to create digital solutions that meet real-world needs.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "IT Support & Systems Administrator",
    description: "This role focuses on ensuring the reliability, security, and efficiency of technology systems used by modern organizations to manage computer systems, networks, cloud services, and IT infrastructure.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Ed-Tech Specialist",
    description: "Graduates can help schools, colleges, and training institutions improve teaching and learning through innovative technologies.",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "ICT Teacher / Trainer",
    description: "Graduates can also conduct professional development and skills-training programs for various organizations by building the next generation of digital professionals by teaching technology-related subjects in schools, colleges, and training centers.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Data & AI Analyst",
    description: "Graduates may work in business intelligence, research, artificial intelligence, data analytics, and digital transformation projects across multiple sectors by analyzing data, identifying trends, and generating insights that support informed decision-making.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Startup Founder",
    description: "Graduates can launch startups in software development, education technology, digital services, consulting, and other emerging industries, contributing to economic growth and technological advancement and transform innovative ideas into successful ventures.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  },
];

function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Career Pathways"
        title="Where Our Graduates Go"
        description="When pursuing employment, entrepreneurship, or further studies, our graduates are prepared to contribute, innovate, and lead in their chosen fields."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection
        eyebrow="Diverse Opportunities"
        title="Professional Success After Graduation"
      >
        <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto mb-8">
          The programs offered at WhiteHouse College prepare students for a wide range of professional opportunities in technology, 
          education, business, and innovation. Our graduates are equipped with the knowledge, skills, and networks needed to excel 
          in competitive global and local job markets.
        </p>
      </PageSection>

      <HighlightBand
        title="Prepared for Every Path"
        description="Whether you choose employment, entrepreneurship, or further studies, WCBT provides the foundation for your success."
      />

      <PageSection
        eyebrow="Career Options"
        title="Explore Opportunities"
        className="bg-muted/30"
      >
        <CareerGrid items={CAREER_PATHS} />
      </PageSection>

      <PageSection eyebrow="Key Career Areas" title="Where WCBT Graduates Thrive">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: Code,
              title: "Software Development",
              description: "Creating applications, web platforms, and digital solutions for organizations globally.",
            },
            {
              icon: Network,
              title: "IT Infrastructure",
              description: "Managing systems, networks, and technology infrastructure for modern organizations.",
            },
            {
              icon: Lightbulb,
              title: "Education Technology",
              description: "Transforming learning through innovative digital tools and instructional design.",
            },
            {
              icon: BookOpen,
              title: "Teaching & Training",
              description: "Building the next generation by educating and training technology professionals.",
            },
            {
              icon: TrendingUp,
              title: "Data & Analytics",
              description: "Turning data into insights for business intelligence and strategic decision-making.",
            },
            {
              icon: Rocket,
              title: "Entrepreneurship",
              description: "Building startups and ventures that drive innovation and economic growth.",
            },
          ]}
        </div>
      </PageSection>

      <PageSection
        eyebrow="Further Studies"
        title="Pathways to Higher Education"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed text-muted-foreground mb-8">
            Many graduates pursue advanced degrees at leading universities in Nepal and abroad. Our rigorous undergraduate programs, 
            combined with our KU affiliation, prepare students for successful admission to master's programs, research opportunities, 
            and specialized certifications.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Master's Programs",
                description: "Advanced studies in computer science, IT, data science, business, and education technology.",
              },
              {
                title: "Research & PhD",
                description: "Foundation for pursuing doctoral research in technology, innovation, and applied sciences.",
              },
              {
                title: "Professional Certifications",
                description: "Industry-recognized credentials in cloud computing, cybersecurity, data analytics, and more.",
              },
              {
                title: "Specialized Training",
                description: "Continuing education and professional development programs throughout your career.",
              },
            ].map((path) => (
              <div key={path.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold text-lg">{path.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{path.description}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Success Stories"
        title="Our Alumni Network"
        className="bg-muted/30"
      >
        <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto">
          WCBT graduates work across Nepal and internationally, contributing to innovative projects, leading organizations, 
          and creating positive change through technology and education. They form a strong network that supports current students 
          through mentorship, internships, and career opportunities.
        </p>
      </PageSection>

      <PageSection eyebrow="Career Support" title="We Support Your Success">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "Career Counseling",
              description: "Personalized guidance on career planning, job search strategies, and professional development.",
            },
            {
              title: "Job Placements",
              description: "Direct connections with employers and recruitment opportunities through our industry network.",
            },
            {
              title: "Internship Programs",
              description: "Structured internship experiences that provide practical training and job-ready skills.",
            },
            {
              title: "Alumni Mentorship",
              description: "Connection with successful graduates who can guide and inspire your career journey.",
            },
          ].map((support) => (
            <div key={support.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-lg">{support.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{support.description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <CtaBand
        title="Ready to Start Your Career Journey?"
        description="Explore our programs and discover how WCBT prepares you for success."
        primaryLabel="View Programs"
        secondaryLabel="Schedule Campus Visit"
      />
    </PageShell>
  );
}
