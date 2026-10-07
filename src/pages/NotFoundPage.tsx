import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { BrandBadgeMark } from '../components/svg/BrandLogo';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main id="main-content" className="py-16 md:py-28">
      <div className="specimen-container max-w-2xl text-center">
        <div className="rounded-[12px] bg-[#f2f0e7] border-2 border-[#171412] p-8 sm:p-12">
          <div className="flex justify-center mb-6">
            <BrandBadgeMark className="w-16 h-16" decorative={true} />
          </div>
          <div className="font-display text-[14px] font-bold text-[#813502] tabular-nums mb-2">
            Error 404
          </div>
          <h1 className="specimen-h2 text-[#171412] mb-4">Page not found.</h1>
          <p className="text-[16px] text-[#171412]/85 leading-[1.4] max-w-[42ch] mx-auto mb-8">
            The page you are looking for does not exist or has moved. Head back to the
            academy homepage or join the waitlist.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
            <Button variant="orange" onClick={() => navigate('/join')}>
              Join the waitlist
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
