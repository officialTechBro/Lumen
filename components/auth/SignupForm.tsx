'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { getPasswordStrength, isValidEmail } from '@/lib/helpers';
import type { PasswordStrength, FormState, EmailValidation } from '@/lib/types';

// ─── Icons ────────────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.636-7 10-7 10 7 10 7-3.636 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m2 2 20 20M6.7 6.7A9.9 9.9 0 0 0 2 12s3.636 7 10 7a9.9 9.9 0 0 0 5.3-1.7M10.6 5.1A9.1 9.1 0 0 1 12 5c6.364 0 10 7 10 7a16.4 16.4 0 0 1-2.407 3.594M14 14a3 3 0 0 1-4-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Spinner() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--paper)]"
          style={{ animation: 'dotPulse 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  );
}

// ─── Strength Bar ─────────────────────────────────────────────────────────────

function StrengthBar({ strength }: { strength: PasswordStrength }) {
  const segColors: Record<PasswordStrength, [string, string, string]> = {
    none:   ['var(--line-soft)', 'var(--line-soft)', 'var(--line-soft)'],
    weak:   ['var(--coral)',     'var(--line-soft)', 'var(--line-soft)'],
    fair:   ['#C8853A',          '#C8853A',          'var(--line-soft)'],
    strong: ['var(--leaf)',      'var(--leaf)',       'var(--leaf)'],
  };
  const label: Record<PasswordStrength, string> = { none: '', weak: 'weak', fair: 'fair', strong: 'strong' };

  return (
    <div className="flex items-center gap-2 mt-2 mb-6">
      <div className="flex flex-1 gap-1">
        {segColors[strength].map((bg, i) => (
          <div key={i} className="flex-1 h-[3px] rounded-full transition-[background] duration-200" style={{ background: bg }} />
        ))}
      </div>
      {strength !== 'none' && (
        <span className="font-mono text-[11px] text-[var(--ink-dim)] min-w-[32px]">
          {label[strength]}
        </span>
      )}
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

export function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [emailVal, setEmailVal] = useState<EmailValidation>({ status: 'idle' });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const strength = getPasswordStrength(password);

  const handleEmailBlur = useCallback(async () => {
    if (!email) { setEmailVal({ status: 'idle' }); return; }
    if (!isValidEmail(email)) { setEmailVal({ status: 'invalid' }); return; }

    try {
      const res = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setEmailVal(data.available ? { status: 'valid' } : { status: 'taken' });
    } catch {
      // Network error — fall back to valid so we don't block the user
      setEmailVal({ status: 'valid' });
    }
  }, [email]);

  const handleGoogleSignUp = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState === 'loading') return;

    setFormError(null);
    setFormState('loading');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, confirmPassword: password }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setEmailVal({ status: 'taken' });
        setFormState('idle');
        return;
      }

      if (!res.ok) {
        setFormError(data.error ?? 'Something went wrong. Please try again.');
        setFormState('idle');
        return;
      }

      // Redirect to verify-email holding page — user must click the link before accessing dashboard
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch {
      setFormError('Something went wrong. Please try again.');
      setFormState('idle');
    }
  };

  const isError = emailVal.status === 'invalid' || emailVal.status === 'taken';

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Headline */}
      <h1 className="font-display text-[32px] font-medium tracking-[-0.025em] leading-[1.1] mb-8">
        Start understanding<br />
        your{' '}
        <em className="not-italic font-light text-[var(--forest)] italic">results.</em>
      </h1>

      {/* Google OAuth */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="w-full flex items-center justify-center gap-3 py-[15px] bg-[var(--paper)] border-[1.5px] border-[var(--line)] rounded-full font-sans font-semibold text-sm text-[var(--ink)] cursor-pointer transition-all duration-200 mb-6 hover:border-[var(--forest)] hover:-translate-y-px"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Or separator */}
      <div className="flex items-center gap-4 mb-6 text-xs text-[var(--ink-dim)]">
        <div className="flex-1 h-px bg-[var(--line-soft)]" />
        or sign up with email
        <div className="flex-1 h-px bg-[var(--line-soft)]" />
      </div>

      {/* Full name */}
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-[13px] font-medium text-[var(--ink-soft)] mb-1.5">
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="Sarah Chen"
          required
          autoComplete="name"
          className="auth-input"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-[13px] font-medium text-[var(--ink-soft)] mb-1.5">
          Email address
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setEmailVal({ status: 'idle' }); }}
            onBlur={handleEmailBlur}
            placeholder="you@email.com"
            required
            autoComplete="email"
            className={`auth-input ${isError ? 'auth-input-error' : ''} ${emailVal.status === 'valid' ? 'pr-10' : ''}`}
          />
          {emailVal.status === 'valid' && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--leaf)]">
              <CheckIcon />
            </span>
          )}
        </div>
        {emailVal.status === 'invalid' && (
          <p role="alert" className="text-[13px] text-[var(--coral)] mt-1.5 leading-snug">
            Enter a valid email address.
          </p>
        )}
        {emailVal.status === 'taken' && (
          <p role="alert" className="text-[13px] text-[var(--coral)] mt-1.5 leading-snug">
            An account with this email exists.{' '}
            <Link href="/login" className="text-[var(--forest)] font-medium no-underline hover:underline">
              Sign in instead →
            </Link>
          </p>
        )}
      </div>

      {/* Password */}
      <div className="mb-2">
        <label htmlFor="password" className="block text-[13px] font-medium text-[var(--ink-soft)] mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="auth-input pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[var(--ink-dim)] p-0 flex items-center"
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
        <p className="text-xs text-[var(--ink-dim)] mt-1.5">At least 8 characters</p>
      </div>

      <StrengthBar strength={strength} />

      {/* Form-level error */}
      {formError && (
        <p role="alert" className="text-[13px] text-[var(--coral)] text-center mb-4 px-3.5 py-2 bg-[var(--coral-soft)] rounded-full">
          {formError}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === 'loading'}
        className="w-full py-[15px] bg-[var(--ink)] text-[var(--paper)] font-sans font-medium text-sm rounded-full border-none cursor-pointer transition-all duration-200 mt-6 flex items-center justify-center gap-2 hover:bg-[var(--forest)] hover:-translate-y-px hover:shadow-[0_10px_24px_-10px_rgba(31,80,65,0.35)] disabled:bg-[var(--ink-faint)] disabled:cursor-not-allowed"
        style={formState === 'loading' ? { background: 'var(--forest)' } : undefined}
      >
        {formState === 'loading' ? (
          <>Creating your account… <Spinner /></>
        ) : (
          'Create free account →'
        )}
      </button>

      {/* Legal */}
      <p className="text-center text-xs text-[var(--ink-dim)] mt-4 leading-relaxed">
        By creating an account you agree to our{' '}
        <Link href="/terms" className="text-[var(--forest)] no-underline hover:underline">
          Terms of Service
        </Link>
        {' '}and{' '}
        <Link href="/privacy" className="text-[var(--forest)] no-underline hover:underline">
          Privacy Policy.
        </Link>
      </p>
    </form>
  );
}
