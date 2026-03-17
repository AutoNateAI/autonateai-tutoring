import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

type ServiceCardProps = {
  title: string;
  price: string;
  schedule?: string;
  audience: string;
  description: React.ReactNode;
  href: string;
  ctaLabel: string;
};

const services: ServiceCardProps[] = [
  {
    title: 'AI Workflow Cohort',
    price: '$129',
    schedule: 'Monday through Thursday, 7:30 PM to 9:30 PM EST',
    audience: 'Students and professionals who want a faster path from AI confusion to structured execution.',
    description: (
      <p>
        This is the core live session. You learn how to turn ChatGPT, Google Sheets, and structured prompts into a
        personal AI system you can actually use. Maximum 25 students.
      </p>
    ),
    href: '/services/workshop',
    ctaLabel: 'View Cohort Details',
  },
  {
    title: 'Research Cohort',
    price: '$129',
    schedule: 'Monday through Thursday, 7:30 PM to 9:30 PM EST',
    audience: 'Researchers who need cleaner note systems, stronger synthesis workflows, and better research organization.',
    description: (
      <p>
        Built for research-heavy work. The same live cohort cadence, but framed around structured notes, evidence
        extraction, synthesis, and research workflows. Maximum 25 students.
      </p>
    ),
    href: '/services/researchers',
    ctaLabel: 'View Research Details',
  },
  {
    title: 'DevBox Setup',
    price: 'Discovery Call',
    audience: 'Professionals who want a cleaner AI environment, stronger tooling, and a ready-to-use setup.',
    description: (
      <p>
        This is the next-level service. We map what you need, discuss your workflow, and scope a DevBox-style
        environment that supports structured experimentation, automation, and applied AI work.
      </p>
    ),
    href: '/services/devbox-setup',
    ctaLabel: 'View DevBox Details',
  },
];

function ServiceCard({title, price, schedule, audience, description, href, ctaLabel}: ServiceCardProps) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className="card shadow--md" style={{height: '100%', background: '#0d1526', border: '1px solid rgba(37, 194, 160, 0.28)'}}>
        <div className="card__header">
          <Heading as="h3" style={{color: '#ffffff'}}>
            {title}
          </Heading>
          <div className="badge badge--secondary margin-bottom--sm" style={{fontSize: '1rem'}}>
            {price}
          </div>
          {schedule ? <p style={{color: '#cbd5e0', marginBottom: 0}}>{schedule}</p> : null}
        </div>
        <div className="card__body">
          <p style={{color: '#ffffff'}}>
            <strong>Best For:</strong> {audience}
          </p>
          <div style={{color: '#cbd5e0'}}>{description}</div>
        </div>
        <div className="card__footer">
          <Link className="button button--primary button--block" to={href}>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage(): React.JSX.Element {
  return (
    <Layout
      title="Programs and Services"
      description="Choose the support path that matches how you want to learn and apply AI: live cohorts or a DevBox setup."
      image="https://autonateai.com/img/og-booking.png">
      <main className="container padding-vert--xl">
        <section
          className="margin-bottom--xl shadow--lw"
          style={{
            backgroundColor: 'var(--ifm-color-emphasis-100)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
          <div className="row no-gutters" style={{alignItems: 'stretch'}}>
            <div className="col col--5">
              <img
                src="/img/nate-instructor.jpg"
                alt="Nate - AutoNateAI Instructor"
                style={{width: '100%', height: '100%', objectFit: 'cover', minHeight: '350px', objectPosition: 'center 20%'}}
              />
            </div>
            <div className="col col--7 padding--lg" style={{padding: '1.5rem'}}>
              <Heading as="h1" style={{fontSize: '2.2rem', marginBottom: '1rem'}}>
                Practice Daily. Learn Live. Apply Faster.
              </Heading>
              <p style={{fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem'}}>
                The thought experiments are your daily reps. The live cohorts are where you compress the learning curve.
                Every cohort runs from <span className="highlight-brand">7:30 PM to 9:30 PM EST</span>, keeps the room to
                <span className="highlight-focus"> 25 students maximum</span>, and costs
                <span className="highlight-job"> $129 for the full two hours</span>.
              </p>
              <p style={{fontSize: '0.95rem', lineHeight: '1.6', marginBottom: 0}}>
                If you want the higher-touch infrastructure path instead, the DevBox setup page is the place to start.
              </p>
            </div>
          </div>
        </section>

        <div className="text--center margin-bottom--xl">
          <Heading as="h2" style={{fontSize: '2.3rem'}}>Choose Your Next Step</Heading>
          <p className="hero__subtitle" style={{maxWidth: '780px', margin: '0.75rem auto 0', fontSize: '1.05rem'}}>
            Start with a detail page, review the fit, then use the Google booking link there when you are ready.
          </p>
        </div>

        <div className="row">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
