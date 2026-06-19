import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/lib/db/prisma";
import { NotFoundError, UnauthorizedError } from "@/lib/errors";

export type CurrentParentContext = {
  supabaseUserId: string;
  parentUser: {
    id: string;
    supabaseUserId: string;
    email: string;
    displayName: string | null;
  };
};

export async function requireCurrentParent(): Promise<CurrentParentContext> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError();
  }

  const parentUser = await db.parentUser.findUnique({
    where: { supabaseUserId: user.id },
    select: {
      id: true,
      supabaseUserId: true,
      email: true,
      displayName: true,
    },
  });

  if (!parentUser) {
    throw new NotFoundError("Parent account not found.");
  }

  return { supabaseUserId: user.id, parentUser };
}
