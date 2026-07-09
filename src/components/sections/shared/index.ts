// Reusable, generic page-building blocks shared across route files.
// Was previously a single file (sections/page-sections.tsx); split one
// component per file for readability, re-exported here so existing
// consumers only need to update their import path, not their import list.

export { PageSection } from "./page-section";
export { SplitSection } from "./split-section";
export { HighlightBand } from "./highlight-band";
export { IconFeatureGrid } from "./icon-feature-grid";
export { Timeline } from "./timeline";
export { LeadershipGrid } from "./leadership-grid";
export { ProgramSpotlight } from "./program-spotlight";
export { ProgramCompare } from "./program-compare";
export { StepGrid } from "./step-grid";
export { CareerGrid } from "./career-grid";
export { CtaBand } from "./cta-band";
export { ProgramQuickLinks } from "./program-quick-links";
export { FaqList } from "./faq-list";
export { ContactSection } from "./contact-section";
export { CurriculumStructure } from "./curriculum-structure";
export { ApplicationForm } from "./application-form";
export { ApplyForm } from "./apply-form";
export { DeadlineGrid } from "./deadline-grid";
