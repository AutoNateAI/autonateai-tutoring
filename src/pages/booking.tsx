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
  description: string;
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
        <p>{description}</p>
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
    title: 'Algorithm & Interview Prep',
    price: '$150 / hour',
    topics: ['Graph Traversal', 'Dynamic Programming', 'Recursion Patterns'],
    description: "Course rescue and interview readiness. We move beyond 'memorizing solutions' to building the mental models required to solve LeetCode Medium/Hard problems on the fly.",
    link: 'https://calendar.google.com/calendar/appointments/schedules/',
  },
  {
    title: 'System Design & Architecture',
    price: '$200 / hour',
    topics: ['Distributed Systems', 'Scalability', 'Trade-off Analysis'],
    description: 'Coaching for mid-to-senior transitions. Learn to reason about distributed databases, caching layers, and high-availability systems with the precision of a lead engineer.',
    link: 'https://calendar.google.com/calendar/appointments/schedules/',
  },
  {
    title: 'AI Agent Workflow Consulting',
    price: '$250 / hour',
    topics: ['Agent Orchestration', 'Autonomous Toolchains', 'Prompt Architecture'],
    description: 'For founders and builders. We debug and architect autonomous agent loops, moving from brittle AI scripts to resilient, task-oriented agentic systems.',
    link: 'https://calendar.google.com/calendar/appointments/schedules/',
  },
  {
    title: 'Custom Technical Tutoring',
    price: 'Contact for Quote',
    topics: ['OS Kernels', 'Compilers', 'Applied Cryptography', 'Etc.'],
    description: 'Deep-dive support for specialized CS topics outside our primary tracks. Tailored sessions for advanced research or unique industrial bottlenecks.',
    link: 'https://calendar.google.com/calendar/appointments/schedules/',
  },
];

export default function BookingPage(): React.JSX.Element {
  return (
    <Layout title="Book Your 1:1 Strategy Session" description="Schedule a personalized 1:1 tutoring session with Nate to accelerate your journey to mastery.">
      <main className="container padding-vert--xl">
        
        {/* Instructor Section */}
        <section className="row margin-bottom--xl" style={{ alignItems: 'center', backgroundColor: 'var(--ifm-color-emphasis-100)', borderRadius: '12px', padding: '2rem' }}>
          <div className="col col--3 text--center">
            <img 
              src="https://github.com/AutoNateAI.png" 
              alt="Nate - AutoNateAI Instructor" 
              style={{ borderRadius: '50%', width: '150px', border: '4px solid var(--ifm-color-primary)' }}
            />
          </div>
          <div className="col col--9">
            <Heading as="h2">Meet Your Instructor: Nate</Heading>
            <p style={{ fontSize: '1.1rem' }}>
              I am a former **Senior Software Consultant and Developer at Atomic Object**, where I specialized in building complex distributed systems and mentoring engineering teams.
            </p>
            <p>
              My approach to tutoring is built on **topological clarity**. I don't just help you fix bugs; I help you map the conceptual dependencies of Computer Science. Whether we're traversing a graph or architecting an AI agent loop, my goal is to spark the epiphany that turns theory into industrial-grade mastery.
            </p>
          </div>
        </section>

        <div className="text--center margin-bottom--xl">
          <Heading as="h1">1:1 Strategy Sessions</Heading>
          <p className="hero__subtitle">Select a mission track below to begin your transformation.</p>
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
