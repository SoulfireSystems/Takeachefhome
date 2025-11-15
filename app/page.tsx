"use client";

import React, { useEffect, useState } from "react";

// --------------------
// FLAVR POP PALETTE
// --------------------
const COLORS = {
  neutralBg: "#FFFDF7",
  text: "#2A2A2A",
  textMuted: "#4F4F4F",
  card: "#FFFFFF",
  border: "#E0DED8",
  citrus: "#FF7A00",
  red: "#E63946",
  green: "#00A86B",
  blue: "#1976D2",
  plum: "#673AB7",
  lemon: "#FFD54F",
  papaya: "#FFE5B4",
  cocoa: "#3E2723",
};

// --------------------
// Tiny UI helpers (no external libs)
// --------------------

const Button = ({
  children,
  variant = "solid",
  size = "md",
  style,
  ...props
}: any) => {
  const base: React.CSSProperties = {
    borderRadius: 999,
    border: "1px solid transparent",
    padding:
      size === "sm"
        ? "0.3rem 0.8rem"
        : size === "lg"
        ? "0.6rem 1.3rem"
        : "0.45rem 1rem",
    fontSize: size === "sm" ? 12 : 14,
    fontWeight: 600,
    cursor: "pointer",
    background: COLORS.citrus,
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
  };

  if (variant === "outline") {
    base.background = "transparent";
    base.color = COLORS.citrus;
    base.borderColor = COLORS.citrus;
  }

  if (variant === "ghost") {
    base.background = "transparent";
    base.border = "none";
    base.color = COLORS.text;
  }

  return (
    <button style={{ ...base, ...style }} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, style }: any) => (
  <div
    style={{
      background: COLORS.card,
      borderRadius: 16,
      border: `1px solid ${COLORS.border}`,
      padding: "0.9rem 1rem",
      boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
      ...style,
    }}
  >
    {children}
  </div>
);

const CardHeader = ({ children }: any) => (
  <div style={{ marginBottom: 6 }}>{children}</div>
);
const CardTitle = ({ children }: any) => (
  <h3 style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>
    {children}
  </h3>
);
const CardContent = ({ children }: any) => <div>{children}</div>;

const Input = (props: any) => (
  <input
    {...props}
    style={{
      width: "100%",
      borderRadius: 10,
      border: `1px solid ${COLORS.border}`,
      padding: "0.45rem 0.75rem",
      fontSize: 13,
      outline: "none",
      ...props.style,
    }}
  />
);

const Textarea = (props: any) => (
  <textarea
    {...props}
    style={{
      width: "100%",
      borderRadius: 10,
      border: `1px solid ${COLORS.border}`,
      padding: "0.45rem 0.75rem",
      fontSize: 13,
      outline: "none",
      resize: "vertical",
      ...props.style,
    }}
  />
);

const Badge = ({ children }: any) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      padding: "0.1rem 0.5rem",
      fontSize: 10,
      fontWeight: 500,
      background: "#00000008",
    }}
  >
    {children}
  </span>
);

// --------------------
// Utility section wrapper
// --------------------
const Section = ({ id, title, subtitle, children, bg }: any) => (
  <section
    id={id}
    style={{
      width: "100%",
      maxWidth: 1120,
      margin: "0 auto",
      padding: "2.5rem 1.25rem",
      background: bg || "transparent",
    }}
  >
    {title && (
      <div style={{ marginBottom: "1.25rem" }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: COLORS.text,
            marginBottom: 4,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: 14, color: COLORS.textMuted }}>{subtitle}</p>
        )}
      </div>
    )}
    {children}
  </section>
);

// --------------------
// NAV
// --------------------

const Nav = ({ onNavigate }: any) => {
  const [open, setOpen] = useState(false);

  const LinkBtn = ({ to, children }: any) => (
    <button
      onClick={() => {
        onNavigate(to);
        setOpen(false);
      }}
      style={{
        fontSize: 14,
        fontWeight: 500,
        background: "none",
        border: "none",
        cursor: "pointer",
        color: COLORS.text,
      }}
    >
      {children}
    </button>
  );

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        borderBottom: `1px solid ${COLORS.border}`,
        background: `${COLORS.neutralBg}CC`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 1.25rem",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>👨🏾‍🍳</span>
          <span
            style={{ fontWeight: 600, fontSize: 15, color: COLORS.text }}
          >
            TakeaChefHome
          </span>
          <Badge>beta</Badge>
        </div>

        {/* Desktop links */}
        <div
          className="nav-desktop"
          style={{
            display: "none",
          }}
        >
          {/* filled by CSS below with media query */}
        </div>

        {/* Right side: call + mobile menu */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button
            variant="outline"
            size="sm"
            style={{
              borderColor: COLORS.citrus,
              color: COLORS.citrus,
              display: "none",
            }}
            className="nav-call"
          >
            📞 Book a Call
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </Button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          style={{
            borderTop: `1px solid ${COLORS.border}`,
            background: COLORS.neutralBg,
          }}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0.75rem 1.25rem 1rem",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <LinkBtn to="home">Home</LinkBtn>
            <LinkBtn to="private">Private Chef</LinkBtn>
            <LinkBtn to="corporate">HoneyPott</LinkBtn>
            <LinkBtn to="market">Marketplace</LinkBtn>
            <LinkBtn to="join">Join</LinkBtn>
            <LinkBtn to="about">About</LinkBtn>
          </div>
        </div>
      )}

      {/* Desktop nav (mirrored, but shown via CSS media query) */}
      <style jsx>{`
        @media (min-width: 768px) {
          .nav-desktop {
            display: flex !important;
            gap: 1.5rem;
            align-items: center;
          }
          .nav-call {
            display: inline-flex !important;
          }
        }
      `}</style>

      <div
        className="nav-desktop"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 1.25rem 0.75rem",
          display: "none",
          justifyContent: "flex-end",
          gap: "1.5rem",
        }}
      >
        <LinkBtn to="home">Home</LinkBtn>
        <LinkBtn to="private">Private Chef</LinkBtn>
        <LinkBtn to="corporate">HoneyPott</LinkBtn>
        <LinkBtn to="market">Marketplace</LinkBtn>
        <LinkBtn to="join">Join</LinkBtn>
        <LinkBtn to="about">About</LinkBtn>
      </div>
    </div>
  );
};

// --------------------
// HERO VARIANTS
// --------------------

const HeroBanner = ({
  variant = "marketplace",
  onStart,
}: {
  variant?: "marketplace" | "private" | "corporate";
  onStart: (v: string) => void;
}) => {
  if (variant === "private") {
    return (
      <div style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.citrus} 0%, ${COLORS.red} 60%, ${COLORS.plum} 100%)`,
            color: "#fff",
          }}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "3rem 1.25rem",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  borderRadius: 999,
                  padding: "0.15rem 0.7rem",
                  fontSize: 11,
                  marginBottom: 10,
                  border: "1px solid #ffffff55",
                  background: "#ffffff22",
                }}
              >
                ✨ ChefScope • Private Chef Concierge
              </div>
              <h1
                style={{
                  fontSize: 34,
                  fontWeight: 600,
                  lineHeight: 1.1,
                  marginBottom: 10,
                }}
              >
                Dinners with story — plated in your home.
              </h1>
              <p style={{ fontSize: 15, opacity: 0.95, maxWidth: 420 }}>
                Pick a vibe. We’ll build the menu and match your chef in
                minutes.
              </p>
              <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
                <Button
                  size="lg"
                  style={{ background: COLORS.lemon, color: COLORS.cocoa }}
                  onClick={() => onStart("private")}
                >
                  👨🏾‍🍳 Hire a Private Chef
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  style={{ borderColor: "#ffffffaa", color: "#fff" }}
                >
                  ▶ Watch 30s Reel
                </Button>
              </div>
            </div>

            <Card style={{ background: COLORS.card, color: COLORS.text }}>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <Input placeholder="City / ZIP" />
                  <Input placeholder="# Guests" type="number" />
                </div>
                <Input
                  placeholder="Occasion (birthday, retreat, etc.)"
                  style={{ marginBottom: 8 }}
                />
                <Input
                  placeholder="Budget range"
                  style={{ marginBottom: 8 }}
                />
                <Button
                  style={{
                    width: "100%",
                    background: COLORS.citrus,
                    marginBottom: 6,
                  }}
                  onClick={() => onStart("private")}
                >
                  Build My Menu
                </Button>
                <p
                  style={{
                    fontSize: 11,
                    color: COLORS.textMuted,
                  }}
                >
                  By continuing you agree to our booking terms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "corporate") {
    return (
      <div style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <div
          style={{
            background: `linear-gradient(100deg, ${COLORS.blue} 0%, ${COLORS.plum} 100%)`,
            color: "#fff",
          }}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "3rem 1.25rem",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  borderRadius: 999,
                  padding: "0.15rem 0.7rem",
                  fontSize: 11,
                  marginBottom: 10,
                  border: "1px solid #ffffff55",
                  background: "#ffffff22",
                }}
              >
                🏢 HoneyPott • Corporate / Gov
              </div>
              <h1
                style={{
                  fontSize: 34,
                  fontWeight: 600,
                  lineHeight: 1.1,
                  marginBottom: 10,
                }}
              >
                Serious logistics. Soulful food.
              </h1>
              <p style={{ fontSize: 15, opacity: 0.95, maxWidth: 420 }}>
                Entertainment, corporate, and government catering with AI-fast
                quotes.
              </p>
              <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
                <Button
                  size="lg"
                  style={{ background: COLORS.lemon, color: COLORS.cocoa }}
                  onClick={() => onStart("corporate")}
                >
                  📝 Request Proposal
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  style={{ borderColor: "#ffffffaa", color: "#fff" }}
                >
                  📄 Capability Statement
                </Button>
              </div>
            </div>

            <Card style={{ background: COLORS.card, color: COLORS.text }}>
              <CardHeader>
                <CardTitle>Instant RFP Intake</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <Input placeholder="Company / Agency" />
                  <Input placeholder="Event Date" />
                  <Input placeholder="Headcount" type="number" />
                  <Input placeholder="Location / Site Access Notes" />
                </div>
                <Textarea
                  placeholder="Scope, meal periods, staffing, COI/W-9 needs"
                  rows={3}
                  style={{ marginBottom: 8 }}
                />
                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    style={{ background: COLORS.citrus, color: "#fff" }}
                  >
                    Generate Scope & Quote PDF
                  </Button>
                  <Button
                    variant="outline"
                    style={{
                      borderColor: COLORS.citrus,
                      color: COLORS.citrus,
                    }}
                  >
                    Talk to a Human
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Marketplace default
  return (
    <div style={{ borderBottom: `1px solid ${COLORS.border}` }}>
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "2.5rem 1.25rem 3rem",
          background: COLORS.neutralBg,
        }}
      >
        <div
          style={{
            borderRadius: 24,
            padding: "1.75rem 1.5rem",
            background: `linear-gradient(135deg, ${COLORS.papaya}, #ffffff 60%)`,
            border: `1px solid ${COLORS.border}`,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
            gap: 20,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 600,
                color: COLORS.text,
                marginBottom: 8,
              }}
            >
              The Culinary Exchange — find work, book chefs, post pop-ups.
            </h1>
            <p style={{ fontSize: 15, color: COLORS.textMuted, maxWidth: 440 }}>
              Craigslist simplicity, HoneyPott professionalism. Built for the
              people who feed the people.
            </p>
            <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
              <Button>Post a Listing</Button>
              <Button variant="outline">Browse Marketplace</Button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 10,
            }}
          >
            {[
              "Private Chefs & Catering",
              "Event Help & Staffing",
              "Venues & Rentals",
              "Kitchen Gear & Ingredients",
            ].map((t) => (
              <Card key={t}>
                <CardHeader>
                  <CardTitle>{t}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    style={{
                      fontSize: 12,
                      color: COLORS.textMuted,
                    }}
                  >
                    Post · Hire · Book
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --------------------
// Pieces
// --------------------

const MarketplaceGrid = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 16,
    }}
  >
    {[
      "Private Chefs & Catering",
      "Event Help & Staffing",
      "Venues & Rentals",
      "Kitchen Gear & Ingredients",
      "Pop-Ups & Events",
      "Community & Collabs",
    ].map((title) => (
      <Card key={title}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ fontSize: 13, color: COLORS.textMuted }}>
            Post · Hire · Book
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              gap: 8,
            }}
          >
            <Button size="sm">View</Button>
            <Button size="sm" variant="outline">
              Book
            </Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const HomeView = ({ onStart, hero }: any) => (
  <>
    <HeroBanner variant={hero} onStart={onStart} />
    <Section
      id="features"
      title="A marketplace built for real life"
      subtitle="Private dinners to government deployments — one clean flow."
      bg={COLORS.neutralBg}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {[
          {
            icon: "👨🏾‍🍳",
            t: "Private Chefs",
            d: "Intimate, chef-led dinners with soulful precision.",
          },
          {
            icon: "🏢",
            t: "Corporate & Gov",
            d: "RFP-ready quotes, staffing, and compliance.",
          },
          {
            icon: "✨",
            t: "AI Concierge",
            d: "Instant menus, chef-matching, and pricing.",
          },
        ].map((f, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                <span style={{ marginRight: 6 }}>{f.icon}</span>
                {f.t}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: 13, color: COLORS.textMuted }}>{f.d}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
    <Section id="market" title="Featured Categories">
      <MarketplaceGrid />
    </Section>
  </>
);

const PrivateView = () => (
  <>
    <Section
      id="private-hero"
      title="Chef Savoir Faire — Private Chef Marketplace"
      subtitle="Pick a vibe. We’ll build the menu and match your chef."
      bg={COLORS.neutralBg}
    >
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Input
          placeholder="Search cuisines, vibes, cities"
          style={{ maxWidth: 320 }}
        />
        <Button variant="outline">🔍 Search</Button>
      </div>
    </Section>
    <Section>
      <Card>
        <CardHeader>
          <CardTitle>ChefScope.AI — Private Chef Concierge</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 8 }}>
            This is your intake widget. We’ll connect it to real AI endpoints
            later.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 10,
            }}
          >
            <Input placeholder="Date (YYYY-MM-DD)" />
            <Input placeholder="Time" />
            <Input placeholder="Location ZIP" />
            <Input placeholder="Allergies / Dietary" />
          </div>
          <Textarea
            placeholder="Notes (no cilantro, Grandma loves peach cobbler)"
            rows={3}
            style={{ marginTop: 8, marginBottom: 8 }}
          />
          <Button>Generate 3 Menus</Button>
        </CardContent>
      </Card>
    </Section>
  </>
);

const CorporateView = () => (
  <>
    <Section
      id="corp-hero"
      title="HoneyPott Events — Corporate · Entertainment · Government"
      subtitle="Serious logistics, soulful food. We scale up without losing the flavor."
      bg={COLORS.neutralBg}
    >
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Input
          placeholder="Event type (conference, tour, base)"
          style={{ maxWidth: 320 }}
        />
        <Button variant="outline">🔍 Browse Services</Button>
      </div>
    </Section>
    <Section>
      <Card>
        <CardHeader>
          <CardTitle>ChefGoGee.AI — Corporate / Gov Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 8 }}>
            One intake to turn RFPs into quotes and PDF proposals.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 10,
            }}
          >
            <Input placeholder="Company / Agency" />
            <Input placeholder="Event Date" />
            <Input placeholder="Headcount" type="number" />
            <Input placeholder="Location / Site Access Notes" />
          </div>
          <Textarea
            placeholder="Scope, meal periods, staffing, COI/W-9 needs"
            rows={3}
            style={{ marginTop: 8, marginBottom: 8 }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <Button>Generate Scope & Quote PDF</Button>
            <Button variant="outline">Talk to a Human</Button>
          </div>
        </CardContent>
      </Card>
    </Section>
  </>
);

const MarketView = () => (
  <Section
    id="marketplace"
    title="Marketplace"
    subtitle="Book curated chef experiences or build your own."
  >
    <MarketplaceGrid />
  </Section>
);

const JoinView = () => (
  <Section
    id="join"
    title="Join the Chef Network"
    subtitle="We’re hiring soul-forward chefs across the U.S."
    bg={COLORS.neutralBg}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
        gap: 16,
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Apply as a Chef Partner</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "grid", gap: 8 }}>
            <Input placeholder="Full Name" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="City / State" />
            <Textarea placeholder="Specialties, certifications, links" />
            <Button style={{ background: COLORS.green }}>Submit Application</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Why Join</CardTitle>
        </CardHeader>
        <CardContent>
          <ul
            style={{
              fontSize: 13,
              color: COLORS.textMuted,
              paddingLeft: 18,
              margin: 0,
            }}
          >
            <li>Curated, high-quality leads</li>
            <li>AI quoting & calendar holds</li>
            <li>Soul Standard certification path</li>
            <li>Fast payouts</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </Section>
);

const AboutView = () => (
  <Section
    id="about"
    title="About TakeaChefHome"
    subtitle="Chef Savoir Faire × HoneyPott Events"
  >
    <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6 }}>
      <p>
        <strong>Mission:</strong> Connect people to unforgettable food
        moments — from intimate dinners to base-wide operations — with AI
        speed and human soul.
      </p>
      <p style={{ marginTop: 8 }}>
        <strong>Divisions:</strong> Chef Savoir Faire (private chef
        marketplace) and HoneyPott Events (corporate, entertainment,
        government).
      </p>
      <p style={{ marginTop: 8 }}>
        This skeleton is wired for quick iteration: plug in ChefScope.AI,
        ChefGoGee.AI, your menus, and your FLAVR products as we go.
      </p>
    </div>
  </Section>
);

const Footer = () => (
  <footer
    style={{
      borderTop: `1px solid ${COLORS.border}`,
      background: COLORS.cocoa,
      color: "#fff",
      marginTop: 32,
    }}
  >
    <div
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "0.9rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ fontSize: 12 }}>
        © {new Date().getFullYear()} TakeaChefHome.com · HoneyPott Events × Chef
        Savoir Faire
      </div>
      <div style={{ display: "flex", gap: 10, fontSize: 12 }}>
        <button style={{ background: "none", border: "none", color: "#fff" }}>
          Privacy
        </button>
        <button style={{ background: "none", border: "none", color: "#fff" }}>
          Terms
        </button>
        <button style={{ background: "none", border: "none", color: "#fff" }}>
          Contact
        </button>
      </div>
    </div>
  </footer>
);

// --------------------
// ROOT PAGE
// --------------------
export default function AppPage() {
  const [view, setView] = useState<
    "home" | "private" | "corporate" | "market" | "join" | "about"
  >("home");
  const [hero, setHero] = useState<
    "marketplace" | "private" | "corporate"
  >("marketplace");

  // auto-rotate hero
  useEffect(() => {
    const order: any = ["marketplace", "private", "corporate"];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % order.length;
      setHero(order[i]);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const onStart = (target: string) => {
    if (target === "private") setView("private");
    else if (target === "corporate") setView("corporate");
    else setView("home");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.neutralBg,
        color: COLORS.text,
      }}
    >
      <Nav onNavigate={setView} />

      {view === "home" && (
        <>
          <Section>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
              }}
            >
              <span style={{ opacity: 0.7 }}>Hero:</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setHero("marketplace")}
              >
                Marketplace
              </Button>
              <Button
                size="sm"
                variant="outline"
                style={{ borderColor: COLORS.green, color: COLORS.green }}
                onClick={() => setHero("private")}
              >
                Private
              </Button>
              <Button
                size="sm"
                variant="outline"
                style={{ borderColor: COLORS.blue, color: COLORS.blue }}
                onClick={() => setHero("corporate")}
              >
                Corporate
              </Button>
            </div>
          </Section>
          <HomeView onStart={onStart} hero={hero} />
        </>
      )}

      {view === "private" && <PrivateView />}
      {view === "corporate" && <CorporateView />}
      {view === "market" && <MarketView />}
      {view === "join" && <JoinView />}
      {view === "about" && <AboutView />}

      <Footer />
    </div>
  );
}
