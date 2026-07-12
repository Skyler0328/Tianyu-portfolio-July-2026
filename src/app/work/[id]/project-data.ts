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

export type ProjectPlaceholderBlock = {
  type: 'placeholder';
  title: string;
  description: string;
};

export type ProjectSectionItem =
  | string
  | {
      title: string;
      description?: string;
      balance?: {
        left: string;
        right: string;
      };
      media?: {
        before: ProjectChallengeImage;
        after: ProjectChallengeImage[];
      };
      diagram?: ProjectChallengeImage;
      mediaGroups?: ProjectChallengeMediaGroup[];
      insight?: string;
      bullets?: string[];
    };

export type ProjectChallengeImage = {
  src: string;
  alt: string;
  /** Fills transparent / missing card corners with the image canvas color. */
  cardBg?: string;
  /** Intrinsic pixel size of the asset. */
  width?: number;
  height?: number;
  /**
   * `natural` = keep asset at its own size (no content stretch); outer card
   * can still fill the grid cell with matching background.
   */
  fit?: 'natural' | 'fill';
  innerFrame?: {
    x: number;
    y: number;
    width: number;
    height: number;
    canvasWidth: number;
    canvasHeight: number;
  };
};

export type ProjectChallengeVideo = {
  src: string;
  alt: string;
  cardBg?: string;
  /** Intrinsic pixel size of the recording. */
  width?: number;
  height?: number;
  /**
   * `natural` = keep recording at its own size (no content stretch); outer
   * card can still fill the row with matching background.
   */
  fit?: 'natural' | 'fill';
};

export type ProjectChallengeMediaGroup =
  | {
      title: string;
      variant: 'transition';
      before: ProjectChallengeImage;
      after: ProjectChallengeImage[];
    }
  | {
      title: string;
      variant: 'grid';
      images: ProjectChallengeImage[];
    }
  | {
      title: string;
      variant: 'featuredGrid';
      featured: ProjectChallengeImage;
      images: ProjectChallengeImage[];
    }
  | {
      title: string;
      variant: 'videos';
      /**
       * Optional full-width video shown above the grid.
       * `videos`: 1 = full-width row; 2 = equal-height side-by-side cards.
       */
      featured?: ProjectChallengeVideo;
      /** Full-width static images shown after `featured`, before the video grid. */
      images?: ProjectChallengeImage[];
      videos: ProjectChallengeVideo[];
    }
  | {
      title?: string;
      variant: 'stack';
      images: ProjectChallengeImage[];
    };

export type ProjectSectionBlock = {
  type: 'section';
  title: string;
  description?: string;
  items?: ProjectSectionItem[];
  /** Top-level media for gallery-style sections (no numbered challenge items). */
  mediaGroups?: ProjectChallengeMediaGroup[];
};

export type ProjectFinding = {
  quote: string;
  image: string;
  imageAlt: string;
};

export type ProjectFindingsBlock = {
  type: 'findings';
  title: string;
  findings: ProjectFinding[];
};

export type ProjectContentItem =
  | ProjectTextBlock
  | ProjectImageBlock
  | ProjectNodesBlock
  | ProjectPlaceholderBlock
  | ProjectSectionBlock
  | ProjectFindingsBlock;

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
    subtitle:
      'Human-Agent Interaction Design for Cross-Platform Developer Workflows',
    metadata: {
      role: 'UX Designer',
      team: 'Cross-functional team of designers, researchers, PMs, and engineers',
      duration: 'May 2025 – Present',
      impact:
        '· Defined cross-platform design strategy for Copilot experiences across Eclipse and IntelliJ\n· Owned UX design for GitHub Copilot in Eclipse\n· Contributed to IntelliJ experiences alongside fellow designers\n· Designed agent-driven workflows, context management, and failure recovery experiences\n· Partnered with engineers through implementation and launch.',
    },
    content: [
      { type: 'nodes' },
      {
        type: 'section',
        title: 'Four Challenges of Designing AI Agents',
        items: [
          {
            title: 'Agent Autonomy',
            description:
              'How might we increase agent efficiency without making developers feel they had lost control?',
            balance: {
              left: 'More autonomy',
              right: 'More predictability',
            },
            mediaGroups: [
              {
                title: 'Sub-agent Design',
                variant: 'transition',
                before: {
                  src: '/work/subagent-old.png?v=3',
                  alt: 'Previous sub-agent design before the redesign',
                  cardBg: '#D9D9D9',
                  width: 2944,
                  height: 1716,
                  fit: 'natural',
                },
                after: [
                  {
                    src: '/work/subagent-expand.png?v=2',
                    alt: 'Expanded sub-agent design after the redesign',
                    cardBg: '#CCE2E0',
                    width: 978,
                    height: 1000,
                    fit: 'natural',
                  },
                  {
                    src: '/work/subagent-finished.png?v=2',
                    alt: 'Finished sub-agent design after the redesign',
                    cardBg: '#CCE2E0',
                    width: 978,
                    height: 1000,
                    fit: 'natural',
                  },
                ],
              },
              {
                title: 'Thinking Process',
                variant: 'grid',
                images: [
                  {
                    src: '/work/thinking-finished.svg',
                    alt: 'Collapsed thinking process after completion',
                  },
                  {
                    src: '/work/thinking-expand.svg',
                    alt: 'Expanded thinking process details',
                  },
                ],
              },
            ],
            insight:
              'We selectively reveal agent content to users: information that is not critical while the agent is running is collapsed to improve screen efficiency, while users can manually expand it to inspect details. When an error occurs, the full details expand by default so users can locate the issue.',
          },
          {
            title: 'Context Understanding',
            description:
              'How should AI systems expose and manage context without overwhelming users or losing transparency?',
            media: {
              before: {
                src: '/work/agent-autonomy-before.png',
                alt: 'Previous file change experience before the Context Understanding redesign',
              },
              after: [
                {
                  src: '/work/agent-autonomy-after-1.svg',
                  alt: 'Redesigned multi-file context experience, first state',
                },
                {
                  src: '/work/agent-autonomy-after-2.svg',
                  alt: 'Redesigned multi-file context experience, second state',
                },
                {
                  src: '/work/agent-autonomy-after-3.svg',
                  alt: 'Redesigned multi-file context experience, third state',
                },
              ],
            },
            mediaGroups: [
              {
                title: 'Context Window Awareness',
                variant: 'videos',
                videos: [
                  {
                    src: '/work/record-context-window.mp4',
                    alt: 'Context window awareness recording showing token usage breakdown',
                    cardBg: '#DCE8E7',
                    width: 782,
                    height: 1474,
                    fit: 'natural',
                  },
                ],
              },
            ],
            bullets: [
              'Context Explainability',
              'Context Window Awareness',
              'Context control',
            ],
          },
          {
            title: 'Cost Transparency',
            mediaGroups: [
              {
                title: 'Real time cost indicator',
                variant: 'videos',
                featured: {
                  src: '/work/record-usage-panel.mp4',
                  alt: 'Usage panel recording showing real-time cost indication',
                  cardBg: '#1E1E1E',
                },
                images: [
                  {
                    src: '/work/indicator-explore.png',
                    alt: 'Usage indicator design exploration and in-product mockup',
                    cardBg: '#F7F8F8',
                    width: 1100,
                    height: 582,
                  },
                ],
                videos: [
                  {
                    src: '/work/record-session-usage.mp4',
                    alt: 'Session usage recording for cost transparency',
                    cardBg: '#1E1E1E',
                  },
                  {
                    src: '/work/record-session-view.mp4',
                    alt: 'Session view recording for cost transparency',
                    cardBg: '#1E1E1E',
                  },
                ],
              },
            ],
          },
          {
            title: 'Failure & Uncertainty',
          },
        ],
      },
      {
        type: 'section',
        title: 'UI System Design & Visual',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/eclipse-icons.png',
                alt: 'Eclipse Copilot icon system',
                cardBg: '#D9D9D9',
                width: 1100,
                height: 582,
              },
              {
                src: '/work/eclipse-ui-levelup.png',
                alt: 'Eclipse Copilot UI level-up screens',
                cardBg: '#E1EAE9',
                width: 2200,
                height: 1164,
              },
              {
                src: '/work/eclipse-ui-dark-theme.jpg',
                alt: 'Eclipse Copilot UI dark theme',
                cardBg: '#1E1E1E',
                width: 1200,
                height: 652,
              },
              {
                src: '/work/eclipse-poster.png',
                alt: 'Eclipse Copilot visual poster',
                cardBg: '#0C022F',
                width: 2560,
                height: 1440,
              },
            ],
          },
        ],
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
