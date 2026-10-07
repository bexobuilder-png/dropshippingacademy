import React from 'react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  return (
    <main id="main-content" className="py-12 md:py-20">
      <div className="specimen-container max-w-3xl">
        <div className="text-[13px] font-bold text-[#813502] mb-3">
          Legal · Effective October 2026
        </div>
        <h1 className="font-display text-[42px] sm:text-[64px] font-extrabold text-[#171412] leading-[0.88] tracking-[-0.04em] mb-8">
          Terms of Service
        </h1>

        <div className="rounded-[12px] bg-[#f2f0e7] border border-[#171412]/20 p-6 sm:p-10 flex flex-col gap-6 text-[16px] text-[#171412] leading-[1.5]">
          <section>
            <h2 className="specimen-h3 mb-2">1. Educational Purpose & No Earnings Guarantees</h2>
            <p>
              Dropshipping Academy provides educational training, frameworks, spreadsheets, and
              mentorship regarding e-commerce store operations, product research, supplier sourcing,
              and paid digital advertising. E-commerce involves financial risk and requires
              consistent execution. We do not guarantee any specific revenue, profit margin, or
              return on ad spend.
            </p>
          </section>

          <section>
            <h2 className="specimen-h3 mb-2">2. Age Requirement (18+)</h2>
            <p>
              Because running an online store, entering supplier agreements, and managing ad network
              billing accounts require legal capacity, you must be at least 18 years old to join our
              waitlist or enroll in any Dropshipping Academy cohort.
            </p>
          </section>

          <section>
            <h2 className="specimen-h3 mb-2">3. Waitlist Registration & Communications</h2>
            <p>
              By submitting the waitlist form and verifying your email with a 6-digit one-time code,
              you authorize Dropshipping Academy to contact you via email and WhatsApp regarding
              cohort opening dates, curriculum previews, and enrollment instructions.
            </p>
          </section>

          <section>
            <h2 className="specimen-h3 mb-2">4. Intellectual Property</h2>
            <p>
              All curriculum materials, margin calculators, storefront wireframes, and supplier
              outreach scripts shared by Dropshipping Academy remain the intellectual property of
              Dropshipping Academy and may not be redistributed or resold.
            </p>
          </section>

          <div className="pt-4 border-t border-[#171412]/15">
            <Link
              to="/"
              className="inline-flex items-center min-h-[44px] font-bold text-[#813502] underline underline-offset-4 hover:text-[#171412]"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
