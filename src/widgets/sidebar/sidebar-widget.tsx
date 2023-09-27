import { KidCreateFeature } from "@/features/kid";
import { SidebarKidList } from "./sidebar-kid-list";
import { db } from "@/shared/lib/db";

export async function SidebarWidget() {
  const kids = await db.kid.findMany();

  return (
    <div className="bg-slate-50 border-x min-h-full w-56">
      <h5 className="font-semibold px-4 py-2 border-b">
        Мои дети ({kids.length} шт.)
      </h5>
      <SidebarKidList />
      <div className="p-4">
        <KidCreateFeature isModal />
      </div>
    </div>
  );
}
