import { cn } from "@/lib/utils";

import { LAYOUT, SectionContainer } from "./layout-primitives";

const FOOTER_LOGO = "https://ik.imagekit.io/qn3m81dsk/university/Address%20(13).png";

export function Footer() {
  const cols = [
    {
      h: "Community",
      href: "/community",
      items: [
        { label: "Board Members", href: "/community/board-members" },
        { label: "Advisors", href: "/community/advisors" },
        { label: "Faculty", href: "/community/faculty" },
        { label: "Administration", href: "/community/administration" },
        { label: "International", href: "/community/international" },
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
      href: "/vision",
      items: [
        { label: "Mission", href: "/vision/mission" },
        { label: "Values", href: "/vision/values" },
        { label: "Strategy", href: "/vision/strategy" },
        { label: "Reports", href: "/vision/reports" },
      ],
    },
    {
      h: "Research",
      items: [
        { label: "AI Labs", href: "/research/ai-labs" },
        { label: "IoT Labs", href: "/research/iot-labs" },
        { label: "Innovation Centers", href: "/research/innovation-centers" },
      ],
    },
    {
      h: "Careers",
      items: [
        { label: "Career Paths", href: "/careers/career-paths" },
        { label: "Graduate Success", href: "/careers/graduate-success" },
        { label: "Placements", href: "/careers/placements" },
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
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              {c.href ? (
                <a href={c.href} className="hover:text-white/80 transition-colors">
                  {c.h}
                </a>
              ) : (
                c.h
              )}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {c.items.map((i) => (
                <li key={i.label}>
                  <a href={i.href} className="hover:text-white transition-colors">
                    {i.label}
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
