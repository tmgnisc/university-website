import {
  Accessibility,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Bus,
  Calendar,
  CalendarCheck,
  ClipboardList,
  Clock,
  Code,
  Coffee,
  Compass,
  Cpu,
  Dumbbell,
  FileText,
  FlaskConical,
  GraduationCap,
  Heart,
  HeartHandshake,
  HeartPulse,
  Landmark,
  Lightbulb,
  Mail,
  MapPin,
  Microscope,
  Music,
  Network,
  Phone,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Video,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

// Name -> component map for icon fields stored as strings in src/data/pages/*.json
// (JSON can't hold a component reference). Add new icons here as pages need them.
export const iconRegistry = {
  Accessibility,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Bus,
  Calendar,
  CalendarCheck,
  ClipboardList,
  Clock,
  Code,
  Coffee,
  Compass,
  Cpu,
  Dumbbell,
  FileText,
  FlaskConical,
  GraduationCap,
  Heart,
  HeartHandshake,
  HeartPulse,
  Landmark,
  Lightbulb,
  Mail,
  MapPin,
  Microscope,
  Music,
  Network,
  Phone,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Video,
  Wallet,
  Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

function resolveIcon(name: string): LucideIcon {
  const icon = iconRegistry[name as IconName];
  if (!icon) throw new Error(`Unknown icon "${name}" — add it to src/lib/icon-registry.ts`);
  return icon;
}

// Maps `icon: string` -> `icon: LucideIcon` on every item in a JSON-sourced array.
export function resolveIcons<T extends { icon: string }>(
  items: readonly T[],
): (Omit<T, "icon"> & { icon: LucideIcon })[] {
  return items.map((item) => ({ ...item, icon: resolveIcon(item.icon) }));
}
