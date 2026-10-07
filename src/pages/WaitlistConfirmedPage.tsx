import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { loadConfirmedWaitlist } from '../services/waitlist';
import { Button } from '../components/Button';
import { SuccessIllustration } from '../components/svg/SuccessIllustration';

export const WaitlistConfirmedPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const confirmed = loadConfirmedWaitlist();

  // Route Guard: Only reachable after successful verification, otherwise redirect to "/"
  if (!confirmed) {
    return <Navigate to="/" replace />;
  }

  const alreadyOnWaitlist =
    Boolean(
      (location.state as { alreadyOnWaitlist?: boolean } | null)?.alreadyOnWaitlist
    ) || confirmed.alreadyOnWaitlist;

  return (
    <main id="main-content" className="py-12 md:py-20 lg:py-28">
      <div className="specimen-container max-w-3xl">
        <div className="rounded-[12px] bg-[#f2f0e7] border-2 border-[#171412] p-8 sm:p-12 text-center">
          {/* SVG Confetti + Checkmark Badge Illustration */}
          <div className="flex justify-center mb-6">
            <SuccessIllustration className="w-32 h-32 md:w-36 md:h-36" />
          </div>

          {alreadyOnWaitlist && (
            <div
              role="status"
              aria-live="polite"
              className="inline-block mb-5 px-4 py-2 rounded-[50px] bg-[#ffc765] text-[#171412] text-[13px] font-bold border border-[#171412]"
            >
              You&apos;re already on the waitlist — your spot is reserved!
            </div>
          )}

          {/* Big Headline */}
          <h1 className="specimen-h2 text-[#171412] mb-4">
            You&apos;re on the waitlist.
          </h1>

          <p className="font-display text-[22px] sm:text-[26px] font-extrabold text-[#813502] mb-3">
            Welcome aboard, {confirmed.firstName}!
          </p>

          <p className="text-[17px] sm:text-[19px] text-[#171412] leading-[1.35] max-w-[46ch] mx-auto mb-10">
            As soon as we&apos;re ready, we&apos;ll contact you soon on your email and
            WhatsApp.
          </p>

          {/* Summary Card */}
          <div className="rounded-[12px] bg-[#fbf9ef] border-2 border-[#171412] p-6 text-left max-w-xl mx-auto mb-10">
            <div className="text-[12px] font-bold text-[#813502] pb-3 mb-4 border-b border-[#171412]/15">
              Verified Waitlist Registration Summary
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
              <div>
                <dt className="text-[#171412]/70 text-[12px] font-medium">Applicant</dt>
                <dd className="font-display text-[16px] font-extrabold text-[#171412] mt-0.5">
                  {confirmed.firstName} {confirmed.lastName}
                </dd>
              </div>

              <div>
                <dt className="text-[#171412]/70 text-[12px] font-medium">Status</dt>
                <dd className="font-display text-[16px] font-extrabold text-[#813502] mt-0.5">
                  Verified · Pending Cohort
                </dd>
              </div>

              <div>
                <dt className="text-[#171412]/70 text-[12px] font-medium">
                  Verified Email
                </dt>
                <dd className="font-semibold text-[#171412] mt-0.5 break-all">
                  {confirmed.email}
                </dd>
              </div>

              <div>
                <dt className="text-[#171412]/70 text-[12px] font-medium">
                  WhatsApp Alert Number
                </dt>
                <dd className="font-semibold text-[#171412] tabular-nums mt-0.5">
                  {confirmed.whatsapp}
                </dd>
              </div>
            </dl>
          </div>

          <Button variant="primary" size="lg" onClick={() => navigate('/')}>
            Back to home
          </Button>
        </div>
      </div>
    </main>
  );
};
