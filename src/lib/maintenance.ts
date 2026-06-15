export const MAINTENANCE_PATH = "/maintenance";

const ALLOWED_LINKS = new Set([
  "/",
  "/about",
  "/programs",
  "/admissions",
  "/scholarships",
  "/campus-life",
  "/research",
  "/contact",
  "/maintenance",
  "#home",
  "#main",
]);

const ALLOWED_ROUTE_PREFIXES = [
  "/about",
  "/programs",
  "/admissions",
  "/scholarships",
  "/campus-life",
  "/research",
  "/contact",
  "/maintenance",
];

export function shouldAllowInteraction(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return true;

  if (target.closest("[data-chat-widget]")) return true;

  const anchor = target.closest("a");
  if (anchor) {
    const href = anchor.getAttribute("href")?.trim() ?? "";
    if (ALLOWED_LINKS.has(href)) return true;
    if (ALLOWED_ROUTE_PREFIXES.some((prefix) => href === prefix || href.startsWith(`${prefix}/`) || href.startsWith(`${prefix}?`))) {
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
