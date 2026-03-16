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

    const submittedAt = new Date().toLocaleString("en-GB", {
      timeZone: "UTC",
      dateStyle: "full",
      timeStyle: "short",
    });

    await transporter.sendMail({
      from: `"House of OROS" <${process.env.OROS_EMAIL}>`,
      to: "odoh@uwindsor.ca",
      subject: `New Application — ${body.name} · ${body.discipline}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#e8e8e8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="border-bottom:1px solid #2a2a2a;padding-bottom:28px;">
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.2em;color:#666;text-transform:uppercase;">The House of OROS Institute</p>
              <h1 style="margin:0;font-size:22px;font-weight:400;color:#f0f0f0;letter-spacing:0.04em;">Scouting Application</h1>
              <p style="margin:8px 0 0;font-size:11px;color:#555;">${submittedAt} UTC</p>
            </td>
          </tr>

          <!-- Applicant Overview -->
          <tr>
            <td style="padding-top:32px;">
              <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;color:#555;text-transform:uppercase;">Applicant</p>
              <h2 style="margin:0 0 4px;font-size:26px;font-weight:400;color:#f0f0f0;">${body.name}</h2>
              <p style="margin:0;font-size:13px;color:#888;">${body.discipline}</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:28px 0 0;"><div style="height:1px;background:#1e1e1e;"></div></td></tr>

          <!-- Details -->
          <tr>
            <td style="padding-top:28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:50%;padding-bottom:20px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.16em;color:#555;text-transform:uppercase;">Email</p>
                    <a href="mailto:${body.email}" style="font-size:13px;color:#c8c8c8;text-decoration:none;">${body.email}</a>
                  </td>
                  <td style="width:50%;padding-bottom:20px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.16em;color:#555;text-transform:uppercase;">Country</p>
                    <p style="margin:0;font-size:13px;color:#c8c8c8;">${body.country}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Portfolio Links -->
          ${body.links ? `
          <tr>
            <td style="padding-bottom:28px;">
              <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.16em;color:#555;text-transform:uppercase;">Portfolio / Links</p>
              ${body.links.split(",").map((l: string) => `<a href="${l.trim()}" style="display:block;font-size:13px;color:#a0a0a0;margin-bottom:4px;">${l.trim()}</a>`).join("")}
            </td>
          </tr>
          ` : ""}

          <!-- Divider -->
          <tr><td><div style="height:1px;background:#1e1e1e;"></div></td></tr>

          <!-- Statement -->
          ${body.statement ? `
          <tr>
            <td style="padding-top:28px;padding-bottom:32px;">
              <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.16em;color:#555;text-transform:uppercase;">Interest in The House</p>
              <p style="margin:0;font-size:14px;color:#c0c0c0;line-height:1.8;white-space:pre-line;">${body.statement}</p>
            </td>
          </tr>
          ` : ""}

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #1e1e1e;padding-top:24px;">
              <p style="margin:0;font-size:10px;color:#3a3a3a;letter-spacing:0.12em;text-transform:uppercase;">House of OROS Institute · Confidential Application Record</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
