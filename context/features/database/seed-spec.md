# Lumen — Seed Data Specification

## Overview

Create a seed script (`prisma/seed.ts`) to populate the database with realistic sample data for development, testing, and demos. The seed covers all six models: `User`, `Profile`, `Report`, `Marker`, `Question`, and `MarkerCatalog`.

---

## Dependencies

```ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
```

---

## 1. User

One demo user. Represents a returning Lumen+ subscriber with a full history.

| Field | Value |
|---|---|
| `email` | `demo@lumen.health` |
| `fullName` | `Sarah Chen` |
| `password` | `12345678` (hash with bcryptjs, 12 rounds) |
| `dateOfBirth` | `1989-04-12` |
| `biologicalSex` | `female` |
| `isPro` | `true` |
| `emailVerified` | current date |
| `stripeCustomerId` | `cus_demo_sarah_chen` |
| `stripeSubscriptionId` | `sub_demo_lumen_plus` |

---

## 2. Profiles

Two profiles under the demo user. One for self, one for a dependent.

### Profile 1 — Self

| Field | Value |
|---|---|
| `name` | `Sarah (Me)` |
| `dateOfBirth` | `1989-04-12` |
| `biologicalSex` | `female` |
| `relationship` | `self` |

### Profile 2 — Dependent

| Field | Value |
|---|---|
| `name` | `Dad` |
| `dateOfBirth` | `1958-11-03` |
| `biologicalSex` | `male` |
| `relationship` | `parent` |

---

## 3. Reports

Seven reports total: six for Sarah's profile, one for Dad's profile. Covers a 2-year history. Ordered oldest to newest.

---

### Report 1 — Baseline (Sarah)

| Field | Value |
|---|---|
| `title` | `Baseline panel` |
| `source` | `pdf` |
| `fileName` | `quest-baseline-2024-02.pdf` |
| `labProvider` | `Quest Diagnostics` |
| `collectedAt` | `2024-02-09` |
| `status` | `ready` |
| `flagCount` | `0` |
| `urgentFlag` | `false` |
| `watchCount` | `1` |
| `summary` | `Your baseline panel is largely within normal limits. Ferritin is sitting at the lower end of its range — worth keeping an eye on but not urgent. Everything else looks good.` |

---

### Report 2 — Metabolic panel (Sarah)

| Field | Value |
|---|---|
| `title` | `Metabolic panel` |
| `source` | `pdf` |
| `fileName` | `quest-metabolic-2024-04.pdf` |
| `labProvider` | `Quest Diagnostics` |
| `collectedAt` | `2024-04-19` |
| `status` | `ready` |
| `flagCount` | `0` |
| `urgentFlag` | `false` |
| `watchCount` | `0` |
| `summary` | `All 14 metabolic markers are within normal range. Blood sugar, kidney function, and liver enzymes all look healthy. No action needed.` |

---

### Report 3 — Lipid panel (Sarah)

| Field | Value |
|---|---|
| `title` | `Lipid panel` |
| `source` | `pdf` |
| `fileName` | `quest-lipid-2024-06.pdf` |
| `labProvider` | `Quest Diagnostics` |
| `collectedAt` | `2024-06-04` |
| `status` | `ready` |
| `flagCount` | `1` |
| `urgentFlag` | `false` |
| `watchCount` | `0` |
| `summary` | `LDL cholesterol is slightly elevated at 118 mg/dL — above the ideal threshold but not in alarming territory. Everything else in this lipid panel is normal. Worth mentioning at your next visit.` |

---

### Report 4 — Thyroid check (Sarah)

| Field | Value |
|---|---|
| `title` | `Thyroid check` |
| `source` | `photo` |
| `fileName` | `kaiser-thyroid-2024-10.jpg` |
| `labProvider` | `Kaiser Permanente` |
| `collectedAt` | `2024-10-22` |
| `status` | `ready` |
| `flagCount` | `0` |
| `urgentFlag` | `false` |
| `watchCount` | `0` |
| `summary` | `TSH and Free T4 are both squarely within normal range. Your thyroid appears to be functioning well. No follow-up needed on this panel.` |

---

### Report 5 — Annual panel (Sarah, previous year)

| Field | Value |
|---|---|
| `title` | `Annual panel` |
| `source` | `pdf` |
| `fileName` | `quest-annual-2025-03.pdf` |
| `labProvider` | `Quest Diagnostics` |
| `collectedAt` | `2025-03-11` |
| `status` | `ready` |
| `flagCount` | `1` |
| `urgentFlag` | `false` |
| `watchCount` | `2` |
| `summary` | `LDL continues to trend upward at 131 mg/dL. Vitamin D has dropped into the low range and ferritin is still sitting at the low end. These three markers deserve attention at your next appointment.` |

---

### Report 6 — Follow-up lipids (Sarah)

| Field | Value |
|---|---|
| `title` | `Follow-up lipids` |
| `source` | `pdf` |
| `fileName` | `labcorp-followup-2025-09.pdf` |
| `labProvider` | `Labcorp` |
| `collectedAt` | `2025-09-02` |
| `status` | `ready` |
| `flagCount` | `1` |
| `urgentFlag` | `false` |
| `watchCount` | `1` |
| `summary` | `LDL has come down slightly to 138 mg/dL following dietary changes — still flagged but trending in the right direction. HDL improved marginally. One watch marker on ferritin.` |

---

### Report 7 — Annual panel (Sarah, latest)

| Field | Value |
|---|---|
| `title` | `Annual panel` |
| `source` | `pdf` |
| `fileName` | `quest-annual-2026-03.pdf` |
| `labProvider` | `Quest Diagnostics` |
| `collectedAt` | `2026-03-14` |
| `status` | `ready` |
| `flagCount` | `2` |
| `urgentFlag` | `false` |
| `watchCount` | `1` |
| `summary` | `Your annual panel looks largely healthy, with two things worth discussing at your next appointment. Your LDL cholesterol is elevated — not alarming, but higher than the ideal target — and your vitamin D is mildly low, which is common and straightforward to address. Everything else, including your blood sugar, thyroid, and kidney function, is within normal range.` |

---

### Report 8 — Annual panel (Dad)

| Field | Value |
|---|---|
| `title` | `Annual panel` |
| `source` | `pdf` |
| `fileName` | `kaiser-dad-annual-2026-01.pdf` |
| `labProvider` | `Kaiser Permanente` |
| `collectedAt` | `2026-01-08` |
| `status` | `ready` |
| `flagCount` | `3` |
| `urgentFlag` | `false` |
| `watchCount` | `2` |
| `summary` | `Three markers flagged across this panel — HbA1c is in prediabetic range, LDL is elevated, and PSA is slightly above the age-adjusted threshold. Two watch items on creatinine and ferritin. This panel warrants a follow-up conversation with his doctor.` |

---

## 4. Markers

All markers for Report 7 (Annual panel — latest, Sarah). This is the primary demo report — seed all 21 markers with full data. Seed 3–5 representative markers for each other report (flagged and watch markers only for brevity).

---

### Report 7 markers (all 21)

#### LIPIDS

| name | code | value | unit | referenceMin | referenceMax | status | explanation | whatItMeasures | confidence |
|---|---|---|---|---|---|---|---|---|---|
| LDL Cholesterol | LDL-C | 142 | mg/dL | null | 100 | flagged | Your LDL is elevated — not alarming, but higher than the ideal target. Worth a conversation about diet and risk. | Measures the amount of low-density lipoprotein cholesterol in your blood, which correlates with cardiovascular risk over time. | 0.98 |
| HDL Cholesterol | HDL-C | 58 | mg/dL | 40 | null | normal | Your HDL is in a good range. Higher HDL is associated with lower cardiovascular risk. | Measures high-density lipoprotein, the so-called "good" cholesterol that helps remove other forms of cholesterol. | 0.98 |
| Total Cholesterol | Total-C | 210 | mg/dL | null | 200 | borderline | Total cholesterol is just above the ideal threshold. LDL is the main driver — see that result. | The sum of all cholesterol types in your blood. Considered alongside individual components for a full picture. | 0.97 |
| Triglycerides | TG | 88 | mg/dL | null | 150 | normal | Triglycerides are well within normal range. No action needed. | Measures fat in the blood after eating. Elevated levels can signal metabolic risk when combined with other markers. | 0.98 |

#### METABOLIC

| name | code | value | unit | referenceMin | referenceMax | status | explanation | whatItMeasures | confidence |
|---|---|---|---|---|---|---|---|---|---|
| HbA1c | A1c | 5.4 | % | null | 5.7 | normal | Your 3-month blood sugar average is well within the healthy range. No signs of prediabetes. | Reflects average blood glucose over the past 2–3 months. Used to screen for and monitor diabetes. | 0.99 |
| Fasting Glucose | FBG | 94 | mg/dL | 70 | 99 | normal | Blood sugar is normal. This is a snapshot of glucose at the time of the blood draw. | Measures blood sugar after an overnight fast. Elevated levels can indicate insulin resistance or diabetes. | 0.98 |
| Insulin | INS | 7.2 | μIU/mL | 2 | 20 | normal | Insulin level is within normal range, consistent with good insulin sensitivity. | Measures the hormone that regulates blood sugar. Elevated fasting insulin can be an early sign of insulin resistance. | 0.94 |

#### THYROID

| name | code | value | unit | referenceMin | referenceMax | status | explanation | whatItMeasures | confidence |
|---|---|---|---|---|---|---|---|---|---|
| TSH | TSH | 2.1 | μIU/mL | 0.4 | 4.0 | normal | TSH is right in the middle of normal. Your thyroid signaling looks healthy. | The pituitary gland's signal to the thyroid. Abnormal values indicate under- or over-active thyroid function. | 0.99 |
| Free T4 | FT4 | 1.2 | ng/dL | 0.8 | 1.8 | normal | Free T4 is within normal range, consistent with normal thyroid hormone production. | The active form of thyroid hormone circulating in the blood. Works alongside TSH to assess thyroid function. | 0.97 |

#### VITAMINS & MINERALS

| name | code | value | unit | referenceMin | referenceMax | status | explanation | whatItMeasures | confidence |
|---|---|---|---|---|---|---|---|---|---|
| Vitamin D | 25(OH)D | 24 | ng/mL | 30 | 100 | flagged | Your vitamin D is mildly low. Common in winter or if you spend most days indoors. | Measures the storage form of vitamin D, which supports calcium absorption, immune function, and bone health. | 0.97 |
| Ferritin | FER | 38 | ng/mL | 30 | 300 | borderline | In range but on the low end. Worth monitoring — some people feel symptoms before the number drops below the reference floor. | Reflects how much iron your body has stored. Low ferritin can cause fatigue and poor concentration even when technically in range. | 0.96 |
| Vitamin B12 | B12 | 420 | pg/mL | 200 | 900 | normal | Vitamin B12 is within normal range. No supplementation needed based on this result. | Essential for nerve function and red blood cell production. Deficiency can cause fatigue and neurological symptoms. | 0.97 |
| Magnesium | Mg | 2.1 | mg/dL | 1.7 | 2.2 | normal | Magnesium is within normal range. | Plays a role in hundreds of enzymatic reactions including muscle function, nerve signaling, and energy production. | 0.95 |

#### BLOOD COUNT

| name | code | value | unit | referenceMin | referenceMax | status | explanation | whatItMeasures | confidence |
|---|---|---|---|---|---|---|---|---|---|
| Hemoglobin | HGB | 14.2 | g/dL | 12 | 16 | normal | Hemoglobin is within the normal range for your sex. | The protein in red blood cells that carries oxygen. Low levels indicate anemia; high levels can indicate dehydration or other conditions. | 0.99 |
| Hematocrit | HCT | 42 | % | 36 | 46 | normal | Hematocrit is normal — this measures the proportion of red blood cells in your blood. | The percentage of blood volume made up of red blood cells. Used alongside hemoglobin to assess for anemia. | 0.98 |
| WBC | WBC | 6.8 | k/μL | 4 | 11 | normal | White blood cell count is normal. No signs of active infection or immune abnormality. | Counts the white blood cells that fight infections and disease. Very high or low values can indicate infection, inflammation, or immune disorders. | 0.99 |
| Platelets | PLT | 248 | k/μL | 150 | 400 | normal | Platelet count is normal. | Platelets are involved in blood clotting. Very low counts can cause bleeding problems; very high counts can signal bone marrow issues. | 0.99 |

#### KIDNEY & LIVER

| name | code | value | unit | referenceMin | referenceMax | status | explanation | whatItMeasures | confidence |
|---|---|---|---|---|---|---|---|---|---|
| Creatinine | CREAT | 0.9 | mg/dL | 0.6 | 1.1 | normal | Creatinine is normal, suggesting healthy kidney filtering function. | A waste product filtered by the kidneys. Elevated levels can indicate reduced kidney function. | 0.99 |
| eGFR | eGFR | 96 | mL/min | 60 | null | normal | eGFR is well above the threshold for normal kidney function. | Estimates how well the kidneys are filtering waste from the blood per minute. Values above 60 are generally considered normal. | 0.97 |
| ALT | ALT | 28 | U/L | 7 | 56 | normal | ALT is within normal range, indicating healthy liver enzyme activity. | A liver enzyme that leaks into the blood when liver cells are damaged. Elevated ALT can signal liver inflammation or injury. | 0.99 |
| AST | AST | 22 | U/L | 10 | 40 | normal | AST is normal. | An enzyme found in the liver, heart, and muscles. Elevated AST alongside ALT usually points to liver issues; isolated elevation can suggest muscle damage. | 0.98 |

---

### Report 3 markers (Lipid panel — 1 flag)

| name | code | value | unit | referenceMin | referenceMax | status | explanation | confidence |
|---|---|---|---|---|---|---|---|---|
| LDL Cholesterol | LDL-C | 118 | mg/dL | null | 100 | flagged | LDL is slightly above the ideal threshold. Diet changes are often the first step. | 0.98 |
| HDL Cholesterol | HDL-C | 54 | mg/dL | 40 | null | normal | HDL is in a healthy range. | 0.98 |
| Total Cholesterol | Total-C | 194 | mg/dL | null | 200 | normal | Total cholesterol is within the acceptable range. | 0.97 |
| Triglycerides | TG | 96 | mg/dL | null | 150 | normal | Triglycerides are normal. | 0.97 |

---

### Report 5 markers (Annual panel 2025 — 1 flag, 2 watch)

| name | code | value | unit | referenceMin | referenceMax | status | explanation | confidence |
|---|---|---|---|---|---|---|---|---|
| LDL Cholesterol | LDL-C | 131 | mg/dL | null | 100 | flagged | LDL is elevated and trending upward from your last test. Worth discussing with your doctor. | 0.98 |
| Vitamin D | 25(OH)D | 26 | ng/mL | 30 | 100 | borderline | Vitamin D is just below the normal threshold — mildly low and trending downward. | 0.97 |
| Ferritin | FER | 44 | ng/mL | 30 | 300 | borderline | Ferritin is in range but on the lower end, continuing a downward trend. | 0.96 |

---

### Report 8 markers (Dad — 3 flags, 2 watch)

| name | code | value | unit | referenceMin | referenceMax | status | explanation | confidence |
|---|---|---|---|---|---|---|---|---|
| HbA1c | A1c | 6.1 | % | null | 5.7 | flagged | HbA1c is in the prediabetic range (5.7–6.4%). This warrants a follow-up conversation with his doctor about blood sugar management. | 0.99 |
| LDL Cholesterol | LDL-C | 158 | mg/dL | null | 100 | flagged | LDL is elevated. Given his age and other risk factors, this should be discussed with his doctor. | 0.98 |
| PSA | PSA | 5.2 | ng/mL | null | 4.0 | flagged | PSA is slightly above the age-adjusted threshold. This doesn't confirm any condition but warrants follow-up. | 0.95 |
| Creatinine | CREAT | 1.3 | mg/dL | 0.7 | 1.2 | borderline | Creatinine is marginally elevated. His doctor may want to monitor kidney function. | 0.97 |
| Ferritin | FER | 28 | ng/mL | 30 | 300 | borderline | Ferritin is just below the reference minimum. Worth discussing iron stores. | 0.96 |

---

## 5. Questions

Seed questions for Report 7 (primary demo report — 5 questions) and Report 8 (Dad — 4 questions).

### Report 7 questions

| priority | text | relatedTo | isChecked |
|---|---|---|---|
| 1 | Is 2,000 IU daily enough for my vitamin D, or do I need a loading dose? | Vitamin D | false |
| 2 | When should I retest vitamin D — 3 months or 6? | Vitamin D | false |
| 3 | What's my 10-year cardiovascular risk score given this LDL trend? | LDL Cholesterol | false |
| 4 | Is diet and exercise the right first step for LDL, or should we discuss medication? | LDL Cholesterol | false |
| 5 | Would a full iron panel (iron, TIBC, saturation) be useful given my ferritin trend? | Ferritin | false |

### Report 8 questions (Dad)

| priority | text | relatedTo | isChecked |
|---|---|---|---|
| 1 | His HbA1c is 6.1 — what lifestyle changes should we focus on before the next test? | HbA1c | false |
| 2 | Should we repeat the PSA test and do a digital rectal exam given the elevated result? | PSA | false |
| 3 | Is his LDL elevation high enough to consider a statin at his age? | LDL Cholesterol | false |
| 4 | Does the mildly elevated creatinine warrant a full kidney function workup? | Creatinine | false |

---

## 6. MarkerCatalog

Seed the full reference catalog of 25 commonly tested biomarkers. This table drives reference ranges, urgency thresholds, categorization, and alias matching for the AI extraction pipeline.

| canonicalName | aliases | category | whatItMeasures | normalRangeMin | normalRangeMax | unit | urgentHigh | urgentLow |
|---|---|---|---|---|---|---|---|---|
| LDL Cholesterol | LDL, LDL-C, Low-Density Lipoprotein | lipids | Low-density lipoprotein — the primary driver of cardiovascular risk when elevated over time. | null | 100 | mg/dL | null | null |
| HDL Cholesterol | HDL, HDL-C, High-Density Lipoprotein | lipids | High-density lipoprotein — removes other cholesterol from the bloodstream. Higher is better. | 40 | null | mg/dL | null | null |
| Total Cholesterol | Total-C, Cholesterol Total | lipids | The combined measure of all cholesterol in the blood. Interpreted alongside LDL and HDL. | null | 200 | mg/dL | null | null |
| Triglycerides | TG, Triglycerides Serum | lipids | Blood fat measured after eating. Elevated levels signal metabolic risk. | null | 150 | mg/dL | 1000 | null |
| HbA1c | A1c, Hemoglobin A1c, Glycated Hemoglobin, HbA1c | metabolic | Average blood glucose over the past 2–3 months. The gold standard for diabetes screening. | null | 5.7 | % | 10 | null |
| Fasting Glucose | FBG, Fasting Blood Sugar, Glucose Fasting | metabolic | Blood sugar level after an overnight fast. A snapshot of current glucose regulation. | 70 | 99 | mg/dL | 400 | 50 |
| Insulin | INS, Fasting Insulin | metabolic | The hormone that regulates blood sugar. Elevated fasting insulin is an early marker of insulin resistance. | 2 | 20 | μIU/mL | null | null |
| TSH | TSH, Thyroid Stimulating Hormone | thyroid | The pituitary signal to the thyroid gland. The first-line test for thyroid function. | 0.4 | 4.0 | μIU/mL | null | null |
| Free T4 | FT4, Free Thyroxine, T4 Free | thyroid | The active form of thyroid hormone. Measured alongside TSH to assess thyroid output. | 0.8 | 1.8 | ng/dL | null | null |
| Free T3 | FT3, Free Triiodothyronine, T3 Free | thyroid | The most metabolically active thyroid hormone. Often added to TSH and T4 for a full thyroid picture. | 2.3 | 4.2 | pg/mL | null | null |
| Vitamin D | 25(OH)D, Vitamin D 25-Hydroxy, Cholecalciferol | vitamins | The storage form of vitamin D. Supports calcium absorption, immunity, and bone health. | 30 | 100 | ng/mL | null | null |
| Ferritin | FER, Serum Ferritin | vitamins | A measure of stored iron. Low ferritin precedes anemia and can cause fatigue even when technically in range. | 30 | 300 | ng/mL | null | 10 |
| Vitamin B12 | B12, Cobalamin, Cyanocobalamin | vitamins | Essential for nerve function and red blood cell production. | 200 | 900 | pg/mL | null | null |
| Magnesium | Mg, Serum Magnesium | vitamins | Involved in hundreds of enzymatic reactions. Deficiency is common and often underdiagnosed. | 1.7 | 2.2 | mg/dL | null | null |
| Hemoglobin | HGB, Hgb | bloodCount | The oxygen-carrying protein in red blood cells. Low values indicate anemia. | 12 | 17.5 | g/dL | null | 7 |
| Hematocrit | HCT, Hct | bloodCount | The proportion of blood volume made up of red blood cells. | 36 | 50 | % | null | 21 |
| WBC | WBC, White Blood Cell Count, Leukocytes | bloodCount | Counts immune cells that fight infection. Very high or low values can indicate disease. | 4 | 11 | k/μL | 30 | 1.5 |
| Platelets | PLT, Platelet Count, Thrombocytes | bloodCount | Cells involved in blood clotting. Critical for preventing excessive bleeding. | 150 | 400 | k/μL | 1000 | 50 |
| Creatinine | CREAT, Serum Creatinine | kidney | A waste product filtered by the kidneys. Elevated values signal reduced kidney function. | 0.6 | 1.2 | mg/dL | 10 | null |
| eGFR | eGFR, Estimated Glomerular Filtration Rate | kidney | Estimates how well the kidneys filter waste per minute. Values below 60 suggest reduced function. | 60 | null | mL/min | null | 15 |
| ALT | ALT, Alanine Aminotransferase, SGPT | liver | A liver enzyme elevated when liver cells are damaged. The primary marker for liver inflammation. | 7 | 56 | U/L | 500 | null |
| AST | AST, Aspartate Aminotransferase, SGOT | liver | Liver and muscle enzyme. Elevated alongside ALT usually indicates liver issues. | 10 | 40 | U/L | 500 | null |
| PSA | PSA, Prostate-Specific Antigen, Total PSA | other | A protein produced by the prostate. Age-adjusted elevated levels warrant further investigation. | null | 4.0 | ng/mL | null | null |
| Potassium | K, Serum Potassium, Potassium Serum | other | Electrolyte critical for heart and muscle function. Both high and low values can be dangerous. | 3.5 | 5.1 | mEq/L | 6.0 | 2.5 |
| Troponin | Troponin I, Troponin T, cTnI, cTnT | other | Cardiac muscle protein. Any detectable elevation is a medical emergency indicating heart muscle damage. | null | 0.04 | ng/mL | 0.04 | null |

---

## 7. Notification Preferences

Seed default preferences for the demo user:

| Field | Value |
|---|---|
| `flaggedMarkerReminders` | `true` |
| `monthlyCheckInNudge` | `true` |
| `productUpdates` | `false` |

---

## 8. Seed execution order

Run in this exact order to satisfy foreign-key constraints:

```
1. MarkerCatalog   (no dependencies)
2. User            (no dependencies)
3. Profile         (depends on User)
4. Report          (depends on User + Profile)
5. Marker          (depends on Report)
6. Question        (depends on Report)
7. NotificationPreferences (depends on User)
```

---

## 9. Cleanup before seeding

```ts
// Delete in reverse dependency order
await prisma.question.deleteMany();
await prisma.marker.deleteMany();
await prisma.report.deleteMany();
await prisma.profile.deleteMany();
await prisma.notificationPreferences.deleteMany();
await prisma.user.deleteMany();
await prisma.markerCatalog.deleteMany();
```

---

## 10. Demo login credentials

| Field | Value |
|---|---|
| Email | `demo@lumen.health` |
| Password | `12345678` |

---

## Notes

- All `confidence` values are floats between 0 and 1. Values ≥ 0.95 indicate high extraction certainty.
- `urgentHigh` and `urgentLow` in the MarkerCatalog bypass the LLM entirely and trigger hard-coded "Contact your doctor or go to the ER" language in the translation pipeline.
- The Potassium `urgentHigh: 6.0` and Troponin `urgentHigh: 0.04` entries are safety-critical — never remove or modify these during development.
- `biologicalSex` on User and Profile is used exclusively for cohort benchmarks (Pro feature). It is never surfaced in medical advice or explanations.
- The `isChecked` field on Question is a UI-only state and may live in the client rather than the database. Include it in the seed for completeness.
