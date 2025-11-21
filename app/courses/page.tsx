import Link from "next/link";
import fs from "fs";
import path from "path";

const PLAYLIST_4K_NATURE = "PLbWPytS1GWJJk4Exgs6DNR0jhhUxZBjCb";
const SINGLE_4K_DRONE = "lM02vNMRRB0";

function VideoFrame({ src, title }: { src: string; title: string }) {
  return (
    <div className="card" style={{ padding: 8 }}>
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
    </div>
  );
}

export default function CoursesPage() {
  const dirs = [
    { fsPath: path.join(process.cwd(), "public", "course-content"), hrefBase: "/course-content" },
    { fsPath: path.join(process.cwd(), "public", "course content"), hrefBase: "/course content" },
  ];

  const allowed = /\.(pdf|pptx?|key|docx?)$/i;

  const collectFilesFrom = (root: string, hrefBase: string): { name: string; href: string; size: number }[] => {
    const out: { name: string; href: string; size: number }[] = [];
    try {
      const entries = fs.readdirSync(root, { withFileTypes: true });
      for (const entry of entries) {
        const entryPath = path.join(root, entry.name);
        if (entry.isDirectory()) {
          out.push(...collectFilesFrom(entryPath, `${hrefBase}/${encodeURIComponent(entry.name)}`));
        } else if (allowed.test(entry.name)) {
          let size = 0;
          try {
            const stat = fs.statSync(entryPath);
            size = stat.size || 0;
          } catch {}
          out.push({ name: entry.name, href: `${hrefBase}/${encodeURIComponent(entry.name)}`, size });
        }
      }
    } catch {}
    return out;
  };

  const files: { name: string; href: string; size: number }[] = [];
  for (const d of dirs) {
    files.push(...collectFilesFrom(d.fsPath, d.hrefBase));
  }

  // Sort files by section number (Section 1, Section 2, etc.)
  files.sort((a, b) => {
    const getSectionNumber = (filename: string) => {
      const match = filename.match(/Section\s+(\d+)/i);
      return match ? parseInt(match[1], 10) : 999; // Put files without section numbers at the end
    };
    
    const sectionA = getSectionNumber(a.name);
    const sectionB = getSectionNumber(b.name);
    
    if (sectionA !== sectionB) {
      return sectionA - sectionB;
    }
    
    // If same section number or no section number, sort alphabetically
    return a.name.localeCompare(b.name);
  });

  const formatSize = (bytes: number) => {
    if (!bytes) return "";
    const units = ["B", "KB", "MB", "GB"]; 
    let i = 0; 
    let value = bytes; 
    while (value >= 1024 && i < units.length - 1) { value /= 1024; i++; }
    return `${value.toFixed(1)} ${units[i]}`;
  };

  return (
    <div className="page-bg-white">
      <header className="app-header">
        <div className="top-row">
          <Link href="/dashboard" className="header-icon-btn" aria-label="Back">←</Link>
          <div className="title">Course Content</div>
          <div className="header-icon-btn" aria-hidden>📚</div>
        </div>
      </header>

      <main className="center-page">
        <div className="container-narrow" style={{ width: 560, maxWidth: "95%" }}>
          <div className="section" style={{ marginTop: 12 }}>
            <h2 className="section-title">Training Materials</h2>
            {files.length === 0 ? (
              <div className="card" style={{ padding: 16 }}>
                <div className="text-subtext">No files found. Add PDFs or PowerPoints to <code>/public/course-content</code> or <code>/public/course content</code>.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {files.map((f) => (
                  <div key={`${f.href}`} className="card" style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 12, padding: 12 }}>
                    <div>
                      <div className="text-heading" style={{ wordBreak: "break-word" }}>{f.name}</div>
                      <div className="text-subtext">{formatSize(f.size)}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <a href={f.href} target="_blank" rel="noopener noreferrer" className="btn btn-solid-blue">Open</a>
                      <a href={f.href} download className="btn btn-soft">Download</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="section" style={{ marginTop: 24 }}>
            <div className="section-row">
              <h2 className="section-title">Video Lessons</h2>
            </div>
            {/* Intro to Drone - 9 videos */}
            <div className="card" style={{ padding: 16, marginTop: 8 }}>
              <div className="text-heading">Introduction to Drone</div>
              <div className="text-subtext">9 videos</div>
              <div style={{ marginTop: 12 }}>
                <VideoFrame src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_4K_NATURE}`} title="Drone Playlist (Variety)" />
              </div>
            </div>
            {/* Intro to Drone - 3 videos */}
            <div className="card" style={{ padding: 16, marginTop: 16 }}>
              <div className="text-heading">Introduction to Drone</div>
              <div className="text-subtext">3 videos</div>
              <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                <VideoFrame src={`https://www.youtube.com/embed/${SINGLE_4K_DRONE}?start=0`} title="Drone Film Part 1" />
                <VideoFrame src={`https://www.youtube.com/embed/${SINGLE_4K_DRONE}?start=7200`} title="Drone Film Part 2" />
                <VideoFrame src={`https://www.youtube.com/embed/${SINGLE_4K_DRONE}?start=14400`} title="Drone Film Part 3" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <nav className="bottom-nav">
        <Link href="/dashboard" className="bottom-nav-item">
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