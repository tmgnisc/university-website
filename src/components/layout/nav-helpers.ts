export type NavLink = { label: string; to: string; hash?: string };
export type NavGroup = { label: string; to?: string; children?: NavLink[] };

// Top-level header is grouped into a few dropdowns so it stays clean and
// responsive while still covering every section of the sitemap.
export const NAV_MENU: NavGroup[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about/about" },
  {
    label: "Programs",
    to: "/programs",
    children: [
      { label: "BIT", to: "/programs/bit" },
      { label: "B.Tech Ed IT", to: "/programs/btech-ed-it" },
      { label: "Research & Innovation", to: "/academics/research" },
    ],
  },
  {
    label: "Academics",
    children: [
      { label: "Admissions", to: "/academics/admissions" },
      { label: "Scholarships", to: "/academics/scholarships" },
    ],
  },
  {
    label: "Student Life",
    children: [
      { label: "Student Experience", to: "/student-life/student-experience" },
      { label: "Student Support", to: "/student-life/student-support" },
      { label: "Campus Life", to: "/student-life/campus-life" },
    ],
  },
  { label: "Visit Us", to: "/visit/visit-us" },
  { label: "Careers", to: "/careers" },
];

export function isLinkActive(to: string, pathname: string) {
  return to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
}

export function isGroupActive(group: NavGroup, pathname: string) {
  if (group.to) return isLinkActive(group.to, pathname);
  return group.children?.some((c) => isLinkActive(c.to, pathname)) ?? false;
}

// Children that share a path but differ by hash (e.g. /programs#bit vs
// /programs#btech-ed-it) must compare the hash so only one shows as active.
export function isChildActive(child: NavLink, pathname: string, hash: string) {
  if (!isLinkActive(child.to, pathname)) return false;
  if (child.hash) return hash.replace(/^#/, "") === child.hash;
  return true;
}
