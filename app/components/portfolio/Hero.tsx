"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#about",   label: "About"   },
  { href: "#process", label: "Process" },
  { href: "#work",    label: "Work"    },
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
          <span>Google · 2013–Present</span>
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

  return (
    <>
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
            <span className="eyebrow">Portfolio · 2009–2026</span>
          </div>

          <h1 className="rv rv-d1">
            Designing experiences to
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
    </>
  );
}
