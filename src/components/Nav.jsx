import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { T } from '../data/modules';
import { Logo } from './Shared';
import { Btn } from './Buttons';

export const Nav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", h, { passive: true });
        return () => window.removeEventListener("scroll", h);
    }, []);

    const links = [
        { label: "Features", href: "/#modules" },
        { label: "Security", href: "/#security" },
        { label: "Mobile Apps", href: "/#apps" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Roadmap", href: "/#roadmap" },
    ];

    const go = (href) => {
        setMenuOpen(false);
        if (href.startsWith('/#')) {
            navigate('/');
            setTimeout(() => {
                const el = document.querySelector(href.substring(1));
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            navigate(href);
        }
    };

    return (
        <>
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 5%", height: 68,
                background: scrolled ? "rgba(6,13,26,0.92)" : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
                transition: "all 0.3s",
            }}>
                <Logo onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
                <ul className="mobile-hide" style={{ display: "flex", gap: 32, listStyle: "none", alignItems: "center" }}>
                    {links.map(l => (
                        <li key={l.label}>
                            <button onClick={() => go(l.href)} style={{ background: "none", border: "none", color: T.whiteDim, fontSize: "0.875rem", fontFamily: "DM Sans", cursor: "pointer", transition: "color 0.2s" }}
                                onMouseEnter={e => e.target.style.color = T.white} onMouseLeave={e => e.target.style.color = T.whiteDim}>
                                {l.label}
                            </button>
                        </li>
                    ))}
                    <li><Btn small onClick={() => go("/#contact")}>Request Demo</Btn></li>
                </ul>
                <button className="mobile-flex-show" onClick={() => setMenuOpen(v => !v)} style={{
                    display: "none", background: "none", border: `1px solid ${T.border}`,
                    borderRadius: 8, padding: "8px 10px", flexDirection: "column", gap: 4, cursor: "pointer",
                }}>
                    {[0, 1, 2].map(i => <span key={i} style={{
                        width: 18, height: 1.5, background: T.white, borderRadius: 1, display: "block",
                        transform: menuOpen ? (i === 0 ? "translateY(5.5px) rotate(45deg)" : i === 2 ? "translateY(-5.5px) rotate(-45deg)" : "scaleX(0)") : "none",
                        opacity: menuOpen && i === 1 ? 0 : 1, transition: "all 0.3s"
                    }} />)}
                </button>
            </nav>
            {/* Mobile menu */}
            <div style={{
                position: "fixed", top: 68, left: 0, right: 0, zIndex: 199,
                background: "rgba(6,13,26,0.97)", backdropFilter: "blur(20px)",
                maxHeight: menuOpen ? 400 : 0, overflow: "hidden",
                transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}>
                {links.map(l => (
                    <button key={l.label} onClick={() => go(l.href)} style={{
                        display: "block", width: "100%", padding: "16px 5%",
                        background: "none", border: "none", borderBottom: `1px solid ${T.border}`,
                        color: T.whiteDim, fontSize: "1rem", fontFamily: "DM Sans", textAlign: "left", cursor: "pointer",
                    }}>{l.label}</button>
                ))}
                <div style={{ padding: "16px 5% 24px" }}>
                    <Btn onClick={() => go("/#contact")}>Request Demo →</Btn>
                </div>
            </div>
        </>
    );
};
