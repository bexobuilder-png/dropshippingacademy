/**
 * PLACEHOLDER_CONTENT FLAG
 * ----------------------------------------------------------------------------
 * All benchmark stats, sample case cards, and preview testimonials are marked
 * with PLACEHOLDER_CONTENT = true so you can easily identify and replace them
 * with verified student metrics before launch.
 */
export const PLACEHOLDER_CONTENT = true;

export interface ToolCategoryItem {
  id: string;
  name: string;
  category: string;
}

export const TOOL_CATEGORIES: ToolCategoryItem[] = [
  { id: 'shopify', name: 'Shopify', category: 'Storefront' },
  { id: 'woocommerce', name: 'WooCommerce', category: 'Open Commerce' },
  { id: 'aliexpress', name: 'AliExpress', category: 'Product Discovery' },
  { id: 'cj', name: 'CJ Dropshipping', category: 'Fulfillment' },
  { id: 'meta-ads', name: 'Meta Ads', category: 'Paid Social' },
  { id: 'tiktok-ads', name: 'TikTok Ads', category: 'Short-Form Video' },
];

export interface BentoResultItem {
  id: string;
  type: 'illustration' | 'testimonial';
  spanClass: string;
  tag: string;
  title: string;
  metric: string;
  subcopy: string;
  illustrationType?: 'revenue-chart' | 'product-box' | 'storefront' | 'ad-spend-dial' | 'shipping-route';
  quote?: string;
  authorName?: string;
  authorRole?: string;
  authorInitials?: string;
  isPlaceholder: boolean;
}

export const FEATURED_RESULTS: BentoResultItem[] = [
  {
    id: 'result-revenue',
    type: 'illustration',
    spanClass: 'col-span-24 lg:col-span-14 min-h-[380px]',
    tag: 'Unit Economics · 90-Day Curriculum Benchmark',
    title: 'From zero store to predictable daily contribution margin',
    metric: '+34.8% Net Margin Target',
    subcopy: 'Structured break-even ROAS calculators prevent overspending on unprofitable ad sets during week-one testing.',
    illustrationType: 'revenue-chart',
    isPlaceholder: PLACEHOLDER_CONTENT,
  },
  {
    id: 'result-product-box',
    type: 'illustration',
    spanClass: 'col-span-24 md:col-span-12 lg:col-span-10 min-h-[380px]',
    tag: 'Product Selection · 12-Point Filter',
    title: 'High-perceived-value problem solvers',
    metric: '3.5x Minimum Markup Rule',
    subcopy: 'We eliminate saturated impulse trinkets in favor of high-margin home, pet, and ergonomic utility goods.',
    illustrationType: 'product-box',
    isPlaceholder: PLACEHOLDER_CONTENT,
  },
  {
    id: 'result-storefront',
    type: 'illustration',
    spanClass: 'col-span-24 md:col-span-12 lg:col-span-8 min-h-[340px]',
    tag: 'Storefront Architecture · Mobile First',
    title: 'Sub-2-second load speed & editorial product pages',
    metric: '4.2% Target Checkout CVR',
    subcopy: 'Clean visual hierarchy, benefit-driven offer stacks, and friction-free mobile sticky carts.',
    illustrationType: 'storefront',
    isPlaceholder: PLACEHOLDER_CONTENT,
  },
  {
    id: 'result-testimonial-purple',
    type: 'testimonial',
    spanClass: 'col-span-24 md:col-span-12 lg:col-span-8 min-h-[340px]',
    tag: 'Curriculum Beta Preview',
    title: 'Clarity over guesswork',
    metric: 'Cohort 01 Beta Feedback',
    subcopy: 'Sample beta reader reflection',
    quote:
      '“Having a strict break-even calculator and supplier vetting script stopped me from launching three money-losing products before spending a cent on ads.”',
    authorName: 'Nadia K.',
    authorRole: 'Early Curriculum Reviewer · Dhaka',
    authorInitials: 'NK',
    isPlaceholder: PLACEHOLDER_CONTENT,
  },
  {
    id: 'result-shipping',
    type: 'illustration',
    spanClass: 'col-span-24 md:col-span-12 lg:col-span-8 min-h-[340px]',
    tag: 'Fulfillment · Direct Private Agents',
    title: '6–9 day tracked air lines with custom packaging',
    metric: '< 1.2% Dispute Rate Benchmark',
    subcopy: 'Transition off slow marketplace sellers to vetted 3PL logistics before scaling past 15 orders a day.',
    illustrationType: 'shipping-route',
    isPlaceholder: PLACEHOLDER_CONTENT,
  },
];

export interface CurriculumTabItem {
  id: string;
  label: string;
  stepNumber: string;
  headline: string;
  description: string;
  deliverables: string[];
  tiles: {
    blackTitle: string;
    blackStat: string;
    orangeTitle: string;
    orangeStat: string;
    yellowTitle: string;
    yellowStat: string;
  };
}

export const CURRICULUM_TABS: CurriculumTabItem[] = [
  {
    id: 'product-research',
    label: 'Product Research',
    stepNumber: '01',
    headline: 'Spot demand signals before a product peaks on ad spy tools.',
    description:
      'Stop copying viral ads that are already fatigued. You will learn how to audit search intent, analyze customer complaint patterns in marketplace reviews, and validate gross margin potential using our 12-point scorecard.',
    deliverables: [
      '12-Point Margin & Demand Validation Spreadsheet',
      'Competitor Offer Teardown Protocol',
      'Problem-Solving Angle Matrix for Beginners',
    ],
    tiles: {
      blackTitle: 'Margin Floor',
      blackStat: '68%+ Gross',
      orangeTitle: 'Demand Audit',
      orangeStat: '12 Criteria',
      yellowTitle: 'Research Sprint',
      yellowStat: '48 Hours',
    },
  },
  {
    id: 'store-setup',
    label: 'Store Setup',
    stepNumber: '02',
    headline: 'Build a store that looks like a category leader, not a dropship template.',
    description:
      'Customers spot countdown timers and fake popups immediately. We walk you through typography, offer bundling, persuasive comparison blocks, and trust architecture that converts cold mobile traffic.',
    deliverables: [
      'High-Converting Product Page Wireframe Blueprint',
      'AOV-Boosting Bundle & Tiered Pricing Setup',
      'Technical Checkout, Pixel & Domain Verification Checklist',
    ],
    tiles: {
      blackTitle: 'Mobile Speed',
      blackStat: '< 1.8s LCP',
      orangeTitle: 'Offer Stack',
      orangeStat: '3-Tier Bundles',
      yellowTitle: 'Launch Ready',
      yellowStat: '5 Days',
    },
  },
  {
    id: 'suppliers',
    label: 'Suppliers',
    stepNumber: '03',
    headline: 'Lock in reliable quality, fast air shipping, and backup factories.',
    description:
      'Bad suppliers kill profitable stores via chargebacks. Learn how to negotiate MOQs of zero with private sourcing agents, inspect sample quality via video call, and automate tracking updates.',
    deliverables: [
      'Private Sourcing Agent Outreach & Negotiation Scripts',
      'Pre-Shipment Quality Inspection Checklist',
      'Automated Order Sync & Dispute Prevention Workflow',
    ],
    tiles: {
      blackTitle: 'Transit Time',
      blackStat: '6–9 Days Air',
      orangeTitle: 'QC Protocol',
      orangeStat: 'Video Verified',
      yellowTitle: 'Backup Lines',
      yellowStat: '2x Redundancy',
    },
  },
  {
    id: 'ads',
    label: 'Ads',
    stepNumber: '04',
    headline: 'Test scroll-stopping creatives with disciplined budget caps.',
    description:
      'Modern paid social is won in the first 3 seconds of video creative. We teach you how to script modular hooks, edit native UGC concepts, and run structured Meta & TikTok tests without burning cash.',
    deliverables: [
      '3-Second Hook & Modular Video Scripting Framework',
      'Low-Budget Creative Testing Campaign Structure',
      'Daily Kill / Scale Decision Rulebook (CPA & ROAS)',
    ],
    tiles: {
      blackTitle: 'Hook Rate',
      blackStat: '32%+ Target',
      orangeTitle: 'Creative Batch',
      orangeStat: '3x3 Matrix',
      yellowTitle: 'Kill Rule',
      yellowStat: '1.5x Max CPA',
    },
  },
  {
    id: 'scaling',
    label: 'Scaling',
    stepNumber: '05',
    headline: 'Scale winning ad sets while protecting cash flow and customer retention.',
    description:
      'Revenue means nothing if you keep zero profit. Master horizontal creative scaling, post-purchase email flows, custom branded packaging upgrades, and weekly P&L bookkeeping.',
    deliverables: [
      'Horizontal & Vertical Campaign Scaling Playbook',
      'Post-Purchase Email & SMS Retention Flows',
      'Weekly Cash-Flow & Contribution Margin Tracker',
    ],
    tiles: {
      blackTitle: 'Repeat Buyers',
      blackStat: '+22% LTV Lift',
      orangeTitle: 'P&L Cadence',
      orangeStat: 'Weekly Audit',
      yellowTitle: 'Brand Moat',
      yellowStat: 'Custom Pack',
    },
  },
];

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  initials: string;
  role: string;
  tag: string;
  rotation: number;
  accentBg: string;
  isPlaceholder: boolean;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    quote:
      '“Every module focuses on real math before spending money. The product scorecard alone saved me from importing low-margin gadgets.”',
    author: 'Rashedul I.',
    initials: 'RI',
    role: 'Aspiring Store Owner · Chittagong',
    tag: 'Preview Reader · Module 01',
    rotation: -6,
    accentBg: '#ff7722',
    isPlaceholder: PLACEHOLDER_CONTENT,
  },
  {
    id: 't-2',
    quote:
      '“I finally understand why my old store had clicks but zero checkouts. The product page wireframe and offer stack guide changed everything.”',
    author: 'Samira T.',
    initials: 'ST',
    role: 'Freelance Designer & Builder',
    tag: 'Preview Reader · Module 02',
    rotation: -2,
    accentBg: '#ffc765',
    isPlaceholder: PLACEHOLDER_CONTENT,
  },
  {
    id: 't-3',
    quote:
      '“The supplier outreach templates helped me get quotes from two private fulfillment agents before I even scaled past ten orders.”',
    author: 'Mahmudul H.',
    initials: 'MH',
    role: 'First-Time E-Commerce Operator',
    tag: 'Preview Reader · Module 03',
    rotation: 2,
    accentBg: '#fbc59d',
    isPlaceholder: PLACEHOLDER_CONTENT,
  },
  {
    id: 't-4',
    quote:
      '“No hype, no rented supercars—just clear spreadsheets, creative script hooks, and strict rules on when to cut losing ads.”',
    author: 'Farhana A.',
    initials: 'FA',
    role: 'Marketing Generalist',
    tag: 'Preview Reader · Module 04',
    rotation: 6,
    accentBg: '#3d2fa9',
    isPlaceholder: PLACEHOLDER_CONTENT,
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Do I need prior e-commerce or paid advertising experience to join?',
    answer:
      'No prior experience is required. Dropshipping Academy is structured sequentially from foundational unit economics and product validation to store building, supplier negotiation, and creative ad testing. Every concept includes step-by-step checklists and calculators.',
  },
  {
    id: 'faq-2',
    question: 'How much starting capital do I need besides the academy?',
    answer:
      'We recommend setting aside $300 to $600 for your initial operating tools (domain, Shopify trial plan, sample orders, and structured low-budget creative testing). We teach strict budget protection rules so you never spend blindly.',
  },
  {
    id: 'faq-3',
    question: 'Why is enrollment currently waitlist-only?',
    answer:
      'We review store builds, product scorecards, and ad creatives directly with each cohort. Capping cohort size ensures every member gets actionable feedback rather than getting lost in a crowded forum.',
  },
  {
    id: 'faq-4',
    question: 'Does this work if I am operating from outside the US or Europe?',
    answer:
      'Yes. Our curriculum covers cross-border payment gateways, international entity considerations, and working with 3PL fulfillment agents that ship directly to customers in North America, Europe, and Australia within 6–9 business days.',
  },
  {
    id: 'faq-5',
    question: 'What happens after I verify my email on the waitlist?',
    answer:
      'Once you verify your 6-digit email code, your spot in line is locked in our database. You will receive early access to our cohort opening dates, tuition details, and our free Product Margin Calculator via email and WhatsApp.',
  },
];
