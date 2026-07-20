'use client';

import { useState } from 'react';

import type { ProjectMetricShareChart } from '@/app/work/[id]/project-data';

type ShareBarChartProps = {
  chart: ProjectMetricShareChart;
  className?: string;
};

export function ShareBarChart({ chart, className }: ShareBarChartProps) {
  const { title, caption, slices } = chart;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const max = Math.max(...slices.map((s) => s.value));

  return (
    <figure className={className}>
      <div className="mb-4">
        <p className="text-sm font-medium tracking-[-0.01em] text-[#111] md:text-base">
          {title}
        </p>
      </div>

      <ul className="flex flex-col gap-3.5">
        {slices.map((slice, index) => {
          const active = hoverIndex === index;
          const widthPct = (slice.value / max) * 100;

          return (
            <li
              key={slice.name}
              className="relative"
              onPointerEnter={() => setHoverIndex(index)}
              onPointerLeave={() => setHoverIndex(null)}
            >
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="text-xs font-medium text-[#333] md:text-sm">
                  {slice.name}
                </span>
                <span className="font-mono text-[11px] font-medium tabular-nums text-[#666]">
                  {slice.value}%
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#F0F0F0]">
                <div
                  className="h-full rounded-full transition-[width,opacity] duration-200"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: slice.color,
                    opacity: hoverIndex === null || active ? 1 : 0.35,
                  }}
                />
              </div>

              {active ? (
                <div className="pointer-events-none absolute right-0 top-0 z-10 -translate-y-[calc(100%+6px)] rounded-lg border border-[#E8E8E8] bg-white/95 px-3 py-2 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                  <p className="flex items-center gap-1.5 text-xs text-[#555]">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: slice.color }}
                      aria-hidden
                    />
                    {slice.name}
                  </p>
                  <p className="mt-1 text-sm font-semibold tabular-nums text-[#111]">
                    {slice.value}%
                  </p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      {caption ? (
        <figcaption className="mt-4 text-xs leading-relaxed text-[#888]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
