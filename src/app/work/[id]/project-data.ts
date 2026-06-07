/** Mock project detail model: one record per `/work/[id]`. */
export type ProjectMetadata = {
  role: string;
  team: string;
  duration: string;
  impact: string;
};

export type ProjectTextBlock = {
  type: 'text';
  body: string;
};

export type ProjectImageBlock = {
  type: 'image';
  src: string;
  alt: string;
  /** `full` = viewport-wide strip; `centered` = max 800px column. */
  layout: 'full' | 'centered';
  width?: number;
  height?: number;
};

/** Interactive screenshot with three annotation nodes — used on github-copilot detail page. */
export type ProjectNodesBlock = {
  type: 'nodes';
};

export type ProjectContentItem = ProjectTextBlock | ProjectImageBlock | ProjectNodesBlock;

export type ProjectData = {
  id: string;
  title: string;
  subtitle?: string;
  metadata: ProjectMetadata;
  content: ProjectContentItem[];
};

export const MOCK_PROJECTS: Record<string, ProjectData> = {
  'github-copilot': {
    id: 'github-copilot',
    title: 'GitHub Copilot for IDEs',
    subtitle: 'Designing AI Coding Experiences Across Developer Workflows',
    metadata: {
      role: 'Lead Product Designer',
      team: 'Copilot UX · 3 designers, 9 engineers',
      duration: 'Q3 2024 — Q2 2025',
      impact: 'De-identified preview · internal pilot cohort',
    },
    content: [
      { type: 'nodes' },
      {
        type: 'text',
        body: 'A control surface for multi-step AI agent workflows inside GitHub. The challenge was balancing contextual grounding, inline suggestion coherence, and trust disclosure — three concerns that pull in different directions when operating at developer cadence.',
      },
      {
        type: 'text',
        body: 'We structured the IA around three flows: contextual grounding (how the agent understands state), inline suggestion coherence (how it surfaces diffs without noise), and a trust & disclosure layer (how operators audit and override). Each flow maps to a distinct interaction mode, not a separate screen.',
      },
    ],
  },
  'agent-orchestration-console': {
    id: 'agent-orchestration-console',
    title: 'Agent Orchestration Console',
    metadata: {
      role: 'Lead Product Designer',
      team: 'Platform · 4 designers, 12 engineers',
      duration: 'Q2 2025 — Q1 2026',
      impact: '−38% time-to-first successful run (pilot cohort)',
    },
    content: [
      {
        type: 'text',
        body: 'Enterprise teams needed a single control plane to author, review, and ship multi-step agent workflows without losing traceability. The surface had to feel fast under load and legible for operators who live in logs.',
      },
      {
        type: 'image',
        src: '/work/agent-console-wide.svg',
        alt: 'Wide mock frame for the orchestration console',
        layout: 'full',
        width: 1600,
        height: 900,
      },
      {
        type: 'text',
        body: 'We anchored the IA on three verbs — compose, validate, deploy — and pushed advanced configuration behind progressive disclosure. Dense tables used monospace numerics for scanability while narrative context stayed in the sans stack at 1.6 line height.',
      },
      {
        type: 'image',
        src: '/work/agent-console-center.svg',
        alt: 'Centered mock frame for detail states',
        layout: 'centered',
        width: 1600,
        height: 1000,
      },
    ],
  },
  'ide-inline-assistance': {
    id: 'ide-inline-assistance',
    title: 'IDE Inline Assistance',
    metadata: {
      role: 'Product Designer (IC)',
      team: 'Editor · 2 PMs, 8 engineers',
      duration: '10 weeks (sprint contract)',
      impact: 'Higher acceptance on “diff-first” suggestions in lab sessions',
    },
    content: [
      {
        type: 'text',
        body: 'Latency-sensitive UI for inline suggestions, partial diffs, and trust cues. The challenge was to keep the editor calm: every extra pixel competes with code.',
      },
      {
        type: 'image',
        src: '/work/ide-inline-wide.svg',
        alt: 'Wide mock frame for inline assistance',
        layout: 'full',
        width: 1600,
        height: 900,
      },
      {
        type: 'text',
        body: 'Motion is intentionally restrained. Enter/exit uses short fades; the primary affordance is spatial continuity between suggestion and insertion point.',
      },
      {
        type: 'image',
        src: '/work/ide-inline-center.svg',
        alt: 'Centered mock frame for trust disclosure',
        layout: 'centered',
        width: 1200,
        height: 800,
      },
    ],
  },
  'compliance-audit-trails': {
    id: 'compliance-audit-trails',
    title: 'Compliance & Audit Trails',
    metadata: {
      role: 'Senior UX / Systems',
      team: 'Risk · design + content + eng',
      duration: '6 months',
      impact: 'Review tasks consolidated into one queue per operator role',
    },
    content: [
      {
        type: 'text',
        body: 'Regulated operators needed auditability without turning every screen into a spreadsheet. We introduced a review spine: immutable events, role-scoped filters, and export paths that mirror legal language.',
      },
      {
        type: 'image',
        src: '/work/compliance-wide.svg',
        alt: 'Wide mock frame for audit overview',
        layout: 'full',
        width: 1600,
        height: 900,
      },
      {
        type: 'text',
        body: 'Tables are the hero. We standardized column density, sticky identity columns, and monospace timestamps for cross-system reconciliation.',
      },
    ],
  },
  'onboarding-power-users': {
    id: 'onboarding-power-users',
    title: 'Onboarding for Power Users',
    metadata: {
      role: 'Product Designer',
      team: 'Growth + Core',
      duration: '8 weeks',
      impact: 'Reduced “skip setup” while preserving expert shortcuts',
    },
    content: [
      {
        type: 'text',
        body: 'Power users resent blocking tours. We reframed onboarding as optional accelerators: defaults that respect muscle memory, with reversible bulk actions.',
      },
      {
        type: 'image',
        src: '/work/onboarding-center.svg',
        alt: 'Centered mock frame for onboarding cards',
        layout: 'centered',
        width: 1200,
        height: 720,
      },
      {
        type: 'text',
        body: 'Each module explains the payoff in one line, then gets out of the way. Keyboard-first flows were tested against screen reader order to avoid silent regressions.',
      },
    ],
  },
};
