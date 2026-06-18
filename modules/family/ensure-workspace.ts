import { db } from "@/lib/db/prisma";

type WorkspaceResult = {
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
};

export async function ensureParentWorkspace(
  supabaseUserId: string,
  email: string
): Promise<WorkspaceResult> {
  return db.$transaction(async (tx) => {
    // 1. Upsert parent user — idempotent by supabaseUserId (DB unique constraint)
    const parentUser = await tx.parentUser.upsert({
      where: { supabaseUserId },
      update: {},
      create: { supabaseUserId, email },
    });

    // 2. Return early if an owner membership already exists
    const existingMembership = await tx.familyMembership.findFirst({
      where: { parentUserId: parentUser.id, role: "OWNER" },
      include: { family: true },
    });

    if (existingMembership) {
      return { parentUser, family: existingMembership.family };
    }

    // 3. First login — create family and owner membership in one nested write
    const family = await tx.family.create({
      data: {
        name: `${email.split("@")[0]}'s Family`,
        memberships: {
          create: {
            parentUserId: parentUser.id,
            role: "OWNER",
            status: "ACTIVE",
          },
        },
      },
    });

    return { parentUser, family };
  });
}
