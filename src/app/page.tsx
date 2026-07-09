'use client';

/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconArrowRight, IconDownload } from '@tabler/icons-react';

import { HeroDotField } from '@/components/HeroDotField';

const easeOut = [0.22, 1, 0.36, 1] as const;

const pageItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

type FeaturedCase = {
  id: string;
  company: string;
  role: string;
  period: string;
  headline: string;
  description: string;
  disciplines: string[];
  myRole: string;
  href: string;
  previews: { src: string; alt: string; label: string }[];
};

type ProjectCard = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  href: string;
  image: string;
};

const featuredCase: FeaturedCase = {
  id: 'github-copilot',
  company: 'Microsoft',
  role: 'UX Designer, GitHub Copilot for IDEs',
  period: 'May 2025 → Present',
  headline:
    'Designing human-agent interaction for cross-platform developer workflows',
  description:
    'GitHub Copilot experiences across Eclipse and IntelliJ, focused on agent autonomy, context awareness, cost transparency, and failure recovery for developers who need clarity without losing speed.',
  disciplines: [
    'UI/UX Design',
    'Prototyping',
    'Human-AI Interaction',
    'Design Systems',
    'Research',
  ],
  myRole:
    'Owned UX design for Copilot in Eclipse and contributed to IntelliJ experiences, partnering with PM, research, and engineering from strategy through launch.',
  href: '/work/github-copilot',
  previews: [
    {
      src: '/copilot-before.png',
      alt: 'Copilot interface before redesign',
      label: 'Agent workflow',
    },
    {
      src: '/copilot-pressbutton.png',
      alt: 'Copilot cost transparency UI',
      label: 'Cost transparency',
    },
    {
      src: '/copilot-after.png',
      alt: 'Copilot interface after redesign',
      label: 'Failure recovery',
    },
  ],
};

const projectCards: ProjectCard[] = [
  {
    id: 'agent-orchestration-console',
    title: 'Agent Orchestration Console',
    category: 'B2B · Design Systems',
    year: '2025',
    description:
      'Control plane UX for multi-step AI workflows in enterprise SaaS.',
    href: '/work/agent-orchestration-console',
    image: '/work/agent-console-wide.svg',
  },
  {
    id: 'ide-inline-assistance',
    title: 'IDE Inline Assistance',
    category: 'AI IDE · Interaction',
    year: '2025',
    description:
      'Latency-sensitive surfaces for suggestions, diffs, and trust signals.',
    href: '/work/ide-inline-assistance',
    image: '/work/ide-inline-wide.svg',
  },
  {
    id: 'compliance-audit-trails',
    title: 'Compliance & Audit Trails',
    category: 'Complex Systems · IA',
    year: '2025',
    description:
      'Dense data tables and review flows for regulated operators.',
    href: '/work/compliance-audit-trails',
    image: '/work/compliance-wide.svg',
  },
  {
    id: 'onboarding-power-users',
    title: 'Onboarding for Power Users',
    category: 'Onboarding · Metrics',
    year: '2025',
    description:
      'Progressive disclosure without blocking expert shortcuts.',
    href: '/work/onboarding-power-users',
    image: '/work/onboarding-center.svg',
  },
];

function FeaturedWorkCard({ project }: { project: FeaturedCase }) {
  return (
    <Link
      href={project.href}
      className="group block border-t border-[#E8E8E8] py-14 transition-colors hover:bg-[#F7F7F7]/60 md:py-20"
    >
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-2 md:mb-10">
          <p className="text-2xl font-medium tracking-[-0.02em] text-[#111] md:text-3xl">
            {project.company}
          </p>
          <p className="text-lg text-[#555] md:text-xl">{project.role}</p>
          <p className="font-mono text-sm tracking-[0.08em] text-[#888]">
            {project.period}
          </p>
        </div>

        <h3 className="mb-6 max-w-4xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#111] md:text-5xl lg:text-[3.25rem]">
          {project.headline}
        </h3>

        <p className="mb-10 max-w-3xl text-base leading-relaxed text-[#555] md:text-lg">
          {project.description}
        </p>

        <div className="mb-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#888]">
              Disciplines
            </p>
            <p className="text-sm leading-relaxed text-[#333] md:text-base">
              {project.disciplines.join(' · ')}
            </p>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#888]">
              My Role
            </p>
            <p className="text-sm leading-relaxed text-[#333] md:text-base">
              {project.myRole}
            </p>
          </div>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {project.previews.map((preview) => (
            <div
              key={preview.label}
              className="overflow-hidden rounded-xl border border-[#E8E8E8] bg-white shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#F3F3F3]">
                <img
                  src={preview.src}
                  alt={preview.alt}
                  className="h-full w-full object-cover object-right transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <p className="px-4 py-3 text-sm font-medium text-[#333]">
                {preview.label}
              </p>
            </div>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 font-mono text-sm text-[#111] transition-colors group-hover:text-[#0D7C6F]">
          View case study
          <IconArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            stroke={1.8}
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

function CompactProjectCard({ project }: { project: ProjectCard }) {
  return (
    <Link
      href={project.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-[0_16px_48px_-36px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] overflow-hidden bg-[#F3F3F3]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-[#888]">
          {project.category} · {project.year}
        </p>
        <h4 className="mb-3 text-xl font-semibold tracking-[-0.02em] text-[#111]">
          {project.title}
        </h4>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-[#555]">
          {project.description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111] transition-colors group-hover:text-[#0D7C6F]">
          View project
          <IconArrowRight className="h-4 w-4" stroke={1.8} aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <motion.main
      className="min-h-screen overflow-x-hidden bg-[#FAFAFA] text-[#111] selection:bg-[#40E0D0]/25"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      <motion.header
        variants={pageItem}
        className="sticky top-0 z-50 border-b border-[#E8E8E8] bg-[#FAFAFA]/90 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">
          <span className="text-sm font-medium tracking-[-0.01em] text-[#111]">
            Tianyu Wu
          </span>
          <nav className="flex items-center gap-6 text-sm text-[#555] md:gap-8">
            <a href="#work" className="transition-colors hover:text-[#111]">
              Work
            </a>
            <a href="#contact" className="transition-colors hover:text-[#111]">
              Contact
            </a>
            <a
              href="/resume.pdf"
              download="Tianyu-Wu-Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D8D8D8] px-3 py-1.5 font-medium text-[#111] transition-colors hover:border-[#111] hover:bg-white"
            >
              <IconDownload className="h-4 w-4" stroke={1.8} aria-hidden />
              Resume
            </a>
          </nav>
        </div>
      </motion.header>

      <motion.section
        variants={pageItem}
        className="relative mx-auto w-full max-w-[1180px] overflow-hidden px-4 pb-16 pt-20 sm:px-6 md:px-8 md:pb-24 md:pt-28 lg:px-10"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 aspect-square w-full max-w-[1080px] -translate-x-1/2"
          aria-hidden
        >
          <HeroDotField />
        </div>

        <div className="relative z-10">
          <h1 className="max-w-4xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-[#111] md:text-6xl lg:text-[4.5rem]">
            Hello! Welcome to my corner of the Web.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#555] md:text-xl md:leading-relaxed">
            I&apos;m a Product Designer focused on Human-AI interaction,
            intelligent workflows, and designing AI-native experiences for
            complex systems — with a belief in the impact of well-crafted
            experiences.
          </p>
        </div>
      </motion.section>

      <motion.section id="work" variants={pageItem} className="border-t border-[#E8E8E8]">
        <FeaturedWorkCard project={featuredCase} />

        <div className="border-t border-[#E8E8E8] py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 md:px-8 lg:px-10">
            <p className="mb-8 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#888]">
              More Projects
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              {projectCards.map((project) => (
                <CompactProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.footer
        id="contact"
        variants={pageItem}
        className="border-t border-[#E8E8E8] py-16 md:py-20"
      >
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 md:px-8 lg:px-10">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#111] md:text-4xl">
            Thanks for stopping by, come back soon.
          </h2>
          <p className="mt-4 text-base text-[#555]">
            Product designer · Human-AI interaction · Seattle / Remote
          </p>
        </div>
      </motion.footer>
    </motion.main>
  );
}
