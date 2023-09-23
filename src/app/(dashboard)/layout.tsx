import { NavbarWidget } from "@/widgets/navbar";
import { SidebarWidget } from "@/widgets/sidebar";

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-start">
      <NavbarWidget />
      <div className="flex mx-auto max-w-5xl h-full grow w-full">
        <SidebarWidget />
        <main className="pr-4 grow">{children}</main>
      </div>
    </div>
  );
}
