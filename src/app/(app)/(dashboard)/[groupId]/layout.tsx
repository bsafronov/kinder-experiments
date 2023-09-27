import { db } from "@/shared/lib/db";
import { SidebarWidget } from "@/widgets/sidebar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { userId } = auth();
  const group = await db.group.findFirst({
    where: {
      adminIDs: {
        has: userId,
      },
    },
  });

  if (!group) {
    redirect(`/`);
  }

  return (
    <>
      <SidebarWidget />
      <main className="border-r grow">{children}</main>
    </>
  );
}
