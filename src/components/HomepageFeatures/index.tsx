import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: string;
  description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Algorithm Mastery',
    Svg: 'img/career.svg',
    description: (
      <>
        We don't just solve LeetCode problems; we build the mental models for graph traversal, 
        dynamic programming, and recursion patterns that senior engineers use daily.
      </>
    ),
  },
  {
    title: 'System Architecture',
    Svg: 'img/research.svg',
    description: (
      <>
        Move from "coding" to "architecting." Learn to reason about distributed systems, 
        scalability, and database trade-offs with the precision of a lead engineer.
      </>
    ),
  },
  {
    title: 'AI Agent Orchestration',
    Svg: 'img/tutoring.svg',
    description: (
      <>
        Master the future of engineering. Architect autonomous agent loops and resilient 
        toolchains that turn brittle AI scripts into task-oriented agentic systems.
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
