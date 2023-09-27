import { db } from "@/shared/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const group = await db.group.create({
      data: {
        createdBy: userId,
        adminIDs: [userId],
        userIDs: [userId],

        // FROM FRONTEND
        title: values.title,
      },
    });

    await db.log.create({
      data: {
        createdBy: userId,
        groupId: group.id,
        actionType: "CREATE",
        entityType: "GROUP",
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.log("[CREATE_GROUP]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
