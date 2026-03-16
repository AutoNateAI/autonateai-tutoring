import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import TopologicalWeb from '@site/src/components/TopologicalWeb';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const titleWords = "Interactive Thinking Quests".split(" ");

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {titleWords.map((word, idx) => (
            <span 
              key={idx} 
              className="slam-word" 
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              {word}
            </span>
          ))}
        </Heading>
        
        <div className="row row--align-center margin-top--lg hero-row-desktop">
          <div className="col col--7">
            <div className="hero-svg-wrapper bigger-svg">
              <TopologicalWeb />
            </div>
          </div>
          <div className="col col--5 text--left">
            <div className="hero-content-fade-in">
              <p className="hero__subtitle" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
                Bridging the gap between academic theory and <span className="hero-highlight-gold">Industrial Excellence</span>. We provide high-stakes workshops for students and researchers, and <span className="hero-highlight-gold">Applied Intelligence Systems</span> for local businesses to automate data management and eliminate operational headaches.
              </p>
              
              <div className={clsx('buttons', styles.buttons)} style={{ justifyContent: 'flex-start' }}>
                <Link
                  className="button button--secondary button--lg hero-button-filled hero-experiments-button"
                  to="/thought-experiments/">
                  Commence Mission 🧠
                </Link>
                <Link
                  className="button button--primary button--lg margin-left--md hero-button-filled hero-booking-button"
                  to="/booking">
                  Workshops & Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .hero-row-desktop {
          display: flex;
          flex-direction: column;
        }
        .bigger-svg {
          transform: scale(1.2);
          margin-bottom: 2rem;
        }
        .hero-content-fade-in {
          opacity: 0;
          animation: scaleIn 0.8s ease-out forwards;
          animation-delay: 2.6s; /* Starts right after the SVG finishes animating */
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-content-fade-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
        @media (min-width: 997px) {
          .hero-row-desktop {
            flex-direction: row;
          }
          .bigger-svg {
            transform: scale(1.5);
            margin-bottom: 0;
          }
        }
        /* Override existing subtitle/button animations to sync them */
        .hero__subtitle, .hero-experiments-button, .hero-booking-button {
          animation: none !important;
          opacity: 1 !important;
        }
      `}</style>
    </header>
  );
}

function TargetSections() {
  return (
    <section className="padding-vert--xl" style={{ backgroundColor: '#050a1a' }}>
      <div className="container">
        <div className="row">
          {/* For Students */}
          <div className="col col--3 margin-bottom--lg">
            <div className="card shadow--md" style={{ height: '100%', border: '1px solid var(--autonate-teal)', background: '#0d1526' }}>
              <div className="card__header">
                <Heading as="h3" style={{ color: '#ffffff' }}>For Students</Heading>
              </div>
              <div className="card__body">
                <p style={{ color: '#cbd5e0' }}>Master the underlying <b>Topology of Success</b>. Our interactive thinking quests transform textbook patterns into cinematic missions, preparing you for the next generation of software engineering.</p>
              </div>
              <div className="card__footer">
                <Link className="button button--outline button--primary button--block" to="/booking#student-workshop">View Workshops</Link>
              </div>
            </div>
          </div>
          
          {/* For Researchers */}
          <div className="col col--3 margin-bottom--lg">
            <div className="card shadow--md" style={{ height: '100%', border: '1px solid var(--autonate-teal)', background: '#0d1526' }}>
              <div className="card__header">
                <Heading as="h3" style={{ color: '#ffffff' }}>For Researchers</Heading>
              </div>
              <div className="card__body">
                <p style={{ color: '#cbd5e0' }}>Orchestrate your knowledge. We build autonomous agent loops that ingest, synthesize, and map complex research domains, turning months of literature review into real-time insight.</p>
              </div>
              <div className="card__footer">
                <Link className="button button--outline button--primary button--block" to="/booking#researcher-workshop">Join Workshop</Link>
              </div>
            </div>
          </div>

          {/* For Local Businesses */}
          <div className="col col--3 margin-bottom--lg">
            <div className="card shadow--md" style={{ height: '100%', border: '1px solid var(--autonate-teal)', background: '#0d1526' }}>
              <div className="card__header">
                <Heading as="h3" style={{ color: '#ffffff' }}>For Local Shops</Heading>
              </div>
              <div className="card__body">
                <p style={{ color: '#cbd5e0' }}>Eliminate your operational debt. We turn your "spreadsheet hell" into a <b>Small Business Command Center</b>, connecting AI to your inventory and sales for effortless management.</p>
              </div>
              <div className="card__footer">
                <Link className="button button--outline button--primary button--block" to="/booking#business-consult">Book Consult</Link>
              </div>
            </div>
          </div>

          {/* For Custom Builds */}
          <div className="col col--3 margin-bottom--lg">
            <div className="card shadow--md" style={{ height: '100%', border: '1px solid var(--autonate-teal)', background: '#0d1526' }}>
              <div className="card__header">
                <Heading as="h3" style={{ color: '#ffffff' }}>Custom Builds</Heading>
              </div>
              <div className="card__body">
                <p style={{ color: '#cbd5e0' }}>Architecting for scale. We design custom AI-powered toolchains and industrial automation pipelines for enterprises facing unique technical bottlenecks.</p>
              </div>
              <div className="card__footer">
                <Link className="button button--outline button--primary button--block" to="/booking#custom-build">Request Build</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Interactive Thinking Quests | Applied Intelligence"
      description="Bridging the gap between academic theory and industrial excellence through topological mastery and AI-powered systems."
      image="https://autonateai.com/img/og-homepage.png">
      <HomepageHeader />
      <main>
        <TargetSections />
      </main>
    </Layout>
  );
}
