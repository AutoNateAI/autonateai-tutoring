import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './index.module.css';

interface BookingCardProps {
  title: string;
  time: string;
  location: string;
  topics: string[];
  link: string;
  description: string;
}

const BookingCard = ({ title, time, location, topics, link, description }: BookingCardProps) => (
  <div className="col col--4 margin-bottom--lg">
    <div className="card shadow--md">
      <div className="card__header">
        <Heading as="h3">{title}</Heading>
      </div>
      <div className="card__body">
        <p><strong>🕒 Time:</strong> {time}</p>
        <p><strong>📍 Location:</strong> {location}</p>
        <p><strong>💡 Topics:</strong> {topics.join(', ')}</p>
        <p>{description}</p>
      </div>
      <div className="card__footer">
        <a href={link} target="_blank" rel="noopener noreferrer" className="button button--primary button--block">
          Book This Session
        </a>
      </div>
    </div>
  </div>
);

const sessions: BookingCardProps[] = [
  {
    title: 'Core CS Mastery',
    time: 'Mon - Fri | 4:00 PM - 6:00 PM',
    location: 'Virtual / Google Meet',
    topics: ['Data Structures', 'Algorithms', 'Discrete Math'],
    description: "Deep dive into the foundations. We'll solve complex problems from first principles.",
    link: 'https://calendar.google.com/calendar/appointments/schedules/',
  },
  {
    title: 'Advanced System Design',
    time: 'Tue & Thu | 7:00 PM - 8:30 PM',
    location: 'Virtual / Google Meet',
    topics: ['Distributed Systems', 'Scalability', 'Databases'],
    description: 'Learn how to architect systems that scale to millions of users.',
    link: 'https://calendar.google.com/calendar/appointments/schedules/',
  },
  {
    title: 'Mock Interviews & Code Review',
    time: 'Saturdays | 10:00 AM - 2:00 PM',
    location: 'Virtual / Google Meet',
    topics: ['Technical Interviewing', 'Clean Code', 'Refactoring'],
    description: 'Get real-world feedback on your coding style and interview performance.',
    link: 'https://calendar.google.com/calendar/appointments/schedules/',
  },
];

export default function BookingPage(): React.JSX.Element {
  return (
    <Layout title="Book Your 1:1 Strategy Session" description="Schedule a personalized 1:1 tutoring session with Nate to accelerate your journey to mastery.">
      <main className="container padding-vert--xl">
        <div className="text--center margin-bottom--xl">
          <Heading as="h1">Personalized 1:1 Tutoring</Heading>
          <p className="hero__subtitle">Select a session below to accelerate your journey to mastery.</p>
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
