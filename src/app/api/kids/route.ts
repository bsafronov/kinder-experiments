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

    const kid = await db.kid.create({
      data: {
        ...values,
      },
    });

    return NextResponse.json(kid);
  } catch (error) {
    console.log("[ADD_KID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
