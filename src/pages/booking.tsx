import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './index.module.css';

interface BookingCardProps {
  title: string;
  price: string;
  topics: string[];
  link: string;
  description: string | React.ReactNode;
}

const BookingCard = ({ title, price, topics, link, description }: BookingCardProps) => (
  <div className="col col--6 margin-bottom--lg booking-carousel-item">
    <div className="card shadow--md" style={{ height: '100%' }}>
      <div className="card__header">
        <Heading as="h3">{title}</Heading>
        <div className="badge badge--secondary margin-bottom--sm" style={{ fontSize: '1rem' }}>{price}</div>
      </div>
      <div className="card__body">
        <p><strong>💡 Focus:</strong> {topics.join(', ')}</p>
        <div>{description}</div>
      </div>
      <div className="card__footer">
        <a href={link} target="_blank" rel="noopener noreferrer" className="button button--primary button--block">
          Secure This Session
        </a>
      </div>
    </div>
  </div>
);

const sessions: BookingCardProps[] = [
  {
    title: 'Graph Theory & Algorithm Prep',
    price: '$150 / hour',
    topics: ['BFS/DFS', 'Shortest Path', 'Topological Sort', 'Cycle Detection'],
    description: (
      <p>
        Course rescue and interview readiness focused on <b>Graph-based problems</b>. We move beyond "memorizing solutions" to building the mental models required to solve complex traversal and connectivity challenges on the fly.
      </p>
    ),
    link: 'https://calendar.app.google/Z34RvXUL5epXJk1K8',
  },
  {
    title: 'System Design & Architecture',
    price: '$200 / hour',
    topics: ['Distributed Systems', 'Scalability', 'Trade-off Analysis'],
    description: (
      <p>
        Coaching for mid-to-senior transitions. Learn to reason about <b>distributed databases, caching layers, and high-availability systems</b> with the precision of a lead engineer.
      </p>
    ),
    link: 'https://calendar.app.google/Y1cPMxpCfj6qU3jR8',
  },
  {
    title: 'AI Agent Workflow Consulting',
    price: '$250 / hour',
    topics: ['Agent Orchestration', 'Autonomous Toolchains', 'Prompt Architecture'],
    description: (
      <p>
        For founders and builders. We debug and architect <b>autonomous agent loops</b>, moving from brittle AI scripts to resilient, task-oriented agentic systems.
      </p>
    ),
    link: 'https://calendar.app.google/n4QvyqYxGaeGc3kY7',
  },
  {
    title: 'Custom Technical Tutoring',
    price: 'Contact for Quote',
    topics: ['OS Kernels', 'Compilers', 'Applied Cryptography', 'Etc.'],
    description: (
      <p>
        Deep-dive support for <b>specialized CS topics</b> outside our primary tracks. Tailored sessions for advanced research or unique industrial bottlenecks.
      </p>
    ),
    link: 'https://calendar.app.google/fTQpDxdnJXaYE8neA',
  },
];

export default function BookingPage(): React.JSX.Element {
  return (
    <Layout 
      title="Book Your 1:1 Strategy Session" 
      description="Schedule a personalized 1:1 tutoring session with Nate to accelerate your journey to mastery."
      image="https://autonateai.com/img/og-booking.png">
      <main className="container padding-vert--xl">
        
        {/* Restored High-Impact Instructor Section - Now Scaled for Better UX */}
        <section className="margin-bottom--xl shadow--lw" style={{ backgroundColor: 'var(--ifm-color-emphasis-100)', borderRadius: '16px', overflow: 'hidden' }}>
          <div className="row no-gutters" style={{ alignItems: 'stretch' }}>
            <div className="col col--5">
              <img 
                src="/img/nate-instructor.jpg" 
                alt="Nate - AutoNateAI Instructor" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '350px', objectPosition: 'center 20%' }}
              />
            </div>
            <div className="col col--7 padding--lg" style={{ padding: '1.5rem' }}>
              <Heading as="h2" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>The Mission Behind the Mastery</Heading>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                I graduated from the <span className="highlight-brand">University of Michigan (2019)</span> with a focus on <span className="highlight-focus">Software Systems and Security</span>. My career has been a journey through the world's most sophisticated technical ecosystems, from <span className="highlight-brand">Microsoft's</span> <span className="highlight-job">Threat Protection Team</span> to <span className="highlight-brand">Citibank's</span> <span className="highlight-job">Global Infrastructure Architecture</span>.
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                As a former <span className="highlight-job">Sr. Software Consultant</span> at <span className="highlight-brand">Atomic Object</span> and <span className="highlight-job">AI Software Engineer</span> at <span className="highlight-brand">Veterans United</span>, I've spent years designing architectures that provide competitive advantages. I’ve led agentic AI projects, engineered advanced prompt-driven workflows, and mentored engineering teams at every level.
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '0' }}>
                I founded <span className="highlight-job">AutoNateAI</span> with one mission: <span className="highlight-mastery" style={{ textTransform: 'uppercase' }}>to convert more humans into deep thinkers</span>. I don't just teach you how to pass a test; I teach you how to translate mental epiphanies into industrial reality.
              </p>
            </div>
          </div>
        </section>

        <div className="text--center margin-bottom--xl" style={{ width: '100%' }}>
          <Heading as="h1" style={{ fontSize: '2.5rem', width: '100%' }}>Strategy Sessions</Heading>
          <p className="hero__subtitle" style={{ maxWidth: 'none', margin: '0.5rem auto', fontSize: '1.1rem' }}>Select a mission track below to begin your transformation from thought to mastery.</p>
        </div>

        <div className="row booking-carousel-row">
          {sessions.map((session, idx) => (
            <BookingCard key={idx} {...session} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
