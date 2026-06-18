"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ensureParentWorkspace } from "@/modules/family/ensure-workspace";

export type AuthState = { error: string | null };

export async function login(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Invalid email or password. Please try again." };
  }

  try {
    await ensureParentWorkspace(data.user.id, data.user.email!);
  } catch (err) {
    console.error("[auth] Failed to ensure parent workspace on login:", err);
  }

  redirect("/dashboard");
}

export async function register(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    try {
      await ensureParentWorkspace(data.user.id, data.user.email!);
    } catch (err) {
      console.error("[auth] Failed to ensure parent workspace on register:", err);
    }
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
