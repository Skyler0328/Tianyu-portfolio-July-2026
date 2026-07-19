'use client';

import type { ProjectItemMetrics } from '@/app/work/[id]/project-data';
import { LineTrendChart } from '@/components/work/LineTrendChart';

const toneClass: Record<
  NonNullable<ProjectItemMetrics['stats'][number]['tone']>,
  string
> = {
  positive: 'text-[#0D7C6F]',
  negative: 'text-[#B45309]',
  neutral: 'text-[#111]',
};

export function SectionItemMetrics({ metrics }: { metrics: ProjectItemMetrics }) {
  return (
    <div className="mt-8 space-y-6">
      <dl className="grid grid-cols-2 gap-4 border-y border-[#E8E8E8] py-5 md:grid-cols-4 md:gap-6">
        {metrics.stats.map((stat) => (
          <div key={stat.label}>
            <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#888] md:text-xs">
              {stat.label}
            </dt>
            <dd
              className={`mt-2 text-2xl font-semibold tracking-[-0.03em] md:text-3xl ${
                toneClass[stat.tone ?? 'neutral']
              }`}
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {metrics.charts.map((chart) => (
          <div
            key={chart.title}
            className="rounded-2xl border border-[#E8E8E8] bg-white px-4 py-4 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)] md:px-5 md:py-5"
          >
            <LineTrendChart chart={chart} />
          </div>
        ))}
      </div>

      {metrics.footnote ? (
        <p className="text-xs leading-relaxed text-[#888]">{metrics.footnote}</p>
      ) : null}
    </div>
  );
}
