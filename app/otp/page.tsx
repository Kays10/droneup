"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

function OtpContent() {
  const router = useRouter();
  const params = useSearchParams();
  const email = (params.get("email") || "").toLowerCase();
  const codeParam = (params.get("code") || "").trim();

  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
  }, [code, address, province, idNumber]);

  useEffect(() => {
    if (!code && codeParam) {
      setCode(codeParam);
    }
    // If sessionStorage is missing but codeParam exists, seed it for consistency
    if (email && codeParam) {
      try {
        const key = `demoOtp:${email}`;
        const has = sessionStorage.getItem(key);
        if (!has) sessionStorage.setItem(key, codeParam);
      } catch {}
    }
  }, [email, code, codeParam]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError("Missing email. Please start from Register.");
      return;
    }
    if (!code || code.length < 4) {
      setError("Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      const stored = sessionStorage.getItem(`demoOtp:${email}`);
      const expected = (stored || codeParam || "").trim();
      if (!expected) {
        setError("Demo OTP not found. Please start from Register.");
        return;
      }
      if (code.trim() !== expected) {
        setError("Invalid OTP. Please check the code.");
        return;
      }
      try {
        localStorage.setItem("demoUser", JSON.stringify({ email, address, province, idNumber }));
        localStorage.setItem("loggedIn", "1");
      } catch {}
      router.push("/dashboard");
    } catch {
      setError("Verification failed. Please try again.");
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
            <input type="text" className="input input-soft" placeholder="Enter OTP" value={code} onChange={(e)=>setCode(e.target.value)} />

            <input type="text" className="input input-soft" placeholder="Physical Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
            <input type="text" className="input input-soft" placeholder="Province" value={province} onChange={(e)=>setProvince(e.target.value)} />
            <input type="text" className="input input-soft" placeholder="ID Number" value={idNumber} onChange={(e)=>setIdNumber(e.target.value)} />

            <button type="submit" disabled={loading} className="btn btn-solid-blue btn-wide" style={{ marginTop: 4 }}>
              {loading ? "Verifying..." : "Submit"}
            </button>

            {error && <div className="auth-note" style={{ color: "#ef4444" }}>{error}</div>}

            <div className="auth-note">
              Didn’t receive the code? <Link href="/register" className="link">Start Over</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense>
      <OtpContent />
    </Suspense>
  );
}