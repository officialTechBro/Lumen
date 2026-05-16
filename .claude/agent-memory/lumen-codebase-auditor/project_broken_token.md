---
name: Broken CSS Token in Testimonials
description: var(--paper-elev) is used in Testimonials.tsx but the correct token is --paper-elevated; causes transparent quote card backgrounds
type: project
---

In `components/home/Testimonials.tsx` line 114, the background style uses `var(--paper-elev)` which is not defined anywhere in globals.css. The correct token is `var(--paper-elevated)`.

**Why:** Typo introduced during implementation. The card backgrounds resolve to transparent/unset, making quote cards lose their background color.

**How to apply:** When working on Testimonials.tsx, fix this token before doing any other styling work.
