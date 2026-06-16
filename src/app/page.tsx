'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconArrowRight, IconX } from '@tabler/icons-react';

import { FlagshipCasePreview } from '@/components/FlagshipCasePreview';

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Root: orchestrates top-level cascade */
const pageRoot = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.048,
      delayChildren: 0.07,
    },
  },
};

/** Leaf blocks: subtle lift + fade */
const pageItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: easeOut },
  },
};

/** Hero inner: after hero shell enters, staggers intro / statement / flagship */
const heroInner = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

/** Gallery: inherits `show`, then staggers title + cards */
const gallerySection = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

type MoreAboutCard = {
  id: string;
  frontTitle: string;
  backText: string;
  background: string;
  modalTitle: string;
  modalBody: string;
  modalVisual: string;
};

const projects: Project[] = [
  {
    id: 'agent-orchestration-console',
    title: 'Agent Orchestration Console',
    description: 'Control plane UX for multi-step AI workflows in enterprise SaaS.',
    tags: ['B2B', 'Design Systems', 'Research'],
  },
  {
    id: 'ide-inline-assistance',
    title: 'IDE Inline Assistance',
    description: 'Latency-sensitive surfaces for suggestions, diffs, and trust signals.',
    tags: ['AI IDE', 'Interaction', 'Prototyping'],
  },
  {
    id: 'compliance-audit-trails',
    title: 'Compliance & Audit Trails',
    description: 'Dense data tables and review flows for regulated operators.',
    tags: ['Complex Systems', 'IA', 'Content'],
  },
  {
    id: 'onboarding-power-users',
    title: 'Onboarding for Power Users',
    description: 'Progressive disclosure without blocking expert shortcuts.',
    tags: ['Onboarding', 'Metrics', 'A/B'],
  },
];

const moreAboutCards: MoreAboutCard[] = [
  {
    id: 'systems-thinking',
    frontTitle: 'Systems',
    backText: 'I like mapping ambiguous spaces into structures people can act on.',
    background:
      'bg-[radial-gradient(circle_at_85%_5%,#B7A7FF,transparent_34%),radial-gradient(circle_at_45%_120%,#19E6DA,transparent_46%),linear-gradient(135deg,#12DAD4,#AFA6FF)]',
    modalTitle: 'Systems Thinking',
    modalBody:
      'Placeholder for a short story, image, or artifact about how I structure complex product problems.',
    modalVisual:
      'bg-[radial-gradient(circle_at_80%_10%,#B7A7FF,transparent_32%),linear-gradient(135deg,#12DAD4,#AFA6FF)]',
  },
  {
    id: 'ai-collaboration',
    frontTitle: 'AI UX',
    backText: 'I focus on trust, control, recovery, and the moments where users need clarity.',
    background:
      'bg-[radial-gradient(circle_at_78%_34%,#FF4B9B,transparent_34%),linear-gradient(135deg,#FF7701,#FF6B8A)]',
    modalTitle: 'AI Collaboration',
    modalBody:
      'Placeholder for visual examples about AI interaction design, agent workflows, or trust patterns.',
    modalVisual:
      'bg-[radial-gradient(circle_at_80%_35%,#FF4B9B,transparent_34%),linear-gradient(135deg,#FF7701,#FF6B8A)]',
  },
  {
    id: 'craft',
    frontTitle: 'Craft',
    backText: 'I care about polished interaction details that make complex systems feel lighter.',
    background:
      'bg-[radial-gradient(circle_at_88%_18%,#39C4FF,transparent_34%),linear-gradient(135deg,#A58BFF,#8BB7FF)]',
    modalTitle: 'Design Craft',
    modalBody:
      'Placeholder for interface details, prototypes, motion studies, or visual explorations.',
    modalVisual:
      'bg-[radial-gradient(circle_at_88%_18%,#39C4FF,transparent_34%),linear-gradient(135deg,#A58BFF,#8BB7FF)]',
  },
  {
    id: 'research',
    frontTitle: 'Research',
    backText: 'I use research to reveal behavior, constraints, and decision-making context.',
    background:
      'bg-[radial-gradient(circle_at_15%_20%,#8FFFEF,transparent_28%),linear-gradient(135deg,#0FCFC7,#6DD6FF)]',
    modalTitle: 'Research Practice',
    modalBody:
      'Placeholder for research snapshots, user quotes, synthesis boards, or insights.',
    modalVisual:
      'bg-[radial-gradient(circle_at_20%_18%,#8FFFEF,transparent_28%),linear-gradient(135deg,#0FCFC7,#6DD6FF)]',
  },
  {
    id: 'developer-tools',
    frontTitle: 'Dev Tools',
    backText: 'Developer workflows taught me to design for speed, focus, and reversibility.',
    background:
      'bg-[radial-gradient(circle_at_78%_70%,#FF4B9B,transparent_30%),linear-gradient(135deg,#FF8A00,#FF5B6E)]',
    modalTitle: 'Developer Tools',
    modalBody:
      'Placeholder for IDE work, workflow diagrams, technical constraints, or launch artifacts.',
    modalVisual:
      'bg-[radial-gradient(circle_at_78%_70%,#FF4B9B,transparent_30%),linear-gradient(135deg,#FF8A00,#FF5B6E)]',
  },
  {
    id: 'visual-systems',
    frontTitle: 'Visuals',
    backText: 'I enjoy building visual systems that can scale beyond a single product screen.',
    background:
      'bg-[radial-gradient(circle_at_85%_20%,#77D9FF,transparent_32%),linear-gradient(135deg,#9A83FF,#B9A1FF)]',
    modalTitle: 'Visual Systems',
    modalBody:
      'Placeholder for blog covers, product visuals, launch graphics, or art direction.',
    modalVisual:
      'bg-[radial-gradient(circle_at_85%_20%,#77D9FF,transparent_32%),linear-gradient(135deg,#9A83FF,#B9A1FF)]',
  },
  {
    id: 'prototyping',
    frontTitle: 'Prototype',
    backText: 'I prototype to make tradeoffs visible before they become expensive.',
    background:
      'bg-[radial-gradient(circle_at_72%_8%,#C3A6FF,transparent_34%),linear-gradient(135deg,#0EE2D5,#84DBFF)]',
    modalTitle: 'Prototyping',
    modalBody:
      'Placeholder for interactive prototypes, experiments, animation tests, or exploration notes.',
    modalVisual:
      'bg-[radial-gradient(circle_at_72%_8%,#C3A6FF,transparent_34%),linear-gradient(135deg,#0EE2D5,#84DBFF)]',
  },
  {
    id: 'cross-functional',
    frontTitle: 'Teams',
    backText: 'I like translating between design, engineering, product, and research.',
    background:
      'bg-[radial-gradient(circle_at_78%_28%,#FF7AAE,transparent_35%),linear-gradient(135deg,#FF7701,#FF9E3D)]',
    modalTitle: 'Cross-functional Work',
    modalBody:
      'Placeholder for collaboration rituals, PM/engineering partnerships, or workshop moments.',
    modalVisual:
      'bg-[radial-gradient(circle_at_78%_28%,#FF7AAE,transparent_35%),linear-gradient(135deg,#FF7701,#FF9E3D)]',
  },
  {
    id: 'learning',
    frontTitle: 'Learning',
    backText: 'I keep notes, patterns, and experiments around how technology changes behavior.',
    background:
      'bg-[radial-gradient(circle_at_88%_18%,#40E0D0,transparent_30%),linear-gradient(135deg,#816BFF,#7AB7FF)]',
    modalTitle: 'Learning Notes',
    modalBody:
      'Placeholder for writing, reading notes, side explorations, or personal design principles.',
    modalVisual:
      'bg-[radial-gradient(circle_at_88%_18%,#40E0D0,transparent_30%),linear-gradient(135deg,#816BFF,#7AB7FF)]',
  },
];

function Gallery() {
  return (
    <motion.section
      id="work"
      variants={gallerySection}
      className="py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1248px] px-4 sm:px-6 md:px-8 lg:px-10">
        <motion.p
          variants={pageItem}
          className="mb-8 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--accent-teal)]"
        >
          {'//SELECTED WORK'}
        </motion.p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              className="block min-w-0 cursor-pointer no-underline"
            >
              <motion.article
                variants={pageItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="bg-noise group rounded-lg border border-white/[0.08] bg-[#161B22]/55 p-6 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent-teal)]/35 hover:shadow-[0_0_0_1px_rgb(64_224_208_/_0.12),0_24px_48px_-24px_rgba(0,0,0,0.65)]"
              >
              <div className="mb-6 aspect-video w-full overflow-hidden rounded-md border border-[#30363D] bg-[#0D1117]">
                <div className="h-full w-full bg-gradient-to-br from-[#21262D] via-[#0D1117] to-[#161B22]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-[#E6EDF3] transition-colors group-hover:text-[#F0F6FC]">
                {project.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-[#8B949E]">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-[#30363D] bg-[#0D1117]/80 px-2 py-1 text-[11px] font-medium leading-none tracking-wide text-[#8B949E]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function MoreAboutMe() {
  const [activeCard, setActiveCard] = useState<MoreAboutCard | null>(null);

  return (
    <motion.section
      variants={gallerySection}
      className="py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1248px] px-4 sm:px-6 md:px-8 lg:px-10">
        <motion.p
          variants={pageItem}
          className="mb-8 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--accent-teal)]"
        >
          {'//MORE ABOUT ME'}
        </motion.p>

        <div className="grid grid-cols-1 gap-x-1 gap-y-8 sm:grid-cols-2 md:grid-cols-3 md:gap-x-2 md:gap-y-[calc((100%-16px)/15+8px)]">
          {moreAboutCards.map((card) => (
            <motion.button
              key={card.id}
              type="button"
              variants={pageItem}
              className="group relative mx-auto aspect-square w-[80%] min-w-0 overflow-visible text-left outline-none [perspective:900px]"
              onClick={() => setActiveCard(card)}
              aria-label={`Open ${card.frontTitle}`}
            >
              <span
                className="pointer-events-none absolute -bottom-3 -left-3 right-3 top-3 border border-white/70 opacity-80"
                aria-hidden
              />
              <span className="relative block h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
                <span
                  className={`absolute inset-0 flex h-full w-full flex-col justify-end border border-white/80 p-8 text-black [backface-visibility:hidden] ${card.background}`}
                >
                  <span className="font-mono text-xl font-black uppercase leading-none tracking-[0.18em] md:text-2xl">
                    {card.frontTitle}
                  </span>
                  <IconArrowRight
                    className="mt-7 h-8 w-8"
                    stroke={1.8}
                    aria-hidden
                  />
                </span>

                <span className="absolute inset-0 flex h-full w-full items-start border border-white/80 bg-black p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <span className="max-w-[18rem] text-xl font-semibold leading-snug tracking-[-0.01em] text-[#F0F6FC] md:text-2xl">
                    {card.backText}
                  </span>
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {activeCard ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="more-about-modal-title"
          onClick={() => setActiveCard(null)}
        >
          <div
            className="relative grid w-full max-w-4xl overflow-hidden rounded-xl border border-[#30363D] bg-[#0B0F14] shadow-[0_32px_96px_-48px_rgba(0,0,0,0.95)] md:grid-cols-[1fr_1.05fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={`min-h-[18rem] ${activeCard.modalVisual}`} />
            <div className="p-7 md:p-10">
              <button
                type="button"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#30363D] text-[#8B949E] transition-colors hover:text-[#F0F6FC]"
                onClick={() => setActiveCard(null)}
                aria-label="Close dialog"
              >
                <IconX className="h-4 w-4" stroke={1.8} aria-hidden />
              </button>
              <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--accent-teal)]">
                {'//MORE ABOUT ME'}
              </p>
              <h2
                id="more-about-modal-title"
                className="text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#F0F6FC] md:text-4xl"
              >
                {activeCard.modalTitle}
              </h2>
              <p className="mt-6 text-lg leading-relaxed tracking-[-0.01em] text-[#8B949E] md:text-xl">
                {activeCard.modalBody}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </motion.section>
  );
}

export default function HomePage() {
  return (
    <motion.main
      className="min-h-screen overflow-x-hidden bg-[#0D1117] text-[#E6EDF3] selection:bg-[var(--accent-teal)]/25"
      initial="hidden"
      animate="show"
      variants={pageRoot}
    >
      <motion.header
        variants={pageItem}
        className="fixed inset-x-0 top-0 z-50 border-b border-[#30363D] bg-[#0D1117]/85 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between px-4 sm:px-6 md:px-7 lg:px-8">
          <span className="font-mono text-sm font-medium tracking-[-0.01em] text-[#F0F6FC]">
            tianyu-wu
          </span>
          <nav className="flex items-center gap-8 font-mono text-sm text-[#8B949E]">
            <a
              href="#work"
              className="transition-colors duration-200 hover:text-[#E6EDF3]"
            >
              Work
            </a>
            <a
              href="#about"
              className="transition-colors duration-200 hover:text-[#E6EDF3]"
            >
              About
            </a>
          </nav>
        </div>
      </motion.header>

      {/* Hero: full viewport shell + inner cascade */}
      <motion.div
        variants={pageItem}
        className="mx-auto flex min-h-screen w-full max-w-[1248px] flex-col px-4 pb-16 pt-24 sm:px-6 md:px-8 md:pb-24 md:pt-28 lg:px-10"
      >
        <motion.div
          variants={heroInner}
          className="flex min-h-0 flex-1 flex-col gap-16 md:gap-20 lg:gap-24"
        >
          {/* Intro row */}
          <motion.div variants={pageItem} className="min-w-0 shrink-0">
            <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="flex min-h-0 min-w-0 flex-col gap-10 lg:col-span-8 lg:h-[22.5rem] lg:justify-between">
                <div className="space-y-6">
                  <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#F0F6FC] md:text-4xl lg:text-[2.5rem] lg:leading-[1.08]">
                    Hi, I&apos;m{' '}
                    <span className="font-medium text-white">Tianyu Wu</span>
                  </h2>
                  <p className="text-balance text-lg leading-relaxed tracking-[-0.01em] text-[#8B949E] md:text-xl md:leading-relaxed">
                    A Product designer focused on{' '}
                    <span className="font-medium text-[var(--accent-teal)]">
                      Human-AI interaction
                    </span>
                    , intelligent workflows, and designing AI-native experiences
                    for{' '}
                    <span className="font-medium text-[var(--accent-teal)]">
                      complex systems
                    </span>
                    .
                  </p>
                </div>

                  <dl
                    className="grid max-w-3xl grid-cols-1 gap-6 py-6 pr-6 font-mono sm:grid-cols-3"
                    style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                  >
                    <div>
                      <dt className="mb-3 font-mono text-3xl font-medium leading-none tracking-[-0.02em] text-[#F0F6FC] md:text-4xl">
                        4+
                      </dt>
                      <dd className="font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.16em] text-[#8B949E]">
                        Years in tech
                      </dd>
                    </div>
                    <div>
                      <dt className="mb-3 font-mono text-3xl font-medium leading-none tracking-[-0.02em] text-[var(--accent-teal)] md:text-4xl">
                        AI
                      </dt>
                      <dd className="font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.16em] text-[#8B949E]">
                        Interaction systems
                      </dd>
                    </div>
                    <div>
                      <dt className="mb-3 font-mono text-3xl font-medium leading-none tracking-[-0.02em] text-[#F0F6FC] md:text-4xl">
                        1
                      </dt>
                      <dd className="font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.16em] text-[#8B949E]">
                        Flagship AI product
                      </dd>
                    </div>
                  </dl>
              </div>

              <div className="mx-auto flex w-full min-w-0 justify-center lg:col-span-4 lg:mx-0 lg:justify-end">
                <div
                  className="aspect-[4/5] h-[17.5rem] w-auto shrink-0 overflow-hidden rounded-xl border border-[#30363D] bg-[#0D1117] shadow-[0_24px_64px_-32px_rgba(0,0,0,0.9)] sm:h-[18.5rem] lg:h-[22.5rem]"
                  aria-label="Portrait of Tianyu Wu"
                >
                  <img
                    src="/sucai-DSC06403_45.jpg"
                    alt="Tianyu Wu portrait"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Statement */}
          <motion.div variants={pageItem} className="max-w-4xl shrink-0">
            <h1 className="text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#F0F6FC] md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Designing the Bridge Between{' '}
              <span className="text-[var(--accent-teal)]">Human Intent</span> and Machine
              Action
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#8B949E] md:text-lg">
              UX designer and product architect focused on AI agents,
              IDE-adjacent tooling, and B2B complex systems — where clarity,
              trust, and operational depth matter as much as the interface.
            </p>
          </motion.div>

          {/* Flagship */}
          <motion.div variants={pageItem} className="w-full shrink-0">
            <p className="mb-4 font-mono text-xs font-medium tracking-[0.08em] text-[var(--accent-teal)]">
              <span>{'//Flagship Case - GitHub Copilot @ Microsoft'}</span>
            </p>
            <div className="relative overflow-hidden rounded-lg border border-[#30363D] bg-[#161B22] shadow-[0_24px_64px_-32px_rgba(0,0,0,0.85)]">
              <FlagshipCasePreview href="/work/github-copilot" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <Gallery />
      <MoreAboutMe />

      <motion.footer
        id="about"
        variants={pageItem}
        className="py-12"
      >
        <div className="mx-auto w-full max-w-[1500px] px-4 text-sm text-[#8B949E] sm:px-6 md:px-7 lg:px-8">
          About — placeholder anchor for navigation.
        </div>
      </motion.footer>
    </motion.main>
  );
}
