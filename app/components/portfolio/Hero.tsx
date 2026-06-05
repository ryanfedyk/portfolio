"use client";

import { useEffect, useRef, useState } from "react";

const MARQUEE = [
  "Building teams",
  "Designing for the 126th visit",
  "AI-forward products",
  "Hybrid productivity",
  "User-centered design",
  "Real impact at scale",
];

const NAV_LINKS = [
  { href: "#about",   label: "About"   },
  { href: "#process", label: "Process" },
  { href: "#work",    label: "Work"    },
  { href: "#patents", label: "Patents" },
  { href: "#contact", label: "Contact" },
];

function useScrollY(): number {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setY(window.scrollY);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return y;
}

function useCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = document.querySelector<HTMLElement>(".cur");
    const ring = document.querySelector<HTMLElement>(".cur-ring");
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onDown = () => {
      dot.classList.add("lg");
      ring.classList.add("lg");
    };

    const onUp = () => {
      dot.classList.remove("lg");
      ring.classList.remove("lg");
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("a,button,[data-cursor]")) {
        dot.classList.add("lg");
        ring.classList.add("lg");
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("a,button,[data-cursor]")) {
        dot.classList.remove("lg");
        ring.classList.remove("lg");
      }
    };

    const loop = () => {
      dx += (mx - dx) * 0.5;
      dy += (my - dy) * 0.5;
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);
}

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
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
}

function useMagnetic(selector: string, strength: number) {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!cards.length) return;

    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      let dx = 0;
      let dy = 0;
      let cx = 0;
      let cy = 0;
      let raf = 0;
      let active = false;

      const run = () => {
        cx += (dx - cx) * 0.2;
        cy += (dy - cy) * 0.2;
        card.style.transform = `translate3d(${cx}px,${cy}px,0)`;
        if (active || Math.abs(cx) > 0.1 || Math.abs(cy) > 0.1) {
          raf = requestAnimationFrame(run);
        } else {
          card.style.transform = "translate3d(0,0,0)";
          raf = 0;
        }
      };

      const ensure = () => {
        if (!raf) raf = requestAnimationFrame(run);
      };

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        card.style.setProperty("--mx", `${(px / rect.width) * 100}%`);
        card.style.setProperty("--my", `${(py / rect.height) * 100}%`);
        dx = (px - rect.width / 2) * strength;
        dy = (py - rect.height / 2) * strength;
        active = true;
        ensure();
      };

      const onLeave = () => {
        active = false;
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        let spring = 0;
        const back = () => {
          cx += (0 - cx) * 0.15;
          cy += (0 - cy) * 0.15;
          card.style.transform = `translate3d(${cx}px,${cy}px,0)`;
          if (Math.abs(cx) > 0.1 || Math.abs(cy) > 0.1) {
            spring = requestAnimationFrame(back);
          } else {
            cx = 0;
            cy = 0;
            card.style.transform = "translate3d(0,0,0)";
          }
        };
        spring = requestAnimationFrame(back);
        cleanups.push(() => cancelAnimationFrame(spring));
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
        if (raf) cancelAnimationFrame(raf);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [selector, strength]);
}

function Nav({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="nav-id">
          <span className="nav-dot" />
          Ryan Fedyk
        </div>

        {/* Desktop nav */}
        <nav className="nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        {/* Hamburger — mobile only */}
        <button
          className={"nav-ham" + (menuOpen ? " open" : "")}
          onClick={() => setMenuOpen((m) => !m)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={"nav-mob" + (menuOpen ? " open" : "")}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <nav className="nav-mob-links" onClick={(e) => e.stopPropagation()}>
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ "--i": i } as React.CSSProperties}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-mob-meta">
          <span>Design Lead &amp; Manager</span>
          <span>Google · 2013 — Present</span>
        </div>
      </div>
    </>
  );
}

function Blobs({ y }: { y: number }) {
  return (
    <div className="blobs" aria-hidden="true">
      <div
        className="blob blob-a"
        style={{ transform: `translate3d(0, ${y * 0.25}px, 0)` }}
      />
      <div
        className="blob blob-b"
        style={{ transform: `translate3d(0, ${y * -0.18}px, 0)` }}
      />
      <div
        className="blob blob-c"
        style={{ transform: `translate3d(0, ${y * 0.1}px, 0)` }}
      />
    </div>
  );
}

export default function Hero() {
  const y = useScrollY();
  useReveal();
  useCursor();

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={dotRef} className="cur" aria-hidden="true" />
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />

      <Nav scrolled={y > 40} />

      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden={true}
        >
          <source src="/assets/ux_folio_v1.mp4" type="video/mp4" />
        </video>
        <Blobs y={y} />
        <div className="wrap hero-grid">
          <div className="hero-eyebrow rv">
            <span className="ln" />
            <span className="eyebrow">Portfolio · 2009 — 2026</span>
          </div>

          <h1 className="rv rv-d1">
            Designing <span className="it">experiences</span> to
            <br />
            improve people&apos;s
            <br />
            lives
          </h1>

          <dl className="hero-meta rv rv-d2">
            <div>
              <dt>Role</dt>
              <dd>Design Lead, Manager &amp; Tinkerer</dd>
            </div>
            <div>
              <dt>Currently</dt>
              <dd>Google · 2013–Present</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>AI-Forward Products</dd>
            </div>
            <div>
              <dt>Impact</dt>
              <dd>22 Patents · 1.5B+ DAU</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mq" aria-hidden="true">
        <div className="mq-track">
          {[0, 1, 2, 3].map((rep) =>
            MARQUEE.map((m, i) => <span key={`${rep}-${i}`}>{m}</span>)
          )}
        </div>
      </div>
    </>
  );
}
