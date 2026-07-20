'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  IconArrowRight,
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconDownload,
  IconDownloadFilled,
  IconMailFilled,
  IconCopy,
  IconCheck,
} from '@tabler/icons-react';
import { MediaImage } from '@/components/ui/media-image';
import TeamShowcase from '@/components/ui/team-showcase';
import { PortraitHero } from '@/components/PortraitHero';
import { useEffect, useRef, useState } from 'react';

const CONTACT_EMAIL = 'wutianyu156@gmail.com';

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
  href: string;
  hero: { src: string; alt: string; width: number; height: number };
};

type ProjectCard = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  href: string;
  image: string;
  videoUrl?: string;
};

const featuredCase: FeaturedCase = {
  id: 'github-copilot',
  company: 'Microsoft',
  role: 'UX Designer, GitHub Copilot for IDEs',
  period: 'May 2025 → Present',
  headline: 'Designing AI experiences for developers',
  description:
    'Designed GitHub Copilot across Eclipse and IntelliJ, improving how developers collaborate with AI through intuitive interaction patterns, transparent feedback, and resilient workflows.',
  href: '/work/github-copilot',
  hero: {
    src: '/work/copilot-home-hero.png?v=3',
    alt: 'GitHub Copilot for IDEs case study hero',
    width: 3210,
    height: 1434,
  },
};

const projectCards: ProjectCard[] = [
  {
    id: 'raymics-cloud',
    title: 'Raymics Cloud',
    category: 'B2B SaaS · Medical AI',
    year: '2023–2024',
    description:
      'Research-led redesign for activation and conversion in a radiomics SaaS.',
    href: '/work/raymics-cloud',
    image: '/work/raymics-cloud-cover.png',
  },
  {
    id: 'raymics-enterprise',
    title: 'Raymics On-Prem & Federated Learning',
    category: 'Enterprise · On-Prem · Federated',
    year: '2024',
    description:
      'Extending the SaaS design system to hospital deployment and multi-institution AI.',
    href: '/work/raymics-enterprise',
    image: '/work/raymics-enterprise-cover.png',
  },
  {
    id: 'rou-water',
    title: 'ROU Water Customize Mini Program',
    category: 'Consumer · WeChat Mini Program',
    year: '2021–2023',
    description:
      'Market-driven UX for custom bottled water — lower MOQ, DIY labels, and referral growth.',
    href: '/work/rou-water',
    image: '/work/rou-water-cover.jpg',
    videoUrl: 'https://vimeo.com/805996585',
  },
  {
    id: 'daily-more',
    title: 'Daily More Brand IP & VI',
    category: 'Brand · Identity · Florida',
    year: '2022',
    description:
      'Vintage cartoon logo and visual system for a Thai street food & milk tea restaurant.',
    href: '/work/daily-more',
    image: '/work/daily-more-cover.png',
  },
];

function FeaturedWorkCard({ project }: { project: FeaturedCase }) {
  return (
    <Link
      href={project.href}
      className="group block py-14 transition-colors hover:bg-[#F7F7F7]/60 md:py-20"
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

        <div className="mb-10 overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)]">
          <MediaImage
            src={project.hero.src}
            alt={project.hero.alt}
            width={project.hero.width}
            height={project.hero.height}
            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            sizes="(max-width: 768px) 100vw, 1180px"
            priority
          />
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

function MarqueeStrip({
  items,
  size = 'lg',
  durationClass = 'role-marquee-track',
  className = '',
  separator = false,
}: {
  items: string[];
  size?: 'lg' | 'sm';
  durationClass?: string;
  className?: string;
  separator?: boolean;
}) {
  const isLg = size === 'lg';
  const gap = isLg ? 'gap-10 md:gap-14' : 'gap-6 md:gap-8';
  const cycleCount = separator ? 8 : 12;

  return (
    <div
      className={`pointer-events-none select-none overflow-hidden bg-white ${
        isLg ? 'py-4 md:py-5' : 'py-2 md:py-2.5'
      } ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className={`${durationClass} flex w-max items-center ${separator ? 'gap-0' : gap}`}>
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className={`flex shrink-0 items-center ${separator ? 'gap-0' : gap}`}
          >
            {Array.from({ length: cycleCount }, (_, cycle) =>
              separator
                ? items.map((item, itemIndex) => (
                    <span
                      key={`${copy}-${cycle}-${itemIndex}`}
                      className="inline-flex shrink-0 items-center whitespace-nowrap text-base font-semibold text-black md:text-lg"
                    >
                      <span>{item}</span>
                      <span className="inline-block px-[1.125em]" aria-hidden>
                        ·
                      </span>
                    </span>
                  ))
                : (
                    <span
                      key={`${copy}-${cycle}`}
                      className={`shrink-0 whitespace-nowrap font-semibold tracking-[-0.02em] text-black ${
                        isLg ? 'text-2xl md:text-3xl' : 'text-base md:text-lg'
                      }`}
                    >
                      {items[0]}
                    </span>
                  ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoleMarquees() {
  return (
    <div className="border-y border-[#E8E8E8]">
      <MarqueeStrip items={['Product Designer']} size="lg" />
      <MarqueeStrip
        items={[
          'GitHub Copilot',
          'SaaS',
          'Vibe Coding Tool',
          'Brand Design',
          'Web',
        ]}
        size="sm"
        separator
        durationClass="role-marquee-track-sm"
        className="border-t border-[#E8E8E8]"
      />
    </div>
  );
}

function CompactProjectCard({ project }: { project: ProjectCard }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-[0_16px_48px_-36px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1">
      <Link href={project.href} className="flex min-h-0 flex-1 flex-col">
        <div className="relative aspect-[16/9] overflow-hidden bg-[#F3F3F3]">
          <MediaImage
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 pb-3 md:p-6 md:pb-3">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-[#888]">
            {project.category} · {project.year}
          </p>
          <h4 className="mb-3 text-xl font-semibold tracking-[-0.02em] text-[#111]">
            {project.title}
          </h4>
          <p className="flex-1 text-sm leading-relaxed text-[#555]">
            {project.description}
          </p>
        </div>
      </Link>
      <div className="flex flex-col gap-2 px-5 pb-5 md:px-6 md:pb-6">
        <Link
          href={project.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111] transition-colors hover:text-[#0D7C6F]"
        >
          View project
          <IconArrowRight className="h-4 w-4" stroke={1.8} aria-hidden />
        </Link>
        {project.videoUrl ? (
          <a
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0D7C6F] transition-colors hover:text-[#0A5F55]"
          >
            View video
            <IconArrowRight className="h-4 w-4" stroke={1.8} aria-hidden />
          </a>
        ) : null}
      </div>
    </article>
  );
}

function EmailContactButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      // Fallback for older browsers / denied clipboard
      const input = document.createElement('input');
      input.value = CONTACT_EMAIL;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#111] transition-opacity hover:opacity-60"
      >
        <IconMailFilled className="h-5 w-5" aria-hidden />
        Email
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Email address"
          className="absolute bottom-[calc(100%+12px)] left-1/2 z-20 w-[min(18.5rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-[#E8E8E8] bg-white p-4 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)]"
        >
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#888]">
            Email
          </p>
          <div className="mt-2 flex items-center gap-2">
            <p className="min-w-0 flex-1 break-all text-sm font-medium tracking-[-0.01em] text-[#111]">
              {CONTACT_EMAIL}
            </p>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? 'Copied' : 'Copy email'}
              title={copied ? 'Copied' : 'Copy'}
              className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#888] transition-colors hover:text-[#111]"
            >
              {copied ? (
                <>
                  <IconCheck className="h-3.5 w-3.5 text-[#0D7C6F]" stroke={1.8} aria-hidden />
                  <span className="text-[#0D7C6F]">Copied</span>
                </>
              ) : (
                <>
                  <IconCopy className="h-3.5 w-3.5" stroke={1.8} aria-hidden />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : null}
    </div>
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
        className="mx-auto w-full max-w-[1180px] px-4 pb-16 pt-20 sm:px-6 md:px-8 md:pb-24 md:pt-28 lg:px-10"
      >
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(220px,280px)] md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] lg:gap-16">
          <div className="min-w-0">
            <h1 className="max-w-4xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-[#111] md:text-6xl lg:text-[4.5rem]">
              Hi, I&apos;m Tianyu.
            </h1>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-[#555] md:text-xl md:leading-relaxed">
              <p>
                I&apos;m a Product Designer with 4+ years of experience. My work
                spans UX, UI, and visual design, with a focus on human–AI
                interaction, intelligent workflows, and AI-native experiences
                for complex systems.
              </p>
              <p>
                I enjoy turning complex ideas into products people can
                understand, trust, and love to use.
              </p>
            </div>
          </div>

          <PortraitHero />
        </div>
      </motion.section>

      <motion.div variants={pageItem}>
        <RoleMarquees />
      </motion.div>

      <motion.section id="work" variants={pageItem}>
        <FeaturedWorkCard project={featuredCase} />

        <div className="border-t border-[#E8E8E8] py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10">
            <p className="mb-8 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#888]">
              More Projects
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
              {projectCards.map((project) => (
                <CompactProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="beyond"
        variants={pageItem}
        className="border-t border-[#E8E8E8] py-14 md:py-20"
      >
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 md:px-8 lg:px-10">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#888]">
            Beyond UX
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-[#555] md:text-lg">
            Sketches, diving, and earlier work—experiences that continue to
            shape how I think and design.
          </p>
          <div className="mt-10 md:mt-14">
            <TeamShowcase />
          </div>
        </div>
      </motion.section>

      <motion.footer
        id="contact"
        variants={pageItem}
        className="border-t border-[#E8E8E8] py-14 md:py-16"
      >
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-8 px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5 md:gap-x-16">
            <a
              href="https://github.com/Skyler0328"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#111] transition-opacity hover:opacity-60"
            >
              <IconBrandGithubFilled className="h-5 w-5" aria-hidden />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tianyuwu-adventure/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#111] transition-opacity hover:opacity-60"
            >
              <IconBrandLinkedinFilled className="h-5 w-5" aria-hidden />
              LinkedIn
            </a>
            <EmailContactButton />
            <a
              href="/resume.pdf"
              download="Tianyu-Wu-Resume.pdf"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#111] transition-opacity hover:opacity-60"
            >
              <IconDownloadFilled className="h-5 w-5" aria-hidden />
              Resume
            </a>
          </div>
          <p className="text-center text-sm leading-relaxed text-[#888]">
            © 2026 Tianyu Wu
            <br />
            Designed &amp; Built by Tianyu.
          </p>
        </div>
      </motion.footer>
    </motion.main>
  );
}
