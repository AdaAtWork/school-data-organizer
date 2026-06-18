import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getParentProfile } from "@/modules/profile/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const profile = await getParentProfile(user.id);
  const membership = profile?.memberships[0];
  const family = membership?.family;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Profile &amp; Settings
        </h1>
        <p className="mt-1 text-gray-500">
          Your account and family information.
        </p>
      </div>

      <div className="grid max-w-lg gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="Email" value={profile?.email ?? user.email ?? "—"} />
            {profile?.displayName && (
              <Row label="Name" value={profile.displayName} />
            )}
          </CardContent>
        </Card>

        {family ? (
          <Card>
            <CardHeader>
              <CardTitle>Family Workspace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Row label="Family" value={family.name} />
              <Row
                label="Role"
                value={
                  membership.role.charAt(0) +
                  membership.role.slice(1).toLowerCase()
                }
              />
              <Row
                label="Status"
                value={
                  membership.status.charAt(0) +
                  membership.status.slice(1).toLowerCase()
                }
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Family Workspace</CardTitle>
              <CardDescription>
                Your workspace is being set up. Log out and back in if this
                persists.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="w-20 shrink-0 text-gray-500">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}
