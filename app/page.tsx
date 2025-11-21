"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const hasUser = typeof window !== "undefined" && localStorage.getItem("demoUser");
        router.push(hasUser ? "/dashboard" : "/login");
      } catch {
        router.push("/login");
      }
    }, 2000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="splash">
      <div className="splash-center">
        <div className="splash-logo-wrap">
          <Image src="/logo.png" alt="Drone Up logo" className="logo-splash" width={240} height={240} priority />
        </div>
        <div className="progress">
          <div className="progress-track">
            <div className="progress-fill" />
          </div>
          <div className="progress-label">Loading...</div>
        </div>
      </div>
    </main>
  );
}
