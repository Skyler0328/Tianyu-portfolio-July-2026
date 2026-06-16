'use client';

/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';

import { MacWindowTopBar } from './MacWindowTopBar';

const MotionLink = motion.create(Link);

const easeOut = [0.22, 1, 0.36, 1] as const;

const TAGS = [
  'Agent UX',
  'Developer Tools',
  'Human-AI Collaboration',
  'AI Product Design',
];

export function FlagshipCasePreview({ href }: { href: string }) {
  return (
    <MotionLink
      href={href}
      className="bg-noise group relative flex min-h-[300px] cursor-pointer flex-col overflow-hidden rounded-[10px] bg-[#0B0F14] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/40 md:min-h-[390px] md:flex-row lg:min-h-[460px]"
      whileTap={{ scale: 0.995 }}
      transition={{ type: 'tween', duration: 0.12, ease: easeOut }}
    >

      {/* ── Left: text column ─────────────────────────────────── */}
      <div className="relative z-10 flex w-full -translate-y-2 flex-col justify-between gap-6 p-7 md:min-w-[260px] md:basis-[34%] md:shrink md:grow-0 md:gap-0 md:p-8 lg:basis-[36%] lg:p-10 xl:basis-[38%] xl:p-12">
        {/* Title + description */}
        <div className="md:my-6">
          <h2 className="mb-3 text-[1.9rem] font-bold leading-[1.08] tracking-[-0.02em] text-[#F0F6FC] md:text-[2.35rem] lg:text-[2.85rem]">
            GitHub Copilot for IDEs
          </h2>
          <p className="mb-5 max-w-md text-[1.05rem] font-medium leading-snug tracking-[-0.01em] text-[#E6EDF3] md:text-[1.18rem] lg:text-[1.28rem]">
            Human-Agent Interaction Design for Cross-Platform Developer Workflows
          </p>
          <p className="text-[0.94rem] leading-relaxed text-[#8B949E] md:text-[1rem]">
            AI-assisted coding experience design for Eclipse &amp; IntelliJ,
            focused on agent autonomy, context awareness, cost transparency,
            and failure recovery.
          </p>
        </div>

        {/* Tags + CTA */}
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded border border-[#30363D] bg-[#0D1117]/60 px-2.5 py-1 text-[12px] font-medium text-[#8B949E]"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-base text-[#E6EDF3] transition-colors group-hover:text-white">
            <span>case study</span>
            <IconArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              stroke={1.8}
              aria-hidden
            />
          </span>
        </div>
      </div>

      {/* Vertical divider (md+) */}
      <div className="pointer-events-none absolute bottom-0 left-[34%] top-0 z-10 hidden w-px bg-gradient-to-b from-transparent via-[#30363D] to-transparent md:block lg:left-[36%] xl:left-[38%]" />

      {/* ── Right: screenshot container — uniform 10px rounded corners ─ */}
      <motion.div
        className="relative flex h-[220px] w-full items-center justify-end overflow-hidden rounded-[10px] sm:h-[250px] md:h-auto md:min-w-0 md:flex-1"
        whileHover={{ scale: 1.018 }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[10px] bg-[#05080C] md:h-[92%] md:w-auto md:max-w-full md:aspect-[1596/1092]">
          <MacWindowTopBar position="static" />
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {/*
              Loop timeline (duration: 8.1s)
              0.0s–3.0s   BEFORE
              3.0s–4.5s   cursor moves to Continue
              4.5s–5.1s   cursor stays + button darkens (PRESS)
              5.1s–8.1s   AFTER
            */}

            {/* Layer 1 — BEFORE state (base) */}
            <img
              src="/copilot-before.png"
              alt="GitHub Copilot in JetBrains IDE"
              className="absolute inset-0 h-full w-full object-contain object-right"
            />

            {/* Layer 2 — PRESSED state (Continue button darkens to #375FAD) */}
            <motion.img
              src="/copilot-pressbutton.png"
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-contain object-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
              transition={{
                duration: 8.1,
                times: [0, 0.5556, 0.5557, 0.6296, 0.6297, 1],
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />

            {/* Layer 3 — AFTER state (Run box collapsed + Processing) */}
            <motion.img
              src="/copilot-after.png"
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-contain object-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{
                duration: 8.1,
                times: [0, 0.6296, 0.6297, 0.999, 1],
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />

            {/* Cursor + blinking text caret — positioned over the Continue button center */}
            <div
              className="pointer-events-none absolute z-20"
              style={{ top: '74%', right: '25%' }}
              aria-hidden
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1, 0.86, 0.86, 1, 1],
                }}
                transition={{
                  scale: {
                    duration: 8.1,
                    times: [0, 0.5556, 0.5557, 0.6296, 0.6297, 1],
                    ease: 'linear',
                    repeat: Infinity,
                    repeatDelay: 1,
                  },
                }}
              >
                <img
                  src="/cursor.png"
                  alt=""
                  aria-hidden
                  className="h-7 w-7 object-contain"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}
                />
              </motion.div>
            </div>

            {/* Blinking text caret — fixed inside the chat input box at the bottom of the screenshot */}
            <span
              className="pointer-events-none absolute z-20"
              aria-hidden
              style={{
                bottom: '10%',
                left: 'calc(70.5% - 26px)',
                display: 'block',
                width: '4px',
                height: '18px',
                borderRadius: '2px',
                background: 'var(--accent-teal)',
                boxShadow: '0 0 6px rgb(64 224 208 / 0.7)',
                animation: 'blink 1.1s steps(2, start) infinite',
              }}
            />
          </div>
        </div>
      </motion.div>
    </MotionLink>
  );
}
