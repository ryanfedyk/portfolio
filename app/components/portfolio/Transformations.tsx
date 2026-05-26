"use client";

import { useEffect, useRef } from "react";

interface Philosophy {
  n: string;
  h: string;
  hIt: string | null;
  p: string;
}

interface CaseStudy {
  n: string;
  year: string;
  company: string;
  title: string;
  titleIt: string;
  desc: string;
  tags: string[];
  image: string;
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
    year: "2019–Present",
    company: "Google Meet",
    title: "Feature Chasing",
    titleIt: "→ AI-Focused Differentiators",
    desc: "During the pandemic Meet evolved rapidly. After my team brought the world back to the office with hybrid work, I pivoted the broader team toward longer-term vision, product differentiators, and increasing product excellence.",
    tags: ["AI", "Hybrid Work", "Design Leadership", "Patents"],
    image: "/assets/geminimeetings.gif",
  },
  {
    n: "02",
    year: "2017–2019",
    company: "Google Jigsaw",
    title: "Using Technology to",
    titleIt: "Improve Public Safety",
    desc: "At Jigsaw I rebuilt the design team from scratch and redirected its mission around user-centered design. My team developed tools to improve information hygiene, combat misinformation, fight harassment, and end repressive censorship.",
    tags: ["Safety Tech", "ML/AI", "Team Building", "Design Systems"],
    image: "/assets/represive%20censorship.png",
  },
  {
    n: "03",
    year: "2024–Present",
    company: "Google Shopping",
    title: "Beyond the Prompt —",
    titleIt: "The Implicit AI Interface",
    desc: "In 2–3 years predictive, agentic, and generative UIs will replace conversational interfaces for most tasks. I led the strategic vision and design explorations that are defining what that near-term future looks like for commerce.",
    tags: ["Agentic AI", "Vision", "Patents", "Generative UI"],
    image: "/assets/beyondtheprompt.png",
  },
  {
    n: "04",
    year: "2018–2020",
    company: "Google Classroom",
    title: "Redefining the",
    titleIt: "Future of Education",
    desc: "As classrooms went digital, teachers needed more robust tools for planning, grading, and assignment distribution. My team rebuilt Google Classroom to meet those needs and doubled the user base.",
    tags: ["Education Tech", "Product Strategy", "Design Systems"],
    image: "/assets/eduteamleaderhsip.jpg",
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      <section id="about">
        <div className="wrap">
          <div className="sec-head rv">
            <div className="sec-num">
              <span className="lbl">§ 01</span>
            </div>
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
            <div className="sec-num">
              <span className="lbl">§ 02</span>
            </div>
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
            <div className="sec-num">
              <span className="lbl">§ 03</span>
            </div>
            <h2 className="sec-title">
              Amazing teams.<br /><span className="it">Real impact.</span>
            </h2>
          </div>

          <div className="cases">
            {CASES.map((c) => (
              <div key={c.n} className="case rv" data-cursor>
                <div className="case-meta">
                  <span className="case-num">{c.n}</span>
                  <span className="case-year">{c.year}</span>
                  <span className="case-num">{c.company}</span>
                  <div className="case-tags">
                    {c.tags.map((t) => (
                      <span key={t} className="case-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="case-body">
                  <h3 className="case-title">
                    {c.title} <span className="it">{c.titleIt}</span>
                  </h3>
                  <p className="case-desc">{c.desc}</p>
                  <span className="case-cta">
                    View case <span className="arr">→</span>
                  </span>
                </div>

                <div className="case-art">
                  <img src={c.image} alt={`${c.company} — ${c.title}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
