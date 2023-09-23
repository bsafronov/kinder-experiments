import { db } from "@/shared/lib/db";
import { EditKidWidget } from "@/widgets/edit-kid";
import { redirect } from "next/navigation";

export default async function KidPage({
  params,
}: {
  params: { kidId: string };
}) {
  const kid = await db.kid.findFirst({
    where: {
      id: params.kidId,
    },
    include: {
      parents: true,
      absences: true,
      vaccinations: true,
    },
  });

  if (!kid) {
    return redirect("/");
  }

  return <EditKidWidget kid={kid} />;
}
