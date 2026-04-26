'use client';

import { useEffect, useRef, useState } from 'react';
import { MOCK_USER } from '@/lib/mock-data';
import { getInitials } from '@/lib/helpers';

export default function SidebarProfile() {
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

  const initials = getInitials(MOCK_USER.fullName);
  const firstName = MOCK_USER.fullName.split(' ')[0];
  const planLabel = MOCK_USER.isPro ? 'Annual plan' : 'Free plan';

  return (
    <div className="profile-wrap" ref={wrapRef}>
      {open && (
        <div className="profile-popup" role="dialog" aria-label="Profile menu">
          <div className="popup-user">
            <div className="popup-avatar">{initials}</div>
            <div className="popup-info">
              <div className="popup-name">{MOCK_USER.fullName}</div>
              <div className="popup-email">{MOCK_USER.email}</div>
            </div>
          </div>
          <div className="popup-plan-badge">{planLabel}</div>
          <div className="popup-divider" />
          <button className="popup-signout" type="button">
            Sign out
          </button>
        </div>
      )}
      <button
        className={`profile${open ? ' open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        type="button"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        <div className="avatar">{initials}</div>
        <div>
          <div className="name">{firstName}</div>
          <div className="plan">{planLabel}</div>
        </div>
      </button>
    </div>
  );
}
