"use client";

import { useEffect, useRef, useState } from "react";

// ── Konami sequence ────────────────────────────────────────────────────────
const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

// ── Hand-rolled confetti ───────────────────────────────────────────────────
function fireConfetti() {
  const canvas = document.createElement("canvas");
  canvas.className = "ee-confetti";
  document.body.appendChild(canvas);
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d")!;

  type P = { x:number; y:number; vx:number; vy:number; rot:number; rv:number; w:number; h:number; hue:number };
  const pieces: P[] = Array.from({ length: 180 }, () => ({
    x:    Math.random() * canvas.width,
    y:   -20 - Math.random() * 60,
    vx:   (Math.random() - 0.5) * 8,
    vy:   Math.random() * 3 + 1.5,
    rot:  Math.random() * Math.PI * 2,
    rv:   (Math.random() - 0.5) * 0.14,
    w:    Math.random() * 12 + 5,
    h:    Math.random() * 6 + 3,
    hue:  Math.random() * 70 + 15, // warm oranges/pinks/yellows
  }));

  let t = 0;
  const FADE_AT = 120;
  const END    = 180;

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of pieces) {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.09;
      p.rot += p.rv;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle   = `oklch(70% 0.22 ${p.hue})`;
      ctx.globalAlpha = t < FADE_AT ? 1 : Math.max(0, 1 - (t - FADE_AT) / (END - FADE_AT));
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    t++;
    if (t < END) requestAnimationFrame(tick);
    else canvas.remove();
  };
  requestAnimationFrame(tick);
}

// ── Component ──────────────────────────────────────────────────────────────
export default function EasterEggs() {
  const [helpOpen, setHelpOpen]   = useState(false);
  const [toast,    setToast]      = useState<string | null>(null);
  const [rainbow,  setRainbow]    = useState(false);
  const [light,    setLight]      = useState(false);

  const konamiIdx  = useRef(0);
  const typed      = useRef("");
  const dotClicks  = useRef(0);
  const dotTimer   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted    = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const showToast = (msg: string, dur = 4000) => {
    clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), dur);
  };

  // ── Keyboard listeners ─────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest("input, textarea")) return;

      // Konami code
      if (e.key === KONAMI[konamiIdx.current]) {
        konamiIdx.current++;
        if (konamiIdx.current === KONAMI.length) {
          konamiIdx.current = 0;
          fireConfetti();
          showToast("🎮 Konami Code unlocked. Nice work.");
        }
      } else {
        konamiIdx.current = e.key === KONAMI[0] ? 1 : 0;
      }

      // Typed word detection
      if (e.key.length === 1) {
        typed.current = (typed.current + e.key.toLowerCase()).slice(-12);

        if (typed.current.endsWith("hire")) {
          typed.current = "";
          showToast("👋 Let's talk — ryan@ryanfedyk.com", 6000);
        }
        if (typed.current.endsWith("light")) {
          typed.current = "";
          setLight(l => !l);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Nav dot click counter ──────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      const dot = document.querySelector<HTMLElement>(".nav-dot");
      if (!dot) return;
      const handler = () => {
        dotClicks.current++;
        clearTimeout(dotTimer.current);
        dotTimer.current = setTimeout(() => { dotClicks.current = 0; }, 1200);
        if (dotClicks.current >= 5) {
          dotClicks.current = 0;
          setRainbow(r => {
            const next = !r;
            showToast(next ? "🌈 Rainbow cursor activated." : "Cursor restored.");
            return next;
          });
        }
      };
      dot.addEventListener("click", handler);
      return () => dot.removeEventListener("click", handler);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // ── Apply light mode class ─────────────────────────────────────────
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    document.documentElement.classList.toggle("ee-light", light);
    showToast(light ? "🌅 Light mode on." : "🌙 Dark mode restored.");
  }, [light]);

  // ── Apply rainbow cursor class ─────────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.toggle("ee-rainbow", rainbow);
  }, [rainbow]);

  const HINTS = [
    { icon: "🎮", name: "The Classic",     hint: "A legendary cheat code from 1986 still works here." },
    { icon: "🌈", name: "Rainbow Mode",    hint: "Click the orange dot in the nav 5 times quickly." },
    { icon: "🌅", name: "Day Mode",         hint: "Type the opposite of dark — anywhere on the page." },
    { icon: "👋", name: "Make Your Move",  hint: "Type what you'd say to a recruiter." },
  ];

  return (
    <>
      {/* ── Help Button ───────────────────────────────────────────── */}
      <button
        className={"ee-btn" + (helpOpen ? " open" : "")}
        onClick={() => setHelpOpen(h => !h)}
        aria-label="Easter eggs"
      >
        {helpOpen ? "×" : "?"}
      </button>

      {/* ── Modal ─────────────────────────────────────────────────── */}
      <div
        className={"ee-modal" + (helpOpen ? " on" : "")}
        onClick={() => setHelpOpen(false)}
      >
        <div className="ee-modal-box" onClick={e => e.stopPropagation()}>
          <div className="ee-modal-hd">
            <div className="ee-modal-title">
              <span className="ee-modal-eyebrow">Secrets</span>
              Easter Eggs
            </div>
            <button className="ee-modal-x" onClick={() => setHelpOpen(false)}>×</button>
          </div>
          <p className="ee-modal-sub">
            4 hidden interactions are buried in this page. Here's how to find them.
          </p>
          <div className="ee-list">
            {HINTS.map(h => (
              <div key={h.name} className="ee-row">
                <span className="ee-icon">{h.icon}</span>
                <div>
                  <div className="ee-name">{h.name}</div>
                  <div className="ee-hint">{h.hint}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Toast ─────────────────────────────────────────────────── */}
      <div className={"ee-toast" + (toast ? " on" : "")}>
        {toast}
      </div>
    </>
  );
}
