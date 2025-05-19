import { NextResponse } from "next/server";
import { handleApiError, validateSessionAndRole } from "@/lib/api/utils";
import { ComplaintStatus, Role } from "@prisma/client";
import { z } from "zod";
import prisma from "../../../../../../prisma/client";

const updateSchema = z.object({
  status: z
    .enum(["SUBMITTED", "IN_REVIEW", "IN_PROGRESS", "RESOLVED", "REJECTED"])
    .optional(),
  description: z.string().min(5).max(1000),
  isPublic: z.boolean().optional(),
});

/**
 * GET /api/complaints/[id]/updates - Get complaint timeline
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const session = await validateSessionAndRole(req);
    if (session instanceof NextResponse) return session;

    // Validate the complaint exists and user has access
    const complaint = await prisma.complaint.findUnique({
      where: { id: id },
    });

    if (!complaint) {
      return NextResponse.json(
        { success: false, message: "Complaint not found" },
        { status: 404 }
      );
    }

    // Check permissions
    if (
      session.user.role === Role.CITIZEN &&
      complaint.citizenId !== session.user.id
    ) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const timeline = await prisma.timeline.findMany({
      where: { complaintId: id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: timeline });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/complaints/[id]/updates - Add a timeline update
 */
export async function POST(
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

    // Validate the complaint exists and user has access
    const complaint = await prisma.complaint.findUnique({
      where: { id: id },
    });

    if (!complaint) {
      return NextResponse.json(
        { success: false, message: "Complaint not found" },
        { status: 404 }
      );
    }

    // Check if the agency user is assigned to this complaint
    if (
      session.user.role === Role.AGENCY &&
      complaint.assignedToId !== session.user.id
    ) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validatedData = updateSchema.parse(body);

    const update = await prisma.$transaction(async (prisma) => {
      // Create timeline entry
      const timelineEntry = await prisma.timeline.create({
        data: {
          complaintId: id,
          status: validatedData.status as ComplaintStatus,
          description: validatedData.description,
        },
      });

      // Update complaint status if changed
      if (validatedData.status && validatedData.status !== complaint.status) {
        await prisma.complaint.update({
          where: { id: id },
          data: { status: validatedData.status },
        });
      }

      // Update public status if changed
      if (
        validatedData.isPublic !== undefined &&
        validatedData.isPublic !== complaint.isPublic
      ) {
        await prisma.complaint.update({
          where: { id: id },
          data: { isPublic: validatedData.isPublic },
        });
      }

      return timelineEntry;
    });

    return NextResponse.json({ success: true, data: update }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
