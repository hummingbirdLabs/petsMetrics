/**
 * Root redirect page — / → /en/
 * With output: 'export', no server middleware is available.
 * Immediate script redirect before React hydration to avoid visible flash.
 */

export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="refresh" content="0;url=/en/" />
        <script
          dangerouslySetInnerHTML={{
            __html: `location.replace('/en/')`,
          }}
        />
      </head>
      <body />
    </html>
  );
}
