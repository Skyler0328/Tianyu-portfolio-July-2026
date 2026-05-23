'use client';

/* Local SVG placeholders: native <img> avoids rare next/image + SVG/SSR issues. */
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { motion } from 'framer-motion';

import { CopilotNodesHero } from '@/components/CopilotNodesHero';
import type { ProjectData, ProjectImageBlock } from './project-data';

const easeOut = [0.22, 1, 0.36, 1] as const;

const sectionMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-48px 0px' },
  transition: { duration: 0.55, ease: easeOut },
} as const;

const pagePad = 'px-4 sm:px-6 md:px-8';

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-1 sm:grid-cols-[minmax(0,7rem)_1fr] sm:items-baseline sm:gap-6">
      <dt className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#58A6FF] sm:text-xs">
        {label}
      </dt>
      <dd className="min-w-0 break-words font-mono text-sm leading-snug text-[#F0F6FC] sm:text-[0.8125rem]">
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
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
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
    <div className="mx-auto w-full max-w-[800px]">
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

export function WorkProjectView({ project }: { project: ProjectData }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0D1117] text-[#E6EDF3] selection:bg-[#388BFD]/25">
      <header
        className={`mx-auto w-full max-w-6xl pt-20 pb-10 sm:pt-24 ${pagePad}`}
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
            <span>返回</span>
          </Link>

          <h1 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-[#F0F6FC] sm:text-4xl md:text-[2.5rem] md:leading-[1.08]">
            {project.title}
          </h1>

          <dl
            className={`mt-8 grid max-w-3xl gap-4 border-t border-[#30363D] pt-8 font-mono sm:gap-5`}
          >
            <MetadataRow label="Role" value={project.metadata.role} />
            <MetadataRow label="Team" value={project.metadata.team} />
            <MetadataRow label="Duration" value={project.metadata.duration} />
            <MetadataRow label="Impact" value={project.metadata.impact} />
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
                className={`mx-auto w-full max-w-5xl ${pagePad}`}
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
                className={`mx-auto w-full max-w-[800px] ${pagePad}`}
              >
                <p className="text-[0.9375rem] leading-[1.6] text-[#E6EDF3] sm:text-base">
                  {item.body}
                </p>
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
                  ? 'w-full min-w-0'
                  : `mx-auto w-full max-w-[800px] ${pagePad}`
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
