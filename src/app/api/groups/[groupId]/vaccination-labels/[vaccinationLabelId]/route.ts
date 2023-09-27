import { db } from "@/shared/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { noteTagId: string } }
) {
  try {
    const { userId } = auth();
    const { noteTagId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const vaccinationLabel = await db.vaccinationLabel.update({
      where: {
        id: noteTagId,
      },
      data: {
        updatedBy: userId,

        // FROM FRONTEND
        label: values.label,
      },
    });

    await db.log.create({
      data: {
        createdBy: userId,
        groupId: vaccinationLabel.groupId,
        entityType: "VACCINATION_LABEL",
        actionType: "UPDATE",
        entityId: vaccinationLabel.id,
      },
    });

    return NextResponse.json(vaccinationLabel);
  } catch (error) {
    console.log("[UPDATE_VACCINATION_LABEL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { noteTagId: string } }
) {
  try {
    const { userId } = auth();
    const { noteTagId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const vaccinationLabel = await db.vaccinationLabel.delete({
      where: {
        id: noteTagId,
      },
    });

    await db.log.create({
      data: {
        createdBy: userId,
        groupId: vaccinationLabel.groupId,
        entityType: "VACCINATION_LABEL",
        actionType: "DELETE",
        entityLabel: vaccinationLabel.label,
      },
    });

    return NextResponse.json(vaccinationLabel);
  } catch (error) {
    console.log("[DELETE_VACCINATION_LABEL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
