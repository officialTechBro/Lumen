import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const { fullName } = body ?? {};

  if (!fullName || typeof fullName !== "string" || fullName.trim().length === 0) {
    return NextResponse.json({ error: "Name cannot be empty" }, { status: 400 });
  }

  if (fullName.trim().length > 100) {
    return NextResponse.json({ error: "Name too long" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { fullName: fullName.trim() },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.auditLog.create({
    data: {
      userId,
      action: "account.delete",
      entityType: "User",
      entityId: userId,
    },
  });

  await prisma.user.delete({ where: { id: userId } });

  return NextResponse.json({ ok: true });
}
