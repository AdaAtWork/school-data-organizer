import { db } from "@/lib/db/prisma";

export async function getActiveChildrenByFamily(familyId: string) {
  return db.child.findMany({
    where: { familyId, isArchived: false },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      preferredName: true,
      birthDate: true,
    },
    orderBy: { firstName: "asc" },
  });
}

export type ChildSummary = Awaited<
  ReturnType<typeof getActiveChildrenByFamily>
>[number];
