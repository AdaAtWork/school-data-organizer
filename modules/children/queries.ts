import { db } from "@/lib/db/prisma";

export async function getChildByFamily(childId: string, familyId: string) {
  return db.child.findFirst({
    where: { id: childId, familyId, isArchived: false },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      preferredName: true,
    },
  });
}

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
