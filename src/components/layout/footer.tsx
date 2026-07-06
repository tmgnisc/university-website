import { cn } from "@/lib/utils";

import { LAYOUT, SectionContainer } from "./layout-primitives";

const FOOTER_LOGO = "https://ik.imagekit.io/qn3m81dsk/university/Address%20(13).png";

export function Footer() {
  const cols = [
    {
      h: "Community",
      items: [
        { label: "Board Members", href: "#" },
        { label: "Advisors", href: "#" },
        { label: "Faculty", href: "#" },
        { label: "Administration", href: "#" },
        { label: "International", href: "#" },
      ],
    },
    {
      h: "About",
      items: [
        { label: "KU Affiliation", href: "/about/ku-affiliation" },
        { label: "Industry Exposure", href: "/about/industry-exposure" },
        { label: "Publications", href: "/about/publications" },
        { label: "Legacy", href: "/about/legacy" },
        { label: "Governance", href: "/about/governance" },
      ],
    },
    {
      h: "Vision",
      items: [
        { label: "Mission", href: "#" },
        { label: "Values", href: "#" },
        { label: "Strategy", href: "#" },
        { label: "Reports", href: "#" },
      ],
    },
    {
      h: "Research",
      items: [
        { label: "AI Labs", href: "/academics/research" },
        { label: "IoT Labs", href: "/academics/research" },
        { label: "Innovation Centers", href: "/academics/research" },
      ],
    },
    {
      h: "Careers",
      items: [
        { label: "Career Paths", href: "/careers" },
        { label: "Graduate Success", href: "/careers" },
        { label: "Placements", href: "#" },
      ],
    },
  ];
  return (
    <footer className="bg-navy-deep text-white/80 border-t border-white/10">
      <SectionContainer
        className={cn(LAYOUT.section, "grid md:grid-cols-2 lg:grid-cols-6", LAYOUT.gridGap)}
      >
        <div className="lg:col-span-1">
          <a href="#home" className="inline-flex">
            <img src={FOOTER_LOGO} alt="WCBT Jhapa Campus" className="h-20 w-auto sm:h-24" />
          </a>
          <p className="mt-5 text-sm text-white/60">
            Building Eastern Nepal's future-focused academic ecosystem.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{c.h}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {c.items.map((i) => (
                <li key={typeof i === "string" ? i : i.label}>
                  <a
                    href={typeof i === "string" ? "#" : i.href}
                    className="hover:text-white transition-colors"
                  >
                    {typeof i === "string" ? i : i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </SectionContainer>
      <div className="border-t border-white/10">
        <SectionContainer className="py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/60">
          <span>
            © {new Date().getFullYear()} WhiteHouse Education Foundation. All rights reserved.
          </span>
          <span>Jhapa, Nepal · 9714530056, 9714530057 · info@whitehouseeducation.edu.np</span>
        </SectionContainer>
      </div>
    </footer>
  );
}
