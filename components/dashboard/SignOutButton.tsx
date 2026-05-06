'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      type="button"
      className="signout-btn"
      onClick={() => signOut({ callbackUrl: '/login' })}
      title="Sign out"
      aria-label="Sign out"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
        <path d="M10 11l3-3-3-3" />
        <path d="M13 8H6" />
      </svg>
    </button>
  );
}
