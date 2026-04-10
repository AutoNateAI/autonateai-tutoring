import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AutoNateAI | Student Transformation',
  tagline: 'AI-powered student infrastructure for planning, studying, and execution.',
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
    squareAppId: process.env.SQUARE_APP_ID ?? 'sq0idp-8YnJcv21akd2ZQdBUoFlCA',
    squareLocationId: process.env.SQUARE_LOCATION_ID ?? 'L8XW7N5BD0HSH',
    squareEnvironment: process.env.SQUARE_ENVIRONMENT ?? 'production',
    checkoutApiBaseUrl:
      process.env.CHECKOUT_API_BASE_URL ??
      'https://createsquarecoursepayment-4qinfaeidq-uc.a.run.app',
    portalBaseUrl: process.env.PORTAL_BASE_URL ?? 'https://portal.autonateai.com',
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
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'AutoNateAI',
      items: [
        {
          to: '/programs',
          label: 'Programs',
          position: 'right',
        },
        {
          to: '/workshop',
          label: 'Workshop',
          position: 'right',
        },
        {
          to: '/research',
          label: 'Research',
          position: 'right',
        },
        {
          to: '/services/ai-first-student',
          label: 'Book Coaching',
          position: 'right',
          className: 'button button--primary margin-left--md nav-booking-button',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Offers',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Book Coaching',
              to: '/services/ai-first-student',
            },
            {
              label: 'Programs',
              to: '/programs',
            },
            {
              label: 'Workshop',
              to: '/workshop',
            },
            {
              label: 'Research',
              to: '/research',
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
