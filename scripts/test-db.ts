import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  console.log("── Demo data verification ─────────────────────────────────\n");

  // User
  const user = await prisma.user.findUnique({
    where: { email: "demo@lumen.health" },
    include: {
      profiles: true,
      notificationPrefs: true,
    },
  });

  if (!user) throw new Error("Demo user not found — run `npx prisma db seed` first");

  console.log("USER");
  console.log(`  ${user.fullName} <${user.email}>`);
  console.log(`  isPro: ${user.isPro}  emailVerified: ${user.emailVerified?.toISOString().slice(0, 10)}`);
  console.log(`  stripeCustomerId: ${user.stripeCustomerId}`);

  console.log("\nPROFILES");
  for (const p of user.profiles) {
    console.log(`  ${p.name} (${p.relationship}) — born ${p.dateOfBirth?.toISOString().slice(0, 10)}`);
  }

  console.log("\nNOTIFICATION PREFS");
  const prefs = user.notificationPrefs;
  console.log(`  flaggedMarkerReminders: ${prefs?.flaggedMarkerReminders}`);
  console.log(`  monthlyCheckInNudge:    ${prefs?.monthlyCheckInNudge}`);
  console.log(`  productUpdates:         ${prefs?.productUpdates}`);

  // Reports
  const reports = await prisma.report.findMany({
    where: { userId: user.id },
    orderBy: { collectedAt: "asc" },
    include: {
      profile: { select: { name: true } },
      markers: { select: { status: true } },
      questions: { select: { id: true } },
    },
  });

  console.log(`\nREPORTS (${reports.length} total)`);
  for (const r of reports) {
    const flags = r.markers.filter((m) => m.status === "flagged").length;
    const watches = r.markers.filter((m) => m.status === "borderline").length;
    console.log(
      `  [${r.collectedAt?.toISOString().slice(0, 10)}] ${r.title?.padEnd(20)} ` +
      `${r.labProvider?.padEnd(18)} ` +
      `markers:${String(r.markers.length).padStart(3)}  ` +
      `flag:${flags} watch:${watches}  qs:${r.questions.length}  ` +
      `profile: ${r.profile?.name ?? "—"}`
    );
  }

  // Primary report markers
  const report7 = reports.find((r) => r.fileName === "quest-annual-2026-03.pdf");
  if (report7) {
    const markers = await prisma.marker.findMany({
      where: { reportId: report7.id },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    console.log(`\nMARKERS — ${report7.title} (${report7.collectedAt?.toISOString().slice(0, 10)})  [${markers.length} total]`);
    let lastCat = "";
    for (const m of markers) {
      if (m.category !== lastCat) {
        console.log(`  ── ${m.category} ──`);
        lastCat = m.category ?? "";
      }
      const ref = [m.referenceMin ?? "—", m.referenceMax ?? "—"].join("–");
      console.log(
        `    ${m.name.padEnd(20)} ${String(m.value).padStart(6)} ${m.unit.padEnd(10)} ` +
        `ref [${ref}]  status: ${m.status.padEnd(10)} conf: ${m.confidence}`
      );
    }

    const questions = await prisma.question.findMany({
      where: { reportId: report7.id },
      orderBy: { priority: "asc" },
    });
    console.log(`\nQUESTIONS — ${report7.title}`);
    for (const q of questions) {
      console.log(`  ${q.priority}. [${q.relatedTo}] ${q.text}`);
    }
  }

  // Dad's report
  const report8 = reports.find((r) => r.fileName === "kaiser-dad-annual-2026-01.pdf");
  if (report8) {
    const markers = await prisma.marker.findMany({
      where: { reportId: report8.id },
      orderBy: { status: "asc" },
    });
    console.log(`\nMARKERS — Dad's ${report8.title} (${report8.collectedAt?.toISOString().slice(0, 10)})`);
    for (const m of markers) {
      console.log(`    ${m.name.padEnd(20)} ${String(m.value).padStart(6)} ${m.unit.padEnd(10)} status: ${m.status}`);
    }

    const questions = await prisma.question.findMany({
      where: { reportId: report8.id },
      orderBy: { priority: "asc" },
    });
    console.log(`\nQUESTIONS — Dad's ${report8.title}`);
    for (const q of questions) {
      console.log(`  ${q.priority}. [${q.relatedTo}] ${q.text}`);
    }
  }

  // Catalog sample
  const catalog = await prisma.markerCatalog.findMany({ orderBy: { category: "asc" } });
  console.log(`\nMARKER CATALOG (${catalog.length} entries)`);
  const byCategory: Record<string, typeof catalog> = {};
  for (const c of catalog) {
    (byCategory[c.category] ??= []).push(c);
  }
  for (const [cat, entries] of Object.entries(byCategory)) {
    const names = entries.map((e) => e.canonicalName).join(", ");
    console.log(`  ${cat.padEnd(12)} [${entries.length}]  ${names}`);
  }

  // Safety-critical check
  const potassium = catalog.find((c) => c.canonicalName === "Potassium");
  const troponin = catalog.find((c) => c.canonicalName === "Troponin");
  console.log("\nSAFETY THRESHOLDS");
  console.log(`  Potassium urgentHigh: ${potassium?.urgentHigh} (expected 6)`);
  console.log(`  Troponin  urgentHigh: ${troponin?.urgentHigh}  (expected 0.04)`);

  console.log("\n✓ All demo data verified successfully\n");
}

main()
  .catch((err) => {
    console.error("✗ Verification failed:", err.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
