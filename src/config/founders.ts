import founder1Photo from '../assets/founders/founder-1.jpg';
import founder2Photo from '../assets/founders/founder-2.jpg';

/**
 * PLACEHOLDER_FOUNDERS_CONFIG
 * ----------------------------------------------------------------------------
 * Edit the names, titles, and short bios below with your real founder details.
 * The photos reference src/assets/founders/founder-1.jpg and founder-2.jpg.
 */
export const PLACEHOLDER_FOUNDERS_FLAG = true;

export interface FounderProfile {
  id: string;
  name: string;
  role: string;
  photo: string;
  alt: string;
  rotationClass: string;
  backdropColor: string;
  chipBg: string;
  chipText: string;
  shortBio: string;
  specialty: string;
  isPlaceholder: boolean;
}

export const FOUNDERS: FounderProfile[] = [
  {
    id: 'founder-1',
    name: 'Arafat Rahman', // [PLACEHOLDER: Replace with Founder 1 real name]
    role: 'Co-Founder · Product & Supplier Strategy', // [PLACEHOLDER: Replace with Founder 1 title]
    photo: founder1Photo,
    alt: 'Portrait of Co-Founder leading product research and supplier strategy at Dropshipping Academy',
    rotationClass: '-rotate-3 md:-rotate-4',
    backdropColor: '#ff7722', // --orange
    chipBg: '#171412',
    chipText: '#fbf9ef',
    shortBio:
      'Built his first profitable single-product store from a dorm room after testing 40+ supplier samples. Specializes in margin auditing, private-line fulfillment, and repeatable product validation frameworks.',
    specialty: 'Product Validation & Direct Agent Sourcing',
    isPlaceholder: PLACEHOLDER_FOUNDERS_FLAG,
  },
  {
    id: 'founder-2',
    name: 'Tanvir Hasan', // [PLACEHOLDER: Replace with Founder 2 real name]
    role: 'Co-Founder · Store Architecture & Paid Ads', // [PLACEHOLDER: Replace with Founder 2 title]
    photo: founder2Photo,
    alt: 'Portrait of Co-Founder leading conversion store design and paid acquisition at Dropshipping Academy',
    rotationClass: 'rotate-3 md:rotate-5',
    backdropColor: '#ffc765', // --yellow
    chipBg: '#171412',
    chipText: '#fbf9ef',
    shortBio:
      'Obsessed with conversion psychology, high-speed Shopify builds, and creative testing on Meta and TikTok. Turned complex media-buying spreadsheets into simple daily checklists for first-time operators.',
    specialty: 'Conversion Rate Design & Creative Ad Testing',
    isPlaceholder: PLACEHOLDER_FOUNDERS_FLAG,
  },
];

export const FOUNDER_STORY = {
  headline: 'Small team, big results',
  lead: 'We started Dropshipping Academy because most e-commerce courses teach outdated 2019 hacks instead of real unit economics.',
  body: 'When we launched our first stores, we wasted months on slow AliExpress shipping, generic store templates, and ad budgets burned without tracking contribution margin. Once we stripped away the noise and built a strict four-stage operating system—validation, conversion architecture, direct agent fulfillment, and disciplined creative testing—everything clicked. We kept our team intentionally small so every student on our waitlist learns the exact workflows we use every day.',
  ctaLabel: 'Meet the team',
};
