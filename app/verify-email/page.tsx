"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function VerifyEmailContent() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const codeParam = params.get("code") || "";
  const [previewCode, setPreviewCode] = useState(codeParam);

  useEffect(() => {
    if (!previewCode && email) {
      try {
        const stored = sessionStorage.getItem(`demoOtp:${email.toLowerCase()}`) || "";
        if (stored) setPreviewCode(stored);
      } catch {}
    }
  }, [email, previewCode]);

  const nextHref = email
    ? `/otp?email=${encodeURIComponent(email)}${(previewCode || codeParam) ? `&code=${encodeURIComponent(previewCode || codeParam)}` : ""}`
    : "/otp";

  return (
    <div className="page-bg-white">
      <main className="center-page">
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", marginBottom: 16 }}>
            <svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="20" width="80" height="56" rx="8" fill="#F59E0B"/>
              <path d="M8 28l40 24L88 28" fill="#D97706"/>
              <path d="M65 55l22-9-38 30 6-16-20-8 30-7z" fill="#60A5FA"/>
              <path d="M62 60l3-5-12 3 9 2z" fill="#2563EB"/>
              <circle cx="48" cy="80" r="2" fill="#2563EB"/>
            </svg>
          </div>

          <h1 style={{ color: "#2563EB", fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Verify your account</h1>
          <p style={{ color: "#6B7280", marginBottom: 16 }}>OTP Sent to your email address</p>

          {previewCode && (
            <div className="auth-note" style={{ color: "#2563EB", marginBottom: 12 }}>
              Demo code: <strong>{previewCode}</strong>
            </div>
          )}

          <Link href={nextHref} className="btn btn-solid-blue btn-wide" style={{ marginTop: 4 }}>Continue</Link>
        </div>
      </main>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}