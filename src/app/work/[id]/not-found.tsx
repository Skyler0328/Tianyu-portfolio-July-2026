import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';

export default function WorkNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0D1117] px-4 text-center text-[#E6EDF3]">
      <p className="font-mono text-sm text-[var(--accent-teal)]">404</p>
      <h1 className="mt-3 text-balance text-xl font-semibold text-[#F0F6FC]">
        Project not found
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-[var(--accent-teal)] hover:text-[#72F3E8]"
      >
        <IconArrowLeft className="h-4 w-4" stroke={1.8} aria-hidden />
        <span>返回</span>
      </Link>
    </main>
  );
}
