'use client';

/* eslint-disable @next/next/no-img-element */

import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { MacWindowTopBar } from './MacWindowTopBar';

/**
 * Interactive screenshot overlay for the GitHub Copilot detail page.
 * Three pulsing nodes invite hover; on hover a drawn SVG path animates
 * from the dot to a tooltip panel (same mechanic as the original home card).
 */

const VB_W = 100;
const VB_H = 62.5; // 16:10 — matches copilot-image1.png dimensions

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
    // Dot at the "[Label]" badge in the Copilot Chat right panel
    pathD: `M 76 16 L 60 16 L 60 6 L 44 6`,
    dot: { x: 76, y: 16 },
    label: '[01] Contextual grounding flow',
    panel: { left: '30%', top: '3%', transform: 'translateX(-50%)' },
  },
  {
    id: 'n2',
    // Dot inside the code editor — inline suggestion area
    pathD: `M 38 30 L 38 47 L 60 47`,
    dot: { x: 38, y: 30 },
    label: '[02] Inline suggestion coherence',
    panel: { left: '60%', top: '70%' },
  },
  {
    id: 'n3',
    // Dot in the chat panel trust/response area
    pathD: `M 83 40 L 94 40 L 94 22 L 68 22`,
    dot: { x: 83, y: 40 },
    label: '[03] Trust & disclosure layer',
    panel: { left: '54%', top: '28%', transform: 'translateX(-50%)' },
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
    if (!activeId || !fullText) { setOut(''); return; }
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
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [activeId, fullText]);

  return out;
}

export function CopilotNodesHero() {
  const [hovered, setHovered] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
  }, []);

  const scheduleLeave = useCallback(() => {
    clearLeaveTimer();
    leaveTimer.current = setTimeout(() => setHovered(null), 200);
  }, [clearLeaveTimer]);

  const active = NODES.find((n) => n.id === hovered);
  const typed = useTypewriter(hovered, active?.label ?? '');

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[#E8E8E8] bg-white shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)]"
      style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
    >
      <MacWindowTopBar />
      <div className="absolute inset-x-0 bottom-0 top-7 overflow-hidden">
      {/* Screenshot */}
      <img
        src="/copilot-image1.png"
        alt="GitHub Copilot IDE — interactive annotation"
        className="absolute inset-0 h-full w-full object-cover object-left-top"
        loading="lazy"
        decoding="async"
      />

      {/* Subtle dark vignette so panels are legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

      {/* SVG path layer */}
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
              strokeWidth={0.8}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="square"
              strokeLinejoin="miter"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { type: 'tween', duration: 0.3, ease: easeOut },
                opacity: { duration: 0.12 },
              }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* Nodes */}
      {NODES.map((node) => {
        const pctX = (node.dot.x / VB_W) * 100;
        const pctY = (node.dot.y / VB_H) * 100;
        return (
          <div
            key={node.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pctX}%`, top: `${pctY}%` }}
            onMouseEnter={() => { clearLeaveTimer(); setHovered(node.id); }}
            onMouseLeave={scheduleLeave}
          >
            <div className="flex h-10 w-10 cursor-default items-center justify-center">
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.65)]"
                animate={{ scale: [1, 1.4, 1], opacity: [0.45, 0.9, 0.45] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        );
      })}

      {/* Tooltip panel */}
      <AnimatePresence>
        {hovered && active && (
          <motion.div
            key={active.id}
            role="tooltip"
            className="pointer-events-auto absolute z-30 max-w-[min(220px,38vw)] rounded-lg border border-[#E8E8E8] bg-white/95 px-3 py-2 font-mono text-xs leading-snug tracking-wide text-[#555] shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            style={{ left: active.panel.left, top: active.panel.top, transform: active.panel.transform }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.15, ease: easeOut }}
            onMouseEnter={clearLeaveTimer}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="text-[#111]">{typed}</span>
            {typed.length < (active?.label.length ?? 0) && (
              <span className="inline-block w-px animate-pulse bg-[#0D7C6F]" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
