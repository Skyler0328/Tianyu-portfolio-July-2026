import Link from 'next/link';

export default function WorkNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0D1117] px-4 text-center text-[#E6EDF3]">
      <p className="font-mono text-sm text-[#58A6FF]">404</p>
      <h1 className="mt-3 text-balance text-xl font-semibold text-[#F0F6FC]">
        Project not found
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-[#58A6FF] hover:text-[#79B8FF]"
      >
        <span aria-hidden>←</span>
        <span>返回</span>
      </Link>
    </main>
  );
}
