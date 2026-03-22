export const COURSE_PRODUCTS = {
  'ai-first-student': {
    id: 'ai-first-student',
    title: 'AI-First Student',
    amountCents: 12900,
    currency: 'USD',
    portalUrl: 'https://portal.autonateai.com/#/tracks/student',
  },
  'ai-first-researcher': {
    id: 'ai-first-researcher',
    title: 'AI-First Researcher',
    amountCents: 18900,
    currency: 'USD',
    portalUrl: 'https://portal.autonateai.com/#/tracks/researcher',
  },
};

export function getCourseProduct(productId) {
  return COURSE_PRODUCTS[productId] ?? null;
}
