import { GroupDeleteFeature } from "@/features/group";
import { db } from "@/shared/lib/db";
import { redirect } from "next/navigation";

export default async function GroupPage({
  params,
}: {
  params: { groupId: string };
}) {
  const group = await db.group.findUnique({
    where: {
      id: params.groupId,
    },
  });

  if (!group) {
    redirect("/");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Группа "{group.title}"</h1>
      <div>
        <GroupDeleteFeature />
      </div>
    </div>
  );
}
