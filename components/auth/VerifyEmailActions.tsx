'use client'

import { useState } from 'react'

interface Props {
  email?: string
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
  )
}

export function VerifyEmailActions({ email }: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [inputEmail, setInputEmail] = useState(email ?? '')

  const handleResend = async () => {
    if (state === 'loading') return
    const target = inputEmail.trim()
    if (!target) return

    setState('loading')
    try {
      await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: target }),
      })
      setState('sent')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="text-center">
        <p className="text-[14px] text-[var(--leaf)] font-medium mb-1">Email sent.</p>
        <p className="text-[13px] text-[var(--ink-dim)]">
          Check your inbox for a new verification link.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {!email && (
        <input
          type="email"
          value={inputEmail}
          onChange={e => setInputEmail(e.target.value)}
          placeholder="your@email.com"
          className="auth-input text-center"
        />
      )}

      <button
        type="button"
        onClick={handleResend}
        disabled={state === 'loading' || !inputEmail.trim()}
        className="w-full py-[14px] bg-[var(--ink)] text-[var(--paper)] font-sans font-medium text-sm rounded-full border-none cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:bg-[var(--forest)] hover:-translate-y-px hover:shadow-[0_10px_24px_-10px_rgba(31,80,65,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
        style={state === 'loading' ? { background: 'var(--forest)', pointerEvents: 'none' } : undefined}
      >
        {state === 'loading' ? (<>Sending… <Spinner /></>) : 'Resend verification email'}
      </button>

      {state === 'error' && (
        <p className="text-[13px] text-[var(--coral)] text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}
