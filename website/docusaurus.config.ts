import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'graphifychat',
  tagline: 'Portable conversation memory as a visual, usable knowledge graph.',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://soumyakantabera.github.io',
  baseUrl: '/graphifychat/',
  organizationName: 'soumyakantabera',
  projectName: 'graphifychat',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/soumyakantabera/graphifychat/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'graphifychat',
      logo: {
        alt: 'graphifychat Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/docs/usability', label: 'Usability', position: 'left'},
        {to: '/docs/example-chat-pages', label: 'Example Chats', position: 'left'},
        {
          href: 'https://github.com/soumyakantabera/graphifychat',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Overview', to: '/docs/intro'},
            {label: 'Usability', to: '/docs/usability'},
            {label: 'Example Chat Pages', to: '/docs/example-chat-pages'},
          ],
        },
        {
          title: 'Project',
          items: [{label: 'GitHub Repository', href: 'https://github.com/soumyakantabera/graphifychat'}],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} graphifychat. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
