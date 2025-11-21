"use client";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

export default function ChatResponsePage() {
  const { id } = useParams() as { id: string };
  const pilotName = useMemo(() => {
    const normalized = id.replace(/-\d+$/, "");
    return normalized
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  }, [id]);

  const [messages, setMessages] = useState<{ sender: "me" | "pilot"; text: string }[]>([
    { sender: "me", text: "Hello, are you nearby?" },
    { sender: "pilot", text: "I'll be there in a few mins" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { sender: "me", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { sender: "pilot", text: "Okay!" }]);
    }, 600);
  };

  const avatarUrl = "/icon.png"; // placeholder

  return (
    <div className="page-bg-white">
      <header className="chat-convo-header">
        <Link href="/chats" className="header-icon-btn" aria-label="Back">←</Link>
        <div className="title">{pilotName}</div>
        <div className="chat-header-avatar">
          <Image src={avatarUrl} alt="Avatar" width={28} height={28} />
        </div>
      </header>

      <main className="convo-wrap">
        <div className="chat-timestamp">Today at 5:03 PM</div>
        <div className="chat-area">
          {messages.map((m, idx) => (
            <div key={idx} className={`bubble ${m.sender === "pilot" ? "bubble-recv" : "bubble-sent"}`}>{m.text}</div>
          ))}
        </div>
      </main>

      <div className="message-bar">
        <input
          className="input message-input"
          placeholder="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-solid-blue message-send" onClick={send} aria-label="Send">➡️</button>
      </div>

      <nav className="bottom-nav">
        <Link href="/dashboard" className="bottom-nav-item">
          <div className="icon-circle icon-blue">🏠</div>
          <span>Home</span>
        </Link>
        <Link href="/chats" className="bottom-nav-item active">
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