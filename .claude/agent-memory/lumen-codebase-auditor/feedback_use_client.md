---
name: Unnecessary use client on Section Components
description: 9 of 11 home components are 'use client' solely to run IntersectionObserver for scroll animations; could be refactored to server components with a shared observer hook
type: project
---

Components with unnecessary 'use client': HowItWorks, SampleReport, Features, TrustCallout, Testimonials, Pricing, FAQ, CTABand, Footer.

The only actual client-only operations are IntersectionObserver calls in useEffect for scroll-triggered animations. All data is static constants.

**Why:** Each component was built independently and each added its own observer rather than sharing a mechanism.

**How to apply:** A future refactor could extract a single `useScrollFade` hook into a thin client wrapper, letting the outer sections remain server components. Flag this as a medium-priority optimization if the user asks about performance.
