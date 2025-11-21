"use client";
import Link from "next/link";

export default function VerifiedPage() {
  return (
    <div className="page-bg-white">
      <main className="center-page">
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", marginBottom: 16 }}>
            <svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
              <circle cx="48" cy="48" r="32" fill="#2563EB"/>
              <path d="M36 48l8 8 16-16" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>

          <h1 style={{ color: "#2563EB", fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Account Verified</h1>
          <p style={{ color: "#6B7280", marginBottom: 16 }}>Your account was successfully verified.</p>

          <Link href="/login" className="btn btn-solid-blue btn-wide" style={{ marginTop: 4 }}>Back to Login</Link>
        </div>
      </main>
    </div>
  );
}