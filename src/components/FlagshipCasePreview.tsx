'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

const VB_W = 100;
const VB_H = 100 / (21 / 9);

const easeOut = [0.22, 1, 0.36, 1] as const;

type NodeConfig = {
  id: string;
  pathD: string;
  dot: { x: number; y: number };
  label: string;
  panel: { left: string; top: string; transform?: string };
};

const NODES: NodeConfig[] = [
  {
    id: 'n1',
    pathD: `M 16 ${VB_H * 0.36} L 28 ${VB_H * 0.36} L 28 ${VB_H * 0.12} L 44 ${VB_H * 0.12}`,
    dot: { x: 16, y: VB_H * 0.36 },
    label: '[01] Contextual grounding flow',
    panel: { left: '44%', top: '6%', transform: 'translateX(-4px)' },
  },
  {
    id: 'n2',
    pathD: `M 48 ${VB_H * 0.52} L 48 ${VB_H * 0.72} L 68 ${VB_H * 0.72} L 68 ${VB_H * 0.58} L 82 ${VB_H * 0.58}`,
    dot: { x: 48, y: VB_H * 0.52 },
    label: '[02] Inline suggestion coherence',
    panel: { left: '72%', top: '48%', transform: 'translate(-8px, -50%)' },
  },
  {
    id: 'n3',
    pathD: `M 82 ${VB_H * 0.34} L 92 ${VB_H * 0.34} L 92 ${VB_H * 0.14} L 58 ${VB_H * 0.14}`,
    dot: { x: 82, y: VB_H * 0.34 },
    label: '[03] Trust & disclosure layer',
    panel: { left: '58%', top: '8%', transform: 'translateX(8px)' },
  },
];

function useTypewriter(activeId: string | null, fullText: string) {
  const [out, setOut] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (!activeId || !fullText) {
      setOut('');
      return;
    }
    setOut('');
    let i = 0;
    timerRef.current = setInterval(() => {
      i += 1;
      setOut(fullText.slice(0, i));
      if (i >= fullText.length && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 18);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeId, fullText]);

  return out;
}

export function FlagshipCasePreview() {
  const [hovered, setHovered] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }, []);

  const scheduleLeave = useCallback(() => {
    clearLeaveTimer();
    leaveTimer.current = setTimeout(() => setHovered(null), 200);
  }, [clearLeaveTimer]);

  const active = NODES.find((n) => n.id === hovered);
  const typed = useTypewriter(hovered, active?.label ?? '');

  return (
    <motion.a
      href="#work"
      className="relative block aspect-[21/9] min-h-[200px] w-full cursor-pointer overflow-hidden rounded-lg outline-none ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#58A6FF]/40 md:min-h-[280px] lg:min-h-[320px]"
      aria-label="Open GitHub Copilot flagship case study"
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'tween', duration: 0.12, ease: easeOut }}
    >

      {/* —— Base: gradient + grid + noise (B-side de-identified feel) —— */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#0B0F14]"
        style={{
          backgroundImage: `
            linear-gradient(165deg, #161B22 0%, #0D1117 42%, #0a0e14 100%),
            linear-gradient(rgba(48,54,61,0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(48,54,61,0.18) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 24px 24px, 24px 24px',
          backgroundPosition: '0 0, 0 0, 0 0',
        }}
      />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
        aria-hidden
      >
        <filter id="flagship-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#flagship-noise)" />
      </svg>

      {/* Blurred “UI mass” + sharp silhouette overlay (selective readability) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 scale-[1.04] opacity-[0.55]"
          style={{ filter: 'blur(7px)' }}
        >
          <div className="absolute left-[6%] top-[14%] h-[58%] w-[28%] rounded-md bg-[#21262D]" />
          <div className="absolute right-[8%] top-[18%] h-[22%] w-[34%] rounded-md bg-[#30363D]" />
          <div className="absolute bottom-[12%] left-[38%] h-[28%] w-[48%] rounded-md bg-[#161B22]" />
          <div className="absolute right-[12%] top-[44%] h-[36%] w-[22%] rounded-sm bg-[#21262D]" />
        </div>
        <div className="absolute inset-0">
          <div className="absolute left-[6%] top-[14%] h-[58%] w-[28%] rounded-md border border-[#484F58]/35 bg-transparent" />
          <div className="absolute right-[8%] top-[18%] h-[22%] w-[34%] rounded-md border border-[#484F58]/30 bg-transparent" />
          <div className="absolute bottom-[12%] left-[38%] h-[28%] w-[48%] rounded-md border border-[#484F58]/28 bg-transparent" />
          <div className="absolute right-[12%] top-[44%] h-[36%] w-[22%] rounded-sm border border-[#484F58]/25 bg-transparent" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#58A6FF]/[0.06] via-transparent to-transparent" />

      {/* —— SVG leads + hit overlay —— */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <AnimatePresence>
          {hovered && active && (
            <motion.path
              key={active.id}
              d={active.pathD}
              fill="none"
              stroke="#C9D1D9"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="square"
              strokeLinejoin="miter"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{ pathLength: { type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.12 } }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* Data nodes */}
      {NODES.map((node) => {
        const pctX = (node.dot.x / VB_W) * 100;
        const pctY = (node.dot.y / VB_H) * 100;
        return (
          <div
            key={node.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pctX}%`, top: `${pctY}%` }}
            onMouseEnter={() => {
              clearLeaveTimer();
              setHovered(node.id);
            }}
            onMouseLeave={scheduleLeave}
          >
            <div className="flex h-12 w-12 cursor-default items-center justify-center">
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.65)]"
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.45, 0.9, 0.45],
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Label panel */}
      <AnimatePresence>
        {hovered && active && (
          <motion.div
            key={active.id}
            role="tooltip"
            className="pointer-events-auto absolute z-30 max-w-[min(240px,42vw)] border border-[#30363D] bg-[#0D1117]/92 px-3 py-2 font-mono text-[11px] leading-snug tracking-wide text-[#8B949E] shadow-lg backdrop-blur-sm"
            style={{
              left: active.panel.left,
              top: active.panel.top,
              transform: active.panel.transform,
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.15, ease: easeOut }}
            onMouseEnter={clearLeaveTimer}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="text-[#E6EDF3]">{typed}</span>
            {typed.length < active.label.length && (
              <span className="inline-block w-px animate-pulse bg-[#58A6FF]" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner meta */}
      <div className="pointer-events-none absolute bottom-4 left-4 flex flex-col gap-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#58A6FF]">
          GitHub Copilot
        </span>
        <span className="text-[10px] text-[#6E7681]">De-identified preview</span>
      </div>
    </motion.a>
  );
}
