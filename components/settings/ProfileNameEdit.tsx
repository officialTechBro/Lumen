"use client";

import { useState } from "react";

type Props = {
  initialName: string | null;
};

export default function ProfileNameEdit({ initialName }: Props) {
  const [name, setName] = useState(initialName ?? "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setStatus("saving");
    setError(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        setStatus("idle");
        return;
      }

      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setError("Network error. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <div className="sett-field">
      <label className="sett-label" htmlFor="full-name">
        Full name
      </label>
      <div className="sett-input-row">
        <input
          id="full-name"
          type="text"
          className="sett-input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setStatus("idle");
            setError(null);
          }}
          maxLength={100}
          autoComplete="name"
        />
        <button
          type="button"
          className="btn btn-secondary sett-save-btn"
          onClick={handleSave}
          disabled={status === "saving" || name.trim() === (initialName ?? "")}
        >
          {status === "saving" ? "Saving…" : "Save"}
        </button>
      </div>
      {status === "saved" && (
        <span className="sett-feedback sett-feedback-ok">Saved.</span>
      )}
      {error && (
        <span className="sett-feedback sett-feedback-err">{error}</span>
      )}
    </div>
  );
}
