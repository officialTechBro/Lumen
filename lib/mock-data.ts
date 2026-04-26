// Static mock data for dashboard UI development — replace with real DB queries once Prisma is wired.
import type { NavItem, HeroReport, ReportSummary, FlaggedMarker, TrendCell } from "@/lib/types";

// ── User ──────────────────────────────────────────────────────────────────────

export const MOCK_USER = {
  id: "user_01",
  email: "taiwooladosu1@gmail.com",
  fullName: "Taiwo Oladosu",
  dateOfBirth: "1992-06-14",
  biologicalSex: "male",
  isPro: true,
  createdAt: "2024-02-01T10:00:00Z",
};

// ── Profiles ──────────────────────────────────────────────────────────────────

export const MOCK_PROFILES = [
  {
    id: "profile_01",
    name: "Self",
    dateOfBirth: "1992-06-14",
    biologicalSex: "male",
    relationship: "self",
    userId: "user_01",
  },
];

// ── Reports (7 total — matches "TOTAL REPORTS 7" stat and recent reports list) ─

export const MOCK_REPORTS = [
  {
    id: "report_01",
    source: "pdf",
    fileName: "quest-annual-panel-mar-2026.pdf",
    labProvider: "Quest Diagnostics",
    collectedAt: "2026-03-14T08:30:00Z",
    uploadedAt: "2026-03-18T14:22:00Z",
    status: "ready",
    userId: "user_01",
    profileId: "profile_01",
    markerCount: 21,
    summary:
      "Annual panel, explained. Two markers need a conversation with your doctor, one worth watching.",
    flagCount: 2,
    noteCount: 1,
    urgentFlag: false,
  },
  {
    id: "report_02",
    source: "pdf",
    fileName: "labcorp-follow-up-oct-2025.pdf",
    labProvider: "LabCorp",
    collectedAt: "2025-10-11T09:00:00Z",
    uploadedAt: "2025-10-12T11:05:00Z",
    status: "ready",
    userId: "user_01",
    profileId: "profile_01",
    markerCount: 8,
    summary: "Follow-up panel. All markers within acceptable range.",
    flagCount: 0,
    noteCount: 0,
    urgentFlag: false,
  },
  {
    id: "report_03",
    source: "pdf",
    fileName: "labcorp-annual-panel-apr-2025.pdf",
    labProvider: "LabCorp",
    collectedAt: "2025-04-03T09:00:00Z",
    uploadedAt: "2025-04-04T10:30:00Z",
    status: "ready",
    userId: "user_01",
    profileId: "profile_01",
    markerCount: 19,
    summary:
      "Annual panel. Three markers flagged, one borderline. Vitamin D and LDL remain elevated.",
    flagCount: 3,
    noteCount: 1,
    urgentFlag: false,
  },
  {
    id: "report_04",
    source: "pdf",
    fileName: "kaiser-thyroid-check-oct-2024.pdf",
    labProvider: "Kaiser Permanente",
    collectedAt: "2024-10-10T07:45:00Z",
    uploadedAt: "2024-10-10T18:40:00Z",
    status: "ready",
    userId: "user_01",
    profileId: "profile_01",
    markerCount: 5,
    summary: "Thyroid panel. All values within normal limits.",
    flagCount: 0,
    noteCount: 0,
    urgentFlag: false,
  },
  {
    id: "report_05",
    source: "pdf",
    fileName: "quest-lipid-panel-jan-2024.pdf",
    labProvider: "Quest Diagnostics",
    collectedAt: "2024-01-04T08:00:00Z",
    uploadedAt: "2024-01-05T09:15:00Z",
    status: "ready",
    userId: "user_01",
    profileId: "profile_01",
    markerCount: 6,
    summary: "Lipid panel. LDL mildly elevated above optimal threshold.",
    flagCount: 1,
    noteCount: 0,
    urgentFlag: false,
  },
  {
    id: "report_06",
    source: "pdf",
    fileName: "quest-annual-panel-dec-2023.pdf",
    labProvider: "Quest Diagnostics",
    collectedAt: "2023-12-04T08:00:00Z",
    uploadedAt: "2023-12-05T12:00:00Z",
    status: "ready",
    userId: "user_01",
    profileId: "profile_01",
    markerCount: 18,
    summary: "Annual panel. One marker borderline, all others normal.",
    flagCount: 0,
    noteCount: 1,
    urgentFlag: false,
  },
  {
    id: "report_07",
    source: "pdf",
    fileName: "quest-wellness-oct-2023.pdf",
    labProvider: "Quest Diagnostics",
    collectedAt: "2023-10-20T09:30:00Z",
    uploadedAt: "2023-10-21T14:00:00Z",
    status: "ready",
    userId: "user_01",
    profileId: "profile_01",
    markerCount: 12,
    summary: "Wellness check. All values within normal limits.",
    flagCount: 0,
    noteCount: 0,
    urgentFlag: false,
  },
];

// ── Markers (latest report — report_01, 21 markers: 2 flagged, 1 borderline, 18 normal) ─

export const MOCK_MARKERS = [
  // Flagged — shown in "Needs attention"
  {
    id: "marker_01",
    reportId: "report_01",
    name: "Vitamin D",
    code: "VIT-D",
    value: 24,
    unit: "ng/mL",
    referenceMin: 30,
    referenceMax: 100,
    status: "flagged",
    explanation: "Mildly low. Common in winter.",
    whatItMeasures:
      "Reflects your body's vitamin D stores, supporting bone health, immune function, and mood regulation.",
    confidence: 0.96,
  },
  {
    id: "marker_02",
    reportId: "report_01",
    name: "LDL Cholesterol",
    code: "LDL-C",
    value: 142,
    unit: "mg/dL",
    referenceMin: null,
    referenceMax: 100,
    status: "flagged",
    explanation: "Above optimal. Diet and activity changes often help.",
    whatItMeasures:
      "Low-density lipoprotein carries cholesterol to arteries. Elevated levels increase cardiovascular risk over time.",
    confidence: 0.98,
  },
  // Borderline — the "1 NOTE"
  {
    id: "marker_03",
    reportId: "report_01",
    name: "Total Cholesterol",
    code: "TC",
    value: 204,
    unit: "mg/dL",
    referenceMin: null,
    referenceMax: 200,
    status: "borderline",
    explanation:
      "Marginally above the desirable threshold, driven largely by the elevated LDL.",
    whatItMeasures: "The combined measure of all cholesterol types in your blood.",
    confidence: 0.99,
  },
  // Normal
  {
    id: "marker_04",
    reportId: "report_01",
    name: "HDL Cholesterol",
    code: "HDL-C",
    value: 58,
    unit: "mg/dL",
    referenceMin: 40,
    referenceMax: null,
    status: "normal",
    explanation: "Your HDL ('good') cholesterol is in a healthy range.",
    whatItMeasures:
      "High-density lipoprotein removes cholesterol from arteries. Higher values are generally protective.",
    confidence: 0.98,
  },
  {
    id: "marker_05",
    reportId: "report_01",
    name: "Triglycerides",
    code: "TRIG",
    value: 98,
    unit: "mg/dL",
    referenceMin: null,
    referenceMax: 150,
    status: "normal",
    explanation: "Triglycerides are well within the normal range.",
    whatItMeasures:
      "A type of fat in the blood used for energy. High levels can increase heart disease risk.",
    confidence: 0.98,
  },
  {
    id: "marker_06",
    reportId: "report_01",
    name: "HbA1c",
    code: "HBA1C",
    value: 5.4,
    unit: "%",
    referenceMin: null,
    referenceMax: 5.7,
    status: "normal",
    explanation: "Blood sugar average over the past 3 months is healthy.",
    whatItMeasures:
      "Reflects average blood sugar over 2–3 months. The key marker for diabetes screening.",
    confidence: 0.97,
  },
  {
    id: "marker_07",
    reportId: "report_01",
    name: "Glucose (Fasting)",
    code: "GLU",
    value: 88,
    unit: "mg/dL",
    referenceMin: 70,
    referenceMax: 99,
    status: "normal",
    explanation: "Blood sugar is in the healthy fasting range.",
    whatItMeasures:
      "Amount of sugar in blood after fasting. Elevated levels may indicate pre-diabetes.",
    confidence: 0.99,
  },
  {
    id: "marker_08",
    reportId: "report_01",
    name: "TSH",
    code: "TSH",
    value: 2.1,
    unit: "mIU/L",
    referenceMin: 0.4,
    referenceMax: 4.0,
    status: "normal",
    explanation: "Thyroid-stimulating hormone is within the normal range.",
    whatItMeasures:
      "Signals the thyroid to produce hormones. Abnormal levels can indicate thyroid dysfunction.",
    confidence: 0.97,
  },
  {
    id: "marker_09",
    reportId: "report_01",
    name: "Free T4",
    code: "FT4",
    value: 1.1,
    unit: "ng/dL",
    referenceMin: 0.8,
    referenceMax: 1.8,
    status: "normal",
    explanation: "Free thyroid hormone is in the normal range.",
    whatItMeasures:
      "The active form of thyroid hormone circulating in blood. Used to assess thyroid function.",
    confidence: 0.97,
  },
  {
    id: "marker_10",
    reportId: "report_01",
    name: "Ferritin",
    code: "FERR",
    value: 38,
    unit: "ng/mL",
    referenceMin: 12,
    referenceMax: 150,
    status: "normal",
    explanation: "Iron stores are within the normal range.",
    whatItMeasures:
      "Reflects iron stores in the body. Low ferritin often indicates iron deficiency before anemia develops.",
    confidence: 0.97,
  },
  {
    id: "marker_11",
    reportId: "report_01",
    name: "Hemoglobin",
    code: "HGB",
    value: 14.8,
    unit: "g/dL",
    referenceMin: 13.5,
    referenceMax: 17.5,
    status: "normal",
    explanation: "Red blood cell oxygen-carrying capacity is normal.",
    whatItMeasures:
      "The protein in red blood cells that carries oxygen throughout the body.",
    confidence: 0.99,
  },
  {
    id: "marker_12",
    reportId: "report_01",
    name: "WBC",
    code: "WBC",
    value: 6.2,
    unit: "K/µL",
    referenceMin: 4.0,
    referenceMax: 11.0,
    status: "normal",
    explanation: "White blood cell count is within the normal range.",
    whatItMeasures:
      "White blood cells fight infection. Abnormal counts can indicate infection or immune issues.",
    confidence: 0.99,
  },
  {
    id: "marker_13",
    reportId: "report_01",
    name: "Platelets",
    code: "PLT",
    value: 248,
    unit: "K/µL",
    referenceMin: 150,
    referenceMax: 400,
    status: "normal",
    explanation: "Platelet count is normal.",
    whatItMeasures:
      "Platelets help blood clot. Low counts increase bleeding risk; high counts can increase clotting risk.",
    confidence: 0.99,
  },
  {
    id: "marker_14",
    reportId: "report_01",
    name: "Creatinine",
    code: "CREAT",
    value: 0.95,
    unit: "mg/dL",
    referenceMin: 0.7,
    referenceMax: 1.3,
    status: "normal",
    explanation: "Kidney waste clearance looks healthy.",
    whatItMeasures:
      "A waste product filtered by kidneys. Elevated levels may indicate reduced kidney function.",
    confidence: 0.99,
  },
  {
    id: "marker_15",
    reportId: "report_01",
    name: "eGFR",
    code: "EGFR",
    value: 98,
    unit: "mL/min/1.73m²",
    referenceMin: 60,
    referenceMax: null,
    status: "normal",
    explanation: "Kidney filtration rate is excellent.",
    whatItMeasures: "Estimates how well kidneys filter waste from blood.",
    confidence: 0.97,
  },
  {
    id: "marker_16",
    reportId: "report_01",
    name: "ALT",
    code: "ALT",
    value: 28,
    unit: "U/L",
    referenceMin: 7,
    referenceMax: 56,
    status: "normal",
    explanation: "Liver enzyme is within the normal range.",
    whatItMeasures:
      "A liver enzyme. Elevated levels can signal liver stress or damage.",
    confidence: 0.98,
  },
  {
    id: "marker_17",
    reportId: "report_01",
    name: "AST",
    code: "AST",
    value: 24,
    unit: "U/L",
    referenceMin: 10,
    referenceMax: 40,
    status: "normal",
    explanation: "Liver enzyme is in the healthy range.",
    whatItMeasures:
      "Found in the liver and other tissues. Elevated levels may indicate liver or muscle damage.",
    confidence: 0.98,
  },
  {
    id: "marker_18",
    reportId: "report_01",
    name: "Vitamin B12",
    code: "B12",
    value: 412,
    unit: "pg/mL",
    referenceMin: 200,
    referenceMax: 900,
    status: "normal",
    explanation: "B12 levels are healthy.",
    whatItMeasures:
      "Essential for nerve function and red blood cell formation. Deficiency is common, especially in older adults.",
    confidence: 0.96,
  },
  {
    id: "marker_19",
    reportId: "report_01",
    name: "Iron",
    code: "FE",
    value: 88,
    unit: "µg/dL",
    referenceMin: 50,
    referenceMax: 170,
    status: "normal",
    explanation: "Iron levels are within the normal range.",
    whatItMeasures:
      "Measures iron in the blood, used to assess iron deficiency or overload.",
    confidence: 0.97,
  },
  {
    id: "marker_20",
    reportId: "report_01",
    name: "Sodium",
    code: "NA",
    value: 141,
    unit: "mEq/L",
    referenceMin: 136,
    referenceMax: 145,
    status: "normal",
    explanation: "Sodium is balanced — normal electrolyte levels.",
    whatItMeasures:
      "An electrolyte that regulates fluid balance and nerve and muscle function.",
    confidence: 0.99,
  },
  {
    id: "marker_21",
    reportId: "report_01",
    name: "Potassium",
    code: "K",
    value: 4.1,
    unit: "mEq/L",
    referenceMin: 3.5,
    referenceMax: 5.0,
    status: "normal",
    explanation: "Potassium is within the normal range.",
    whatItMeasures:
      "An electrolyte critical for heart rhythm and muscle function.",
    confidence: 0.99,
  },
];

// ── Trend data (historical values per tracked marker, oldest → newest) ────────
// Powers sparklines in the Trends section. Keyed by marker name.

export const MOCK_TREND_DATA: Record<
  string,
  Array<{ date: string; value: number; reportId: string }>
> = {
  "Vitamin D": [
    { date: "2023-10-20", value: 20, reportId: "report_07" },
    { date: "2023-12-04", value: 22, reportId: "report_06" },
    { date: "2024-01-04", value: 18, reportId: "report_05" },
    { date: "2025-04-03", value: 19, reportId: "report_03" },
    { date: "2025-10-11", value: 21, reportId: "report_02" },
    { date: "2026-03-14", value: 24, reportId: "report_01" },
  ],
  "LDL Cholesterol": [
    { date: "2023-10-20", value: 118, reportId: "report_07" },
    { date: "2023-12-04", value: 122, reportId: "report_06" },
    { date: "2024-01-04", value: 128, reportId: "report_05" },
    { date: "2025-04-03", value: 136, reportId: "report_03" },
    { date: "2025-10-11", value: 139, reportId: "report_02" },
    { date: "2026-03-14", value: 142, reportId: "report_01" },
  ],
  HbA1c: [
    { date: "2023-10-20", value: 5.2, reportId: "report_07" },
    { date: "2023-12-04", value: 5.3, reportId: "report_06" },
    { date: "2025-04-03", value: 5.4, reportId: "report_03" },
    { date: "2025-10-11", value: 5.4, reportId: "report_02" },
    { date: "2026-03-14", value: 5.4, reportId: "report_01" },
  ],
  TSH: [
    { date: "2023-10-20", value: 2.3, reportId: "report_07" },
    { date: "2023-12-04", value: 2.4, reportId: "report_06" },
    { date: "2024-10-10", value: 2.2, reportId: "report_04" },
    { date: "2025-04-03", value: 2.0, reportId: "report_03" },
    { date: "2025-10-11", value: 2.1, reportId: "report_02" },
    { date: "2026-03-14", value: 2.1, reportId: "report_01" },
  ],
  "HDL Cholesterol": [
    { date: "2023-10-20", value: 62, reportId: "report_07" },
    { date: "2023-12-04", value: 60, reportId: "report_06" },
    { date: "2024-01-04", value: 61, reportId: "report_05" },
    { date: "2025-04-03", value: 59, reportId: "report_03" },
    { date: "2025-10-11", value: 58, reportId: "report_02" },
    { date: "2026-03-14", value: 58, reportId: "report_01" },
  ],
  Ferritin: [
    { date: "2023-10-20", value: 42, reportId: "report_07" },
    { date: "2023-12-04", value: 40, reportId: "report_06" },
    { date: "2025-04-03", value: 36, reportId: "report_03" },
    { date: "2025-10-11", value: 38, reportId: "report_02" },
    { date: "2026-03-14", value: 38, reportId: "report_01" },
  ],
};

// ── Doctor questions (latest report) ─────────────────────────────────────────

export const MOCK_QUESTIONS = [
  {
    id: "q_01",
    reportId: "report_01",
    priority: 1,
    relatedTo: "Vitamin D",
    text: "My Vitamin D is 24 ng/mL — what dose of supplementation do you recommend, and when should we recheck it?",
  },
  {
    id: "q_02",
    reportId: "report_01",
    priority: 2,
    relatedTo: "LDL Cholesterol",
    text: "My LDL has been climbing gradually and is now 142 mg/dL — at what point would you consider medication versus lifestyle changes?",
  },
  {
    id: "q_03",
    reportId: "report_01",
    priority: 3,
    relatedTo: "Total Cholesterol",
    text: "Should I make specific dietary changes given the borderline total cholesterol alongside the elevated LDL?",
  },
];

// ── Reminder ──────────────────────────────────────────────────────────────────

export const MOCK_REMINDER = {
  id: "reminder_01",
  userId: "user_01",
  markerName: "Vitamin D",
  dueDate: "2026-06-14",
  note: "Retest after 3 months of supplementation",
};

// ── Hero report card ─────────────────────────────────────────────────────────

export const MOCK_HERO_REPORT: HeroReport = {
  title: "Annual panel",
  lab: "Quest Diagnostics",
  date: "March 14, 2026",
  shortDate: "Mar 14",
  sub: "Quest Diagnostics · March 14, 2026 · 21 markers read in 11 seconds. Two need a conversation with your doctor, one worth watching.",
  normal: 18,
  watch: 1,
  flagged: 2,
};

export const MOCK_SUMMARY: ReportSummary = {
  trackedSince: "Feb 2024",
  totalReports: 7,
  nextReminder: "Vitamin D retest — June 14",
};

// ── Latest report summary (for page header) ───────────────────────────────────

export const MOCK_LATEST_REPORT = {
  title: "Annual panel",
  lab: "Quest Diagnostics",
  uploadedAt: MOCK_REPORTS[0].uploadedAt,
};

// ── Flagged markers (dashboard "Needs attention" card) ────────────────────────

export const MOCK_FLAGGED_MARKERS: FlaggedMarker[] = [
  {
    id: "fm_vitd",
    name: "Vitamin D",
    code: "25(OH)D",
    status: "flag",
    value: 24,
    unit: "ng/mL",
    refLow: 30,
    refHigh: 100,
    refLabel: "Ref 30–100",
    delta: { dir: "down", amount: 10, period: "in 2 yrs" },
    trendValues: [34, 32, 28, 29, 26, 24],
    plainEnglish: "Mildly low. Common in winter.",
    doctorQuestion: "Is 2,000 IU daily enough, or do I need a loading dose?",
  },
  {
    id: "fm_ldl",
    name: "LDL Cholesterol",
    code: "LDL-C",
    status: "flag",
    value: 142,
    unit: "mg/dL",
    refLow: null,
    refHigh: 100,
    refLabel: "Ref < 100",
    delta: { dir: "up", amount: 24, period: "in 2 yrs" },
    trendValues: [118, 124, 131, 135, 138, 142],
    plainEnglish: "Elevated, not alarming. Worth a conversation.",
    doctorQuestion: "What’s my 10-year cardiovascular risk score?",
  },
  {
    id: "fm_ferr",
    name: "Ferritin",
    code: "Ferritin",
    status: "watch",
    value: 38,
    unit: "ng/mL",
    refLow: 30,
    refHigh: 300,
    refLabel: "Ref 30–300",
    delta: { dir: "down", amount: 34, period: "in 2 yrs" },
    trendValues: [72, 64, 58, 49, 44, 38],
    plainEnglish: "In range but on the low end. Track it.",
    doctorQuestion: "Would a full iron panel be useful?",
  },
];

// ── Trends grid cells (last 6 reports, priority order: flagged → ok → watch) ──

export const MOCK_TREND_CELLS: TrendCell[] = [
  {
    id: "tc_vitd",
    name: "Vitamin D",
    unit: "ng/mL",
    values: [34, 32, 28, 29, 26, 24],
    refLow: 30,
    refHigh: 100,
    current: 24,
    status: "flag",
  },
  {
    id: "tc_ldl",
    name: "LDL",
    unit: "mg/dL",
    values: [118, 124, 131, 135, 138, 142],
    refLow: 0,
    refHigh: 100,
    current: 142,
    status: "flag",
  },
  {
    id: "tc_hba1c",
    name: "HbA1c",
    unit: "%",
    values: [5.2, 5.3, 5.3, 5.4, 5.3, 5.4],
    refLow: 0,
    refHigh: 5.7,
    current: 5.4,
    status: "ok",
  },
  {
    id: "tc_tsh",
    name: "TSH",
    unit: "μIU/mL",
    values: [2.4, 2.3, 2.0, 2.2, 2.1, 2.1],
    refLow: 0.4,
    refHigh: 4.0,
    current: 2.1,
    status: "ok",
  },
  {
    id: "tc_hdl",
    name: "HDL",
    unit: "mg/dL",
    values: [54, 56, 58, 57, 59, 58],
    refLow: 40,
    refHigh: 100,
    current: 58,
    status: "ok",
  },
  {
    id: "tc_ferr",
    name: "Ferritin",
    unit: "ng/mL",
    values: [72, 64, 58, 49, 44, 38],
    refLow: 30,
    refHigh: 300,
    current: 38,
    status: "watch",
  },
];

// ── Sidebar nav ───────────────────────────────────────────────────────────────

export const MOCK_NAV_LIBRARY: NavItem[] = [
  { id: "home",      label: "Dashboard",  count: null, active: true  },
  { id: "reports",   label: "Reports",    count: 7,    active: false },
  { id: "markers",   label: "Markers",    count: 23,   active: false },
  { id: "flags",     label: "Flagged",    count: 2,    active: false },
  { id: "questions", label: "Doctor Q's", count: 3,    active: false },
  { id: "reminders", label: "Reminders",  count: 1,    active: false },
];

export const MOCK_NAV_ACTIONS: NavItem[] = [
  { id: "upload",   label: "Upload report", count: null, active: false },
  { id: "settings", label: "Settings",      count: null, active: false },
];
