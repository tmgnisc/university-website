import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  GraduationCap,
  Newspaper,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  Inbox,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { logout } from "@/lib/cms/auth";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Submissions Inbox", to: "/admin/inbox", icon: Inbox, exact: false },
  { label: "Current Openings", to: "/admin/openings", icon: Briefcase, exact: false },
  { label: "Chatbot Q&A", to: "/admin/chatbot", icon: MessageSquare, exact: false },
  { label: "Programs", to: "/admin/programs", icon: GraduationCap, exact: false },
  { label: "News & Events", to: "/admin/news", icon: Newspaper, exact: false },
  { label: "Scholarships", to: "/admin/scholarships", icon: Award, exact: false },
  { label: "Site Settings", to: "/admin/site", icon: Settings, exact: false },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onLogout = () => {
    logout();
    navigate({ to: "/admin/login" });
  };

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  const navLinks = (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            isActive(item.to, item.exact)
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted",
          )}
        >
          <item.icon className="size-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-card p-4 lg:flex">
        <div className="px-3 py-2">
          <p className="text-lg font-bold tracking-tight">WCBT Admin</p>
          <p className="text-xs text-muted-foreground">Content management</p>
        </div>
        <div className="mt-4 flex-1">{navLinks}</div>
        <Button variant="outline" onClick={onLogout} className="justify-start gap-3">
          <LogOut className="size-4" /> Log out
        </Button>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-border bg-card p-4">
            <div className="flex items-center justify-between px-3 py-2">
              <p className="text-lg font-bold">WCBT Admin</p>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-4 flex-1">{navLinks}</div>
            <Button variant="outline" onClick={onLogout} className="justify-start gap-3">
              <LogOut className="size-4" /> Log out
            </Button>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-6" />
          </button>
          <p className="text-sm text-muted-foreground">WhiteHouse College · Admin Panel</p>
        </header>
        <main className="px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
