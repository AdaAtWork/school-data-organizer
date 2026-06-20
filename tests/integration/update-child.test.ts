import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "../../lib/db/prisma";
import { updateChildForFamily } from "../../modules/children/mutations";

const TEST_ID = `test-update-child-${Date.now()}-${Math.random().toString(36).slice(2)}`;

let familyId: string;
let otherFamilyId: string;
let childId: string;

describe.skipIf(!process.env.DATABASE_URL)(
  "updateChildForFamily (integration — requires DATABASE_URL)",
  () => {
    beforeAll(async () => {
      const family = await db.family.create({ data: { name: `${TEST_ID} Family` } });
      familyId = family.id;

      const otherFamily = await db.family.create({ data: { name: `${TEST_ID} Other` } });
      otherFamilyId = otherFamily.id;

      const child = await db.child.create({
        data: { familyId, firstName: "Alice", lastName: "Smith" },
      });
      childId = child.id;
    });

    afterAll(async () => {
      await db.child.deleteMany({
        where: { familyId: { in: [familyId, otherFamilyId] } },
      });
      await db.family.deleteMany({
        where: { id: { in: [familyId, otherFamilyId] } },
      });
    });

    it("updates first name and last name for the correct family", async () => {
      const result = await updateChildForFamily(childId, familyId, {
        firstName: "Alicia",
        lastName: "Jones",
      });

      expect(result).not.toBeNull();
      expect(result!.firstName).toBe("Alicia");
      expect(result!.lastName).toBe("Jones");
      expect(result!.familyId).toBe(familyId);
    });

    it("clears last name when passed as null", async () => {
      const result = await updateChildForFamily(childId, familyId, {
        firstName: "Alicia",
        lastName: null,
      });

      expect(result).not.toBeNull();
      expect(result!.lastName).toBeNull();
    });

    it("returns null when child does not exist", async () => {
      const result = await updateChildForFamily("nonexistent-id", familyId, {
        firstName: "Ghost",
      });

      expect(result).toBeNull();
    });

    it("returns null when child belongs to a different family — cross-family access denied", async () => {
      const result = await updateChildForFamily(childId, otherFamilyId, {
        firstName: "Hijacked",
      });

      expect(result).toBeNull();

      const unchanged = await db.child.findUnique({ where: { id: childId } });
      expect(unchanged?.firstName).not.toBe("Hijacked");
    });
  }
);
