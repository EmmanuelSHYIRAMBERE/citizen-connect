import { NextResponse } from "next/server";
import { handleApiError, validateSessionAndRole } from "@/lib/api/utils";
import { Prisma, Role } from "@prisma/client";
import { generateReferenceNumber } from "@/lib/api/utils";
import prisma from "../../../../prisma/client";

/**
 * GET /api/complaints - Get paginated list of complaints with filtering
 */
export async function GET(req: Request) {
  try {
    const session = await validateSessionAndRole(req, [
      Role.ADMIN,
      Role.AGENCY,
    ]);
    if (session instanceof NextResponse) return session;

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const isPublic = searchParams.get("isPublic");
    const assignedTo = searchParams.get("assignedTo");
    const citizenId = searchParams.get("citizenId");

    const skip = (page - 1) * limit;

    const where: Prisma.ComplaintWhereInput = {};

    // Apply filters based on query parameters
    if (status) where.status = status;
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { reference: { contains: search, mode: "insensitive" } },
      ];
    }
    if (isPublic) where.isPublic = isPublic === "true";
    if (assignedTo) where.assignedToId = assignedTo;
    if (citizenId) where.citizenId = citizenId;

    // Agency users can only see complaints assigned to their agency
    if (session.user.role === Role.AGENCY) {
      where.OR = [
        { assignedToId: session.user.id },
        { agencyId: session.user.id },
      ];
    }

    const [complaints, total] = await Promise.all([
      prisma.complaint.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          reference: true,
          title: true,
          category: true,
          status: true,
          priority: true,
          createdAt: true,
          citizenName: true,
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.complaint.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: complaints,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/complaints - Create a new complaint
 */
export async function POST(req: Request) {
  try {
    const session = await validateSessionAndRole(req, [
      Role.CITIZEN,
      Role.ADMIN,
      Role.AGENCY,
    ]);
    if (session instanceof NextResponse) return session;

    const body = await req.json();
    const validatedData = body;

    // Generate reference number
    const reference = generateReferenceNumber();

    const complaint = await prisma.complaint.create({
      data: {
        ...validatedData,
        reference,
        citizenId:
          session.user.role === Role.CITIZEN
            ? session.user.id
            : validatedData.citizenId,
        citizenName:
          session.user.role === Role.CITIZEN
            ? session.user.name
            : validatedData.citizenName,
        status: "SUBMITTED",
        timeline: {
          create: {
            status: "SUBMITTED",
            description: "Complaint submitted",
          },
        },
      },
      include: {
        timeline: true,
      },
    });

    return NextResponse.json(
      { success: true, data: complaint },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
