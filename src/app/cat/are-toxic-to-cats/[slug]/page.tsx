import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { TOXIC_ITEMS, type ToxicItem } from '@/lib/data/toxic-items';
import { ToxicLandingPage } from '@/components/shared/ToxicLandingPage';
import { generateToxicMetadata } from '@/lib/seo/toxic-meta';

/** 共享的 slug→item 查找 */
function findItem(slug: string): ToxicItem | undefined {
  return TOXIC_ITEMS.find((i) => i.slug === slug);
}

/**
 * generateStaticParams — 强制造染所有猫类毒性落地页
 * 过滤 species === 'cat' | 'both' 的所有条目
 */
export function generateStaticParams(): { slug: string }[] {
  return TOXIC_ITEMS
    .filter((item) => item.species === 'cat' || item.species === 'both')
    .map((item) => ({ slug: item.slug }));
}

/**
 * generateMetadata — 每个 slug 动态生成独立 SEO metadata（猫类措辞）
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) return { title: 'Not Found', robots: { index: false } };
  return generateToxicMetadata(item, 'cat');
}

/**
 * 猫类毒性落地页 Server Component
 * 路由：/cat/are-toxic-to-cats/[slug]/
 * 面包屑：Home > Cat > Is It Toxic to Cats? > [Item Name]
 */
export default async function CatToxicLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = findItem(slug);

  if (!item) {
    return <NotFoundUI />;
  }

  const t = await getTranslations('common');

  return (
    <ToxicLandingPage
      item={item}
      species="cat"
      disclaimerText={t('disclaimer.toxic')}
      breadcrumbItems={[
        { label: 'Home', href: '' },
        { label: 'Cat', href: 'cat' },
        { label: 'Is It Toxic to Cats?' },
        { label: item.name },
      ]}
    />
  );
}

/** Not-found 防御性 UI（仅在 generateStaticParams 产生的路径之外触发） */
function NotFoundUI() {
  const t = useTranslations('toxicLanding.notFound');
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-[--gray-900]">{t('title')}</h1>
      <p className="mt-2 text-[--gray-500]">{t('description')}</p>
      <a
        href="/shared/toxic-checker/"
        className="mt-4 inline-block rounded-lg bg-[--cat-primary] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[--cat-primary-dark]"
      >
        {t('cta')}
      </a>
    </div>
  );
}
