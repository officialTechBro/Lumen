# 09 — FAQ ("Questions")

An 8-item accordion FAQ. Purely typographic — no icons, no images, no cards. Just a thin-ruled list of questions and their short, plainspoken answers. This is the last heavy-reading section before the final CTA.

---

## Purpose

- **Surface and pre-answer the eight objections most likely to block a signup** — especially around medical disclaimers, data, and pricing edge cases
- **Demonstrate voice consistency at scale** — 8 answers in a row is a stress-test of plainspoken writing. If any of them sound like legal boilerplate, the brand breaks.
- **Give the visitor a reason to scroll past the pricing section** without losing momentum — the list is short enough to skim before the final CTA

---

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                       ● Questions                               │
│                                                                 │
│              Short answers. No legalese.                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────┐           │
│  │ Is Lumen a substitute for my doctor?       +    │           │
│  │─────────────────────────────────────────────────│           │
│  │ What lab formats do you support?           +    │           │
│  │─────────────────────────────────────────────────│           │
│  │ How do you handle my data?                 +    │           │
│  │─────────────────────────────────────────────────│           │
│  │ Who writes the explanations?               +    │           │
│  │─────────────────────────────────────────────────│           │
│  │ Is this covered by my HSA or FSA?          +    │           │
│  │─────────────────────────────────────────────────│           │
│  │ What if my result looks scary?             +    │           │
│  │─────────────────────────────────────────────────│           │
│  │ Can I use this for a family member?        +    │           │
│  │─────────────────────────────────────────────────│           │
│  │ Do you integrate with my patient portal?   +    │           │
│  └─────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

- **ID anchor:** `#faq`
- **Section padding:** 140px vertical
- **Background:** Paper `#F6F3EC` (default)
- **Top border:** 1px Line-soft

---

## Section header

**Centered** — this is the only header on the page that's center-aligned. Gives the FAQ list a deliberate, standalone feel and gently announces a change in rhythm.

Style override: `text-align: center; margin-left: auto; margin-right: auto`.

### Eyebrow
- Copy: **"Questions"** (not "FAQ" — softer, matches the editorial voice)

### Headline (H2)
- Standard section sizing
- Structure:
  > "Short answers. [No legalese.]"
- `No legalese.` in italic Forest

No sub paragraph — the headline is the promise.

---

## FAQ list (`.faq-list`)

- Max-width: 900px
- Margin: 0 auto (centered)
- No outer card or background — just ruled lines between items

---

## FAQ item (`.faq-item`)

Each item is a click target with two parts: the question (always visible) and the answer (hidden by default, expands on click).

### Container
- Padding: 28px 0 (vertical only — item spans full container width)
- Bottom: 1px `var(--line-soft)`
- First child also has a top border (matched 1px Line-soft) to visually bracket the list
- `cursor: pointer`

### Question row (`.faq-q`)
- `display: flex; justify-content: space-between; align-items: flex-start; gap: 32px`
- Font: Newsreader 500, 22px
- Line-height: 1.3
- Letter-spacing: -0.015em
- Color: Ink (default)

### Plus sign (`.sign`)
- Font: Geist Mono 400, 16px
- Color: Ink-dim
- Flex-shrink: 0
- Margin-top: 6px (aligns with first line of question)
- Transition: `transform 0.2s`
- Character: `+` (plain ASCII)

### Answer (`.faq-a`)
- Font: Geist 400, 16px
- Color: Ink-soft
- Line-height: 1.6
- Max-width: 720px (narrower than the question — keeps answer columns comfortable to read)
- Max-height: 0 (collapsed)
- Overflow: hidden
- Transition: `max-height 0.3s ease, margin-top 0.3s ease`

### Open state (`.faq-item.open`)
- The `+` sign rotates to `rotate(45deg)` (becomes ×) and changes color to Forest
- `.faq-a` max-height expands to 400px, margin-top becomes 16px
- Only one item open at a time (clicking a new item closes the previously-open one)

---

## The 8 Q&As — content

### Q1 — Medical substitution
**Q:** Is Lumen a substitute for my doctor?

**A:** No, and that's the point. Lumen explains what's in your report and helps you ask better questions. Diagnoses, prescriptions, and treatment plans come from your clinician.

### Q2 — Supported formats
**Q:** What lab formats do you support?

**A:** PDFs from every major US lab (Quest, Labcorp, BioReference, Kaiser, Mayo, Cleveland Clinic, Sonora Quest, ARUP) plus most hospital patient portals. Clear phone photos work too. We add new panels every week.

### Q3 — Data handling
**Q:** How do you handle my data?

**A:** Reports are encrypted at rest, stored on HIPAA-aligned infrastructure, and deleted on request at any time. We do not sell, share, or license your data to insurers, advertisers, or researchers. Subscription revenue is how we eat.

### Q4 — Content authorship
**Q:** Who writes the explanations?

**A:** Every marker template is drafted against a reviewed source (USPSTF, ADA, AHA, NIH, Mayo) by our team, then edited by a practicing internal medicine physician and a clinical pharmacist. Our methodology page shows every source and edit.

### Q5 — HSA/FSA coverage
**Q:** Is this covered by my HSA or FSA?

**A:** Yes, Lumen qualifies as an eligible medical expense under most US HSA and FSA plans. We issue a clean receipt with the plan code your administrator needs.

### Q6 — Emergency handling
**Q:** What if my result looks scary?

**A:** If a value is in a range that warrants urgent clinical attention, Lumen tells you that plainly, points to the specific marker, and recommends you contact your doctor or, in true emergencies, 911 — before you read anything else.

### Q7 — Family / caregiver use
**Q:** Can I use this for a family member or parent?

**A:** Yes. The Household plan supports up to six separate patients under one account with proper consent and independent histories. Caregiver summaries are written for the person helping, not just the patient.

### Q8 — Portal integrations
**Q:** Do you integrate with my patient portal?

**A:** Direct integrations (Epic MyChart, Athena, Kaiser) are in private beta. For now, download the PDF from your portal and upload it — it takes about eight seconds.

---

## Interaction behavior

- On page load: all items closed.
- On click: open the clicked item, close any currently-open item.
- Only one item open at a time (exclusive accordion, not an independent toggle).
- Transition is smooth on `max-height` and `margin-top`.
- The `+` icon rotates to act as `×` when open — no separate icon swap.

### JavaScript behavior

```js
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});
```

---

## Copy reference

```
EYEBROW   Questions

H2        Short answers. No legalese.
          (italic forest: "No legalese.")

Q1        Is Lumen a substitute for my doctor?
A1        No, and that's the point. Lumen explains what's in
          your report and helps you ask better questions.
          Diagnoses, prescriptions, and treatment plans come
          from your clinician.

Q2        What lab formats do you support?
A2        PDFs from every major US lab (Quest, Labcorp,
          BioReference, Kaiser, Mayo, Cleveland Clinic,
          Sonora Quest, ARUP) plus most hospital patient
          portals. Clear phone photos work too. We add new
          panels every week.

Q3        How do you handle my data?
A3        Reports are encrypted at rest, stored on HIPAA-
          aligned infrastructure, and deleted on request at
          any time. We do not sell, share, or license your
          data to insurers, advertisers, or researchers.
          Subscription revenue is how we eat.

Q4        Who writes the explanations?
A4        Every marker template is drafted against a reviewed
          source (USPSTF, ADA, AHA, NIH, Mayo) by our team,
          then edited by a practicing internal medicine
          physician and a clinical pharmacist. Our
          methodology page shows every source and edit.

Q5        Is this covered by my HSA or FSA?
A5        Yes, Lumen qualifies as an eligible medical expense
          under most US HSA and FSA plans. We issue a clean
          receipt with the plan code your administrator needs.

Q6        What if my result looks scary?
A6        If a value is in a range that warrants urgent
          clinical attention, Lumen tells you that plainly,
          points to the specific marker, and recommends you
          contact your doctor or, in true emergencies, 911 —
          before you read anything else.

Q7        Can I use this for a family member or parent?
A7        Yes. The Household plan supports up to six separate
          patients under one account with proper consent and
          independent histories. Caregiver summaries are
          written for the person helping, not just the
          patient.

Q8        Do you integrate with my patient portal?
A8        Direct integrations (Epic MyChart, Athena, Kaiser)
          are in private beta. For now, download the PDF
          from your portal and upload it — it takes about
          eight seconds.
```

---

## Voice notes

Every answer lands in 2–4 sentences. No one goes over five. The list of rules that shaped the answers:

- **Start with "No" or "Yes" when possible.** Question 1 opens "No, and that's the point." Question 7 opens "Yes." Clear before clever.
- **Name specific sources.** USPSTF, ADA, AHA, NIH, Mayo. Quest, Labcorp, Kaiser. These proper nouns do trust work that vague words ("leading authorities") can't.
- **Earn the "legalese" promise in every answer.** No phrases like "as outlined in Section 4.2," no "subject to applicable law." If the meaning can be carried by plain English, use plain English.
- **One punchline per answer.** "Subscription revenue is how we eat" (Q3), "it takes about eight seconds" (Q8), "and that's the point" (Q1). Small rewards for the visitor who reads.

---

## Responsive

| Viewport | Adaptation |
|---|---|
| ≥ 900px | Full-width list (max 900px), left-aligned answers |
| < 900px | List fills container; question and `+` still align cleanly via flex |
| < 560px | Question drops to 19px; answer drops to 15px |

Centered header stays centered at all widths.

---

## Why this section works

- **No icons, no decoration.** Type and space only. Makes the answers feel like they came from a person, not a marketing department.
- **"Questions," not "FAQ."** Three letters lighter. Three degrees warmer.
- **Exclusive accordion.** Opening one closes the others — guides reading rhythm. Multi-open would feel busy and make the page lurch.
- **The `+` → `×` rotation** is the only real flourish. It's small, and it matches the italic-forest accent: a subtle, precise signature move.
- **Q6 ("What if my result looks scary?") is buried in the middle** — not hidden, but not front-loaded. Anyone who reaches it has already decided they're interested. The answer meets that moment with calm.
