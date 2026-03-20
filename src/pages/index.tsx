import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import FounderPanel from '@site/src/components/FounderPanel';
import PageSocialMeta from '@site/src/components/PageSocialMeta';

import styles from './index.module.css';

type PathCardProps = {
  title: string;
  copy: string;
  libraryLink: string;
  detailLink: string;
  detailLabel: string;
};

function PathCard({title, copy, libraryLink, detailLink, detailLabel}: PathCardProps) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div
        className="card shadow--md"
        style={{
          height: '100%',
          border: '1px solid var(--autonate-teal)',
          background: '#0d1526',
        }}>
        <div className="card__header">
          <Heading as="h3" style={{color: '#ffffff'}}>
            {title}
          </Heading>
        </div>
        <div className="card__body">
          <p style={{color: '#cbd5e0'}}>{copy}</p>
        </div>
        <div className="card__footer" style={{display: 'grid', gap: '0.75rem'}}>
          <Link className="button button--outline button--primary button--block" to={libraryLink}>
            Explore Library
          </Link>
          <Link className="button button--primary button--block" to={detailLink}>
            {detailLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const titleWords = 'AI Thought Experiments'.split(' ');

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {titleWords.map((word, idx) => (
            <span key={idx} className="slam-word" style={{animationDelay: `${idx * 0.38}s`}}>
              {word}
            </span>
          ))}
        </Heading>

        <div className="margin-top--lg hero-media-stack">
          <div className="hero-video-shell hero-content-fade-in">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/img/og-homepage.png"
              className="hero-demo-video">
              <source src="/video/autonateai-portal-promo.mp4" type="video/mp4" />
            </video>
          </div>

          <div
            className={clsx('buttons', styles.buttons, 'hero-content-fade-in')}
            style={{justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap'}}>
            <Link
              className="button button--secondary button--lg hero-button-filled hero-experiments-button"
              to="/thought-experiments/">
              Explore Thought Experiments
            </Link>
            <Link
              className="button button--primary button--lg hero-button-filled hero-booking-button"
              to="/booking">
              View Services
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        .hero-media-stack {
          display: grid;
          gap: 1.5rem;
          justify-items: center;
        }
        .hero-video-shell {
          border: 1px solid rgba(37, 194, 160, 0.28);
          border-radius: 24px;
          overflow: hidden;
          background: #081121;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
          width: min(100%, 960px);
        }
        .hero-demo-video {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          background: #081121;
        }
        .hero-content-fade-in {
          opacity: 0;
          animation: scaleIn 0.8s ease-out forwards;
          animation-delay: 2.3s;
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
        .hero-experiments-button, .hero-booking-button {
          animation: none !important;
          opacity: 1 !important;
        }
      `}</style>
    </header>
  );
}

function PracticeLoop() {
  return (
    <section className="padding-vert--xl" style={{backgroundColor: '#07101f'}}>
      <div className="container">
        <div className="row">
          <div className="col col--5 margin-bottom--lg">
            <Heading as="h2" style={{color: '#ffffff', marginBottom: '1rem'}}>
              The Practice Loop
            </Heading>
            <p style={{color: '#d0dae9', fontSize: '1.05rem', lineHeight: '1.7'}}>
              The thought experiments are the daily reps. The live cohort is the shortcut. You practice the ideas in an
              edutaining way every day, then jump into a guided session when you want the systems, prompts, and workflow
              structure to click faster.
            </p>
          </div>
          <div className="col col--7">
            <div className="row">
              <div className="col col--4 margin-bottom--md">
                <div className="card shadow--sm" style={{height: '100%', background: '#0d1526', border: '1px solid rgba(255,255,255,0.08)'}}>
                  <div className="card__body">
                    <Heading as="h3" style={{color: '#ffffff', fontSize: '1.1rem'}}>1. Explore</Heading>
                    <p style={{color: '#cbd5e0', marginBottom: 0}}>Use the daily thought experiments to build pattern recognition and systems intuition.</p>
                  </div>
                </div>
              </div>
              <div className="col col--4 margin-bottom--md">
                <div className="card shadow--sm" style={{height: '100%', background: '#0d1526', border: '1px solid rgba(255,255,255,0.08)'}}>
                  <div className="card__body">
                    <Heading as="h3" style={{color: '#ffffff', fontSize: '1.1rem'}}>2. Accelerate</Heading>
                    <p style={{color: '#cbd5e0', marginBottom: 0}}>Use a premium async course to build your AI system faster with narrated instruction, workflow kits, and a clear structure.</p>
                  </div>
                </div>
              </div>
              <div className="col col--4 margin-bottom--md">
                <div className="card shadow--sm" style={{height: '100%', background: '#0d1526', border: '1px solid rgba(255,255,255,0.08)'}}>
                  <div className="card__body">
                    <Heading as="h3" style={{color: '#ffffff', fontSize: '1.1rem'}}>3. Apply</Heading>
                    <p style={{color: '#cbd5e0', marginBottom: 0}}>Turn the practice into better notes, stronger research systems, or a working AI environment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AudiencePaths() {
  return (
    <section className="padding-vert--xl" style={{backgroundColor: '#050a1a'}}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" style={{color: '#ffffff', marginBottom: '0.75rem'}}>
            Choose Your Path
          </Heading>
          <p style={{color: '#d0dae9', maxWidth: '760px', margin: '0 auto'}}>
            Start in the library that matches your current role, then use the service page for the level of support you want.
          </p>
        </div>
        <div className="row">
          <PathCard
            title="Students"
            copy="Use the daily thought experiments to practice graph thinking, structured workflows, and practical AI execution. Move into the AI-First Student course when you want the full system."
            libraryLink="/thought-experiments/students/"
            detailLink="/services/ai-first-student"
            detailLabel="Student Course Details"
          />
          <PathCard
            title="Researchers"
            copy="Build cleaner synthesis workflows, organize ideas into systems, and move from scattered notes to repeatable research infrastructure."
            libraryLink="/thought-experiments/researchers/"
            detailLink="/services/ai-first-researcher"
            detailLabel="Research Course Details"
          />
          <PathCard
            title="Professionals"
            copy="Apply AI in real work, then move into a DevBox setup when you want a cleaner environment for structured experimentation and execution."
            libraryLink="/thought-experiments/professionals/"
            detailLink="/services/devbox-setup"
            detailLabel="DevBox Setup Details"
          />
        </div>
      </div>
    </section>
  );
}

function PricingAndSchedule() {
  return (
    <section className="padding-vert--xl" style={{backgroundColor: '#07101f'}}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" style={{color: '#ffffff', marginBottom: '0.75rem'}}>
            Pricing And Schedule
          </Heading>
          <p style={{color: '#d0dae9', maxWidth: '740px', margin: '0 auto'}}>
            Clear timing. Clear pricing. Pick the path that matches how fast you want the system to click.
          </p>
        </div>
        <div className="row">
          <div className="col col--4 margin-bottom--md">
            <Link to="/services/ai-first-student" style={{display: 'block', height: '100%', textDecoration: 'none'}}>
              <div className="card shadow--sm" style={{height: '100%', background: '#0d1526', border: '1px solid rgba(255,255,255,0.08)'}}>
                <div className="card__body">
                  <Heading as="h3" style={{color: '#ffffff', fontSize: '1.2rem'}}>AI-First Student</Heading>
                  <p style={{color: '#cbd5e0', marginBottom: '0.6rem'}}>Premium async course</p>
                  <p style={{color: '#ffffff', fontWeight: 800, marginBottom: '0.6rem'}}>Narrated lecture deck + workflow kits</p>
                  <p style={{color: '#cbd5e0', marginBottom: '0.35rem'}}>6 sheet workflows and guided prompt packs</p>
                  <p style={{color: '#25c2a0', fontWeight: 800, marginBottom: '0.75rem'}}>$129 one-time purchase</p>
                  <p style={{color: '#8cd9c8', fontWeight: 700, marginBottom: 0}}>View details →</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col col--4 margin-bottom--md">
            <Link to="/services/ai-first-researcher" style={{display: 'block', height: '100%', textDecoration: 'none'}}>
              <div className="card shadow--sm" style={{height: '100%', background: '#0d1526', border: '1px solid rgba(255,255,255,0.08)'}}>
                <div className="card__body">
                  <Heading as="h3" style={{color: '#ffffff', fontSize: '1.2rem'}}>AI-First Researcher</Heading>
                  <p style={{color: '#cbd5e0', marginBottom: '0.6rem'}}>Premium async course</p>
                  <p style={{color: '#ffffff', fontWeight: 800, marginBottom: '0.6rem'}}>Narrated lecture deck + research kits</p>
                  <p style={{color: '#cbd5e0', marginBottom: '0.35rem'}}>6 research workflows and guided prompt packs</p>
                  <p style={{color: '#25c2a0', fontWeight: 800, marginBottom: '0.75rem'}}>$189 one-time purchase</p>
                  <p style={{color: '#8cd9c8', fontWeight: 700, marginBottom: 0}}>View details →</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col col--4 margin-bottom--md">
            <Link to="/services/devbox-setup" style={{display: 'block', height: '100%', textDecoration: 'none'}}>
              <div className="card shadow--sm" style={{height: '100%', background: '#0d1526', border: '1px solid rgba(255,255,255,0.08)'}}>
                <div className="card__body">
                  <Heading as="h3" style={{color: '#ffffff', fontSize: '1.2rem'}}>DevBox Setup</Heading>
                  <p style={{color: '#cbd5e0', marginBottom: '0.6rem'}}>Discovery-first service</p>
                  <p style={{color: '#ffffff', fontWeight: 800, marginBottom: '0.6rem'}}>Scoped around your workflow</p>
                  <p style={{color: '#cbd5e0', marginBottom: '0.35rem'}}>Higher-touch environment planning</p>
                  <p style={{color: '#25c2a0', fontWeight: 800, marginBottom: '0.75rem'}}>Starts with a discovery call</p>
                  <p style={{color: '#8cd9c8', fontWeight: 700, marginBottom: 0}}>View details →</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const title = 'Daily AI Thought Experiments | Learn AI Faster';
  const description =
    'Practice with daily AI thought experiments, then upgrade into AI-First Student, AI-First Researcher, or a DevBox path to build usable AI systems faster.';

  return (
    <Layout
      title={title}
      description={description}
      image="https://autonateai.com/img/og-homepage.png">
      <PageSocialMeta
        title={`${title} | AutoNateAI | Daily AI Thought Experiments`}
        description={description}
        image="/img/og-homepage.png"
        path="/"
      />
      <HomepageHeader />
      <main>
        <PracticeLoop />
        <AudiencePaths />
        <PricingAndSchedule />
        <section className="padding-bottom--xl" style={{backgroundColor: '#07101f'}}>
          <div className="container">
            <FounderPanel />
          </div>
        </section>
      </main>
    </Layout>
  );
}
