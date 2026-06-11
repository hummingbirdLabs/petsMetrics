'use client';

import { useEffect } from 'react';

/**
 * Root redirect page — / → /en/
 * With output: 'export', no server middleware is available.
 * This client-side redirect handles the root URL for SSG deployment.
 */
export default function RootPage() {
  useEffect(() => {
    window.location.replace('/en/');
  }, []);

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0;url=/en/" />
        <title>Redirecting to petsMetrics</title>
      </head>
      <body>
        <p>Redirecting to <a href="/en/">petsMetrics</a>...</p>
      </body>
    </html>
  );
}
