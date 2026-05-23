'use client';

/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionLink = motion.create(Link);

const easeOut = [0.22, 1, 0.36, 1] as const;

const TAGS = ['Agentic UX', 'Design Systems', '4px/8px Grid', 'Material Design'];

export function FlagshipCasePreview({ href }: { href: string }) {
  return (
    <MotionLink
      href={href}
      className="bg-noise group relative flex min-h-[300px] cursor-pointer flex-col overflow-hidden rounded-[10px] bg-[#0B0F14] outline-none focus-visible:ring-2 focus-visible:ring-[#58A6FF]/40 md:min-h-[390px] md:flex-row lg:min-h-[460px]"
      whileTap={{ scale: 0.995 }}
      transition={{ type: 'tween', duration: 0.12, ease: easeOut }}
    >

      {/* ── Left: text column ─────────────────────────────────── */}
      <div className="relative z-10 flex w-full flex-col justify-between gap-6 p-7 md:w-[38%] md:shrink-0 md:gap-0 md:p-10 lg:p-12">
        {/* Badge + company */}
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[#388BFD]/40 bg-[#1C2128] px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[#58A6FF]">
            flagship
          </span>
          <span className="font-mono text-[11px] text-[#6E7681]">microsoft · 2025–now</span>
        </div>

        {/* Title + description */}
        <div className="md:my-6">
          <h2 className="mb-5 text-[1.9rem] font-bold leading-[1.08] tracking-[-0.02em] text-[#F0F6FC] md:text-[2.35rem] lg:text-[2.85rem]">
            GitHub Copilot<br />multi-IDE<br />platform
          </h2>
          <p className="text-[0.94rem] leading-relaxed text-[#8B949E] md:text-[1rem]">
            End-to-end UX for Copilot&apos;s third-party IDE extensions.
            Translating complex agentic patterns — Agent Sessions,
            context-aware Ask Question flows — into intuitive,
            developer-centric interfaces across JetBrains, Eclipse, Xcode.
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
          <span className="font-mono text-base text-[#E6EDF3] transition-colors group-hover:text-white">
            case study →
          </span>
        </div>
      </div>

      {/* Vertical divider (md+) */}
      <div className="pointer-events-none absolute bottom-0 left-[38%] top-0 z-10 hidden w-px bg-gradient-to-b from-transparent via-[#30363D] to-transparent md:block" />

      {/* ── Right: screenshot container — uniform 10px rounded corners ─ */}
      <motion.div
        className="relative h-[200px] w-full overflow-hidden rounded-[10px] md:h-auto md:flex-1 sm:h-[240px]"
        whileHover={{ scale: 1.018 }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
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
          className="absolute inset-0 h-full w-full object-cover object-right"
        />

        {/* Layer 2 — PRESSED state (Continue button darkens to #375FAD) */}
        <motion.img
          src="/copilot-pressbutton.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-right"
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
          className="absolute inset-0 h-full w-full object-cover object-right"
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
            initial={{ x: -24, y: -20, scale: 1 }}
            animate={{
              x: [-24, -24, 0, 0, -24],
              y: [-20, -20, 0, 0, -20],
              scale: [1, 1, 0.86, 1, 1],
            }}
            transition={{
              x: {
                duration: 8.1,
                times: [0, 0.3704, 0.4321, 0.6296, 1],
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 1,
              },
              y: {
                duration: 8.1,
                times: [0, 0.3704, 0.4321, 0.6296, 1],
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 1,
              },
              scale: {
                duration: 8.1,
                times: [0, 0.5556, 0.5926, 0.6296, 1],
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
            left: '70.5%',
            display: 'block',
            width: '4px',
            height: '18px',
            borderRadius: '2px',
            background: 'oklch(0.78 0.12 195)',
            boxShadow: '0 0 6px oklch(0.78 0.12 195 / 0.7)',
            animation: 'blink 1.1s steps(2, start) infinite',
          }}
        />
      </motion.div>
    </MotionLink>
  );
}
