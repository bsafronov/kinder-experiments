import { db } from "@/shared/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { kidId: string; noteId: string } }
) {
  try {
    const { userId } = auth();
    const { kidId, noteId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const note = await db.note.update({
      where: {
        kidId,
        id: noteId,
      },
      data: {
        description: values.description,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("[ADD_KID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId } = auth();
    const { noteId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const note = await db.note.delete({
      where: {
        id: noteId,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("[ADD_KID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
