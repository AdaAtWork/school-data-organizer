-- CreateTable
CREATE TABLE "children" (
    "id" TEXT NOT NULL,
    "family_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "preferred_name" TEXT,
    "birth_date" TIMESTAMP(3),
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "children_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "children_family_id_idx" ON "children"("family_id");

-- CreateIndex
CREATE INDEX "children_family_id_is_archived_idx" ON "children"("family_id", "is_archived");

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
