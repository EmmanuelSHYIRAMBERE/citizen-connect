import { NextRequest, NextResponse } from "next/server";

export async function loggingMiddleware(req: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[${req.method}] ${req.url}`);
    console.log("Headers:", Object.fromEntries(req.headers.entries()));

    try {
      const clone = req.clone();
      const body = await clone.json();
      console.log("Body:", body);
    } catch (error) {
      // No body or not JSON
      console.log("No body or not JSON", error);
    }
  }

  const response = NextResponse.next();

  if (process.env.NODE_ENV === "development") {
    response.headers.set("X-Request-Logged", "true");
  }

  return response;
}
