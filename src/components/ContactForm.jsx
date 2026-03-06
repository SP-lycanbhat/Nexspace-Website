import React, { useState } from 'react';
import { T } from '../data/modules';
import { Icon } from './Icon';

export const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    return (
        <div className="reveal" style={{ background: T.navyCard, border: `1px solid ${T.border}`, borderRadius: 18, padding: 36, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${T.blue},transparent)`, opacity: 0.4 }} />
            <div style={{ fontFamily: "Sora", fontSize: "1.4rem", fontWeight: 800, color: T.white, letterSpacing: "-0.02em", marginBottom: 6 }}>Book your demo</div>
            <div style={{ fontSize: "0.8rem", color: T.whiteMute, marginBottom: 24, fontWeight: 300 }}>Fill in your details and we'll be in touch shortly.</div>
            {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
                        <Icon name="CheckCircle2" size={48} color="#4ade80" />
                    </div>
                    <div style={{ fontFamily: "Sora", fontSize: "1rem", fontWeight: 700, color: T.white, marginBottom: 8 }}>Request sent!</div>
                    <div style={{ fontSize: "0.82rem", color: T.whiteMute, fontWeight: 300 }}>We'll be in touch within a few hours.</div>
                </div>
            ) : (
                <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                        {["First Name", "Last Name"].map(label => (
                            <div key={label}>
                                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: T.whiteDim, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
                                <input placeholder={label === "First Name" ? "Ravi" : "Kumar"} style={{ width: "100%", background: T.navy, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 12px", fontFamily: "DM Sans", fontSize: "0.875rem", color: T.white, outline: "none", transition: "border-color 0.2s" }}
                                    onFocus={e => e.target.style.borderColor = "rgba(30,155,233,0.5)"}
                                    onBlur={e => e.target.style.borderColor = T.border} />
                            </div>
                        ))}
                    </div>
                    {[{ l: "Work Email", p: "ravi@company.com" }, { l: "Company", p: "Acme Corp" }].map(f => (
                        <div key={f.l} style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: "0.68rem", fontWeight: 700, color: T.whiteDim, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 5 }}>{f.l}</div>
                            <input placeholder={f.p} style={{ width: "100%", background: T.navy, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 12px", fontFamily: "DM Sans", fontSize: "0.875rem", color: T.white, outline: "none", transition: "border-color 0.2s" }}
                                onFocus={e => e.target.style.borderColor = "rgba(30,155,233,0.5)"}
                                onBlur={e => e.target.style.borderColor = T.border} />
                        </div>
                    ))}
                    <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: "0.68rem", fontWeight: 700, color: T.whiteDim, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 5 }}>What are you looking to solve?</div>
                        <textarea placeholder="e.g. We need to manage visitor check-ins across 3 offices..." rows={3} style={{ width: "100%", background: T.navy, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 12px", fontFamily: "DM Sans", fontSize: "0.875rem", color: T.white, outline: "none", resize: "vertical", transition: "border-color 0.2s" }}
                            onFocus={e => e.target.style.borderColor = "rgba(30,155,233,0.5)"}
                            onBlur={e => e.target.style.borderColor = T.border} />
                    </div>
                    <button onClick={() => setSubmitted(true)} style={{ width: "100%", padding: 14, background: T.blue, color: T.navy, border: "none", borderRadius: 8, fontFamily: "Sora", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", letterSpacing: "-0.01em", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.target.style.opacity = "0.88"; e.target.style.transform = "translateY(-1px)"; }}
                        onMouseLeave={e => { e.target.style.opacity = "1"; e.target.style.transform = "none"; }}>
                        Request Demo →
                    </button>
                    <div style={{ textAlign: "center", fontSize: "0.72rem", color: T.whiteMute, marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <Icon name="ShieldCheck" size={12} color={T.whiteMute} /> DPDP compliant. We'll never share your information.
                    </div>
                </>
            )}
        </div>
    );
};
