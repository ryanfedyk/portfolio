"use client";

import { useEffect, useRef, useState } from "react";

interface Philosophy {
  n: string;
  h: string;
  hIt: string | null;
  p: string;
}

interface CaseLink {
  label: string;
  url: string;
}

interface CaseLaunch {
  year: string;
  name: string;
  desc: string;
  image: string;
  video?: string;
  links?: CaseLink[];
  patent?: "Patented" | "Patent Pending";
}

interface CaseStudy {
  n: string;
  yearRange: string;
  company: string;
  title: string;
  titleIt: string;
  narrative: string;
  heroProject: CaseLaunch;
  tags: string[];
  launches: CaseLaunch[];
  role?: string;
  teamSize?: number;
  patentCount?: number;
}

const COMPANIES = [
  {
    co: "Google",
    products: [
      { name: "Docs",      logo: "/assets/logos/docs.svg",           role: "Sr. Principal Design Lead",  desc: "Redefining documents as intelligent, agent-forward workspaces." },
      { name: "Meet",      logo: "/assets/logos/meet.svg",           role: "Sr. Principal Design Lead",  desc: "Brought hybrid work to 3B+ users, then made AI the differentiator." },
      { name: "Gemini",    logo: "/assets/logos/gemini.svg",         role: "Sr. Principal Designer",     desc: "End-to-end shopping journeys powered by conversational AI." },
      { name: "Shopping",  logo: "/assets/logos/shopping.svg",       role: "Sr. Principal Designer",     desc: "Agentic, implicit commerce that anticipates before you ask." },
      { name: "Classroom", logo: "/assets/logos/classroom.svg",      role: "UX Design Lead",             desc: "Ground-up redesign serving 50M+ teachers and students worldwide." },
      { name: "Search",    logo: "/assets/logos/Google Search.svg",  role: "Sr. Principal Designer",     desc: "AI Shopping Agents embedded directly into AI Mode." },
      { name: "Glass",     logo: "/assets/logos/Glass.svg",          role: "Sr. Principal Designer",     desc: "Voice-first interaction design for wearable hardware." },
    ],
  },
  {
    co: "Jigsaw",
    products: [
      { name: "Perspective API", logo: "/assets/logos/perspective.svg",   role: "Design Lead",  desc: "ML toxicity detection deployed across 200+ media partners." },
      { name: "Outline VPN",     logo: "/assets/logos/outline.svg",        role: "Design Lead",  desc: "Open-source VPN for journalists in 30+ censored countries." },
      { name: "Anti-Harassment", logo: "/assets/logos/antiharassment.svg", role: "Design Lead",  desc: "UX systems built to protect at-risk communities by design." },
    ],
  },
  {
    co: "Microsoft",
    products: [
      { name: "Xbox Kinect",   logo: "/assets/logos/xbox.svg",          role: "Senior Designer",  desc: "Motion and gesture UX for a new era of living room gaming." },
      { name: "Windows Phone", logo: "/assets/logos/windows phone.svg",  role: "Senior Designer",  desc: "Core interaction design for Windows Phone 7." },
      { name: "Bing Maps",     logo: "/assets/logos/bing.svg",           role: "Senior Designer",  desc: "Mapping and local search at Microsoft scale." },
      { name: "Photosynth",    logo: "/assets/logos/photosynth.svg",     role: "Senior Designer",  desc: "3D scene reconstruction and panoramic stitching from photos." },
    ],
  },
];

const PHILOSOPHY: Philosophy[] = [
  {
    n: "01",
    h: "Design for the 126th visit",
    hIt: "126th",
    p: "Anyone can make a delightful first impression. The hard part (and the interesting part) is what keeps someone coming back when the novelty is gone.",
  },
  {
    n: "02",
    h: "Make AI feel human",
    hIt: "human",
    p: "Useful intelligence is quiet. It earns trust by being legible, controllable, and humble, never by performing its own cleverness at the user.",
  },
  {
    n: "03",
    h: "Strategic tinkering",
    hIt: "tinkering",
    p: "I prototype before I propose, run small experiments to pressure-test assumptions, and stay close to the craft even as teams scale. Paired with a clear strategic vision, it creates teams that don't just execute. They invent.",
  },
];

const CASES: CaseStudy[] = [
  {
    n: "01",
    yearRange: "2026–Present",
    company: "Google Docs",
    title: "Launching the",
    titleIt: "Future of Documents",
    narrative:
      "As AI reshapes every productivity surface, I led the design vision for Google Docs' next generation, helping define what documents look like when they become intelligent, real-time, and deeply collaborative at scale.",
    heroProject: {
      year: "2026",
      name: "Docs Live",
      desc: "A real-time, AI-native document experience that transforms static pages into living, collaborative workspaces, announced at Google I/O 2025.",
      image: "/assets/docslive.gif",
      video: "/assets/docslive_announcement.mp4",
      links: [
        {
          label: "Blog Announcement",
          url: "https://blog.google/products-and-platforms/products/workspace/workspace-updates/",
        },
        {
          label: "Watch Announcement",
          url: "https://www.youtube.com/live/wYSncx9zLIU?si=smd5fX8PDfJvcfsK&t=541",
        },
      ],
    },
    role: "Sr. Principal Design Manager",
    teamSize: 8,
    patentCount: 2,
    tags: ["AI", "Documents", "Product Vision", "Design Leadership"],
    launches: [
      {
        year: "2026",
        name: "Future of Docs",
        desc: "A long-range product vision redefining how AI transforms collaborative documents, moving from static canvases to dynamic, intelligent workspaces that understand context and intent.",
        image: "/assets/fod.gif",
        patent: "Patented",
      },
      {
        year: "2026",
        name: "Help Me Create",
        desc: "AI that takes you from blank page to brilliance, generating structured, contextually-aware content inside Docs using Gemini.",
        image: "/assets/helpmecreate.gif",
        links: [
          {
            label: "Workspace Updates",
            url: "https://workspaceupdates.googleblog.com/2026/04/new-gemini-capabilities-in-google-docs-help-you-go-from-blank-page-to-brilliance.html",
          },
        ],
      },
    ],
  },
  {
    n: "02",
    yearRange: "2021–2025",
    company: "Google Meet",
    title: "Feature Chasing",
    titleIt: "→ AI-Focused Differentiators",
    narrative:
      "After establishing hybrid work as the future of meetings, I pivoted the broader Meet team toward longer-term vision and AI-powered product differentiators, building features that would set Meet apart across a user base of 3B+.",
    heroProject: {
      year: "2025",
      name: "Real-time Translation",
      desc: "Embedded AI that transcribes, translates, and surfaces meeting insights across 60+ languages in real time.",
      image: "/assets/realtimespeech%20translation.gif",
      video: "/assets/utdemo_small.mp4",
      patent: "Patented",
      links: [
        {
          label: "Google Blog",
          url: "https://blog.google/products-and-platforms/products/workspace/google-meet-langauge-translation-ai/",
        },
        {
          label: "TechCrunch",
          url: "https://techcrunch.com/2025/05/20/google-meet-is-getting-real-time-speech-translation/",
        },
      ],
    },
    role: "Sr. Principal Design Manager",
    teamSize: 12,
    patentCount: 20,
    tags: ["AI", "Generative UX", "Design Leadership", "Patents"],
    launches: [
      {
        year: "2023",
        name: "Generative Backgrounds",
        desc: "Personalized AI-generated backgrounds that adapt to meeting context and let personality show through.",
        image: "/assets/generativebackgrounds.gif",
        patent: "Patented",
        links: [
          {
            label: "The Verge",
            url: "https://www.theverge.com/2023/7/18/23799459/google-meet-ai-generated-videoconferencing-background-image",
          },
          {
            label: "Announcement",
            url: "https://youtu.be/uIIhjKCe0Ao?si=ppHlg1kHI1R2T1Nc&t=483",
          },
        ],
      },
      {
        year: "2023",
        name: "Face Match",
        desc: "AI that identifies and matches participants across meeting tiles, ensuring every face is represented equitably regardless of camera or environment.",
        image: "/assets/biometric%20room%20checkin.gif",
        links: [
          {
            label: "Announcement",
            url: "https://youtu.be/uIIhjKCe0Ao?si=f7-Xh8Yzj4yOJIUI&t=563",
          },
        ],
      },
      {
        year: "2025",
        name: "Studio Makeup",
        desc: "AI-powered studio lighting and beauty effects that help users look their best on camera, automatically enhancing presence in any lighting environment.",
        image: "/assets/studiomakeup.png",
        links: [
          {
            label: "Workspace Updates",
            url: "https://workspaceupdates.googleblog.com/2025/10/ai-powered-makeup-in-google-meet.html",
          },
        ],
      },
      {
        year: "2024",
        name: "Stackable Effects",
        desc: "Combine multiple video effects simultaneously: filters, backgrounds, lighting adjustments, and more, layered in real time for a fully personalised camera presence.",
        image: "/assets/stackableeffects.gif",
        links: [
          {
            label: "Workspace Updates",
            url: "https://workspaceupdates.googleblog.com/2024/01/google-meet-improved-audio-and-video-combine-multiple-video-effects.html",
          },
        ],
      },
      {
        year: "2025",
        name: "Gemini in Meet",
        desc: "Embedded Gemini intelligence that surfaces insights, action items, and smart summaries throughout the meeting flow.",
        image: "/assets/aienhancedmeetings.gif",
        links: [
          {
            label: "Gemini in Meet",
            url: "https://workspace.google.com/intl/en_us/resources/ai-for-meetings/",
          },
        ],
      },
    ],
  },
  {
    n: "03",
    yearRange: "2017–2020",
    company: "Google Jigsaw",
    title: "Using Technology to",
    titleIt: "Improve Public Safety",
    narrative:
      "At Jigsaw I rebuilt the design team from scratch and redirected its mission around user-centered design. My team developed tools to improve information hygiene, combat misinformation, fight harassment, and end repressive censorship worldwide.",
    heroProject: {
      year: "2018",
      name: "Reducing Police Violence",
      desc: "A VR-based training experience designed to build empathy and de-escalation skills in law enforcement, reducing use-of-force incidents through perspective-taking.",
      image: "/assets/VR_Training.gif",
      links: [
        {
          label: "Case Study",
          url: "https://www.alistairrobertson.com/home/project-one-589g2",
        },
        {
          label: "Medium",
          url: "https://medium.com/@JigsawTeam/adaptive-technology-to-help-advance-public-safety-b4256388dd3",
        },
      ],
    },
    tags: ["Safety Tech", "ML/AI", "Team Building", "Design Systems"],
    launches: [
      {
        year: "2018",
        name: "Countering Disinformation",
        desc: "High-leverage strategies and tools to combat coordinated disinformation campaigns, working with media partners and platforms at scale.",
        image: "/assets/disinfohighleverage.gif",
        links: [
          {
            label: "NY Times",
            url: "https://www.nytimes.com/2020/02/04/technology/jigsaw-doctored-images-disinformation.html",
          },
        ],
      },
      {
        year: "2018",
        name: "Outline VPN",
        desc: "Open-source VPN helping journalists and activists bypass government censorship in 30+ countries.",
        image: "/assets/represive%20censorship.png",
        links: [
          {
            label: "getoutline.org",
            url: "http://getoutline.org",
          },
        ],
      },
      {
        year: "2018",
        name: "Anti-Harassment Tools",
        desc: "ML toxicity-detection tool deployed with 200+ media partners, and UX systems designed to protect at-risk communities, making online spaces safer by design.",
        image: "/assets/fightinharassment.png",
        links: [
          {
            label: "perspectiveapi.com",
            url: "http://perspectiveapi.com/",
          },
        ],
      },
      {
        year: "2018",
        name: "Reducing Toxic Language Online",
        desc: "Real-time toxicity scoring that helps publishers, platforms, and moderators identify and reduce harmful language at scale, powering safer communities across the web.",
        image: "/assets/perspective.gif",
        links: [
          {
            label: "Google Blog",
            url: "https://blog.google/innovation-and-ai/products/new-york-times-using-ai-host-better-conversations/",
          },
        ],
      },
    ],
  },
  {
    n: "04",
    yearRange: "2025–2026",
    company: "Google Shopping",
    title: "Beyond the Prompt:",
    titleIt: "The Implicit AI Interface",
    narrative:
      "In 2–3 years predictive, agentic, and generative UIs will replace conversational interfaces for most everyday tasks. I led the strategic vision and design explorations that are defining what that near-term future looks like for commerce.",
    heroProject: {
      year: "2025",
      name: "Universal Cart & Universal Context Protocol",
      desc: "Reimagined Google's e-commerce journey by replacing separate merchant checkouts with a unified, single-basket stream. The feature allows users to buy from multiple brands instantly in one shot, drastically reducing abandoned carts and transforming how people shop across the platform.",
      image: "/assets/universal cart.png",
      links: [
        {
          label: "Google Blog",
          url: "https://blog.google/products-and-platforms/products/shopping/google-shopping-cart/",
        },
        {
          label: "Watch Announcement",
          url: "https://www.youtube.com/live/wYSncx9zLIU?si=FLm96VOQhEnIaMHJ&t=3523",
        },
      ],
    },
    role: "Sr. Principal Designer",
    patentCount: 3,
    tags: ["Agentic AI", "Vision", "Patents", "Generative UI"],
    launches: [
      {
        year: "2025",
        name: "Agentic Commerce",
        desc: "Next-generation shopping where AI anticipates needs and completes the purchase journey autonomously.",
        image: "/assets/agenticshopping.png",
      },
      {
        year: "2025",
        name: "Implicit Interfaces",
        desc: "A strategic framework for the next frontier in UX, where interfaces anticipate needs and act on them before users have to ask.",
        image: "/assets/implicit shopping.png",
      },
      {
        year: "2025",
        name: "Shopping AI Pathways",
        desc: "Novel UX bringing LLM power to the product grid, letting users browse visually while naturally refining their search.",
        image: "/assets/shoppingaipathways.gif",
        patent: "Patent Pending",
      },
      {
        year: "2025",
        name: "Outfit Agent",
        desc: "A modern take on the catalog mailer, curated by a shopping agent using contextual, generative media.",
        image: "/assets/outfitagent.gif",
        patent: "Patented",
      },
    ],
  },
  {
    n: "05",
    yearRange: "2016–2019",
    company: "Google Classroom",
    title: "Redefining the",
    titleIt: "Future of Education",
    narrative:
      "As classrooms went digital, teachers needed more robust tools for planning, grading, and assignment distribution. My team rebuilt Google Classroom to meet those needs, doubling the user base and setting a new bar for ed-tech UX.",
    heroProject: {
      year: "2018",
      name: "Google Classroom Vision",
      desc: "A long-range product vision for Classroom, reimagining how digital tools support the full spectrum of teaching and learning at scale.",
      image: "/assets/eduvision.gif",
      video: "/assets/eduvision_small.mp4",
    },
    role: "Design Lead / Manager",
    teamSize: 8,
    tags: ["Education Tech", "Product Strategy", "Design Systems"],
    launches: [
      {
        year: "2019",
        name: "Rearchitecting Classroom",
        desc: "Complete ground-up redesign that improved core workflows for 50M+ teachers and students worldwide.",
        image: "/assets/Google Classroom Redesign.webp",
        links: [
          {
            label: "Google Blog",
            url: "https://blog.google/outreach-initiatives/education/new-year-new-classroom/",
          },
        ],
      },
      {
        year: "2019",
        name: "Course Kit",
        desc: "LMS integration tools connecting Classroom to university platforms, expanding reach across higher education.",
        image: "/assets/coursekit.png",
        links: [
          {
            label: "Google Blog",
            url: "https://blog.google/products-and-platforms/products/education/introducing-course-kit-new-ways-collaborate-g-suite-your-lms-designed-higher-ed/",
          },
        ],
      },
    ],
  },
  {
    n: "06",
    yearRange: "2021–2025",
    company: "Google Meet",
    title: "Bringing the Workforce",
    titleIt: "Back to the Office",
    narrative:
      "During the pandemic video conferencing evolved dramatically but no one knew how to bring that back into the office. My team delivered the promise of hybrid work to Meet's 242 million users and established hybrid as the future of work.",
    heroProject: {
      year: "2022",
      name: "Adaptive Audio",
      desc: "A breakthrough in multi-device meeting audio, letting multiple laptops in the same room join a call without echo or feedback, enabling spontaneous hybrid collaboration.",
      image: "/assets/audiomesh.gif",
      links: [
        {
          label: "Google Blog",
          url: "https://blog.google/products-and-platforms/products/workspace/adaptive-audio-google-meet/",
        },
      ],
    },
    role: "Sr. Principal Design Manager",
    teamSize: 12,
    patentCount: 20,
    tags: ["Hybrid Work", "Devices", "Design Leadership", "Team Building"],
    launches: [
      {
        year: "2022",
        name: "Dynamic Layouts",
        desc: "Rebuilt Meet's base grid to be more people-focused and equitable for hybrid rooms, reducing video-conferencing fatigue.",
        image: "/assets/dynamiclayouts.gif",
        patent: "Patented",
        links: [
          {
            label: "Video Overview",
            url: "https://www.youtube.com/watch?v=4lXwF95jY2I",
          },
        ],
      },
      {
        year: "2022",
        name: "Freeze & Enhance Backgrounds",
        desc: "AI-powered framing creating consistent face sizes with natural cropping for a more human meeting experience.",
        image: "/assets/portraitframing.gif",
        patent: "Patented",
      },
      {
        year: "2022",
        name: "Gamified Reactions",
        desc: "Expressive in-meeting reactions that bring energy and non-verbal communication back to hybrid and remote meetings.",
        image: "/assets/reactions.gif",
        patent: "Patented",
        links: [
          {
            label: "Google Blog",
            url: "https://blog.google/products/workspace/we-heart-behind-meeting-emoji-meet/",
          },
          {
            label: "The Verge",
            url: "https://www.theverge.com/2023/1/11/23550717/google-meet-emoji-launch",
          },
        ],
      },
      {
        year: "2022",
        name: "Pop-up Rooms",
        desc: "A hybrid meeting powered by a spatial arrangement of personal devices that creates a single, more natural meeting experience.",
        image: "/assets/roomsvisoin.gif",
        patent: "Patented",
      },
      {
        year: "2022",
        name: "Vibe Check",
        desc: "Using AI to detect non-verbal cues and amplify the colors and visual treatment in each participant's tile, making emotional presence visible in hybrid meetings.",
        image: "/assets/vibecheck.gif",
        patent: "Patent Pending",
      },
      {
        year: "2022",
        name: "Board 65 & Series One 27",
        desc: "Launched 2 new collaboration devices with 89% CSAT, bringing Meet's hardware portfolio back online for the hybrid era.",
        image: "/assets/meetdevices.gif",
        links: [
          {
            label: "Board 65",
            url: "https://www.avocor.com/products/google-series-one-board-65/",
          },
          {
            label: "Series One 27",
            url: "https://www.avocor.com/products/google-series-one-desk-27/",
          },
          {
            label: "Watch Video",
            url: "https://www.youtube.com/watch?v=PJmJLAWphB0",
          },
        ],
      },
      {
        year: "2025",
        name: "Touch Controller Redesign",
        desc: "A refreshed UI for Google Meet hardware touch controllers, bringing a cleaner, more intuitive room control experience to hybrid meeting spaces.",
        image: "/assets/Google_Series_One_Touch_Controller_Editorial_2.gif",
        links: [
          {
            label: "Workspace Updates",
            url: "https://workspaceupdates.googleblog.com/2025/08/early-preview-rooms-refreshed-ui-google-meet-hardware-touch-controllers_0734236953.html",
          },
        ],
      },
    ],
  },
];

function renderPhilHeading(h: string, hIt: string | null) {
  if (!hIt) return h;
  const idx = h.indexOf(hIt);
  if (idx === -1) return h;
  return (
    <>
      {h.slice(0, idx)}
      <span className="it">{hIt}</span>
      {h.slice(idx + hIt.length)}
    </>
  );
}

type Product = { co: string; name: string; logo: string; role: string; desc: string };

const ALL_PRODUCTS: Product[] = COMPANIES.flatMap(({ co, products }) =>
  products.map((p) => ({ co, ...p }))
);

export default function Transformations() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [autoIdx, setAutoIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hovered, setHovered] = useState<Product | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const prevKeyRef = useRef<string>("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = isHovering ? hovered : ALL_PRODUCTS[autoIdx];

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
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Ambient auto-cycle; pause while user is hovering
  useEffect(() => {
    if (isHovering) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setAutoIdx((i) => (i + 1) % ALL_PRODUCTS.length);
    }, 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  // Bump animKey whenever the displayed product changes so animations replay
  useEffect(() => {
    const key = active ? `${active.co}:${active.name}` : "";
    if (key && key !== prevKeyRef.current) {
      prevKeyRef.current = key;
      setAnimKey((k) => k + 1);
    }
  }, [active]);

  return (
    <div ref={rootRef}>
      <section id="about">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 className="sec-title">
              About the <span className="it">work</span>
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-block lead rv">
              <p>
                I work with companies that build the future with{" "}
                <span className="ac">creativity, care, and purpose</span>. Right
                now, I&apos;ve found that spark at Google, where I&apos;m
                rethinking what hybrid productivity and AI-powered documents can
                look like at scale.
              </p>
            </div>
          </div>

          <div className="co-showcase-wrap rv">
            <div className="co-left">
              {(() => {
                let chipIdx = 0;
                return (
                  <div className="co-companies">
                    {COMPANIES.map(({ co, products }) => (
                      <div key={co} className="co-row">
                        <span className="co-label">{co}</span>
                        <div className="co-chips">
                          {products.map(({ name, logo, role, desc }) => {
                            const i = chipIdx++;
                            const isActive = active?.co === co && active?.name === name;
                            return (
                              <div
                                key={name}
                                className={`co-chip${isActive ? " co-chip--active" : ""}`}
                                style={{ "--i": i } as React.CSSProperties}
                                onMouseEnter={() => {
                                  setIsHovering(true);
                                  setHovered({ co, name, logo, role, desc });
                                }}
                                onMouseLeave={() => {
                                  setIsHovering(false);
                                  setHovered(null);
                                }}
                              >
                                {name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div className="co-right">
              {active && (
                <div className="co-panel" key={animKey}>
                  <div className="co-panel-top">
                    <div className="co-panel-logo-wrap">
                      <img className="co-panel-logo" src={active.logo} alt={active.name} />
                    </div>
                    <div className="co-panel-header">
                      <div className="co-panel-meta">
                        <span className="co-panel-co">{active.co}</span>
                        <span className="co-panel-sep">·</span>
                        <span className="co-panel-name">{active.name}</span>
                      </div>
                      <div className="co-panel-role">{active.role}</div>
                    </div>
                  </div>
                  <p className="co-panel-desc">{active.desc}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="process">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 className="sec-title">
              Three things <span className="it">important to me</span>
            </h2>
          </div>

          <div className="phil rv">
            {PHILOSOPHY.map((p) => (
              <div key={p.n} className="phil-cell">
                <div className="phil-num">{p.n}</div>
                <h3 className="phil-h">{renderPhilHeading(p.h, p.hIt)}</h3>
                <p className="phil-p">{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 className="sec-title">
              Work I&apos;m proud of,<br />with <span className="it">people I&apos;m grateful for</span>
            </h2>
          </div>

          <div className="cases">
            {CASES.map((c) => (
              <div key={c.n} className="case rv">
                <div className="case-meta">
                  <span className="case-num">{c.n}</span>
                  <span className="case-year">{c.yearRange}</span>
                  {(c.role || c.teamSize || c.patentCount) && (
                    <div className="case-vitals">
                      {c.role && <span className="case-vital-role">{c.role}</span>}
                      {c.teamSize && (
                        <div className="case-vital">
                          <span className="case-vital-lbl">Reports</span>
                          <span className="case-vital-val">{c.teamSize}</span>
                        </div>
                      )}
                      {c.patentCount && (
                        <div className="case-vital">
                          <span className="case-vital-lbl">Patents</span>
                          <span className="case-vital-val">{c.patentCount}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="case-tags">
                    {c.tags.map((t) => (
                      <span key={t} className="case-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="case-header">
                  <div className="case-co">{c.company}</div>
                  <h3 className="case-title">
                    {c.title} <span className="it">{c.titleIt}</span>
                  </h3>
                </div>

                <div className="case-body">
                  <p className="case-narrative">{c.narrative}</p>

                  <div className="cs-hero-proj">
                    {c.heroProject.video ? (
                      <video
                        className="cs-hero-proj-media"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={c.heroProject.image}
                      >
                        <source src={c.heroProject.video} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        className="cs-hero-proj-media"
                        src={c.heroProject.image}
                        alt={c.heroProject.name}
                      />
                    )}
                    <div className="cs-hero-proj-scrim" aria-hidden="true" />
                    <div className="cs-hero-proj-foot">
                      <span className="cs-hero-proj-yr">
                        {c.heroProject.year}
                        {c.heroProject.patent && (
                          <span className="cs-inline-patent">{c.heroProject.patent}</span>
                        )}
                      </span>
                      <div className="cs-hero-proj-name">{c.heroProject.name}</div>
                      <p className="cs-hero-proj-desc">{c.heroProject.desc}</p>
                      {c.heroProject.links && c.heroProject.links.length > 0 && (
                        <div className="cs-hero-proj-links">
                          {c.heroProject.links.map((l, i) => (
                            <a
                              key={i}
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cs-hero-proj-link"
                            >
                              {l.label}
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="cs-launches">
                    {c.launches.map((l, i) => (
                      <div key={i} className="cs-launch">
                        <div className="cs-launch-img">
                          <img src={l.image} alt={l.name} />
                        </div>
                        <div className="cs-launch-foot">
                          <div className="cs-launch-yr">
                            {l.year}
                            {l.patent && (
                              <span className="cs-inline-patent">{l.patent}</span>
                            )}
                          </div>
                          <div className="cs-launch-name">{l.name}</div>
                          <p className="cs-launch-desc">{l.desc}</p>
                          {l.links && l.links.length > 0 && (
                            <div className="cs-hero-proj-links">
                              {l.links.map((link, li) => (
                                <a
                                  key={li}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="cs-hero-proj-link"
                                >
                                  {link.label}
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
