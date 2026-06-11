import '@/app/globals.css';

/**
 * Root layout — pass-through.
 * Locale-aware layouts and providers are in [locale]/layout.tsx.
 * This layout only ensures globals.css is loaded for all routes.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
