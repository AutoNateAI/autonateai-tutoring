import React, {useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import HeroPromoVideo from '@site/src/components/HeroPromoVideo';
import {featuredResearchArticle, researchArticles} from '@site/src/data/researchArticles';
import styles from '@site/src/components/research/research.module.css';

const pageSize = 9;

const overviewSignals = [
  'Epigenetics is the study of how the same genome gets performed differently across contexts, cell types, and pressures.',
  'Van Andel Institute is one of the clearest institutional signals in this lane because it treats epigenetics as both a basic-science and translational problem.',
  'This hub is where I build my nodes in public, tighten the reasoning, and connect the research directly back to human reconstruction and deliberate reprogramming.',
];

const stats = [
  {
    value: '104k',
    label: 'single nuclei',
    note: 'Profiled in a 2025 Nature Genetics immune-cell epigenome study.',
  },
  {
    value: '5–19%',
    label: 'methylation heritability',
    note: 'Estimated in prior bulk-tissue work cited by that same 2025 study.',
  },
  {
    value: '2014',
    label: 'Dream Team reset',
    note: 'Year VAI’s current SU2C Epigenetics Dream Team was established.',
  },
];

export default function ResearchPage(): React.JSX.Element {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(researchArticles.length / pageSize));
  const pageItems = useMemo(() => researchArticles.slice((page - 1) * pageSize, page * pageSize), [page]);

  return (
    <Layout
      title="Research | AutoNateAI"
      description="A public research hub for epigenetics, reconstruction, and multidisciplinary inquiry built in the same visual language as AutoNateAI.">
      <PageSocialMeta
        title="Research | AutoNateAI"
        description="A public research hub for epigenetics, reconstruction, and multidisciplinary inquiry."
        image="/img/og-research.png"
        path="/research"
      />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Research</span>
            <Heading as="h1" className={styles.heroTitle}>
              Building the epigenetics map in public.
            </Heading>
            <p className={styles.heroShift}>Calm hands. Sharp sources. Smooth pressure on the ideas until they confess.</p>
            <p className={styles.heroBody}>
              This tab is where I track the research nodes, clean them up for publishing, and connect them to the
              publications shaping how I think about reconstruction, regulation, and deliberate reprogramming. Van Andel
              Institute is a major signal in this lane, especially where epigenetics moves from abstraction into systems
              that can actually change outcomes.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="#featured-article">
                Read Featured Node
              </a>
              <a className={styles.secondaryCta} href="#article-grid">
                Browse Research Nodes
              </a>
            </div>
          </div>
          <div className={`${styles.heroImageFrame} ${styles.heroVideoFrame}`}>
            <HeroPromoVideo
              src="/video/autonateai-research-promo.mp4"
              poster="/img/og-research.png"
              className={styles.heroPromoVideo}
              soundLabel="Tap For Sound"
              fullscreenLabel="Full Screen Research Promo"
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Overview</span>
              <Heading as="h2" className={styles.sectionTitle}>
                What this tab is really for
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              Not a random article dump. A living graph of thought, sources, and nodes that can later connect into the
              larger AutoNateAI thesis.
            </p>
          </div>
          <div className={styles.overviewPanel}>
            <div className={styles.overviewGrid}>
              <ul className={styles.signalList}>
                {overviewSignals.map((item) => (
                  <li key={item}>
                    <span className={styles.check}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.statsGrid}>
                {stats.map((stat) => (
                  <article key={stat.label} className={styles.statCard}>
                    <div className={styles.statValue}>{stat.value}</div>
                    <span className={styles.statLabel}>{stat.label}</span>
                    <p className={styles.statNote}>{stat.note}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="featured-article" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Featured Article</span>
              <Heading as="h2" className={styles.sectionTitle}>
                The lead node right now
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              This is the first full expression of the research brand: sources, narrative, data, and a clean argument.
            </p>
          </div>
          <div className={styles.featuredPanel}>
            <div className={styles.featuredGrid}>
              <div className={styles.heroCopy}>
                <div className={styles.featuredMeta}>
                  <span>{featuredResearchArticle.category}</span>
                  <span>{featuredResearchArticle.dateLabel}</span>
                  <span>{featuredResearchArticle.readTime}</span>
                </div>
                <h2 className={styles.featuredTitle}>{featuredResearchArticle.title}</h2>
                <p className={styles.heroBody}>{featuredResearchArticle.description}</p>
                <div className={styles.heroActions}>
                  <Link className={styles.primaryCta} to={`/research/${featuredResearchArticle.slug}`}>
                    Open Article
                  </Link>
                </div>
              </div>
              <div className={styles.featuredImageFrame}>
                <img src={featuredResearchArticle.image} alt={featuredResearchArticle.imageAlt} />
              </div>
            </div>
          </div>
        </section>

        <section id="article-grid" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Research Nodes</span>
              <Heading as="h2" className={styles.sectionTitle}>
                9 articles per page, clean enough to scale
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              Each article is a node in the graph: cleaned up enough to publish, heavy on evidence, and ready to
              interlink with stronger sources over time.
            </p>
          </div>
          <div className={styles.paginationPanel}>
            <div className={styles.cardsGrid}>
              {pageItems.map((article) => (
                <article key={article.slug} className={styles.articleCard}>
                  <div className={styles.cardImageFrame}>
                    <img src={article.image} alt={article.imageAlt} />
                  </div>
                  <div className={styles.cardMeta}>
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                    <span>{article.status}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  <p className={styles.cardCopy}>{article.description}</p>
                  <Link className={styles.primaryCta} to={`/research/${article.slug}`}>
                    Read Node
                  </Link>
                </article>
              ))}
            </div>
            <div className={styles.paginationRow}>
              <div className={styles.pageIndicator}>
                Page {page} of {pageCount}
              </div>
              <div className={styles.paginationControls}>
                <button className={styles.pagerButton} disabled={page === 1} onClick={() => setPage((value) => value - 1)}>
                  Prev
                </button>
                <button
                  className={styles.pagerButton}
                  disabled={page === pageCount}
                  onClick={() => setPage((value) => value + 1)}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
