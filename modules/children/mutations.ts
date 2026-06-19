import { db } from "@/lib/db/prisma";

export function validateCreateChildInput(data: {
  firstName: string;
}): string | null {
  if (!data.firstName.trim()) return "First name is required.";
  return null;
}

export async function createChildForFamily(
  familyId: string,
  data: { firstName: string; lastName?: string | null }
) {
  return db.child.create({
    data: {
      familyId,
      firstName: data.firstName.trim(),
      lastName: data.lastName?.trim() || null,
    },
    select: { id: true, firstName: true, lastName: true, familyId: true },
  });
}
