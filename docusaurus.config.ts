import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AutoNateAI | Engineering Mastery',
  tagline: 'Bridging the gap between academic theory and industrial excellence through topological CS mastery.',
  favicon: 'img/logo.svg',

  future: {
    v4: true,
  },

  url: 'https://autonateai.com',
  baseUrl: '/',

  organizationName: 'AutoNateAI',
  projectName: 'autonateai-tutoring',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'thought-experiments',
          routeBasePath: 'thought-experiments',
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Open Graph / SEO Metadata
    image: 'img/social-card.png',
    metadata: [
      {name: 'title', content: 'AutoNateAI | Engineering Mastery'},
      {name: 'description', content: 'Master the topology of Computer Science. Research-driven thought experiments and personalized 1:1 strategy sessions to bridge academic theory and industrial excellence.'},
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: 'AutoNateAI | Engineering Mastery'},
      {property: 'og:description', content: 'Master the topology of Computer Science through research-driven thought experiments.'},
      {property: 'og:image', content: 'https://autonateai.com/img/social-card.png'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'AutoNateAI | Engineering Mastery'},
      {name: 'twitter:description', content: 'Bridge the gap between academic theory and industrial excellence.'},
      {name: 'twitter:image', content: 'https://autonateai.com/img/social-card.png'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'AutoNateAI',
      logo: {
        alt: 'AutoNateAI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Thought Experiments',
        },
        {
          to: '/booking', 
          label: 'Book Tutoring Session', 
          position: 'left',
          className: 'button button--primary margin-left--md nav-booking-button',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Explore',
          items: [
            {
              label: 'Thought Experiments',
              to: '/thought-experiments/',
            },
          ],
        },
        {
          title: 'Tutoring',
          items: [
            {
              label: 'Book a Session',
              to: '/booking',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AutoNateAI.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
