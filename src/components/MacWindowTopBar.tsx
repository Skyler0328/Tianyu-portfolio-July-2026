type MacWindowTopBarProps = {
  position?: 'absolute' | 'static';
};

export function MacWindowTopBar({ position = 'absolute' }: MacWindowTopBarProps) {
  const positionClass =
    position === 'absolute' ? 'absolute inset-x-0 top-0' : 'relative w-full shrink-0';

  return (
    <div
      className={`pointer-events-none z-30 flex h-7 items-center border-b border-white/10 bg-[linear-gradient(180deg,rgba(38,43,51,0.96),rgba(20,24,31,0.96))] px-3 ${positionClass}`}
      aria-hidden
    >
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57] shadow-[0_0_0_1px_rgba(0,0,0,0.28)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] shadow-[0_0_0_1px_rgba(0,0,0,0.28)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840] shadow-[0_0_0_1px_rgba(0,0,0,0.28)]" />
      </div>
    </div>
  );
}
