"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

const CONFIRM_PHRASE = "delete my account";

export default function DeleteAccountSection() {
  const [confirmMode, setConfirmMode] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (confirmText !== CONFIRM_PHRASE) return;
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch("/api/profile", { method: "DELETE" });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong");
        setDeleting(false);
        return;
      }

      await signOut({ callbackUrl: "/" });
    } catch {
      setError("Network error. Please try again.");
      setDeleting(false);
    }
  }

  return (
    <div className="danger-zone">
      <p className="sett-eyebrow" style={{ marginBottom: 16, color: "var(--coral)" }}>DANGER ZONE</p>

      {!confirmMode ? (
        <div className="danger-row">
          <div>
            <p className="sett-toggle-label">Delete account</p>
            <p className="sett-toggle-desc">
              This permanently deletes all your reports, markers, and data. Cannot be undone.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-danger-outline"
            onClick={() => setConfirmMode(true)}
          >
            Delete account
          </button>
        </div>
      ) : (
        <div className="delete-confirm">
          <p className="sett-toggle-desc" style={{ marginBottom: 12 }}>
            Type <strong>delete my account</strong> to confirm.
          </p>
          <input
            type="text"
            placeholder="delete my account"
            className="sett-input"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            autoFocus
          />
          {error && (
            <p className="sett-feedback sett-feedback-err" style={{ marginTop: 8 }}>{error}</p>
          )}
          <div className="confirm-btns">
            <button
              type="button"
              className="btn btn-danger"
              disabled={confirmText !== CONFIRM_PHRASE || deleting}
              onClick={handleDelete}
            >
              {deleting ? "Deleting…" : "Permanently delete"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => { setConfirmMode(false); setConfirmText(""); setError(null); }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
