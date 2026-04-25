# 02 — Signup Page

The new-user registration screen. Centered two-column layout inside a page with a top nav bar: a "Why Lumen?" feature rail on the left, a form card on the right. More breathing room than Login — a first-time user needs to be convinced before they give you their name and email.

---

## Purpose

- Convert a first-time visitor into a registered user with minimum friction
- Earn trust before asking for information — the left rail does the persuasion
- Lead with Google OAuth (lower friction) before the email form
- Be honest about what the free plan includes so there's no surprise after signup
- Signup route at /signup

---

## Full-page layout

```
┌────────────────────────────────────────────────────────────────────────┐
│  ◉ Lumen                            Already have an account? Sign in →│
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│         ┌─────────────────────────┐    ┌───────────────────────────┐  │
│         │                         │    │                           │  │
│         │  WHY LUMEN?             │    │  Start understanding      │  │
│         │                         │    │  your results.            │  │
│         │  ● Explains every       │    │                           │  │
│         │    marker               │    │  [G  Continue with Google]│  │
│         │    In one plain         │    │                           │  │
│         │    sentence.            │    │  ── or sign up with email─│  │
│         │                         │    │                           │  │
│         │  ● Flags what needs     │    │  Full name                │  │
│         │    attention            │    │  [                   ]    │  │
│         │    Prioritized by       │    │                           │  │
│         │    clinical sig.        │    │  Email address            │  │
│         │                         │    │  [                   ]    │  │
│         │  ● Writes your          │    │                           │  │
│         │    doctor questions     │    │  Password       [SHOW]    │  │
│         │    2–4 per flagged      │    │  [                   ]    │  │
│         │    marker.              │    │  ●●○ fair                 │  │
│         │                         │    │                           │  │
│         │  ● Tracks trends        │    │  [Create free account →]  │  │
│         │    over time            │    │                           │  │
│         │    See how markers      │    │  Terms · Privacy          │  │
│         │    move.                │    │                           │  │
│         │                         │    └───────────────────────────┘  │
│         │  ────────               │                                    │
│         │  FREE PLAN INCLUDES     │                                    │
│         │  – 3 translations /mo   │                                    │
│         │  – All 94+ markers      │                                    │
│         │  – Doctor questions     │                                    │
│         │  No credit card needed  │                                    │
│         └─────────────────────────┘                                    │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Top navigation bar

```css
.auth-nav {
  width: 100%;
  height: 68px;
  background: var(--paper);
  border-bottom: 1px solid var(--line-soft);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  position: sticky;
  top: 0;
  z-index: 10;
}
```

**Left — brand lockup:** same as Login left column (SVG mark + "Lumen" wordmark)

**Right — sign-in prompt:**
```css
.nav-switch {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--ink-soft);
}
.nav-switch a {
  color: var(--forest);
  font-weight: 500;
  text-decoration: none;
}
.nav-switch a:hover { text-decoration: underline; }
```
Content: `Already have an account?` + link: `Sign in →`

---

## Body layout

```css
.auth-body {
  min-height: calc(100vh - 68px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 48px;
  background: var(--paper);
}

.auth-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 64px;
  align-items: start;
  max-width: 1000px;
  width: 100%;
}

@media (max-width: 960px) {
  .auth-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
```

The right column is wider (`1.4fr`) because the form card has more vertical content than the feature rail.

---

## LEFT COLUMN — Feature rail

No card, no background tint — sits directly on Paper `#F6F3EC`. The right column card provides enough containment contrast.

### 1. Section label

```css
.why-label {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--forest);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 28px;
}
```
Content: `WHY LUMEN?`

### 2. Feature list

Four items. No `<ul>` — a flex column with gap.

```css
.features {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}
.feature-item {
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 14px;
  align-items: start;
}
.feature-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--forest);
  margin-top: 8px;            /* aligns with first text line */
  flex-shrink: 0;
}
.feature-title {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.01em;
  margin-bottom: 4px;
}
.feature-sub {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.55;
}
```

The four features:

| Title | Sub |
|---|---|
| Explains every marker | In one plain sentence — no jargon, no diagnosis. |
| Flags what needs attention | Prioritized by clinical significance, not how alarming the word sounds. |
| Writes your doctor questions | 2–4 specific questions for every flagged marker. Walk in prepared. |
| Tracks trends over time | Upload more than once and see how your markers are moving. |

### 3. Divider
`1px solid var(--line-soft)` · 32px margin vertical

### 4. Free plan callout

```css
.free-callout {
  background: var(--paper-warm);        /* #EFEADF */
  border: 1px solid var(--line-soft);
  border-radius: 10px;
  padding: 16px 20px;
}
.free-label {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--forest);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.free-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}
.free-item {
  font-size: 14px;
  color: var(--ink-soft);
  display: flex;
  align-items: center;
  gap: 10px;
}
.free-item::before {
  content: '—';
  color: var(--ink-faint);
  font-family: var(--mono);
  font-size: 11px;
}
.free-note {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-dim);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```

**Label:** `FREE PLAN INCLUDES`

**Three items:**
- `3 lab translations / month`
- `All 94+ markers explained`
- `Doctor question generator`

**Note below:** `No credit card required`

---

## RIGHT COLUMN — Signup form card

### Card container (`.form-card`)
```css
.form-card {
  background: var(--paper-elev);        /* #FBF8F1 */
  border: 1px solid var(--line-soft);
  border-radius: 16px;
  padding: 48px 44px;
}
```

This card has an explicit background + border — unlike Login's formless column. The card visually separates the form from the feature rail, making the signup zone feel purposeful and distinct.

### 1. Headline

```css
.form-title {
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin-bottom: 32px;
}
```

Structure:
> "Start understanding
> your [results.]"

`results.` → Newsreader italic 300, Forest `#1F5041`

Two lines: "Start understanding" on line 1, "your results." on line 2.

### 2. Google OAuth button (lead action)

```css
.google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 15px 0;
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-radius: 999px;
  font-family: var(--sans);
  font-weight: 600;
  font-size: 14px;
  color: var(--ink);
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 24px;
}
.google-btn:hover {
  border-color: var(--forest);
  transform: translateY(-1px);
}
```

- Google "G" SVG icon: 18×18, official colors (`#4285F4 #EA4335 #FBBC05 #34A853`)
- Text: `Continue with Google`
- This is the **primary** action on signup — more prominent than the email form because OAuth reduces friction for new users

### 3. "Or" separator

```css
.separator {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  font-size: 12px;
  color: var(--ink-dim);
}
.separator::before,
.separator::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--line-soft);
}
```
Center text: `or sign up with email`

### 4. Full name field (margin-bottom: 16px)
- Label: `Full name`
- Input: see shared input spec
- Placeholder: `Sarah Chen`
- No special validation — just required

### 5. Email field (margin-bottom: 16px)
- Label: `Email address`
- Input: see shared input spec
- Placeholder: `you@email.com`
- On blur validation:
  - **Valid format:** Leaf-colored checkmark icon appears inside input, right-aligned (absolute positioned)
  - **Invalid format:** Coral border + below-field message: `Enter a valid email address.`
  - **Already registered:** Coral border + message: `An account with this email exists.` + Forest link: `Sign in instead →`

### 6. Password field (margin-bottom: 8px)
- Label: `Password` (left-aligned only — no right link like Login)
- Input: see shared input spec, plus show/hide toggle
- Below input: Geist 12px, Ink-dim: `At least 8 characters`

**Password strength indicator:**

Below the helper text, 8px margin-top:

```css
.strength-bar {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
}
.strength-seg {
  flex: 1;
  height: 3px;
  border-radius: 999px;
  background: var(--line-soft);         /* unfilled state */
  transition: background 0.2s;
}

/* Filled states by JS class on .strength-bar */
.strength-bar.weak   .strength-seg:nth-child(1)              { background: var(--coral); }
.strength-bar.fair   .strength-seg:nth-child(-n+2)           { background: #C8853A; }  /* amber */
.strength-bar.strong .strength-seg                           { background: var(--leaf); }
```

Three segments: segment 1 fills on any input (Coral), segment 2 fills at fair strength (amber `#C8853A`), all three fill at strong (Leaf `#5A7A3F`).

Strength label to the right of the bar (absolute or flex):
- Geist 11px, Ink-dim: `weak` / `fair` / `strong` — matching the bar state

### 7. Primary CTA (margin-top: 24px)
- Full-width, see shared primary button spec
- Content: `Create free account →`

### 8. Legal line
```css
.legal {
  text-align: center;
  font-size: 12px;
  color: var(--ink-dim);
  margin-top: 16px;
  line-height: 1.5;
}
.legal a {
  color: var(--forest);
  text-decoration: none;
}
.legal a:hover { text-decoration: underline; }
```
Content: `By creating an account you agree to our ` + `Terms of Service` + ` and ` + `Privacy Policy.`

No checkbox — legal-on-create is standard. The links are present; the barrier is minimal.

---

## Form states

### Creating (loading)
- Primary button: bg → Forest, pointer-events none
- Text: `Creating your account…` with subtle spinner (3 dots pulsing, or SVG rotation)

### Success — email confirmation required
The entire form area is replaced (fade transition) with a centered confirmation state:

```css
.confirm-state {
  text-align: center;
  padding: 48px 44px;
}
```

Elements:
1. **Icon:** Envelope SVG, 48×48, Forest stroke `#1F5041` strokeWidth 1.5
2. **Headline:** Newsreader 500, 28px: `"Check your email."` — `your email.` in italic Forest
3. **Sub:** Geist 400, 16px, Ink-soft: `We sent a confirmation link to [email address]. Click it to activate your account.`
4. **Resend link:** Forest text, Geist 14px: `Resend the email`
5. **Fine print:** Geist Mono 10px, Ink-dim: `Link expires in 24 hours`

---

## Animation

**Page entrance:** All elements fade up with stagger
- Nav bar: instant (no animation — it's already visible)
- Left column label: `.fade` 0.05s
- Left column features: `.fade` 0.1s, 0.2s, 0.3s, 0.4s (one per feature)
- Free callout: `.fade` 0.45s
- Form card: `.fade` 0.1s (enters as one block — internal stagger would feel busy)

**Form field interaction:**
- Validation feedback: `max-height: 0 → 36px` slide-down on error messages, `0.2s ease`
- Checkmark on valid email: `opacity 0 → 1, scale(0.8 → 1)`, `0.2s ease`
- Strength bar segments: `background` transition `0.2s ease` as user types

---

## Copy reference

```
TOP NAV
  BRAND        Lumen
  SWITCH       Already have an account?  Sign in →

LEFT COLUMN
  LABEL        WHY LUMEN?

  FEATURE 1    Explains every marker
               In one plain sentence — no jargon, no diagnosis.

  FEATURE 2    Flags what needs attention
               Prioritized by clinical significance, not how
               alarming the word sounds.

  FEATURE 3    Writes your doctor questions
               2–4 specific questions for every flagged marker.
               Walk in prepared.

  FEATURE 4    Tracks trends over time
               Upload more than once and see how your markers
               are moving.

  FREE LABEL   FREE PLAN INCLUDES
  FREE ITEMS   3 lab translations / month
               All 94+ markers explained
               Doctor question generator
  FREE NOTE    No credit card required

RIGHT COLUMN (form card)
  TITLE        Start understanding
               your results.            ← italic forest on "results."

  GOOGLE BTN   Continue with Google

  SEPARATOR    or sign up with email

  LABEL 1      Full name
  HOLDER 1     Sarah Chen

  LABEL 2      Email address
  HOLDER 2     you@email.com

  LABEL 3      Password
  HELPER       At least 8 characters
  STRENGTH     weak / fair / strong

  PRIMARY BTN  Create free account →

  LEGAL        By creating an account you agree to our
               Terms of Service and Privacy Policy.

CONFIRM STATE
  HEADLINE     Check your email.        ← italic forest on "your email."
  SUB          We sent a confirmation link to [email].
               Click it to activate your account.
  RESEND       Resend the email
  NOTE         Link expires in 24 hours
```

---

## Why this signup page works

- **Left rail earns trust before the form asks anything.** The visitor reads "Explains every marker" and "Writes your doctor questions" before they see a single input field. By the time they reach the form, they've already decided.
- **Google OAuth is the lead action.** On signup (unlike Login), the user hasn't established a pattern yet. OAuth is lower friction — fewer characters, no password to invent. Leading with it increases conversion.
- **The form is a card, not a column.** Login's form sits directly on the page column. Signup's form is in a Paper-elev card with a border. This distinction signals: Login = you belong here; Signup = here is the specific zone where you register.
- **The free plan callout is in the left rail, not in the form.** Putting pricing information inside the form card would raise doubts at the moment of conversion. Putting it in the feature rail (before the form) means the user sees it as a benefit, not a caveat.
- **Password strength bar has three states, not four.** Weak / Fair / Strong. Most apps use four (Weak / Fair / Good / Strong). Three is cleaner and sufficient — the goal is to prevent obviously weak passwords, not to gamify complexity.
- **No checkbox for Terms.** Legal-on-create is standard and removes an unnecessary friction point. The links to Terms and Privacy are present; the barrier is just the act of creating the account. This is how Linear, Vercel, Notion, and every major modern product does it.
- **The confirmation screen replaces the form entirely.** Navigating away from signup to a new "check your email" page breaks momentum. Swapping the form card content in-place with a centered success state keeps the user on the same visual surface — a smoother transition.


## Reference
- @context/auth/00-index.md
- @context/coding-standards.md
- @context/lumen-branding.md
- @context/lumen-project-overview.md