'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MediaImage } from '@/components/ui/media-image';

export type ShowcaseItem = {
  id: string;
  name: string;
  role: string;
  image: string;
};

const ITEMS: ShowcaseItem[] = [
  {
    id: 'sketch',
    name: 'Drawing & Sketches',
    role: 'Hand-drawn manuscripts & figure studies',
    image: '/beyond/sketch-portrait.jpg',
  },
  {
    id: 'diving',
    name: 'Scuba Diving',
    role: 'Underwater exploration & stillness',
    image: '/beyond/diving.jpg',
  },
  {
    id: 'landscape',
    name: 'Landscape Architecture',
    role: 'Spatial analysis & concept visualization',
    image: '/beyond/landscape-analysis.jpg',
  },
  {
    id: 'spatial',
    name: 'Spatial Thinking & Analysis',
    role: 'Helped me understand how location shapes behavior',
    image: '/beyond/spatial-analysis.png',
  },
  {
    id: 'graphic',
    name: 'Graphic Composition',
    role: 'Form, structure & visual systems',
    image: '/beyond/graphic-composition.png',
  },
  {
    id: 'brand',
    name: 'SIXSEEDS Festival',
    role: 'Bread Bank pop-up · +70% day sales',
    image: '/beyond/sixseeds-festival.png?v=2',
  },
  {
    id: 'lemur',
    name: 'Me & Lemur',
    role: 'A quiet moment with good company',
    image: '/beyond/me-and-lemur.jpg',
  },
  {
    id: 'charrette',
    name: 'Study in America',
    role: 'Wayfinding charrette · graduate school years',
    image: '/beyond/charrette.jpg',
  },
];

/** Max 2 images per column; extra columns grow to the right. */
const PER_COLUMN = 2;

const COL_STYLES = [
  {
    offset: 'mt-0',
    size: 'h-[120px] w-[110px] sm:h-[140px] sm:w-[130px] md:h-[165px] md:w-[155px]',
  },
  {
    offset: 'mt-[48px] sm:mt-[56px] md:mt-[68px]',
    size: 'h-[132px] w-[122px] sm:h-[155px] sm:w-[145px] md:h-[182px] md:w-[172px]',
  },
  {
    offset: 'mt-[22px] sm:mt-[26px] md:mt-[32px]',
    size: 'h-[125px] w-[115px] sm:h-[146px] sm:w-[136px] md:h-[172px] md:w-[162px]',
  },
  {
    offset: 'mt-[36px] sm:mt-[42px] md:mt-[52px]',
    size: 'h-[120px] w-[110px] sm:h-[140px] sm:w-[130px] md:h-[165px] md:w-[155px]',
  },
] as const;

function chunkItems<T>(items: T[], size: number): T[][] {
  const columns: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    columns.push(items.slice(i, i + size));
  }
  return columns;
}

export default function TeamShowcase({ members = ITEMS }: { members?: ShowcaseItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const columns = chunkItems(members, PER_COLUMN);

  return (
    <div
      className="mx-auto flex w-full max-w-5xl select-none flex-col items-start gap-8 md:flex-row md:gap-10 lg:gap-14"
      onMouseLeave={() => setActive(null)}
    >
      <div className="flex shrink-0 gap-2 overflow-x-auto pb-1 md:gap-3">
        {columns.map((column, colIndex) => {
          const style = COL_STYLES[colIndex % COL_STYLES.length];
          return (
            <div
              key={colIndex}
              className={cn('flex flex-col gap-2 md:gap-3', style.offset)}
            >
              {column.map((item) => {
                const on = active === item.id;
                const dim = active !== null && !on;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(
                      'relative shrink-0 overflow-hidden rounded-xl p-0 transition-opacity duration-150',
                      style.size,
                      dim ? 'opacity-50' : 'opacity-100',
                    )}
                    onMouseEnter={() => setActive(item.id)}
                    onFocus={() => setActive(item.id)}
                  >
                    <MediaImage
                      src={item.image}
                      alt={item.name}
                      fill
                      className={cn(
                        'pointer-events-none object-cover transition-[filter] duration-150',
                        on ? 'grayscale-0 brightness-100' : 'grayscale brightness-[0.77]',
                      )}
                      sizes="172px"
                    />
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      <ul className="flex w-full flex-1 flex-col gap-4 sm:grid sm:grid-cols-2 md:flex md:flex-col md:gap-5">
        {members.map((item) => {
          const on = active === item.id;
          const dim = active !== null && !on;
          return (
            <li
              key={item.id}
              className={cn(
                'cursor-default transition-opacity duration-150',
                dim ? 'opacity-45' : 'opacity-100',
              )}
              onMouseEnter={() => setActive(item.id)}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'h-3 w-4 shrink-0 rounded-[5px] transition-[width,background-color] duration-150',
                    on ? 'w-5 bg-[#111]' : 'bg-[#111]/20',
                  )}
                />
                <span
                  className={cn(
                    'text-base font-semibold leading-none tracking-tight md:text-[18px]',
                    on ? 'text-[#111]' : 'text-[#111]/80',
                  )}
                >
                  {item.name}
                </span>
              </div>
              <p className="mt-1.5 pl-[27px] text-[10px] font-medium uppercase tracking-[0.2em] text-[#888] md:text-[11px]">
                {item.role}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
