import { db } from "@/lib/db/prisma";

export async function getParentProfile(supabaseUserId: string) {
  return db.parentUser.findUnique({
    where: { supabaseUserId },
    include: {
      memberships: {
        where: { status: "ACTIVE" },
        include: { family: true },
        orderBy: { createdAt: "asc" },
        take: 1,
      },
    },
  });
}
