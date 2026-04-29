import { prisma } from "@/lib/prisma";

export type SidebarCountsData = {
  reports: number;
  markers: number;
  flagged: number;
  questions: number;
  reminders: number;
};

export async function getSidebarCounts(userId: string): Promise<SidebarCountsData> {
  const [reports, markers, flagged, questions, reminders] = await Promise.all([
    prisma.report.count({
      where: { userId, status: "ready" },
    }),
    prisma.marker.count({
      where: { report: { userId, status: "ready" } },
    }),
    prisma.marker.count({
      where: {
        report: { userId, status: "ready" },
        status: { in: ["flagged", "urgent"] },
      },
    }),
    prisma.question.count({
      where: {
        report: { userId },
        isChecked: false,
      },
    }),
    prisma.reminder.count({
      where: { userId, isDone: false },
    }),
  ]);

  return { reports, markers, flagged, questions, reminders };
}
