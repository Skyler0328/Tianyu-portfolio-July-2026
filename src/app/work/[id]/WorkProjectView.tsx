'use client';

/* Local SVG placeholders: native <img> avoids rare next/image + SVG/SSR issues. */
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { motion } from 'framer-motion';

import { CopilotNodesHero } from '@/components/CopilotNodesHero';
import type {
  ProjectData,
  ProjectFindingsBlock,
  ProjectImageBlock,
  ProjectPlaceholderBlock,
  ProjectSectionBlock,
} from './project-data';

const easeOut = [0.22, 1, 0.36, 1] as const;

const sectionMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-48px 0px' },
  transition: { duration: 0.55, ease: easeOut },
} as const;

const pagePad = 'px-4 sm:px-6 md:px-8';
const contentRail = 'mx-auto w-full max-w-5xl';
const sectionTitle =
  'text-[1.05rem] font-medium leading-snug tracking-[-0.01em] text-[#E6EDF3] sm:text-[1.18rem] lg:text-[1.28rem]';

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-1 sm:grid-cols-[minmax(0,7rem)_1fr] sm:items-baseline sm:gap-6">
      <dt className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#58A6FF] sm:text-xs">
        {label}
      </dt>
      <dd className="min-w-0 whitespace-pre-line break-words font-mono text-sm leading-snug text-[#F0F6FC] sm:text-[0.8125rem]">
        {value}
      </dd>
    </div>
  );
}

function ProjectImage({ block }: { block: ProjectImageBlock }) {
  const frame =
    'overflow-hidden rounded-[8px] border border-[#30363D] shadow-sm';

  if (block.layout === 'full') {
    return (
      <div className="w-full">
        <div className={frame}>
          <img
            src={block.src}
            alt={block.alt}
            width={block.width ?? 1600}
            height={block.height ?? 900}
            className="h-auto w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={frame}>
        <img
          src={block.src}
          alt={block.alt}
          width={block.width ?? 1200}
          height={block.height ?? 800}
          className="h-auto w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

function ProjectPlaceholder({ block }: { block: ProjectPlaceholderBlock }) {
  return (
    <div className="w-full">
      <h2 className={sectionTitle}>{block.title}</h2>
      <div className="mt-6 rounded-[10px] border border-dashed border-[#30363D] bg-[#0B0F14]/70 p-6 sm:p-8">
        <div className="flex min-h-[280px] items-center justify-center rounded-[8px] border border-[#30363D] bg-[linear-gradient(135deg,rgba(88,166,255,0.08),transparent_35%),linear-gradient(rgba(48,54,61,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(48,54,61,0.18)_1px,transparent_1px)] bg-[length:100%_100%,32px_32px,32px_32px] px-6 text-center">
          <p className="max-w-xl font-mono text-xs leading-relaxed tracking-[0.08em] text-[#8B949E]">
            {block.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectSection({ block }: { block: ProjectSectionBlock }) {
  return (
    <div className="w-full">
      <h2 className={sectionTitle}>{block.title}</h2>
      {block.description ? (
        <p className="mt-4 text-[0.9375rem] leading-[1.6] text-[#8B949E] sm:text-base">
          {block.description}
        </p>
      ) : null}
      {block.items ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {block.items.map((item, index) => (
            <div
              key={item}
              className="rounded-[8px] border border-[#30363D] bg-[#0B0F14]/70 p-4"
            >
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#58A6FF]">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 text-base font-medium tracking-[-0.01em] text-[#F0F6FC]">
                {item}
              </h3>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProjectFindings({ block }: { block: ProjectFindingsBlock }) {
  return (
    <div className="w-full">
      <h2 className={sectionTitle}>{block.title}</h2>
      <div className="mt-8 flex flex-col gap-8 sm:gap-10">
        {block.findings.map((finding, index) => {
          const reverse = index % 2 === 1;

          return (
            <article
              key={finding.quote}
              className={`flex flex-col items-center gap-6 md:gap-10 ${
                reverse ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              <blockquote
                className="relative flex min-w-0 flex-1 items-center py-2"
              >
                <span
                  className="pointer-events-none absolute -left-3 -top-2 font-mono text-7xl leading-none text-[#F2CC60] sm:-left-4 sm:-top-3 sm:text-8xl"
                  aria-hidden
                >
                  “
                </span>
                <p className="relative z-10 pl-5 text-[1.35rem] font-medium leading-snug tracking-[-0.02em] text-[#E6EDF3] sm:pl-6 sm:text-[1.6rem]">
                  {finding.quote.replace(/^“|”$/g, '')}
                </p>
              </blockquote>

              <div
                className="aspect-square w-full max-w-[12rem] shrink-0 overflow-hidden rounded-[14px] border border-[#30363D] bg-[#161B22] shadow-[0_24px_64px_-36px_rgba(0,0,0,0.85)] sm:max-w-[13rem] md:w-[11.5rem]"
              >
                <img
                  src={finding.image}
                  alt={finding.imageAlt}
                  className="h-full w-full object-cover object-right"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function WorkProjectView({ project }: { project: ProjectData }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0D1117] text-[#E6EDF3] selection:bg-[#388BFD]/25">
      <header
        className={`${contentRail} pt-20 pb-10 sm:pt-24 ${pagePad}`}
      >
        <motion.div
          initial={sectionMotion.initial}
          whileInView={sectionMotion.whileInView}
          viewport={sectionMotion.viewport}
          transition={sectionMotion.transition}
          className="min-w-0"
        >
          <Link
            href="/"
            className="group mb-8 inline-flex items-center gap-1.5 font-mono text-sm text-[#58A6FF] transition-colors hover:text-[#79B8FF]"
          >
            <span
              className="inline-block transition-transform group-hover:-translate-x-0.5"
              aria-hidden
            >
              ←
            </span>
            <span>Back to Work</span>
          </Link>

          <h1 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-[#F0F6FC] sm:text-4xl md:text-[2.5rem] md:leading-[1.08]">
            {project.title}
          </h1>
          {project.subtitle ? (
            <p className="mt-4 text-lg font-medium leading-snug tracking-[-0.01em] text-[#E6EDF3] sm:text-xl">
              {project.subtitle}
            </p>
          ) : null}

          <dl
            className="mt-8 grid gap-4 border-t border-[#30363D] pt-8 font-mono sm:gap-5"
          >
            <MetadataRow label="Role" value={project.metadata.role} />
            <MetadataRow label="Team" value={project.metadata.team} />
            <MetadataRow label="Timeline" value={project.metadata.duration} />
            <MetadataRow label="Scope" value={project.metadata.impact} />
          </dl>
        </motion.div>
      </header>

      <div className="flex flex-col gap-12 pb-20 sm:gap-14 sm:pb-24 md:gap-16 md:pb-28">
        {project.content.map((item, index) => {
          const key = `${project.id}-${index}-${item.type}`;

          if (item.type === 'nodes') {
            return (
              <motion.section
                key={key}
                initial={sectionMotion.initial}
                whileInView={sectionMotion.whileInView}
                viewport={sectionMotion.viewport}
                transition={sectionMotion.transition}
                className={`${contentRail} ${pagePad}`}
              >
                <CopilotNodesHero />
              </motion.section>
            );
          }

          if (item.type === 'text') {
            return (
              <motion.section
                key={key}
                initial={sectionMotion.initial}
                whileInView={sectionMotion.whileInView}
                viewport={sectionMotion.viewport}
                transition={{
                  ...sectionMotion.transition,
                  delay: 0.02,
                }}
                className={`${contentRail} ${pagePad}`}
              >
                <p className="text-[0.9375rem] leading-[1.6] text-[#E6EDF3] sm:text-base">
                  {item.body}
                </p>
              </motion.section>
            );
          }

          if (item.type === 'placeholder') {
            return (
              <motion.section
                key={key}
                initial={sectionMotion.initial}
                whileInView={sectionMotion.whileInView}
                viewport={sectionMotion.viewport}
                transition={{
                  ...sectionMotion.transition,
                  delay: 0.02,
                }}
                className={`${contentRail} ${pagePad}`}
              >
                <ProjectPlaceholder block={item} />
              </motion.section>
            );
          }

          if (item.type === 'section') {
            return (
              <motion.section
                key={key}
                initial={sectionMotion.initial}
                whileInView={sectionMotion.whileInView}
                viewport={sectionMotion.viewport}
                transition={{
                  ...sectionMotion.transition,
                  delay: 0.02,
                }}
                className={`${contentRail} ${pagePad}`}
              >
                <ProjectSection block={item} />
              </motion.section>
            );
          }

          if (item.type === 'findings') {
            return (
              <motion.section
                key={key}
                initial={sectionMotion.initial}
                whileInView={sectionMotion.whileInView}
                viewport={sectionMotion.viewport}
                transition={{
                  ...sectionMotion.transition,
                  delay: 0.02,
                }}
                className={`${contentRail} ${pagePad}`}
              >
                <ProjectFindings block={item} />
              </motion.section>
            );
          }

          return (
            <motion.section
              key={key}
              initial={sectionMotion.initial}
              whileInView={sectionMotion.whileInView}
              viewport={sectionMotion.viewport}
              transition={{
                ...sectionMotion.transition,
                delay: 0.02,
              }}
              className={
                item.layout === 'full'
                  ? `${contentRail} ${pagePad}`
                  : `${contentRail} ${pagePad}`
              }
            >
              <ProjectImage block={item} />
            </motion.section>
          );
        })}
      </div>
    </main>
  );
}
