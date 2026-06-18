import { afterAll, describe, expect, it } from "vitest";
import { db } from "../../lib/db/prisma";
import { ensureParentWorkspace } from "../../modules/family/ensure-workspace";

// Unique IDs prevent collisions with real data or parallel runs
const TEST_SUPABASE_ID = `test-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const TEST_EMAIL = `${TEST_SUPABASE_ID}@example.test`;

describe.skipIf(!process.env.DATABASE_URL)(
  "ensureParentWorkspace (integration — requires DATABASE_URL)",
  () => {
    afterAll(async () => {
      const parent = await db.parentUser.findUnique({
        where: { supabaseUserId: TEST_SUPABASE_ID },
      });
      if (!parent) return;

      const memberships = await db.familyMembership.findMany({
        where: { parentUserId: parent.id },
      });
      const familyIds = memberships.map((m) => m.familyId);

      await db.familyMembership.deleteMany({ where: { parentUserId: parent.id } });
      if (familyIds.length > 0) {
        await db.family.deleteMany({ where: { id: { in: familyIds } } });
      }
      await db.parentUser.delete({ where: { id: parent.id } });
    });

    it("creates parent, family, and owner membership on first call", async () => {
      const result = await ensureParentWorkspace(TEST_SUPABASE_ID, TEST_EMAIL);

      expect(result.parentUser.supabaseUserId).toBe(TEST_SUPABASE_ID);
      expect(result.parentUser.email).toBe(TEST_EMAIL);
      expect(result.family.name).toContain("Family");

      const membership = await db.familyMembership.findFirst({
        where: { parentUserId: result.parentUser.id },
      });
      expect(membership?.role).toBe("OWNER");
      expect(membership?.status).toBe("ACTIVE");
    });

    it("is idempotent — repeated calls return the same records without duplicates", async () => {
      const first = await ensureParentWorkspace(TEST_SUPABASE_ID, TEST_EMAIL);
      const second = await ensureParentWorkspace(TEST_SUPABASE_ID, TEST_EMAIL);

      expect(second.parentUser.id).toBe(first.parentUser.id);
      expect(second.family.id).toBe(first.family.id);

      const membershipCount = await db.familyMembership.count({
        where: { parentUserId: first.parentUser.id },
      });
      expect(membershipCount).toBe(1);
    });
  }
);
