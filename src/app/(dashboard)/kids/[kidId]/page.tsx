import { db } from "@/shared/lib/db";
import { EditKidFormWidget } from "@/widgets/edit-kid-form";
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
      notes: true,
    },
  });

  const vaccinations = await db.vaccination.findMany({});

  if (!kid) {
    return redirect("/");
  }

  return <EditKidFormWidget kid={kid} vaccinations={vaccinations} />;
}
