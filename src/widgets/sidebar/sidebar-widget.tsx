import { CreateKidFeature } from "@/features/create-kid";
import { SidebarKidList } from "./sidebar-kid-list";

export function SidebarWidget() {
  return (
    <div className="bg-slate-50 border-x min-h-full w-56">
      <h5 className="font-semibold text-xl p-4 border-b">Список детей</h5>
      <SidebarKidList />
      <div className="p-4">
        <CreateKidFeature />
      </div>
    </div>
  );
}
