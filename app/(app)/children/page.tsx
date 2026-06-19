import Link from "next/link";
import { requireCurrentFamilyContext } from "@/modules/family/context";
import { getActiveChildrenByFamily } from "@/modules/children/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ChildrenPage() {
  const { family } = await requireCurrentFamilyContext();
  const childList = await getActiveChildrenByFamily(family.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Children</h1>
          <p className="mt-1 text-gray-500">
            Children profiles linked to your family.
          </p>
        </div>
        <Button asChild>
          <Link href="/children/new">Add child</Link>
        </Button>
      </div>

      {childList.length === 0 ? (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-base">No children added yet</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-500">
            Children profiles will appear here once they have been added to your
            family.
          </CardContent>
        </Card>
      ) : (
        <ul className="max-w-md space-y-2">
          {childList.map((child) => (
            <li key={child.id}>
              <Card>
                <CardContent className="py-3 text-sm text-gray-900">
                  {child.preferredName ?? child.firstName} {child.lastName}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
