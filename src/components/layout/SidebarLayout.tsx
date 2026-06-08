import { type ReactNode } from 'react';

type SidebarLayoutProps = {
  main: ReactNode;
  sidebar: ReactNode;
  className?: string;
};

export function SidebarLayout({ main, sidebar, className = '' }: SidebarLayoutProps) {
  return (
    <div className={`mx-auto grid max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8 ${className}`}>
      <main>{main}</main>
      <aside className="hidden lg:flex lg:flex-col lg:gap-4">
        {sidebar}
        <div id="adsense-sidebar-bottom" />
      </aside>
    </div>
  );
}
