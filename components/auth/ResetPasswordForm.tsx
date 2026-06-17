'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPasswordStrength } from '@/lib/helpers';
import type { PasswordStrength } from '@/lib/types';

// ─── Icons ────────────────────────────────────────────────────────────────────

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

// ─── Strength bar ─────────────────────────────────────────────────────────────

function StrengthBar({ strength }: { strength: PasswordStrength }) {
  const segColors: Record<PasswordStrength, [string, string, string]> = {
    none:   ['var(--line-soft)', 'var(--line-soft)', 'var(--line-soft)'],
    weak:   ['var(--coral)',     'var(--line-soft)', 'var(--line-soft)'],
    fair:   ['#C8853A',          '#C8853A',          'var(--line-soft)'],
    strong: ['var(--leaf)',      'var(--leaf)',       'var(--leaf)'],
  };
  const label: Record<PasswordStrength, string> = { none: '', weak: 'weak', fair: 'fair', strong: 'strong' };

  return (
    <div className="flex items-center gap-2 mt-2">
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

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const strength = getPasswordStrength(password);
  const mismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      if (res.status === 429) {
        setError('Too many attempts. Please try again later.');
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      router.push('/login?reset=true');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="fade mb-9">
        <h2 className="font-display text-[36px] font-medium tracking-[-0.025em] leading-[1.05] mb-2">
          Choose a new password.
        </h2>
        <p className="text-[15px] text-[var(--ink-soft)]">
          Must be at least 8 characters.
        </p>
      </div>

      {/* New password */}
      <div className="fade mb-2" style={{ animationDelay: '0.08s' }}>
        <label htmlFor="password" className="block text-[13px] font-medium text-[var(--ink-soft)] mb-1.5">
          New password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => { setPassword(e.target.value); setError(null); }}
            required
            autoComplete="new-password"
            className="auth-input pr-16"
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
        <StrengthBar strength={strength} />
      </div>

      {/* Confirm password */}
      <div className="fade mb-6" style={{ animationDelay: '0.14s' }}>
        <label htmlFor="confirm-password" className="block text-[13px] font-medium text-[var(--ink-soft)] mb-1.5">
          Confirm new password
        </label>
        <div className="relative">
          <input
            id="confirm-password"
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={e => { setConfirmPassword(e.target.value); setError(null); }}
            required
            autoComplete="new-password"
            className={`auth-input pr-16${mismatch ? ' auth-input-error' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(v => !v)}
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer font-mono text-[10px] font-medium tracking-[0.12em] text-[var(--ink-dim)] uppercase p-0 hover:text-[var(--ink)]"
          >
            {showConfirm ? 'HIDE' : 'SHOW'}
          </button>
        </div>
        {mismatch && (
          <p role="alert" className="text-[13px] text-[var(--coral)] mt-1.5">
            Passwords do not match.
          </p>
        )}
      </div>

      {/* API error */}
      {error && (
        <p role="alert" className="text-[13px] text-[var(--coral)] text-center mb-4 px-3.5 py-2 bg-[var(--coral-soft)] rounded-full">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading || mismatch}
        className="fade w-full py-[15px] bg-[var(--ink)] text-[var(--paper)] font-sans font-medium text-sm rounded-full border-none cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:bg-[var(--forest)] hover:-translate-y-px hover:shadow-[0_10px_24px_-10px_rgba(31,80,65,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          animationDelay: '0.20s',
          ...(isLoading ? { background: 'var(--forest)', pointerEvents: 'none' } : {}),
        }}
      >
        {isLoading ? (<>Saving… <Spinner /></>) : 'Set new password →'}
      </button>
    </form>
  );
}
