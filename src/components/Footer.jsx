import { T } from '../data/modules';
import { Logo, Badge } from './Shared';
import { Icon } from './Icon';

export const Footer = () => {
    const cols = [
        { title: "Product", links: ["Visitor Management", "Room Booking", "Helpdesk", "Analytics", "Pricing"] },
        { title: "Company", links: ["About", "Security", "DPDP Compliance", "Roadmap", "Careers"] },
        { title: "Support", links: ["Documentation", "Contact Us", "Status", "Privacy Policy", "Terms"] },
    ];

    return (
        <footer style={{ background: T.navyMid, borderTop: `1px solid ${T.border}`, padding: "64px 5% 32px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
                    <div>
                        <Logo onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
                        <p style={{ marginTop: 16, fontSize: "0.82rem", color: T.whiteMute, lineHeight: 1.7, fontWeight: 300, maxWidth: 280 }}>
                            Intelligent facility management for the modern enterprise. Built for scale, designed for people.
                        </p>
                    </div>
                    {cols.map((col, i) => (
                        <div key={i}>
                            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.whiteMute, marginBottom: 16 }}>{col.title}</div>
                            {col.links.map((l, j) => (
                                <div key={j} style={{ marginBottom: 10 }}>
                                    <button style={{ background: "none", border: "none", fontSize: "0.83rem", color: T.whiteMute, cursor: "pointer", fontFamily: "DM Sans", fontWeight: 300, transition: "color 0.2s", textAlign: "left" }}
                                        onMouseEnter={e => e.target.style.color = T.white} onMouseLeave={e => e.target.style.color = T.whiteMute}>{l}</button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: `1px solid ${T.border}`, flexWrap: "wrap", gap: 12 }}>
                    <p style={{ fontSize: "0.78rem", color: T.whiteMute, display: "flex", alignItems: "center", gap: 6 }}>
                        © 2026 Nexspace. All rights reserved. Built with <Icon name="Heart" size={12} color="#f87171" /> in India
                    </p>
                    <div style={{ display: "flex", gap: 6 }}>
                        <Badge color={T.whiteMute}>DPDP Compliant</Badge>
                    </div>
                </div>
            </div>
        </footer>
    );
};
