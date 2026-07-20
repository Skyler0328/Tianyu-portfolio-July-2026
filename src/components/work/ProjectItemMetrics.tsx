'use client';

import type { ProjectItemMetrics as ProjectItemMetricsData } from '@/app/work/[id]/project-data';

import { LineTrendChart } from './LineTrendChart';
import { ShareBarChart } from './ShareBarChart';

const labelText =
  'font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#888]';

type ProjectItemMetricsProps = {
  metrics: ProjectItemMetricsData;
};

function toneClass(tone: 'positive' | 'negative' | 'neutral' | undefined) {
  if (tone === 'positive') return 'text-[#0D7C6F]';
  if (tone === 'negative') return 'text-[#B45309]';
  return 'text-[#111]';
}

export function ProjectItemMetrics({ metrics }: ProjectItemMetricsProps) {
  const { stats, charts, footnote } = metrics;
  const statCols =
    stats.length <= 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : 'grid-cols-2 md:grid-cols-4';

  return (
    <div className="mt-8 space-y-8">
      <dl className={`grid gap-6 md:gap-8 ${statCols}`}>
        {stats.map((stat) => (
          <div key={stat.label} className="border-t border-[#E8E8E8] pt-4">
            <dt className={labelText}>{stat.label}</dt>
            <dd
              className={`mt-2 text-2xl font-semibold tracking-[-0.03em] md:text-3xl ${toneClass(stat.tone)}`}
            >
              {stat.value}
            </dd>
            {stat.detail ? (
              <p className="mt-2 text-xs leading-relaxed text-[#666] md:text-sm">
                {stat.detail}
              </p>
            ) : null}
          </div>
        ))}
      </dl>

      <div className="grid gap-6 md:grid-cols-2 md:gap-5">
        {charts.map((chart) => (
          <div
            key={chart.title}
            className="overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white px-4 py-4 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)] sm:px-5 sm:py-5"
          >
            {chart.type === 'share' ? (
              <ShareBarChart chart={chart} />
            ) : (
              <LineTrendChart chart={chart} />
            )}
          </div>
        ))}
      </div>

      {footnote ? (
        <p className="max-w-3xl text-xs leading-relaxed text-[#888]">
          {footnote}
        </p>
      ) : null}
    </div>
  );
}
