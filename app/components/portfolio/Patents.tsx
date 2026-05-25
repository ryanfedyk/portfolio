"use client";
import { useEffect, useRef, useState } from "react";

const patents = [
  {
    id: "PAT-001",
    title: "Portrait Framing with Background Freeze",
    product: "Google Meet",
    status: "Patented",
    desc: "Larger, more consistent face sizes with natural cropping while maintaining the authenticity of natural backgrounds.",
    color: "#4d7cff",
    image: "/assets/portraitframing.gif",
  },
  {
    id: "PAT-002",
    title: "Reinventing the Self View",
    product: "Google Meet",
    status: "Patented",
    desc: "Quick-access self view which reduces distraction and VC fatigue, optimized for intentional moments of self-looking.",
    color: "#a855f7",
    image: "/assets/screenshare.png",
  },
  {
    id: "PAT-003",
    title: "Dynamic Layouts",
    product: "Google Meet",
    status: "Patented",
    desc: "Rebuild Meet's layout logic to support new hybrid technologies which improve equity and reduce VC fatigue.",
    color: "#06d6a0",
    image: "/assets/dynamiclayouts.gif",
  },
  {
    id: "PAT-004",
    title: "Pop-up Rooms",
    product: "Google Meet",
    status: "Patented",
    desc: "A hybrid meeting powered by a spatial arrangement of personal devices that creates a single, more natural meeting experience.",
    color: "#4d7cff",
    image: "/assets/roomsvisoin.gif",
  },
  {
    id: "PAT-005",
    title: "Vibe Check",
    product: "Google Meet",
    status: "Patent Pending",
    desc: "Using AI to detect non-verbal cues and amplify the colors and visual treatment in each participant's tile.",
    color: "#a855f7",
    image: "/assets/reactions.gif",
  },
  {
    id: "PAT-006",
    title: "Shopping AI Pathways",
    product: "Google Shopping",
    status: "Patent Pending",
    desc: "Novel UX pattern that brings LLM power to the product grid, empowering users to visually browse while intuitively refining their search.",
    color: "#06d6a0",
    image: "/assets/shoppingaipathways.gif",
  },
  {
    id: "PAT-007",
    title: "Outfit Agent",
    product: "Google Shopping",
    status: "Patented",
    desc: "A modern take on the catalog mailer curated by a shopping agent to drive re-engagement with contextual, generative media.",
    color: "#ffd600",
    image: "/assets/outfitagent.gif",
  },
];

const googleLaunches = [
  {
    name: "Google Meet Generative Backgrounds",
    year: "2023",
    co: "Google",
    image: "/assets/generativebackgrounds.gif",
  },
  {
    name: "Real-time Speech Translation",
    year: "2025",
    co: "Google",
    image: "/assets/realtimespeech%20translation.gif",
  },
  {
    name: "Hybrid Work / Return to Office",
    year: "2022",
    co: "Google",
    image: "/assets/biometric%20room%20checkin.gif",
  },
  {
    name: "Board 65 Collaboration Device",
    year: "2022",
    co: "Google",
    image: "/assets/audiomesh.gif",
  },
  {
    name: "Series One 27 Device",
    year: "2022",
    co: "Google",
    image: "/assets/AIrepresentationinmeet.gif",
  },
  {
    name: "Google Classroom Redesign",
    year: "2019",
    co: "Google",
    image: "/assets/eduteamleaderhsip.jpg",
  },
  {
    name: "Perspective API (200+ partners)",
    year: "2018",
    co: "Jigsaw",
    image: "/assets/fighting%20disinfo.png",
  },
  {
    name: "Outline VPN / Censorship Tool",
    year: "2018",
    co: "Jigsaw",
    image: "/assets/represive%20censorship.png",
  },
];

const microsoftLaunches = [
  { name: "Windows Phone 7", year: "2010" },
  { name: "Xbox Kinect", year: "2010" },
  { name: "Bing Maps", year: "2011" },
  { name: "Windows Translator", year: "2012" },
];

function PatentCard({ p, index }: { p: (typeof patents)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s`,
        background: "var(--surface)",
        border: `1px solid ${hovered ? p.color + "40" : "var(--border)"}`,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: hovered ? `0 8px 40px ${p.color}18` : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div
        style={{
          width: "100%",
          height: 200,
          overflow: "hidden",
          position: "relative",
          background: "#0a0d1a",
          flexShrink: 0,
        }}
      >
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        {/* Status badge over image */}
        <span
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            padding: "3px 10px",
            borderRadius: 4,
            background: p.status === "Patented" ? `${p.color}cc` : "rgba(255,214,0,0.85)",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: p.status === "Patented" ? "#fff" : "#000",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            backdropFilter: "blur(8px)",
          }}
        >
          {p.status}
        </span>
      </div>

      {/* Text */}
      <div style={{ padding: "20px 22px 24px", flex: 1 }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: p.color,
            letterSpacing: "0.08em",
            marginBottom: 8,
          }}
        >
          {p.product} · {p.id}
        </p>
        <h4
          style={{
            fontFamily: "var(--font-space)",
            fontWeight: 700,
            fontSize: 16,
            color: "var(--text)",
            lineHeight: 1.25,
            marginBottom: 10,
            letterSpacing: "-0.01em",
          }}
        >
          {p.title}
        </h4>
        <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65 }}>{p.desc}</p>
      </div>
    </div>
  );
}

function LaunchCard({ l, index }: { l: (typeof googleLaunches)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const accentColor = l.co === "Jigsaw" ? "#06d6a0" : "#4d7cff";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.06}s, transform 0.6s ease ${index * 0.06}s`,
        borderRadius: 10,
        overflow: "hidden",
        border: `1px solid ${hovered ? accentColor + "35" : "var(--border)"}`,
        background: "var(--surface)",
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Image */}
      <div
        style={{
          width: "100%",
          height: 180,
          overflow: "hidden",
          background: "#0a0d1a",
        }}
      >
        <img
          src={l.image}
          alt={l.name}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>

      {/* Text */}
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: accentColor,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {l.co}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--text-dim)",
              letterSpacing: "0.06em",
            }}
          >
            {l.year}
          </span>
        </div>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {l.name}
        </p>
      </div>
    </div>
  );
}

export default function Patents() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const launchHeaderRef = useRef<HTMLDivElement>(null);
  const [launchHeaderVisible, setLaunchHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = launchHeaderRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLaunchHeaderVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="patents"
      style={{
        padding: "120px clamp(24px, 6vw, 120px)",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Patents header */}
        <div
          ref={headerRef}
          style={{
            marginBottom: 64,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-dim)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Intellectual Property
          </p>
          <h2
            style={{
              fontFamily: "var(--font-space)",
              fontWeight: 800,
              fontSize: "clamp(40px, 7vw, 96px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--text)",
            }}
          >
            Patents
          </h2>
        </div>

        {/* Patent cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
            marginBottom: 120,
          }}
        >
          {patents.map((p, i) => (
            <PatentCard key={p.id} p={p} index={i} />
          ))}
        </div>

        {/* Notable Launches header */}
        <div
          ref={launchHeaderRef}
          style={{
            marginBottom: 52,
            opacity: launchHeaderVisible ? 1 : 0,
            transform: launchHeaderVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            borderTop: "1px solid var(--border)",
            paddingTop: 80,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-dim)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: "var(--font-space)",
              fontWeight: 800,
              fontSize: "clamp(40px, 7vw, 96px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--text)",
              marginBottom: 16,
            }}
          >
            Notable Launches
          </h2>
          <p
            style={{
              color: "var(--text-dim)",
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.06em",
            }}
          >
            Contact me to view detailed work samples
          </p>
        </div>

        {/* Google / Jigsaw launches — visual grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14,
            marginBottom: 64,
          }}
        >
          {googleLaunches.map((l, i) => (
            <LaunchCard key={i} l={l} index={i} />
          ))}
        </div>

        {/* Microsoft launches — typographic block */}
        <div
          style={{
            padding: "40px 48px",
            border: "1px solid var(--border)",
            borderRadius: 12,
            background: "var(--bg)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "#00a4ef",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Microsoft
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {microsoftLaunches.map((l, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 20,
                  padding: "14px 0",
                  borderBottom:
                    i < microsoftLaunches.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--text-dim)",
                    minWidth: 36,
                    letterSpacing: "0.04em",
                  }}
                >
                  {l.year}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-space)",
                    fontWeight: 600,
                    fontSize: "clamp(15px, 2vw, 20px)",
                    color: "var(--text-muted)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {l.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
