"use server";

import { redirect } from "next/navigation";
import { requireCurrentFamilyContext } from "@/modules/family/context";
import {
  createChildForFamily,
  updateChildForFamily,
  validateCreateChildInput,
} from "@/modules/children/mutations";

export type CreateChildState = { error: string | null };

export async function createChild(
  _prevState: CreateChildState,
  formData: FormData
): Promise<CreateChildState> {
  const firstName = (formData.get("firstName") as string) ?? "";
  const lastName = (formData.get("lastName") as string) ?? "";

  const validationError = validateCreateChildInput({ firstName });
  if (validationError) return { error: validationError };

  const { family } = await requireCurrentFamilyContext();

  await createChildForFamily(family.id, { firstName, lastName: lastName || null });

  redirect("/children");
}

export type UpdateChildState = { error: string | null };

export async function updateChild(
  _prevState: UpdateChildState,
  formData: FormData
): Promise<UpdateChildState> {
  const childId = (formData.get("childId") as string) ?? "";
  const firstName = (formData.get("firstName") as string) ?? "";
  const lastName = (formData.get("lastName") as string) ?? "";

  if (!childId) return { error: "Invalid request." };

  const validationError = validateCreateChildInput({ firstName });
  if (validationError) return { error: validationError };

  const { family } = await requireCurrentFamilyContext();

  const updated = await updateChildForFamily(childId, family.id, {
    firstName,
    lastName: lastName || null,
  });

  if (!updated) return { error: "Child not found." };

  redirect("/children");
}
