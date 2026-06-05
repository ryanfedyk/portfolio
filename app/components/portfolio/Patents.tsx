"use client";

import { useEffect, useRef, useState } from "react";

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
  url: string;
}

interface ResumeEra {
  yr: string;
  team: string;
  role: string;
  desc: string;
}

interface ResumeCompany {
  co: string;
  yr: string;
  loc: string;
  eras: ResumeEra[];
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
  // ── 2026 ──────────────────────────────────────────────────────────────────
  {
    yr: "2026",
    title: "Docs Live",
    titleIt: null,
    co: "Google · Docs",
    role: "Design Lead",
    url: "https://workspace.googleblog.com/2026/05/new-ways-to-create-and-get-things-done-in-google-workspace.html",
  },
  {
    yr: "2026",
    title: "Generative Docs",
    titleIt: null,
    co: "Google · Docs",
    role: "Design Lead",
    url: "https://workspace.googleblog.com/2026/03/google-shares-gemini-updates-to-docs-sheets-slides-drive.html",
  },
  {
    yr: "2026",
    title: "Universal Cart",
    titleIt: null,
    co: "Google · Gemini",
    role: "Design Lead",
    url: "https://blog.google/products-and-platforms/products/shopping/google-shopping-cart/",
  },
  {
    yr: "2026",
    title: "Universal Commerce Protocol",
    titleIt: null,
    co: "Google · Gemini",
    role: "Design Lead",
    url: "https://blog.google/technology/developers/google-universal-commerce-protocol/",
  },
  // ── 2025 ──────────────────────────────────────────────────────────────────
  {
    yr: "2025",
    title: "Real-time Speech Translation",
    titleIt: null,
    co: "Google · Meet",
    role: "Design Lead",
    url: "https://techcrunch.com/2025/05/20/google-meet-is-getting-real-time-speech-translation/",
  },
  {
    yr: "2025",
    title: "Studio Makeup",
    titleIt: null,
    co: "Google · Meet",
    role: "Design Lead",
    url: "https://workspaceupdates.googleblog.com/2025/10/ai-powered-makeup-in-google-meet.html",
  },
  {
    yr: "2025",
    title: "Dynamic Layouts",
    titleIt: null,
    co: "Google · Meet",
    role: "Design Lead",
    url: "https://workspaceupdates.googleblog.com/2025/03/dynamic-layouts-google-meet.html",
  },
  {
    yr: "2025",
    title: "Face Match",
    titleIt: null,
    co: "Google · Meet",
    role: "Design Lead",
    url: "https://workspaceupdates.googleblog.com/2025/03/dynamic-layouts-google-meet.html",
  },
  {
    yr: "2025",
    title: "Connect Room",
    titleIt: null,
    co: "Google · Meet",
    role: "Design Lead",
    url: "https://workspaceupdates.googleblog.com/2025/12/connect-room-google-meet-hardware.html",
  },
  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    yr: "2024",
    title: "Generative Backgrounds",
    titleIt: null,
    co: "Google · Meet",
    role: "Design Lead",
    url: "https://workspaceupdates.googleblog.com/2024/06/generative-backgrounds-google-meet.html",
  },
  {
    yr: "2024",
    title: "Stackable Effects",
    titleIt: null,
    co: "Google · Meet",
    role: "Design Lead",
    url: "https://workspaceupdates.googleblog.com/2024/08/video-effects-google-meet.html",
  },
  {
    yr: "2024",
    title: "AI Notetaking",
    titleIt: null,
    co: "Google · Meet",
    role: "Design Lead",
    url: "https://workspaceupdates.googleblog.com/2024/08/take-notes-for-me-google-meet.html",
  },
  {
    yr: "2024",
    title: "Adaptive Audio",
    titleIt: null,
    co: "Google · Meet",
    role: "Design Lead",
    url: "https://workspaceupdates.googleblog.com/2024/05/adaptive-audio-google-meet.html",
  },
  // ── 2022 ──────────────────────────────────────────────────────────────────
  {
    yr: "2022",
    title: "Gamified Reactions",
    titleIt: null,
    co: "Google · Meet",
    role: "Design Lead",
    url: "https://blog.google/products/workspace/we-heart-behind-meeting-emoji-meet/",
  },
  // ── 2021 ──────────────────────────────────────────────────────────────────
  {
    yr: "2021",
    title: "Board 65",
    titleIt: "Collaboration Device",
    co: "Google · Meet",
    role: "Design Lead",
    url: "https://www.avocor.com/products/google-series-one-board-65/",
  },
  // ── 2019 ──────────────────────────────────────────────────────────────────
  {
    yr: "2019",
    title: "Classroom",
    titleIt: "Redesign",
    co: "Google · Education",
    role: "Design Lead",
    url: "https://blog.google/outreach-initiatives/education/new-year-new-classroom/",
  },
  // ── 2018 ──────────────────────────────────────────────────────────────────
  {
    yr: "2018",
    title: "Course Kit",
    titleIt: null,
    co: "Google · Education",
    role: "Design Lead",
    url: "https://workspaceupdates.googleblog.com/2018/07/introducing-course-kit-beta.html",
  },
  {
    yr: "2018",
    title: "Outline VPN",
    titleIt: null,
    co: "Jigsaw",
    role: "Design Lead",
    url: "https://jigsaw.google.com/the-current/outlineVPN/",
  },
  // ── 2017 ──────────────────────────────────────────────────────────────────
  {
    yr: "2017",
    title: "Perspective API",
    titleIt: null,
    co: "Jigsaw",
    role: "Design Lead",
    url: "https://medium.com/jigsaw/toxicity-tone-not-the-same-thing-analyzing-the-new-google-api-on-toxicity-fd3e94685b22",
  },
  // ── 2013 ──────────────────────────────────────────────────────────────────
  {
    yr: "2013",
    title: "Photosynth V2",
    titleIt: null,
    co: "Microsoft",
    role: "Designer",
    url: "https://www.dpreview.com/articles/5688888145/photosynth-can-now-create-interactive-3d-scenes",
  },
  // ── 2012 ──────────────────────────────────────────────────────────────────
  {
    yr: "2012",
    title: "Microsoft Surface V1",
    titleIt: null,
    co: "Microsoft",
    role: "Designer",
    url: "https://en.wikipedia.org/wiki/Microsoft_Surface",
  },
  // ── 2010 ──────────────────────────────────────────────────────────────────
  {
    yr: "2010",
    title: "Xbox Kinect",
    titleIt: null,
    co: "Microsoft",
    role: "Designer",
    url: "https://en.wikipedia.org/wiki/Kinect",
  },
  {
    yr: "2010",
    title: "Windows Phone 7",
    titleIt: null,
    co: "Microsoft",
    role: "Designer",
    url: "https://en.wikipedia.org/wiki/Windows_Phone_7",
  },
];

const INITIAL_VISIBLE = 10;

const RESUME: ResumeCompany[] = [
  {
    co: "Google",
    yr: "2013 — Present",
    loc: "New York",
    eras: [
      {
        yr: "2026 — Present",
        team: "Docs",
        role: "Sr. Principal Design Lead",
        desc: "Leading the design vision for Google Docs' next generation — redefining what documents look like when they're intelligent, real-time, and deeply collaborative at scale.",
      },
      {
        yr: "2025 — 2026",
        team: "Shopping & Gemini",
        role: "Sr. Principal Designer",
        desc: "Defining the next frontier of agentic commerce — from implicit shopping interfaces to Universal Cart and conversational checkout used by hundreds of millions.",
      },
      {
        yr: "2021 — 2025",
        team: "Meet",
        role: "Sr. Principal Design Lead",
        desc: "Shipped hybrid work for 3B+ users, then pivoted the team toward AI-powered experiences — real-time speech translation, generative backgrounds, and intelligent notetaking.",
      },
      {
        yr: "2016 — 2019",
        team: "Classroom",
        role: "UX Design Lead",
        desc: "Rebuilt Google Classroom from the ground up for 50M+ teachers and students, doubling the user base and setting a new bar for ed-tech UX.",
      },
      {
        yr: "2017 — 2020",
        team: "Jigsaw",
        role: "Design Lead",
        desc: "Built the design team from scratch and redirected its mission around user-centered design. Created tools to fight censorship, harassment, and disinformation worldwide.",
      },
    ],
  },
  {
    co: "Microsoft",
    yr: "2009 — 2013",
    loc: "Seattle",
    eras: [
      {
        yr: "2010 — 2013",
        team: "Windows & Surface",
        role: "UX Designer",
        desc: "Shipped Windows Phone 7 and Surface V1 — helping define Microsoft's entry into mobile and the tablet era.",
      },
      {
        yr: "2010",
        team: "Xbox & Kinect",
        role: "UX Designer",
        desc: "Designed motion and gesture interaction for Xbox Kinect — one of the fastest-selling consumer electronics devices ever made at launch.",
      },
      {
        yr: "2011 — 2013",
        team: "Bing & Research",
        role: "UX Designer",
        desc: "Mapping, local search, and Photosynth V2 — bringing spatial and contextual intelligence to Bing's product suite.",
      },
    ],
  },
  {
    co: "New York University",
    yr: "2007 — 2009",
    loc: "New York",
    eras: [
      {
        yr: "2007 — 2009",
        team: "ITP Program",
        role: "Design Educator",
        desc: "Taught interaction design and helped build the foundations of human-centered design education at NYU's Tisch School of the Arts.",
      },
    ],
  },
];

function statusClass(status: string): string {
  return status.toLowerCase().includes("pending") ? "pending" : "granted";
}

export default function Patents() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleLaunches = showAll ? LAUNCHES : LAUNCHES.slice(0, INITIAL_VISIBLE);
  const hasMore = !showAll && LAUNCHES.length > INITIAL_VISIBLE;

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
            {visibleLaunches.map((l, i) => (
              <a
                key={`${l.yr}-${i}`}
                className="arch-row"
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="arch-yr">{l.yr}</span>
                <span className="arch-ttl">
                  {l.title}
                  {l.titleIt ? <span className="it"> {l.titleIt}</span> : null}
                </span>
                <span className="arch-co">{l.co}</span>
                <span className="arch-role">{l.role}</span>
                <span className="arch-arr">↗</span>
              </a>
            ))}
          </div>

          {hasMore && (
            <div className="arch-more">
              <button
                className="arch-more-btn"
                onClick={() => setShowAll(true)}
              >
                Load {LAUNCHES.length - INITIAL_VISIBLE} more launches
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="resume">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 className="sec-title">
              Where I&apos;ve <span className="it">been.</span>
            </h2>
          </div>

          <div className="rv">
            {RESUME.map((company) => (
              <div key={company.co} className="res-co-block">
                <div className="res-co-hd">
                  <div className="res-co-name">{company.co}</div>
                  <div className="res-co-meta">
                    <span>{company.yr}</span>
                    <span className="res-co-sep">·</span>
                    <span>{company.loc}</span>
                  </div>
                </div>
                <div className="res-eras">
                  {company.eras.map((era, ei) => (
                    <div key={ei} className="res-era">
                      <span className="res-era-yr">{era.yr}</span>
                      <div>
                        <div className="res-era-team">{era.team}</div>
                        <div className="res-era-role">{era.role}</div>
                      </div>
                      <p className="res-era-desc">{era.desc}</p>
                    </div>
                  ))}
                </div>
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
              Let&apos;s make something <span className="it">useful</span>.
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
