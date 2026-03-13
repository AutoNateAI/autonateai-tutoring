import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AutoNateAI | Engineering Mastery',
  tagline: 'Bridging the gap between academic theory and industrial excellence.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://AutoNateAI.github.io',
  baseUrl: '/autonateai-tutoring/',

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
