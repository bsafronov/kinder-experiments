import { SidebarKidItem } from "./sidebar-kid-item";

export function SidebarKidList() {
  return (
    <ul className="p-4 overflow-hidden border-b">
      <li>
        <SidebarKidItem />
      </li>
    </ul>
  );
}
