"use client";
import Link from "next/link";
import Image from "next/image";

const demoChats = [
  { id: "johnny-rios-1", name: "Johnny Rios", preview: "Hi Sizwe, I need your help...", time: "11:20am", avatar: "/icon.png" },
  { id: "johnny-rios-2", name: "Johnny Rios", preview: "Hi Sizwe, I need your help...", time: "11:20am", avatar: "/icon.png" },
  { id: "johnny-rios-3", name: "Johnny Rios", preview: "Hi Sizwe, I need your help...", time: "11:20am", avatar: "/icon.png" },
  { id: "johnny-rios-4", name: "Johnny Rios", preview: "Hi Sizwe, I need your help...", time: "11:20am", avatar: "/icon.png" },
  { id: "johnny-rios-5", name: "Johnny Rios", preview: "Hi Sizwe, I need your help...", time: "11:20am", avatar: "/icon.png" },
  { id: "johnny-rios-6", name: "Johnny Rios", preview: "Hi Sizwe, I need your help...", time: "11:20am", avatar: "/icon.png" },
  { id: "johnny-rios-7", name: "Johnny Rios", preview: "Hi Sizwe, I need your help...", time: "11:20am", avatar: "/icon.png" },
];

export default function ChatsPage() {
  return (
    <div className="page-bg-white">
      <header className="chats-header">Chats</header>

      <main className="chat-wrap">
        <div className="chat-list">
          {demoChats.map((c) => (
            <Link key={c.id} href={`/chats/${c.id}`} className="chat-item" aria-label={`Open chat with ${c.name}`}>
              <div className="chat-avatar">
                <Image src={c.avatar} alt="Avatar" width={36} height={36} />
              </div>
              <div className="chat-body">
                <div className="chat-name">{c.name}</div>
                <div className="chat-preview">{c.preview}</div>
              </div>
              <div className="chat-meta">{c.time}</div>
            </Link>
          ))}
        </div>
      </main>

      <nav className="bottom-nav">
        <Link href="/dashboard" className="bottom-nav-item">
          <div className="icon-circle icon-blue" style={{ width: 28, height: 28 }}>🏠</div>
          <span>Home</span>
        </Link>
        <Link href="/chats" className="bottom-nav-item active">
          <div className="icon-circle icon-blue" style={{ width: 28, height: 28 }}>💬</div>
          <span>Chats</span>
        </Link>
        <Link href="/profile" className="bottom-nav-item">
          <div className="icon-circle icon-blue" style={{ width: 28, height: 28 }}>👤</div>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}