"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !fullName || !password || password !== confirm) {
      setError("Please complete all fields and ensure passwords match.");
      return;
    }
    setLoading(true);
    try {
      // Use fixed demo OTP for consistent testing
      const demoCode = "123456";
      try { sessionStorage.setItem(`demoOtp:${email.toLowerCase().trim()}`, demoCode); } catch {}
      // Carry the code as a preview to the verify page
      const href = `/verify-email?email=${encodeURIComponent(email)}&code=${encodeURIComponent(demoCode)}`;
      router.push(href);
    } catch {
      setError("Failed to start verification. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-bg-white">
      <main className="center-page">
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <Image src="/logo.png" alt="Drone Up" className="login-logo" width={240} height={240} priority />

          <form onSubmit={handleSubmit} className="form-narrow" style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="text" className="input input-soft" placeholder="Full Name" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
            <input type="email" className="input input-soft" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="tel" className="input input-soft" placeholder="Cellphone Number" value={cell} onChange={(e)=>setCell(e.target.value)} />
            <input type="password" className="input input-soft" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <input type="password" className="input input-soft" placeholder="Confirm Password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} />

            <button type="submit" disabled={loading} className="btn btn-solid-blue btn-wide" style={{ marginTop: 4 }}>
              {loading ? "Sending..." : "Create Account"}
            </button>

            {error && <div className="auth-note" style={{ color: "#ef4444" }}>{error}</div>}

            <div className="auth-note">
              Already have an Account? <Link href="/login" className="link">Login</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}