import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const DEMO_EMAIL = "demo@lumen.health";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  const demo = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });
  if (!demo) {
    console.error(`Demo user (${DEMO_EMAIL}) not found — aborting.`);
    process.exit(1);
  }

  // Find all users to delete (everyone except the demo user)
  const targets = await prisma.user.findMany({
    where: { id: { not: demo.id } },
    select: { id: true, email: true },
  });

  if (targets.length === 0) {
    console.log("No non-demo users found. Nothing to delete.");
    return;
  }

  const ids = targets.map((u) => u.id);
  console.log(`Deleting ${targets.length} user(s):`);
  targets.forEach((u) => console.log(`  • ${u.email} (${u.id})`));

  // Delete in FK order: leaf records first, users last.
  // All relations cascade on delete in the schema, but we delete explicitly
  // so the log is clear about what's being removed.
  const [
    auditLogs,
    notifPrefs,
    reminders,
    questions,
    markers,
    reports,
    profiles,
    accounts,
    sessions,
    verificationTokens,
    users,
  ] = await prisma.$transaction([
    prisma.auditLog.deleteMany({ where: { userId: { in: ids } } }),
    prisma.notificationPreferences.deleteMany({ where: { userId: { in: ids } } }),
    prisma.reminder.deleteMany({ where: { userId: { in: ids } } }),
    prisma.question.deleteMany({ where: { report: { userId: { in: ids } } } }),
    prisma.marker.deleteMany({ where: { report: { userId: { in: ids } } } }),
    prisma.report.deleteMany({ where: { userId: { in: ids } } }),
    prisma.profile.deleteMany({ where: { userId: { in: ids } } }),
    prisma.account.deleteMany({ where: { userId: { in: ids } } }),
    prisma.session.deleteMany({ where: { userId: { in: ids } } }),
    prisma.verificationToken.deleteMany({ where: { identifier: { in: targets.map((u) => u.email) } } }),
    prisma.user.deleteMany({ where: { id: { in: ids } } }),
  ]);

  console.log("\n── Deleted ────────────────────────────────────────────────");
  console.log(`  AuditLog               ${auditLogs.count}`);
  console.log(`  NotificationPrefs      ${notifPrefs.count}`);
  console.log(`  Reminder               ${reminders.count}`);
  console.log(`  Question               ${questions.count}`);
  console.log(`  Marker                 ${markers.count}`);
  console.log(`  Report                 ${reports.count}`);
  console.log(`  Profile                ${profiles.count}`);
  console.log(`  Account                ${accounts.count}`);
  console.log(`  Session                ${sessions.count}`);
  console.log(`  VerificationToken      ${verificationTokens.count}`);
  console.log(`  User                   ${users.count}`);
  console.log("\nDone. Demo user and their data are untouched.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
