export const MAINTENANCE_PATH = "/maintenance";

// Pages that are live. Navigation to these is allowed; links to anything else
// (unbuilt features, dead buttons, forms) route to the maintenance page.
const LIVE_ROUTES = [
  "/",
  "/about",
  "/programs",
  "/academics/admissions",
  "/academics/scholarships",
  "/student-life/campus-life",
  "/academics/research",
  "/contact",
  "/careers",
  "/student-life/student-experience",
  "/student-life/student-support",
  "/visit",
  "/visit/virtual-tour",
  "/about/ku-affiliation",
  "/about/industry-exposure",
  "/about/governance",
  "/about/publications",
  "/about/legacy",
  "/board-members",
  "/advisors",
  "/faculty",
  "/administration",
  "/international",
  "/community",
  "/mission",
  "/values",
  "/strategy",
  "/reports",
  "/vision",
  "/ai-labs",
  "/iot-labs",
  "/innovation-centers",
  "/career-paths",
  "/graduate-success",
  "/placements",
  "/news",
  "/events",
  "/maintenance",
];

const ALLOWED_LINKS = new Set([...LIVE_ROUTES, "#home", "#main"]);
const ALLOWED_ROUTE_PREFIXES = LIVE_ROUTES.filter((route) => route !== "/");

export function shouldAllowInteraction(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return true;

  if (target.closest("[data-chat-widget]")) return true;
  if (target.closest("[data-maintenance-allow]")) return true;

  // Site header (nav links, dropdown toggles, mobile menu) is always interactive.
  if (target.closest("header")) return true;

  const anchor = target.closest("a");
  if (anchor) {
    const href = anchor.getAttribute("href")?.trim() ?? "";
    if (/^(tel|mailto):/i.test(href)) return true;
    if (ALLOWED_LINKS.has(href)) return true;
    if (
      ALLOWED_ROUTE_PREFIXES.some(
        (prefix) =>
          href === prefix ||
          href.startsWith(`${prefix}/`) ||
          href.startsWith(`${prefix}?`) ||
          href.startsWith(`${prefix}#`),
      )
    ) {
      return true;
    }
    return false;
  }

  const button = target.closest("button");
  if (button) {
    const label = button.getAttribute("aria-label");
    if (label === "Open menu" || label === "Close menu") return true;
    return false;
  }

  return true;
}
