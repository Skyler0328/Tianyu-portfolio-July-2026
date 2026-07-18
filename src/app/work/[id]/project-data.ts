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
  description?: string;
  /** Dashed placeholder frame until a diagram asset is ready. */
  diagramPlaceholder?: string;
  insights?: ProjectSectionInsight[];
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
        src: '/work/hero-image.png',
        alt: 'GitHub Copilot for IDEs hero',
        layout: 'full',
        width: 3968,
        height: 2518,
      },
      {
        type: 'section',
        title: "Collecting User's Feedback",
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/users-pain-point.png',
                alt: "User pain points from research interviews",
                cardBg: '#1A1A1A',
                width: 3300,
                height: 2367,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        eyebrow: 'Chapter 1',
        title: 'Understanding the Product',
        items: [
          {
            title: 'Users',
            description:
              'Primary users are developers, operators, and QA engineers working inside IDEs. A large share of adoption comes from B2B enterprise buyers who purchase Copilot for teams — so the experience must serve both individual practitioners and organizational buyers who care about control, clarity, and scale.',
            bullets: [
              'Developers writing and reviewing code day to day',
              'Operators and QA validating changes in real workflows',
              'Enterprise teams purchasing and deploying Copilot at scale',
            ],
          },
          {
            title: 'Typical Workflow',
            description:
              'How developers collaborate with GitHub Copilot across a coding task — from understanding goal and context through plan, implement, test, iterate, and ship — with retry and rollback paths when things go wrong.',
            diagram: {
              src: '/work/copilot-typical-workflow.jpg',
              alt: 'Typical workflow of GitHub Copilot and related UX challenges',
              width: 2000,
              height: 1843,
            },
          },
          {
            title: 'AI Capability',
            description:
              'Selective autonomy: increase agent efficiency without making developers feel they have lost control. Critical information stays visible; non-critical detail can collapse while the agent runs, and expand on demand — with full detail opening by default when something fails.',
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
                variant: 'stack',
                images: [
                  {
                    src: '/work/thinking-process.png',
                    alt: 'Thinking process states: running, finished, and expand on click',
                    cardBg: '#E1EAE9',
                    width: 6534,
                    height: 3456,
                  },
                ],
              },
              {
                title: 'Context Understanding',
                variant: 'transition',
                before: {
                  src: '/work/agent-autonomy-before.png',
                  alt: 'Previous file change experience before the Context Understanding redesign',
                  cardBg: '#F3F3F3',
                },
                after: [
                  {
                    src: '/work/agent-autonomy-after-1.svg',
                    alt: 'Redesigned multi-file context experience, first state',
                    cardBg: '#F3F3F3',
                  },
                  {
                    src: '/work/agent-autonomy-after-2.svg',
                    alt: 'Redesigned multi-file context experience, second state',
                    cardBg: '#F3F3F3',
                  },
                  {
                    src: '/work/agent-autonomy-after-3.svg',
                    alt: 'Redesigned multi-file context experience, third state',
                    cardBg: '#F3F3F3',
                  },
                ],
              },
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
            insight:
              'We selectively reveal agent content to users: information that is not critical while the agent is running is collapsed to improve screen efficiency, while users can manually expand it to inspect details. When an error occurs, the full details expand by default so users can locate the issue.',
          },
        ],
      },
      {
        type: 'section',
        eyebrow: 'Chapter 2',
        title: 'Beyond Happy Path: Building Trust in AI Coding',
        subtitle:
          'When AI is powerful, how do we design for mistakes, uncertainty, and human control?',
        description:
          'Traditional software workflows are largely linear, but AI coding is full of uncertainty. The agent may fail, need to retry, or roll back — so the experience has to give developers more control. AI accelerates coding, but it also amplifies uncertainty.',
        diagramPlaceholder: 'AI coding workflow diagram — placeholder',
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
      },
      {
        type: 'section',
        eyebrow: 'Chapter 3',
        title: 'Core Feature Design',
        items: [
          {
            title: 'Cost Transparency',
            diagram: {
              src: '/work/cost-token-billing-ux-flow.png',
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
        ],
      },
      {
        type: 'section',
        eyebrow: 'Chapter 4',
        title: 'Continuous UX Improvements',
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
                width: 3300,
                height: 1746,
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
        src: '/work/raymics-cloud-hero.png',
        alt: 'Raymics Cloud medical AI SaaS hero on laptop and phone',
        layout: 'full',
        width: 3840,
        height: 2160,
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
                src: '/work/raymics-cloud-ecosystem.png',
                alt: 'Raymics product ecosystem, timeline, and stakeholder map',
                cardBg: '#F7F8FA',
                width: 3840,
                height: 2160,
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
                src: '/work/raymics-cloud-research.png',
                alt: 'Personas, journey maps, and post-launch funnel metrics',
                cardBg: '#FFFFFF',
                width: 3840,
                height: 3672,
              },
              {
                src: '/work/raymics-cloud-usability.png',
                alt: 'Usability test process, tasks, and affinity mapping',
                cardBg: '#F7F8FA',
                width: 3840,
                height: 2160,
              },
              {
                src: '/work/raymics-cloud-findings.png',
                alt: 'Usability test conclusions prioritized by severity',
                cardBg: '#FFFFFF',
                width: 3840,
                height: 2160,
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
                src: '/work/raymics-cloud-strategy.png',
                alt: 'Design strategy across onboarding, ease of use, payment, and new features',
                cardBg: '#F3F5F8',
                width: 3840,
                height: 7394,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Ease of use & membership',
        description:
          'Horizontal navigation gave way to a vertical rail better suited to a multi-module tool, with critical membership and resource info brought above the fold. Membership cards use color and avatar frames to make Basic vs Premium and active / expired / not-purchased states scannable.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-cloud-ease-nav.png',
                alt: 'Before and after dashboard navigation and resource cards',
                cardBg: '#FFFFFF',
                width: 3840,
                height: 2160,
              },
              {
                src: '/work/raymics-cloud-membership.png',
                alt: 'Membership system states: not purchased, active, and expired',
                cardBg: '#F7F8FA',
                width: 3840,
                height: 2160,
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        body: 'Cloud became the design-language anchor for the rest of the Raymics suite — including hospital on-premises deployment and federated learning — so researchers could move between products without relearning the system.',
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
        src: '/work/raymics-enterprise-hero.png',
        alt: 'Raymics Fusion on-premises and federated learning platform hero',
        layout: 'full',
        width: 3840,
        height: 2160,
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
                src: '/work/raymics-enterprise-stakeholders.png',
                alt: 'Complex stakeholder system across on-prem, Fusion nodes, and permissions',
                cardBg: '#FFFFFF',
                width: 3840,
                height: 2160,
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
                src: '/work/raymics-enterprise-ia.png',
                alt: 'Information architecture wireframes and process flowchart',
                cardBg: '#F7F8FA',
                width: 3840,
                height: 2160,
              },
              {
                src: '/work/raymics-enterprise-frontpage.png',
                alt: 'On-premises front page with data warehouse, workflow, and training table',
                cardBg: '#FFFFFF',
                width: 3840,
                height: 2160,
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
                src: '/work/raymics-enterprise-ds-reuse.png',
                alt: 'Design system reuse across on-prem dashboard and federated learning batch flows',
                cardBg: '#F3F5F8',
                width: 3840,
                height: 3362,
              },
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Results',
        description:
          'Locally deployed products supported million-level hospital contracts. Batch processing improved operation efficiency and reduced errors. Reusing Cloud components shortened development.',
        mediaGroups: [
          {
            variant: 'stack',
            images: [
              {
                src: '/work/raymics-enterprise-results.png',
                alt: 'Feedback and key results for on-prem and federated products',
                cardBg: '#FFFFFF',
                width: 3840,
                height: 2160,
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
            images: [
              {
                src: '/work/daily-more-thanksgiving.jpg',
                alt: 'Daily More Thanksgiving Day promotional poster with brand characters',
                cardBg: '#F4E8D8',
                width: 1282,
                height: 1600,
              },
              {
                src: '/work/daily-more-milk-tea-series.jpg',
                alt: 'Daily More Milk Tea Series poster with caramel, ube, and taro drinks',
                cardBg: '#3D4A2E',
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
                src: '/work/daily-more-applications.png',
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
