import { NextResponse } from "next/server";
import { handleApiError, validateSessionAndRole } from "@/lib/api/utils";
import { Role } from "@prisma/client";
import prisma from "../../../../../prisma/client";

/**
 * GET /api/complaints/[id] - Get a single complaint
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const session = await validateSessionAndRole(req);
    if (session instanceof NextResponse) return session;

    const complaint = await prisma.complaint.findUnique({
      where: { id: id },
      include: {
        timeline: {
          orderBy: { createdAt: "desc" },
        },
        attachments: true,
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!complaint) {
      return NextResponse.json(
        { success: false, message: "Complaint not found" },
        { status: 404 }
      );
    }

    // Check access permissions
    if (
      complaint.isPublic !== true &&
      session.user.role === Role.CITIZEN &&
      complaint.citizenId !== session.user.id
    ) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    // Agency can only access complaints assigned to them or their agency
    if (
      session.user.role === Role.AGENCY &&
      complaint.assignedToId !== session.user.id &&
      complaint.agencyId !== session.user.id
    ) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, data: complaint });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/complaints/[id] - Update a complaint
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const session = await validateSessionAndRole(req, [
      Role.ADMIN,
      Role.AGENCY,
    ]);
    if (session instanceof NextResponse) return session;

    const existingComplaint = await prisma.complaint.findUnique({
      where: { id: id },
    });

    if (!existingComplaint) {
      return NextResponse.json(
        { success: false, message: "Complaint not found" },
        { status: 404 }
      );
    }

    // Check if the agency user is assigned to this complaint
    if (
      session.user.role === Role.AGENCY &&
      existingComplaint.assignedToId !== session.user.id
    ) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validatedData = body;

    // Check if status is being updated
    const statusChanged =
      validatedData.status && validatedData.status !== existingComplaint.status;

    const updatedComplaint = await prisma.$transaction(async (prisma) => {
      const complaint = await prisma.complaint.update({
        where: { id: id },
        data: validatedData,
      });

      // Add timeline entry if status changed
      if (statusChanged) {
        await prisma.timeline.create({
          data: {
            complaintId: id,
            status: validatedData.status!,
            description: `Status changed to ${validatedData.status}`,
          },
        });
      }

      return complaint;
    });

    return NextResponse.json({ success: true, data: updatedComplaint });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/complaints/[id] - Soft delete a complaint
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const session = await validateSessionAndRole(req, [Role.ADMIN]);
    if (session instanceof NextResponse) return session;

    const existingComplaint = await prisma.complaint.findUnique({
      where: { id: id },
    });

    if (!existingComplaint) {
      return NextResponse.json(
        { success: false, message: "Complaint not found" },
        { status: 404 }
      );
    }

    // Soft delete by marking as not public
    const deletedComplaint = await prisma.complaint.update({
      where: { id: id },
      data: {
        isPublic: false,
        status: "REJECTED",
      },
    });

    console.log("Deleted complaint:", deletedComplaint);

    // Add timeline entry for deletion
    await prisma.timeline.create({
      data: {
        complaintId: id,
        status: "REJECTED",
        description: "Complaint deleted by admin",
      },
    });

    return NextResponse.json(
      { success: true, message: "Complaint deleted" },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
