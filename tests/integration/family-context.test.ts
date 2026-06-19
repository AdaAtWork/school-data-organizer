import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "../../lib/db/prisma";
import { getActiveFamilyMembership } from "../../modules/family/context";

const TEST_ID = `test-ctx-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const TEST_EMAIL = `${TEST_ID}@example.test`;

let parentId: string;
let activeFamilyId: string;
let inactiveFamilyId: string;

describe.skipIf(!process.env.DATABASE_URL)(
  "getActiveFamilyMembership (integration — requires DATABASE_URL)",
  () => {
    beforeAll(async () => {
      const parent = await db.parentUser.create({
        data: { supabaseUserId: TEST_ID, email: TEST_EMAIL },
      });
      parentId = parent.id;

      const activeFamily = await db.family.create({
        data: {
          name: "Active Family",
          memberships: {
            create: { parentUserId: parentId, role: "OWNER", status: "ACTIVE" },
          },
        },
      });
      activeFamilyId = activeFamily.id;

      const inactiveFamily = await db.family.create({
        data: {
          name: "Inactive Family",
          memberships: {
            create: {
              parentUserId: parentId,
              role: "MEMBER",
              status: "INACTIVE",
            },
          },
        },
      });
      inactiveFamilyId = inactiveFamily.id;
    });

    afterAll(async () => {
      await db.familyMembership.deleteMany({ where: { parentUserId: parentId } });
      await db.family.deleteMany({
        where: { id: { in: [activeFamilyId, inactiveFamilyId] } },
      });
      await db.parentUser.delete({ where: { id: parentId } });
    });

    it("returns family and membership for an active membership", async () => {
      const result = await getActiveFamilyMembership(parentId);

      expect(result).not.toBeNull();
      expect(result!.family.id).toBe(activeFamilyId);
      expect(result!.family.name).toBe("Active Family");
      expect(result!.membership.role).toBe("OWNER");
      expect(result!.membership.status).toBe("ACTIVE");
    });

    it("returns null for a parent with no memberships", async () => {
      const orphan = await db.parentUser.create({
        data: {
          supabaseUserId: `${TEST_ID}-orphan`,
          email: `orphan.${TEST_EMAIL}`,
        },
      });

      try {
        const result = await getActiveFamilyMembership(orphan.id);
        expect(result).toBeNull();
      } finally {
        await db.parentUser.delete({ where: { id: orphan.id } });
      }
    });

    it("ignores inactive memberships — returns null when only INACTIVE exists", async () => {
      const inactiveParent = await db.parentUser.create({
        data: {
          supabaseUserId: `${TEST_ID}-inact`,
          email: `inact.${TEST_EMAIL}`,
        },
      });
      const inactiveOnlyFamily = await db.family.create({
        data: {
          name: "Inactive Only",
          memberships: {
            create: {
              parentUserId: inactiveParent.id,
              role: "MEMBER",
              status: "INACTIVE",
            },
          },
        },
      });

      try {
        const result = await getActiveFamilyMembership(inactiveParent.id);
        expect(result).toBeNull();
      } finally {
        await db.familyMembership.deleteMany({
          where: { parentUserId: inactiveParent.id },
        });
        await db.family.delete({ where: { id: inactiveOnlyFamily.id } });
        await db.parentUser.delete({ where: { id: inactiveParent.id } });
      }
    });
  }
);
