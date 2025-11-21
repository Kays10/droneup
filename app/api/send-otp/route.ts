import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { setOtp, isUsingRedis } from '@/lib/otpStore';

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmail(to: string, code: string) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || "DroneUp <no-reply@droneup.local>";

  if (!host || !user || !pass) {
    console.log(`[OTP] ${to} -> ${code} (SMTP not configured)`);
    return { ok: false, preview: true };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = "Your DroneUp verification code";
  const html = `
    <div style="font-family: Inter, Arial, sans-serif;">
      <h2 style="color:#2563eb;margin:0 0 8px;">Verify your account</h2>
      <p style="margin:0 0 16px;">Your one-time PIN is:</p>
      <div style="font-size:28px;font-weight:700;letter-spacing:4px;">${code}</div>
      <p style="margin-top:16px;color:#6b7280">Use this code to verify your account.</p>
    </div>
  `;

  await transporter.sendMail({ from, to, subject, html, text: `Your OTP: ${code}` });
  return { ok: true };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const code = generateOtp();
    await setOtp(email, code);

    const mailResult = await sendEmail(email, code);

    if (mailResult?.preview) {
      return NextResponse.json({ ok: true, preview: true, code, storage: isUsingRedis() ? 'redis' : 'memory' });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-otp error", err);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}