'use client';

import { useState, type PointerEvent } from 'react';

import type { ProjectMetricLineChart } from '@/app/work/[id]/project-data';

type LineTrendChartProps = {
  chart: ProjectMetricLineChart;
  className?: string;
};

function niceCeil(value: number): number {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;
  const nice =
    normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return nice * magnitude;
}

function formatCompact(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `${Number.isInteger(m) ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (value >= 1_000) {
    const k = value / 1_000;
    return `${Number.isInteger(k) ? k.toFixed(0) : k.toFixed(1)}K`;
  }
  return String(Math.round(value));
}

function formatTick(value: number, format: 'compact' | 'index'): string {
  if (format === 'index') return value.toFixed(0);
  return formatCompact(value);
}

function formatValue(value: number, format: 'compact' | 'index'): string {
  if (format === 'index') {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString('en-US');
}

function buildPath(
  data: number[],
  xAt: (i: number) => number,
  yAt: (v: number) => number
): string {
  return data
    .map(
      (value, i) =>
        `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(2)} ${yAt(value).toFixed(2)}`
    )
    .join(' ');
}

function buildArea(
  data: number[],
  xAt: (i: number) => number,
  yAt: (v: number) => number,
  baselineY: number
): string {
  if (data.length === 0) return '';
  const line = buildPath(data, xAt, yAt);
  const lastX = xAt(data.length - 1);
  const firstX = xAt(0);
  return `${line} L ${lastX.toFixed(2)} ${baselineY.toFixed(2)} L ${firstX.toFixed(2)} ${baselineY.toFixed(2)} Z`;
}

export function LineTrendChart({ chart, className }: LineTrendChartProps) {
  const {
    title,
    caption,
    categories,
    series,
    beginAtZero = false,
    valueFormat = 'compact',
  } = chart;

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const width = 560;
  const height = 280;
  const pad = { top: 18, right: 16, bottom: 36, left: 48 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const allValues = series.flatMap((s) => s.data);
  const dataMin = Math.min(...allValues);
  const dataMax = Math.max(...allValues);
  const yMin = beginAtZero ? 0 : Math.max(0, dataMin * 0.92);
  const yMax = niceCeil(dataMax * (beginAtZero ? 1.05 : 1.08));
  const yTicks = 4;

  const xAt = (i: number) =>
    pad.left +
    (categories.length <= 1
      ? plotW / 2
      : (i / (categories.length - 1)) * plotW);

  const yAt = (v: number) =>
    pad.top + plotH - ((v - yMin) / (yMax - yMin || 1)) * plotH;

  const xLabelStep = Math.max(1, Math.ceil(categories.length / 5));

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = width / rect.width;
    const localX = (event.clientX - rect.left) * scaleX;

    if (localX < pad.left || localX > width - pad.right) {
      setHoverIndex(null);
      return;
    }

    if (categories.length <= 1) {
      setHoverIndex(0);
      return;
    }

    const t = (localX - pad.left) / plotW;
    setHoverIndex(
      Math.min(
        categories.length - 1,
        Math.max(0, Math.round(t * (categories.length - 1)))
      )
    );
  };

  const hoverX = hoverIndex === null ? null : xAt(hoverIndex);
  const tooltipNearRight =
    hoverIndex !== null && hoverIndex > categories.length * 0.55;

  return (
    <figure className={className}>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <p className="text-sm font-medium tracking-[-0.01em] text-[#111] md:text-base">
          {title}
        </p>
        <ul className="flex flex-wrap items-center gap-3">
          {series.map((s) => (
            <li
              key={s.name}
              className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[#666]"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
                aria-hidden
              />
              {s.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full touch-pan-y"
          role="img"
          aria-label={title}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
        >
          {Array.from({ length: yTicks + 1 }, (_, i) => {
            const value = yMin + ((yMax - yMin) / yTicks) * i;
            const y = yAt(value);
            return (
              <g key={`y-${i}`}>
                <line
                  x1={pad.left}
                  x2={width - pad.right}
                  y1={y}
                  y2={y}
                  stroke="#E8E8E8"
                  strokeWidth={1}
                />
                <text
                  x={pad.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#999"
                  fontSize={10}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  {formatTick(value, valueFormat)}
                </text>
              </g>
            );
          })}

          {categories.map((label, i) => {
            if (i % xLabelStep !== 0 && i !== categories.length - 1) return null;
            return (
              <text
                key={label}
                x={xAt(i)}
                y={height - 10}
                textAnchor="middle"
                fill="#999"
                fontSize={10}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                {label}
              </text>
            );
          })}

          {series.map((s) => (
            <g key={s.name}>
              <path
                d={buildArea(s.data, xAt, yAt, pad.top + plotH)}
                fill={s.color}
                opacity={0.12}
              />
              <path
                d={buildPath(s.data, xAt, yAt)}
                fill="none"
                stroke={s.color}
                strokeWidth={2.25}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {s.data.map((value, i) => {
                const active = hoverIndex === i;
                return (
                  <circle
                    key={`${s.name}-${i}`}
                    cx={xAt(i)}
                    cy={yAt(value)}
                    r={active ? 4.5 : 3}
                    fill="#FAFAFA"
                    stroke={s.color}
                    strokeWidth={active ? 2.25 : 1.75}
                  />
                );
              })}
            </g>
          ))}

          {hoverX !== null ? (
            <line
              x1={hoverX}
              x2={hoverX}
              y1={pad.top}
              y2={pad.top + plotH}
              stroke="#CCCCCC"
              strokeWidth={1}
              strokeDasharray="3 3"
              pointerEvents="none"
            />
          ) : null}
        </svg>

        {hoverIndex !== null ? (
          <div
            className="pointer-events-none absolute top-3 z-10 min-w-[9.5rem] rounded-lg border border-[#E8E8E8] bg-white/95 px-3 py-2.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            style={{
              left: `${(xAt(hoverIndex) / width) * 100}%`,
              transform: tooltipNearRight
                ? 'translateX(calc(-100% - 10px))'
                : 'translateX(10px)',
            }}
          >
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#888]">
              {categories[hoverIndex]}
            </p>
            <ul className="mt-2 space-y-1.5">
              {series.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center justify-between gap-4 text-xs"
                >
                  <span className="flex items-center gap-1.5 text-[#555]">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: s.color }}
                      aria-hidden
                    />
                    {s.name}
                  </span>
                  <span className="font-medium tabular-nums text-[#111]">
                    {formatValue(s.data[hoverIndex], valueFormat)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {caption ? (
        <figcaption className="mt-2 text-xs leading-relaxed text-[#888]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
