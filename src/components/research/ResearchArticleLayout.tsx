import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import type {ResearchArticle} from './ResearchTypes';
import styles from './research.module.css';

export default function ResearchArticleLayout({
  article,
  children,
}: {
  article: ResearchArticle;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <Layout title={`${article.title} | AutoNateAI Research`} description={article.description} wrapperClassName={styles.layout}>
      <PageSocialMeta
        title={`${article.title} | AutoNateAI Research`}
        description={article.description}
        image={article.socialImage ?? article.image}
        path={`/research/${article.slug}`}
      />
      <main className={styles.shell}>
        <section className={styles.articleHero}>
          <div className={styles.articleCopy}>
            <Link className={styles.backLink} to="/research">
              ← Back to research
            </Link>
            <span className={styles.kicker}>{article.kicker}</span>
            <Heading as="h1" className={styles.articleTitle}>
              {article.title}
            </Heading>
            <p className={styles.articleDek}>{article.description}</p>
            <div className={styles.metaRow}>
              <span>{article.dateLabel}</span>
              <span>{article.readTime}</span>
              <span>{article.category}</span>
            </div>
            <blockquote className={styles.heroQuote}>{article.quote}</blockquote>
          </div>
          <div className={styles.heroImageFrame}>
            <img src={article.image} alt={article.imageAlt} />
          </div>
        </section>

        <section className={styles.articleGrid}>
          <article className={styles.articleBody}>{children}</article>
          <aside className={styles.articleAside}>
            <div className={styles.asideCard}>
              <div className={styles.asideKicker}>Source Rail</div>
              <h2 className={styles.asideTitle}>Primary sources driving this node</h2>
              <div className={styles.sourceList}>
                {article.sources.map((source) => (
                  <a key={source.href} className={styles.sourceCard} href={source.href} target="_blank" rel="noreferrer">
                    <strong>{source.title}</strong>
                    <span>
                      {source.publisher} · {source.year}
                    </span>
                    <p>{source.note}</p>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </Layout>
  );
}
