import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type Tile = {
  title: string;
  description: string;
  to: string;
  icon: ReactNode;
};

const tiles: Tile[] = [
  {
    title: 'Usability-first design',
    description:
      'Clear navigation, lightweight pages, and predictable structure so users find what they need in one click.',
    to: '/docs/usability',
    icon: (
      <svg viewBox="0 0 48 48" className={styles.tileIcon} aria-hidden="true">
        <rect x="8" y="8" width="32" height="32" rx="8" />
        <circle cx="18" cy="20" r="3" />
        <rect x="24" y="18" width="12" height="4" rx="2" />
        <rect x="14" y="28" width="22" height="4" rx="2" />
      </svg>
    ),
  },
  {
    title: 'Example chat pages',
    description:
      'Showcase coding, research, and creative chat flows so teams can copy patterns and accelerate onboarding.',
    to: '/docs/example-chat-pages',
    icon: (
      <svg viewBox="0 0 48 48" className={styles.tileIcon} aria-hidden="true">
        <rect x="6" y="10" width="36" height="22" rx="6" />
        <path d="M16 32h8l-8 8v-8z" />
        <circle cx="18" cy="21" r="2.5" />
        <circle cx="24" cy="21" r="2.5" />
        <circle cx="30" cy="21" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Tile-based UI system',
    description:
      'Reusable visual cards built with HTML + SVG for consistent, responsive UX across documentation pages.',
    to: '/docs/ui-tiles',
    icon: (
      <svg viewBox="0 0 48 48" className={styles.tileIcon} aria-hidden="true">
        <rect x="8" y="8" width="14" height="14" rx="3" />
        <rect x="26" y="8" width="14" height="14" rx="3" />
        <rect x="8" y="26" width="14" height="14" rx="3" />
        <rect x="26" y="26" width="14" height="14" rx="3" />
      </svg>
    ),
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Explore Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

function TileGrid() {
  return (
    <section className={styles.tilesSection}>
      <div className="container">
        <div className={styles.tilesHeader}>
          <Heading as="h2">Multi-page static site experience</Heading>
          <p>Built with React + Docusaurus for discoverable, maintainable content and polished UI/UX.</p>
        </div>
        <div className={styles.tilesGrid}>
          {tiles.map((tile) => (
            <Link key={tile.title} className={styles.tileCard} to={tile.to}>
              {tile.icon}
              <Heading as="h3">{tile.title}</Heading>
              <p>{tile.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description="graphifychat static site with usability and example chat pages">
      <HomepageHeader />
      <main>
        <TileGrid />
      </main>
    </Layout>
  );
}
