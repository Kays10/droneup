"use client";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="page-bg-white">
      <main className="center-page">
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <Image src="/logo.png" alt="Drone Up" className="login-logo" width={240} height={240} priority />

          <div className="form-narrow" style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="email" className="input input-soft" placeholder="Email Address" />
            <input type="password" className="input input-soft" placeholder="Password" />

            <Link href="/dashboard" className="btn btn-solid-blue btn-wide" style={{ marginTop: 4 }} onClick={() => {
              try {
                localStorage.setItem("loggedIn", "true");
              } catch {}
            }}>Login</Link>

            <div className="auth-note">
              Don&apos;t have Account? <Link href="/register" className="link">Register</Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}