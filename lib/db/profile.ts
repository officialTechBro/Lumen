import { prisma } from "@/lib/prisma";

export type NotificationPrefs = {
  flaggedMarkerReminders: boolean;
  monthlyCheckInNudge: boolean;
  productUpdates: boolean;
};

export type ProfileUser = {
  id: string;
  fullName: string | null;
  email: string | null;
  image: string | null;
  isPro: boolean;
  createdAt: Date;
  notificationPrefs: NotificationPrefs | null;
};

export type LabStat = {
  lab: string;
  count: number;
};

export type ProfileData = {
  user: ProfileUser;
  hasPassword: boolean;
  totalReports: number;
  totalMarkers: number;
  flaggedCount: number;
  reportsByLab: LabStat[];
};

export async function getProfileData(userId: string): Promise<ProfileData | null> {
  const [user, reportStats, markerStats] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        image: true,
        isPro: true,
        password: true, // used only to derive hasPassword; never returned to callers
        createdAt: true,
        notificationPrefs: {
          select: {
            flaggedMarkerReminders: true,
            monthlyCheckInNudge: true,
            productUpdates: true,
          },
        },
      },
    }),

    prisma.report.groupBy({
      by: ["labProvider"],
      where: { userId, status: "ready" },
      _count: { id: true },
    }),

    prisma.marker.aggregate({
      where: { report: { userId, status: "ready" } },
      _count: { id: true },
    }),
  ]);

  if (!user) return null;

  const hasPassword = user.password !== null;
  const { password: _pw, ...userWithoutPassword } = user;

  const totalReports = reportStats.reduce((sum, r) => sum + r._count.id, 0);
  const totalMarkers = markerStats._count.id ?? 0;

  const flaggedCount = await prisma.marker.count({
    where: {
      report: { userId, status: "ready" },
      status: { in: ["flagged", "urgent"] },
    },
  });

  return {
    user: userWithoutPassword,
    hasPassword,
    totalReports,
    totalMarkers,
    flaggedCount,
    reportsByLab: reportStats.map((r) => ({
      lab: r.labProvider ?? "Unknown",
      count: r._count.id,
    })),
  };
}
