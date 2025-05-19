import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Role } from "@prisma/client";

export async function roleMiddleware(req: NextRequest, allowedRoles: Role[]) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!allowedRoles.includes(token.role as Role)) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  return null;
}

export async function rateLimitMiddleware(req: NextRequest) {
  console.log("Rate limit middleware", req);
  // TODO: Implement rate limiting logic here
  return null;
}
