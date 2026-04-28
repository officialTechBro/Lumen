import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  // ── Cleanup (reverse FK order) ─────────────────────────────────────
  await prisma.auditLog.deleteMany();
  await prisma.notificationPreferences.deleteMany();
  await prisma.reminder.deleteMany();
  await prisma.question.deleteMany();
  await prisma.marker.deleteMany();
  await prisma.report.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.markerCatalog.deleteMany();

  // ── 1. MarkerCatalog ───────────────────────────────────────────────
  await prisma.markerCatalog.createMany({
    data: [
      {
        canonicalName: "LDL Cholesterol",
        aliases: ["LDL", "LDL-C", "Low-Density Lipoprotein"],
        category: "lipids",
        whatItMeasures: "Low-density lipoprotein — the primary driver of cardiovascular risk when elevated over time.",
        normalRangeMin: null,
        normalRangeMax: 100,
        unit: "mg/dL",
        urgentHigh: null,
        urgentLow: null,
      },
      {
        canonicalName: "HDL Cholesterol",
        aliases: ["HDL", "HDL-C", "High-Density Lipoprotein"],
        category: "lipids",
        whatItMeasures: "High-density lipoprotein — removes other cholesterol from the bloodstream. Higher is better.",
        normalRangeMin: 40,
        normalRangeMax: null,
        unit: "mg/dL",
        urgentHigh: null,
        urgentLow: null,
      },
      {
        canonicalName: "Total Cholesterol",
        aliases: ["Total-C", "Cholesterol Total"],
        category: "lipids",
        whatItMeasures: "The combined measure of all cholesterol in the blood. Interpreted alongside LDL and HDL.",
        normalRangeMin: null,
        normalRangeMax: 200,
        unit: "mg/dL",
        urgentHigh: null,
        urgentLow: null,
      },
      {
        canonicalName: "Triglycerides",
        aliases: ["TG", "Triglycerides Serum"],
        category: "lipids",
        whatItMeasures: "Blood fat measured after eating. Elevated levels signal metabolic risk.",
        normalRangeMin: null,
        normalRangeMax: 150,
        unit: "mg/dL",
        urgentHigh: 1000,
        urgentLow: null,
      },
      {
        canonicalName: "HbA1c",
        aliases: ["A1c", "Hemoglobin A1c", "Glycated Hemoglobin", "HbA1c"],
        category: "metabolic",
        whatItMeasures: "Average blood glucose over the past 2–3 months. The gold standard for diabetes screening.",
        normalRangeMin: null,
        normalRangeMax: 5.7,
        unit: "%",
        urgentHigh: 10,
        urgentLow: null,
      },
      {
        canonicalName: "Fasting Glucose",
        aliases: ["FBG", "Fasting Blood Sugar", "Glucose Fasting"],
        category: "metabolic",
        whatItMeasures: "Blood sugar level after an overnight fast. A snapshot of current glucose regulation.",
        normalRangeMin: 70,
        normalRangeMax: 99,
        unit: "mg/dL",
        urgentHigh: 400,
        urgentLow: 50,
      },
      {
        canonicalName: "Insulin",
        aliases: ["INS", "Fasting Insulin"],
        category: "metabolic",
        whatItMeasures: "The hormone that regulates blood sugar. Elevated fasting insulin is an early marker of insulin resistance.",
        normalRangeMin: 2,
        normalRangeMax: 20,
        unit: "μIU/mL",
        urgentHigh: null,
        urgentLow: null,
      },
      {
        canonicalName: "TSH",
        aliases: ["TSH", "Thyroid Stimulating Hormone"],
        category: "thyroid",
        whatItMeasures: "The pituitary signal to the thyroid gland. The first-line test for thyroid function.",
        normalRangeMin: 0.4,
        normalRangeMax: 4.0,
        unit: "μIU/mL",
        urgentHigh: null,
        urgentLow: null,
      },
      {
        canonicalName: "Free T4",
        aliases: ["FT4", "Free Thyroxine", "T4 Free"],
        category: "thyroid",
        whatItMeasures: "The active form of thyroid hormone. Measured alongside TSH to assess thyroid output.",
        normalRangeMin: 0.8,
        normalRangeMax: 1.8,
        unit: "ng/dL",
        urgentHigh: null,
        urgentLow: null,
      },
      {
        canonicalName: "Free T3",
        aliases: ["FT3", "Free Triiodothyronine", "T3 Free"],
        category: "thyroid",
        whatItMeasures: "The most metabolically active thyroid hormone. Often added to TSH and T4 for a full thyroid picture.",
        normalRangeMin: 2.3,
        normalRangeMax: 4.2,
        unit: "pg/mL",
        urgentHigh: null,
        urgentLow: null,
      },
      {
        canonicalName: "Vitamin D",
        aliases: ["25(OH)D", "Vitamin D 25-Hydroxy", "Cholecalciferol"],
        category: "vitamins",
        whatItMeasures: "The storage form of vitamin D. Supports calcium absorption, immunity, and bone health.",
        normalRangeMin: 30,
        normalRangeMax: 100,
        unit: "ng/mL",
        urgentHigh: null,
        urgentLow: null,
      },
      {
        canonicalName: "Ferritin",
        aliases: ["FER", "Serum Ferritin"],
        category: "vitamins",
        whatItMeasures: "A measure of stored iron. Low ferritin precedes anemia and can cause fatigue even when technically in range.",
        normalRangeMin: 30,
        normalRangeMax: 300,
        unit: "ng/mL",
        urgentHigh: null,
        urgentLow: 10,
      },
      {
        canonicalName: "Vitamin B12",
        aliases: ["B12", "Cobalamin", "Cyanocobalamin"],
        category: "vitamins",
        whatItMeasures: "Essential for nerve function and red blood cell production.",
        normalRangeMin: 200,
        normalRangeMax: 900,
        unit: "pg/mL",
        urgentHigh: null,
        urgentLow: null,
      },
      {
        canonicalName: "Magnesium",
        aliases: ["Mg", "Serum Magnesium"],
        category: "vitamins",
        whatItMeasures: "Involved in hundreds of enzymatic reactions. Deficiency is common and often underdiagnosed.",
        normalRangeMin: 1.7,
        normalRangeMax: 2.2,
        unit: "mg/dL",
        urgentHigh: null,
        urgentLow: null,
      },
      {
        canonicalName: "Hemoglobin",
        aliases: ["HGB", "Hgb"],
        category: "bloodCount",
        whatItMeasures: "The oxygen-carrying protein in red blood cells. Low values indicate anemia.",
        normalRangeMin: 12,
        normalRangeMax: 17.5,
        unit: "g/dL",
        urgentHigh: null,
        urgentLow: 7,
      },
      {
        canonicalName: "Hematocrit",
        aliases: ["HCT", "Hct"],
        category: "bloodCount",
        whatItMeasures: "The proportion of blood volume made up of red blood cells.",
        normalRangeMin: 36,
        normalRangeMax: 50,
        unit: "%",
        urgentHigh: null,
        urgentLow: 21,
      },
      {
        canonicalName: "WBC",
        aliases: ["WBC", "White Blood Cell Count", "Leukocytes"],
        category: "bloodCount",
        whatItMeasures: "Counts immune cells that fight infection. Very high or low values can indicate disease.",
        normalRangeMin: 4,
        normalRangeMax: 11,
        unit: "k/μL",
        urgentHigh: 30,
        urgentLow: 1.5,
      },
      {
        canonicalName: "Platelets",
        aliases: ["PLT", "Platelet Count", "Thrombocytes"],
        category: "bloodCount",
        whatItMeasures: "Cells involved in blood clotting. Critical for preventing excessive bleeding.",
        normalRangeMin: 150,
        normalRangeMax: 400,
        unit: "k/μL",
        urgentHigh: 1000,
        urgentLow: 50,
      },
      {
        canonicalName: "Creatinine",
        aliases: ["CREAT", "Serum Creatinine"],
        category: "kidney",
        whatItMeasures: "A waste product filtered by the kidneys. Elevated values signal reduced kidney function.",
        normalRangeMin: 0.6,
        normalRangeMax: 1.2,
        unit: "mg/dL",
        urgentHigh: 10,
        urgentLow: null,
      },
      {
        canonicalName: "eGFR",
        aliases: ["eGFR", "Estimated Glomerular Filtration Rate"],
        category: "kidney",
        whatItMeasures: "Estimates how well the kidneys filter waste per minute. Values below 60 suggest reduced function.",
        normalRangeMin: 60,
        normalRangeMax: null,
        unit: "mL/min",
        urgentHigh: null,
        urgentLow: 15,
      },
      {
        canonicalName: "ALT",
        aliases: ["ALT", "Alanine Aminotransferase", "SGPT"],
        category: "liver",
        whatItMeasures: "A liver enzyme elevated when liver cells are damaged. The primary marker for liver inflammation.",
        normalRangeMin: 7,
        normalRangeMax: 56,
        unit: "U/L",
        urgentHigh: 500,
        urgentLow: null,
      },
      {
        canonicalName: "AST",
        aliases: ["AST", "Aspartate Aminotransferase", "SGOT"],
        category: "liver",
        whatItMeasures: "Liver and muscle enzyme. Elevated alongside ALT usually indicates liver issues.",
        normalRangeMin: 10,
        normalRangeMax: 40,
        unit: "U/L",
        urgentHigh: 500,
        urgentLow: null,
      },
      {
        canonicalName: "PSA",
        aliases: ["PSA", "Prostate-Specific Antigen", "Total PSA"],
        category: "other",
        whatItMeasures: "A protein produced by the prostate. Age-adjusted elevated levels warrant further investigation.",
        normalRangeMin: null,
        normalRangeMax: 4.0,
        unit: "ng/mL",
        urgentHigh: null,
        urgentLow: null,
      },
      {
        canonicalName: "Potassium",
        aliases: ["K", "Serum Potassium", "Potassium Serum"],
        category: "other",
        whatItMeasures: "Electrolyte critical for heart and muscle function. Both high and low values can be dangerous.",
        normalRangeMin: 3.5,
        normalRangeMax: 5.1,
        unit: "mEq/L",
        urgentHigh: 6.0,
        urgentLow: 2.5,
      },
      {
        canonicalName: "Troponin",
        aliases: ["Troponin I", "Troponin T", "cTnI", "cTnT"],
        category: "other",
        whatItMeasures: "Cardiac muscle protein. Any detectable elevation is a medical emergency indicating heart muscle damage.",
        normalRangeMin: null,
        normalRangeMax: 0.04,
        unit: "ng/mL",
        urgentHigh: 0.04,
        urgentLow: null,
      },
    ],
  });

  // ── 2. User ────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("12345678", 12);
  const user = await prisma.user.create({
    data: {
      email: "demo@lumen.health",
      fullName: "Sarah Chen",
      password: passwordHash,
      dateOfBirth: new Date("1989-04-12"),
      biologicalSex: "female",
      isPro: true,
      emailVerified: new Date(),
      stripeCustomerId: "cus_demo_sarah_chen",
      stripeSubscriptionId: "sub_demo_lumen_plus",
    },
  });

  // ── 3. Profiles ────────────────────────────────────────────────────
  const sarahProfile = await prisma.profile.create({
    data: {
      name: "Sarah (Me)",
      dateOfBirth: new Date("1989-04-12"),
      biologicalSex: "female",
      relationship: "self",
      userId: user.id,
    },
  });

  const dadProfile = await prisma.profile.create({
    data: {
      name: "Dad",
      dateOfBirth: new Date("1958-11-03"),
      biologicalSex: "male",
      relationship: "parent",
      userId: user.id,
    },
  });

  // ── 4. Reports ─────────────────────────────────────────────────────
  await prisma.report.create({
    data: {
      title: "Baseline panel",
      source: "pdf",
      fileName: "quest-baseline-2024-02.pdf",
      labProvider: "Quest Diagnostics",
      collectedAt: new Date("2024-02-09"),
      status: "ready",
      flagCount: 0,
      urgentFlag: false,
      watchCount: 1,
      summary: "Your baseline panel is largely within normal limits. Ferritin is sitting at the lower end of its range — worth keeping an eye on but not urgent. Everything else looks good.",
      userId: user.id,
      profileId: sarahProfile.id,
    },
  });

  await prisma.report.create({
    data: {
      title: "Metabolic panel",
      source: "pdf",
      fileName: "quest-metabolic-2024-04.pdf",
      labProvider: "Quest Diagnostics",
      collectedAt: new Date("2024-04-19"),
      status: "ready",
      flagCount: 0,
      urgentFlag: false,
      watchCount: 0,
      summary: "All 14 metabolic markers are within normal range. Blood sugar, kidney function, and liver enzymes all look healthy. No action needed.",
      userId: user.id,
      profileId: sarahProfile.id,
    },
  });

  const report3 = await prisma.report.create({
    data: {
      title: "Lipid panel",
      source: "pdf",
      fileName: "quest-lipid-2024-06.pdf",
      labProvider: "Quest Diagnostics",
      collectedAt: new Date("2024-06-04"),
      status: "ready",
      flagCount: 1,
      urgentFlag: false,
      watchCount: 0,
      summary: "LDL cholesterol is slightly elevated at 118 mg/dL — above the ideal threshold but not in alarming territory. Everything else in this lipid panel is normal. Worth mentioning at your next visit.",
      userId: user.id,
      profileId: sarahProfile.id,
    },
  });

  await prisma.report.create({
    data: {
      title: "Thyroid check",
      source: "photo",
      fileName: "kaiser-thyroid-2024-10.jpg",
      labProvider: "Kaiser Permanente",
      collectedAt: new Date("2024-10-22"),
      status: "ready",
      flagCount: 0,
      urgentFlag: false,
      watchCount: 0,
      summary: "TSH and Free T4 are both squarely within normal range. Your thyroid appears to be functioning well. No follow-up needed on this panel.",
      userId: user.id,
      profileId: sarahProfile.id,
    },
  });

  const report5 = await prisma.report.create({
    data: {
      title: "Annual panel",
      source: "pdf",
      fileName: "quest-annual-2025-03.pdf",
      labProvider: "Quest Diagnostics",
      collectedAt: new Date("2025-03-11"),
      status: "ready",
      flagCount: 1,
      urgentFlag: false,
      watchCount: 2,
      summary: "LDL continues to trend upward at 131 mg/dL. Vitamin D has dropped into the low range and ferritin is still sitting at the low end. These three markers deserve attention at your next appointment.",
      userId: user.id,
      profileId: sarahProfile.id,
    },
  });

  await prisma.report.create({
    data: {
      title: "Follow-up lipids",
      source: "pdf",
      fileName: "labcorp-followup-2025-09.pdf",
      labProvider: "Labcorp",
      collectedAt: new Date("2025-09-02"),
      status: "ready",
      flagCount: 1,
      urgentFlag: false,
      watchCount: 1,
      summary: "LDL has come down slightly to 138 mg/dL following dietary changes — still flagged but trending in the right direction. HDL improved marginally. One watch marker on ferritin.",
      userId: user.id,
      profileId: sarahProfile.id,
    },
  });

  const report7 = await prisma.report.create({
    data: {
      title: "Annual panel",
      source: "pdf",
      fileName: "quest-annual-2026-03.pdf",
      labProvider: "Quest Diagnostics",
      collectedAt: new Date("2026-03-14"),
      status: "ready",
      flagCount: 2,
      urgentFlag: false,
      watchCount: 1,
      summary: "Your annual panel looks largely healthy, with two things worth discussing at your next appointment. Your LDL cholesterol is elevated — not alarming, but higher than the ideal target — and your vitamin D is mildly low, which is common and straightforward to address. Everything else, including your blood sugar, thyroid, and kidney function, is within normal range.",
      userId: user.id,
      profileId: sarahProfile.id,
    },
  });

  const report8 = await prisma.report.create({
    data: {
      title: "Annual panel",
      source: "pdf",
      fileName: "kaiser-dad-annual-2026-01.pdf",
      labProvider: "Kaiser Permanente",
      collectedAt: new Date("2026-01-08"),
      status: "ready",
      flagCount: 3,
      urgentFlag: false,
      watchCount: 2,
      summary: "Three markers flagged across this panel — HbA1c is in prediabetic range, LDL is elevated, and PSA is slightly above the age-adjusted threshold. Two watch items on creatinine and ferritin. This panel warrants a follow-up conversation with his doctor.",
      userId: user.id,
      profileId: dadProfile.id,
    },
  });

  // ── 5. Markers ─────────────────────────────────────────────────────

  // Report 3 — Lipid panel (1 flag)
  await prisma.marker.createMany({
    data: [
      {
        name: "LDL Cholesterol", code: "LDL-C", category: "lipids",
        value: 118, unit: "mg/dL", referenceMin: null, referenceMax: 100,
        status: "flagged",
        explanation: "LDL is slightly above the ideal threshold. Diet changes are often the first step.",
        confidence: 0.98, reportId: report3.id,
      },
      {
        name: "HDL Cholesterol", code: "HDL-C", category: "lipids",
        value: 54, unit: "mg/dL", referenceMin: 40, referenceMax: null,
        status: "normal",
        explanation: "HDL is in a healthy range.",
        confidence: 0.98, reportId: report3.id,
      },
      {
        name: "Total Cholesterol", code: "Total-C", category: "lipids",
        value: 194, unit: "mg/dL", referenceMin: null, referenceMax: 200,
        status: "normal",
        explanation: "Total cholesterol is within the acceptable range.",
        confidence: 0.97, reportId: report3.id,
      },
      {
        name: "Triglycerides", code: "TG", category: "lipids",
        value: 96, unit: "mg/dL", referenceMin: null, referenceMax: 150,
        status: "normal",
        explanation: "Triglycerides are normal.",
        confidence: 0.97, reportId: report3.id,
      },
    ],
  });

  // Report 5 — Annual panel 2025 (1 flag, 2 watch)
  await prisma.marker.createMany({
    data: [
      {
        name: "LDL Cholesterol", code: "LDL-C", category: "lipids",
        value: 131, unit: "mg/dL", referenceMin: null, referenceMax: 100,
        status: "flagged",
        explanation: "LDL is elevated and trending upward from your last test. Worth discussing with your doctor.",
        confidence: 0.98, reportId: report5.id,
      },
      {
        name: "Vitamin D", code: "25(OH)D", category: "vitamins",
        value: 26, unit: "ng/mL", referenceMin: 30, referenceMax: 100,
        status: "borderline",
        explanation: "Vitamin D is just below the normal threshold — mildly low and trending downward.",
        confidence: 0.97, reportId: report5.id,
      },
      {
        name: "Ferritin", code: "FER", category: "vitamins",
        value: 44, unit: "ng/mL", referenceMin: 30, referenceMax: 300,
        status: "borderline",
        explanation: "Ferritin is in range but on the lower end, continuing a downward trend.",
        confidence: 0.96, reportId: report5.id,
      },
    ],
  });

  // Report 7 — Annual panel 2026 (all 21 markers)
  await prisma.marker.createMany({
    data: [
      // LIPIDS
      {
        name: "LDL Cholesterol", code: "LDL-C", category: "lipids",
        value: 142, unit: "mg/dL", referenceMin: null, referenceMax: 100,
        status: "flagged",
        explanation: "Your LDL is elevated — not alarming, but higher than the ideal target. Worth a conversation about diet and risk.",
        whatItMeasures: "Measures the amount of low-density lipoprotein cholesterol in your blood, which correlates with cardiovascular risk over time.",
        confidence: 0.98, reportId: report7.id,
      },
      {
        name: "HDL Cholesterol", code: "HDL-C", category: "lipids",
        value: 58, unit: "mg/dL", referenceMin: 40, referenceMax: null,
        status: "normal",
        explanation: "Your HDL is in a good range. Higher HDL is associated with lower cardiovascular risk.",
        whatItMeasures: "Measures high-density lipoprotein, the so-called \"good\" cholesterol that helps remove other forms of cholesterol.",
        confidence: 0.98, reportId: report7.id,
      },
      {
        name: "Total Cholesterol", code: "Total-C", category: "lipids",
        value: 210, unit: "mg/dL", referenceMin: null, referenceMax: 200,
        status: "borderline",
        explanation: "Total cholesterol is just above the ideal threshold. LDL is the main driver — see that result.",
        whatItMeasures: "The sum of all cholesterol types in your blood. Considered alongside individual components for a full picture.",
        confidence: 0.97, reportId: report7.id,
      },
      {
        name: "Triglycerides", code: "TG", category: "lipids",
        value: 88, unit: "mg/dL", referenceMin: null, referenceMax: 150,
        status: "normal",
        explanation: "Triglycerides are well within normal range. No action needed.",
        whatItMeasures: "Measures fat in the blood after eating. Elevated levels can signal metabolic risk when combined with other markers.",
        confidence: 0.98, reportId: report7.id,
      },
      // METABOLIC
      {
        name: "HbA1c", code: "A1c", category: "metabolic",
        value: 5.4, unit: "%", referenceMin: null, referenceMax: 5.7,
        status: "normal",
        explanation: "Your 3-month blood sugar average is well within the healthy range. No signs of prediabetes.",
        whatItMeasures: "Reflects average blood glucose over the past 2–3 months. Used to screen for and monitor diabetes.",
        confidence: 0.99, reportId: report7.id,
      },
      {
        name: "Fasting Glucose", code: "FBG", category: "metabolic",
        value: 94, unit: "mg/dL", referenceMin: 70, referenceMax: 99,
        status: "normal",
        explanation: "Blood sugar is normal. This is a snapshot of glucose at the time of the blood draw.",
        whatItMeasures: "Measures blood sugar after an overnight fast. Elevated levels can indicate insulin resistance or diabetes.",
        confidence: 0.98, reportId: report7.id,
      },
      {
        name: "Insulin", code: "INS", category: "metabolic",
        value: 7.2, unit: "μIU/mL", referenceMin: 2, referenceMax: 20,
        status: "normal",
        explanation: "Insulin level is within normal range, consistent with good insulin sensitivity.",
        whatItMeasures: "Measures the hormone that regulates blood sugar. Elevated fasting insulin can be an early sign of insulin resistance.",
        confidence: 0.94, reportId: report7.id,
      },
      // THYROID
      {
        name: "TSH", code: "TSH", category: "thyroid",
        value: 2.1, unit: "μIU/mL", referenceMin: 0.4, referenceMax: 4.0,
        status: "normal",
        explanation: "TSH is right in the middle of normal. Your thyroid signaling looks healthy.",
        whatItMeasures: "The pituitary gland's signal to the thyroid. Abnormal values indicate under- or over-active thyroid function.",
        confidence: 0.99, reportId: report7.id,
      },
      {
        name: "Free T4", code: "FT4", category: "thyroid",
        value: 1.2, unit: "ng/dL", referenceMin: 0.8, referenceMax: 1.8,
        status: "normal",
        explanation: "Free T4 is within normal range, consistent with normal thyroid hormone production.",
        whatItMeasures: "The active form of thyroid hormone circulating in the blood. Works alongside TSH to assess thyroid function.",
        confidence: 0.97, reportId: report7.id,
      },
      // VITAMINS & MINERALS
      {
        name: "Vitamin D", code: "25(OH)D", category: "vitamins",
        value: 24, unit: "ng/mL", referenceMin: 30, referenceMax: 100,
        status: "flagged",
        explanation: "Your vitamin D is mildly low. Common in winter or if you spend most days indoors.",
        whatItMeasures: "Measures the storage form of vitamin D, which supports calcium absorption, immune function, and bone health.",
        confidence: 0.97, reportId: report7.id,
      },
      {
        name: "Ferritin", code: "FER", category: "vitamins",
        value: 38, unit: "ng/mL", referenceMin: 30, referenceMax: 300,
        status: "borderline",
        explanation: "In range but on the low end. Worth monitoring — some people feel symptoms before the number drops below the reference floor.",
        whatItMeasures: "Reflects how much iron your body has stored. Low ferritin can cause fatigue and poor concentration even when technically in range.",
        confidence: 0.96, reportId: report7.id,
      },
      {
        name: "Vitamin B12", code: "B12", category: "vitamins",
        value: 420, unit: "pg/mL", referenceMin: 200, referenceMax: 900,
        status: "normal",
        explanation: "Vitamin B12 is within normal range. No supplementation needed based on this result.",
        whatItMeasures: "Essential for nerve function and red blood cell production. Deficiency can cause fatigue and neurological symptoms.",
        confidence: 0.97, reportId: report7.id,
      },
      {
        name: "Magnesium", code: "Mg", category: "vitamins",
        value: 2.1, unit: "mg/dL", referenceMin: 1.7, referenceMax: 2.2,
        status: "normal",
        explanation: "Magnesium is within normal range.",
        whatItMeasures: "Plays a role in hundreds of enzymatic reactions including muscle function, nerve signaling, and energy production.",
        confidence: 0.95, reportId: report7.id,
      },
      // BLOOD COUNT
      {
        name: "Hemoglobin", code: "HGB", category: "bloodCount",
        value: 14.2, unit: "g/dL", referenceMin: 12, referenceMax: 16,
        status: "normal",
        explanation: "Hemoglobin is within the normal range for your sex.",
        whatItMeasures: "The protein in red blood cells that carries oxygen. Low levels indicate anemia; high levels can indicate dehydration or other conditions.",
        confidence: 0.99, reportId: report7.id,
      },
      {
        name: "Hematocrit", code: "HCT", category: "bloodCount",
        value: 42, unit: "%", referenceMin: 36, referenceMax: 46,
        status: "normal",
        explanation: "Hematocrit is normal — this measures the proportion of red blood cells in your blood.",
        whatItMeasures: "The percentage of blood volume made up of red blood cells. Used alongside hemoglobin to assess for anemia.",
        confidence: 0.98, reportId: report7.id,
      },
      {
        name: "WBC", code: "WBC", category: "bloodCount",
        value: 6.8, unit: "k/μL", referenceMin: 4, referenceMax: 11,
        status: "normal",
        explanation: "White blood cell count is normal. No signs of active infection or immune abnormality.",
        whatItMeasures: "Counts the white blood cells that fight infections and disease. Very high or low values can indicate infection, inflammation, or immune disorders.",
        confidence: 0.99, reportId: report7.id,
      },
      {
        name: "Platelets", code: "PLT", category: "bloodCount",
        value: 248, unit: "k/μL", referenceMin: 150, referenceMax: 400,
        status: "normal",
        explanation: "Platelet count is normal.",
        whatItMeasures: "Platelets are involved in blood clotting. Very low counts can cause bleeding problems; very high counts can signal bone marrow issues.",
        confidence: 0.99, reportId: report7.id,
      },
      // KIDNEY & LIVER
      {
        name: "Creatinine", code: "CREAT", category: "kidney",
        value: 0.9, unit: "mg/dL", referenceMin: 0.6, referenceMax: 1.1,
        status: "normal",
        explanation: "Creatinine is normal, suggesting healthy kidney filtering function.",
        whatItMeasures: "A waste product filtered by the kidneys. Elevated levels can indicate reduced kidney function.",
        confidence: 0.99, reportId: report7.id,
      },
      {
        name: "eGFR", code: "eGFR", category: "kidney",
        value: 96, unit: "mL/min", referenceMin: 60, referenceMax: null,
        status: "normal",
        explanation: "eGFR is well above the threshold for normal kidney function.",
        whatItMeasures: "Estimates how well the kidneys are filtering waste from the blood per minute. Values above 60 are generally considered normal.",
        confidence: 0.97, reportId: report7.id,
      },
      {
        name: "ALT", code: "ALT", category: "liver",
        value: 28, unit: "U/L", referenceMin: 7, referenceMax: 56,
        status: "normal",
        explanation: "ALT is within normal range, indicating healthy liver enzyme activity.",
        whatItMeasures: "A liver enzyme that leaks into the blood when liver cells are damaged. Elevated ALT can signal liver inflammation or injury.",
        confidence: 0.99, reportId: report7.id,
      },
      {
        name: "AST", code: "AST", category: "liver",
        value: 22, unit: "U/L", referenceMin: 10, referenceMax: 40,
        status: "normal",
        explanation: "AST is normal.",
        whatItMeasures: "An enzyme found in the liver, heart, and muscles. Elevated AST alongside ALT usually points to liver issues; isolated elevation can suggest muscle damage.",
        confidence: 0.98, reportId: report7.id,
      },
    ],
  });

  // Report 8 — Dad's annual panel (3 flags, 2 watch)
  await prisma.marker.createMany({
    data: [
      {
        name: "HbA1c", code: "A1c", category: "metabolic",
        value: 6.1, unit: "%", referenceMin: null, referenceMax: 5.7,
        status: "flagged",
        explanation: "HbA1c is in the prediabetic range (5.7–6.4%). This warrants a follow-up conversation with his doctor about blood sugar management.",
        confidence: 0.99, reportId: report8.id,
      },
      {
        name: "LDL Cholesterol", code: "LDL-C", category: "lipids",
        value: 158, unit: "mg/dL", referenceMin: null, referenceMax: 100,
        status: "flagged",
        explanation: "LDL is elevated. Given his age and other risk factors, this should be discussed with his doctor.",
        confidence: 0.98, reportId: report8.id,
      },
      {
        name: "PSA", code: "PSA", category: "other",
        value: 5.2, unit: "ng/mL", referenceMin: null, referenceMax: 4.0,
        status: "flagged",
        explanation: "PSA is slightly above the age-adjusted threshold. This doesn't confirm any condition but warrants follow-up.",
        confidence: 0.95, reportId: report8.id,
      },
      {
        name: "Creatinine", code: "CREAT", category: "kidney",
        value: 1.3, unit: "mg/dL", referenceMin: 0.7, referenceMax: 1.2,
        status: "borderline",
        explanation: "Creatinine is marginally elevated. His doctor may want to monitor kidney function.",
        confidence: 0.97, reportId: report8.id,
      },
      {
        name: "Ferritin", code: "FER", category: "vitamins",
        value: 28, unit: "ng/mL", referenceMin: 30, referenceMax: 300,
        status: "borderline",
        explanation: "Ferritin is just below the reference minimum. Worth discussing iron stores.",
        confidence: 0.96, reportId: report8.id,
      },
    ],
  });

  // ── 6. Questions ───────────────────────────────────────────────────

  // Report 7 questions
  await prisma.question.createMany({
    data: [
      { priority: 1, text: "Is 2,000 IU daily enough for my vitamin D, or do I need a loading dose?", relatedTo: "Vitamin D", isChecked: false, reportId: report7.id },
      { priority: 2, text: "When should I retest vitamin D — 3 months or 6?", relatedTo: "Vitamin D", isChecked: false, reportId: report7.id },
      { priority: 3, text: "What's my 10-year cardiovascular risk score given this LDL trend?", relatedTo: "LDL Cholesterol", isChecked: false, reportId: report7.id },
      { priority: 4, text: "Is diet and exercise the right first step for LDL, or should we discuss medication?", relatedTo: "LDL Cholesterol", isChecked: false, reportId: report7.id },
      { priority: 5, text: "Would a full iron panel (iron, TIBC, saturation) be useful given my ferritin trend?", relatedTo: "Ferritin", isChecked: false, reportId: report7.id },
    ],
  });

  // Report 8 questions (Dad)
  await prisma.question.createMany({
    data: [
      { priority: 1, text: "His HbA1c is 6.1 — what lifestyle changes should we focus on before the next test?", relatedTo: "HbA1c", isChecked: false, reportId: report8.id },
      { priority: 2, text: "Should we repeat the PSA test and do a digital rectal exam given the elevated result?", relatedTo: "PSA", isChecked: false, reportId: report8.id },
      { priority: 3, text: "Is his LDL elevation high enough to consider a statin at his age?", relatedTo: "LDL Cholesterol", isChecked: false, reportId: report8.id },
      { priority: 4, text: "Does the mildly elevated creatinine warrant a full kidney function workup?", relatedTo: "Creatinine", isChecked: false, reportId: report8.id },
    ],
  });

  // ── 7. NotificationPreferences ─────────────────────────────────────
  await prisma.notificationPreferences.create({
    data: {
      flaggedMarkerReminders: true,
      monthlyCheckInNudge: true,
      productUpdates: false,
      userId: user.id,
    },
  });

  console.log("✓ Seed complete");
  console.log(`  User:     demo@lumen.health / 12345678`);
  console.log(`  Profiles: ${sarahProfile.name}, ${dadProfile.name}`);
  console.log(`  Reports:  8 (7 Sarah, 1 Dad)`);
  console.log(`  Markers:  ${4 + 3 + 21 + 5} seeded`);
  console.log(`  Questions: 9 seeded`);
  console.log(`  Catalog:  25 entries`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
