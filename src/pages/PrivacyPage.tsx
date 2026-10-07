import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <main id="main-content" className="py-12 md:py-20">
      <div className="specimen-container max-w-3xl">
        <div className="text-[13px] font-bold text-[#813502] mb-3">
          Data Protection · Effective October 2026
        </div>
        <h1 className="font-display text-[42px] sm:text-[64px] font-extrabold text-[#171412] leading-[0.88] tracking-[-0.04em] mb-8">
          Privacy Policy
        </h1>

        <div className="rounded-[12px] bg-[#f2f0e7] border border-[#171412]/20 p-6 sm:p-10 flex flex-col gap-6 text-[16px] text-[#171412] leading-[1.5]">
          <section>
            <h2 className="specimen-h3 mb-2">1. Information We Collect</h2>
            <p>
              When you register for the Dropshipping Academy waitlist, we collect your first name,
              last name, date of birth (to verify 18+ eligibility), phone number, WhatsApp number,
              and email address.
            </p>
          </section>

          <section>
            <h2 className="specimen-h3 mb-2">2. How We Use Your Information</h2>
            <p>
              We use your verified contact information strictly to manage waitlist priority, send
              cohort enrollment invitations via email and WhatsApp, and share free pre-cohort
              educational calculators. We never sell, rent, or trade your personal data to third
              parties.
            </p>
          </section>

          <section>
            <h2 className="specimen-h3 mb-2">3. Database Security & Row-Level Security (RLS)</h2>
            <p>
              Your waitlist record is stored in our Supabase PostgreSQL database protected by
              Row-Level Security (RLS) policies and one-time passcode email verification. Client
              sessions are immediately signed out once your waitlist entry is recorded.
            </p>
          </section>

          <section>
            <h2 className="specimen-h3 mb-2">4. Data Removal Requests</h2>
            <p>
              You may opt out of the waitlist or request complete deletion of your personal data at
              any time by emailing{' '}
              <a
                href="mailto:support@dropshippingacademy.io"
                className="font-bold underline underline-offset-2"
              >
                support@dropshippingacademy.io
              </a>
              .
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
