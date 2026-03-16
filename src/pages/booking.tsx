import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './index.module.css';

interface BookingCardProps {
  id: string;
  title: string;
  price: string;
  topics: string[];
  link: string;
  description: string | React.ReactNode;
}

const BookingCard = ({ id, title, price, topics, link, description }: BookingCardProps) => (
  <div className="col col--6 margin-bottom--lg booking-carousel-item" id={id} style={{ scrollMarginTop: '100px' }}>
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
          Reserve Your Spot
        </a>
      </div>
    </div>
  </div>
);

const sessions: BookingCardProps[] = [
  {
    id: 'student-workshop',
    title: 'Graph & System Design Workshop',
    price: '$129 / Session',
    topics: ['BFS/DFS', 'Topological Sort', 'Cycle Detection', 'Architecture'],
    description: (
      <p>
        A high-stakes intensive for <b>Students</b>. Master the mental models required to solve complex traversal and connectivity challenges while learning to reason about distributed architecture like a lead engineer.
      </p>
    ),
    link: 'https://calendar.app.google/Z34RvXUL5epXJk1K8',
  },
  {
    id: 'researcher-workshop',
    title: 'Research & Knowledge Orchestration Workshop',
    price: '$200 / Session',
    topics: ['Data Extraction', 'Synthesis Matrices', 'Literature Mapping', 'AI Agents'],
    description: (
      <p>
        For <b>Researchers</b> and advanced students. We build agentic workflows to ingest papers, extract structured insights into Sheets, and visualize the topology of your research domain.
      </p>
    ),
    link: 'https://calendar.app.google/LTN9pu8uPV7Qwbmd7',
  },
  {
    id: 'business-consult',
    title: 'Business Systems Strategy Consult',
    price: 'Discovery Call',
    topics: ['Inventory Systems', 'Sales Dashboards', 'Operational Automation', 'AI + Sheets'],
    description: (
      <p>
        For <b>Local Shops and Small Businesses</b>. A 1:1 strategy session to discuss how we can eliminate your operational headaches by turning your messy data into a real-time AI command center.
      </p>
    ),
    link: 'https://calendar.app.google/fTQpDxdnJXaYE8neA',
  },
  {
    id: 'custom-build',
    title: 'Custom Intelligence Systems',
    price: 'Discovery Call',
    topics: ['Industrial Automation', 'Custom Workflows', 'Agentic Toolchains', 'Scale'],
    description: (
      <p>
        For <b>Enterprises and Specialized Industries</b>. We architect custom AI-powered pipelines and automation toolchains tailored to your unique industrial or unique technical bottlenecks.
      </p>
    ),
    link: 'https://calendar.app.google/fTQpDxdnJXaYE8neA',
  },
];

export default function BookingPage(): React.JSX.Element {
  return (
    <Layout 
      title="Workshops and Services" 
      description="Book a specialized workshop or a business systems consult to accelerate your journey to mastery."
      image="https://autonateai.com/img/og-booking.png">
      <main className="container padding-vert--xl">
        
        {/* Instructor Section */}
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
          <Heading as="h1" style={{ fontSize: '2.5rem', width: '100%' }}>Workshops & Services</Heading>
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
