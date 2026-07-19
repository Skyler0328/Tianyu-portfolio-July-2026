'use client';

import Link from 'next/link';
import { useEffect, useRef, type RefObject } from 'react';
import { motion } from 'framer-motion';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

import { MediaImage } from '@/components/ui/media-image';
import { ProjectItemMetrics } from '@/components/work/ProjectItemMetrics';
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
function vimeoEmbedSrc(url: string) {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? `https://player.vimeo.com/video/${match[1]}` : null;
}

function ProjectVideoDemo({
  videoUrl,
  label,
}: {
  videoUrl: string;
  label?: string;
}) {
  const embedSrc = vimeoEmbedSrc(videoUrl);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className={labelText}>Motion demo</p>
          <p className="mt-1 text-base font-medium text-[#111] md:text-lg">
            {label ?? 'Figma prototype walkthrough'}
          </p>
        </div>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0D7C6F] transition-colors hover:text-[#0A5F55]"
        >
          Open on Vimeo
          <IconArrowRight className="h-4 w-4" stroke={1.8} aria-hidden />
        </a>
      </div>
      {embedSrc ? (
        <div
          className={`${imageCard} relative aspect-video w-full bg-[#111]`}
        >
          <iframe
            src={`${embedSrc}?title=0&byline=0&portrait=0`}
            title={label ?? 'Project motion demo'}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-base font-medium text-[#0D7C6F]"
        >
          View video
          <IconArrowRight className="h-4 w-4" stroke={1.8} aria-hidden />
        </a>
      )}
    </div>
  );
}

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

function ProjectImage({
  block,
  priority = false,
}: {
  block: ProjectImageBlock;
  priority?: boolean;
}) {
  return (
    <ImageCard className={block.layout === 'centered' ? 'mx-auto max-w-3xl' : ''}>
      <div className="overflow-hidden bg-[#F3F3F3]">
        <MediaImage
          src={block.src}
          alt={block.alt}
          width={block.width ?? 1600}
          height={block.height ?? 900}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 1180px"
          priority={priority}
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
          {/* eslint-disable-next-line @next/next/no-img-element -- inner-frame crop uses percentage offsets */}
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
      <MediaImage
        src={image.src}
        alt={image.alt}
        width={image.width ?? 1600}
        height={image.height ?? 900}
        className="h-auto w-auto max-w-full object-contain"
        style={
          image.width
            ? { width: 'auto', maxWidth: `min(100%, ${image.width}px)` }
            : undefined
        }
        sizes="(max-width: 768px) 100vw, 540px"
      />
    </div>
  ) : fillHeight ? (
    <div
      className="relative h-full min-h-0 overflow-hidden"
      style={{ backgroundColor: cardBg }}
    >
      <MediaImage
        src={image.src}
        alt={image.alt}
        fill
        className="object-contain object-center"
        style={{ backgroundColor: cardBg }}
        sizes="(max-width: 768px) 100vw, 540px"
      />
    </div>
  ) : (
    <div className="overflow-hidden" style={{ backgroundColor: cardBg }}>
      <MediaImage
        src={image.src}
        alt={image.alt}
        width={image.width ?? 1600}
        height={image.height ?? 900}
        className="h-auto w-full object-contain"
        sizes="(max-width: 768px) 100vw, 1180px"
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

function useVideoPlaybackRate(
  videoRef: RefObject<HTMLVideoElement | null>,
  playbackRate?: number,
) {
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !playbackRate) return;
    el.playbackRate = playbackRate;
  }, [videoRef, playbackRate]);
}

function SharedVideoPairCard({ videos }: { videos: ProjectChallengeVideo[] }) {
  return (
    <ImageCard
      className="mx-auto w-full max-w-xl p-3 md:max-w-2xl md:p-4"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="grid grid-cols-2 items-stretch gap-2 md:gap-3">
        {videos.map((video) => {
          const bg = video.cardBg ?? '#1E1E1E';
          return (
            <SharedVideoCell key={video.src} video={video} cardBg={bg} />
          );
        })}
      </div>
    </ImageCard>
  );
}

function SharedVideoCell({
  video,
  cardBg,
}: {
  video: ProjectChallengeVideo;
  cardBg: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoPlaybackRate(videoRef, video.playbackRate);

  return (
    <div
      className="flex items-center justify-center overflow-hidden rounded-xl"
      style={{ backgroundColor: cardBg }}
    >
      <video
        ref={videoRef}
        src={video.src}
        aria-label={video.alt}
        width={video.width}
        height={video.height}
        className="h-auto max-h-[min(52vh,420px)] w-full object-contain"
        style={{ backgroundColor: cardBg }}
        onLoadedMetadata={(event) => {
          if (video.playbackRate) {
            event.currentTarget.playbackRate = video.playbackRate;
          }
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}

function MatchedHeightImagePair({
  group,
}: {
  group: Extract<ProjectChallengeMediaGroup, { variant: 'grid' }>;
}) {
  const [left, right] = group.images;
  const leftBg = left.cardBg ?? '#F3F3F3';
  const rightBg = right.cardBg ?? '#F3F3F3';
  const compact = Boolean(group.compact);

  return (
    <div className={`space-y-4 ${compact ? 'mx-auto w-full max-w-3xl' : ''}`}>
      {group.title ? <h4 className={groupTitle}>{group.title}</h4> : null}
      <ImageCard
        className={`w-full ${compact ? 'p-2 md:p-2.5' : 'p-3 md:p-4'}`}
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            compact ? 'gap-2 md:gap-2.5' : 'gap-3 md:gap-4'
          }`}
        >
          {/* h-0 + min-h-full: don't drive row height; scale to match the right image */}
          <div
            className={`relative flex items-center justify-center overflow-hidden rounded-xl md:h-0 md:min-h-full ${
              compact ? 'max-md:min-h-[180px]' : 'max-md:min-h-[280px]'
            }`}
            style={{ backgroundColor: leftBg }}
          >
            <MediaImage
              src={left.src}
              alt={left.alt}
              width={left.width ?? 1600}
              height={left.height ?? 900}
              className={
                compact
                  ? 'max-h-[min(260px,55vw)] w-auto max-w-full object-contain md:h-full md:max-h-full'
                  : 'max-h-[min(420px,70vw)] w-auto max-w-full object-contain md:h-full md:max-h-full'
              }
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div
            className="overflow-hidden rounded-xl"
            style={{ backgroundColor: rightBg }}
          >
            <MediaImage
              src={right.src}
              alt={right.alt}
              width={right.width ?? 1600}
              height={right.height ?? 900}
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </ImageCard>
    </div>
  );
}

function ImageCaptionMediaGroup({
  group,
}: {
  group: Extract<ProjectChallengeMediaGroup, { variant: 'imageCaption' }>;
}) {
  const { image, caption, thumbs } = group;
  const imageBg = image.cardBg ?? '#F3F3F3';

  return (
    <div className="space-y-4">
      {group.title ? <h4 className={groupTitle}>{group.title}</h4> : null}
      <ImageCard className="w-full p-3 md:p-4" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="flex flex-col gap-4 md:gap-5">
          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-8">
            <div
              className="overflow-hidden rounded-xl"
              style={{ backgroundColor: imageBg }}
            >
              <MediaImage
                src={image.src}
                alt={image.alt}
                width={image.width ?? 1600}
                height={image.height ?? 900}
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
            <p className={`max-w-md ${bodyText} md:text-xl`}>{caption}</p>
          </div>
          {thumbs?.length ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
              {thumbs.map((thumb) => (
                <div key={thumb.src} className="min-w-0">
                  <div
                    className="overflow-hidden rounded-lg"
                    style={{ backgroundColor: thumb.cardBg ?? '#F3F3F3' }}
                  >
                    <MediaImage
                      src={thumb.src}
                      alt={thumb.alt}
                      width={thumb.width ?? 1600}
                      height={thumb.height ?? 900}
                      className="h-auto w-full object-contain"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <p className="mt-2 text-center text-xs font-medium text-[#555] md:text-sm">
                    {thumb.alt}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </ImageCard>
    </div>
  );
}

function SplitMediaGroup({
  group,
}: {
  group: Extract<ProjectChallengeMediaGroup, { variant: 'split' }>;
}) {
  const { image, video } = group;
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoPlaybackRate(videoRef, video.playbackRate);
  const imageBg = image.cardBg ?? '#F3F3F3';
  const videoBg = video.cardBg ?? '#1E1E1E';

  return (
    <div className="space-y-4">
      {group.title ? <h4 className={groupTitle}>{group.title}</h4> : null}
      <ImageCard className="w-full p-3 md:p-4" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-[minmax(0,1fr)_minmax(160px,28%)] md:gap-4">
          <div
            className="overflow-hidden rounded-xl"
            style={{ backgroundColor: imageBg }}
          >
            <MediaImage
              src={image.src}
              alt={image.alt}
              width={image.width ?? 1600}
              height={image.height ?? 900}
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </div>
          <div
            className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl md:min-h-0"
            style={{ backgroundColor: videoBg }}
          >
            <video
              ref={videoRef}
              src={video.src}
              aria-label={video.alt}
              width={video.width}
              height={video.height}
              className="h-full max-h-[70vh] w-auto max-w-full object-contain md:max-h-none"
              style={{ backgroundColor: videoBg }}
              onLoadedMetadata={(event) => {
                if (video.playbackRate) {
                  event.currentTarget.playbackRate = video.playbackRate;
                }
              }}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </ImageCard>
    </div>
  );
}

function CompositeMediaGroup({
  group,
}: {
  group: Extract<ProjectChallengeMediaGroup, { variant: 'composite' }>;
}) {
  const { image, overlayVideo } = group;
  const cardBg = image.cardBg ?? '#F3F3F3';
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoPlaybackRate(videoRef, overlayVideo.playbackRate);
  const { left, top, width, height } = overlayVideo.frame;

  return (
    <div className="space-y-4">
      {group.title ? <h4 className={groupTitle}>{group.title}</h4> : null}
      <ImageCard className="w-full" style={{ backgroundColor: cardBg }}>
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: `${image.width ?? 16} / ${image.height ?? 9}`,
            backgroundColor: cardBg,
          }}
        >
          <MediaImage
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 1180px"
          />
          <div
            className="absolute overflow-hidden rounded-[clamp(4px,0.55vw,10px)] shadow-[0_8px_28px_-16px_rgba(0,0,0,0.55)]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              height: `${height}%`,
              backgroundColor: overlayVideo.cardBg ?? '#1E1E1E',
            }}
          >
            <video
              ref={videoRef}
              src={overlayVideo.src}
              aria-label={overlayVideo.alt}
              className="h-full w-full object-cover"
              style={{ backgroundColor: overlayVideo.cardBg ?? '#1E1E1E' }}
              onLoadedMetadata={(event) => {
                if (overlayVideo.playbackRate) {
                  event.currentTarget.playbackRate = overlayVideo.playbackRate;
                }
              }}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </ImageCard>
    </div>
  );
}

function FeaturedGridMediaGroup({
  group,
}: {
  group: Extract<ProjectChallengeMediaGroup, { variant: 'featuredGrid' }>;
}) {
  const featuredVideo = group.featuredVideo;
  const featuredImage = group.featured;
  const featuredVideoRef = useRef<HTMLVideoElement>(null);
  useVideoPlaybackRate(featuredVideoRef, featuredVideo?.playbackRate);

  const enlargeThumbs = Boolean(group.enlargeThumbs);

  return (
    <div className="space-y-4">
      {group.title ? <h4 className={groupTitle}>{group.title}</h4> : null}
      {group.description ? (
        <p className={`max-w-3xl ${bodyText}`}>{group.description}</p>
      ) : null}
      <ImageCard
        className={enlargeThumbs ? 'p-1.5 md:p-2' : 'p-3 md:p-4'}
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div
          className={`flex flex-col ${
            enlargeThumbs ? 'gap-1.5 md:gap-2' : 'gap-3 md:gap-4'
          }`}
        >
          {featuredVideo ? (
            <div
              className="overflow-hidden rounded-xl"
              style={{ backgroundColor: featuredVideo.cardBg ?? '#1E1E1E' }}
            >
              <video
                ref={featuredVideoRef}
                src={featuredVideo.src}
                aria-label={featuredVideo.alt}
                width={featuredVideo.width}
                height={featuredVideo.height}
                className="h-auto w-full object-contain"
                style={{ backgroundColor: featuredVideo.cardBg ?? '#1E1E1E' }}
                onLoadedMetadata={(event) => {
                  if (featuredVideo.playbackRate) {
                    event.currentTarget.playbackRate =
                      featuredVideo.playbackRate;
                  }
                }}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          ) : featuredImage ? (
            <div
              className="overflow-hidden rounded-xl"
              style={{ backgroundColor: featuredImage.cardBg ?? '#F3F3F3' }}
            >
              <MediaImage
                src={featuredImage.src}
                alt={featuredImage.alt}
                width={featuredImage.width ?? 1600}
                height={featuredImage.height ?? 900}
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 1180px"
              />
            </div>
          ) : null}
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 ${
              enlargeThumbs
                ? 'gap-1.5 sm:gap-2 md:mx-[-2.5%] md:w-[105%]'
                : 'gap-3 md:gap-4'
            }`}
          >
            {group.images.map((image) => (
              <div key={image.src} className="min-w-0">
                <div
                  className="overflow-hidden rounded-lg"
                  style={{ backgroundColor: image.cardBg ?? '#F3F3F3' }}
                >
                  <MediaImage
                    src={image.src}
                    alt={image.alt}
                    width={image.width ?? 1600}
                    height={image.height ?? 900}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-2 text-center text-xs font-medium text-[#555] md:text-sm">
                  {image.alt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ImageCard>
    </div>
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardBg = video.cardBg ?? '#1E1E1E';
  const naturalFit = video.fit === 'natural';
  useVideoPlaybackRate(videoRef, video.playbackRate);

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
          ref={videoRef}
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
          onLoadedMetadata={(event) => {
            if (video.playbackRate) {
              event.currentTarget.playbackRate = video.playbackRate;
            }
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
          {group.before ? (
            <ChallengeImageFrame
              image={group.before}
              className="w-full"
              fillCard
            />
          ) : null}
          <div
            className={`grid grid-cols-1 items-stretch gap-4 md:gap-5 ${
              group.after.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
            }`}
          >
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
          {isPair && group.sharedCard ? (
            <SharedVideoPairCard videos={group.videos} />
          ) : isPair ? (
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
    if (group.borderless) {
      return (
        <div className="space-y-4">
          {group.title ? <h4 className={groupTitle}>{group.title}</h4> : null}
          <div className="flex flex-col gap-4 md:gap-5">
            {group.images.map((image) => (
              <MediaImage
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width ?? 1600}
                height={image.height ?? 900}
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 1180px"
              />
            ))}
          </div>
        </div>
      );
    }

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

  if (group.variant === 'imageCaption') {
    return <ImageCaptionMediaGroup group={group} />;
  }

  if (group.variant === 'composite') {
    return <CompositeMediaGroup group={group} />;
  }

  if (group.variant === 'split') {
    return <SplitMediaGroup group={group} />;
  }

  if (group.variant === 'featuredGrid') {
    return <FeaturedGridMediaGroup group={group} />;
  }

  if (group.variant === 'grid') {
    if (group.matchHeight && group.images.length === 2) {
      return <MatchedHeightImagePair group={group} />;
    }

    const gridColumns =
      group.images.length >= 4
        ? 'md:grid-cols-2 lg:grid-cols-4'
        : group.images.length === 3
          ? 'md:grid-cols-3'
          : 'md:grid-cols-2';

    return (
      <div className="space-y-4">
        {group.title ? <h4 className={groupTitle}>{group.title}</h4> : null}
        <div className={`grid grid-cols-1 items-start gap-4 ${gridColumns}`}>
          {group.images.map((image) => (
            <ChallengeImageFrame key={image.src} image={image} />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function ProjectSection({ block }: { block: ProjectSectionBlock }) {
  const hasItems = Boolean(block.items?.length);
  const hasMediaGroups = Boolean(block.mediaGroups?.length);
  const hasInsights = Boolean(block.insights?.length);

  if (
    !hasItems &&
    !hasMediaGroups &&
    !hasInsights &&
    !block.description &&
    !block.subtitle &&
    !block.diagramPlaceholder &&
    !block.diagram &&
    !block.eyebrow
  ) {
    return null;
  }

  return (
    <div className="w-full">
      {block.eyebrow ? (
        <p className={`${labelText} mb-3`}>{block.eyebrow}</p>
      ) : null}
      <h2 className={sectionTitle}>{block.title}</h2>
      {block.subtitle ? (
        <p
          className={
            block.subtitleNowrap
              ? 'mt-4 overflow-x-auto whitespace-nowrap text-lg font-medium leading-snug tracking-[-0.01em] text-[#333] md:text-xl'
              : 'mt-4 max-w-3xl text-lg font-medium leading-snug tracking-[-0.01em] text-[#333] md:text-xl'
          }
        >
          {block.subtitle}
        </p>
      ) : null}
      {block.description ? (
        <p className={`mt-4 max-w-3xl ${bodyText}`}>{block.description}</p>
      ) : null}

      {block.diagram ? (
        <div
          className={
            block.diagram.fit === 'natural'
              ? 'relative left-1/2 mt-10 flex w-screen max-w-[100vw] -translate-x-1/2 justify-center px-4'
              : 'mt-10 w-full overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)]'
          }
        >
          <MediaImage
            src={block.diagram.src}
            alt={block.diagram.alt}
            width={block.diagram.width ?? 1600}
            height={block.diagram.height ?? 900}
            className={
              block.diagram.fit === 'natural'
                ? 'h-auto w-auto max-w-full object-contain'
                : 'h-auto w-full object-contain'
            }
            style={
              block.diagram.fit === 'natural' && block.diagram.width
                ? { maxWidth: `min(100%, ${block.diagram.width}px)` }
                : undefined
            }
            sizes={
              block.diagram.fit === 'natural'
                ? `(max-width: 768px) 100vw, ${block.diagram.width ?? 1180}px`
                : '(max-width: 768px) 100vw, 1180px'
            }
          />
        </div>
      ) : block.diagramPlaceholder ? (
        <div className="mt-10 flex aspect-[16/9] w-full items-center justify-center rounded-2xl border border-dashed border-[#C8C8C8] bg-[#F3F3F3] px-6 text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#888] md:text-sm">
            {block.diagramPlaceholder}
          </p>
        </div>
      ) : null}

      {hasInsights ? (
        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {block.insights!.map((insight, index) => (
            <li
              key={insight.title}
              className="border-t border-[#E8E8E8] pt-6 md:border-t-0 md:border-l md:pl-6 md:pt-0 first:md:border-l-0 first:md:pl-0"
            >
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#888]">
                Insight {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[#111] md:text-xl">
                {insight.title}
              </h3>
              <p className={`mt-3 ${bodyText}`}>{insight.body}</p>
            </li>
          ))}
        </ol>
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

      {hasItems ? (
        <ol
          className={
            block.itemsLayout === 'continuous'
              ? 'mt-10 flex flex-col gap-8 md:gap-10'
              : 'mt-12 flex flex-col gap-16 md:gap-20'
          }
        >
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
              metrics,
              afterInsight,
            } = item;

            return (
              <li
                key={title}
                className={
                  block.itemsLayout === 'continuous'
                    ? undefined
                    : 'border-t border-[#E8E8E8] pt-12 md:pt-16'
                }
              >
                <h3 className={challengeTitle}>
                  {block.itemsLayout === 'continuous' ? null : (
                    <span className="mr-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[#888]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  )}
                  {title}
                </h3>

                {description ? (
                  <p className={`mt-4 max-w-3xl ${bodyText}`}>{description}</p>
                ) : null}

                {metrics ? <ProjectItemMetrics metrics={metrics} /> : null}

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
                  <div
                    className={
                      diagram.fit === 'natural'
                        ? 'relative left-1/2 mt-8 flex w-screen max-w-[100vw] -translate-x-1/2 justify-center px-4'
                        : 'mt-8 w-full'
                    }
                  >
                    <MediaImage
                      src={diagram.src}
                      alt={diagram.alt}
                      width={diagram.width ?? 1600}
                      height={diagram.height ?? 900}
                      className={
                        diagram.fit === 'natural'
                          ? 'h-auto w-auto max-w-full object-contain'
                          : 'h-auto w-full object-contain'
                      }
                      style={
                        diagram.fit === 'natural' && diagram.width
                          ? { maxWidth: `min(100%, ${diagram.width}px)` }
                          : undefined
                      }
                      sizes={
                        diagram.fit === 'natural'
                          ? `(max-width: 768px) 100vw, ${diagram.width ?? 1180}px`
                          : '(max-width: 768px) 100vw, 1180px'
                      }
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

                {afterInsight ? (
                  <div className="mt-10 space-y-4">
                    <h4 className={groupTitle}>{afterInsight.title}</h4>
                    <div className="space-y-10">
                      {afterInsight.mediaGroups.map((group, index) => (
                        <ChallengeMediaGroup
                          key={group.title ?? `after-insight-${index}`}
                          group={group}
                        />
                      ))}
                    </div>
                  </div>
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
              <div className="relative aspect-square overflow-hidden bg-[#F3F3F3]">
                <MediaImage
                  src={finding.image}
                  alt={finding.imageAlt}
                  fill
                  className="object-cover object-right"
                  sizes="12rem"
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
        {project.videoUrl ? (
          <motion.section
            initial={sectionMotion.initial}
            whileInView={sectionMotion.whileInView}
            viewport={sectionMotion.viewport}
            transition={sectionMotion.transition}
            className={pageRail}
          >
            <ProjectVideoDemo
              videoUrl={project.videoUrl}
              label={project.videoLabel}
            />
          </motion.section>
        ) : null}
        {project.content.map((item, index) => {
          const key = `${project.id}-${index}-${item.type}`;
          const isLcpImage =
            item.type === 'image' &&
            project.content.findIndex((entry) => entry.type === 'image') ===
              index;

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

          // LCP hero: no fade-in delay; preload with priority.
          if (isLcpImage) {
            return (
              <section key={key} className={pageRail}>
                <ProjectImage block={item} priority />
              </section>
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
