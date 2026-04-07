export type ResearchSource = {
  title: string;
  href: string;
  publisher: string;
  year: string;
  note: string;
};

export type ResearchArticle = {
  slug: string;
  title: string;
  description: string;
  dateLabel: string;
  readTime: string;
  category: string;
  status: 'Published';
  featured: boolean;
  image: string;
  socialImage?: string;
  imageAlt: string;
  kicker: string;
  quote: string;
  sources: ResearchSource[];
};
