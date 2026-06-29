export const MAINTENANCE_PATH = "/maintenance";

// Pages that are live. Navigation to these is allowed; links to anything else
// (unbuilt features, dead buttons, forms) route to the maintenance page.
const LIVE_ROUTES = [
  "/",
  "/about",
  "/programs",
  "/admissions",
  "/scholarships",
  "/campus-life",
  "/research",
  "/contact",
  "/careers",
  "/student-experience",
  "/student-support",
  "/visit-us",
  "/virtual-tour",
  "/ku-affiliation",
  "/industry-exposure",
  "/governance",
  "/publications",
  "/legacy",
  "/maintenance",
];

const ALLOWED_LINKS = new Set([...LIVE_ROUTES, "#home", "#main"]);
const ALLOWED_ROUTE_PREFIXES = LIVE_ROUTES.filter((route) => route !== "/");

export function shouldAllowInteraction(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return true;

  if (target.closest("[data-chat-widget]")) return true;

  // Site header (nav links, dropdown toggles, mobile menu) is always interactive.
  if (target.closest("header")) return true;

  const anchor = target.closest("a");
  if (anchor) {
    const href = anchor.getAttribute("href")?.trim() ?? "";
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
