import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api/utils";
import { Prisma } from "@prisma/client";
import prisma from "../../../../../prisma/client";

/**
 * GET /api/complaints/public - Get public complaints
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    const where: Prisma.ComplaintWhereInput = {
      isPublic: true,
    };

    if (status) where.status = status;
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
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
          description: true,
          category: true,
          status: true,
          createdAt: true,
          upvoteCount: true,
          location: true,
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
