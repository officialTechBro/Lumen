"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [currentError, setCurrentError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCurrentError(null);
    setFormError(null);
    setStatus("saving");

    try {
      const res = await fetch("/api/profile/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: current,
          newPassword: next,
          confirmPassword: confirm,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "Current password is incorrect") {
          setCurrentError(data.error);
        } else {
          setFormError(data.error ?? "Something went wrong");
        }
        setStatus("idle");
        return;
      }

      setCurrent("");
      setNext("");
      setConfirm("");
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setFormError("Network error. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <form className="sett-pw-form" onSubmit={handleSubmit}>
      <div className="sett-field">
        <label className="sett-label" htmlFor="current-pw">
          Current password
        </label>
        <div className="sett-pw-wrap">
          <input
            id="current-pw"
            type={showCurrent ? "text" : "password"}
            className={`sett-input${currentError ? " sett-input-err" : ""}`}
            value={current}
            onChange={(e) => { setCurrent(e.target.value); setCurrentError(null); }}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="sett-show"
            onClick={() => setShowCurrent((v) => !v)}
          >
            {showCurrent ? "HIDE" : "SHOW"}
          </button>
        </div>
        {currentError && (
          <span className="sett-feedback sett-feedback-err">{currentError}</span>
        )}
      </div>

      <div className="sett-field">
        <label className="sett-label" htmlFor="new-pw">
          New password
        </label>
        <div className="sett-pw-wrap">
          <input
            id="new-pw"
            type={showNext ? "text" : "password"}
            className="sett-input"
            value={next}
            onChange={(e) => { setNext(e.target.value); setFormError(null); }}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="sett-show"
            onClick={() => setShowNext((v) => !v)}
          >
            {showNext ? "HIDE" : "SHOW"}
          </button>
        </div>
      </div>

      <div className="sett-field">
        <label className="sett-label" htmlFor="confirm-pw">
          Confirm new password
        </label>
        <input
          id="confirm-pw"
          type="password"
          className="sett-input"
          value={confirm}
          onChange={(e) => { setConfirm(e.target.value); setFormError(null); }}
          autoComplete="new-password"
        />
      </div>

      {formError && (
        <p className="sett-feedback sett-feedback-err">{formError}</p>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
        <button
          type="submit"
          className="btn btn-secondary"
          disabled={status === "saving" || !current || !next || !confirm}
        >
          {status === "saving" ? "Updating…" : "Update password"}
        </button>
        {status === "saved" && (
          <span className="sett-feedback sett-feedback-ok">Password updated.</span>
        )}
      </div>
    </form>
  );
}
