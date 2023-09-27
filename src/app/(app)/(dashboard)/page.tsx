import { GroupCreateFeature } from "@/features/group";
import { db } from "@/shared/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = auth();
  const group = await db.group.findFirst({
    where: {
      adminIDs: {
        has: userId,
      },
    },
  });

  if (group) {
    redirect(`/${group.id}`);
  }

  return (
    <div className="flex justify-center items-center w-full">
      <Card>
        <CardHeader>
          <CardTitle>Новая группа</CardTitle>
          <CardDescription>
            Давайте придумаем новую группу, в которой будут наши дети
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GroupCreateFeature />
        </CardContent>
      </Card>
    </div>
  );
}
