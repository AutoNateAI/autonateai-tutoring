export type ProductId =
  | 'ai-first-student'
  | 'agentic-ai-workshop-apr-11-2026'
  | 'ai-first-researcher'
  | 'student-systems-program-25-2h'
  | 'student-systems-program-25-3h'
  | 'student-systems-program-25-4h'
  | 'student-systems-program-50-2h'
  | 'student-systems-program-50-3h'
  | 'student-systems-program-50-4h'
  | 'student-systems-program-100-2h'
  | 'student-systems-program-100-3h'
  | 'student-systems-program-100-4h';

export type ProductDefinition = {
  id: ProductId;
  title: string;
  priceCents: number;
  priceLabel: string;
  description: string;
  audience: string;
  portalPath?: string;
  fulfillmentType: 'portal-access' | 'organization-program';
  studentCount?: number;
  workshopHours?: number;
  maxSuccessfulPayments?: number;
  eventDateLabel?: string;
  eventTimeLabel?: string;
};

export const products: ProductDefinition[] = [
  {
    id: 'ai-first-student',
    title: '2-Hour Student Systems Coaching',
    priceCents: 15900,
    priceLabel: '$159',
    description:
      'A live 2-hour coaching session that gets the system installed, teaches the workflows, and includes lifetime portal access.',
    audience:
      'Students who want hands-on help installing the system, learning practical workflows, and leaving with lasting structure.',
    portalPath: '/#/tracks/student',
    fulfillmentType: 'portal-access',
  },
  {
    id: 'agentic-ai-workshop-apr-11-2026',
    title: 'Agentic AI Live Workshop',
    priceCents: 15900,
    priceLabel: '$159',
    description:
      'Saturday, April 11, 2026 from 10:00 AM to 12:30 PM. Live workshop access, laptop setup with your AI agent of choice, and lifetime portal access.',
    audience:
      'Students who want the live Saturday workshop, their AI stack set up properly, and direct exposure to the deeper agentic AI coaching ideas inside the portal.',
    portalPath: '/#/tracks/student',
    fulfillmentType: 'portal-access',
    maxSuccessfulPayments: 50,
    eventDateLabel: 'Saturday, April 11, 2026',
    eventTimeLabel: '10:00 AM - 12:30 PM',
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
    fulfillmentType: 'portal-access',
  },
  {
    id: 'student-systems-program-25-2h',
    title: 'Student Systems Workshop Program',
    priceCents: 322500,
    priceLabel: '$3,225',
    description: '2-hour live workshop for up to 25 students, plus lifetime portal access for each student.',
    audience: 'Smaller cohorts that need intensive installation, workflow coaching, and direct support.',
    fulfillmentType: 'organization-program',
    studentCount: 25,
    workshopHours: 2,
  },
  {
    id: 'student-systems-program-25-3h',
    title: 'Student Systems Workshop Program',
    priceCents: 385000,
    priceLabel: '$3,850',
    description: '3-hour live workshop for up to 25 students, plus lifetime portal access for each student.',
    audience: 'Smaller cohorts that need extra coaching time to install the operating system deeply.',
    fulfillmentType: 'organization-program',
    studentCount: 25,
    workshopHours: 3,
  },
  {
    id: 'student-systems-program-25-4h',
    title: 'Student Systems Workshop Program',
    priceCents: 447500,
    priceLabel: '$4,475',
    description: '4-hour live workshop for up to 25 students, plus lifetime portal access for each student.',
    audience: 'Smaller cohorts that want a full installation and integration session in one workshop block.',
    fulfillmentType: 'organization-program',
    studentCount: 25,
    workshopHours: 4,
  },
  {
    id: 'student-systems-program-50-2h',
    title: 'Student Systems Workshop Program',
    priceCents: 595000,
    priceLabel: '$5,950',
    description: '2-hour live workshop for up to 50 students, plus lifetime portal access for each student.',
    audience: 'Mid-sized student programs focused on workforce development, college prep, and practical AI fluency.',
    fulfillmentType: 'organization-program',
    studentCount: 50,
    workshopHours: 2,
  },
  {
    id: 'student-systems-program-50-3h',
    title: 'Student Systems Workshop Program',
    priceCents: 720000,
    priceLabel: '$7,200',
    description: '3-hour live workshop for up to 50 students, plus lifetime portal access for each student.',
    audience: 'Mid-sized student programs that need more live integration time and guided workflow practice.',
    fulfillmentType: 'organization-program',
    studentCount: 50,
    workshopHours: 3,
  },
  {
    id: 'student-systems-program-50-4h',
    title: 'Student Systems Workshop Program',
    priceCents: 845000,
    priceLabel: '$8,450',
    description: '4-hour live workshop for up to 50 students, plus lifetime portal access for each student.',
    audience: 'Mid-sized cohorts that want the deepest live install and coaching path available.',
    fulfillmentType: 'organization-program',
    studentCount: 50,
    workshopHours: 4,
  },
  {
    id: 'student-systems-program-100-2h',
    title: 'Student Systems Workshop Program',
    priceCents: 1090000,
    priceLabel: '$10,900',
    description: '2-hour live workshop for up to 100 students, plus lifetime portal access for each student.',
    audience: 'Large workforce-development, college-prep, and school programs that need a scalable operating upgrade.',
    fulfillmentType: 'organization-program',
    studentCount: 100,
    workshopHours: 2,
  },
  {
    id: 'student-systems-program-100-3h',
    title: 'Student Systems Workshop Program',
    priceCents: 1340000,
    priceLabel: '$13,400',
    description: '3-hour live workshop for up to 100 students, plus lifetime portal access for each student.',
    audience: 'Large programs that want more live modeling, practice, and workflow integration time.',
    fulfillmentType: 'organization-program',
    studentCount: 100,
    workshopHours: 3,
  },
  {
    id: 'student-systems-program-100-4h',
    title: 'Student Systems Workshop Program',
    priceCents: 1590000,
    priceLabel: '$15,900',
    description: '4-hour live workshop for up to 100 students, plus lifetime portal access for each student.',
    audience: 'Large programs that want the full maximum workshop installation block for their students.',
    fulfillmentType: 'organization-program',
    studentCount: 100,
    workshopHours: 4,
  },
];

export function getProductById(productId: string | null | undefined) {
  return products.find((product) => product.id === productId) ?? products[0];
}
