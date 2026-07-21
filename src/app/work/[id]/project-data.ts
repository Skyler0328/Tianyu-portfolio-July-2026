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

export type ProjectPlaceholderBlock = {
  type: 'placeholder';
  title: string;
  description: string;
};

export type ProjectMetricStat = {
  value: string;
  label: string;
  /** Optional secondary line under the value (e.g. platform names). */
  detail?: string;
  /** Visual emphasis for growth / decline figures. */
  tone?: 'positive' | 'negative' | 'neutral';
};

export type ProjectMetricSeries = {
  name: string;
  data: number[];
  color: string;
};

export type ProjectMetricLineChart = {
  type?: 'line';
  title: string;
  caption?: string;
  categories: string[];
  series: ProjectMetricSeries[];
  /** Start Y at 0. Default false = fit data range. */
  beginAtZero?: boolean;
  /** How Y-axis tick labels are formatted. */
  valueFormat?: 'compact' | 'index';
};

export type ProjectMetricShareSlice = {
  name: string;
  /** Share of 100 (percent). */
  value: number;
  color: string;
};

export type ProjectMetricShareChart = {
  type: 'share';
  title: string;
  caption?: string;
  slices: ProjectMetricShareSlice[];
};

export type ProjectMetricChart = ProjectMetricLineChart | ProjectMetricShareChart;

export type ProjectItemMetrics = {
  stats: ProjectMetricStat[];
  /** Rendered side-by-side on desktop. */
  charts: ProjectMetricChart[];
  footnote?: string;
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
      /** Small heading + media shown after the insight paragraph. */
      afterInsight?: {
        title: string;
        mediaGroups: ProjectChallengeMediaGroup[];
      };
      bullets?: string[];
      /** Optional KPI strip + charts (e.g. Chapter 1 · Users). */
      metrics?: ProjectItemMetrics;
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
  /** HTML video playback rate (e.g. 1.5). */
  playbackRate?: number;
};

export type ProjectChallengeMediaGroup =
  | {
      title: string;
      variant: 'transition';
      before?: ProjectChallengeImage;
      after: ProjectChallengeImage[];
    }
  | {
      title?: string;
      variant: 'grid';
      images: ProjectChallengeImage[];
      /**
       * For 2+ images: put all in one card with equal gaps.
       * Portrait rows keep a shared visual height via max-height.
       */
      matchHeight?: boolean;
      /** Constrain the row to a narrower max width (smaller presentation). */
      compact?: boolean;
    }
  | {
      title?: string;
      description?: string;
      variant: 'featuredGrid';
      /** Full-width image above the thumbnail row. */
      featured?: ProjectChallengeImage;
      /** Full-width video above the thumbnail row (takes precedence over `featured`). */
      featuredVideo?: ProjectChallengeVideo;
      images: ProjectChallengeImage[];
      /** Slightly larger thumbnail row (tighter card padding / gaps). */
      enlargeThumbs?: boolean;
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
      /** When true with 2 videos: one shared card, constrained width (smaller). */
      sharedCard?: boolean;
    }
  | {
      title?: string;
      variant: 'stack';
      images: ProjectChallengeImage[];
      /** Render images without card chrome (no border / shadow). */
      borderless?: boolean;
    }
  | {
      title?: string;
      variant: 'composite';
      /** Base art that defines the card aspect ratio / height. */
      image: ProjectChallengeImage;
      /** Video inset into a percentage frame of the base image. */
      overlayVideo: ProjectChallengeVideo & {
        /** Percentage rect within the image (0–100). Scales with the card. */
        frame: { left: number; top: number; width: number; height: number };
      };
    }
  | {
      title?: string;
      /** Image left + video right in a single card / one row. */
      variant: 'split';
      image: ProjectChallengeImage;
      video: ProjectChallengeVideo;
    }
  | {
      title?: string;
      /** Image + caption text in one card, optional thumb row below. */
      variant: 'imageCaption';
      image: ProjectChallengeImage;
      caption: string;
      thumbs?: ProjectChallengeImage[];
    };

export type ProjectSectionInsight = {
  title: string;
  body: string;
};

export type ProjectSectionBlock = {
  type: 'section';
  /** Optional chapter label shown above the title, e.g. "Chapter 1". */
  eyebrow?: string;
  title: string;
  /** Supporting question / line under the chapter title. */
  subtitle?: string;
  /** Keep subtitle on a single line (no wrap). */
  subtitleNowrap?: boolean;
  description?: string;
  /** Dashed placeholder frame until a diagram asset is ready. */
  diagramPlaceholder?: string;
  /** Optional full-width diagram under the section intro. */
  diagram?: ProjectChallengeImage;
  insights?: ProjectSectionInsight[];
  items?: ProjectSectionItem[];
  /**
   * `continuous` = no dividers, tighter gaps between numbered items
   * (e.g. Chapter 1). Default keeps separated feature blocks.
   */
  itemsLayout?: 'divided' | 'continuous';
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
  | ProjectPlaceholderBlock
  | ProjectSectionBlock
  | ProjectFindingsBlock;

export type ProjectData = {
  id: string;
  title: string;
  subtitle?: string;
  /** Supporting line shown under the subtitle. */
  description?: string;
  /** Optional demo / motion reel URL (e.g. Vimeo). */
  videoUrl?: string;
  videoLabel?: string;
  metadata: ProjectMetadata;
  content: ProjectContentItem[];
};

export const MOCK_PROJECTS: Record<string, ProjectData> = {
  'github-copilot': {
    id: 'github-copilot',
    title: 'GitHub Copilot for IDEs',
    subtitle:
      'Human-Agent Interaction Design for Cross-Platform Developer Workflows',
    description:
      'I worked on the Copilot plugins for Eclipse and IntelliJ, and will walk through the design process across both.',
    metadata: {
      role: 'UX Designer',
      team: 'Cross-functional team of designers, researchers, PMs, and engineers',
      duration: 'May 2025 – Present',
      impact:
        '· Defined cross-platform design strategy for Copilot experiences across Eclipse and IntelliJ\n· Owned UX design for GitHub Copilot in Eclipse\n· Contributed to IntelliJ experiences alongside fellow designers\n· Designed agent-driven workflows, context management, and failure recovery experiences\n· Partnered with engineers through implementation and launch.',
    },
    content: [
      {
        type: 'image',
        src: '/work/hero-image.png?v=3',
        alt: 'GitHub Copilot for IDEs hero',
        layout: 'full',
        width: 2644,
        height: 1434,
      },
      {
        type: 'section',
        eyebrow: 'Chapter 1',
        title: 'Understanding the Product',
        itemsLayout: 'continuous',
        items: [
          {
            title: 'Users',
            description:
              'Primary users are developers, operators, and QA engineers working inside IDEs. A large share of adoption comes from B2B enterprise buyers who purchase Copilot for teams — so the experience must serve both individual practitioners and organizational buyers who care about control, clarity, and scale.',
            metrics: {
              stats: [
                {
                  value: '20M+',
                  label: 'GitHub Copilot users worldwide',
                },
                {
                  value: '90%',
                  label: 'Fortune 100 adoption',
                },
                {
                  value: 'Cross-platform',
                  label: 'Supported IDEs',
                  detail: 'VS Code · IntelliJ · Visual Studio · Xcode · Eclipse',
                },
              ],
              charts: [
                {
                  type: 'line',
                  title: 'Copilot user scale',
                  caption:
                    'Cumulative all-time users · public Microsoft / GitHub milestones',
                  categories: [
                    'Dec 2022',
                    'Early 2024',
                    'Apr 2025',
                    'Jul 2025',
                  ],
                  beginAtZero: true,
                  valueFormat: 'compact',
                  series: [
                    {
                      name: 'All-time users',
                      color: '#0D7C6F',
                      data: [1_000_000, 3_750_000, 15_000_000, 20_000_000],
                    },
                  ],
                },
                {
                  type: 'share',
                  title: 'IDE footprint among Copilot platforms',
                  caption:
                    'Relative share of Stack Overflow 2025 IDE usage among Copilot-supported editors (normalized). Official Copilot MAU by IDE is not published.',
                  slices: [
                    { name: 'VS Code', value: 51, color: '#0D7C6F' },
                    { name: 'Visual Studio', value: 19, color: '#3B82F6' },
                    { name: 'IntelliJ', value: 18, color: '#6366F1' },
                    { name: 'Xcode', value: 7, color: '#94A3B8' },
                    { name: 'Eclipse', value: 5, color: '#CBD5E1' },
                  ],
                },
              ],
              footnote:
                'Sources: Microsoft earnings / TechCrunch (20M+ all-time users, Jul 2025; 90% Fortune 100); GitHub public milestones (1M Dec 2022, 15M Apr 2025). IDE bars use Stack Overflow Developer Survey 2025 usage among Copilot-supported IDEs, normalized to 100% — a public proxy for relative footprint, not internal plugin MAU.',
            },
          },
          {
            title: 'Typical Workflow',
            description:
              'How developers collaborate with GitHub Copilot across a coding task — from understanding goal and context through plan, implement, test, iterate, and ship — with retry and rollback paths when things go wrong.',
            diagram: {
              src: '/work/ai-coding-flow.webp',
              alt: 'AI coding flow diagram for GitHub Copilot',
              width: 680,
              height: 680,
              fit: 'natural',
              cardBg: 'transparent',
            },
          },
          {
            title: 'AI Capability',
            description:
              'We selectively reveal agent content to users: information that is not critical while the agent is running is collapsed to improve screen efficiency, while users can manually expand it to inspect details. When an error occurs, the full details expand by default so users can locate the issue.',
            balance: {
              left: 'More autonomy',
              right: 'More predictability',
            },
            mediaGroups: [
              {
                title: 'Sub-agent Design',
                variant: 'transition',
                after: [
                  {
                    src: '/work/subagent-expand.png?v=3',
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
                variant: 'composite',
                image: {
                  src: '/work/thinking-process.jpg',
                  alt: 'Thinking process states: running, finished, and expand on click',
                  cardBg: '#CCE2E0',
                  width: 6534,
                  height: 3456,
                },
                overlayVideo: {
                  src: '/work/record-thinking.mp4',
                  alt: 'Thinking process recording in the editor chat panel',
                  cardBg: '#1E1E1E',
                  width: 580,
                  height: 1000,
                  frame: {
                    left: 70.53,
                    top: 15.7,
                    width: 23.69,
                    height: 77.2,
                  },
                },
              },
              {
                title: 'Context Understanding + Awareness',
                variant: 'split',
                image: {
                  src: '/work/context-understanding.png',
                  alt: 'Context understanding before and after: compact multi-file context in chat',
                  cardBg: '#CCE2E0',
                  width: 2776,
                  height: 2304,
                },
                video: {
                  src: '/work/record-context-window.mp4',
                  alt: 'Context window awareness recording showing token usage breakdown',
                  cardBg: '#DCE8E7',
                  width: 424,
                  height: 800,
                },
              },
            ],
            afterInsight: {
              title: "Collecting User's Feedback",
              mediaGroups: [
                {
                  variant: 'stack',
                  images: [
                    {
                      src: '/work/users-pain-point.png',
                      alt: "User pain points from research interviews",
                      cardBg: '#1A1A1A',
                      width: 2200,
                      height: 1112,
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        type: 'section',
        eyebrow: 'Chapter 2',
        title: 'Beyond Happy Path: Building Trust in AI Coding',
        subtitle:
          'When AI is powerful, how do we design for mistakes, uncertainty, and human control?',
        subtitleNowrap: true,
        description:
          'Traditional software workflows are largely linear, but AI coding is full of uncertainty. The agent may fail, need to retry, or roll back — so the experience has to give developers more control. AI accelerates coding, but it also amplifies uncertainty.',
        diagram: {
          src: '/work/agent-ux-flow.jpg',
          alt: 'Agent UX flow diagram for failure, retry, and human control paths',
          width: 6144,
          height: 2808,
        },
        insights: [
          {
            title: "Developers don't follow one path",
            body: 'Multiple files. Multiple tasks. Multiple AI conversations.',
          },
          {
            title: 'AI can make mistakes faster',
            body: 'Faster generation ≠ faster confidence.',
          },
          {
            title: 'Developers need control points',
            body: 'Review. Modify. Undo. Switch context.',
          },
        ],
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/error.webp',
                alt: 'Error handling experience in AI coding workflows',
                cardBg: '#F3F3F3',
                width: 2200,
                height: 1164,
              },
              {
                src: '/work/rollback-retry.webp',
                alt: 'Rollback and retry controls for AI coding workflows',
                cardBg: '#F3F3F3',
                width: 2200,
                height: 1164,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        eyebrow: 'Chapter 3',
        title: 'Core Feature Design',
        items: [
          {
            title: 'Cost Transparency',
            diagram: {
              src: '/work/cost-token-billing-ux-flow.webp',
              alt: 'Cost changed to token-based billing UX flow diagram',
              width: 2578,
              height: 1630,
            },
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
                    src: '/work/tbb-flow.jpg',
                    alt: 'Token-based billing flow for cost transparency',
                    cardBg: '#F3F3F3',
                    width: 4976,
                    height: 2128,
                  },
                  {
                    src: '/work/token-saving-tips.jpg',
                    alt: 'Token saving tips for managing Copilot usage cost',
                    cardBg: '#F3F3F3',
                    width: 5686,
                    height: 2106,
                  },
                  {
                    src: '/work/tbb-notifications.jpg',
                    alt: 'Token-based billing notifications and usage alerts',
                    cardBg: '#F3F3F3',
                    width: 5686,
                    height: 4088,
                  },
                  {
                    src: '/work/indicator-explore.png',
                    alt: 'Usage indicator design exploration and in-product mockup',
                    cardBg: '#F7F8F8',
                    width: 2200,
                    height: 1164,
                  },
                ],
                sharedCard: true,
                videos: [
                  {
                    src: '/work/record-session-usage.mp4',
                    alt: 'Session usage recording for cost transparency',
                    cardBg: '#1E1E1E',
                    width: 283,
                    height: 400,
                  },
                  {
                    src: '/work/record-session-view.mp4',
                    alt: 'Session view recording for cost transparency',
                    cardBg: '#1E1E1E',
                    width: 189,
                    height: 400,
                  },
                ],
              },
            ],
          },
          {
            title: 'NES (Nest Edit Suggestions)',
            description:
              'A Code Completion capability that surfaces next-edit suggestions directly in the editor — so the main interaction loop stays inside the coding surface, not a separate chat panel.',
            mediaGroups: [
              {
                variant: 'featuredGrid',
                enlargeThumbs: true,
                featuredVideo: {
                  src: '/work/recording-eclipse-nes.mp4',
                  alt: 'Eclipse NES recording: next edit suggestions in the editor',
                  cardBg: '#1E1E1E',
                  playbackRate: 1.5,
                },
                images: [
                  {
                    src: '/work/nes-delete.jpg',
                    alt: 'Delete',
                    cardBg: '#1B1B1B',
                    width: 2474,
                    height: 1314,
                  },
                  {
                    src: '/work/nes-multiple-line.jpg',
                    alt: 'Replace',
                    cardBg: '#1B1B1B',
                    width: 2508,
                    height: 1328,
                  },
                  {
                    src: '/work/nes-add.jpg',
                    alt: 'Add',
                    cardBg: '#1B1B1B',
                    width: 2508,
                    height: 1328,
                  },
                ],
              },
              {
                variant: 'grid',
                matchHeight: true,
                images: [
                  {
                    src: '/work/nes-color-contrast.webp',
                    alt: 'NES color contrast exploration',
                    cardBg: '#F3F3F3',
                    width: 1560,
                    height: 2184,
                  },
                  {
                    src: '/work/nes-components.jpg',
                    alt: 'NES component states and variants',
                    cardBg: '#F3F3F3',
                    width: 2476,
                    height: 2214,
                  },
                ],
              },
            ],
          },
          {
            title: 'AI Model Management',
            description:
              'BYOK (Bring Your Own Key) lets developers use their own models inside Copilot — including domestic LLMs — via personal API keys and custom endpoints, so teams can choose the model that fits their workflow, compliance, and cost needs.',
            mediaGroups: [
              {
                variant: 'stack',
                images: [
                  {
                    src: '/work/byok.jpg',
                    alt: 'Bring Your Own Key model management in Copilot',
                    cardBg: '#F3F3F3',
                    width: 5686,
                    height: 2040,
                  },
                  {
                    src: '/work/custom-endpoint.jpg',
                    alt: 'Custom endpoint configuration for BYOK models',
                    cardBg: '#F3F3F3',
                    width: 2843,
                    height: 1853,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        eyebrow: 'Chapter 4',
        title: 'UI System Design, Visual Quality & Accessibility',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/eclipse-icons.webp',
                alt: 'Eclipse Copilot icon system',
                cardBg: '#D9D9D9',
                width: 2400,
                height: 1270,
              },
              {
                src: '/work/eclipse-ui-levelup.png',
                alt: 'Eclipse Copilot UI level-up screens',
                cardBg: '#E1EAE9',
                width: 2070,
                height: 1164,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Design for Eclipse Quick Start — prepare for opensource',
        mediaGroups: [
          {
            variant: 'stack',
            borderless: true,
            images: [
              {
                src: '/work/quick-start-flow.webp',
                alt: 'Eclipse Copilot Quick Start onboarding flow',
                cardBg: 'transparent',
                width: 6355,
                height: 1156,
              },
            ],
          },
          {
            variant: 'imageCaption',
            image: {
              src: '/work/quick-start-light-mode.png',
              alt: 'Eclipse Copilot Quick Start guide modal in light mode',
              cardBg: '#F3F3F3',
              width: 890,
              height: 592,
            },
            caption:
              'This guidance window automatically pops up for first-time Eclipse users.',
            thumbs: [
              {
                src: '/work/quick-start-agent.png',
                alt: 'Agent',
                cardBg: '#FFFFFF',
                width: 500,
                height: 287,
              },
              {
                src: '/work/quick-start-ask.png',
                alt: 'Ask',
                cardBg: '#FFFFFF',
                width: 500,
                height: 287,
              },
              {
                src: '/work/quick-start-nes.png',
                alt: 'NES',
                cardBg: '#FFFFFF',
                width: 500,
                height: 287,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Shipped on JetBrains Marketplace',
        description:
          'Official plugin website screenshots featuring the product UI I designed — Agent, Ask, and Code Completion — as shown to users on the JetBrains Marketplace listing.',
        mediaGroups: [
          {
            variant: 'featuredGrid',
            featured: {
              src: '/work/copilot-plugin-website.jpg',
              alt: 'JetBrains Marketplace plugin website featuring Copilot UI',
              cardBg: '#F5F5F5',
              width: 1600,
              height: 866,
            },
            images: [
              {
                src: '/work/copilot-agent.jpg',
                alt: 'Agent',
                cardBg: '#1B1B1B',
                width: 1600,
                height: 900,
              },
              {
                src: '/work/copilot-ask.jpg',
                alt: 'Ask',
                cardBg: '#1B1B1B',
                width: 1600,
                height: 900,
              },
              {
                src: '/work/copilot-code-completion.jpg',
                alt: 'Code Completion',
                cardBg: '#1B1B1B',
                width: 1600,
                height: 900,
              },
            ],
          },
          {
            variant: 'grid',
            matchHeight: true,
            images: [
              {
                src: '/work/eclipse-poster.jpg',
                alt: 'Eclipse Copilot visual poster',
                cardBg: '#0C022F',
                width: 2560,
                height: 1440,
              },
              {
                src: '/work/eclipse-ui-dark-theme.jpg',
                alt: 'Eclipse Copilot UI dark theme',
                cardBg: '#1E1E1E',
                width: 1200,
                height: 652,
              },
            ],
          },
        ],
      },
    ],
  },
  'raymics-cloud': {
    id: 'raymics-cloud',
    title: 'Raymics Cloud',
    subtitle: 'Research-led redesign for a medical AI SaaS',
    description:
      'A radiomics platform for doctors and researchers — redesigned around activation, conversion, and clearer workflows for complex medical AI tasks.',
    metadata: {
      role: 'UX Design Lead',
      team: 'Cross-functional · PM, AI engineers, SDEs, operations',
      duration: '2023 – 2024',
      impact:
        '· Led iterative user research and post-launch usability testing\n· Diagnosed low retention (15%) and payment completion (0.5%)\n· Redesigned onboarding, navigation, membership, and payment flows\n· Anchored a design system later extended to on-prem and federated products',
    },
    content: [
      {
        type: 'image',
        src: '/work/raymics-cloud-p01.png',
        alt: 'Raymics Cloud medical AI SaaS hero on laptop and phone',
        layout: 'full',
        width: 2304,
        height: 1296,
      },
      {
        type: 'section',
        title: 'Overview',
        description:
          'Raymics uses AI to analyze medical images (CT, MRI, PET) and offers zero-code paths for radiomics processing. I led UX across product lines — personas, research, usability testing, wireframes, and prototyping — with Raymics Cloud as the primary SaaS surface for doctors.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-cloud-p02.png',
                alt: 'Project overview: business, role, timeline, and stakeholder map',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Finding the problem',
        description:
          'After launch, retention sat at 15% and payment completion at 0.5%. A funnel from site visits → register → train model → pay showed the steepest drop between registration and finishing a training run. I led usability testing one month post-launch to find why customers would not convert.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-cloud-p03.png',
                alt: 'Personas, journey maps, and post-launch funnel metrics',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 2204,
              },
              {
                src: '/work/raymics-cloud-p04.png',
                alt: 'Usability test goals, tasks, synthesis, and stakeholder sync',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-cloud-p05.png',
                alt: 'Usability test conclusions prioritized by severity',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Design strategy',
        description:
          'We focused on four moves: shorten onboarding to raise activation, improve ease of use for expert-dense screens, clarify payment and membership, and ship feedback-driven features that made model results more trustworthy.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-cloud-p06.png',
                alt: 'Design strategy across onboarding, ease of use, payment, and new features',
                cardBg: '#F3F5F8',
                width: 2304,
                height: 4437,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Onboarding',
        description:
          'We shortened the first-run path and redesigned onboarding so new users reach an aha moment faster — with self-led tutorials and a clearer free-trial entry.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-cloud-p07.png',
                alt: 'Onboarding redesign: old flow versus first revised flow',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 2775,
              },
              {
                src: '/work/raymics-cloud-p08.png',
                alt: 'New onboarding with aha moment, tutorials, and free trial',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 2457,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Ease of use',
        description:
          'Horizontal navigation gave way to a vertical rail better suited to a multi-module tool. Membership cards, status cues, and in-app help made expert workflows easier to scan and recover from.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-cloud-p09.png',
                alt: 'Ease of use: vertical navigation and dashboard layout redesign',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-cloud-p10.png',
                alt: 'Membership system design with Basic vs Premium and status states',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-cloud-p11.png',
                alt: 'Status cues, in-app help, and data visualization improvements',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 3100,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Payment & membership',
        description:
          'We clarified pricing, shortened the purchase path, and redesigned payment cards so Basic, Premium, and Enterprise options were easier to compare and buy.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-cloud-p12.png',
                alt: 'Payment optimization: pricing strategy and shorter purchase path',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1520,
              },
              {
                src: '/work/raymics-cloud-p13.png',
                alt: 'Shortened payment path with fewer clicks and in-page login',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-cloud-p14.png',
                alt: 'Competitive study of SaaS pricing and comparison pages',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-cloud-p15.png',
                alt: 'Payment card redesign with membership tiers and benefits comparison',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 2474,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'New features',
        description:
          'Based on usability feedback, we added custom research charts and reports so users could prepare journal-ready visuals without leaving the product.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-cloud-p16.png',
                alt: 'Custom research charts and reports feature for journals',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1854,
              },
              {
                src: '/work/raymics-cloud-p17.png',
                alt: 'Custom report UI with chart editing and Excel export',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Cross-product & other surfaces',
        description:
          'We connected SaaS, the marketing site, and community surfaces, and shipped supporting pages plus H5 mobile flows so the experience stayed coherent across channels.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-cloud-p18.png',
                alt: 'Cross-product navigation between SaaS, website, and community',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-cloud-p19.png',
                alt: 'Other pages: trial, datasets, projects, and training report',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1551,
              },
              {
                src: '/work/raymics-cloud-p20.png',
                alt: 'H5 mobile screens for payment, landing, community, and profile',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1551,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Design system',
        description:
          'Cloud became the design-language anchor for the rest of the Raymics suite — including hospital on-premises deployment and federated learning — so researchers could move between products without relearning the system.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-cloud-p21.png',
                alt: 'UI kit and design guidelines for Raymics Cloud',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1778,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Results',
        description:
          'After optimization, retention, onboarding completion, and payment behavior moved in the right direction — and follow-up interviews confirmed we had addressed several of the problems users raised.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-cloud-p22.png',
                alt: 'User behavior key results after the Cloud redesign',
                cardBg: '#F3F5F8',
                width: 2304,
                height: 1296,
              },
            ],
          },
        ],
      },
    ],
  },
  'raymics-enterprise': {
    id: 'raymics-enterprise',
    title: 'Raymics On-Prem & Federated Learning',
    subtitle:
      'Extending the SaaS design system to hospital deployment and multi-institution collaboration',
    description:
      'A 0–1 B2B platform for department directors and IT — multi-role permissions on-premises, plus federated learning across institutions without moving raw data.',
    metadata: {
      role: 'UX Designer',
      team: 'Product · research, workflow, demo, and design-system reuse',
      duration: '2024',
      impact:
        '· Smooth interaction and design concepts supported million-level hospital contracts\n· Batch operations improved efficiency and reduced errors\n· Reused SaaS components to shorten development',
    },
    content: [
      {
        type: 'image',
        src: '/work/raymics-enterprise-p01.png',
        alt: 'Raymics Fusion on-premises and federated learning platform hero',
        layout: 'full',
        width: 2304,
        height: 1296,
      },
      {
        type: 'section',
        title: 'Overview',
        description:
          'Hospitals needed local deployment for data control, and multi-institution research needed federated learning so models could train without sharing raw patient data. Building on Raymics Cloud, I designed the on-prem research platform and federated collaboration flows as one enterprise story — not two disconnected products.',
      },
      {
        type: 'section',
        title: 'Complex stakeholder system',
        description:
          'Directors create cooperation projects and open permissions; doctors participate and work with public or shared data; information departments monitor authority changes; Fusion nodes accept desensitized uploads from each institution and return a shared model. The UX had to make roles, permissions, and data paths legible.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-enterprise-p02.png',
                alt: 'Complex stakeholder system across on-prem, Fusion nodes, and permissions',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'IA & workflows',
        description:
          'Information architecture covered data upload and checks, research topics and tasks, AI model training, public-data permissions, and setup — with a process spine from upload through training. The on-prem front page kept Cloud interaction patterns while adding denser data visualization for hospital operators.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-enterprise-p03.png',
                alt: 'Information architecture wireframes across five main navigation processes',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p04.png',
                alt: 'On-premises front page with stats, usage flow, and quick entries',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p05.png',
                alt: 'Role permissions page for apply, audit, and access management',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p06.png',
                alt: 'AI model training UI from prep through aggregate results',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Design system reuse',
        description:
          'Card sizes, navigation, and status colors stayed aligned with Cloud so users could adapt quickly. Differentiation came through specialized data cards, federated institution pickers, and batch operations for doctors running multi-source training.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-enterprise-p07.png',
                alt: 'Design system reuse and consistency across SaaS surfaces',
                cardBg: '#F3F5F8',
                width: 2304,
                height: 2018,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'On-prem & federated results',
        description:
          'Locally deployed products supported million-level hospital contracts. Batch processing improved operation efficiency and reduced errors. Reusing Cloud components shortened development.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-enterprise-p08.png',
                alt: 'Feedback and key results for on-prem and federated products',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Supporting product lines',
        description:
          'Beyond on-prem and federated learning, the suite also needed coherent desktop tools, community, and website surfaces — so researchers could move between products without relearning the system.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-enterprise-p09.png',
                alt: 'Supporting product lines hero for desktop tools, community, and website',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p10.png',
                alt: 'Medical data processing tool overview: position, cores, and references',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p11.png',
                alt: 'Build frames for navigation hierarchy and scalable dashboard layout',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p12.png',
                alt: 'Landing page design comparing card versus table display',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p13.png',
                alt: 'Prototype collage of dashboard, forms, and modules',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p14.png',
                alt: 'Main process workflow from import through ROI, desensitize, and upload',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Medical community',
        description:
          'We designed a 0–1 medical community with a clear information architecture, consistent grids and navigation, and social interactions that connected back to the product suite.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-enterprise-p15.png',
                alt: 'Medical community 0–1 information architecture',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p16.png',
                alt: 'Community design detail with 3-column grid and consistent top nav',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p17.png',
                alt: 'Community hover states, social actions, and cross-product switching',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p18.png',
                alt: 'Editing, post, and save-draft process for community content',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p19.png',
                alt: 'AI tool-assisted design workflow with Cursor, v0, and Claude',
                cardBg: '#F3F5F8',
                width: 2304,
                height: 2952,
              },
              {
                src: '/work/raymics-enterprise-p20.png',
                alt: 'Launched community pages on desktop and mobile',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 1500,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Official website',
        description:
          'The official site IA and launched pages — home, products, pricing, and mega-menu — presented the enterprise suite as one coherent brand story.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-enterprise-p21.png',
                alt: 'Official website information architecture',
                cardBg: '#F7F8FA',
                width: 2304,
                height: 1296,
              },
              {
                src: '/work/raymics-enterprise-p22.png',
                alt: 'Official website launched pages: home, products, pricing, and mega-menu',
                cardBg: '#FFFFFF',
                width: 2304,
                height: 2028,
              },
            ],
          },
        ],
      },
    ],
  },
  'rou-water': {
    id: 'rou-water',
    title: 'ROU Water Customize Mini Program',
    subtitle: 'Market-driven UX for custom bottled water on WeChat',
    description:
      'A consumer mini program that lowers MOQ and price barriers for personalized water — from scenario research through customize, checkout, and referral growth.',
    videoUrl: 'https://vimeo.com/805996585',
    videoLabel: 'Figma motion demo — customize flow',
    metadata: {
      role: 'UX Designer',
      team: '5-person product team + Canvas (outsourcing materials/interfaces)',
      duration: 'Oct 2021 – 2023',
      impact:
        '· Researched real demand: high MOQ and price blocked willingness to pay\n· Defined core flows: DIY label, referral community, cart, and order edit\n· Designed lo-fi through hi-fi, motion demos, and expandable packaging types',
    },
    content: [
      {
        type: 'image',
        src: '/work/rou-water-hero.png',
        alt: 'ROU Water customize mini program hero on two phones',
        layout: 'full',
        width: 2400,
        height: 1350,
      },
      {
        type: 'section',
        title: 'Overview',
        description:
          'Existing custom-water services asked for large minimum orders at prices users would not pay. ROU Soft Water targeted a lower MOQ and clearer DIY path in a WeChat mini program. I joined early research and owned detailed process design, high-fidelity screens, and motion demos.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/rou-water-overview.png',
                alt: 'Project overview, problem framing, and role',
                cardBg: '#F5F9FC',
                width: 2400,
                height: 1351,
              },
              {
                src: '/work/rou-water-stakeholders.png',
                alt: 'Stakeholder map including water company, users, and Canvas',
                cardBg: '#FFFFFF',
                width: 2400,
                height: 1350,
              },
              {
                src: '/work/rou-water-p08.png',
                alt: 'Product positioning: customization, share desire, brand, and scalable app screens',
                cardBg: '#F5F5F5',
                width: 2400,
                height: 1900,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Scenarios & personas',
        description:
          'Without rich C-end data, we explored party, exhibition, reunion, and meeting scenarios, then validated with questionnaires. Two personas — B2B event buyer and family celebration — shaped goals around customization, checkout friction, and sharing.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/rou-water-scenarios.png',
                alt: 'User scenario mapping to product functions',
                cardBg: '#FFFFFF',
                width: 2400,
                height: 1350,
              },
              {
                src: '/work/rou-water-personas.png',
                alt: 'Personas and key points for customize, checkout, and sharing',
                cardBg: '#F5F9FC',
                width: 2032,
                height: 2400,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Flow & customize experience',
        description:
          'Hand sketches became wireframes for home and bottle selection, then a hi-fi path: pick bottle type with 3D rotate preview → design label → confirm order → share after pay. Referral “helping water” and coupon loops supported acquisition.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/rou-water-flow.png',
                alt: 'UX flow sketches and wireframes for home and bottle selection',
                cardBg: '#FFFFFF',
                width: 2400,
                height: 1350,
              },
              {
                src: '/work/rou-water-customize.png',
                alt: 'Customize, checkout, and purchase-success screens',
                cardBg: '#F7F8FA',
                width: 2400,
                height: 1350,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Visual system',
        description:
          'Blue as the primary brand color for water, with a bright green accent for CTAs and alerts — modern enough for younger users while keeping the interface calm and readable.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/rou-water-p16.png',
                alt: 'Color system with brand blues, green accent, and bottle selection screen',
                cardBg: '#FFFFFF',
                width: 2400,
                height: 1350,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Scalability',
        description:
          'The same customize spine can expand to other packaging — candy, cans, and beyond — so the company can grow SKUs without teaching users a new process.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/rou-water-scalability.png',
                alt: 'Expanded product types and home page for scalable customization',
                cardBg: '#FFFFFF',
                width: 2400,
                height: 1350,
              },
            ],
          },
        ],
      },
    ],
  },
  'daily-more': {
    id: 'daily-more',
    title: 'Daily More Brand IP & VI',
    subtitle: 'Vintage cartoon identity for a Thai street food & milk tea restaurant in Florida',
    description:
      'Logo, character IP, and visual system applied across cups, neon, interiors, stickers, and staff uniforms — built for a real Orlando restaurant.',
    metadata: {
      role: 'Brand & Visual Designer',
      team: 'Independent brand work for Daily More',
      duration: '2022',
      impact:
        '· Designed logo and dual IP characters from dish/bottle metaphors\n· Defined orange–green–peach palette tied to Thai / Florida tropical cues\n· Shipped applications on packaging, neon, menus, and store environment',
    },
    content: [
      {
        type: 'image',
        src: '/work/daily-more-hero.png',
        alt: 'Daily More brand IP hero with character and packaging context',
        layout: 'full',
        width: 2400,
        height: 1350,
      },
      {
        type: 'section',
        title: 'Overview',
        description:
          'Daily More needed a vivid vintage-cartoon logo and identity for website, milk-tea bottles, wrap bags, and interior. Characters are playful deformations of a plate and a milk-tea cup — memorable IP for Thai street food & milk tea in Florida.',
      },
      {
        type: 'section',
        title: 'Logo design exploration',
        description:
          'Sketches tested character poses, palm-tree framing, and type arches. Final mark pairs the plate character with a sleeping cup companion under “DAILY MORE / Thai Street Food & Milk Tea.” Orange, green, and peach reference Thai cuisine color and Florida tropical context.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/daily-more-logo.png',
                alt: 'Logo sketches, iterations, color palette, and final mark',
                cardBg: '#FFF8F0',
                width: 2400,
                height: 1350,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Menu design',
        description:
          'Food menus and seasonal posters extend the brand into daily operations — pairing dish photography with playful type, while milk-tea series posters keep the IP characters and packaging in the same visual language.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/daily-more-menu-01.jpg',
                alt: 'Daily More food menu with noodle and rice sections',
                cardBg: '#F7F3EB',
                width: 1600,
                height: 1035,
              },
              {
                src: '/work/daily-more-menu-03.jpg',
                alt: 'Daily More build-a-noodle-bowl menu and lunch combo',
                cardBg: '#F7F3EB',
                width: 1600,
                height: 1035,
              },
            ],
          },
          {
            title: 'Seasonal & series posters',
            variant: 'grid',
            matchHeight: true,
            compact: true,
            images: [
              {
                src: '/work/daily-more-thanksgiving.png?v=2',
                alt: 'Daily More Thanksgiving Day promotional poster with brand characters',
                cardBg: '#F4E8D8',
                width: 1282,
                height: 1600,
              },
              {
                src: '/work/daily-more-milk-tea-series.jpg?v=2',
                alt: 'Daily More Milk Tea Series poster with caramel, ube, and taro drinks',
                cardBg: '#3D4A2E',
                width: 1035,
                height: 1600,
              },
              {
                src: '/work/daily-more-salted-cheese-series.jpg?v=1',
                alt: 'Daily More Salted Cheese Milk Foam Series poster with peach oolong and double berry',
                cardBg: '#E8A878',
                width: 1035,
                height: 1600,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'In-store applications',
        description:
          'The identity lands on cups, matcha and Thai tea packaging, neon signage, and interior walls — mixing studio shots with customer Instagram photos from the Orlando location.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/daily-more-applications.webp',
                alt: 'Logo applied on cups, food, neon, and restaurant interior',
                cardBg: '#FFFFFF',
                width: 2400,
                height: 1350,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Derivative design',
        description:
          'Festival stickers put the two IP characters in lively scenes for customer giveaways. A simplified mark scales to staff uniforms and food packaging without losing recognition.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/daily-more-derivatives.png',
                alt: 'Sticker set and simplified logo on staff uniform',
                cardBg: '#FFF8F0',
                width: 2400,
                height: 1350,
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * Former Four Challenges media kept for redistribution into Chapters 1–4.
 * Not rendered until placement is decided.
 */
export const COPILOT_CHALLENGE_STASH: ProjectSectionItem[] = [
  {
    title: 'Failure & Uncertainty',
  },
];
