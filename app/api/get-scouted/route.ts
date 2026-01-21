import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OROS_EMAIL,
        pass: process.env.OROS_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"House of OROS" <${process.env.OROS_EMAIL}>`,
      to: "robertodoh5008@gmail.com",
      subject: "New Get Scouted Application",
      html: `
        <h2>New Application</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Country:</strong> ${body.country}</p>
        <p><strong>Discipline:</strong> ${body.discipline}</p>
        <p><strong>Links:</strong> ${body.links}</p>
        <p><strong>Statement:</strong></p>
        <p>${body.statement}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
