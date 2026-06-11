import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-display text-6xl font-bold text-[--gray-900]">404</h1>
      <p className="text-lg text-[--gray-500]">Page not found</p>
      <Link
        href="/en/"
        className="rounded-lg bg-[--brand-teal] px-6 py-3 font-medium text-white transition-colors hover:bg-[--brand-teal-light]"
      >
        Return Home
      </Link>
    </main>
  );
}
