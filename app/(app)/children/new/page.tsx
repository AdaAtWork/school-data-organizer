import { createChild } from "@/modules/children/actions";
import { AddChildForm } from "@/components/children/add-child-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddChildPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Add Child</h1>
        <p className="mt-1 text-gray-500">Add a child profile to your family.</p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-base">Child details</CardTitle>
        </CardHeader>
        <CardContent>
          <AddChildForm createChildAction={createChild} />
        </CardContent>
      </Card>
    </div>
  );
}
