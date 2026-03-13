import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: string; // Changed to string for direct path
  description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Topological Journey',
    Svg: 'img/career.svg',
    description: (
      <>
        Visualize Computer Science not as a list of courses, but as a dense graph of interconnected 
        concepts. Navigate the shortest path to high-signal mastery.
      </>
    ),
  },
  {
    title: 'Research-Driven Logic',
    Svg: 'img/research.svg',
    description: (
      <>
        Our Thought Experiments translate the latest CS research into actionable coding challenges. 
        Solve today's industrial problems with academic precision.
      </>
    ),
  },
  {
    title: 'Personalized Architecting',
    Svg: 'img/tutoring.svg',
    description: (
      <>
        Scale your intuition through 1:1 sessions. We don't just review code; we architect 
        the mental models required for senior-level engineering.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={Svg} className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
