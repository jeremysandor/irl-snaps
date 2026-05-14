"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";

type ModalView = "closed" | "form" | "success";

function useAnimatedNumber(target: number, duration = 500) {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(target);
      return;
    }
    const from = displayRef.current;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (target - from) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return display;
}

function formatUSPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const len = digits.length;
  if (len === 0) return "";
  if (len < 4) return `(${digits}`;
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function Home() {
  const [modal, setModal] = useState<ModalView>("closed");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [phoneInput, setPhoneInput] = useState("");
  const [guests, setGuests] = useState(200);
  const [nights, setNights] = useState(6);

  const stripsPerNight = Math.round(guests * 0.08);
  const monthly = Math.round(stripsPerNight * nights * 4.33 * 7 * 0.25);
  const animatedMonthly = useAnimatedNumber(monthly);
  const monthlyLabel = `$${Math.round(animatedMonthly).toLocaleString()}`;

  const quotesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = quotesRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("in-view");
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const openDemo = () => {
    setSubmitError(null);
    setModal("form");
  };
  const closeDemo = () => {
    setModal("closed");
    setSubmitError(null);
  };
  const submitDemo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      venue: data.get("venue"),
      phone: data.get("phone"),
      type: data.get("type"),
      hp: data.get("hp"),
    };

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setSubmitError(
          body?.error ?? "Something went wrong. Try again in a moment.",
        );
        return;
      }
      form.reset();
      setPhoneInput("");
      setModal("success");
    } catch {
      setSubmitError("Network hiccup. Try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ============ NAV ============ */}
      <nav className="top">
        <div className="inner">
          <a href="#" className="logo">
            <span className="logo-mark">IRL</span>
            <em>snaps</em>
          </a>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#revenue">Revenue</a>
            <a href="#booth">The booth</a>
            <a href="#faq">FAQ</a>
          </div>
          <button className="btn btn--red" onClick={openDemo}>
            See the numbers →
          </button>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">Installed photobooths · For bars &amp; restaurants</div>
              <h1 style={{ marginTop: 28 }}>
                You don&rsquo;t pay. You get <em>paid</em>.
              </h1>
              <p className="sub">
                Zero cost to your venue. We install, we maintain. You cash a check every month.
              </p>
              <div className="cta-row">
                <button className="btn btn--red" onClick={openDemo}>
                  See the numbers →
                </button>
                <a href="#how" className="btn btn--ghost">
                  See how it works
                </a>
              </div>
              <p className="tiny" style={{ marginTop: 32 }}>
                ◦ $0 upfront · Free install · Monthly check
              </p>
            </div>

            <div className="filmstrip" aria-hidden="true">
              <div className="frames">
                <div className="frame">
                  <svg viewBox="0 0 4 3" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <pattern
                        id="p1"
                        width="0.2"
                        height="0.2"
                        patternUnits="userSpaceOnUse"
                        patternTransform="rotate(45)"
                      >
                        <line x1="0" y1="0" x2="0" y2="0.2" stroke="#c8392c" strokeWidth="0.08" />
                      </pattern>
                    </defs>
                    <rect width="4" height="3" fill="#f3ead7" />
                    <rect width="4" height="3" fill="url(#p1)" opacity="0.6" />
                    <circle cx="2" cy="1.3" r="0.45" fill="#1a1714" />
                    <rect x="0.8" y="1.8" width="2.4" height="0.9" fill="#1a1714" rx="0.1" />
                  </svg>
                </div>
                <div className="frame">
                  <svg viewBox="0 0 4 3" preserveAspectRatio="xMidYMid slice">
                    <rect width="4" height="3" fill="#d4a23a" />
                    <circle cx="1.3" cy="1.3" r="0.4" fill="#1a1714" />
                    <circle cx="2.7" cy="1.3" r="0.4" fill="#1a1714" />
                    <path
                      d="M 1.1 2 Q 2 2.5 2.9 2"
                      stroke="#1a1714"
                      strokeWidth="0.1"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className="frame">
                  <svg viewBox="0 0 4 3" preserveAspectRatio="xMidYMid slice">
                    <rect width="4" height="3" fill="#2f5d5a" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="3"
                      height="2"
                      fill="none"
                      stroke="#f3ead7"
                      strokeWidth="0.08"
                      strokeDasharray="0.15 0.15"
                    />
                    <text
                      x="2"
                      y="1.7"
                      textAnchor="middle"
                      fontFamily="serif"
                      fontSize="0.6"
                      fontStyle="italic"
                      fill="#f3ead7"
                      fontWeight="700"
                    >
                      cheers!
                    </text>
                  </svg>
                </div>
                <div className="frame">
                  <svg viewBox="0 0 4 3" preserveAspectRatio="xMidYMid slice">
                    <rect width="4" height="3" fill="#c8392c" />
                    <circle
                      cx="2"
                      cy="1.5"
                      r="0.8"
                      fill="none"
                      stroke="#f3ead7"
                      strokeWidth="0.08"
                    />
                    <text
                      x="2"
                      y="1.7"
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontSize="0.35"
                      fill="#f3ead7"
                    >
                      04/21/26
                    </text>
                  </svg>
                </div>
              </div>
              <div className="footer">
                <span>IRL · Roll #047</span>
                <span>●</span>
                <span>04.21.26</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TICKER ============ */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>
            Zero cost to the venue <span className="dot">✦</span> Monthly check{" "}
            <span className="dot">✦</span> We install &amp; maintain{" "}
            <span className="dot">✦</span> Custom branded strips{" "}
            <span className="dot">✦</span> Any venue, any vibe{" "}
            <span className="dot">✦</span> Zero cost to the venue{" "}
            <span className="dot">✦</span> Monthly check <span className="dot">✦</span> We install
            &amp; maintain <span className="dot">✦</span> Custom branded strips{" "}
            <span className="dot">✦</span> Any venue, any vibe <span className="dot">✦</span>
          </span>
        </div>
      </div>

      {/* ============ HOW IT WORKS ============ */}
      <section className="block" id="how">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">How it works</div>
              <h2 style={{ marginTop: 18 }}>
                Three<br />steps.<br />That&rsquo;s it.
              </h2>
            </div>
            <p>
              We handle everything from concept to quarters. Your job is to pick a wall and cash the
              check. Our job is everything else — build, branding, power, paper, printer jams at 2am
              on a Saturday.
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h3>We design it around your venue.</h3>
              <p>
                Custom vinyl wrap, branded photo strip, on-screen prompts that match your tone. A
                dive bar and a Michelin spot shouldn&rsquo;t have the same booth, and they
                won&rsquo;t.
              </p>
              <div className="tag">Week 1 · Design call</div>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h3>We install, plug in, and walk.</h3>
              <p>
                Our crew delivers the cabinet, bolts it in, wires it to power, and tests 20 strips
                before we leave. You were open for business. You still are.
              </p>
              <div className="tag">Week 3 · Install day</div>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h3>You get a check every month.</h3>
              <p>
                You take a cut of every strip printed. We handle paper, ink,
                software updates, and the 2am service calls. You get an email on the 1st.
              </p>
              <div className="tag">Forever · Cash it</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ REVENUE / ROI ============ */}
      <section className="block" id="revenue" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="roi">
            <div className="roi-grid">
              <div>
                <div className="eyebrow" style={{ color: "#f3ead7aa" }}>
                  Venue revenue · typical month
                </div>
                <h2 style={{ marginTop: 18 }}>
                  Money in,<br />
                  <em>not out.</em>
                </h2>
                <p
                  style={{
                    color: "#f3ead7bb",
                    fontSize: 17,
                    marginTop: 20,
                    maxWidth: 440,
                  }}
                >
                  Punch in a typical night. See what the booth pays you.
                </p>
              </div>
              <div>
                <div className="big-number">
                  {monthlyLabel}
                  <small>Estimated monthly check</small>
                </div>
                <div className="calc">
                  <div className="calc-row">
                    <span className="calc-label">Guests per night</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <input
                        type="range"
                        min={75}
                        max={500}
                        step={25}
                        value={guests}
                        onChange={(e) => setGuests(+e.target.value)}
                      />
                      <span className="calc-value">{guests}</span>
                    </div>
                  </div>
                  <div className="calc-row">
                    <span className="calc-label">Open nights per week</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <input
                        type="range"
                        min={3}
                        max={7}
                        value={nights}
                        onChange={(e) => setNights(+e.target.value)}
                      />
                      <span className="calc-value">{nights}</span>
                    </div>
                  </div>
                  <div className="calc-row">
                    <span className="calc-label">Strips per night</span>
                    <span className="calc-value">~{stripsPerNight}</span>
                  </div>
                  <div className="calc-row total">
                    <span className="calc-label" style={{ fontSize: 15, opacity: 1 }}>
                      Monthly check
                    </span>
                    <span className="calc-value">{monthlyLabel}</span>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "var(--fs-mono)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#f3ead788",
                    marginTop: 14,
                    marginBottom: 0,
                  }}
                >
                  Estimate at standard partner terms · Your share is set per venue
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BOOTH SHOWCASE ============ */}
      <section className="block" id="booth" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">The hardware</div>
              <h2 style={{ marginTop: 18 }}>
                A classic cabinet,<br />
                <em>wrapped in you.</em>
              </h2>
            </div>
            <p>
              Our booth is the real thing — enclosed cabinet, curtain, bench, printed strips. Every
              unit ships with a custom vinyl wrap we design with your team, so it looks like
              it&rsquo;s always belonged on your floor.
            </p>
          </div>

          <div className="booth-showcase">
            <div className="booth-img">
              <Image
                src="/harumama.png"
                alt="IRL snaps booth installed at Haru Mama, wrapped in custom branding"
                fill
                sizes="(max-width: 900px) 100vw, 560px"
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
              <span className="placeholder-label">Haru Mama · San Diego</span>
            </div>
            <div>
              <ul className="spec-list">
                <li>
                  <span className="k">Footprint</span>
                  <span className="v">32″ × 60″ floor space. Fits a snug corner.</span>
                </li>
                <li>
                  <span className="k">Power</span>
                  <span className="v">Standard 110V outlet. ~140W running.</span>
                </li>
                <li>
                  <span className="k">Print</span>
                  <span className="v">Dye-sub, 3 shots per strip, dry in 10 seconds.</span>
                </li>
                <li>
                  <span className="k">Wrap</span>
                  <span className="v">Printed to your brand — we&rsquo;ll send 3 concepts.</span>
                </li>
                <li>
                  <span className="k">Payment</span>
                  <span className="v">Card tap, Apple Pay, Google Pay. Digital only.</span>
                </li>
                <li>
                  <span className="k">Uptime</span>
                  <span className="v">Built for &gt;99%. Remote diagnostics, same-day service in San Diego.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BENEFITS ============ */}
      <section className="block" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">What it does for you</div>
              <h2 style={{ marginTop: 18 }}>
                More than<br />
                <em>spare change.</em>
              </h2>
            </div>
            <p>
              A photobooth is the rare thing that makes money, markets you on Instagram, and gives
              your staff a break from taking group photos. It&rsquo;s not a prop — it&rsquo;s a line
              item.
            </p>
          </div>

          <div className="benefits">
            <div className="benefit">
              <div className="num">/ 01</div>
              <h3>Predictable monthly income</h3>
              <p>Direct deposit or check. Reported cleanly. No games, no clawbacks.</p>
            </div>
            <div className="benefit">
              <div className="num">/ 02</div>
              <h3>Free organic marketing</h3>
              <p>
                Every strip is printed with your logo. Every photo gets texted, shared, or stuck on
                a fridge.
              </p>
            </div>
            <div className="benefit">
              <div className="num">/ 03</div>
              <h3>Longer dwell time</h3>
              <p>
                Groups linger to do the booth. Lingering tables order another round.
              </p>
            </div>
            <div className="benefit">
              <div className="num">/ 04</div>
              <h3>Zero operational lift</h3>
              <p>
                We restock paper, we fix jams, we eat the hardware cost. Your staff can ignore it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="block" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Founding venues</div>
              <h2 style={{ marginTop: 18 }}>
                Be one<br />
                of the <em>first.</em>
              </h2>
            </div>
            <p>
              We&rsquo;re working with a small group of San Diego venues to lock in
              founding-partner terms. The booth is the same — what changes is your seat at the
              table.
            </p>
          </div>

          <div className="quotes" ref={quotesRef}>
            <div className="quote">
              <div className="big-q">01</div>
              <p>
                <strong>First in, locked in.</strong> Founding partners keep their original terms
                as we grow. The deal we strike on day one is the deal you keep.
              </p>
            </div>
            <div className="quote">
              <div className="big-q">02</div>
              <p>
                <strong>Co-designed.</strong> You weigh in on the wrap, the on-screen prompts, even
                the strip layout. The booth should feel like it&rsquo;s always belonged on your
                floor.
              </p>
            </div>
            <div className="quote">
              <div className="big-q">03</div>
              <p>
                <strong>Founding-venue mark.</strong> Every strip we print at your venue carries a
                small founding mark — a permanent nod to the rooms that backed us first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="block" id="faq" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="section-head" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <div className="eyebrow">Questions we get</div>
              <h2 style={{ marginTop: 18 }}>
                Before you<br />
                <em>ask it</em> — yes.
              </h2>
            </div>
          </div>

          <div className="faq">
            <details className="faq-item" open>
              <summary>
                What does it actually cost my venue?
                <span className="plus">+</span>
              </summary>
              <p>
                Zero. No install fee, no monthly fee, no minimum. We pay for the cabinet, the wrap,
                the printer, the paper, the payment processing, and the service calls. Your only
                ask is ~14 square feet of floor (a 32″ × 60″ corner) and a standard wall outlet.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                What if it breaks on a Saturday night?
                <span className="plus">+</span>
              </summary>
              <p>
                We monitor every booth remotely. Most issues — paper jams, connectivity blips — we
                fix without you knowing. For anything physical, we&rsquo;re San Diego–local, with
                same-day response. You never need to troubleshoot.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                Can we control how it looks?
                <span className="plus">+</span>
              </summary>
              <p>
                Yes, entirely. Every booth gets a custom vinyl wrap, a custom printed strip layout,
                and on-screen prompts that sound like your place. We&rsquo;ll send you three design
                concepts before install; you pick one.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                What&rsquo;s the commitment?
                <span className="plus">+</span>
              </summary>
              <p>
                Month-to-month from day one. We pull the booth on 30 days&rsquo; notice if it&rsquo;s
                ever not working out. No penalty, no lock-in.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                Is there a liquor-license issue?
                <span className="plus">+</span>
              </summary>
              <p>
                Photobooths aren&rsquo;t regulated the way gaming machines are — they&rsquo;re
                generally treated as standard amusement equipment. We&rsquo;ll confirm specifics for
                your San Diego locality before install. If anything unusual comes up, we&rsquo;ll
                flag it before you sign.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                How do customers pay?
                <span className="plus">+</span>
              </summary>
              <p>
                Card tap, Apple Pay, and Google Pay. Digital only — no cash. All transaction fees
                come out of our side, not yours.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final-cta">
        <div className="wrap">
          <h2>
            Let&rsquo;s put a<br />
            booth in your<br />
            <em>bar.</em>
          </h2>
          <div className="cta-row">
            <button className="btn" onClick={openDemo}>
              See the numbers →
            </button>
            <a href="mailto:hello@irlsnaps.com" className="btn btn--ghost">
              hello@irlsnaps.com
            </a>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer>
        <div className="wrap">
          <div className="grid">
            <div>
              <a href="#" className="logo" style={{ fontSize: 22 }}>
                <span className="logo-mark">IRL</span>
                <em>snaps</em>
              </a>
              <p style={{ marginTop: 20, maxWidth: 320, opacity: 0.7, fontSize: 14 }}>
                Installed photobooths for bars and restaurants. Zero upfront, monthly payout,
                nothing to maintain.
              </p>
            </div>
            <div>
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="#how">How it works</a>
                </li>
                <li>
                  <a href="#revenue">Revenue</a>
                </li>
                <li>
                  <a href="#booth">The booth</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Venue</h4>
              <ul>
                <li>
                  <button
                    onClick={openDemo}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      color: "inherit",
                      font: "inherit",
                      opacity: 0.85,
                      cursor: "pointer",
                    }}
                  >
                    See the numbers
                  </button>
                </li>
                <li>
                  <a href="#">Partner login</a>
                </li>
                <li>
                  <a href="#">Service request</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="mailto:hello@irlsnaps.com">hello@irlsnaps.com</a>
                </li>
                <li>
                  <a href="#">San Diego, CA</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="bottom">
            <span>© 2026 IRL snaps, Inc.</span>
            <span>Free for you. Pure revenue.</span>
          </div>
        </div>
      </footer>

      {/* ============ DEMO MODAL ============ */}
      <div
        className={`modal-backdrop${modal !== "closed" ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDemo();
        }}
      >
        <div className="modal">
          <button className="close" onClick={closeDemo} aria-label="close">
            ×
          </button>
          {modal === "success" ? (
            <div className="success">
              <div className="check">✓</div>
              <h3 style={{ marginBottom: 8 }}>You&rsquo;re on the list.</h3>
              <p style={{ color: "var(--ink-soft)", margin: "0 0 24px" }}>
                We&rsquo;ll reach out within 24 hours to schedule. Watch your inbox.
              </p>
              <button className="btn btn--red" onClick={closeDemo}>
                Close
              </button>
            </div>
          ) : (
            <>
              <h3>Let&rsquo;s run your numbers.</h3>
              <p className="sub">
                15 minutes. We&rsquo;ll walk you through the booth, the install, and what your
                venue could clear monthly.
              </p>
              <form onSubmit={submitDemo}>
                <label>Your name</label>
                <input required name="name" type="text" placeholder="Jordan Rivera" />
                <label>Venue name</label>
                <input required name="venue" type="text" placeholder="e.g. The Lantern" />
                <label>Phone</label>
                <input
                  required
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="(555) 867-5309"
                  maxLength={14}
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(formatUSPhone(e.target.value))}
                />
                <label>Venue type</label>
                <select required name="type" defaultValue="">
                  <option value="" disabled>
                    Select one…
                  </option>
                  <option>Bar / cocktail lounge</option>
                  <option>Restaurant</option>
                  <option>Brewery / taproom</option>
                  <option>Members club</option>
                  <option>Other</option>
                </select>
                <input
                  type="text"
                  name="hp"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: 1,
                    height: 1,
                    opacity: 0,
                  }}
                />
                {submitError && (
                  <p
                    role="alert"
                    style={{
                      color: "var(--red)",
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    {submitError}
                  </p>
                )}
                <div className="submit-row">
                  <button
                    className="btn btn--red"
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                  >
                    {submitting ? "Sending…" : "Get my numbers →"}
                  </button>
                  <span
                    style={{
                      fontFamily: "var(--fs-mono)",
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      color: "var(--ink-soft)",
                      textTransform: "uppercase",
                    }}
                  >
                    We reply in under 24h
                  </span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
