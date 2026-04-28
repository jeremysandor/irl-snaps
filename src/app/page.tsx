"use client";

import { useState, type FormEvent } from "react";

type ModalView = "closed" | "form" | "success";

export default function Home() {
  const [modal, setModal] = useState<ModalView>("closed");
  const [strips, setStrips] = useState(10);
  const [nights, setNights] = useState(6);
  const [share, setShare] = useState(20);

  const monthly = Math.round(strips * nights * 4.33 * 5 * (share / 100));
  const monthlyLabel = `$${monthly.toLocaleString()}`;

  const openDemo = () => setModal("form");
  const closeDemo = () => setModal("closed");
  const submitDemo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModal("success");
  };

  return (
    <>
      {/* ============ NAV ============ */}
      <nav className="top">
        <div className="inner">
          <a href="#" className="logo">
            <span className="logo-mark">IRL</span>
            IRL Snaps
          </a>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#revenue">Revenue</a>
            <a href="#booth">The booth</a>
            <a href="#faq">FAQ</a>
          </div>
          <button className="btn btn--red" onClick={openDemo}>
            Book a demo →
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
                You don&rsquo;t pay. <em>You get paid.</em>
              </h1>
              <p className="sub">
                Zero cost to your venue. We install, we maintain. You cash a check every month.
              </p>
              <div className="cta-row">
                <button className="btn btn--red" onClick={openDemo}>
                  Book a 15-min demo →
                </button>
                <a href="#how" className="btn btn--ghost">
                  See how it works
                </a>
              </div>
              <p className="tiny" style={{ marginTop: 32 }}>
                ◦ 140+ venues · 2.1M strips printed · $0 upfront
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
                Every strip printed is $5. You take a cut of every one. We handle paper, ink,
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
                  Most venues see 6–14 strips a night on a busy weekend. Your share is negotiated
                  per venue — case by case. Play with the numbers.
                </p>
              </div>
              <div>
                <div className="big-number">
                  {monthlyLabel}
                  <small>Estimated monthly payout</small>
                </div>
                <div className="calc">
                  <div className="calc-row">
                    <span className="calc-label">Strips per night (avg)</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <input
                        type="range"
                        min={3}
                        max={25}
                        value={strips}
                        onChange={(e) => setStrips(+e.target.value)}
                      />
                      <span className="calc-value">{strips}</span>
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
                    <span className="calc-label">Price per strip</span>
                    <span className="calc-value">$5</span>
                  </div>
                  <div className="calc-row">
                    <span className="calc-label">Your share</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <input
                        type="range"
                        min={10}
                        max={33}
                        value={share}
                        onChange={(e) => setShare(+e.target.value)}
                      />
                      <span className="calc-value">{share}%</span>
                    </div>
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
                  Estimate · Exact share negotiated per venue · Capped at 33%
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
              <svg width="70%" viewBox="0 0 200 280" fill="none">
                <rect x="20" y="10" width="160" height="260" rx="6" fill="#1a1714" />
                <rect x="30" y="22" width="140" height="70" rx="3" fill="#c8392c" />
                <text
                  x="100"
                  y="62"
                  textAnchor="middle"
                  fontFamily="Fraunces, serif"
                  fontSize="20"
                  fontWeight="900"
                  fill="#f3ead7"
                  fontStyle="italic"
                >
                  YOUR BAR
                </text>
                <rect
                  x="40"
                  y="110"
                  width="120"
                  height="80"
                  rx="2"
                  fill="#2a2520"
                  stroke="#4a3f34"
                  strokeWidth="1"
                />
                <circle cx="100" cy="150" r="14" fill="#4a3f34" />
                <circle cx="100" cy="150" r="9" fill="#1a1714" />
                <rect x="50" y="210" width="100" height="20" rx="2" fill="#d4a23a" />
                <text
                  x="100"
                  y="224"
                  textAnchor="middle"
                  fontFamily="DM Mono, monospace"
                  fontSize="9"
                  fill="#1a1714"
                  letterSpacing="2"
                >
                  INSERT $5
                </text>
                <rect x="55" y="240" width="90" height="10" fill="#4a3f34" rx="1" />
                <rect x="55" y="255" width="90" height="5" fill="#4a3f34" rx="1" />
              </svg>
              <span className="placeholder-label">Product shot · 3/4 view</span>
            </div>
            <div>
              <ul className="spec-list">
                <li>
                  <span className="k">Footprint</span>
                  <span className="v">32″ × 36″ floor space. Fits a snug corner.</span>
                </li>
                <li>
                  <span className="k">Power</span>
                  <span className="v">Standard 110V outlet. ~140W running.</span>
                </li>
                <li>
                  <span className="k">Print</span>
                  <span className="v">Dye-sub, 4 shots per strip, dry in 10 seconds.</span>
                </li>
                <li>
                  <span className="k">Wrap</span>
                  <span className="v">Printed to your brand — we&rsquo;ll send 3 concepts.</span>
                </li>
                <li>
                  <span className="k">Payment</span>
                  <span className="v">Card tap + Apple Pay. Cash optional.</span>
                </li>
                <li>
                  <span className="k">Uptime</span>
                  <span className="v">99.2% — remote diagnostics, same-day service.</span>
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
                Groups linger to do the booth. Venues report an avg 28-min longer stay on weekends.
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
              <div className="eyebrow">From the floor</div>
              <h2 style={{ marginTop: 18 }}>
                Owners<br />
                <em>talking.</em>
              </h2>
            </div>
            <p>
              140+ venues across 11 states. These are real quotes from operators who&rsquo;ve had a
              booth for at least 6 months.
            </p>
          </div>

          <div className="quotes">
            <div className="quote">
              <div className="big-q">&ldquo;</div>
              <p>
                First month we cashed a $1,420 check for something we didn&rsquo;t lift a finger to
                run. I moved a high-top to make room for it. That was the whole install from our
                side.
              </p>
              <div className="who">
                <div className="avatar">M</div>
                <div>
                  <div className="name">Marisol Reyes</div>
                  <div className="venue">Owner · The Lantern, Austin</div>
                </div>
              </div>
            </div>
            <div className="quote">
              <div className="big-q">&ldquo;</div>
              <p>
                My customers post the strips before they post the cocktails. We started getting
                people walking in asking where the booth was. That&rsquo;s the real ROI.
              </p>
              <div className="who">
                <div className="avatar">D</div>
                <div>
                  <div className="name">Danny Okonkwo</div>
                  <div className="venue">GM · Lowry&rsquo;s, Brooklyn</div>
                </div>
              </div>
            </div>
            <div className="quote">
              <div className="big-q">&ldquo;</div>
              <p>
                Paper jammed once in eight months. They fixed it remotely before I finished writing
                the email. I stopped worrying about it by month two.
              </p>
              <div className="who">
                <div className="avatar">K</div>
                <div>
                  <div className="name">Kate Whelan</div>
                  <div className="venue">Owner · Molly &amp; June, Chicago</div>
                </div>
              </div>
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
                ask is ~10 square feet of floor and a standard wall outlet.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                How big is the revenue split?
                <span className="plus">+</span>
              </summary>
              <p>
                Case by case. Every strip is $5 to the customer. Your share is negotiated based on
                traffic, location, and term length — capped at a third of every strip. You&rsquo;ll
                see exact numbers in the proposal before anything gets installed. Direct deposit on
                the 1st with a full daily statement.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                What if it breaks on a Saturday night?
                <span className="plus">+</span>
              </summary>
              <p>
                We monitor every booth remotely. 90% of issues — paper jams, connectivity blips —
                we fix without you knowing. For anything physical, we have techs in 38 metros with
                same-day or next-morning response. You never need to troubleshoot.
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
                12 months to start — enough for us to earn back the hardware. After that it&rsquo;s
                month-to-month. We pull the booth on 30 days&rsquo; notice if it&rsquo;s ever not
                working out. No penalty.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                Is there a liquor-license issue?
                <span className="plus">+</span>
              </summary>
              <p>
                None we&rsquo;ve encountered. Photobooths are not regulated the way gaming machines
                are. We&rsquo;ve installed in bars, restaurants, breweries, wineries, and
                members-only clubs across 11 states without a licensing conflict. If your locality
                is unusual, we&rsquo;ll check with you before install.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                How do customers pay?
                <span className="plus">+</span>
              </summary>
              <p>
                Card tap, Apple Pay, Google Pay by default. Optional cash acceptor if your crowd
                prefers it. All transaction fees come out of our side, not yours.
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
              Book a 15-min demo →
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
                IRL Snaps
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
                    Book a demo
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
                  <a href="tel:+15555550123">(555) 555-0123</a>
                </li>
                <li>
                  <a href="#">Brooklyn, NY</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="bottom">
            <span>© 2026 IRL Snaps, Inc.</span>
            <span>Strips printed since launch · 2,147,889</span>
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
              <h3>Book a demo.</h3>
              <p className="sub">
                15 minutes. We&rsquo;ll show you the booth, the numbers, and the install timeline.
              </p>
              <form onSubmit={submitDemo}>
                <label>Your name</label>
                <input required name="name" type="text" placeholder="Jordan Rivera" />
                <label>Venue name</label>
                <input required name="venue" type="text" placeholder="e.g. The Lantern" />
                <label>Email</label>
                <input required name="email" type="email" placeholder="jordan@lantern.com" />
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
                <div className="submit-row">
                  <button className="btn btn--red" type="submit">
                    Request demo →
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
