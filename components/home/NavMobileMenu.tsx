"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/nav-links";

export function NavMobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="flex min-[860px]:hidden h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-150 hover:bg-secondary hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Slide-down mobile menu */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={[
          "absolute left-0 right-0 top-full overflow-hidden",
          "border-b border-line-soft min-[860px]:hidden",
          "transition-all duration-300 ease-in-out",
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ background: "var(--nav-mobile-bg)", backdropFilter: "blur(10px) saturate(140%)" }}
      >
        <nav aria-label="Mobile navigation">
          <ul className="list-none m-0 p-0">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} className="border-b border-line-soft last:border-b-0">
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block px-8 py-4 text-[15px] text-ink-soft transition-colors duration-150 hover:text-ink hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-forest"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between px-8 py-5 border-t border-line">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Sign in
            </Link>
            <Link
              href="#upload"
              onClick={() => setOpen(false)}
              aria-label="Upload a lab report"
              className="group flex items-center gap-[10px] rounded-full bg-ink px-5 py-3 text-[14px] font-medium text-paper transition-all duration-200 hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Upload a report
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]"
              >
                →
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
