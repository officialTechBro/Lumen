"use client";

import { useState } from "react";
import type { NotificationPrefs } from "@/lib/db/profile";

type Props = {
  initialPrefs: NotificationPrefs;
};

type Toggle = {
  key: keyof NotificationPrefs;
  label: string;
  description: string;
};

const TOGGLES: Toggle[] = [
  {
    key: "flaggedMarkerReminders",
    label: "Flagged marker reminders",
    description: "We'll remind you when a flag hasn't been followed up on.",
  },
  {
    key: "monthlyCheckInNudge",
    label: "Monthly check-in nudge",
    description: "A gentle reminder to upload when it's been a while.",
  },
  {
    key: "productUpdates",
    label: "Product updates",
    description: "New features, improvements, and announcements.",
  },
];

export default function NotificationToggles({ initialPrefs }: Props) {
  const [prefs, setPrefs] = useState<NotificationPrefs>(initialPrefs);

  async function handleToggle(key: keyof NotificationPrefs) {
    const prev = prefs[key];
    const next = !prev;

    setPrefs((p) => ({ ...p, [key]: next }));

    try {
      const res = await fetch("/api/profile/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: next }),
      });

      if (!res.ok) {
        setPrefs((p) => ({ ...p, [key]: prev }));
      }
    } catch {
      setPrefs((p) => ({ ...p, [key]: prev }));
    }
  }

  return (
    <div className="sett-toggles">
      {TOGGLES.map((t) => (
        <div key={t.key} className="sett-toggle-row">
          <div className="sett-toggle-info">
            <span className="sett-toggle-label">{t.label}</span>
            <span className="sett-toggle-desc">{t.description}</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={prefs[t.key]}
            className={`toggle-track${prefs[t.key] ? " on" : ""}`}
            onClick={() => handleToggle(t.key)}
          >
            <span className="toggle-thumb" />
          </button>
        </div>
      ))}
    </div>
  );
}
