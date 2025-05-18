import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../../prisma/client";
import { createNotification } from "@/actions/notifications";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input - ensure nationalId is included
    if (!body.email || !body.nationalId) {
      return NextResponse.json(
        {
          error: "Missing required fields (email and national ID are required)",
        },
        { status: 400 }
      );
    }

    // Validate national ID format (16 characters)
    if (body.nationalId.length !== 16) {
      return NextResponse.json(
        { error: "National ID must be exactly 16 characters" },
        { status: 400 }
      );
    }

    // Check if user exists by email or national ID
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.email }, { nationalId: body.nationalId }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            existingUser.email === body.email
              ? "Email already in use"
              : "National ID already registered",
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create user with national ID
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        nationalId: body.nationalId,
        password: hashedPassword,
        interests: body.interests,
        role: body.role || "CITIZEN",
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not created" },
        { status: 500 }
      );
    }

    // Create welcome notification
    await createNotification(
      user.id,
      "MESSAGE_RECEIVED",
      "Welcome to CitizenConnect!",
      `Welcome to CitizenConnect! Your account has been created successfully.`,
      user.id
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
