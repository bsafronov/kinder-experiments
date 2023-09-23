"use client";

import { cn } from "@/shared/lib/utils";
import { Kid } from "@prisma/client";
import { Baby } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Props = {
  kid: Kid;
};

export function SidebarKidItem({ kid }: Props) {
  const { kidId } = useParams();

  const fio = `${kid.lastName} ${kid.firstName[0]}. ${kid.middleName[0]}.`;

  return (
    <Link
      href={`/kids/${kid.id}`}
      className={cn("flex items-center w-48 truncate hover:underline gap-x-2", {
        "text-blue-600": kidId === kid.id,
      })}
    >
      <Baby className="w-4 h-4" />
      {fio}
    </Link>
  );
}
