import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isSupabaseConfigured } from '../lib/supabase';
import {
  otpSchema,
  waitlistStep1Schema,
  WaitlistFormValues,
} from '../schemas/waitlist';
import {
  consumeHeroEmailPrefill,
  loadWaitlistDraft,
  maskEmailAddress,
  saveWaitlistDraft,
  sendEmailVerificationOtp,
  verifyEmailOtpAndInsertWaitlist,
} from '../services/waitlist';
import { Button } from '../components/Button';
import { DatePicker } from '../components/DatePicker';
import { Input } from '../components/Input';
import { OtpInput } from '../components/OtpInput';
import { PhoneInput } from '../components/PhoneInput';
import {
  AlertCircleSvgIcon,
  ArrowRightSvgIcon,
  CheckSvgIcon,
} from '../components/svg/NavIcons';

const INITIAL_VALUES: WaitlistFormValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phone: '',
  whatsapp: '',
  sameAsPhone: false,
  email: '',
  consentAccepted: false,
  honeypot: '',
};

export const JoinWaitlistPage: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<WaitlistFormValues>(() => {
    const saved = loadWaitlistDraft();
    const heroEmail = consumeHeroEmailPrefill();
    if (saved) {
      return {
        ...saved,
        email: heroEmail || saved.email,
      };
    }
    return {
      ...INITIAL_VALUES,
      email: heroEmail || '',
    };
  });

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof WaitlistFormValues, string>>
  >({});
  const [step1GlobalError, setStep1GlobalError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Step 2 state
  const [otpToken, setOtpToken] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpStatusMsg, setOtpStatusMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);

  // Persist form draft to sessionStorage whenever formData changes
  useEffect(() => {
    saveWaitlistDraft(formData);
  }, [formData]);

  // Sync WhatsApp when "Same as phone number" is checked
  useEffect(() => {
    if (formData.sameAsPhone && formData.whatsapp !== formData.phone) {
      setFormData((prev) => ({
        ...prev,
        whatsapp: prev.phone,
      }));
    }
  }, [formData.sameAsPhone, formData.phone]);

  // 60-second countdown timer on Step 2
  useEffect(() => {
    if (step !== 2 || resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, resendCooldown]);

  const updateField = <K extends keyof WaitlistFormValues>(
    field: K,
    value: WaitlistFormValues[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (step1GlobalError) setStep1GlobalError('');
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSendingOtp) return;

    setStep1GlobalError('');
    const effectiveData: WaitlistFormValues = {
      ...formData,
      whatsapp: formData.sameAsPhone ? formData.phone : formData.whatsapp,
    };

    const parsed = waitlistStep1Schema.safeParse(effectiveData);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof WaitlistFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof WaitlistFormValues | undefined;
        if (key && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    setIsSendingOtp(true);

    const result = await sendEmailVerificationOtp(
      parsed.data.email,
      parsed.data.honeypot
    );

    setIsSendingOtp(false);

    if (!result.success) {
      setStep1GlobalError(
        result.error || 'Could not send verification code. Please try again.'
      );
      return;
    }

    setFormData(parsed.data);
    saveWaitlistDraft(parsed.data);
    setOtpToken('');
    setOtpError('');
    setOtpStatusMsg('');
    setResendCooldown(60);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isVerifying) return;

    setOtpError('');
    setOtpStatusMsg('');

    const parsedOtp = otpSchema.safeParse({ token: otpToken });
    if (!parsedOtp.success) {
      setOtpError(
        parsedOtp.error.issues[0]?.message ||
          'Please enter the 6-digit verification code.'
      );
      return;
    }

    setIsVerifying(true);
    const result = await verifyEmailOtpAndInsertWaitlist(
      parsedOtp.data.token,
      formData
    );
    setIsVerifying(false);

    if (!result.success) {
      setOtpError(
        result.error ||
          'Invalid or expired code. Please check your email and try again.'
      );
      return;
    }

    navigate('/waitlist-confirmed', {
      replace: true,
      state: {
        alreadyOnWaitlist: Boolean(result.alreadyOnWaitlist),
      },
    });
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || isResending) return;

    setOtpError('');
    setOtpStatusMsg('');
    setIsResending(true);

    const result = await sendEmailVerificationOtp(
      formData.email,
      formData.honeypot
    );
    setIsResending(false);

    if (!result.success) {
      setOtpError(
        result.error || 'Unable to resend code right now. Please wait a moment.'
      );
      return;
    }

    setResendCooldown(60);
    setOtpStatusMsg('A fresh 6-digit verification code has been sent to your email.');
  };

  return (
    <main id="main-content" className="py-10 md:py-16 lg:py-20">
      <div className="specimen-container max-w-3xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 text-[13px] font-bold text-[#813502] mb-3">
            <span>Waitlist Application</span>
            <span aria-live="polite" className="tabular-nums">
              Step {step} of 2
            </span>
          </div>

          {/* Progress Bar */}
          <div
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={2}
            aria-label={`Waitlist registration progress: Step ${step} of 2`}
            className="w-full h-2.5 rounded-full bg-[#ebe9df] overflow-hidden border border-[#171412]/20"
          >
            <div
              className={`h-full bg-[#ff7722] transition-all duration-300 ${
                step === 1 ? 'w-1/2' : 'w-full'
              }`}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-[12px] bg-[#f2f0e7] border-2 border-[#171412] p-6 sm:p-10">
          {step === 1 ? (
            <>
              <h1 className="font-display text-[36px] sm:text-[48px] font-extrabold text-[#171412] leading-[0.9] tracking-[-0.04em] mb-3">
                Join the waitlist.
              </h1>
              <p className="text-[16px] text-[#171412]/85 leading-[1.4] mb-8">
                Enter your contact details below. We will send a 6-digit verification
                code to your email to lock in your spot.
              </p>

              {step1GlobalError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mb-6 p-4 rounded-[12px] bg-[#fff8f8] border-2 border-[#ff3c34] text-[#ff3c34] text-[14px] font-semibold flex items-start gap-2.5"
                >
                  <AlertCircleSvgIcon className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{step1GlobalError}</span>
                </div>
              )}

              <form onSubmit={handleStep1Submit} noValidate className="flex flex-col gap-6">
                {/* Hidden Honeypot Field for Anti-Bot Protection */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="website_url">Website URL (Leave blank)</label>
                  <input
                    id="website_url"
                    name="website_url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot || ''}
                    onChange={(e) => updateField('honeypot', e.target.value)}
                  />
                </div>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    id="firstName"
                    label="First name"
                    required
                    autoComplete="given-name"
                    placeholder="e.g. Tanvir"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    error={fieldErrors.firstName}
                  />

                  <Input
                    id="lastName"
                    label="Last name"
                    required
                    autoComplete="family-name"
                    placeholder="e.g. Hasan"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    error={fieldErrors.lastName}
                  />
                </div>

                {/* Date of Birth (Custom Accessible Popover + DD/MM/YYYY Input) */}
                <DatePicker
                  id="dateOfBirth"
                  label="Date of birth"
                  required
                  hint="Type DD/MM/YYYY or use the calendar picker. You must be at least 18 years old."
                  value={formData.dateOfBirth}
                  onChange={(iso) => updateField('dateOfBirth', iso)}
                  error={fieldErrors.dateOfBirth}
                />

                {/* Phone Number */}
                <PhoneInput
                  id="phone"
                  label="Phone number"
                  required
                  hint="Select your country code and enter your mobile number."
                  value={formData.phone}
                  onChange={(e164) => updateField('phone', e164)}
                  error={fieldErrors.phone}
                />

                {/* WhatsApp Number + "Same as phone number" Checkbox */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[13px] font-bold text-[#813502]">
                      We send cohort opening alerts via WhatsApp
                    </span>

                    <label
                      htmlFor="sameAsPhone"
                      className="min-h-[44px] inline-flex items-center gap-2.5 text-[14px] font-bold text-[#171412] cursor-pointer select-none"
                    >
                      <input
                        id="sameAsPhone"
                        type="checkbox"
                        checked={formData.sameAsPhone}
                        onChange={(e) =>
                          updateField('sameAsPhone', e.target.checked)
                        }
                        className="w-5 h-5 rounded-[4px] accent-[#ff7722] cursor-pointer"
                      />
                      <span>Same as phone number</span>
                    </label>
                  </div>

                  <PhoneInput
                    id="whatsapp"
                    label="WhatsApp number"
                    required
                    disabled={formData.sameAsPhone}
                    value={formData.sameAsPhone ? formData.phone : formData.whatsapp}
                    onChange={(e164) => updateField('whatsapp', e164)}
                    error={fieldErrors.whatsapp}
                  />
                </div>

                {/* Email Address */}
                <Input
                  id="email"
                  label="Email address"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  hint="We will send a 6-digit verification code to this address."
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  error={fieldErrors.email}
                />

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label
                    htmlFor="consentAccepted"
                    className="flex items-start gap-3 cursor-pointer select-none"
                  >
                    <input
                      id="consentAccepted"
                      type="checkbox"
                      checked={formData.consentAccepted}
                      onChange={(e) =>
                        updateField('consentAccepted', e.target.checked)
                      }
                      aria-invalid={fieldErrors.consentAccepted ? 'true' : 'false'}
                      aria-describedby={
                        fieldErrors.consentAccepted ? 'consent-error' : undefined
                      }
                      className="w-5 h-5 mt-0.5 rounded-[4px] accent-[#ff7722] shrink-0 cursor-pointer"
                    />
                    <span className="text-[14px] text-[#171412] leading-[1.4]">
                      I agree to the{' '}
                      <Link
                        to="/terms"
                        className="font-bold underline underline-offset-2 hover:text-[#813502]"
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        to="/privacy"
                        className="font-bold underline underline-offset-2 hover:text-[#813502]"
                      >
                        Privacy Policy
                      </Link>
                      , and consent to receive waitlist updates via email and WhatsApp.
                      <span className="text-[#813502] ml-1" aria-hidden="true">
                        *
                      </span>
                    </span>
                  </label>

                  {fieldErrors.consentAccepted && (
                    <div
                      id="consent-error"
                      role="alert"
                      aria-live="polite"
                      className="flex items-start gap-1.5 text-[13px] font-semibold text-[#ff3c34] mt-2"
                    >
                      <AlertCircleSvgIcon className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{fieldErrors.consentAccepted}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="orange"
                    size="lg"
                    isLoading={isSendingOtp}
                    loadingText="Sending verification code..."
                    className="w-full sm:w-auto"
                  >
                    <span>Send verification code</span>
                    <ArrowRightSvgIcon className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            /* =================================================================
               STEP 2: VERIFY EMAIL WITH 6-DIGIT OTP
            ================================================================= */
            <div>
              <h1 className="font-display text-[36px] sm:text-[48px] font-extrabold text-[#171412] leading-[0.9] tracking-[-0.04em] mb-3">
                Verify your email.
              </h1>

              <p className="text-[16px] text-[#171412]/90 leading-[1.4] mb-2">
                We sent a 6-digit code to{' '}
                <strong className="font-bold text-[#171412]">
                  {maskEmailAddress(formData.email)}
                </strong>
                .
              </p>

              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtpError('');
                    setOtpStatusMsg('');
                  }}
                  className="min-h-[44px] inline-flex items-center text-[13px] font-bold text-[#813502] underline underline-offset-4 hover:text-[#171412] cursor-pointer"
                >
                  Change email address
                </button>
              </div>

              {!isSupabaseConfigured && (
                <div
                  role="status"
                  className="mb-6 p-4 rounded-[12px] bg-[#ffc765]/35 border border-[#171412]/30 text-[13px] text-[#171412]"
                >
                  <strong>Preview Mode Active:</strong> Supabase environment variables
                  (<code className="font-mono">VITE_SUPABASE_URL</code> &amp;{' '}
                  <code className="font-mono">VITE_SUPABASE_ANON_KEY</code>) are not yet
                  configured. Enter any 6-digit code (e.g. <strong>123456</strong>) to
                  complete verification.
                </div>
              )}

              {otpStatusMsg && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-6 p-4 rounded-[12px] bg-[#fbf9ef] border-2 border-[#171412] text-[14px] font-bold text-[#171412] flex items-center gap-2.5"
                >
                  <CheckSvgIcon className="w-5 h-5 text-[#813502] shrink-0" />
                  <span>{otpStatusMsg}</span>
                </div>
              )}

              <form onSubmit={handleStep2Verify} noValidate className="flex flex-col gap-6">
                <OtpInput
                  value={otpToken}
                  onChange={(val) => {
                    setOtpToken(val);
                    if (otpError) setOtpError('');
                  }}
                  disabled={isVerifying}
                  error={otpError}
                />

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    type="submit"
                    variant="orange"
                    size="lg"
                    isLoading={isVerifying}
                    loadingText="Verifying code..."
                  >
                    <span>Verify</span>
                    <ArrowRightSvgIcon className="w-4 h-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={resendCooldown > 0 || isResending}
                    isLoading={isResending}
                    loadingText="Resending..."
                    onClick={handleResendCode}
                  >
                    {resendCooldown > 0 ? (
                      <span className="tabular-nums">
                        Resend code in {resendCooldown}s
                      </span>
                    ) : (
                      <span>Resend code</span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
