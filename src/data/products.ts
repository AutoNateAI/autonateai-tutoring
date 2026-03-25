export type ProductId = 'ai-first-student' | 'ai-first-researcher';

export type ProductDefinition = {
  id: ProductId;
  title: string;
  priceCents: number;
  priceLabel: string;
  description: string;
  audience: string;
  portalPath: string;
};

export const products: ProductDefinition[] = [
  {
    id: 'ai-first-student',
    title: 'AI-First Student',
    priceCents: 12900,
    priceLabel: '$129',
    description:
      'Narrated story deck, Thinking Systems, and connected Google Sheets for planning, studying, and reflection.',
    audience:
      'Students who want a real AI operating system for school, planning, and day-to-day execution.',
    portalPath: '/#/tracks/student',
  },
  {
    id: 'ai-first-researcher',
    title: 'AI-First Researcher',
    priceCents: 18900,
    priceLabel: '$189',
    description:
      'Narrated lectures, 6 research workflow kits, prompt packs, and structured sheets for intake, synthesis, and insight generation.',
    audience:
      'Researchers who need stronger synthesis systems, better note infrastructure, and cleaner AI-assisted research workflows.',
    portalPath: '/#/tracks/researcher',
  },
];

export function getProductById(productId: string | null | undefined) {
  return products.find((product) => product.id === productId) ?? products[0];
}
