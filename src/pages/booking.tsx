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
  <div className="col col--6 margin-bottom--lg">
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
    link: 'https://calendar.google.com/calendar/appointments/schedules/',
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
    link: 'https://calendar.google.com/calendar/appointments/schedules/',
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
    link: 'https://calendar.google.com/calendar/appointments/schedules/',
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
    link: 'https://calendar.google.com/calendar/appointments/schedules/',
  },
];

export default function BookingPage(): React.JSX.Element {
  return (
    <Layout title="Book Your 1:1 Strategy Session" description="Schedule a personalized 1:1 tutoring session with Nate to accelerate your journey to mastery.">
      <main className="container padding-vert--xl">
        
        {/* Responsive Instructor Section */}
        <section className="margin-bottom--xl shadow--lw" style={{ backgroundColor: 'var(--ifm-color-emphasis-100)', borderRadius: '16px', overflow: 'hidden' }}>
          <div className="row no-gutters" style={{ alignItems: 'stretch' }}>
            <div className="col col--5">
              <img 
                src="/img/nate-instructor.jpg" 
                alt="Nate - AutoNateAI Instructor" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }}
              />
            </div>
            <div className="col col--7 padding--xl">
              <Heading as="h2" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The Mission Behind the Mastery</Heading>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                I graduated from the <b>University of Michigan (2019)</b> with a focus on <b>Software Systems and Security</b>. My career has been a journey through the world's most sophisticated technical ecosystems, from <b>Microsoft's Threat Protection Team</b> to <b>Citibank's</b> global infrastructure.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                As a former <b>Senior Software Consultant at Atomic Object</b> and <b>AI Software Engineer at Veterans United</b>, I've spent years designing architectures that provide competitive advantages. I’ve led agentic AI projects, engineered advanced prompt-driven workflows, and mentored engineering teams at every level.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '0' }}>
                I founded <b>AutoNateAI</b> with one mission: <b>to convert more humans into deep thinkers</b>. I don't just teach you how to pass a test; I teach you how to translate mental epiphanies into industrial reality.
              </p>
            </div>
          </div>
        </section>

        <div className="text--center margin-bottom--xl">
          <Heading as="h1" style={{ fontSize: '3.5rem' }}>1:1 Strategy Sessions</Heading>
          <p className="hero__subtitle">Select a mission track below to begin your transformation from thought to mastery.</p>
        </div>

        <div className="row">
          {sessions.map((session, idx) => (
            <BookingCard key={idx} {...session} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
