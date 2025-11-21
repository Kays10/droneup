"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  // Placeholder user data; replace with real data when backend is ready
  const user = {
    name: "Sizwe Lushozi",
    subtitle: "Future drone pilot based in Gauteng",
    status: "Verified",
    email: "sizwe@gmail.com",
    phone: "+27 724 07 00 17",
    avatarUrl: "", // placeholder
  };

  return (
    <div className="page-bg-white">
      {/* Header (blue bar, centered title) */}
      <header className="profile-header">Profile</header>

      {/* Sidebar */}
      <div className={`sidebar-backdrop ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <Image src="/logo.png" alt="Drone Up logo" className="logo-inline" width={200} height={72} />
          <button className="header-icon-btn" onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </div>
        <nav style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          <Link href="/dashboard" className="sidebar-item"><span className="icon">🏠</span><span>Home</span></Link>
          <Link href="/chats" className="sidebar-item"><span className="icon">💬</span><span>Chats</span></Link>
          <Link href="/profile" className="sidebar-item"><span className="icon">👤</span><span>Profile</span></Link>
          <button
            className="sidebar-item logout"
            onClick={() => {
              try {
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("demoUser");
              } catch {}
              window.location.href = "/login";
            }}
          >
            <span className="icon">🚪</span><span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Profile content */}
      <main className="profile-wrap">
        {/* Avatar with placeholder and edit overlay */}
        <div className="profile-avatar">
          {user.avatarUrl ? (
            <Image src={user.avatarUrl} alt={user.name} className="avatar-img" fill sizes="96px" />
          ) : (
            <div className="avatar-img" style={{ background: "#cbd5e1" }} />
          )}
          <Link href="/edit-profile" className="avatar-edit" aria-label="Edit photo">📷</Link>
        </div>

        {/* Name and subtitle */}
        <div className="profile-name">{user.name}</div>
        <div className="profile-subtitle">{user.subtitle}</div>

        {/* Fields */}
        <div className="profile-fields">
          <div className="field-row">
            <div className="field-label">Status</div>
            <div className="field-value">{user.status}</div>
          </div>
          <div className="field-row">
            <div className="field-label">Name</div>
            <div className="field-value">{user.name}</div>
          </div>
          <div className="field-row">
            <div className="field-label">Email</div>
            <div className="field-value">{user.email}</div>
          </div>
          <div className="field-row">
            <div className="field-label">Phone number</div>
            <div className="field-value">{user.phone}</div>
          </div>
        </div>

        {/* Edit Profile button */}
        <Link href="/edit-profile" className="btn btn-solid-blue btn-edit-profile">Edit Profile</Link>
      </main>

      {/* Bottom Nav */}
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