"use client";

import { useEffect, useRef } from "react";

interface Patent {
  id: string;
  title: string;
  product: string;
  status: string;
  desc: string;
  image: string;
}

interface Launch {
  yr: string;
  title: string;
  titleIt: string | null;
  co: string;
  role: string;
}

interface ResumeEntry {
  yr: string;
  role: string;
  roleIt: string;
  co: string;
  desc: string;
  loc: string;
}

const PATENTS: Patent[] = [
  {
    id: "PAT-001",
    title: "Portrait Framing with Background Freeze",
    product: "Google Meet",
    status: "Patented",
    desc: "Larger, more consistent face sizes with natural cropping while maintaining authenticity of natural backgrounds.",
    image: "/assets/portraitframing.gif",
  },
  {
    id: "PAT-002",
    title: "Reinventing the Self View",
    product: "Google Meet",
    status: "Patented",
    desc: "Quick-access self view which reduces distraction and VC fatigue, optimized for intentional moments of self-looking.",
    image: "/assets/screenshare.png",
  },
  {
    id: "PAT-003",
    title: "Dynamic Layouts",
    product: "Google Meet",
    status: "Patented",
    desc: "Rebuild Meet's layout logic to support new hybrid technologies which improve equity and reduce VC fatigue.",
    image: "/assets/dynamiclayouts.gif",
  },
  {
    id: "PAT-004",
    title: "Pop-up Rooms",
    product: "Google Meet",
    status: "Patented",
    desc: "A hybrid meeting powered by a spatial arrangement of personal devices that creates a single, more natural meeting experience.",
    image: "/assets/roomsvisoin.gif",
  },
  {
    id: "PAT-005",
    title: "Vibe Check",
    product: "Google Meet",
    status: "Patent Pending",
    desc: "Using AI to detect non-verbal cues and amplify the colors and visual treatment in each participant's tile.",
    image: "/assets/sonicboom.gif",
  },
  {
    id: "PAT-006",
    title: "Shopping AI Pathways",
    product: "Google Shopping",
    status: "Patent Pending",
    desc: "Novel UX pattern that brings LLM power to the product grid, empowering users to visually browse while refining their search.",
    image: "/assets/shoppingaipathways.gif",
  },
  {
    id: "PAT-007",
    title: "Outfit Agent",
    product: "Google Shopping",
    status: "Patented",
    desc: "A modern take on the catalog mailer curated by a shopping agent to drive re-engagement with contextual, generative media.",
    image: "/assets/outfitagent.gif",
  },
];

const LAUNCHES: Launch[] = [
  { yr: "2025", title: "Real-time Speech Translation", titleIt: null, co: "Google · Meet", role: "Design Lead" },
  { yr: "2023", title: "Generative Backgrounds", titleIt: null, co: "Google · Meet", role: "Design Lead" },
  { yr: "2022", title: "Hybrid Work", titleIt: "/ Return to Office", co: "Google · Meet", role: "Design Lead" },
  { yr: "2022", title: "Board 65", titleIt: "Collaboration Device", co: "Google · Meet", role: "Design Lead" },
  { yr: "2022", title: "Series One 27", titleIt: "Collaboration Device", co: "Google · Meet", role: "Design Lead" },
  { yr: "2019", title: "Classroom", titleIt: "Redesign", co: "Google · Education", role: "Design Lead" },
  { yr: "2018", title: "Perspective API", titleIt: null, co: "Jigsaw · 200+ partners", role: "Design Lead" },
  { yr: "2018", title: "Outline VPN", titleIt: null, co: "Jigsaw · Censorship tool", role: "Design Lead" },
  { yr: "2012", title: "Windows Translator", titleIt: null, co: "Microsoft", role: "Designer" },
  { yr: "2011", title: "Bing Maps", titleIt: null, co: "Microsoft", role: "Designer" },
  { yr: "2010", title: "Xbox Kinect", titleIt: null, co: "Microsoft", role: "Designer" },
  { yr: "2010", title: "Windows Phone 7", titleIt: null, co: "Microsoft", role: "Designer" },
];

const RESUME: ResumeEntry[] = [
  {
    yr: "2013 — Now",
    role: "Design Lead & Manager",
    roleIt: "Google",
    co: "Google — Meet · Jigsaw · Shopping · Classroom",
    desc: "Leading design for AI-forward products across Google. Built and grew multiple UX teams. Championed user-centered design at scale.",
    loc: "San Francisco",
  },
  {
    yr: "2009 — 2013",
    role: "UX Designer",
    roleIt: "Microsoft",
    co: "Microsoft — Windows · Xbox · Bing",
    desc: "Shipped design across Windows Phone 7, Xbox Kinect, Bing Maps, and Windows Translator.",
    loc: "Seattle",
  },
  {
    yr: "2007 — 2009",
    role: "Design Educator",
    roleIt: "NYU",
    co: "New York University",
    desc: "Taught interaction design. Helped build the foundations of human-centered design education at NYU.",
    loc: "New York",
  },
];

function statusClass(status: string): string {
  return status.toLowerCase().includes("pending") ? "pending" : "granted";
}

export default function Patents() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>(".rv"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      <section id="patents">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 className="sec-title">
              IP &amp; <span className="it">Launches.</span>
            </h2>
          </div>

          <div className="pat-grid">
            {PATENTS.map((p) => (
              <div key={p.id} className="pat-card rv">
                <div className="pat-img">
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="pat-body">
                  <span className={"pat-status " + statusClass(p.status)}>
                    {p.status}
                  </span>
                  <p className="pat-product">{p.product}</p>
                  <h4 className="pat-title">{p.title}</h4>
                  <p className="pat-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head rv">
            <h2 className="sec-title">
              Notable <span className="it">Launches.</span>
            </h2>
          </div>

          <div className="arch rv">
            {LAUNCHES.map((l, i) => (
              <div key={`${l.yr}-${i}`} className="arch-row">
                <span className="arch-yr">{l.yr}</span>
                <span className="arch-ttl">
                  {l.title}
                  {l.titleIt ? <span className="it"> {l.titleIt}</span> : null}
                </span>
                <span className="arch-co">{l.co}</span>
                <span className="arch-role">{l.role}</span>
                <span className="arch-arr">↗</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="resume">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 className="sec-title">
              Where I&apos;ve <span className="it">been.</span>
            </h2>
          </div>

          <div className="res rv">
            {RESUME.map((r, i) => (
              <div key={`${r.yr}-${i}`} className="res-row">
                <span className="res-yr">{r.yr}</span>
                <div className="res-body">
                  <h3 className="res-role">
                    {r.role} <span className="it">{r.roleIt}</span>
                  </h3>
                  <div className="res-co">{r.co}</div>
                  <p className="res-desc">{r.desc}</p>
                </div>
                <span className="res-loc">{r.loc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ftr" id="contact">
        <div className="wrap">
          <div className="rv">
            <span className="eyebrow">Get in touch</span>
            <h2 className="ftr-big">
              Let&apos;s make something people actually
              <br />
              <span className="it">want</span>.
            </h2>
          </div>

          <div className="ftr-grid rv rv-d1">
            <div className="ftr-col">
              <h4>Email</h4>
              <a href="mailto:ryanfedyk@gmail.com">ryanfedyk@gmail.com</a>
            </div>
            <div className="ftr-col">
              <h4>Elsewhere</h4>
              <a
                href="https://www.linkedin.com/in/ryanfedyk"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
            <div className="ftr-col">
              <h4>Currently</h4>
              <a href="#about">Design Lead &amp; Manager @ Google</a>
            </div>
          </div>

          <div className="ftr-meta rv rv-d2">
            <span>© 2026 Ryan Fedyk</span>
            <span>Built with intention</span>
          </div>
        </div>
      </section>
    </div>
  );
}
