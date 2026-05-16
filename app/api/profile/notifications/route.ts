import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { flaggedMarkerReminders, monthlyCheckInNudge, productUpdates } = body;

  const data: Record<string, boolean> = {};
  if (typeof flaggedMarkerReminders === "boolean") data.flaggedMarkerReminders = flaggedMarkerReminders;
  if (typeof monthlyCheckInNudge === "boolean") data.monthlyCheckInNudge = monthlyCheckInNudge;
  if (typeof productUpdates === "boolean") data.productUpdates = productUpdates;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No valid fields" }, { status: 400 });
  }

  await prisma.notificationPreferences.update({
    where: { userId },
    data,
  });

  return NextResponse.json({ ok: true });
}
