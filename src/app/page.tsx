'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

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

function Gallery() {
  return (
    <motion.section
      id="work"
      variants={gallerySection}
      className="border-t border-[#30363D] py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1248px] px-4 sm:px-6 md:px-8 lg:px-10">
        <motion.p
          variants={pageItem}
          className="mb-8 text-xs font-medium uppercase tracking-[0.12em] text-[#8B949E]"
        >
          Selected work
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
                className="bg-noise group rounded-lg border border-white/[0.08] bg-[#161B22]/55 p-6 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-[oklch(0.78_0.12_195)/35%] hover:shadow-[0_0_0_1px_oklch(0.78_0.12_195_/_0.12),0_24px_48px_-24px_rgba(0,0,0,0.65)]"
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

export default function HomePage() {
  return (
    <motion.main
      className="min-h-screen overflow-x-hidden bg-[#0D1117] text-[#E6EDF3] selection:bg-[#388BFD]/25"
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
                    <span className="font-medium text-[#58A6FF]">
                      Human-AI interaction
                    </span>
                    , intelligent workflows, and designing AI-native experiences
                    for{' '}
                    <span className="font-medium text-[#58A6FF]">
                      complex systems
                    </span>
                    .
                  </p>
                </div>

                  <dl
                    className="grid max-w-3xl grid-cols-1 gap-6 bg-[#0B0F14]/45 p-6 font-mono shadow-[0_16px_48px_-32px_rgba(0,0,0,0.8)] sm:grid-cols-3"
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
                      <dt className="mb-3 font-mono text-3xl font-medium leading-none tracking-[-0.02em] text-[#58A6FF] md:text-4xl">
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
              <span className="text-[#58A6FF]">Human Intent</span> and Machine
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
            <p className="mb-4 flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] text-[#8B949E]">
              <span
                className="h-1 w-1 rounded-full bg-[#58A6FF] shadow-[0_0_8px_rgba(88,166,255,0.75)]"
                aria-hidden
              />
              <span>Flagship Case - GitHub Copilot @ Microsoft</span>
            </p>
            <div className="relative overflow-hidden rounded-lg border border-[#30363D] bg-[#161B22] shadow-[0_24px_64px_-32px_rgba(0,0,0,0.85)]">
              <FlagshipCasePreview href="/work/github-copilot" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <Gallery />

      <motion.footer
        id="about"
        variants={pageItem}
        className="border-t border-[#30363D] py-12"
      >
        <div className="mx-auto w-full max-w-[1500px] px-4 text-sm text-[#8B949E] sm:px-6 md:px-7 lg:px-8">
          About — placeholder anchor for navigation.
        </div>
      </motion.footer>
    </motion.main>
  );
}
