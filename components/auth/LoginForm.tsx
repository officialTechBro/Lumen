'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import type { LoginMode, LoginError } from '@/lib/types';

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

function EnvelopeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1F5041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

function Spinner() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
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

// ─── Form ─────────────────────────────────────────────────────────────────────

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<LoginError>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setLoginError(null);
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setLoginError('wrong-password');
      } else {
        router.push('/dashboard');
      }
    } catch {
      setLoginError('network');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleForgotSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setIsLoading(false);
    setMode('forgot-success');
  };

  // ── Forgot password success ──────────────────────────────────────────────
  if (mode === 'forgot-success') {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <EnvelopeIcon />
        </div>
        <h2 className="font-display text-[36px] font-medium tracking-[-0.025em] leading-[1.05] mb-3">
          Check your inbox.
        </h2>
        <p className="text-[15px] text-[var(--ink-soft)] leading-relaxed mb-8">
          We sent a link to <strong>{email}</strong>. It expires in 15 minutes.
        </p>
        <button
          type="button"
          className="bg-transparent border-none cursor-pointer text-[var(--forest)] text-sm font-medium p-0 hover:underline"
        >
          Resend the email
        </button>
      </div>
    );
  }

  // ── Forgot password form ──────────────────────────────────────────────────
  if (mode === 'forgot') {
    return (
      <form onSubmit={handleForgotSubmit} noValidate>
        <h2 className="fade font-display text-[36px] font-medium tracking-[-0.025em] leading-[1.05] mb-2">
          Reset your password.
        </h2>
        <p
          className="fade text-[15px] text-[var(--ink-soft)] mb-9"
          style={{ animationDelay: '0.06s' }}
        >
          We'll send a link to your email.
        </p>

        <div className="fade mb-6" style={{ animationDelay: '0.12s' }}>
          <label htmlFor="reset-email" className="block text-[13px] font-medium text-[var(--ink-soft)] mb-1.5">
            Email address
          </label>
          <input
            id="reset-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            autoComplete="email"
            className="auth-input"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="fade w-full py-[15px] bg-[var(--ink)] text-[var(--paper)] font-sans font-medium text-sm rounded-full border-none cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:bg-[var(--forest)] hover:-translate-y-px hover:shadow-[0_10px_24px_-10px_rgba(31,80,65,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            animationDelay: '0.18s',
            ...(isLoading ? { background: 'var(--forest)', pointerEvents: 'none' } : {}),
          }}
        >
          {isLoading ? (<>Sending… <Spinner /></>) : 'Send reset link →'}
        </button>

        <div className="fade text-center mt-5" style={{ animationDelay: '0.24s' }}>
          <button
            type="button"
            onClick={() => setMode('login')}
            className="bg-transparent border-none cursor-pointer text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] p-0"
          >
            ← Back to sign in
          </button>
        </div>
      </form>
    );
  }

  // ── Login form ────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleLoginSubmit} noValidate>

      {/* Heading */}
      <div className="fade mb-9">
        <h2 className="font-display text-[36px] font-medium tracking-[-0.025em] leading-[1.05] mb-2">
          Welcome back.
        </h2>
        <p className="text-[15px] text-[var(--ink-soft)]">
          Sign in to your Lumen account.
        </p>
      </div>

      {/* Email */}
      <div className="fade mb-4" style={{ animationDelay: '0.08s' }}>
        <label htmlFor="email" className="block text-[13px] font-medium text-[var(--ink-soft)] mb-1.5">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            if (loginError === 'unknown-email') setLoginError(null);
          }}
          placeholder="you@email.com"
          required
          autoComplete="email"
          className={`auth-input${loginError === 'unknown-email' ? ' auth-input-error' : ''}`}
        />
        {loginError === 'unknown-email' && (
          <p role="alert" className="text-[13px] text-[var(--coral)] mt-1.5 leading-snug">
            No account found with this email.{' '}
            <Link href="/signup" className="text-[var(--forest)] font-medium no-underline hover:underline">
              Sign up instead →
            </Link>
          </p>
        )}
      </div>

      {/* Password */}
      <div className="fade mb-2" style={{ animationDelay: '0.16s' }}>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="password" className="text-[13px] font-medium text-[var(--ink-soft)]">
            Password
          </label>
          <button
            type="button"
            onClick={() => setMode('forgot')}
            className="bg-transparent border-none cursor-pointer text-[13px] text-[var(--forest)] p-0 hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              if (loginError === 'wrong-password') setLoginError(null);
            }}
            required
            autoComplete="current-password"
            className={`auth-input pr-16${loginError === 'wrong-password' ? ' auth-input-error' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer font-mono text-[10px] font-medium tracking-[0.12em] text-[var(--ink-dim)] uppercase p-0 hover:text-[var(--ink)]"
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </button>
        </div>
        {loginError === 'wrong-password' && (
          <p role="alert" className="text-[13px] text-[var(--coral)] mt-1.5 leading-snug">
            Incorrect password. Try again or{' '}
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className="bg-transparent border-none cursor-pointer text-[var(--forest)] font-medium text-[13px] underline p-0"
            >
              reset it.
            </button>
          </p>
        )}
      </div>

      {/* Primary CTA */}
      <button
        type="submit"
        disabled={isLoading}
        className="fade w-full py-[15px] bg-[var(--ink)] text-[var(--paper)] font-sans font-medium text-sm rounded-full border-none cursor-pointer transition-all duration-200 mt-6 flex items-center justify-center gap-2 hover:bg-[var(--forest)] hover:-translate-y-px hover:shadow-[0_10px_24px_-10px_rgba(31,80,65,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          animationDelay: '0.24s',
          ...(isLoading ? { background: 'var(--forest)', pointerEvents: 'none' } : {}),
        }}
      >
        {isLoading ? (<>Signing in… <Spinner /></>) : 'Sign in →'}
      </button>

      {/* Network error */}
      {loginError === 'network' && (
        <p role="alert" className="text-[13px] text-[var(--coral)] text-center mt-3 px-3.5 py-2 bg-[var(--coral-soft)] rounded-full">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Or separator */}
      <div
        className="fade flex items-center gap-4 my-6 text-[13px] text-[var(--ink-dim)]"
        style={{ animationDelay: '0.32s' }}
      >
        <div className="flex-1 h-px bg-[var(--line-soft)]" />
        or
        <div className="flex-1 h-px bg-[var(--line-soft)]" />
      </div>

      {/* Google OAuth */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="fade w-full flex items-center justify-center gap-3 py-[15px] bg-[var(--paper)] border-[1.5px] border-[var(--line)] rounded-full font-sans font-semibold text-sm text-[var(--ink)] cursor-pointer transition-all duration-200 mb-8 hover:border-[var(--forest)] hover:-translate-y-px"
        style={{ animationDelay: '0.40s' }}
      >
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Switch to signup */}
      <p
        className="fade text-center text-[14px] text-[var(--ink-soft)]"
        style={{ animationDelay: '0.48s' }}
      >
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-[var(--forest)] font-medium no-underline hover:underline">
          Create one →
        </Link>
      </p>

    </form>
  );
}
