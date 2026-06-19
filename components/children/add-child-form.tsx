"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateChildState } from "@/modules/children/actions";

type Props = {
  createChildAction: (
    prevState: CreateChildState,
    formData: FormData
  ) => Promise<CreateChildState>;
};

const initialState: CreateChildState = { error: null };

export function AddChildForm({ createChildAction }: Props) {
  const [state, action, isPending] = useActionState(
    createChildAction,
    initialState
  );

  return (
    <form action={action} className="flex flex-col gap-4">
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
          placeholder="First name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="lastName">
          Last name <span className="text-gray-400 text-xs font-normal">(optional)</span>
        </Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          autoComplete="family-name"
          placeholder="Last name"
        />
      </div>

      <div className="flex gap-3 pt-1">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Add child"}
        </Button>
        <Button type="button" variant="outline" disabled={isPending} onClick={() => history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
