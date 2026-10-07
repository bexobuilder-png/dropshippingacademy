import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CURRICULUM_TABS,
  FAQ_ITEMS,
  FEATURED_RESULTS,
  PLACEHOLDER_CONTENT,
  TESTIMONIALS,
  TOOL_CATEGORIES,
} from '../config/content';
import { FounderProfile } from '../config/founders';
import {
  fetchFoundersList,
  FounderStoryConfig,
  loadFounderStoryConfig,
  loadLocalFounders,
} from '../services/admin';
import { saveHeroEmailPrefill } from '../services/waitlist';
import { Accordion } from '../components/Accordion';
import { BentoCard } from '../components/BentoCard';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { Tabs } from '../components/Tabs';
import { TestimonialCard } from '../components/TestimonialCard';
import {
  HeroCornerStamp,
  HeroInlineBoxBadge,
} from '../components/svg/BrandLogo';
import { KeychainIllustration } from '../components/svg/KeychainIllustration';
import { ArrowDownCurvedIcon, ArrowRightSvgIcon } from '../components/svg/NavIcons';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [heroEmail, setHeroEmail] = useState('');
  const [heroEmailError, setHeroEmailError] = useState('');
  const [showTeamBios, setShowTeamBios] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [foundersList, setFoundersList] = useState<FounderProfile[]>(() =>
    loadLocalFounders()
  );
  const [founderStory, setFounderStory] = useState<FounderStoryConfig>(() =>
    loadFounderStoryConfig()
  );

  useEffect(() => {
    let mounted = true;
    fetchFoundersList().then((list) => {
      if (mounted) setFoundersList(list);
    });

    const handleFoundersUpdated = () => {
      setFoundersList(loadLocalFounders());
      setFounderStory(loadFounderStoryConfig());
    };
    window.addEventListener('founders-updated', handleFoundersUpdated);
    return () => {
      mounted = false;
      window.removeEventListener('founders-updated', handleFoundersUpdated);
    };
  }, []);

  // Support hash scrolling when navigating back from /join, /terms, /privacy
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }, [location.hash]);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = heroEmail.trim();
    if (trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setHeroEmailError('Please enter a valid email address to continue.');
      return;
    }
    setHeroEmailError('');
    if (trimmed) {
      saveHeroEmailPrefill(trimmed);
    }
    navigate('/join');
  };

  return (
    <main id="main-content" className="overflow-x-hidden">
      {/* =====================================================================
          2. HERO SECTION (Specimen Macrostructure)
      ===================================================================== */}
      <section
        id="hero"
        aria-label="Hero introduction"
        className="relative pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32"
      >
        <div className="specimen-container relative">
          {/* Corner Swiss Stamp Sticker at Left Edge */}
          <div className="hidden lg:block absolute -left-4 xl:left-2 top-2 -rotate-12 pointer-events-none select-none">
            <HeroCornerStamp className="w-28 h-28" />
          </div>

          <div className="grid-24 gap-y-8">
            <div className="col-span-24 xl:col-start-3 xl:col-span-21">
              {/* Editorial Kicker */}
              <div className="flex flex-wrap items-center gap-2 text-[13px] font-bold text-[#813502] mb-5">
                <span>Cohort-Based Operating System</span>
                <span aria-hidden="true">·</span>
                <span>Unit Economics First</span>
                <span aria-hidden="true">·</span>
                <span>Waitlist Now Open</span>
              </div>

              {/* Giant H1 with Inline Circular Orange Box SVG Badge */}
              <h1 className="specimen-h1 text-[#171412]">
                The learning partner
                <HeroInlineBoxBadge />
                for ambitious dropshippers
              </h1>
            </div>

            {/* Subcopy + Compact Pill Email Form */}
            <div className="col-span-24 xl:col-start-3 xl:col-span-18 mt-2 md:mt-4 flex flex-col gap-6">
              <p className="text-[18px] md:text-[22px] font-medium text-[#171412] leading-[1.25] max-w-[48ch]">
                We teach beginners to find winning products, build stores, and scale
                with ads, step by step.
              </p>

              <form
                onSubmit={handleHeroSubmit}
                noValidate
                className="w-full max-w-[520px]"
              >
                <label htmlFor="hero-waitlist-email" className="sr-only">
                  Email address to join the waitlist
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 rounded-[28px] sm:rounded-[50px] bg-[#fff] border-2 border-[#171412] shadow-sm">
                  <input
                    id="hero-waitlist-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={heroEmail}
                    onChange={(e) => {
                      setHeroEmail(e.target.value);
                      if (heroEmailError) setHeroEmailError('');
                    }}
                    placeholder="Enter your email address..."
                    aria-invalid={heroEmailError ? 'true' : 'false'}
                    aria-describedby={heroEmailError ? 'hero-email-error' : undefined}
                    className="flex-1 min-h-[44px] px-4 py-2 rounded-[50px] bg-transparent text-[#171412] text-[15px] font-medium placeholder:text-[#171412]/50 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto px-6"
                  >
                    <span>Join waitlist</span>
                    <ArrowRightSvgIcon className="w-4 h-4" />
                  </Button>
                </div>

                {heroEmailError && (
                  <p
                    id="hero-email-error"
                    role="alert"
                    aria-live="polite"
                    className="text-[13px] font-bold text-[#ff3c34] mt-2 pl-3"
                  >
                    {heroEmailError}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Tool Categories Wordmark Cloud Row (Plain styled typography, no trademarked logos) */}
          <div className="mt-14 md:mt-20 pt-8 hairline-t">
            <div className="text-[12px] font-bold text-[#813502] mb-4">
              Built around the modern e-commerce stack
            </div>
            <ul
              aria-label="Supported e-commerce platforms and ad networks"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {TOOL_CATEGORIES.map((tool) => (
                <li
                  key={tool.id}
                  className="py-3 px-4 rounded-[12px] bg-[#f2f0e7] border border-[#171412]/12 flex flex-col justify-between"
                >
                  <span className="font-display text-[18px] md:text-[20px] font-extrabold text-[#171412] tracking-[-0.03em]">
                    {tool.name}
                  </span>
                  <span className="text-[12px] text-[#171412]/75 mt-1">
                    {tool.category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FEATURED RESULTS (Bento Grid of Dark #171412 Cards + Purple Card)
      ===================================================================== */}
      <Section id="results" ariaLabel="Featured results and curriculum benchmarks">
        <div className="flex flex-col gap-4 mb-10 md:mb-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="specimen-h2 text-[#171412]">
                Featured <span className="text-[#8e827c]">results</span>
              </h2>
              <div className="mt-4 flex items-center gap-3 text-[#171412]">
                <ArrowDownCurvedIcon className="w-7 h-7 text-[#ff7722] shrink-0" />
                <p className="text-[16px] md:text-[18px] font-medium text-[#171412]">
                  The operating benchmarks and unit economics every student builds toward.
                </p>
              </div>
            </div>

            {PLACEHOLDER_CONTENT && (
              <p className="text-[13px] text-[#813502] font-semibold max-w-[38ch]">
                Note: Metrics and beta quotes below represent curriculum targets and
                placeholder previews prior to Cohort 01 graduation.
              </p>
            )}
          </div>
        </div>

        {/* 24-Column Swiss Bento Grid */}
        <div className="grid-24 gap-4 md:gap-6">
          {FEATURED_RESULTS.map((item) => (
            <BentoCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      {/* =====================================================================
          4. WHAT YOU'LL LEARN (Purple Card with Accessible Tabs + Tilted Tiles)
      ===================================================================== */}
      <Section id="learn" ariaLabel="What you will learn curriculum">
        <div className="mb-10 md:mb-14">
          <h2 className="specimen-h2 text-[#171412]">
            <span className="block">What you&apos;ll learn.</span>
            <span className="block text-[#813502] mt-1">Our ways to move fast.</span>
          </h2>
        </div>

        <Tabs items={CURRICULUM_TABS} />
      </Section>

      {/* =====================================================================
          5. TRUSTED BY FUTURE STORE OWNERS (Fanned/Rotated Cards)
      ===================================================================== */}
      <Section id="reviews" ariaLabel="Trusted by future store owners">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <h2 className="specimen-h2 text-[#171412]">
              Trusted by future store owners
            </h2>
            <p className="mt-4 text-[16px] md:text-[18px] text-[#171412] max-w-[54ch]">
              Early beta readers who tested our product validation scorecards and
              storefront wireframes.
            </p>
          </div>

          {PLACEHOLDER_CONTENT && (
            <span className="text-[13px] font-bold text-[#813502]">
              Sample Beta Previews · Replaceable in src/config/content.ts
            </span>
          )}
        </div>

        {/* Mobile Horizontal Scroll-Snap Carousel / Desktop Fanned 4-Col Row */}
        <div
          aria-label="Beta reader feedback cards"
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar py-4 md:py-8 px-1"
        >
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      {/* =====================================================================
          5.5. FAQ ACCORDION (Between Sections 5 and 6, Linked from Left Rail)
      ===================================================================== */}
      <Section id="faq" ariaLabel="Frequently asked questions">
        <div className="grid-24 gap-y-10">
          <div className="col-span-24 lg:col-span-9">
            <div className="text-[13px] font-bold text-[#813502] mb-3">
              Common Questions
            </div>
            <h2 className="font-display text-[44px] sm:text-[56px] font-extrabold text-[#171412] leading-[0.88] tracking-[-0.04em] text-balance">
              Everything you need to know before joining.
            </h2>
            <p className="mt-4 text-[16px] text-[#171412]/85 leading-[1.4] max-w-[38ch]">
              Have a specific question about capital requirements, time commitment, or
              international suppliers? Read our straightforward answers.
            </p>
          </div>

          <div className="col-span-24 lg:col-start-11 lg:col-span-14">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </Section>

      {/* =====================================================================
          6. SMALL TEAM, BIG RESULTS (FOUNDERS OVERLAPPING HEADLINE)
      ===================================================================== */}
      <Section id="about" ariaLabel="Small team, big results — The Founders">
        <div className="relative">
          {/* Giant Full-Width Headline */}
          <div className="text-center">
            <div className="text-[13px] font-bold text-[#813502] mb-3">
              Operators Teaching Operators
            </div>
            <h2 className="font-display text-[54px] sm:text-[82px] lg:text-[116px] font-extrabold text-[#171412] leading-[0.82] tracking-[-0.05em] uppercase select-none">
              {founderStory.headline}
            </h2>
          </div>

          {/* Founder Photos Overlapping the Headline in Tilted Frames */}
          {foundersList.length > 0 && (
            <div className="mt-6 sm:-mt-6 lg:-mt-12 relative z-10 flex flex-wrap items-center justify-center gap-10 sm:gap-12 lg:gap-20">
              {foundersList.map((founder, idx) => {
                const imageFailed = Boolean(failedImages[founder.id]);
                return (
                  <div
                    key={founder.id}
                    className={`flex flex-col items-center max-w-[300px] sm:max-w-[320px] w-full transition-transform duration-300 ${founder.rotationClass} hover:rotate-0`}
                  >
                    {/* Colored Backdrop Card Frame */}
                    <div
                      style={{ backgroundColor: founder.backdropColor }}
                      className="w-full p-3 rounded-[12px] border-2 border-[#171412] shadow-md"
                    >
                      <div className="relative w-full aspect-[3/4] rounded-[8px] overflow-hidden bg-[#171412]">
                        {!imageFailed ? (
                          <img
                            src={founder.photo}
                            alt={founder.alt}
                            width={360}
                            height={480}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setFailedImages((prev) => ({
                                ...prev,
                                [founder.id]: true,
                              }))
                            }
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#171412] text-[#fbf9ef]">
                            <span className="font-display text-[36px] font-extrabold text-[#ff7722]">
                              0{idx + 1}
                            </span>
                            <span className="mt-2 font-display text-[18px] font-bold">
                              {founder.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name + Role Pill Chip Under Photo */}
                    <div className="mt-4 px-5 py-2.5 rounded-[50px] bg-[#171412] text-[#fbf9ef] text-center border border-[#171412] shadow-sm">
                      <div className="font-display text-[15px] font-extrabold leading-tight">
                        {founder.name}
                      </div>
                      <div className="text-[12px] text-[#fbc59d] mt-0.5">
                        {founder.role}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Founder Story Paragraph + "Meet the team" CTA */}
          <div className="mt-12 md:mt-16 max-w-3xl mx-auto text-center">
            <p className="font-display text-[22px] sm:text-[26px] font-extrabold text-[#171412] leading-[1.15] tracking-[-0.02em]">
              {founderStory.lead}
            </p>
            <p className="mt-4 text-[16px] text-[#171412]/90 leading-[1.45]">
              {founderStory.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {foundersList.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setShowTeamBios((prev) => !prev)}
                  aria-expanded={showTeamBios}
                  aria-controls="founder-bios-drawer"
                >
                  {showTeamBios ? 'Hide founder bios' : founderStory.ctaLabel}
                </Button>
              )}
              <Button variant="primary" onClick={() => navigate('/join')}>
                Join the waitlist
              </Button>
            </div>

            {/* Expandable Founder Bios Drawer */}
            {showTeamBios && foundersList.length > 0 && (
              <div
                id="founder-bios-drawer"
                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
              >
                {foundersList.map((founder) => (
                  <div
                    key={`bio-${founder.id}`}
                    className="rounded-[12px] bg-[#f2f0e7] border-2 border-[#171412] p-6"
                  >
                    <div className="text-[12px] font-bold text-[#813502]">
                      {founder.specialty}
                    </div>
                    <h3 className="font-display text-[22px] font-extrabold text-[#171412] mt-1">
                      {founder.name}
                    </h3>
                    <p className="text-[14px] text-[#171412]/80 mt-0.5 mb-3">
                      {founder.role}
                    </p>
                    <p className="text-[15px] text-[#171412] leading-[1.4]">
                      {founder.shortBio}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* =====================================================================
          7. FINAL CTA SECTION ("Make every day pay for itself!")
      ===================================================================== */}
      <Section
        id="final-cta"
        ariaLabel="Join the Dropshipping Academy waitlist"
        className="bg-[#f2f0e7]"
      >
        <div className="rounded-[12px] bg-[#171412] text-[#fbf9ef] p-8 sm:p-12 lg:p-16 border-2 border-[#171412]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-3xl">
              <div className="text-[13px] font-bold text-[#ffc765] mb-4">
                Next Cohort Enrollment · Limited Waitlist Spots
              </div>
              <h2 className="specimen-h2 text-[#fbf9ef]">
                Make every day pay for itself!
              </h2>
              <p className="mt-6 text-[17px] md:text-[19px] text-[#fbf9ef]/85 leading-[1.35] max-w-[50ch]">
                Reserve your spot on the waitlist in under two minutes. Verify your
                email and get notified on WhatsApp and email the moment doors open.
              </p>

              <div className="mt-8">
                <Button
                  variant="orange"
                  size="lg"
                  onClick={() => navigate('/join')}
                >
                  <span>Join the waitlist</span>
                  <ArrowRightSvgIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Keychain with Small Box Charm SVG Illustration */}
            <div className="shrink-0 self-center lg:self-auto bg-[#fbf9ef] p-6 rounded-[12px] border-2 border-[#ff7722]">
              <KeychainIllustration className="w-36 h-36 md:w-44 md:h-44" />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};
