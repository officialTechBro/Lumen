# Lumen Auth — Design Specs Index

One spec file per authentication screen. Each file is fully self-contained — paste it alone into Claude's design tool and it has everything needed to build that screen from scratch.

---

## Files

| # | File | Screen |
|---|---|---|
| 01 | `01-login.md` | Login page — split two-column layout |
| 02 | `02-signup.md` | Signup page — centered with left feature rail |

---

## Design references

| Reference | What to borrow |
|---|---|
| **Linear** | Split layout — brand/copy left, form right. Clean serif + mono type treatment. |
| **Function Health** | Clinical confidence, dark premium aesthetic, data as decoration. |
| **Levels Health** | Clean single-column form, generous padding, no clutter. |
| **Whoop** | Minimal, full-bleed confidence — one action per screen. |
| **Vercel** | Social auth button hierarchy over email, separator treatment. |
| **Loom** | Product screenshot on the left while signing up. |

### What NOT to do
- Stock photo of a smiling patient or doctor in the background
- Gradient blobs or abstract health shapes
- Checkbox forest of legal text cluttering the form
- "Join thousands of users who trust us" fake social proof
- A logo centered on a white page with nothing else
- Progress bar showing "Step 1 of 4" when it's just an email field

---

## Shared brand tokens

### Colors
```
--paper:        #F6F3EC    page background
--paper-elev:   #FBF8F1    card/form surface
--paper-warm:   #EFEADF    tinted panels, left columns
--ink:          #1A2620    primary text, primary button default
--ink-soft:     #3D4842    secondary text, labels
--ink-dim:      #6B756F    placeholders, metadata, legal text
--ink-faint:    #A8ADA6    disabled states
--forest:       #1F5041    input focus, links, button hover, italic accent
--forest-soft:  #2D6D5A    deeper hover variant
--mint:         #A8E6CF    accent on dark surfaces ONLY
--coral:        #C8563A    error states only
--coral-soft:   #E8D4CC    error backgrounds
--leaf:         #5A7A3F    success states
--leaf-soft:    #D7E0C6    success backgrounds
--line:         #D9D3C4    input borders, dividers
--line-soft:    #E5DFD0    subtle separators
```

### Typography
```
Display / headings:  Newsreader  (300 italic, 400, 500)  — Google Fonts
Body / UI:           Geist       (400, 500, 600)          — Google Fonts
Data / labels:       Geist Mono  (400, 500)               — always uppercase, 0.12–0.18em tracking
```

**Signature move:** Any 1–3 word phrase carrying the brand thesis in a serif heading is rendered in **Newsreader italic 300, Forest** `#1F5041`. On dark surfaces: Mint `#A8E6CF` instead.

### Spatial system
```
Base grid:       8px
Border radius:   8px inputs · 14px cards · 16px signup form card · 999px buttons & pills
Card border:     1px solid var(--line-soft)
```

### Paper grain
Fixed `body::before` — fractal noise SVG, 5% opacity, `mix-blend-mode: multiply`. Applies globally across both screens.

---

## Shared component specs

### Input field
```css
background:    var(--paper-elev)     /* #FBF8F1 */
border:        1px solid var(--line) /* #D9D3C4 */
border-radius: 8px
padding:       13px 16px
font:          Geist 400, 14px, var(--ink)
placeholder:   var(--ink-faint)      /* #A8ADA6 */

:focus
  border-color:  var(--forest)       /* #1F5041 */
  box-shadow:    0 0 0 3px rgba(31, 80, 65, 0.10)
  outline:       none

.error
  border-color:  var(--coral)        /* #C8563A */
  box-shadow:    0 0 0 3px rgba(200, 86, 58, 0.10)
```

### Primary button
```css
background:    var(--ink)            /* #1A2620 */
color:         var(--paper)          /* #F6F3EC */
font:          Geist 500, 14px
padding:       15px 0
border-radius: 999px
width:         100%
border:        none

:hover
  background:  var(--forest)         /* #1F5041 */
  transform:   translateY(-1px)
  box-shadow:  0 10px 24px -10px rgba(31, 80, 65, 0.35)

:disabled
  background:  var(--ink-faint)
  cursor:      not-allowed
```

### Google OAuth button
```css
background:    var(--paper-elev)
border:        1.5px solid var(--line)
border-radius: 999px
padding:       15px 0
font:          Geist 500–600, 14px, var(--ink)
display:       flex, center, gap 12px
width:         100%

:hover
  border-color: var(--forest)
  transform:    translateY(-1px)
```

### "Or" separator
Two `1px solid var(--line-soft)` horizontal rules flanking centered text.
Text: Geist 12–13px, Ink-dim.

### Status pill (inline error / success)
```css
font:          Geist 13px
padding:       8px 14px
border-radius: 999px

.error   — background: coral-soft, color: coral
.success — background: leaf-soft,  color: leaf
```

---

## Motion (both screens)

- **Page entrance:** `opacity 0 → 1`, `translateY(16px → 0)`, `0.6s ease`, 0.1s stagger between elements
- **Input focus:** `0.15s ease` on border-color and box-shadow
- **Button hover:** `0.2s ease` on background + `translateY(-1px)` simultaneous
- **Error states:** `0.2s ease` on border-color, message slides down `max-height: 0 → 40px`
- **Form loading:** primary button text → `Creating your account…`, bg → Forest, spinner

---

## Accessibility (both screens)

- All inputs have associated `<label>` elements (not placeholder-only)
- Error messages: `role="alert"` for screen reader announcement
- Focus rings: 2px Forest outline, `outline-offset: 2px`
- All body text meets WCAG AA contrast on Paper backgrounds
- Tab order: logical top-to-bottom, form fields before action buttons

---

## Why the two screens use different layouts

**Login (split two-column):** A returning user is already committed — they just need to get in quickly. The left column reassures quietly (a quote, three data stats). It doesn't sell; it confirms. Form is focused and fast.

**Signup (centered with left rail):** A first-time user needs to be convinced before giving their email. The "Why Lumen?" feature rail earns trust on the left while the form card sits separately on the right, visually distinct as a focused zone. More breathing room, more persuasion, same brand voice.
