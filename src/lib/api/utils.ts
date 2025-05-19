import authOptions from "@/app/api/auth/authOptions";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Handles API errors consistently across all endpoints
 */
export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { success: false, message: "Validation error", errors: error.errors },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  console.error("Unknown API Error:", error);
  return NextResponse.json(
    { success: false, message: "An unknown error occurred" },
    { status: 500 }
  );
}

/**
 * Validates user session and role
 */
export async function validateSessionAndRole(
  req: Request,
  allowedRoles?: Role[]
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: No session found" },
      { status: 401 }
    );
  }

  if (
    allowedRoles &&
    session?.user?.role &&
    !allowedRoles.includes(session.user.role as Role)
  ) {
    return NextResponse.json(
      { success: false, message: "Forbidden: Insufficient permissions" },
      { status: 403 }
    );
  }

  return session;
}

/**
 * Generates a unique complaint reference number
 */
export function generateReferenceNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `CMP-${year}-${randomNum}`;
}
