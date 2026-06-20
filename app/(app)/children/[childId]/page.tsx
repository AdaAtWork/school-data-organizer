import { notFound } from "next/navigation";
import { requireCurrentFamilyContext } from "@/modules/family/context";
import { getChildByFamily } from "@/modules/children/queries";
import { updateChild } from "@/modules/children/actions";
import { EditChildForm } from "@/components/children/edit-child-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { params: Promise<{ childId: string }> };

export default async function EditChildPage({ params }: Props) {
  const { childId } = await params;
  const { family } = await requireCurrentFamilyContext();

  const child = await getChildByFamily(childId, family.id);
  if (!child) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Edit Child</h1>
        <p className="mt-1 text-gray-500">Update this child&apos;s profile details.</p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-base">
            {child.preferredName ?? child.firstName} {child.lastName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditChildForm
            childId={child.id}
            defaultValues={{ firstName: child.firstName, lastName: child.lastName }}
            updateChildAction={updateChild}
          />
        </CardContent>
      </Card>
    </div>
  );
}
