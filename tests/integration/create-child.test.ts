import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "../../lib/db/prisma";
import { createChildForFamily } from "../../modules/children/mutations";

const TEST_ID = `test-create-child-${Date.now()}-${Math.random().toString(36).slice(2)}`;

let familyId: string;
let otherFamilyId: string;

describe.skipIf(!process.env.DATABASE_URL)(
  "createChildForFamily (integration — requires DATABASE_URL)",
  () => {
    beforeAll(async () => {
      const family = await db.family.create({ data: { name: "Test Family" } });
      familyId = family.id;

      const otherFamily = await db.family.create({ data: { name: "Other Family" } });
      otherFamilyId = otherFamily.id;
    });

    afterAll(async () => {
      await db.child.deleteMany({
        where: { familyId: { in: [familyId, otherFamilyId] } },
      });
      await db.family.deleteMany({
        where: { id: { in: [familyId, otherFamilyId] } },
      });
    });

    it("creates a child with first name only", async () => {
      const child = await createChildForFamily(familyId, { firstName: "Alice" });

      expect(child.firstName).toBe("Alice");
      expect(child.lastName).toBeNull();
      expect(child.familyId).toBe(familyId);
    });

    it("creates a child with first and last name", async () => {
      const child = await createChildForFamily(familyId, {
        firstName: "Bob",
        lastName: "Smith",
      });

      expect(child.firstName).toBe("Bob");
      expect(child.lastName).toBe("Smith");
      expect(child.familyId).toBe(familyId);
    });

    it("trims whitespace from names", async () => {
      const child = await createChildForFamily(familyId, {
        firstName: "  Carol  ",
        lastName: "  Jones  ",
      });

      expect(child.firstName).toBe("Carol");
      expect(child.lastName).toBe("Jones");
    });

    it("child is scoped to the correct family — not returned for another family", async () => {
      await createChildForFamily(familyId, { firstName: "Dave" });

      const otherFamilyChildren = await db.child.findMany({
        where: { familyId: otherFamilyId },
      });

      const names = otherFamilyChildren.map((c) => c.firstName);
      expect(names).not.toContain("Dave");
    });
  }
);
