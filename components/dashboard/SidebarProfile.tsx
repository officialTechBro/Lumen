'use client';

import { useEffect, useRef, useState } from 'react';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { SignOutButton } from '@/components/dashboard/SignOutButton';

type SidebarProfileProps = {
  image: string | null;
  fullName: string | null;
  email: string | null;
  isPro: boolean;
};

export default function SidebarProfile({ image, fullName, email, isPro }: SidebarProfileProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const firstName = fullName?.split(' ')[0] ?? 'Account';
  const planLabel = isPro ? 'Lumen+' : 'Free plan';

  return (
    <div className="profile-wrap" ref={wrapRef}>
      {open && (
        <div className="profile-popup" role="dialog" aria-label="Profile menu">
          <div className="popup-user">
            <UserAvatar image={image} fullName={fullName} size={36} />
            <div className="popup-info">
              <div className="popup-name">{fullName ?? 'My Account'}</div>
              <div className="popup-email">{email}</div>
            </div>
          </div>
          <div className="popup-plan-badge">{planLabel}</div>
          <div className="popup-divider" />
          <SignOutButton />
        </div>
      )}
      <button
        className={`profile${open ? ' open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        type="button"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        <UserAvatar image={image} fullName={fullName} size={32} />
        <div>
          <div className="name">{firstName}</div>
          <div className="plan">{planLabel}</div>
        </div>
      </button>
    </div>
  );
}
