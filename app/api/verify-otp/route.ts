import { NextResponse } from "next/server";
import { getOtp, deleteOtp } from '@/lib/otpStore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const code = String(body?.code || "").trim();
    const address = String(body?.address || "");
    const province = String(body?.province || "");
    const idNumber = String(body?.idNumber || "");

    if (!email || !code || !address || !province || !idNumber) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const record = await getOtp(email);
    if (!record) {
      return NextResponse.json({ error: "OTP not found" }, { status: 400 });
    }
    if (record.code !== code) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    await deleteOtp(email);

    // TODO: Persist address/province/idNumber to user profile in real backend
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("verify-otp error", err);
    return NextResponse.json({ ok: false, error: "Failed to verify" }, { status: 500 });
  }
}