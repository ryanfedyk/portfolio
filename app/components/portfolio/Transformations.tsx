"use client";

import { useEffect, useRef } from "react";

interface Philosophy {
  n: string;
  h: string;
  hIt: string | null;
  p: string;
}

interface CaseLaunch {
  year: string;
  name: string;
  desc: string;
  image: string;
}

interface CaseStudy {
  n: string;
  yearRange: string;
  company: string;
  title: string;
  titleIt: string;
  narrative: string;
  heroImage: string;
  tags: string[];
  launches: CaseLaunch[];
}

const PHILOSOPHY: Philosophy[] = [
  {
    n: "01",
    h: "Build teams, not deliverables",
    hIt: "teams",
    p: "Great products come from teams that trust each other. I invest in process, mentorship, and the strategic muscle that turns user research into real business outcomes.",
  },
  {
    n: "02",
    h: "Design for the 126th visit",
    hIt: "126th",
    p: "Anyone can make a delightful first impression. The hard part — and the interesting part — is what keeps someone coming back when the novelty is gone.",
  },
  {
    n: "03",
    h: "Make AI feel human",
    hIt: "human",
    p: "Useful intelligence is quiet. It earns trust by being legible, controllable, and humble — never by performing its own cleverness at the user.",
  },
];

const CASES: CaseStudy[] = [
  {
    n: "01",
    yearRange: "2020–2022",
    company: "Google Meet",
    title: "Bringing the Workforce",
    titleIt: "Back to the Office",
    narrative:
      "During the pandemic video conferencing evolved dramatically but no one knew how to bring that back into the office. My team delivered the promise of hybrid work to Meet's 242 million users and established hybrid as the future of work.",
    heroImage: "/assets/biometric%20room%20checkin.gif",
    tags: ["Hybrid Work", "Devices", "Design Leadership", "Team Building"],
    launches: [
      {
        year: "2022",
        name: "Hybrid Work",
        desc: "Led 7 key feature launches to deliver a successful return to office — blending physical rooms and digital presence into one seamless meeting.",
        image: "/assets/audiomesh.gif",
      },
      {
        year: "2022",
        name: "Dynamic Layouts",
        desc: "Rebuilt Meet's base grid to be more people-focused and equitable for hybrid rooms, reducing video-conferencing fatigue.",
        image: "/assets/dynamiclayouts.gif",
      },
      {
        year: "2022",
        name: "Portrait Framing",
        desc: "AI-powered framing creating consistent face sizes with natural cropping for a more human meeting experience. Patented.",
        image: "/assets/portraitframing.gif",
      },
      {
        year: "2022",
        name: "Board 65 & Series One 27",
        desc: "Launched 2 new collaboration devices with 89% CSAT — bringing Meet's hardware portfolio back online for the hybrid era.",
        image: "/assets/meetingslm.png",
      },
    ],
  },
  {
    n: "02",
    yearRange: "2022–Present",
    company: "Google Meet",
    title: "Feature Chasing",
    titleIt: "→ AI-Focused Differentiators",
    narrative:
      "After establishing hybrid work as the future of meetings, I pivoted the broader Meet team toward longer-term vision and AI-powered product differentiators — building features that would set Meet apart across a user base of 3B+.",
    heroImage: "/assets/AIrepresentationinmeet.gif",
    tags: ["AI", "Generative UX", "Design Leadership", "Patents"],
    launches: [
      {
        year: "2023",
        name: "Generative Backgrounds",
        desc: "Personalized AI-generated backgrounds that adapt to meeting context and let personality show through.",
        image: "/assets/generativebackgrounds.gif",
      },
      {
        year: "2023",
        name: "Vibe Check",
        desc: "Using AI to detect non-verbal cues and amplify colors and visual treatment in each participant's tile. Patented.",
        image: "/assets/reactions.gif",
      },
      {
        year: "2025",
        name: "Gemini in Meet",
        desc: "Embedded Gemini intelligence that surfaces insights, action items, and smart summaries throughout the meeting flow.",
        image: "/assets/geminimeetings.gif",
      },
      {
        year: "2025",
        name: "Real-time Translation",
        desc: "Embedded AI that transcribes, translates, and surfaces meeting insights across 60+ languages in real time.",
        image: "/assets/realtimespeech%20translation.gif",
      },
    ],
  },
  {
    n: "03",
    yearRange: "2017–2019",
    company: "Google Jigsaw",
    title: "Using Technology to",
    titleIt: "Improve Public Safety",
    narrative:
      "At Jigsaw I rebuilt the design team from scratch and redirected its mission around user-centered design. My team developed tools to improve information hygiene, combat misinformation, fight harassment, and end repressive censorship worldwide.",
    heroImage: "/assets/disinfohighleverage.gif",
    tags: ["Safety Tech", "ML/AI", "Team Building", "Design Systems"],
    launches: [
      {
        year: "2018",
        name: "Perspective API",
        desc: "ML toxicity-detection tool deployed with 200+ media partners to reduce online harassment at scale.",
        image: "/assets/fighting%20disinfo.png",
      },
      {
        year: "2018",
        name: "Outline VPN",
        desc: "Open-source VPN helping journalists and activists bypass government censorship in 30+ countries.",
        image: "/assets/represive%20censorship.png",
      },
      {
        year: "2018",
        name: "Anti-Harassment Tools",
        desc: "UX patterns and systems that protect at-risk communities by making online spaces safer by design.",
        image: "/assets/fightinharassment.png",
      },
    ],
  },
  {
    n: "04",
    yearRange: "2024–Present",
    company: "Google Shopping",
    title: "Beyond the Prompt —",
    titleIt: "The Implicit AI Interface",
    narrative:
      "In 2–3 years predictive, agentic, and generative UIs will replace conversational interfaces for most everyday tasks. I led the strategic vision and design explorations that are defining what that near-term future looks like for commerce.",
    heroImage: "/assets/beyondtheprompt.png",
    tags: ["Agentic AI", "Vision", "Patents", "Generative UI"],
    launches: [
      {
        year: "2024",
        name: "Shopping AI Pathways",
        desc: "Novel UX bringing LLM power to the product grid — letting users browse visually while naturally refining their search.",
        image: "/assets/shoppingaipathways.gif",
      },
      {
        year: "2024",
        name: "Outfit Agent",
        desc: "A modern take on the catalog mailer — curated by a shopping agent using contextual, generative media. Patented.",
        image: "/assets/outfitagent.gif",
      },
      {
        year: "2025",
        name: "Agentic Commerce",
        desc: "Next-generation shopping where AI anticipates needs and completes the purchase journey autonomously.",
        image: "/assets/agenticcommerce.gif",
      },
    ],
  },
  {
    n: "05",
    yearRange: "2018–2020",
    company: "Google Classroom",
    title: "Redefining the",
    titleIt: "Future of Education",
    narrative:
      "As classrooms went digital, teachers needed more robust tools for planning, grading, and assignment distribution. My team rebuilt Google Classroom to meet those needs — doubling the user base and setting a new bar for ed-tech UX.",
    heroImage: "/assets/eduvision.gif",
    tags: ["Education Tech", "Product Strategy", "Design Systems"],
    launches: [
      {
        year: "2019",
        name: "Classroom Redesign",
        desc: "Complete ground-up redesign that improved core workflows for 50M+ teachers and students worldwide.",
        image: "/assets/eduteamleaderhsip.jpg",
      },
      {
        year: "2020",
        name: "Course Kit",
        desc: "LMS integration tools connecting Classroom to university platforms, expanding reach across higher education.",
        image: "/assets/docslive.gif",
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

export default function Transformations() {
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
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      <section id="about">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 className="sec-title">
              A little about the <span className="it">work.</span>
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-block lead rv">
              <p>
                I work with companies that build the future with{" "}
                <span className="ac">creativity, care, and purpose</span>. In a
                world full of buzzwords — disruption, moonshot, AI everything —
                true innovation can be tough to find. Right now, I&apos;ve found
                that spark at Google, where I&apos;m rethinking what hybrid
                productivity can look like with Google Meet.
              </p>
            </div>

            <div className="about-block rv rv-d1">
              <h3>Building teams</h3>
              <p>
                I&apos;m passionate about building and growing UX teams that
                solve real, complex problems — for users and for businesses. I
                love helping teams thrive: streamlining processes, championing
                user-centered design, and leveling up strategic thinking to
                drive real impact.
              </p>
            </div>

            <div className="about-block rv rv-d2">
              <h3>Creating experiences</h3>
              <p>
                What if you designed something people actually wanted to use
                every day? How do you make someone more productive, more
                efficient — or just a little happier? What happens on their
                third visit? Their eighth? Their 126th? I design experiences
                that are flexible, efficient, and built to keep users engaged —
                not just once, but over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="process">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 className="sec-title">
              Three things I <span className="it">believe.</span>
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
              Amazing teams.<br /><span className="it">Real impact.</span>
            </h2>
          </div>

          <div className="cases">
            {CASES.map((c) => (
              <div key={c.n} className="case rv">
                <div className="case-meta">
                  <span className="case-num">{c.n}</span>
                  <span className="case-year">{c.yearRange}</span>
                  <div className="case-tags">
                    {c.tags.map((t) => (
                      <span key={t} className="case-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="case-body">
                  <div className="case-co">{c.company}</div>
                  <h3 className="case-title">
                    {c.title} <span className="it">{c.titleIt}</span>
                  </h3>
                  <p className="case-narrative">{c.narrative}</p>

                  <div className="case-hero">
                    <img src={c.heroImage} alt={`${c.company} — ${c.title}`} />
                  </div>

                  <div className="cs-launches">
                    {c.launches.map((l, i) => (
                      <div key={i} className="cs-launch">
                        <div className="cs-launch-img">
                          <img src={l.image} alt={l.name} />
                        </div>
                        <div className="cs-launch-foot">
                          <div className="cs-launch-yr">{l.year}</div>
                          <div className="cs-launch-name">{l.name}</div>
                          <p className="cs-launch-desc">{l.desc}</p>
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
