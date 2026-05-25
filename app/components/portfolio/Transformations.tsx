"use client";
import { useEffect, useRef, useState } from "react";

const cases = [
  {
    index: "01",
    company: "Google Meet",
    role: "Design Lead & Design Manager",
    title: "Feature Chasing → AI-Focused Differentiators",
    summary:
      "During the pandemic Meet evolved rapidly. After my team brought the world back to the office with hybrid work, I pivoted the broader team toward longer-term vision, product differentiators, and increasing product excellence.",
    impact: [
      "Led team of 10 designers across hybrid & AI pivots",
      "Delivered hybrid work to 242 million users",
      "Launched 7 key features for return-to-office · 89% CSAT",
      "Launched Board 65 & Series One 27 collaboration devices",
      "Led pivot to AI: Generative Backgrounds, AI layouts, real-time speech translation",
    ],
    tags: ["AI", "Hybrid Work", "Design Leadership", "Patents"],
    featuredImage: "/assets/geminimeetings.gif",
    gallery: [
      "/assets/reactions.gif",
      "/assets/dynamiclayouts.gif",
      "/assets/portraitframing.gif",
      "/assets/generativebackgrounds.gif",
    ],
  },
  {
    index: "02",
    company: "Google Jigsaw",
    role: "Design Lead & Design Manager",
    title: "Using Technology to Improve Public Safety",
    summary:
      "At Jigsaw I rebuilt the design team from scratch and redirected its mission around user-centered design. My team developed tools to improve information hygiene, combat misinformation, fight harassment, and end repressive censorship.",
    impact: [
      "Rebuilt design team: recruiting, process, culture, OKRs",
      "Perspective API: ML toxicity detection used by 200+ partners including NYTimes",
      "Co-founded Jigsaw Incubate — company-wide annual hackathon",
      "Grew Outline to give internet access to people under repressive censorship",
      "Developed the Jigsaw Design System",
    ],
    tags: ["Safety Tech", "ML/AI", "Team Building", "Design Systems"],
    featuredImage: "/assets/represive%20censorship.png",
    gallery: [
      "/assets/fighting%20disinfo.png",
      "/assets/fightinharassment.png",
      "/assets/disinfohighleverage.gif",
    ],
  },
  {
    index: "03",
    company: "Google Shopping",
    role: "Design Lead",
    title: "Beyond the Prompt — The Implicit AI Interface",
    summary:
      "In 2-3 years predictive, agentic, and generative UIs will replace conversational interfaces for most tasks. I led the strategic vision and design explorations that are defining what that near-term future looks like for commerce.",
    impact: [
      "Agentic Commerce: Universal Commerce Protocol — buy in Gemini/AI Mode end-to-end",
      "Implicit Shopping: predictive journeys, bespoke generated UI responses",
      "Shopping AI Pathways — novel UX pattern for visual LLM-powered browsing (Patent Pending)",
      "Outfit Agent — generative catalog mailer curated by a shopping agent (Patent)",
      "Founded CSUX Vibe Coding Club — 20+ participants, weekly challenges",
    ],
    tags: ["Agentic AI", "Vision", "Patents", "Generative UI"],
    featuredImage: "/assets/beyondtheprompt.png",
    gallery: [
      "/assets/agenticcommerce.gif",
      "/assets/shoppingaipathways.gif",
      "/assets/outfitagent.gif",
      "/assets/implicit%20shopping.png",
    ],
  },
  {
    index: "04",
    company: "Google Classroom",
    role: "Design Lead & Design Manager",
    title: "Redefining the Future of Education",
    summary:
      "As classrooms went digital, teachers needed more robust tools for planning, grading, and assignment distribution. My team rebuilt Google Classroom to meet those needs and doubled the user base.",
    impact: [
      "Doubled Classroom from 20M to 40M users",
      "Led Classroom redesign across web and mobile (Material 2.0)",
      "Strategic pivot to Higher Ed resulting in Course Kit (new product)",
      "Managed team of 6 through numerous feature and product releases",
    ],
    tags: ["Education Tech", "Product Strategy", "Design Systems"],
    featuredImage: "/assets/eduteamleaderhsip.jpg",
    gallery: ["/assets/eduvision.gif"],
  },
];

function TextPanel({ c }: { c: (typeof cases)[0] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {c.company}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)", letterSpacing: "0.12em" }}>
          {c.index}
        </span>
      </div>
      <h3 style={{ fontFamily: "var(--font-space)", fontWeight: 800, fontSize: "clamp(32px, 4.5vw, 64px)", letterSpacing: "-0.03em", lineHeight: 1.02, color: "var(--text)", marginBottom: 16 }}>
        {c.title}
      </h3>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28 }}>
        {c.role}
      </p>
      <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 18px)", lineHeight: 1.75, fontWeight: 400, marginBottom: 32 }}>
        {c.summary}
      </p>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
        {c.impact.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ color: "var(--accent)", flexShrink: 0, fontSize: 14, marginTop: 1, fontWeight: 700 }}>→</span>
            <span style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>{item}</span>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {c.tags.map((tag) => (
          <span key={tag} style={{ padding: "5px 12px", borderRadius: 100, border: "1px solid var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ImagePanel({ c }: { c: (typeof cases)[0] }) {
  const gallery = c.gallery.slice(0, 4);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 8, overflow: "hidden", background: "var(--surface-2)" }}>
        <img src={c.featuredImage} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      {gallery.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
          {gallery.map((src, i) => (
            <div key={i} style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 6, overflow: "hidden", background: "var(--surface-2)" }}>
              <img src={src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CaseStudy({ c, index }: { c: (typeof cases)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const textLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(48px)",
        transition: `opacity 0.9s ease ${index * 0.08}s, transform 0.9s ease ${index * 0.08}s`,
        paddingTop: 100,
        paddingBottom: 80,
        borderTop: "1px solid var(--border)",
        display: "grid",
        gridTemplateColumns: textLeft ? "45fr 55fr" : "55fr 45fr",
        gap: "clamp(40px, 6vw, 96px)",
        alignItems: "center",
      }}
    >
      {textLeft ? (
        <><TextPanel c={c} /><ImagePanel c={c} /></>
      ) : (
        <><ImagePanel c={c} /><TextPanel c={c} /></>
      )}
    </div>
  );
}

export default function Transformations() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="transformations" style={{ padding: "120px clamp(24px, 6vw, 120px) 80px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div ref={headerRef} style={{ marginBottom: 0, opacity: headerVisible ? 1 : 0, transform: headerVisible ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Case Studies</p>
          <h2 style={{ fontFamily: "var(--font-space)", fontWeight: 800, fontSize: "clamp(40px, 7vw, 96px)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--text)" }}>
            Amazing teams.<br />Real impact.
          </h2>
        </div>
        {cases.map((c, i) => <CaseStudy key={c.index} c={c} index={i} />)}
      </div>
    </section>
  );
}
