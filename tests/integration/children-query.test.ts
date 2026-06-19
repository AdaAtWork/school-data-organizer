import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "../../lib/db/prisma";
import { getActiveChildrenByFamily } from "../../modules/children/queries";

const TEST_ID = `test-child-${Date.now()}-${Math.random().toString(36).slice(2)}`;

let familyAId: string;
let familyBId: string;
let parentId: string;

describe.skipIf(!process.env.DATABASE_URL)(
  "getActiveChildrenByFamily (integration — requires DATABASE_URL)",
  () => {
    beforeAll(async () => {
      const parent = await db.parentUser.create({
        data: {
          supabaseUserId: TEST_ID,
          email: `${TEST_ID}@example.test`,
        },
      });
      parentId = parent.id;

      const familyA = await db.family.create({
        data: {
          name: "Family A",
          memberships: {
            create: { parentUserId: parentId, role: "OWNER", status: "ACTIVE" },
          },
          children: {
            create: [
              { firstName: "Alice", lastName: "Smith", isArchived: false },
              { firstName: "Bob", lastName: "Smith", isArchived: false },
              { firstName: "Charlie", lastName: "Smith", isArchived: true },
            ],
          },
        },
      });
      familyAId = familyA.id;

      const familyB = await db.family.create({
        data: {
          name: "Family B",
          children: {
            create: [{ firstName: "Diana", lastName: "Jones", isArchived: false }],
          },
        },
      });
      familyBId = familyB.id;
    });

    afterAll(async () => {
      await db.child.deleteMany({ where: { familyId: { in: [familyAId, familyBId] } } });
      await db.familyMembership.deleteMany({ where: { parentUserId: parentId } });
      await db.family.deleteMany({ where: { id: { in: [familyAId, familyBId] } } });
      await db.parentUser.delete({ where: { id: parentId } });
    });

    it("returns active children for the correct family", async () => {
      const children = await getActiveChildrenByFamily(familyAId);

      expect(children).toHaveLength(2);
      const names = children.map((c) => c.firstName);
      expect(names).toContain("Alice");
      expect(names).toContain("Bob");
    });

    it("does not return children from another family", async () => {
      const children = await getActiveChildrenByFamily(familyAId);

      const names = children.map((c) => c.firstName);
      expect(names).not.toContain("Diana");
    });

    it("does not return archived children", async () => {
      const children = await getActiveChildrenByFamily(familyAId);

      const names = children.map((c) => c.firstName);
      expect(names).not.toContain("Charlie");
    });

    it("returns an empty array for a family with no children", async () => {
      const emptyFamily = await db.family.create({ data: { name: "Empty Family" } });

      try {
        const children = await getActiveChildrenByFamily(emptyFamily.id);
        expect(children).toHaveLength(0);
      } finally {
        await db.family.delete({ where: { id: emptyFamily.id } });
      }
    });
  }
);
