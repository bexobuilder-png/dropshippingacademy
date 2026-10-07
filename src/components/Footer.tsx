import React from 'react';
import { Link } from 'react-router-dom';
import { BrandBadgeMark } from './svg/BrandLogo';
import {
  SocialIconInstagram,
  SocialIconLinkedin,
  SocialIconX,
  SocialIconYoutube,
} from './svg/NavIcons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f2f0e7] text-[#171412] hairline-t pb-16 xl:pb-0">
      <div className="specimen-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 hairline-b">
          {/* Logo & Brand Wordmark */}
          <Link to="/" className="inline-flex items-center gap-3.5 group">
            <BrandBadgeMark className="w-11 h-11" decorative={true} />
            <div>
              <div className="font-display text-[20px] font-extrabold tracking-[-0.03em] text-[#171412]">
                Dropshipping Academy
              </div>
              <p className="text-[13px] text-[#171412]/80 mt-0.5">
                Practical e-commerce unit economics, store architecture & paid social.
              </p>
            </div>
          </Link>

          {/* Navigation & Legal Links */}
          <nav
            aria-label="Footer legal and support links"
            className="flex flex-wrap items-center gap-6 text-[14px] font-bold text-[#171412]"
          >
            <Link
              to="/join"
              className="min-h-[44px] inline-flex items-center hover:underline underline-offset-4"
            >
              Join Waitlist
            </Link>
            <Link
              to="/terms"
              className="min-h-[44px] inline-flex items-center hover:underline underline-offset-4"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="min-h-[44px] inline-flex items-center hover:underline underline-offset-4"
            >
              Privacy
            </Link>
            <a
              href="mailto:support@dropshippingacademy.io"
              className="min-h-[44px] inline-flex items-center hover:underline underline-offset-4"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Bottom Row: Copyright & Hand-built SVG Social Icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-[#171412]/80">
          <p>© {currentYear} Dropshipping Academy. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <a
              href="#hero"
              aria-label="Dropshipping Academy on X (Twitter)"
              className="w-11 h-11 rounded-full border border-[#171412]/20 flex items-center justify-center text-[#171412] hover:bg-[#171412] hover:text-[#fbf9ef] transition-colors"
            >
              <SocialIconX className="w-4 h-4" />
            </a>
            <a
              href="#hero"
              aria-label="Dropshipping Academy on Instagram"
              className="w-11 h-11 rounded-full border border-[#171412]/20 flex items-center justify-center text-[#171412] hover:bg-[#171412] hover:text-[#fbf9ef] transition-colors"
            >
              <SocialIconInstagram className="w-4 h-4" />
            </a>
            <a
              href="#hero"
              aria-label="Dropshipping Academy on YouTube"
              className="w-11 h-11 rounded-full border border-[#171412]/20 flex items-center justify-center text-[#171412] hover:bg-[#171412] hover:text-[#fbf9ef] transition-colors"
            >
              <SocialIconYoutube className="w-4 h-4" />
            </a>
            <a
              href="#hero"
              aria-label="Dropshipping Academy on LinkedIn"
              className="w-11 h-11 rounded-full border border-[#171412]/20 flex items-center justify-center text-[#171412] hover:bg-[#171412] hover:text-[#fbf9ef] transition-colors"
            >
              <SocialIconLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
