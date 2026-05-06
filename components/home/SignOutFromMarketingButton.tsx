'use client';

import { signOut } from 'next-auth/react';

export function SignOutFromMarketingButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/' })}
      className="nav-signout"
    >
      Sign out
    </button>
  );
}
