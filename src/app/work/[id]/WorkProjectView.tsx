'use client';

/* Local SVG placeholders: native <img> avoids rare next/image + SVG/SSR issues. */
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconArrowLeft } from '@tabler/icons-react';

import type {
  ProjectChallengeImage,
  ProjectChallengeMediaGroup,
  ProjectChallengeVideo,
  ProjectData,
  ProjectFindingsBlock,
  ProjectImageBlock,
  ProjectSectionBlock,
} from './project-data';

const easeOut = [0.22, 1, 0.36, 1] as const;

const sectionMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-48px 0px' },
  transition: { duration: 0.55, ease: easeOut },
} as const;

const pageRail = 'mx-auto w-full max-w-[1180px] px-4 sm:px-6 md:px-8 lg:px-10';
const sectionTitle =
  'text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#111] md:text-4xl lg:text-[2.75rem]';
const challengeTitle =
  'text-xl font-semibold leading-snug tracking-[-0.02em] text-[#111] md:text-2xl';
const groupTitle = 'text-base font-medium tracking-[-0.01em] text-[#111] md:text-lg';
const bodyText = 'text-base leading-relaxed text-[#555] md:text-lg';
const labelText =
  'font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#888]';
const imageCard =
  'overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)]';
const agentChallengesTitle = 'Four Challenges of Designing AI Agents';

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-1 sm:grid-cols-[minmax(0,7rem)_1fr] sm:items-baseline sm:gap-6">
      <dt className={labelText}>{label}</dt>
      <dd className="min-w-0 whitespace-pre-line break-words text-sm leading-relaxed text-[#333] md:text-base">
        {value}
      </dd>
    </div>
  );
}

function ImageCard({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`${imageCard} ${className}`} style={style}>
      {children}
    </div>
  );
}

function ProjectImage({ block }: { block: ProjectImageBlock }) {
  return (
    <ImageCard className={block.layout === 'centered' ? 'mx-auto max-w-3xl' : ''}>
      <div className="overflow-hidden bg-[#F3F3F3]">
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
    </ImageCard>
  );
}

function ChallengeImageFrame({
  image,
  className = '',
  fillHeight = false,
  /** When true, card fills the grid cell; image stays natural-sized inside. */
  fillCard = false,
}: {
  image: ProjectChallengeImage;
  className?: string;
  /** Stretch to row height and center the image (for 2-up aligned cards). */
  fillHeight?: boolean;
  fillCard?: boolean;
}) {
  const cardBg = image.cardBg ?? '#F3F3F3';
  const naturalFit = image.fit === 'natural' || fillCard;

  const inner = image.innerFrame ? (
    (() => {
      const { x, y, width, height, canvasWidth } = image.innerFrame!;
      const scaledCanvasWidth = (canvasWidth / width) * 100;
      const offsetX = (x / width) * 100;
      const offsetY = (y / width) * 100;

      return (
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: `${width} / ${height}`, backgroundColor: cardBg }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="absolute h-auto max-w-none"
            style={{
              left: `-${offsetX}%`,
              top: `-${offsetY}%`,
              width: `${scaledCanvasWidth}%`,
            }}
            loading="lazy"
            decoding="async"
          />
        </div>
      );
    })()
  ) : naturalFit ? (
    <div
      className={`flex items-center justify-center overflow-hidden ${
        fillHeight ? 'h-full min-h-0' : ''
      }`}
      style={{ backgroundColor: cardBg }}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="h-auto w-auto max-w-full object-contain"
        style={
          image.width
            ? { width: 'auto', maxWidth: `min(100%, ${image.width}px)` }
            : undefined
        }
        loading="lazy"
        decoding="async"
      />
    </div>
  ) : fillHeight ? (
    <div
      className="grid h-full min-h-0 overflow-hidden"
      style={{ backgroundColor: cardBg }}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="h-full w-full object-contain object-center"
        style={{ backgroundColor: cardBg }}
        loading="lazy"
        decoding="async"
      />
    </div>
  ) : (
    <div className="overflow-hidden" style={{ backgroundColor: cardBg }}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="h-auto w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  return (
    <ImageCard
      className={`${fillHeight || naturalFit ? 'flex flex-col' : ''} ${
        fillHeight ? 'h-full min-h-0' : ''
      } ${className}`}
      style={{ backgroundColor: cardBg }}
    >
      {inner}
    </ImageCard>
  );
}

function ChallengeVideoFrame({
  video,
  className = '',
  fillHeight = false,
}: {
  video: ProjectChallengeVideo;
  className?: string;
  fillHeight?: boolean;
}) {
  const cardBg = video.cardBg ?? '#1E1E1E';
  const naturalFit = video.fit === 'natural';

  return (
    <ImageCard
      className={`${
        fillHeight || naturalFit ? 'flex flex-col' : ''
      } ${fillHeight ? 'h-full min-h-0' : ''} ${className}`}
      style={{ backgroundColor: cardBg }}
    >
      <div
        className={`overflow-hidden ${
          naturalFit
            ? 'flex items-center justify-center'
            : fillHeight
              ? 'grid h-full min-h-0'
              : ''
        }`}
        style={{ backgroundColor: cardBg }}
      >
        <video
          src={video.src}
          aria-label={video.alt}
          width={video.width}
          height={video.height}
          className={
            naturalFit
              ? 'h-auto w-auto max-w-full object-contain'
              : fillHeight
                ? 'h-full w-full object-contain object-center'
                : 'h-auto w-full object-contain'
          }
          style={{
            backgroundColor: cardBg,
            ...(naturalFit && video.width
              ? { width: 'auto', maxWidth: `min(100%, ${video.width}px)` }
              : undefined),
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </ImageCard>
  );
}

function ChallengeMediaGroup({ group }: { group: ProjectChallengeMediaGroup }) {
  if (group.variant === 'transition') {
    return (
      <div className="space-y-4">
        <h4 className={groupTitle}>{group.title}</h4>
        <div className="flex flex-col gap-4 md:gap-5">
          <ChallengeImageFrame
            image={group.before}
            className="w-full"
            fillCard
          />
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-5">
            {group.after.map((image) => (
              <ChallengeImageFrame
                key={image.src}
                image={image}
                className="w-full"
                fillCard
                fillHeight
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (group.variant === 'videos') {
    const isPair = group.videos.length === 2;

    return (
      <div className="space-y-4">
        {group.title ? <h4 className={groupTitle}>{group.title}</h4> : null}
        <div className="flex flex-col gap-4 md:gap-5">
          {group.featured ? (
            <ChallengeVideoFrame video={group.featured} className="w-full" />
          ) : null}
          {group.images?.map((image) => (
            <ChallengeImageFrame
              key={image.src}
              image={image}
              className="w-full"
            />
          ))}
          {isPair ? (
            <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-5">
              {group.videos.map((video) => (
                <ChallengeVideoFrame
                  key={video.src}
                  video={video}
                  className="w-full"
                  fillHeight
                />
              ))}
            </div>
          ) : (
            // Match Sub-agent expand/finished column width (one cell of the 2-up grid).
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {group.videos.map((video) => (
                <ChallengeVideoFrame
                  key={video.src}
                  video={video}
                  className="w-full"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (group.variant === 'stack') {
    return (
      <div className="space-y-4">
        {group.title ? <h4 className={groupTitle}>{group.title}</h4> : null}
        <div className="flex flex-col gap-4 md:gap-5">
          {group.images.map((image) => (
            <ChallengeImageFrame
              key={image.src}
              image={image}
              className="w-full"
            />
          ))}
        </div>
      </div>
    );
  }

  if (group.variant === 'featuredGrid') {
    return (
      <div className="space-y-4">
        <h4 className={groupTitle}>{group.title}</h4>
        <div className="grid gap-4">
          <ChallengeImageFrame image={group.featured} />
          <div className="grid gap-4 md:grid-cols-3">
            {group.images.map((image) => (
              <ChallengeImageFrame key={image.src} image={image} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const gridColumns =
    group.images.length >= 4
      ? 'md:grid-cols-2 lg:grid-cols-4'
      : group.images.length === 3
        ? 'md:grid-cols-3'
        : 'md:grid-cols-2';

  return (
    <div className="space-y-4">
      <h4 className={groupTitle}>{group.title}</h4>
      <div className={`grid gap-4 ${gridColumns}`}>
        {group.images.map((image) => (
          <ChallengeImageFrame key={image.src} image={image} />
        ))}
      </div>
    </div>
  );
}

function ProjectSection({ block }: { block: ProjectSectionBlock }) {
  const isAgentChallenges = block.title === agentChallengesTitle;
  const hasItems = Boolean(block.items?.length);
  const hasMediaGroups = Boolean(block.mediaGroups?.length);

  if (!hasItems && !hasMediaGroups) {
    return null;
  }

  return (
    <div className="w-full">
      <h2 className={sectionTitle}>{block.title}</h2>
      {block.description ? (
        <p className={`mt-4 max-w-3xl ${bodyText}`}>{block.description}</p>
      ) : null}

      {hasMediaGroups && !hasItems ? (
        <div className="mt-10 space-y-10 md:mt-12">
          {block.mediaGroups!.map((group, index) => (
            <ChallengeMediaGroup
              key={group.title ?? `media-group-${index}`}
              group={group}
            />
          ))}
        </div>
      ) : null}

      {isAgentChallenges && hasItems ? (
        <ol className="mt-12 flex flex-col gap-16 md:gap-20">
          {block.items!.map((item, index) => {
            if (typeof item === 'string') return null;

            const {
              title,
              description,
              balance,
              media,
              diagram,
              mediaGroups,
              insight,
              bullets,
            } = item;

            return (
              <li key={title} className="border-t border-[#E8E8E8] pt-12 md:pt-16">
                <h3 className={challengeTitle}>
                  <span className="mr-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[#888]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {title}
                </h3>

                {description ? (
                  <p className={`mt-4 max-w-3xl ${bodyText}`}>{description}</p>
                ) : null}

                {balance ? (
                  <div
                    className={`mt-6 flex max-w-2xl flex-col gap-2 rounded-xl border border-[#E8E8E8] bg-white px-5 py-4 text-base text-[#333] sm:flex-row sm:items-center sm:justify-center sm:gap-5 md:text-lg`}
                  >
                    <span>{balance.left}</span>
                    <span className="text-[#888]">vs</span>
                    <span>{balance.right}</span>
                  </div>
                ) : null}

                {diagram ? (
                  <div className="mt-8 w-full">
                    <img
                      src={diagram.src}
                      alt={diagram.alt}
                      width={diagram.width}
                      height={diagram.height}
                      className="h-auto w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : null}

                {media ? (
                  <div className="mt-8 space-y-8">
                    <div className="space-y-4">
                      <h4 className={groupTitle}>Before</h4>
                      <ChallengeImageFrame
                        image={media.before}
                        className="mx-auto max-w-md lg:max-w-sm"
                      />
                    </div>
                    <div className="space-y-4">
                      <h4 className={groupTitle}>After</h4>
                      <div className="grid gap-4 md:grid-cols-3">
                        {media.after.map((image) => (
                          <ChallengeImageFrame key={image.src} image={image} />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                {bullets ? (
                  <ul className="mt-8 flex flex-col gap-3">
                    {bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-base font-medium text-[#333] md:text-lg"
                      >
                        <span
                          className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0D7C6F]"
                          aria-hidden
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {mediaGroups ? (
                  <div className="mt-8 space-y-10">
                    {mediaGroups.map((group) => (
                      <ChallengeMediaGroup
                        key={group.title ?? group.variant}
                        group={group}
                      />
                    ))}
                  </div>
                ) : null}

                {insight ? (
                  <p className={`mt-8 max-w-3xl ${bodyText}`}>{insight}</p>
                ) : null}
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
}

function ProjectFindings({ block }: { block: ProjectFindingsBlock }) {
  return (
    <div className="w-full">
      <h2 className={sectionTitle}>{block.title}</h2>
      <div className="mt-8 flex flex-col gap-10">
        {block.findings.map((finding) => (
          <article
            key={finding.quote}
            className="grid gap-6 border-t border-[#E8E8E8] pt-8 md:grid-cols-[minmax(0,1fr)_12rem] md:gap-10"
          >
            <blockquote>
              <p className="text-xl font-medium leading-snug tracking-[-0.02em] text-[#111] md:text-2xl">
                {finding.quote.replace(/^“|”$/g, '')}
              </p>
            </blockquote>
            <ImageCard>
              <div className="aspect-square overflow-hidden bg-[#F3F3F3]">
                <img
                  src={finding.image}
                  alt={finding.imageAlt}
                  className="h-full w-full object-cover object-right"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </ImageCard>
          </article>
        ))}
      </div>
    </div>
  );
}

export function WorkProjectView({ project }: { project: ProjectData }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAFA] text-[#111] selection:bg-[#40E0D0]/25">
      <header className="sticky top-0 z-50 border-b border-[#E8E8E8] bg-[#FAFAFA]/90 backdrop-blur-md">
        <div className={`${pageRail} flex h-16 items-center justify-between`}>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-sm text-[#555] transition-colors hover:text-[#111]"
          >
            <IconArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              stroke={1.8}
              aria-hidden
            />
            <span>Back to Work</span>
          </Link>
          <span className="text-sm font-medium tracking-[-0.01em] text-[#111]">
            Tianyu Wu
          </span>
        </div>
      </header>

      <div className={`${pageRail} border-b border-[#E8E8E8] py-14 md:py-20`}>
        <motion.div
          initial={sectionMotion.initial}
          animate={{ opacity: 1, y: 0 }}
          transition={sectionMotion.transition}
          className="min-w-0"
        >
          <p className="mb-3 font-mono text-sm tracking-[0.08em] text-[#888]">
            {project.metadata.duration}
          </p>
          <h1 className="max-w-4xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#111] md:text-5xl lg:text-[3.25rem]">
            {project.title}
          </h1>
          {project.subtitle ? (
            <p className="mt-5 text-lg leading-relaxed text-[#555] md:text-xl">
              {project.subtitle}
            </p>
          ) : null}
          {project.description ? (
            <p className="mt-1 text-lg leading-relaxed text-[#555] md:text-xl md:whitespace-nowrap">
              {project.description}
            </p>
          ) : null}

          <dl className="mt-10 grid gap-5 border-t border-[#E8E8E8] pt-10 sm:grid-cols-2">
            <MetadataRow label="Role" value={project.metadata.role} />
            <MetadataRow label="Team" value={project.metadata.team} />
            <MetadataRow label="Timeline" value={project.metadata.duration} />
            <MetadataRow label="Scope" value={project.metadata.impact} />
          </dl>
        </motion.div>
      </div>

      <div className="flex flex-col gap-16 pb-20 md:gap-20 md:pb-28">
        {project.content.map((item, index) => {
          const key = `${project.id}-${index}-${item.type}`;

          if (item.type === 'text') {
            return (
              <motion.section
                key={key}
                initial={sectionMotion.initial}
                whileInView={sectionMotion.whileInView}
                viewport={sectionMotion.viewport}
                transition={sectionMotion.transition}
                className={pageRail}
              >
                <p className={`max-w-3xl ${bodyText}`}>{item.body}</p>
              </motion.section>
            );
          }

          if (item.type === 'placeholder') {
            return null;
          }

          if (item.type === 'section') {
            return (
              <motion.section
                key={key}
                initial={sectionMotion.initial}
                whileInView={sectionMotion.whileInView}
                viewport={sectionMotion.viewport}
                transition={sectionMotion.transition}
                className={pageRail}
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
                transition={sectionMotion.transition}
                className={pageRail}
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
              transition={sectionMotion.transition}
              className={pageRail}
            >
              <ProjectImage block={item} />
            </motion.section>
          );
        })}
      </div>
    </main>
  );
}
