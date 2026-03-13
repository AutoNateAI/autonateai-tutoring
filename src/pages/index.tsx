import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import TopologicalWeb from '@site/src/components/TopologicalWeb';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Architecting Your Mastery
        </Heading>
        
        <TopologicalWeb />

        <p className="hero__subtitle">
          Bridging the gap between academic theory and industrial excellence through a topological approach to Computer Science.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg hero-button-filled hero-experiments-button"
            to="/thought-experiments/">
            View Thought Experiments 🧠
          </Link>
          <Link
            className="button button--primary button--lg margin-left--md hero-button-filled hero-booking-button"
            to="/booking">
            Book Tutoring Session
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Topological Computer Science Mastery"
      description="Bridging the gap between academic theory and industrial excellence through a topological approach to Computer Science.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
