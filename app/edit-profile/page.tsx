"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function EditProfilePage() {
  const [email, setEmail] = useState("sizwe@gmail.com");
  const [username, setUsername] = useState("@sizwe");
  const [name, setName] = useState("Sizwe Lushozi");
  const [phone, setPhone] = useState("+27 724 07 00 17");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const avatarUrl = "/icon.png"; // placeholder from public/

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Placeholder submit: go back to profile
    window.location.href = "/profile";
  }

  return (
    <div className="page-bg-white">
      <header className="profile-edit-header">
        <Link href="/profile" className="header-icon-btn" aria-label="Back">←</Link>
        <div className="header-title">Edit Profile</div>
        <div style={{ width: 36 }} />
      </header>

      <main className="edit-wrap">
        <div className="profile-avatar" aria-label="Profile picture">
          <Image src={avatarUrl} alt="Avatar" width={96} height={96} className="avatar-img" />
        </div>

        <form className="edit-form" onSubmit={onSubmit}>
          <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sizwe@gmail.com" />
          <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="@sizwe" />
          <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sizwe Lushozi" />
          <input type="tel" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+27 724 07 00 17" />

          <div className="password-row">
            <input type={showPassword ? "text" : "password"} className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            <button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className="btn btn-solid-blue btn-wide">Done</button>
          <Link href="/profile" className="btn btn-outline-blue btn-wide">Cancel</Link>
        </form>
      </main>

      <nav className="bottom-nav">
        <Link href="/dashboard" className="bottom-nav-item">
          <div className="icon-circle icon-blue" style={{ width: 28, height: 28 }}>🏠</div>
          <span>Home</span>
        </Link>
        <Link href="/chats" className="bottom-nav-item">
          <div className="icon-circle icon-blue" style={{ width: 28, height: 28 }}>💬</div>
          <span>Chats</span>
        </Link>
        <Link href="/profile" className="bottom-nav-item active">
          <div className="icon-circle icon-blue" style={{ width: 28, height: 28 }}>👤</div>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}