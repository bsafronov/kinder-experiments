import { NoteCreateFeature } from "@/features/note";
import { db } from "@/shared/lib/db";
import { EditKidFormWidget } from "@/widgets/edit-kid-form";
import { NoteItemWidget } from "@/widgets/note-item";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function KidPage({
  params,
}: {
  params: { kidId: string };
}) {
  const { userId } = auth();

  if (!userId) return null;

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

  return (
    <>
      {/* <EditKidFormWidget kid={kid} vaccinations={vaccinations} /> */}
      <div className="p-4">
        <div className="mb-8">
          <h5 className="font-semibold">Примечания</h5>
          <div className="bg-slate-50 border rounded-md">
            {kid.notes.length > 0 && (
              <ul className="divide-y border-b">
                {kid.notes.map((note) => (
                  <li key={note.id} className="p-2">
                    <NoteItemWidget note={note} />
                  </li>
                ))}
              </ul>
            )}
            <div className="p-4">
              <NoteCreateFeature userId={userId} kidId={params.kidId} />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h5 className="font-semibold">Прививки</h5>
          <div className="bg-slate-50 border rounded-md">
            <div className="p-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}
