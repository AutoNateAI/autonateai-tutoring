import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AutoNateAI | Daily AI Thought Experiments',
  tagline: 'Daily AI thought experiments, premium async courses, and practical systems for students, researchers, and professionals.',
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
  customFields: {
    squareAppId: process.env.SQUARE_APP_ID ?? 'sandbox-sq0idb-B5DpjemGsulORCrDXW80lQ',
    squareLocationId: process.env.SQUARE_LOCATION_ID ?? 'L24Y6AS4SSFG2',
    squareEnvironment: process.env.SQUARE_ENVIRONMENT ?? 'sandbox',
    checkoutApiBaseUrl:
      process.env.CHECKOUT_API_BASE_URL ?? 'https://us-central1-autonateai-learning-hub.cloudfunctions.net',
    portalBaseUrl: process.env.PORTAL_BASE_URL ?? 'https://workshop.autonateai.com',
  },

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
    // Default Social Card (Fallback)
    image: 'img/og-homepage.png',
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
          to: '/thought-experiments/',
          label: 'AI Library',
          position: 'left',
        },
        {
          to: '/booking', 
          label: 'Programs', 
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
              label: 'AI Library',
              to: '/thought-experiments/',
            },
          ],
        },
        {
          title: 'Tutoring',
          items: [
            {
              label: 'Programs',
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
