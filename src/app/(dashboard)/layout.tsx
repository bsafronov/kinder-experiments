import { NavbarWidget } from "@/widgets/navbar";
import { SidebarWidget } from "@/widgets/sidebar";

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div>
      <NavbarWidget />
      <div className="flex">
        <SidebarWidget />
        <main>{children}</main>
      </div>
    </div>
  );
}
