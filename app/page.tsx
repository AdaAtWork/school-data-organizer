import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>School Communication Organizer</CardTitle>
          <CardDescription>
            UI foundation is working. Real features coming soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="demo-input">Demo Input</Label>
            <Input id="demo-input" placeholder="shadcn Input works" />
          </div>
          <Button>shadcn Button works</Button>
        </CardContent>
      </Card>
    </main>
  );
}