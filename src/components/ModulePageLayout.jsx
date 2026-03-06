import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { T } from '../data/modules';
import { Badge, Tag } from '../components/Shared';
import { Btn } from '../components/Buttons';
import { Icon } from './Icon';
import { ContactForm } from './ContactForm';

export const ModulePageLayout = ({ module }) => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!module) return null;

    const moduleRgb = module.color === T.blue ? "30,155,233" : module.color === T.purple ? "139,92,246" : "245,158,11";

    return (
        <div style={{ background: T.navy, minHeight: "100vh", paddingTop: 100 }}>
            <section style={{ padding: "80px 5% 120px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", height: 600, background: `radial-gradient(circle at 50% 30%, rgba(${moduleRgb},0.08) 0%, transparent 60%)`, pointerEvents: "none" }} />
                <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 24 }}>
                            <Badge color={module.color}>{module.name}</Badge>
                            <Badge color={T.whiteMute}>Enterprise Ready</Badge>
                        </div>
                        <div style={{ marginBottom: 28, display: "flex", justifyContent: "center" }}>
                            <Icon name={module.icon} size={64} color={module.color} strokeWidth={1.5} />
                        </div>
                        <h1 style={{ fontFamily: "Sora", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: T.white, lineHeight: 1.05, marginBottom: 20 }}>
                            {module.tagline}
                        </h1>
                        <p style={{ fontSize: "1.1rem", color: T.whiteDim, lineHeight: 1.8, fontWeight: 300, maxWidth: 640, margin: "0 auto 36px" }}>
                            {module.heroDesc}
                        </p>
                        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                            <Btn onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Request Details →</Btn>
                            <Btn variant="ghost" onClick={() => navigate('/')}>Back to Overview</Btn>
                        </div>
                    </div>

                    <div style={{ background: T.navyCard, border: `1px solid ${T.border}`, borderRadius: 24, padding: "5% 6%", position: "relative", overflow: "hidden", marginBottom: 120 }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${module.color},transparent)`, opacity: 0.3 }} />
                        <div className="responsive-grid" style={{ "--cols": 2, "--cols-md": 1, "--gap": "64px", alignItems: "start" }}>
                            <div>
                                <Tag centered={false}>{module.name} Features</Tag>
                                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                                    {module.features.map((f, i) => (
                                        <div key={i} style={{ display: "flex", gap: 18 }}>
                                            <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(${moduleRgb},0.1)`, border: `1px solid rgba(${moduleRgb},0.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <Icon name={f.icon} size={20} color={module.color} />
                                            </div>
                                            <div>
                                                <div style={{ fontFamily: "Sora", fontSize: "0.95rem", fontWeight: 700, color: T.white, letterSpacing: "-0.01em", marginBottom: 5 }}>{f.title}</div>
                                                <div style={{ fontSize: "0.85rem", color: T.whiteDim, lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Tag centered={false}>Practical Impact</Tag>
                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    {module.useCases.map((u, i) => (
                                        <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${T.border}`, borderRadius: 16, padding: 24, transition: "border-color 0.2s" }}
                                            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"}
                                            onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                                            <div style={{ fontSize: "0.68rem", fontWeight: 700, color: T.whiteMute, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Workflow — {u.role}</div>
                                            <p style={{ fontSize: "0.88rem", color: T.white, lineHeight: 1.7, fontWeight: 300 }}>"{u.scenario}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How it works section */}
                    <div style={{ marginBottom: 120 }}>
                        <div style={{ textAlign: "center", marginBottom: 64 }}>
                            <Tag>The Process</Tag>
                            <h2 style={{ fontFamily: "Sora", fontSize: "2rem", fontWeight: 800, color: T.white }}>How it works.</h2>
                        </div>
                        <div className="responsive-grid" style={{ "--cols": 3, "--cols-md": 1, "--gap": "32px" }}>
                            {[
                                { step: "01", title: "Swift Setup", desc: "Configure your facility rules and brand aesthetics in minutes." },
                                { step: "02", title: "Team Rollout", desc: "Onboard your front-desk and support staff with zero training downtime." },
                                { step: "03", title: "Real-time Ops", desc: "Monitor activity, manage bookings, and solve tickets as they happen." }
                            ].map((s, i) => (
                                <div key={i} style={{ position: "relative", padding: "32px", background: T.navyMid, border: `1px solid ${T.border}`, borderRadius: 16 }}>
                                    <div style={{ fontFamily: "Sora", fontSize: "2.5rem", fontWeight: 800, color: `${module.color}20`, position: "absolute", top: 10, right: 20 }}>{s.step}</div>
                                    <div style={{ fontFamily: "Sora", fontSize: "1.1rem", fontWeight: 700, color: T.white, marginBottom: 12 }}>{s.title}</div>
                                    <div style={{ fontSize: "0.9rem", color: T.whiteDim, fontWeight: 300, lineHeight: 1.6 }}>{s.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div id="contact" style={{
                        background: `linear-gradient(135deg, ${T.navyCard} 0%, ${T.navy} 100%)`,
                        border: `1px solid ${T.border}`,
                        borderRadius: 24,
                        padding: "64px 8%",
                        position: "relative",
                        overflow: "hidden"
                    }}>
                        <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, background: `radial-gradient(circle, ${module.color}10 0%, transparent 70%)`, pointerEvents: "none" }} />
                        <div className="responsive-grid" style={{ "--cols": 2, "--cols-md": 1, "--gap": "64px", alignItems: "center" }}>
                            <div>
                                <Tag centered={false} showLine={false}>Get Started</Tag>
                                <h2 style={{ fontFamily: "Sora", fontSize: "2.2rem", fontWeight: 800, color: T.white, lineHeight: 1.1, marginBottom: 20 }}>
                                    Ready to experience {module.name}?
                                </h2>
                                <p style={{ fontSize: "1rem", color: T.whiteDim, lineHeight: 1.7, fontWeight: 300, marginBottom: 32 }}>
                                    Join forward-thinking facility managers and digitalise your operations today. Book a personalized walkthrough of the Nexspace platform.
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    {["DPDP Compliant Data Storage", "Cloud-Native Infrastructure", "Priority Onboarding Support"].map((point, idx) => (
                                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.85rem", color: T.whiteMute }}>
                                            <Icon name="CheckCircle2" size={16} color={module.color} /> {point}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
