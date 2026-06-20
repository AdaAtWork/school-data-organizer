"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UpdateChildState } from "@/modules/children/actions";

type Props = {
  childId: string;
  defaultValues: { firstName: string; lastName: string | null };
  updateChildAction: (
    prevState: UpdateChildState,
    formData: FormData
  ) => Promise<UpdateChildState>;
};

const initialState: UpdateChildState = { error: null };

export function EditChildForm({
  childId,
  defaultValues,
  updateChildAction,
}: Props) {
  const [state, action, isPending] = useActionState(
    updateChildAction,
    initialState
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="childId" value={childId} />

      {state.error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="firstName">
          First name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          autoComplete="given-name"
          defaultValue={defaultValues.firstName}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="lastName">
          Last name{" "}
          <span className="text-xs font-normal text-gray-400">(optional)</span>
        </Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          autoComplete="family-name"
          defaultValue={defaultValues.lastName ?? ""}
        />
      </div>

      <div className="flex gap-3 pt-1">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => history.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
