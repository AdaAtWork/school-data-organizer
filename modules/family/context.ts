import { db } from "@/lib/db/prisma";
import { ForbiddenError } from "@/lib/errors";
import { requireCurrentParent } from "@/lib/auth/context";
import type { MembershipRole, MembershipStatus } from "@prisma/client";

export type FamilyContext = {
  parentUser: {
    id: string;
    supabaseUserId: string;
    email: string;
    displayName: string | null;
  };
  family: {
    id: string;
    name: string;
  };
  membership: {
    id: string;
    role: MembershipRole;
    status: MembershipStatus;
  };
};

type MembershipResult = {
  family: { id: string; name: string };
  membership: { id: string; role: MembershipRole; status: MembershipStatus };
} | null;

export async function getActiveFamilyMembership(
  parentUserId: string
): Promise<MembershipResult> {
  const row = await db.familyMembership.findFirst({
    where: { parentUserId, status: "ACTIVE" },
    select: {
      id: true,
      role: true,
      status: true,
      family: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  if (!row) return null;

  return {
    family: row.family,
    membership: { id: row.id, role: row.role, status: row.status },
  };
}

export async function requireCurrentFamilyContext(): Promise<FamilyContext> {
  const { parentUser } = await requireCurrentParent();

  const result = await getActiveFamilyMembership(parentUser.id);

  if (!result) {
    throw new ForbiddenError("No active family membership found.");
  }

  return {
    parentUser,
    family: result.family,
    membership: result.membership,
  };
}
