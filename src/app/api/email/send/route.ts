import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { getTranslations } from "next-intl/server";

const prisma = new PrismaClient();

interface EmailRequest {
  email: string;
  name?: string;
}

export async function POST(req: NextRequest) {
  try {
    const t = await getTranslations("Auth.Register");

    const { email, name } = (await req.json()) as EmailRequest;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate verification token
    const token = crypto.randomInt(100000, 999999).toString();
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify connection configuration
    await transporter.verify();

    // CitizenConnect-themed email template
    const message = {
      from: `"CitizenConnect" <${process.env.GOOGLE_EMAIL}>`,
      to: email,
      subject: t("emailVerificationSubject"),
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f3ee; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px; background-color: #fff; border: 1px solid #e8e8e8; border-top: none; }
            .code { font-size: 28px; letter-spacing: 3px; color: #d4a373; font-weight: bold; text-align: center; margin: 20px 0; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #d4a373;">CitizenConnect</h1>
            </div>
            <div class="content">
              <h2>${t("emailVerificationGreeting", {
                name: name?.split(" ")[0] || t("dearUser"),
              })}</h2>
              <p>${t("emailVerificationInstructions")}</p>
              
              <div class="code">${token}</div>
              
              <p>${t("emailVerificationExpiry")}</p>
              <p>${t("emailVerificationClosing")}</p>
              <p>${t("emailVerificationSignature")}</p>
            </div>
            <div class="footer">
              © ${new Date().getFullYear()} CitizenConnect. ${t(
        "allRightsReserved"
      )}
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(message);

    // Delete any existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    // Save new token in database
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: expiryTime,
      },
    });

    return NextResponse.json(
      { message: "Verification email sent" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
