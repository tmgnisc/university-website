import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { LAYOUT } from "./layout-primitives";
import { isChildActive, isGroupActive, isLinkActive, NAV_MENU } from "./nav-helpers";

const NAV_LOGO = "https://ik.imagekit.io/qn3m81dsk/university/Address%20(13).png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md border-b border-border" : "border-b border-border/60"
      }`}
    >
      <div className={cn(LAYOUT.container, "h-24 flex items-center justify-between")}>
        <Link to="/" className="flex items-center">
          <img src={NAV_LOGO} alt="WCBT Jhapa Campus" className="h-[5.5rem] w-auto sm:h-24" />
        </Link>
        <nav className="hidden lg:flex items-center gap-x-1">
          {NAV_MENU.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                {item.to ? (
                  <Link
                    to={item.to}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                      isGroupActive(item, pathname)
                        ? "text-primary"
                        : "text-black hover:text-primary",
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                      isGroupActive(item, pathname)
                        ? "text-primary"
                        : "text-black hover:text-primary",
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                  </button>
                )}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                  <div className="min-w-56 rounded-2xl border border-border bg-white p-2 shadow-xl shadow-black/5">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        hash={child.hash}
                        className={cn(
                          "block rounded-xl px-3 py-2 text-sm transition-colors",
                          isChildActive(child, pathname, hash)
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-black hover:bg-muted",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to!}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors",
                  isLinkActive(item.to!, pathname)
                    ? "text-primary"
                    : "text-black hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-5"
          >
            <Link to="/apply">Apply Now</Link>
          </Button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="lg:hidden text-black hover:text-black/70 transition-colors"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white border-l border-border p-6 flex flex-col gap-5 overflow-y-auto"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-black hover:text-black/70 transition-colors"
              >
                <X className="size-6" />
              </button>
            </div>
            {NAV_MENU.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-border pb-4">
                  {item.to ? (
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                  )}
                  <div className="flex flex-col gap-2.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        hash={child.hash}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "text-base transition-colors",
                          isChildActive(child, pathname, hash)
                            ? "font-semibold text-primary"
                            : "text-black hover:text-primary",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to!}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-border pb-3 text-lg transition-colors",
                    isLinkActive(item.to!, pathname)
                      ? "font-semibold text-primary"
                      : "text-black hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-2"
            >
              <Link to="/apply" onClick={() => setOpen(false)}>
                Apply Now
              </Link>
            </Button>
          </motion.aside>
        </div>
      )}
    </header>
  );
}
