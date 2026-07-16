import Image from 'next/image';

function isSvgSrc(src: string) {
  return src.endsWith('.svg');
}

type MediaImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
};

export function MediaImage({
  src,
  alt,
  width = 1600,
  height = 900,
  className,
  style,
  fill,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority,
}: MediaImageProps) {
  const unoptimized = isSvgSrc(src);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        style={style}
        sizes={sizes}
        unoptimized={unoptimized}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      sizes={sizes}
      unoptimized={unoptimized}
      priority={priority}
    />
  );
}
