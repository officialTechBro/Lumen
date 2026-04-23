import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav-links";
import { ThemeToggle } from "./ThemeToggle";
import { NavMobileMenu } from "./NavMobileMenu";

export function Navigation() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-line-soft"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "blur(10px) saturate(140%)",
      }}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-8">
        {/* Brand */}
        <Link
          href="/"
          aria-label="Lumen — home"
          className="flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="11" cy="11" r="10" className="stroke-forest" strokeWidth="1.5" />
            <path d="M6 11 Q 11 5, 16 11 T 6 11" className="fill-forest" />
          </svg>
          <span className="font-display text-[22px] font-medium tracking-[-0.02em] text-ink">
            Lumen
          </span>
        </Link>

        {/* Nav links — hidden below 860px */}
        <nav aria-label="Main navigation">
          <ul className="hidden min-[860px]:flex items-center gap-9 list-none m-0 p-0">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right zone */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Sign in — desktop only; also appears inside mobile menu */}
          <Link
            href="/sign-in"
            className="hidden min-[860px]:block text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Sign in
          </Link>

          {/* Primary CTA — desktop only; also appears inside mobile menu */}
          <Link
            href="#upload"
            aria-label="Upload a lab report"
            className="group hidden min-[860px]:flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-[14px] font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest hover:shadow-[0_8px_24px_-8px_rgba(31,80,65,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Upload a report
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]"
            >
              →
            </span>
          </Link>

          {/* Hamburger — mobile only */}
          <NavMobileMenu />
        </div>
      </div>
    </header>
  );
}
