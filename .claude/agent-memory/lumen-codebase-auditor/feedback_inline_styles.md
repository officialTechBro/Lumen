---
name: Inline Styles Pattern in Components
description: Nearly all home section components use inline styles; this is the current pattern but violates coding standards
type: feedback
---

Every home section component (Hero, HowItWorks, SampleReport, Features, TrustCallout, Testimonials, Pricing, FAQ, CTABand, Footer) uses inline style props for the majority of their styling, with only Tailwind utility classes for simple properties.

**Why:** The components were built iteratively with precise design token references (CSS variables) that were easier to wire inline than via Tailwind utilities.

**How to apply:** When the user asks to fix coding standard violations, the inline styles are a medium-priority refactoring target, not a blocker. Do not rewrite them unprompted — the user is aware and will address in a dedicated refactor pass.
