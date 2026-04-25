# 01 — Login Page

The returning-user authentication screen. Split two-column layout: a brand/reassurance panel on the left, a focused login form on the right. Inspired by Linear's auth approach — calm, editorial, never generic.

---

## Purpose

- Get a returning user authenticated in the fewest possible steps
- Reassure them they're in the right place with a quote and three product stats
- Surface Google OAuth prominently but after email (returning users remember how they signed up)
- Login route at /login

---

## Full-page layout

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────┐  │
│  │                             │  │                                 │  │
│  │  LEFT COLUMN                │  │  RIGHT COLUMN                   │  │
│  │  Paper-warm bg · ~50%       │  │  Paper bg · ~50%                │  │
│  │  full viewport height       │  │                                 │  │
│  │                             │  │  Welcome back.                  │  │
│  │  ◉ Lumen  (top-left)        │  │  Sign in to your Lumen account. │  │
│  │                             │  │                                 │  │
│  │  [vertically centered]      │  │  Email address                  │  │
│  │                             │  │  [                         ]    │  │
│  │  SINCE FEB 2024             │  │                                 │  │
│  │  Your health,               │  │  Password           [SHOW]      │  │
│  │  in plain English.          │  │  [                         ]    │  │
│  │                             │  │  Forgot password?               │  │
│  │  Lab results explained...   │  │                                 │  │
│  │                             │  │  [Sign in →                ]    │  │
│  │  ──────────────             │  │                                 │  │
│  │                             │  │  ─── or ───                     │  │
│  │  94 panels  11 sec  MD+PhD  │  │                                 │  │
│  │                             │  │  [G  Continue with Google  ]    │  │
│  │  ──────────────             │  │                                 │  │
│  │                             │  │  Don't have an account?         │  │
│  │  "My LDL had been rising    │  │  Create one →                   │  │
│  │  for two years. Nobody      │  │                                 │  │
│  │  told me."                  │  │                                 │  │
│  │  — MARCO D. · BROOKLYN      │  │                                 │  │
│  │                             │  │                                 │  │
│  │  [footer: HIPAA · Encrypted]│  │                                 │  │
│  └─────────────────────────────┘  └─────────────────────────────────┘  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Shell CSS
```css
body {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--paper);
}

@media (max-width: 860px) {
  body { grid-template-columns: 1fr; }
  .left-col { display: none; }
}
```

---

## LEFT COLUMN — Brand panel

### Container (`.left-col`)
```css
.left-col {
  background: var(--paper-warm);          /* #EFEADF */
  border-right: 1px solid var(--line-soft);
  padding: 48px 56px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: sticky;
  top: 0;
}
```

### 1. Brand lockup (top-left, not centered)

```css
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--ink);
  text-decoration: none;
}
```

- SVG mark: 22×22 — circle `cx=11 cy=11 r=10`, stroke Forest `#1F5041` strokeWidth 1.5 + wave path `M6 11 Q 11 5, 16 11 T 6 11` fill Forest
- Wordmark: "Lumen" in Newsreader 500
- Links back to marketing homepage (`href="/"`)

### 2. Main copy block (`margin-top: auto; margin-bottom: auto` — vertically centered)

```css
.left-copy {
  margin: auto 0;
  max-width: 420px;
}
```

**Eyebrow:**
```css
.eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--forest);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 24px;
}
```
Content: `SINCE FEB 2024`

**Headline (H1):**
```css
h1 {
  font-family: var(--serif);
  font-size: clamp(36px, 3.5vw, 48px);
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: 400;
  margin-bottom: 20px;
}
```
Structure:
> "Your health,
> [in plain English.]"

`in plain English.` → Newsreader italic 300, Forest `#1F5041`

**Sub:**
```css
.sub {
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.6;
  color: var(--ink-soft);
  max-width: 380px;
  margin-bottom: 40px;
}
```
Content: `Lab results explained, flagged, and turned into questions for your doctor. Upload any PDF or photo.`

### 3. First divider
`1px solid var(--line-soft)` · 32px margin-bottom

### 4. Stats strip

Three micro-stats in a horizontal flex row:

```css
.stats {
  display: flex;
  gap: 32px;
  margin-bottom: 40px;
}
.stat-val {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 4px;
}
.stat-label {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-dim);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
```

| Value | Label |
|---|---|
| `94 panels` | `supported` |
| `11 sec` | `avg read time` |
| `MD + PharmD` | `reviewed` |

### 5. Second divider
`1px solid var(--line-soft)` · 40px margin-bottom

### 6. User quote

```css
.quote {
  font-family: var(--serif);
  font-size: 17px;
  font-style: italic;
  font-weight: 300;
  line-height: 1.5;
  color: var(--ink-soft);
  max-width: 380px;
  margin-bottom: 16px;
}
.quote-attr {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--ink-dim);
  text-transform: uppercase;
}
```

Quote: `"My LDL had been rising for two years. Nobody told me. Lumen showed me the trend."`
Attribution: `MARCO D. · BROOKLYN`

### 7. Footer (bottom-anchored)

```css
.left-footer {
  margin-top: auto;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-faint);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```
Content: `HIPAA-aligned · Encrypted · Not a substitute for medical advice`

---

## RIGHT COLUMN — Login form

### Container (`.right-col`)
```css
.right-col {
  background: var(--paper);               /* #F6F3EC */
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
```

### Form wrapper (`.form-wrap`)
```css
.form-wrap {
  width: 100%;
  max-width: 400px;
  padding: 56px 48px;
}
```

No card border or shadow — the column background IS the form surface. A border here would look nested and reduce confidence.

### Elements in order (with spacing)

**1. Heading block**
```css
h2 {
  font-family: var(--serif);
  font-size: 36px;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin-bottom: 8px;
}
.form-sub {
  font-size: 15px;
  color: var(--ink-soft);
  margin-bottom: 36px;
}
```
- H2: `"Welcome back."`
- Sub: `"Sign in to your Lumen account."`

**2. Email field** (margin-bottom: 16px)
- Label: `Email address` — Geist 500, 13px, Ink-soft, `display: block; margin-bottom: 8px`
- Input: see shared input spec
- Placeholder: `you@email.com`

**3. Password field** (margin-bottom: 8px)
- Label row: flex, justify-content: space-between, align-items: center
  - Left: `Password` label (same as email)
  - Right: `Forgot password?` — Geist 13px, Forest, no underline, hover: underline
- Input: see shared input spec, plus:
  - `padding-right: 64px` (room for the show/hide toggle)
  - Show/hide toggle positioned absolutely, right: 16px, center-vertically:
    - Geist Mono 500, 10px, tracking 0.12em, Ink-dim
    - Text: `SHOW` / `HIDE` — toggles on click
    - Cursor: pointer

**4. Primary CTA** (margin-top: 24px)
- Full-width, see shared primary button spec
- Content: `Sign in →` with arrow character `→` (U+2192)

**5. "Or" separator** (margin: 24px 0)
```css
.separator {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--ink-dim);
  font-size: 13px;
}
.separator::before,
.separator::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--line-soft);
}
```
Center text: `or`

**6. Google OAuth button** (margin-bottom: 32px)
- See shared Google button spec
- Left icon: Google "G" SVG — 18×18, official Google colors (`#4285F4 #EA4335 #FBBC05 #34A853`)
- Text: `Continue with Google`

**7. Switch to signup** (text-align: center)
```css
.switch {
  font-size: 14px;
  color: var(--ink-soft);
}
.switch a {
  color: var(--forest);
  text-decoration: none;
  font-weight: 500;
}
.switch a:hover { text-decoration: underline; }
```
Content: `Don't have an account? ` + link: `Create one →`

---

## Error states

### Wrong password
- Password input: border → Coral, box-shadow → Coral tint
- Below input, `margin-top: 8px`:
  ```css
  .field-error {
    font-size: 13px;
    color: var(--coral);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  ```
  Content: `Incorrect password. Try again or` + Forest underlined link: `reset it.`

### Unrecognised email
- Email input: border → Coral
- Below input: `No account found with this email.` + Forest link: `Sign up instead →`

### Network error
- Below the primary button, inline:
  - Coral-soft background, 8px 14px padding, 999px radius
  - Content: `Something went wrong. Please try again.`

---

## Loading state (on submit)

```css
/* Button loading state */
.btn-primary.loading {
  background: var(--forest);
  pointer-events: none;
}
```

Button text changes to: `Signing in…`
A simple 3-dot pulse animation or SVG spinner replaces the arrow.

---

## Forgot password flow

On clicking "Forgot password?", the form fields fade out and are replaced in-place:

**Reset form state:**
- H2 changes to: `Reset your password.`
- Sub: `We'll send a link to your email.`
- Only the email field shows (password field hidden)
- Button text: `Send reset link →`
- Below button: `Back to sign in` ghost link

**After submit:**
- Form replaced with centered success state:
  - Envelope SVG (32×32, Forest stroke)
  - Newsreader 400, 22px: `"Check your inbox."`
  - Geist 15px, Ink-soft: `We sent a link to [email]. It expires in 15 minutes.`
  - Ghost link: `Resend the email`

---

## Animation

All form elements entrance: `.fade` class
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
.fade { animation: fadeUp 0.6s ease forwards; }
```

Stagger: heading (no delay), email (0.08s), password (0.16s), button (0.24s), separator (0.32s), OAuth (0.40s), switch (0.48s)

---

## Copy reference

```
LEFT COLUMN
  EYEBROW      SINCE FEB 2024
  H1           Your health,
               in plain English.     ← italic forest
  SUB          Lab results explained, flagged, and turned
               into questions for your doctor. Upload any
               PDF or photo.
  STAT 1       94 panels / supported
  STAT 2       11 sec / avg read time
  STAT 3       MD + PharmD / reviewed
  QUOTE        "My LDL had been rising for two years.
               Nobody told me. Lumen showed me the trend."
               MARCO D. · BROOKLYN
  FOOTER       HIPAA-aligned · Encrypted ·
               Not a substitute for medical advice

RIGHT COLUMN
  H2           Welcome back.
  SUB          Sign in to your Lumen account.
  LABEL 1      Email address
  HOLDER 1     you@email.com
  LABEL 2      Password
  TOGGLE       SHOW / HIDE
  FORGOT       Forgot password?
  BTN          Sign in →
  SEP          or
  GOOGLE       Continue with Google
  SWITCH       Don't have an account?  Create one →
```

---

## Why this login page works

- **The quote is the trust moment.** "My LDL had been rising for two years. Nobody told me." — this is the exact pain the product solves, in one sentence, from a real user. A returning user sees it and is reminded why they signed up.
- **Email before Google on this screen.** Most returning users remember how they authenticated. Email-first matches the majority pattern. Google is secondary — visible, but not the lead.
- **No card shadow on the form.** The white Paper column IS the form surface. Adding a card would make it feel nested — two containers inside each other. The column provides all the containment needed.
- **Forgot password is in-line, not a new page.** Navigating away breaks momentum. Swapping the form fields in-place keeps the user in flow and reduces the perceived cost of resetting.
- **Stats are serif values, mono labels.** `94 panels` in Newsreader 500 gives them weight. `supported` in Geist Mono 10px makes them feel like data. The typographic contrast is the design.


## Reference
- @context/auth/00-index.md
- @context/coding-standards.md
- @context/lumen-branding.md
- @context/lumen-project-overview.md