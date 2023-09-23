import { db } from "@/shared/lib/db";
import { SidebarKidItem } from "./sidebar-kid-item";

export async function SidebarKidList() {
  const kids = await db.kid.findMany();

  return (
    <ul className="p-4 overflow-hidden border-b">
      {kids.map((kid) => (
        <li key={kid.id}>
          <SidebarKidItem kid={kid} />
        </li>
      ))}
    </ul>
  );
}
