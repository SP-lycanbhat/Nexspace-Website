import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, MODULES } from '../data/modules';
import { Badge, Tag } from '../components/Shared';
import { Btn } from '../components/Buttons';
import { ContactForm } from '../components/ContactForm';
import { FaqList } from '../components/FaqList';
import { Icon } from '../components/Icon';
const MOCK_DATA = [
    {
        stats: [
            { label: "Active Visitors", val: "142", sub: "↑ 18% vs yesterday", color: T.blue },
            { label: "Rooms Booked", val: "31/48", sub: "65% utilization", color: T.white },
            { label: "Open Tickets", val: "7", sub: "3 high priority", color: T.white },
            { label: "Facilities", val: "12", sub: "4 cities, 3 countries", color: T.white }
        ],
        visitors: [
            { init: "AK", name: "Anika Kapoor", time: "09:14", status: "Checked In", sCol: T.blue, bCol: "#00E5FF20" },
            { init: "RJ", name: "Rohit Jain", time: "09:45", status: "Pre-registered", sCol: T.blue, bCol: "#00E5FF10" },
            { init: "SM", name: "Sara Menon", time: "10:02", status: "Checked In", sCol: T.blue, bCol: "#00E5FF20" },
            { init: "DK", name: "Dev Kumar", time: "08:30", status: "Checked Out", sCol: T.whiteMute, bCol: "rgba(255,255,255,0.05)" },
        ],
        bars: [40, 60, 90, 70, 100, 50, 85],
        rooms: [
            { room: "Horizon A", status: "Booked", col: T.blue },
            { room: "Summit B", status: "Available", col: "#00E5FF" },
            { room: "Apex C", status: "Booked", col: T.blue },
        ]
    },
    {
        stats: [
            { label: "Active Visitors", val: "158", sub: "↑ 24% vs yesterday", color: T.blue },
            { label: "Rooms Booked", val: "38/48", sub: "79% utilization", color: T.white },
            { label: "Open Tickets", val: "5", sub: "1 high priority", color: T.white },
            { label: "Facilities", val: "12", sub: "4 cities, 3 countries", color: T.white }
        ],
        visitors: [
            { init: "MT", name: "Mira Tendulkar", time: "10:45", status: "Checked In", sCol: T.blue, bCol: "#00E5FF20" },
            { init: "SL", name: "Samir Luthra", time: "11:00", status: "Pre-registered", sCol: T.blue, bCol: "#00E5FF10" },
            { init: "AK", name: "Anika Kapoor", time: "09:14", status: "Checked In", sCol: T.blue, bCol: "#00E5FF20" },
            { init: "RJ", name: "Rohit Jain", time: "09:45", status: "At Meeting", sCol: T.purple, bCol: "rgba(215,108,241,0.15)" },
        ],
        bars: [50, 80, 75, 40, 95, 60, 90],
        rooms: [
            { room: "Horizon A", status: "Available", col: "#00E5FF" },
            { room: "Summit B", status: "Booked", col: T.blue },
            { room: "Apex C", status: "Booked", col: T.blue },
        ]
    },
    {
        stats: [
            { label: "Active Visitors", val: "135", sub: "↓ 4% vs yesterday", color: T.blue },
            { label: "Rooms Booked", val: "22/48", sub: "45% utilization", color: T.white },
            { label: "Open Tickets", val: "9", sub: "4 high priority", color: T.white },
            { label: "Facilities", val: "13", sub: "New: Pune Office", color: T.amber }
        ],
        visitors: [
            { init: "JB", name: "Jatin Bose", time: "13:20", status: "Checked In", sCol: T.blue, bCol: "#00E5FF20" },
            { init: "PR", name: "Priya Rao", time: "14:15", status: "Pre-registered", sCol: T.blue, bCol: "#00E5FF10" },
            { init: "VK", name: "Vikram Kohli", time: "12:05", status: "Checked Out", sCol: T.whiteMute, bCol: "rgba(255,255,255,0.05)" },
            { init: "MT", name: "Mira Tendulkar", time: "10:45", status: "At Meeting", sCol: T.purple, bCol: "rgba(215,108,241,0.15)" },
        ],
        bars: [80, 45, 60, 85, 40, 70, 50],
        rooms: [
            { room: "Horizon A", status: "Booked", col: T.blue },
            { room: "Summit B", status: "Available", col: "#00E5FF" },
            { room: "Apex C", status: "Available", col: "#00E5FF" },
        ]
    }
];

const Home = () => {
    const navigate = useNavigate();
    const interactiveRef = useRef(null);
    const [mockStep, setMockStep] = useState(0);
    const [mockLoading, setMockLoading] = useState(false);

    useEffect(() => {
        // Dashboard Content Cycle
        const cycleTimer = setInterval(() => {
            setMockLoading(true);
            setTimeout(() => {
                setMockStep(s => (s + 1) % MOCK_DATA.length);
                setMockLoading(false);
            }, 800); // skeleton loading duration
        }, 5000);

        // Core Gradient Movement
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        function move() {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            if (interactiveRef.current) {
                interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            }
            requestAnimationFrame(move);
        }

        const handleMouseMove = (event) => {
            tgX = event.clientX;
            tgY = event.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        move();

        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = "translateY(0)"; } });
        }, { threshold: 0.1 });
        document.querySelectorAll(".reveal").forEach(el => {
            el.style.opacity = 0; el.style.transform = "translateY(28px)"; el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
            obs.observe(el);
        });
        return () => {
            obs.disconnect();
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(cycleTimer);
        };
    }, []);

    const data = MOCK_DATA[mockStep];

    return (
        <div>
            {/* ── HERO ── */}
            <section id="hero" style={{
                position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
                padding: "120px 5% 80px", overflow: "hidden",
                background: `#060D1A`,
            }}>
                {/* CodePen Inspired Gooey Background - First Child */}
                <div className="gradient-bg">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
                                <feBlend in="SourceGraphic" in2="goo" />
                            </filter>
                        </defs>
                    </svg>
                    <div className="gradients-container">
                        <div className="g1"></div>
                        <div className="g2"></div>
                        <div className="g3"></div>
                        <div className="g4"></div>
                        <div className="g5"></div>
                        <div ref={interactiveRef} className="interactive"></div>
                    </div>
                </div>

                {/* High-End Blueprint Grid - On Top of Gradients */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(0,229,255,0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,229,255,0.08) 1px, transparent 1px),
                        linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
                    maskImage: "linear-gradient(to bottom, black, transparent)",
                    WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                    pointerEvents: "none",
                    opacity: 0.7,
                    zIndex: 1
                }} />

                {/* Vertical Scanning Pulse */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "linear-gradient(to bottom, transparent, rgba(0,229,255,0.1), transparent)",
                    backgroundSize: "100% 200px",
                    backgroundRepeat: "no-repeat",
                    animation: "shimmer 8s linear infinite",
                    pointerEvents: "none",
                    opacity: 0.4,
                    zIndex: 2
                }} />

                {/* Floating Corner Accents */}
                <div style={{ position: "absolute", top: "15%", left: "5%", width: 60, height: 60, borderLeft: "2px solid rgba(0,229,255,0.2)", borderTop: "2px solid rgba(0,229,255,0.2)", pointerEvents: "none", opacity: 0.5, zIndex: 3 }} />
                <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 60, height: 60, borderRight: "2px solid rgba(0,229,255,0.2)", borderBottom: "2px solid rgba(0,229,255,0.2)", pointerEvents: "none", opacity: 0.5, zIndex: 3 }} />


                <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%", textAlign: "center", position: "relative", zIndex: 10 }}>
                    <div className="reveal">
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 100,
                            background: `rgba(30,141,231,0.08)`, border: `1px solid rgba(30,141,231,0.22)`, marginBottom: 24
                        }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.blue, display: "inline-block", animation: "glowPulse 2s ease-in-out infinite" }} />
                            <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.blue }}>Intelligent Facility Management Platform</span>
                        </div>
                        <h1 style={{
                            fontFamily: "Sora", fontSize: "clamp(2.5rem,6vw,4.2rem)", fontWeight: 800, letterSpacing: "-0.05em",
                            color: T.white, lineHeight: 1.02, marginBottom: 24
                        }}>
                            Your Facilities,<br />
                            <span style={{ color: T.blue }}>Intelligently</span> Managed.
                        </h1>
                        <p style={{ fontSize: "1.1rem", color: T.whiteDim, lineHeight: 1.8, fontWeight: 300, marginBottom: 40, maxWidth: 640, margin: "0 auto 40px" }}>
                            Nexspace unifies visitor management, room booking, helpdesk, and facility operations into one powerful multi-tenant platform — built for the modern enterprise.
                        </p>
                        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}>
                            <Btn onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Request a Demo</Btn>
                            <Btn variant="ghost" onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })}>
                                See How It Works →
                            </Btn>
                        </div>
                    </div>

                    {/* Dashboard Mockup - Center Aligned */}
                    <div className="reveal float" style={{
                        maxWidth: 900, margin: "0 auto",
                        background: "#0a1322", border: `1px solid ${T.border}`, borderRadius: 20,
                        boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                        overflow: "hidden", position: "relative"
                    }}>
                        {/* Title Bar */}
                        <div style={{ background: "#0d1829", padding: "12px 20px", display: "flex", alignItems: "center", gap: 16, borderBottom: `1px solid ${T.border}` }}>
                            <div style={{ display: "flex", gap: 6 }}>
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                            </div>
                            <div style={{ fontSize: "0.72rem", color: T.whiteMute, fontWeight: 500, letterSpacing: "0.02em" }}>Nexspace — Facility Dashboard</div>
                        </div>

                        {/* Dashboard Body */}
                        <div style={{ padding: 28, textAlign: "left" }}>
                            {/* Stats Row */}
                            <div className="responsive-grid" style={{ "--cols": 4, "--cols-md": 2, "--gap": "16px", marginBottom: 28 }}>
                                {data.stats.map((s, i) => (
                                    <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${T.border}`, borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                                        <div style={{ fontSize: "0.62rem", color: T.whiteMute, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 8 }}>{s.label}</div>
                                        {mockLoading ? (
                                            <>
                                                <div className="skeleton-box" style={{ height: 32, width: "60%", margin: "0 auto 8px" }} />
                                                <div className="skeleton-box" style={{ height: 12, width: "80%", margin: "0 auto" }} />
                                            </>
                                        ) : (
                                            <div className="animate-fade-in">
                                                <div style={{ fontFamily: "Sora", fontSize: "1.8rem", fontWeight: 800, color: s.color, letterSpacing: "-0.04em", marginBottom: 4 }}>{s.val}</div>
                                                <div style={{ fontSize: "0.68rem", color: T.whiteMute }}>{s.sub}</div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Main Grid */}
                            <div className="responsive-grid" style={{ "--cols": 5, "--cols-md": 1, "--gap": "20px" }}>
                                {/* Visitor List */}
                                <div style={{ gridColumn: "span 3", background: "rgba(255,255,255,0.02)", border: `1px solid ${T.border}`, borderRadius: 16, padding: 24, minHeight: 280 }}>
                                    <div style={{ fontSize: "0.75rem", color: T.whiteMute, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20, textAlign: "center" }}>Today's Visitors</div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        {data.visitors.map((v, i) => (
                                            <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? `1px solid rgba(255,255,255,0.03)` : "none" }}>
                                                {mockLoading ? (
                                                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                                        <div className="skeleton-box" style={{ width: 32, height: 32, borderRadius: "50%" }} />
                                                        <div className="skeleton-box" style={{ flex: 1, height: 16 }} />
                                                        <div className="skeleton-box" style={{ width: 40, height: 12 }} />
                                                        <div className="skeleton-box" style={{ width: 80, height: 20, borderRadius: 100 }} />
                                                    </div>
                                                ) : (
                                                    <div className="animate-fade-in" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: i === 0 ? T.blue : i === 1 ? "#1E9BE9" : i === 2 ? T.purple : "#F59E0B", color: T.navy, fontSize: "0.75rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{v.init}</div>
                                                        <div style={{ flex: 1, fontSize: "0.9rem", color: T.white, fontWeight: 700 }}>{v.name}</div>
                                                        <div style={{ fontSize: "0.75rem", color: T.whiteMute }}>{v.time}</div>
                                                        <div style={{ fontSize: "0.65rem", padding: "4px 10px", borderRadius: 100, background: v.bCol, color: v.sCol, fontWeight: 700 }}>{v.status}</div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Meeting Chart */}
                                <div style={{ gridColumn: "span 2", background: "rgba(255,255,255,0.02)", border: `1px solid ${T.border}`, borderRadius: 16, padding: 24, minHeight: 280 }}>
                                    <div style={{ fontSize: "0.75rem", color: T.whiteMute, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20, textAlign: "center" }}>Meeting Rooms</div>
                                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 4, height: 60, marginBottom: 24, padding: "0 10px" }}>
                                        {data.bars.map((h, i) => (
                                            mockLoading ? (
                                                <div key={i} className="skeleton-box" style={{ width: "12%", height: `${Math.max(20, h - 30)}%`, borderRadius: "2px 2px 0 0" }} />
                                            ) : (
                                                <div key={i} className="animate-fade-in" style={{ width: "12%", height: `${h}%`, background: i === 2 || i === 4 || i === 6 ? T.blue : "rgba(30,141,231,0.2)", borderRadius: "2px 2px 0 0", transition: "height 0.5s ease" }} />
                                            )
                                        ))}
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                        {data.rooms.map((r, i) => (
                                            <div key={i} style={{ height: 18 }}>
                                                {mockLoading ? (
                                                    <div style={{ display: "flex", justifyContent: "space-between", height: "100%", alignItems: "center" }}>
                                                        <div className="skeleton-box" style={{ width: 80, height: 14 }} />
                                                        <div className="skeleton-box" style={{ width: 60, height: 14 }} />
                                                    </div>
                                                ) : (
                                                    <div className="animate-fade-in" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", height: "100%", alignItems: "center" }}>
                                                        <span style={{ color: T.whiteDim }}>{r.room}</span>
                                                        <span style={{ color: r.col, fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase" }}>{r.status}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TRUST STRIP ── */}
            <div style={{ background: T.navyMid, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "48px 5%" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: T.whiteMute, marginBottom: 32 }}>Why teams choose Nexspace</div>
                    <div className="responsive-grid" style={{ "--cols": 4, "--cols-md": 2, "--gap": "0px" }}>
                        {[
                            { icon: "Zap", title: "Up & Running in Days", desc: "Get your first facility live within a week, not months." },
                            { icon: "ShieldCheck", title: "DPDP Compliant", desc: "Built for India's data protection law from the ground up." },
                            { icon: "Puzzle", title: "Modular by Design", desc: "Enable only what you need. Scale as you grow." },
                            { icon: "Handshake", title: "Hands-On Onboarding", desc: "Real people, real support — no ticket queues." },
                        ].map((t, i, arr) => (
                            <div key={i} className="reveal mobile-padding" style={{ textAlign: "center", padding: "8px 28px", borderRight: i < arr.length - 1 ? `1px solid ${T.border}` : "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 42, height: 42, borderRadius: 10, background: T.blueDim, border: `1px solid rgba(0,229,255,0.2)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Icon name={t.icon} size={20} color={T.blue} />
                                </div>
                                <div style={{ fontFamily: "Sora", fontSize: "0.9rem", fontWeight: 700, color: T.white, letterSpacing: "-0.02em" }}>{t.title}</div>
                                <div style={{ fontSize: "0.78rem", color: T.whiteMute, fontWeight: 300, lineHeight: 1.55, maxWidth: 180 }}>{t.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MODULES ── */}
            <section id="modules" style={{ padding: "120px 5%", background: T.navy }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }} className="reveal">
                        <Tag>Core Modules</Tag>
                        <h2 style={{ fontFamily: "Sora", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.035em", color: T.white, marginBottom: 12 }}>
                            Everything your facility needs.
                        </h2>
                        <p style={{ fontSize: "0.95rem", color: T.whiteDim, fontWeight: 300, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
                            Six purpose-built modules, each a product in its own right. Use one or all of them — they work better together.
                        </p>
                    </div>
                    <div className="responsive-grid" style={{ "--cols": 3, "--cols-lg": 2, "--cols-md": 1, "--gap": "20px" }}>
                        {MODULES.map((m, i) => (
                            <div key={m.id} className="reveal" style={{
                                animationDelay: `${i * 0.08}s`,
                                background: T.navyCard, border: `1px solid ${T.border}`, borderRadius: 16, padding: 28,
                                cursor: "pointer", transition: "all 0.3s", position: "relative", overflow: "hidden"
                            }}
                                onClick={() => {
                                    const paths = {
                                        visitor: "/visitor-management",
                                        rooms: "/meeting-room-booking",
                                        helpdesk: "/helpdesk-ticketing",
                                        facility: "/facility-management",
                                        roles: "/role-user-management",
                                        analytics: "/analytics-insights"
                                    };
                                    navigate(paths[m.id]);
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(0,229,255,0.25)`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.3)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                                <div style={{ marginBottom: 14 }}>
                                    <Icon name={m.icon} size={32} color={m.color} />
                                </div>
                                <div style={{ fontFamily: "Sora", fontSize: "1rem", fontWeight: 700, color: T.white, letterSpacing: "-0.02em", marginBottom: 8 }}>{m.name}</div>
                                <div style={{ fontSize: "0.82rem", color: T.whiteDim, lineHeight: 1.65, fontWeight: 300, marginBottom: 20 }}>{m.heroDesc}</div>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: T.blue, fontWeight: 600 }}>
                                    Learn more <span style={{ transition: "transform 0.2s" }}>→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECURITY ── */}
            <section id="security" style={{ padding: "120px 5%", background: T.navyMid, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "50%", right: "-5%", transform: "translateY(-50%)", width: 500, height: 500, background: "radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
                <div className="responsive-grid" style={{ maxWidth: 1100, margin: "0 auto", "--cols": 2, "--cols-md": 1, "--gap": "64px", alignItems: "center" }}>
                    <div className="reveal">
                        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                            <Badge>DPDP Compliant</Badge>
                            <Badge color={T.whiteMute}>End-to-End Secure</Badge>
                            <Badge color={T.whiteMute}>India-First</Badge>
                        </div>
                        <Tag>Security & Compliance</Tag>
                        <h2 style={{ fontFamily: "Sora", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.04em", color: T.white, lineHeight: 1.1, marginBottom: 16 }}>
                            Built secure.<br />Compliant by design.
                        </h2>
                        <p style={{ fontSize: "0.9rem", color: T.whiteDim, lineHeight: 1.8, fontWeight: 300, marginBottom: 36 }}>
                            Nexspace is architected around India's Digital Personal Data Protection Act — so your facility data is always protected, private, and in your control.
                        </p>
                        {[
                            { icon: "UserCog", title: "Role-Based Access Control", desc: "Every user gets exactly the access they need — Admins, SPOCs, and Frontdesk operate in fully scoped contexts." },
                            { icon: "ShieldCheck", title: "OTP & Passcode Verification", desc: "Visitor entry secured with time-bound OTPs — only authorised individuals gain access." },
                            { icon: "Fingerprint", title: "JWT Token Authentication", desc: "Separate App IDs ensure Admin Console and Tenant App are fully isolated." },
                        ].map((p, i) => (
                            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: T.blueDim, border: `1px solid rgba(0,229,255,0.18)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                                    <Icon name={p.icon} size={18} color={T.blue} />
                                </div>
                                <div>
                                    <div style={{ fontFamily: "Sora", fontSize: "0.9rem", fontWeight: 700, color: T.white, letterSpacing: "-0.02em", marginBottom: 3 }}>{p.title}</div>
                                    <div style={{ fontSize: "0.8rem", color: T.whiteDim, fontWeight: 300, lineHeight: 1.6 }}>{p.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="reveal" style={{ background: T.navyCard, border: `1px solid ${T.border}`, borderRadius: 16, padding: "28px 5%", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${T.blue},transparent)`, opacity: 0.4 }} />
                        <div style={{ fontSize: "0.65rem", color: T.whiteMute, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.blue, display: "inline-block", animation: "glowPulse 2s ease-in-out infinite" }} />
                            Compliance Status — Live
                        </div>
                        <div style={{ background: `rgba(0,229,255,0.07)`, border: `1px solid rgba(0,229,255,0.2)`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 8, background: T.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: T.navy, fontWeight: 800, fontFamily: "Sora", flexShrink: 0 }}>D</div>
                                <div>
                                    <div style={{ fontFamily: "Sora", fontSize: "0.9rem", fontWeight: 700, color: T.white }}>DPDP Act, 2023</div>
                                    <div style={{ fontSize: "0.65rem", color: T.whiteMute }}>Digital Personal Data Protection Act — India</div>
                                </div>
                            </div>
                            <p style={{ fontSize: "0.78rem", color: T.whiteDim, lineHeight: 1.6, fontWeight: 300 }}>Built in alignment with India's landmark data privacy legislation.</p>
                        </div>
                        {["Lawful purpose for all personal data", "Consent-based visitor data capture", "Data minimisation — only what's necessary", "Tenant-level data isolation enforced", "Secure credential storage, no plain-text", "Audit-ready access logs per facility"].map((c, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.8rem", color: T.whiteDim, padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: `1px solid ${T.border}`, marginBottom: 6 }}>
                                <div style={{ width: 18, height: 18, borderRadius: "50%", background: `rgba(0,229,255,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: T.blue, flexShrink: 0 }}>✓</div>
                                {c}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MOBILE APPS ── */}
            <section id="apps" style={{ padding: "120px 5%", background: T.navy, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: "-10%", left: "50%", transform: "translateX(-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }} className="reveal">
                        <Tag>Mobile Apps</Tag>
                        <h2 style={{ fontFamily: "Sora", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.035em", color: T.white, marginBottom: 12 }}>Your facility, in your pocket.</h2>
                        <p style={{ fontSize: "0.95rem", color: T.whiteDim, fontWeight: 300, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>Purpose-built apps for tenants and operations teams — launching soon.</p>
                    </div>
                    <div className="responsive-grid" style={{ "--cols": 2, "--cols-md": 1, "--gap": "32px" }}>
                        {[
                            {
                                name: "Nexspace",
                                accent: T.blue,
                                accentRgb: "30,141,231",
                                icon: "Smartphone",
                                audience: "Tenants & Visitors",
                                tagline: "Employee Experience & Access",
                                desc: "Empower your workforce with self-service tools that eliminate operational friction and enhance safety.",
                                feats: [
                                    { title: "Smart Access", desc: "Digital keys and meeting room QR check-ins." },
                                    { title: "One-Click Booking", desc: "Reserve rooms or hot desks in under 5 seconds." },
                                    { title: "Guest Invitations", desc: "Automated visitor invites with secure OTPs." },
                                    { title: "Instant Helpdesk", desc: "Raise tickets with photos directly to operations." }
                                ]
                            },
                            {
                                name: "Opstrack",
                                accent: "#00E5FF",
                                accentRgb: "0,229,255",
                                icon: "LayoutDashboard",
                                audience: "Operations & Admin",
                                tagline: "Field Operations & Control",
                                desc: "The ultimate command center for on-ground staff to manage every inch of your facility in real-time.",
                                feats: [
                                    { title: "Live Verify", desc: "Real-time visitor identity & credential validation." },
                                    { title: "Task Dispatch", desc: "Automated ticket routing for maintenance teams." },
                                    { title: "Facility Ops", desc: "Full operational visibility across all inventory." },
                                    { title: "Audit Readiness", desc: "Instant digital logs for every facility event." }
                                ]
                            },
                        ].map((app, i) => (
                            <div key={i} className="reveal" style={{
                                background: `rgba(255,255,255,0.02)`,
                                border: `1px solid ${T.border}`,
                                borderRadius: 24,
                                padding: "48px 40px",
                                position: "relative",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = `rgba(${app.accentRgb}, 0.3)`;
                                    e.currentTarget.style.background = `rgba(${app.accentRgb}, 0.04)`;
                                    e.currentTarget.style.transform = "translateY(-8px)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = T.border;
                                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                                    e.currentTarget.style.transform = "none";
                                }}>

                                {/* Technical Accent Lines */}
                                <div style={{ position: "absolute", top: 0, left: 40, width: 60, height: 2, background: `linear-gradient(90deg, ${app.accent}, transparent)` }} />
                                <div style={{ position: "absolute", bottom: 0, right: 40, width: 60, height: 2, background: `linear-gradient(90deg, transparent, ${app.accent})` }} />

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 32 }}>
                                    <div style={{ width: 64, height: 64, borderRadius: 16, background: `rgba(${app.accentRgb}, 0.1)`, border: `1px solid rgba(${app.accentRgb}, 0.15)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Icon name={app.icon} size={32} color={app.accent} />
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontSize: "0.68rem", fontWeight: 800, color: app.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>{app.audience}</div>
                                        <div style={{ fontSize: "0.78rem", color: T.whiteMute, fontWeight: 500 }}>Native iOS & Android</div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: 24 }}>
                                    <h3 style={{ fontFamily: "Sora", fontSize: "1.8rem", fontWeight: 800, color: T.white, marginBottom: 8, letterSpacing: "-0.03em" }}>{app.name}</h3>
                                    <div style={{ fontSize: "0.95rem", color: app.accent, fontWeight: 600, letterSpacing: "-0.01em", opacity: 0.9 }}>{app.tagline}</div>
                                </div>

                                <p style={{ fontSize: "0.9rem", color: T.whiteDim, lineHeight: 1.7, fontWeight: 300, marginBottom: 40, maxWidth: "90%" }}>
                                    {app.desc}
                                </p>

                                <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48, flex: 1 }}>
                                    {app.feats.map((f, j) => (
                                        <div key={j} style={{ display: "flex", gap: 14 }}>
                                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: app.accent, marginTop: 8, flexShrink: 0 }} />
                                            <div>
                                                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: T.white, marginBottom: 4 }}>{f.title}</div>
                                                <div style={{ fontSize: "0.82rem", color: T.whiteMute, fontWeight: 300 }}>{f.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ paddingTop: 32, borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "glowPulse 2s infinite" }} />
                                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: T.white, letterSpacing: "0.02em" }}>AVAILABLE Q3 2026</span>
                                    </div>
                                    <div style={{ display: "flex", gap: 12 }}>
                                        <Icon name="Apple" size={18} color={T.whiteMute} />
                                        <Icon name="PlayCircle" size={18} color={T.whiteMute} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRICING ── */}
            <section id="pricing" style={{ padding: "120px 5%", background: T.navyMid }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }} className="reveal">
                        <Tag>Pricing</Tag>
                        <h2 style={{ fontFamily: "Sora", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.035em", color: T.white, marginBottom: 12 }}>Simple, transparent pricing.</h2>
                        <p style={{ fontSize: "0.95rem", color: T.whiteDim, fontWeight: 300, lineHeight: 1.7 }}>Start free, scale as you grow. No hidden fees, no lock-in.</p>
                    </div>
                    <div className="responsive-grid" style={{ "--cols": 3, "--cols-lg": 2, "--cols-md": 1, "--gap": "20px" }}>
                        {[
                            {
                                plan: "Starter", price: "₹0", period: "/mo", desc: "For small teams exploring Nexspace.", featured: false,
                                feats: ["1 Facility", "Up to 10 users", "Visitor Management", "Meeting Room Booking"],
                                missing: ["Helpdesk & Ticketing", "Analytics Dashboard", "Priority Support"], cta: "Get Started Free", ctaStyle: "ghost"
                            },
                            {
                                plan: "Growth", price: "₹4,999", period: "/mo", desc: "For growing organisations.", featured: true,
                                feats: ["Up to 5 Facilities", "Up to 100 users", "Visitor Management", "Meeting Room Booking", "Helpdesk & Ticketing", "Analytics Dashboard"],
                                missing: ["Priority Support"], cta: "Request a Demo", ctaStyle: "primary"
                            },
                            {
                                plan: "Enterprise", price: "Custom", period: "", desc: "For large enterprises.", featured: false,
                                feats: ["Unlimited Facilities", "Unlimited users", "All modules included", "DPDP compliance support", "Dedicated onboarding", "Priority Support + SLA"],
                                missing: [], cta: "Talk to Sales", ctaStyle: "ghost"
                            },
                        ].map((p, i) => (
                            <div key={i} className="reveal" style={{
                                background: p.featured ? `linear-gradient(160deg,#0f2040 0%,${T.navyCard} 100%)` : T.navyCard,
                                border: `1px solid ${p.featured ? "rgba(0,229,255,0.4)" : T.border}`,
                                borderRadius: 18, padding: "36px 30px", position: "relative", overflow: "hidden",
                                display: "flex", flexDirection: "column",
                                transform: p.featured ? "scale(1.02)" : "none",
                            }}>
                                {p.featured && <>
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${T.blue},transparent)` }} />
                                    <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: T.blue, color: T.navy, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 16px", borderRadius: "0 0 8px 8px" }}>Most Popular</div>
                                </>}
                                <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: p.featured ? T.blue : T.whiteMute, marginBottom: 12 }}>{p.plan}</div>
                                <div style={{ fontFamily: "Sora", fontSize: "2.6rem", fontWeight: 800, color: T.white, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4 }}>
                                    {p.price}<span style={{ fontSize: "0.85rem", color: T.whiteMute, fontWeight: 400, letterSpacing: 0 }}>{p.period}</span>
                                </div>
                                <div style={{ fontSize: "0.82rem", color: T.whiteMute, margin: "10px 0 20px", fontWeight: 300 }}>{p.desc}</div>
                                <div style={{ height: 1, background: T.border, marginBottom: 20 }} />
                                <ul style={{ listStyle: "none", flex: 1, marginBottom: 28 }}>
                                    {p.feats.map((f, j) => <li key={j} style={{ display: "flex", gap: 10, fontSize: "0.83rem", color: T.whiteDim, marginBottom: 10 }}><span style={{ color: T.blue, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}</li>)}
                                    {p.missing.map((f, j) => <li key={j} style={{ display: "flex", gap: 10, fontSize: "0.83rem", color: T.whiteMute, marginBottom: 10 }}><span style={{ color: T.whiteMute, flexShrink: 0 }}>–</span>{f}</li>)}
                                </ul>
                                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{
                                    padding: "13px 24px", borderRadius: 8, fontFamily: "Sora", fontWeight: 700, fontSize: "0.9rem",
                                    cursor: "pointer", transition: "all 0.2s",
                                    background: p.featured ? T.blue : "transparent",
                                    color: p.featured ? T.navy : T.white,
                                    border: p.featured ? "none" : `1px solid ${T.border}`,
                                }}
                                    onMouseEnter={e => { if (!p.featured) { e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; e.currentTarget.style.background = "rgba(0,229,255,0.06)"; } else { e.currentTarget.style.opacity = "0.85"; } }}
                                    onMouseLeave={e => { if (!p.featured) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = "transparent"; } else { e.currentTarget.style.opacity = "1"; } }}>
                                    {p.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                    <p style={{ textAlign: "center", fontSize: "0.78rem", color: T.whiteMute, marginTop: 28 }} className="reveal">
                        All prices exclusive of GST. Annual billing available at 20% discount. &nbsp;
                        <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "none", border: "none", color: T.blue, cursor: "pointer", fontSize: "0.78rem", fontFamily: "DM Sans" }}>Need a custom module bundle? Contact us.</button>
                    </p>
                </div>
            </section>

            {/* ── ROADMAP ── */}
            <section id="roadmap" style={{ padding: "120px 5%", background: T.navy }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 64px" }} className="reveal">
                        <Tag>Product Roadmap</Tag>
                        <h2 style={{ fontFamily: "Sora", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.035em", color: T.white, marginBottom: 12 }}>What we're building — openly.</h2>
                        <p style={{ fontSize: "0.95rem", color: T.whiteDim, fontWeight: 300, lineHeight: 1.7 }}>We believe in full transparency. Here's what's live and what's coming next.</p>
                    </div>
                    {[
                        {
                            phase: "Live Now", phaseColor: T.blue, phaseRgb: "0,229,255", items: [
                                { icon: "Users", title: "Visitor Management", q: "Available Today", desc: "Secure check-ins and digital logbooks for your lobby." },
                                { icon: "Calendar", title: "Meeting Room Booking", q: "Available Today", desc: "Real-time room availability and calendar sync." },
                                { icon: "Ticket", title: "Helpdesk & Ticketing", q: "Available Today", desc: "Streamlined issue reporting and maintenance tracking." },
                            ]
                        },
                        {
                            phase: "Coming Soon", phaseColor: T.amber, phaseRgb: "255,234,0", items: [
                                { icon: "Gamepad2", title: "Gaming Room Bookings", q: "Q2 2026", desc: "Enable employees to book recreational spaces easily." },
                                { icon: "HardDrive", title: "Asset Management", q: "Q3 2026", desc: "Track and manage facility assets with precision." },
                            ]
                        },
                        {
                            phase: "Planned", phaseColor: T.whiteMute, phaseRgb: "240,246,255", items: [
                                { icon: "Package", title: "Procurement", q: "Q4 2026", desc: "Integrated vendor management and purchase approvals." },
                            ]
                        },
                    ].map((phase, pi) => (
                        <div key={pi} style={{ marginBottom: 48 }} className="reveal">
                            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                                <div style={{ flex: 1, height: 1, background: T.border }} />
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: 7, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, whiteSpace: "nowrap",
                                    background: `rgba(${phase.phaseRgb},0.08)`, color: phase.phaseColor, border: `1px solid rgba(${phase.phaseRgb},0.22)`
                                }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: phase.phaseColor, display: "inline-block" }} />
                                    {phase.phase}
                                </div>
                                <div style={{ flex: 1, height: 1, background: T.border }} />
                            </div>
                            <div className="responsive-grid" style={{ "--cols": phase.items.length, "--cols-lg": Math.min(phase.items.length, 2), "--cols-md": 1, "--gap": "16px" }}>
                                {phase.items.map((item, ii) => (
                                    <div key={ii} style={{
                                        background: T.navyCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: 24,
                                        ...(phase.phase === "Live Now" ? { borderColor: `rgba(${phase.phaseRgb},0.18)` } : {}),
                                        position: "relative", overflow: "hidden", transition: "all 0.3s"
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.25)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                                        {phase.phase === "Live Now" && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${phase.phaseColor},transparent)` }} />}
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                            <div style={{ width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `rgba(${phase.phaseRgb},0.08)`, border: `1px solid rgba(${phase.phaseRgb},0.18)` }}>
                                                <Icon name={item.icon} size={22} color={phase.phaseColor} />
                                            </div>
                                            <div style={{ fontSize: "0.65rem", color: T.whiteMute, letterSpacing: "0.06em" }}>{item.q}</div>
                                        </div>
                                        <div style={{ fontFamily: "Sora", fontSize: "0.95rem", fontWeight: 700, color: T.white, letterSpacing: "-0.02em", marginBottom: 6 }}>{item.title}</div>
                                        <div style={{ fontSize: "0.78rem", color: T.whiteDim, fontWeight: 300, lineHeight: 1.5 }}>{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "26px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", background: "rgba(0,229,255,0.06)", border: `1px solid rgba(0,229,255,0.15)`, borderRadius: 14 }} className="reveal">
                        <div>
                            <div style={{ fontFamily: "Sora", fontSize: "0.95rem", fontWeight: 700, color: T.white, letterSpacing: "-0.02em", marginBottom: 3 }}>Have a feature in mind?</div>
                            <div style={{ fontSize: "0.82rem", color: T.whiteMute, fontWeight: 300 }}>We build with our customers — your input shapes what we prioritise next.</div>
                        </div>
                        <Btn onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Suggest a Feature →</Btn>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" style={{ padding: "120px 5%", background: T.navyMid }}>
                <div style={{ maxWidth: 760, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 56 }} className="reveal">
                        <Tag>FAQ</Tag>
                        <h2 style={{ fontFamily: "Sora", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.035em", color: T.white }}>Questions we get asked.</h2>
                    </div>
                    <FaqList />
                </div>
            </section>

            {/* ── CONTACT ── */}
            <section id="contact" style={{ padding: "120px 5%", background: T.navy, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div className="responsive-grid" style={{ maxWidth: 1100, margin: "0 auto", "--cols": 2, "--cols-md": 1, "--gap": "64px", alignItems: "start", position: "relative" }}>
                    <div className="reveal">
                        <Tag centered={false} showLine={false}>Request a Demo</Tag>
                        <h2 style={{ fontFamily: "Sora", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.04em", color: T.white, lineHeight: 1.1, marginBottom: 16 }}>
                            Let's show you what Nexspace can do.
                        </h2>
                        <p style={{ fontSize: "0.9rem", color: T.whiteDim, lineHeight: 1.8, fontWeight: 300, marginBottom: 36 }}>
                            We'll walk you through the platform, answer every question, and set up a trial tailored to your facility.
                        </p>
                        {[
                            { icon: "Timer", title: "Same-day response", desc: "We respond to every demo request within a few hours during business hours." },
                            { icon: "Target", title: "Tailored walkthrough", desc: "We customise the demo to your industry, facility size, and specific use case." },
                            { icon: "Handshake", title: "No commitment required", desc: "No pressure, no contracts. Just a real conversation." },
                        ].map((pt, i) => (
                            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 22 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: T.blueDim, border: `1px solid rgba(0,229,255,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <Icon name={pt.icon} size={20} color={T.blue} />
                                </div>
                                <div>
                                    <div style={{ fontFamily: "Sora", fontSize: "0.88rem", fontWeight: 700, color: T.white, marginBottom: 3 }}>{pt.title}</div>
                                    <div style={{ fontSize: "0.8rem", color: T.whiteMute, fontWeight: 300, lineHeight: 1.6 }}>{pt.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ContactForm />
                </div>
            </section>
        </div>
    );
};

export default Home;
