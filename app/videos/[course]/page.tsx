import Link from "next/link";
import { notFound } from "next/navigation";

const PLAYLIST_4K_NATURE = "PLbWPytS1GWJJk4Exgs6DNR0jhhUxZBjCb"; // Diverse 4K nature drone playlist
const SINGLE_4K_DRONE = "lM02vNMRRB0"; // 7-hour 4K drone film

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

export default function VideoCoursePage(props: unknown) {
  const { course } = (props as { params?: { course: string } }).params || { course: "" };

  let title = "";
  let description = "";
  let frames: { src: string; title: string }[] = [];

  if (course === "intro-drone-9") {
    title = "Introduction to Drone";
    description = "9 placeholder videos sourced from a public YouTube 4K drone playlist.";
    frames = [
      { src: `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_4K_NATURE}`, title: "Drone Playlist (Variety)" },
    ];
  } else if (course === "intro-drone-3") {
    title = "Introduction to Drone";
    description = "3 placeholder videos using a long-form 4K drone film.";
    frames = [
      { src: `https://www.youtube.com/embed/${SINGLE_4K_DRONE}?start=0`, title: "Drone Film Part 1" },
      { src: `https://www.youtube.com/embed/${SINGLE_4K_DRONE}?start=7200`, title: "Drone Film Part 2" },
      { src: `https://www.youtube.com/embed/${SINGLE_4K_DRONE}?start=14400`, title: "Drone Film Part 3" },
    ];
  } else {
    notFound();
  }

  return (
    <div className="page-bg-white">
      <header className="app-header">
        <div className="top-row">
          <Link href="/courses" className="header-icon-btn" aria-label="Back">←</Link>
          <div className="title">{title}</div>
          <div className="header-icon-btn" aria-hidden>🎥</div>
        </div>
      </header>

      <main className="center-page">
        <div className="container-narrow" style={{ width: 800, maxWidth: "95%" }}>
          <div className="section" style={{ marginTop: 12 }}>
            <div className="text-subtext">{description}</div>
          </div>

          <div className="section" style={{ marginTop: 16 }}>
            {frames.map((f, i) => (
              <VideoFrame key={i} src={f.src} title={f.title} />
            ))}
          </div>
        </div>
      </main>

      <nav className="bottom-nav">
        <Link href="/dashboard" className="bottom-nav-item">
          <div className="icon-circle icon-blue">🏠</div>
          <span>Home</span>
        </Link>
        <Link href="/courses" className="bottom-nav-item">
          <div className="icon-circle icon-blue">🎥</div>
          <span>Courses</span>
        </Link>
        <Link href="/profile" className="bottom-nav-item">
          <div className="icon-circle icon-blue">👤</div>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}