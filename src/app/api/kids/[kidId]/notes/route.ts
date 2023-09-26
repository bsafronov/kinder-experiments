import { db } from "@/shared/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { kidId: string } }
) {
  try {
    const { userId } = auth();
    const { kidId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const note = await db.note.create({
      data: {
        description: values.description,
        kidId,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("[ADD_KID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
