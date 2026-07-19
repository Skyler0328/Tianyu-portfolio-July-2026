import { MediaImage } from '@/components/ui/media-image';

export function PortraitHero({
  src = '/portrait-hero.jpg',
  alt = 'Portrait of Tianyu Wu',
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <div className="mx-auto w-[220px] shrink-0 sm:w-[240px] md:mx-0 md:w-full md:justify-self-end">
      <div className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] bg-[#EDEDED] md:rounded-[2rem]">
        <MediaImage
          src={`${src}?v=3`}
          alt={alt}
          fill
          priority
          className="object-cover object-[center_18%] brightness-[1.08] contrast-[0.9] saturate-[0.95]"
          sizes="(max-width: 768px) 240px, 300px"
        />
      </div>
    </div>
  );
}
