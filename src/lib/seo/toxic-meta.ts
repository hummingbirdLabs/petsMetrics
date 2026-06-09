import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import type { ToxicItem } from '@/lib/data/toxic-items';

function levelLabel(level: string): string {
  if (level === 'toxic') return 'Toxic';
  if (level === 'caution') return 'Caution';
  return 'Safe';
}

function h1Question(item: ToxicItem, species: 'dog' | 'cat'): string {
  if (species === 'dog') return `Can Dogs Eat ${item.name}?`;
  return `Is ${item.name} Toxic to Cats?`;
}

function fullTitle(item: ToxicItem, species: 'dog' | 'cat'): string {
  const question = h1Question(item, species);
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  return `${question} — ${levelLabel(level)} | petsMetrics`;
}

function metaDescription(item: ToxicItem, species: 'dog' | 'cat'): string {
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  const pet = species === 'dog' ? 'dogs' : 'cats';
  if (level === 'toxic') return `${item.name} is toxic to ${pet}. Learn symptoms, emergency steps, and safe alternatives. ASPCA-backed, science-based reference.`;
  if (level === 'caution') return `${item.name} requires caution for ${pet}. Learn safe amounts, potential risks, and feeding guidelines. ASPCA-backed.`;
  return `${item.name} is generally safe for ${pet}. Learn safe serving guidelines and nutritional value. ASPCA-backed.`;
}

function slugToUrl(species: 'dog' | 'cat', slug: string): string {
  const prefix = species === 'dog' ? 'dog/can-dogs-eat' : 'cat/are-toxic-to-cats';
  return `${SITE_URL}/${prefix}/${slug}/`;
}

export function generateToxicMetadata(item: ToxicItem, species: 'dog' | 'cat'): Metadata {
  const title = fullTitle(item, species);
  const description = metaDescription(item, species);
  const url = slugToUrl(species, item.slug);
  const level = species === 'dog' ? item.dogLevel : item.catLevel;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: SITE_NAME,
    },
    other: {
      'article:tag': [item.name, item.category, level, species],
    },
  };
}

export function generateToxicFaqJsonLd(item: ToxicItem, species: 'dog' | 'cat'): Record<string, unknown> {
  const question = h1Question(item, species);
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  const pet = species === 'dog' ? 'dogs' : 'cats';
  const petSingle = species === 'dog' ? 'dog' : 'cat';

  let answerText: string;
  if (level === 'toxic') {
    answerText = `${item.name} is toxic to ${pet}. Common symptoms include: ${item.symptoms.join(', ')}. ${item.emergencyNote || ''} If ingestion occurred, contact ASPCA Animal Poison Control at (888) 426-4435 immediately.`;
  } else if (level === 'caution') {
    answerText = `${item.name} requires caution when fed to ${pet}. ${item.safeAmount ? `Safe amount: ${item.safeAmount}. ` : ''}Symptoms of overconsumption include: ${item.symptoms.join(', ')}. Always consult a veterinarian.`;
  } else {
    answerText = `${item.name} is generally safe for ${pet}. ${item.safeAmount ? `Safe amount: ${item.safeAmount}. ` : ''}Always introduce new foods gradually and consult your veterinarian.`;
  }

  // FAQ 2: What symptoms to watch for
  const symptomsQ = level === 'toxic'
    ? `What are the symptoms if my ${petSingle} eats ${item.name}?`
    : level === 'caution'
      ? `What happens if my ${petSingle} eats too much ${item.name}?`
      : `What are the benefits of feeding ${item.name} to my ${petSingle}?`;
  const symptomsA = item.symptoms.length > 0
    ? `Symptoms of ${item.name} ${level === 'safe' ? 'overconsumption ' : ''}in ${pet} include: ${item.symptoms.join(', ')}. ${level === 'toxic' ? 'These symptoms can appear within hours of ingestion and require immediate veterinary attention.' : level === 'caution' ? 'These are generally mild and self-limiting but contact your vet if symptoms persist for more than 24 hours.' : 'When fed appropriately, these are very rare. Discontinue feeding if any signs of digestive upset appear.'}`
    : `${item.name} is ${level === 'safe' ? 'safe' : 'potentially problematic'} for ${pet}. ${item.emergencyNote || 'Always introduce new foods gradually and monitor your pet for any adverse reactions.'}`;

  // FAQ 3: When to see a vet
  const vetQ = level === 'toxic'
    ? `How soon should I take my ${petSingle} to the vet after eating ${item.name}?`
    : `When should I contact a vet about feeding ${item.name} to my ${petSingle}?`;
  const vetA = level === 'toxic'
    ? `Seek emergency veterinary care immediately — do not wait for symptoms to appear. Time is critical with ${item.name} toxicity. Call ASPCA Animal Poison Control at (888) 426-4435 en route to the vet. If ingestion occurred within the past 2 hours, the vet may induce vomiting. Bring the packaging or a sample of what was eaten to help the vet determine the toxic dose.`
    : level === 'caution'
      ? `Contact your vet if your ${petSingle} shows any signs of distress such as vomiting, diarrhea, lethargy, or loss of appetite after eating ${item.name}. While rarely life-threatening, overconsumption can cause significant discomfort and may require supportive care like anti-nausea medication or IV fluids.`
      : `While ${item.name} is generally safe, contact your vet if your ${petSingle} shows any signs of an allergic reaction (swelling, hives, difficulty breathing) or digestive upset (vomiting, diarrhea) that persists for more than 24 hours. Every pet is different — what is safe for most may not agree with your individual pet.`;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answerText },
      },
      {
        '@type': 'Question',
        name: symptomsQ,
        acceptedAnswer: { '@type': 'Answer', text: symptomsA },
      },
      {
        '@type': 'Question',
        name: vetQ,
        acceptedAnswer: { '@type': 'Answer', text: vetA },
      },
    ],
  };
}

/**
 * Fallback danger reason — auto-generates ≥100 chars from existing fields
 * when item.dangerReason is not explicitly provided.
 */
export function getDangerReason(item: ToxicItem, species: 'dog' | 'cat'): string {
  if (item.dangerReason) return item.dangerReason;
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  const pet = species === 'dog' ? 'dogs' : 'cats';
  const petSingle = species === 'dog' ? 'dog' : 'cat';

  if (level === 'toxic') {
    const symptomsPart = item.symptoms.length > 0
      ? ` Common symptoms of poisoning include ${item.symptoms.slice(0, 5).join(', ')}${item.symptoms.length > 5 ? ', and other serious signs' : ''}.`
      : '';
    return `${item.name} is toxic to ${pet}. ${item.emergencyNote || `Ingestion can cause serious illness in ${pet}.`}${symptomsPart} This information is sourced from ${item.source} and is provided by petsMetrics as a general reference. Always seek professional veterinary advice for any suspected poisoning. The toxic compounds in ${item.name} can affect ${pet} differently based on the amount consumed, the ${petSingle}'s size, age, and overall health status.`;
  }

  if (level === 'caution') {
    return `${item.name} requires caution when given to ${pet}. While not severely toxic, it can cause digestive upset and other issues if consumed in large amounts. ${item.emergencyNote || ''} ${item.safeAmount ? `The safe amount is: ${item.safeAmount}.` : ''} Always introduce new foods in very small quantities and monitor your ${petSingle} for any adverse reactions. This guidance is based on data from ${item.source} and is provided by petsMetrics for general reference only.`;
  }

  return `${item.name} is generally considered safe for ${pet}. ${item.safeAmount ? `Safe serving: ${item.safeAmount}.` : ''} According to ${item.source}, this item does not contain known toxins that affect ${pet}. However, as with any food or plant, introduce it gradually and in moderation. Even safe foods can cause mild digestive upset if a ${petSingle} eats too much too quickly. This information is provided by petsMetrics as a general reference and does not replace professional veterinary advice.`;
}

/**
 * Fallback what-to-do — auto-generates ≥60 chars from existing fields
 * when item.whatToDo is not explicitly provided.
 */
export function getWhatToDo(item: ToxicItem, species: 'dog' | 'cat'): string {
  if (item.whatToDo) return item.whatToDo;
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  const petSingle = species === 'dog' ? 'dog' : 'cat';

  if (level === 'toxic') {
    return `If your ${petSingle} has ingested ${item.name}, contact ASPCA Animal Poison Control at (888) 426-4435 or your emergency veterinarian immediately. Do not induce vomiting unless instructed by a veterinarian — some substances cause more damage when vomited. Note the approximate amount eaten and the time of ingestion. Bring a sample or packaging to the vet. Keep your ${petSingle} calm and monitor breathing during transport. ${item.emergencyNote || ''}`;
  }

  if (level === 'caution') {
    return `If your ${petSingle} ate ${item.name}, monitor for signs of digestive upset such as vomiting or diarrhea. ${item.safeAmount ? `Stick to the safe amount: ${item.safeAmount}.` : 'Limit future access.'} Provide plenty of fresh water. If symptoms persist for more than 24 hours or if your ${petSingle} becomes lethargic, contact your veterinarian. In most cases, ${item.name} ingestion causes mild and self-limiting symptoms that resolve without medical intervention.`;
  }

  return `If your ${petSingle} ate ${item.name}, no emergency action is typically needed — it is generally considered safe. Monitor for any signs of digestive upset (vomiting, diarrhea, loss of appetite) for 24 hours. Provide fresh water and resume normal feeding. If your ${petSingle} has a known sensitivity or shows any concerning symptoms, contact your veterinarian. Always wash fruits/vegetables and remove pits, seeds, or inedible parts before sharing with pets.`;
}

/**
 * Generates 3 visible FAQ items matching JSON-LD for toxic landing pages.
 * Must be in-sync with generateToxicFaqJsonLd output.
 */
export type ToxicFaqItem = { question: string; answer: string };

export function getToxicLandingFaqItems(item: ToxicItem, species: 'dog' | 'cat'): ToxicFaqItem[] {
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  const pet = species === 'dog' ? 'dogs' : 'cats';
  const petSingle = species === 'dog' ? 'dog' : 'cat';

  const q1 = h1Question(item, species);
  let a1: string;
  if (level === 'toxic') {
    a1 = `${item.name} is toxic to ${pet}. Common symptoms include: ${item.symptoms.join(', ')}. ${item.emergencyNote || ''} If ingestion occurred, contact ASPCA Animal Poison Control at (888) 426-4435 immediately.`;
  } else if (level === 'caution') {
    a1 = `${item.name} requires caution when fed to ${pet}. ${item.safeAmount ? `Safe amount: ${item.safeAmount}. ` : ''}Symptoms of overconsumption include: ${item.symptoms.join(', ')}. Always consult a veterinarian.`;
  } else {
    a1 = `${item.name} is generally safe for ${pet}. ${item.safeAmount ? `Safe amount: ${item.safeAmount}. ` : ''}Always introduce new foods gradually and consult your veterinarian.`;
  }

  const q2 = level === 'toxic'
    ? `What are the symptoms if my ${petSingle} eats ${item.name}?`
    : level === 'caution'
      ? `What happens if my ${petSingle} eats too much ${item.name}?`
      : `What are the benefits of feeding ${item.name} to my ${petSingle}?`;
  const a2 = item.symptoms.length > 0
    ? `Symptoms of ${item.name} ${level === 'safe' ? 'overconsumption ' : ''}in ${pet} include: ${item.symptoms.join(', ')}. ${level === 'toxic' ? 'These symptoms can appear within hours of ingestion and require immediate veterinary attention.' : level === 'caution' ? 'These are generally mild and self-limiting but contact your vet if symptoms persist for more than 24 hours.' : 'When fed appropriately, these are very rare. Discontinue feeding if any signs of digestive upset appear.'}`
    : `${item.name} is ${level === 'safe' ? 'safe' : 'potentially problematic'} for ${pet}. ${item.emergencyNote || 'Always introduce new foods gradually and monitor your pet for any adverse reactions.'}`;

  const q3 = level === 'toxic'
    ? `How soon should I take my ${petSingle} to the vet after eating ${item.name}?`
    : `When should I contact a vet about feeding ${item.name} to my ${petSingle}?`;
  const a3 = level === 'toxic'
    ? `Seek emergency veterinary care immediately — do not wait for symptoms to appear. Time is critical with ${item.name} toxicity. Call ASPCA Animal Poison Control at (888) 426-4435 en route to the vet. If ingestion occurred within the past 2 hours, the vet may induce vomiting. Bring the packaging or a sample of what was eaten to help the vet determine the toxic dose.`
    : level === 'caution'
      ? `Contact your vet if your ${petSingle} shows any signs of distress such as vomiting, diarrhea, lethargy, or loss of appetite after eating ${item.name}. While rarely life-threatening, overconsumption can cause significant discomfort and may require supportive care like anti-nausea medication or IV fluids.`
      : `While ${item.name} is generally safe, contact your vet if your ${petSingle} shows any signs of an allergic reaction (swelling, hives, difficulty breathing) or digestive upset (vomiting, diarrhea) that persists for more than 24 hours. Every pet is different — what is safe for most may not agree with your individual pet.`;

  return [
    { question: q1, answer: a1 },
    { question: q2, answer: a2 },
    { question: q3, answer: a3 },
  ];
}

export function generateToxicArticleJsonLd(item: ToxicItem, species: 'dog' | 'cat'): Record<string, unknown> {
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  const url = slugToUrl(species, item.slug);
  const pet = species === 'dog' ? 'dogs' : 'cats';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fullTitle(item, species),
    description: metaDescription(item, species),
    url,
    about: {
      '@type': 'Thing',
      name: item.name,
      description: `Toxicity profile of ${item.name} for ${pet}: ${levelLabel(level)}`,
    },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * ContactPoint JSON-LD — Emergency hotlines for toxic ingestion.
 * Google AI Overview uses this to display "Call" buttons in AI summaries.
 * Required by geo-checklist §7 for all toxic landing pages.
 */
export function generateToxicContactPointJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'petsMetrics Emergency Resources',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'animal poison emergency',
        telephone: '+1-888-426-4435',
        description: 'ASPCA Animal Poison Control Center',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'animal poison emergency',
        telephone: '+1-855-764-7661',
        description: 'Pet Poison Helpline',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
    ],
  };
}
