'use client';

import { motion } from 'framer-motion';

const easeOut = [0.22, 1, 0.36, 1] as const;

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
      duration: 0.4,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const galleryRoot = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const galleryGrid = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const galleryItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

type Project = {
  title: string;
  description: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: 'Agent Orchestration Console',
    description: 'Control plane UX for multi-step AI workflows in enterprise SaaS.',
    tags: ['B2B', 'Design Systems', 'Research'],
  },
  {
    title: 'IDE Inline Assistance',
    description: 'Latency-sensitive surfaces for suggestions, diffs, and trust signals.',
    tags: ['AI IDE', 'Interaction', 'Prototyping'],
  },
  {
    title: 'Compliance & Audit Trails',
    description: 'Dense data tables and review flows for regulated operators.',
    tags: ['Complex Systems', 'IA', 'Content'],
  },
  {
    title: 'Onboarding for Power Users',
    description: 'Progressive disclosure without blocking expert shortcuts.',
    tags: ['Onboarding', 'Metrics', 'A/B'],
  },
];

function Gallery() {
  return (
    <section
      id="work"
      className="border-t border-[#30363D] px-6 py-16 md:px-8 md:py-24"
    >
      <motion.div
        className="mx-auto max-w-6xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={galleryRoot}
      >
        <motion.p
          variants={galleryItem}
          className="mb-8 text-xs font-medium uppercase tracking-[0.12em] text-[#8B949E]"
        >
          Selected work
        </motion.p>
        <motion.div
          variants={galleryGrid}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={galleryItem}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="group cursor-pointer rounded-lg border border-white/[0.08] bg-[#161B22]/55 p-6 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-[#388BFD]/35 hover:shadow-[0_0_0_1px_rgba(56,139,253,0.12),0_24px_48px_-24px_rgba(0,0,0,0.65)]"
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
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0D1117] text-[#E6EDF3] selection:bg-[#388BFD]/25">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#30363D] bg-[#0D1117]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
          <span className="text-sm font-semibold tracking-tight text-[#F0F6FC]">
            Tianyu Wu
          </span>
          <nav className="flex items-center gap-8 text-sm text-[#8B949E]">
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
      </header>

      {/* Block 1: Hero — intro + statement + flagship */}
      <section className="min-h-screen px-6 pb-16 pt-24 md:px-8 md:pb-24 md:pt-28">
        <motion.div
          className="mx-auto flex w-full max-w-6xl flex-col"
          initial="hidden"
          animate="show"
          variants={heroContainer}
        >
          {/* Intro: left copy (8 cols) + right photo (4 cols) */}
          <div className="grid min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <motion.div
              variants={heroItem}
              className="min-w-0 lg:col-span-8 lg:pt-2"
            >
              <p className="text-balance text-lg leading-[1.55] tracking-[-0.01em] text-[#8B949E] md:text-xl md:leading-[1.6]">
                Hi, I&apos;m{' '}
                <span className="font-medium text-white">Tianyu Wu</span>, a{' '}
                <span className="font-medium text-[#58A6FF]">
                  Product Designer
                </span>{' '}
                based in Shanghai. With a background in both landscape design
                and{' '}
                <span className="font-medium text-[#58A6FF]">
                  digital systems
                </span>
                , I bring a unique perspective to{' '}
                <span className="font-medium text-[#58A6FF]">
                  structuring complex environments
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="mx-auto w-full min-w-0 max-w-[280px] sm:max-w-xs lg:col-span-4 lg:mx-0 lg:max-w-none"
            >
              <div
                className="aspect-[3/4] w-full overflow-hidden rounded-xl border border-[#30363D] bg-[#161B22] shadow-[0_16px_48px_-24px_rgba(0,0,0,0.75)]"
                aria-label="Portrait placeholder"
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#21262D]/80 to-[#0D1117] px-4 text-center">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8B949E]">
                    Photo
                  </span>
                  <span className="text-xs text-[#6E7681]">3:4 · replace</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={heroItem} className="mt-16 max-w-4xl md:mt-20 lg:mt-24">
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

          <motion.div variants={heroItem} className="mt-12 w-full md:mt-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-[#8B949E]">
              Flagship case — visual area
            </p>
            <div className="relative overflow-hidden rounded-lg border border-[#30363D] bg-[#161B22] shadow-[0_24px_64px_-32px_rgba(0,0,0,0.85)]">
              <div className="aspect-[21/9] min-h-[200px] w-full bg-gradient-to-br from-[#161B22] via-[#0D1117] to-[#21262D] md:min-h-[280px] lg:min-h-[320px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(56,139,253,0.08),transparent_55%)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#58A6FF]">
                    GitHub Copilot
                  </span>
                  <span className="max-w-md text-sm text-[#8B949E]">
                    Hero image / case study media mounts here (replace background
                    with asset).
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Block 2: Gallery */}
      <Gallery />

      <footer
        id="about"
        className="border-t border-[#30363D] px-6 py-12 md:px-8"
      >
        <div className="mx-auto max-w-6xl text-sm text-[#8B949E]">
          About — placeholder anchor for navigation.
        </div>
      </footer>
    </main>
  );
}
