"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const PLAYLIST_4K_NATURE = "PLbWPytS1GWJJk4Exgs6DNR0jhhUxZBjCb";
const SINGLE_4K_DRONE = "lM02vNMRRB0";

function ThumbFrame({ src, title }: { src: string; title: string }) {
  return (
    <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 8, overflow: "hidden" }}>
      <iframe
        src={src}
        title={title}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="page-bg-white">
      {/* Top App Bar */}
      <header className="app-header">
        <div className="top-row">
          <button className="header-icon-btn" onClick={() => setOpen(true)} aria-label="Open menu">☰</button>
          <div className="title">Explore</div>
          <button className="header-icon-btn" aria-label="Filter">⛃</button>
        </div>
        <div className="searchbar">
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="Search for item" />
          <button className="filter-btn" aria-label="Filter">⛃</button>
        </div>
      </header>

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
          <Link href="/courses" className="sidebar-item"><span className="icon">📚</span><span>Courses</span></Link>
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

      {/* Content */}
      <main className="container-mobile">
        {/* Pilot of the week */}
        <div className="section">
          <div className="section-row"><h2 className="section-title">Pilot of the week</h2></div>
          <div className="card pilot-card">
            <div className="pilot-photo-wrap">
              <div className="placeholder placeholder-photo" />
            </div>
            <div>
              <div className="text-heading" style={{ color: "#2563eb" }}>Lungelo Khoza</div>
              <p className="text-subtext" style={{ marginTop: 6 }}>Lorem ipsum has been. Lorem ipsum has been. Lorem ipsum has been.</p>
              <a href="https://www.bbc.com/news/articles/cp3xyrk261wo" target="_blank" rel="noopener noreferrer" className="btn btn-solid-blue" style={{ marginTop: 8, paddingLeft: 16, paddingRight: 16 }}>Read more</a>
            </div>
          </div>
        </div>

        {/* News */}
        <div className="section">
          <div className="section-row">
            <h2 className="section-title">News</h2>
            <Link href="https://www.bbc.com/news/articles/cp3xyrk261wo" target="_blank" rel="noopener noreferrer" className="link">Open Article</Link>
          </div>
          <div className="card" style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: 12, alignItems: "center" }}>
            <div className="placeholder placeholder-thumb" />
            <div>
              <div className="text-heading">Met Police to launch drones in response to 999 calls</div>
              <div className="text-subtext">External • BBC News</div>
              <a href="https://www.bbc.com/news/articles/cp3xyrk261wo" target="_blank" rel="noopener noreferrer" className="btn btn-solid-blue" style={{ marginTop: 8, paddingLeft: 16, paddingRight: 16 }}>Read</a>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="section">
          <div className="section-row">
            <h2 className="section-title">Courses</h2>
            <Link href="/courses" className="link">View All</Link>
          </div>
          <div className="course-grid">
            <Link href="/videos/intro-drone-9" className="card course-card" style={{ textDecoration: "none" }}>
              <div className="placeholder placeholder-thumb" style={{ padding: 0 }}>
                <ThumbFrame src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_4K_NATURE}`} title="Drone Playlist (Variety)" />
              </div>
              <div style={{ marginTop: 8 }}>
                <div className="text-heading">Introduction to Drone</div>
                <div className="text-subtext">9 videos</div>
              </div>
            </Link>
            <Link href="/videos/intro-drone-3" className="card course-card" style={{ textDecoration: "none" }}>
              <div className="placeholder placeholder-thumb" style={{ padding: 0 }}>
                <ThumbFrame src={`https://www.youtube.com/embed/${SINGLE_4K_DRONE}?start=0`} title="Drone Film Preview" />
              </div>
              <div style={{ marginTop: 8 }}>
                <div className="text-heading">Introduction to Drone</div>
                <div className="text-subtext">3 videos</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Hire a Drone */}
        <div className="section">
          <h2 className="section-title">Hire a Drone</h2>
          <div className="hire-grid">
            <div className="card hire-card">
              <img src="/pngimg.com - drone_PNG51.png" alt="White Drone" className="hire-thumb" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/hero.png';}} />
              <div style={{ marginTop: 8 }}>
                <div className="text-heading">DJI Mini 3 Pro</div>
                <div className="price-tag">R2000/day</div>
                <div className="price-sub">Includes battery and controller</div>
              </div>
              <Link href="/chats" className="btn btn-solid-blue" style={{ marginTop: 8 }}>Hire Now</Link>
            </div>

            <div className="card hire-card">
              <img src="/airplane-high-resolution-drone-picture-15.png" alt="Airplane Style Drone" className="hire-thumb" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/splash.png';}} />
              <div style={{ marginTop: 8 }}>
                <div className="text-heading">DJI Air 2S</div>
                <div className="price-tag">R3000/day</div>
                <div className="price-sub">4K video, extra props</div>
              </div>
              <Link href="/chats" className="btn btn-solid-blue" style={{ marginTop: 8 }}>Hire Now</Link>
            </div>

            <div className="card hire-card">
              <img src="/airplane-high-resolution-drone-picture-15.png" alt="DJI Mavic 3" className="hire-thumb" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/hero.png';}} />
              <div style={{ marginTop: 8 }}>
                <div className="text-heading">DJI Mavic 3</div>
                <div className="price-tag">R6000/day</div>
                <div className="price-sub">Cine model available</div>
              </div>
              <Link href="/chats" className="btn btn-solid-blue" style={{ marginTop: 8 }}>Hire Now</Link>
            </div>

            <div className="card hire-card">
              <img src="/drone-flying-on-farming-to-inspection-and-scanning-the-area-for-monitoring-smart-farming-and-researching-technology-concept-transparent-background-ai-generated-generative-ai-png.png" alt="Smart Farming Drone" className="hire-thumb" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/splash.png';}} />
              <div style={{ marginTop: 8 }}>
                <div className="text-heading">Agriculture Scout</div>
                <div className="price-tag">R2500/day</div>
                <div className="price-sub">Ideal for field inspection</div>
              </div>
              <Link href="/chats" className="btn btn-solid-blue" style={{ marginTop: 8 }}>Hire Now</Link>
            </div>

            <div className="card hire-card">
              <img src="/pngimg.com - drone_PNG51.png" alt="Modern Flyer" className="hire-thumb" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/splash.png';}} />
              <div style={{ marginTop: 8 }}>
                <div className="text-heading">Modern Flyer</div>
                <div className="price-tag">R3500/day</div>
                <div className="price-sub">High stability and range</div>
              </div>
              <Link href="/chats" className="btn btn-solid-blue" style={{ marginTop: 8 }}>Hire Now</Link>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <Link href="/dashboard" className="bottom-nav-item active">
          <div className="icon-circle icon-blue">🏠</div>
          <span>Home</span>
        </Link>
        <Link href="/chats" className="bottom-nav-item">
          <div className="icon-circle icon-blue">💬</div>
          <span>Chats</span>
        </Link>
        <Link href="/profile" className="bottom-nav-item">
          <div className="icon-circle icon-blue">👤</div>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}