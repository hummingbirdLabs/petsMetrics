import type { Metadata } from 'next';
import { getAllEUTravelRoutes } from '@/lib/data/routes';
import { EU_TRAVEL_REQUIREMENTS } from '@/lib/data/eu-travel-rules';
import {
  generateEUTravelMetadata,
  generateEUTravelFaqJsonLd,
  getRequirementStatus,
  type RequirementStatus,
  countryName,
} from '@/lib/seo/eu-travel-meta';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';

/**
 * generateStaticParams — 预渲染所有 EU 旅行落地页
 */
export function generateStaticParams(): { route: string }[] {
  return getAllEUTravelRoutes().map(({ origin, destination }) => ({
    route: `${origin.toLowerCase()}-to-${destination.toLowerCase()}`,
  }));
}

/**
 * generateMetadata — 每个 route 动态生成独立 SEO metadata
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ route: string }>;
}): Promise<Metadata> {
  const { route } = await params;
  const parts = route.split('-to-');
  if (parts.length !== 2) return { title: 'Not Found', robots: { index: false } };
  const origin = parts[0].toUpperCase();
  const destination = parts[1].toUpperCase();
  return generateEUTravelMetadata(origin, destination);
}

/**
 * EU 宠物旅行落地页 Server Component
 * 路由：/shared/eu-pet-travel/[origin]-to-[destination]/
 * 面包屑：Home > EU Pet Travel > [Origin] → [Destination]
 */
export default async function EUTravelLandingPage({
  params,
}: {
  params: Promise<{ route: string }>;
}) {
  const { route } = await params;
  const parts = route.split('-to-');
  if (parts.length !== 2) {
    return <NotFoundUI />;
  }

  const origin = parts[0].toUpperCase();
  const destination = parts[1].toUpperCase();

  // 验证两地是否有效（至少 destination 在已知码中）
  const destName = countryName(destination);
  const originName = countryName(origin);

  const faqSchema = generateEUTravelFaqJsonLd(origin, destination);

  return (
    <>
      <JsonLdScript data={faqSchema} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'EU Pet Travel' },
            { label: `${originName} → ${destName}` },
          ]}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 border-l-4 border-[--brand-teal] p-6 sm:p-8 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
            Traveling to {destName} with Your Pet — Requirements Checklist
          </h1>
          <p className="mt-3 text-base text-[--gray-600] max-w-3xl">
            Complete guide for traveling from {originName} to {destName} with your dog or
            cat. Microchip, rabies vaccine, pet passport, tapeworm treatment — all
            official requirements in one place. Updated for 2026.
          </p>
        </div>

        {/* Requirements Checklist Table */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[--gray-900] mb-4">
            Travel Requirements Checklist
          </h2>
          <div className="overflow-x-auto rounded-lg border border-[--gray-300]">
            <table className="min-w-full divide-y divide-[--gray-300] text-sm">
              <thead className="bg-[--gray-50]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-[--gray-700]">
                    Requirement
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[--gray-700]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[--gray-700]">
                    Lead Time
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[--gray-700]">
                    Applies To
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--gray-100]">
                {EU_TRAVEL_REQUIREMENTS.map((req) => {
                  const status = getRequirementStatus(req, origin, destination);
                  const isActive = status !== 'not_required';
                  return (
                    <tr
                      key={req.id}
                      className={
                        isActive ? 'bg-white' : 'bg-[--gray-50] text-[--gray-400]'
                      }
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-[--gray-900]">
                          {req.name}
                        </div>
                        <div className="mt-1 text-xs text-[--gray-500] line-clamp-2">
                          {req.description}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {status === 'required' ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[--status-safe-bg] px-2.5 py-0.5 text-xs font-medium text-[--status-safe]">
                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Required
                          </span>
                        ) : status === 'conditional' ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[--status-caution-bg] px-2.5 py-0.5 text-xs font-medium text-[--status-caution]">
                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Species-specific
                          </span>
                        ) : (
                          <span className="text-xs">Not specific to this route</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs">
                        {req.leadTimeDays ? (
                          <span>{req.leadTimeDays} days before travel</span>
                        ) : (
                          <span className="text-[--gray-400]">No waiting period</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs">
                        {req.requiredFor.species.includes('dog') &&
                        req.requiredFor.species.includes('cat')
                          ? 'Dogs & Cats'
                          : req.requiredFor.species.includes('dog')
                            ? 'Dogs only'
                            : 'Cats only'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Official Source Links */}
        <section className="mb-8 rounded-lg border border-[--gray-200] bg-[--gray-50] p-5">
          <h3 className="text-sm font-semibold text-[--gray-700] mb-2">
            Official Sources
          </h3>
          <ul className="flex flex-col gap-1 text-xs text-[--gray-500]">
            {EU_TRAVEL_REQUIREMENTS.map((r) => r.officialSource)
              .filter((v, i, a) => a.indexOf(v) === i)
              .map(
              (source) => (
                <li key={source}>
                  <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[--brand-teal]"
                  >
                    {source}
                  </a>
                </li>
              ),
            )}
          </ul>
        </section>

        {/* CTA Card */}
        <section className="rounded-xl bg-gradient-to-r from-[--brand-teal] to-emerald-600 p-6 sm:p-8 text-white">
          <h3 className="text-xl font-bold">Ready to prepare?</h3>
          <p className="mt-2 text-teal-50 max-w-xl">
            Use our interactive EU Pet Travel Checker to verify all requirements for
            your specific pet — select your origin, destination, and what documents you
            already have.
          </p>
          <a
            href="/shared/eu-pet-travel-checker/"
            className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[--brand-teal] transition-colors hover:bg-teal-50"
          >
            Open EU Pet Travel Checker
          </a>
        </section>

        <div className="mt-8">
          <DisclaimerSection />
        </div>
      </div>
    </>
  );
}

/** Not-found 防御性 UI */
function NotFoundUI() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-[--gray-900]">Route Not Found</h1>
      <p className="mt-2 text-[--gray-500]">
        The EU travel route you are looking for does not exist. Please use the
        interactive checker to search all destinations.
      </p>
      <a
        href="/shared/eu-pet-travel-checker/"
        className="mt-4 inline-block rounded-lg bg-[--brand-teal] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
      >
        Open EU Pet Travel Checker
      </a>
    </div>
  );
}
