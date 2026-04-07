import type {ResearchArticle} from '@site/src/components/research/ResearchTypes';

export const researchArticles: ResearchArticle[] = [
  {
    slug: 'epigenetic-memory-and-human-reprogramming',
    title: 'Epigenetic Memory And Human Reprogramming',
    description:
      'A research note on why epigenetic regulation behaves like a memory layer, why Van Andel Institute keeps betting on it, and why that matters for any serious conversation about reconstruction, adaptation, and deliberate change.',
    dateLabel: 'April 7, 2026',
    readTime: '12 min read',
    category: 'Epigenetics',
    status: 'Published',
    featured: true,
    image: '/img/research/article-epigenetic-memory.png',
    imageAlt: 'A futuristic portrait scene showing a researcher inside a field of luminous epigenetic networks and biological memory layers.',
    kicker: 'Research Node 001',
    quote:
      'If DNA is the script, epigenetics is the choreography. Same letters. Different life.',
    sources: [
      {
        title: 'VAI–SU2C Epigenetics Dream Team',
        href: 'https://www.vai.org/research/collaborations/vai-su2c-epigenetics-dream-team/',
        publisher: 'Van Andel Institute',
        year: '2026',
        note: 'Official overview of VAI’s epigenetics collaboration, its leaders, and active translational trials.',
      },
      {
        title: 'Genetics and environment distinctively shape the human immune cell epigenome',
        href: 'https://www.nature.com/articles/s41588-025-02479-6',
        publisher: 'Nature Genetics',
        year: '2025',
        note: 'Single-nucleus methylation and chromatin-accessibility study quantifying how exposures and genotype shape immune-cell epigenomes.',
      },
      {
        title: 'Vitamin C-induced epigenetic remodelling in IDH1 mutant acute myeloid leukaemia',
        href: 'https://www.nature.com/articles/s41586-024-08167-3',
        publisher: 'Nature',
        year: '2024',
        note: 'Mechanistic evidence that metabolic intervention can reshape aberrant epigenetic states in disease.',
      },
      {
        title: 'Epigenetic Editing: State of the Art, Principles, and Perspectives',
        href: 'https://www.cell.com/cell/fulltext/S0092-8674(24)00112-4',
        publisher: 'Cell',
        year: '2024',
        note: 'Framework for precision editing of epigenetic state without rewriting DNA sequence.',
      },
      {
        title: 'Principles of chromatin-mediated cell identity and reprogramming',
        href: 'https://epigeneticsandchromatin.biomedcentral.com/articles/10.1186/s13072-025-00601-w',
        publisher: 'Epigenetics & Chromatin',
        year: '2025',
        note: 'Review on chromatin barriers, state transitions, and what governs cell identity shifts.',
      },
    ],
  },
];

export const featuredResearchArticle = researchArticles.find((article) => article.featured) ?? researchArticles[0];
