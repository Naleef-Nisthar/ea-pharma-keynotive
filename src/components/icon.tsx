import {
  Activity,
  Binary,
  Cpu,
  Database,
  Dna,
  FileCheck,
  FileText,
  FlaskConical,
  GitMerge,
  HelpCircle,
  Layers,
  LineChart,
  MessagesSquare,
  Network,
  ShieldCheck,
  SlidersHorizontal,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * String -> icon registry, so src/content/site.ts stays free of JSX imports and
 * content edits never touch a component.
 *
 * Every key used in site.ts must exist here. An unknown key falls back to
 * `Layers` rather than throwing, so a typo degrades to a wrong-but-rendered
 * icon instead of a blank page.
 */
const ICONS = {
  activity: Activity,
  binary: Binary,
  cpu: Cpu,
  database: Database,
  dna: Dna,
  "file-check": FileCheck,
  "file-text": FileText,
  flask: FlaskConical,
  "git-merge": GitMerge,
  "help-circle": HelpCircle,
  layers: Layers,
  "line-chart": LineChart,
  messages: MessagesSquare,
  network: Network,
  "shield-check": ShieldCheck,
  sliders: SlidersHorizontal,
  workflow: Workflow,
  wrench: Wrench,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = ICONS[name as IconName] ?? Layers;
  // Icons here always sit beside a text label that carries the meaning, so
  // they are decorative and hidden from assistive tech.
  return <Cmp aria-hidden className={className} strokeWidth={1.5} />;
}
