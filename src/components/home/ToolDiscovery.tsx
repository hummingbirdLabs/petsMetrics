'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { pageUrl } from '@/lib/utils/url';

type Tab = 'dog' | 'cat' | 'all';

type ToolItem = {
  key: string;
  icon: string;
  tab: 'dog' | 'cat' | 'shared';
  href: string;
  popular?: boolean;
  phase: 'P0' | 'P1';
};

const tools: ToolItem[] = [
  { key: 'toxicChecker', icon: '⚠️', tab: 'shared', href: pageUrl('shared/toxic-checker'), popular: true, phase: 'P0' },
  { key: 'dogCalorie', icon: '🍖', tab: 'dog', href: pageUrl('dog/calorie-calculator'), popular: true, phase: 'P0' },
  { key: 'dogAge', icon: '📅', tab: 'dog', href: pageUrl('dog/age-calculator'), phase: 'P0' },
  { key: 'puppyGrowth', icon: '🐣', tab: 'dog', href: pageUrl('dog/puppy-growth-predictor'), phase: 'P0' },
  { key: 'dogVaccination', icon: '💉', tab: 'dog', href: pageUrl('dog/vaccination-schedule'), phase: 'P0' },
  { key: 'dogGestation', icon: '🤰', tab: 'dog', href: pageUrl('dog/gestation-calculator'), phase: 'P0' },
  { key: 'catBcs', icon: '⚖️', tab: 'cat', href: pageUrl('cat/bcs-weight-tracker'), popular: true, phase: 'P0' },
  { key: 'catHydration', icon: '💧', tab: 'cat', href: pageUrl('cat/hydration-calculator'), phase: 'P0' },
  { key: 'catAge', icon: '📅', tab: 'cat', href: pageUrl('cat/age-calculator'), phase: 'P0' },
  { key: 'catVaccination', icon: '💉', tab: 'cat', href: pageUrl('cat/vaccination-schedule'), phase: 'P0' },
  { key: 'catGestation', icon: '🤰', tab: 'cat', href: pageUrl('cat/gestation-calculator'), phase: 'P0' },
  { key: 'dogBarf', icon: '🥩', tab: 'dog', href: pageUrl('dog/barf-calculator'), phase: 'P1' },
  { key: 'catBarf', icon: '🥩', tab: 'cat', href: pageUrl('cat/barf-calculator'), phase: 'P1' },
  { key: 'insurance', icon: '🛡️', tab: 'shared', href: pageUrl('shared/pet-insurance-estimator'), phase: 'P1' },
  { key: 'euTravel', icon: '✈️', tab: 'shared', href: pageUrl('shared/eu-pet-travel-checker'), phase: 'P0' },
];

export function ToolDiscovery() {
  const t = useTranslations('home.toolDiscovery');
  const [activeTab, setActiveTab] = useState<Tab>('dog');

  const filteredTools = tools.filter((tool) => {
    if (activeTab === 'all') return true;
    return tool.tab === activeTab || tool.tab === 'shared';
  });

  const tabStyles = {
    dog: {
      active: 'bg-[--brand-navy] text-white',
      icon: 'bg-[--dog-primary-light] text-[--dog-primary]',
      border: 'hover:border-[--dog-accent]',
    },
    cat: {
      active: 'bg-[--brand-navy] text-white',
      icon: 'bg-[--cat-primary-light] text-[--cat-primary]',
      border: 'hover:border-[--cat-accent]',
    },
    all: {
      active: 'bg-[--brand-navy] text-white',
      icon: 'bg-[--gray-100] text-[--gray-700]',
      border: 'hover:border-[--brand-teal]',
    },
    shared: {
      active: 'bg-[--brand-navy] text-white',
      icon: 'bg-[--gray-100] text-[--brand-teal]',
      border: 'hover:border-[--brand-teal]',
    },
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'dog', label: t('tabDog') },
    { key: 'cat', label: t('tabCat') },
    { key: 'all', label: t('tabAll') },
  ];

  const getColorForTool = (tool: ToolItem) => {
    if (activeTab === 'all') {
      return tool.tab === 'dog' ? tabStyles.dog : tool.tab === 'cat' ? tabStyles.cat : tabStyles.shared;
    }
    return tabStyles[activeTab];
  };

  return (
    <section className="bg-[--gray-50] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-[--gray-900] sm:text-4xl">
          {t('title')}
        </h2>

        {/* 标签切换器 */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-xl border border-[--gray-300] bg-white p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-[--brand-navy] text-white shadow-sm'
                    : 'text-[--gray-700] hover:bg-[--gray-100]'
                }`}
              >
                {tab.key === 'dog' && '🐕 '}
                {tab.key === 'cat' && '🐱 '}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 工具网格 */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => {
            const colors = getColorForTool(tool);
            return (
              <a
                key={tool.key + tool.href}
                href={tool.href}
                className={`group relative overflow-hidden rounded-xl bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${colors.border} border border-transparent`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg ${colors.icon}`}
                  >
                    {tool.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-[--gray-900]">
                        {t(`tools.${tool.key}.name`)}
                      </h3>
                      {tool.popular ? (
                        <span className="flex-shrink-0 rounded-full bg-[--dog-primary-light] px-2 py-0.5 text-[10px] font-semibold text-[--dog-primary]">
                          ⭐ {t('mostPopular')}
                        </span>
                      ) : null}
                      {tool.phase === 'P1' ? (
                        <span className="flex-shrink-0 rounded-full bg-[--gray-100] px-2 py-0.5 text-[10px] font-medium text-[--gray-500]">
                          {t('comingSoon')}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[--gray-500]">
                      {t(`tools.${tool.key}.desc`)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-sm font-medium text-[--brand-teal] opacity-0 transition-opacity group-hover:opacity-100">
                  Open →
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
