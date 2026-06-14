export const MAINTENANCE_PATH = "/maintenance";

const ALLOWED_LINKS = new Set([
  "/",
  "/about",
  "/programs",
  "/maintenance",
  "#home",
  "#main",
]);

export function shouldAllowInteraction(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return true;

  if (target.closest("[data-chat-widget]")) return true;

  const anchor = target.closest("a");
  if (anchor) {
    const href = anchor.getAttribute("href")?.trim() ?? "";
    if (ALLOWED_LINKS.has(href)) return true;
    if (href.startsWith("/maintenance")) return true;
    if (href === "/about" || href.startsWith("/about/") || href.startsWith("/about?")) return true;
    if (href === "/programs" || href.startsWith("/programs/") || href.startsWith("/programs?")) return true;
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
