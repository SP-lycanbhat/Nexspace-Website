import React from 'react';
import { T } from '../data/modules';

export const Logo = ({ size = 28, onClick }) => (
    <button onClick={onClick} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <img src="/logo.png" alt="Nexspace" style={{ height: size, width: "auto" }} />
    </button>
);

export const Badge = ({ children, color = T.blue }) => {
    const isMuted = color === T.whiteMute;
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 100,
            background: isMuted ? "rgba(255,255,255,0.04)" : `rgba(${color === T.blue ? "30,155,233" : color === T.purple ? "139,92,246" : "245,158,11"},0.08)`,
            border: `1px solid ${isMuted ? "rgba(255,255,255,0.12)" : `rgba(${color === T.blue ? "30,155,233" : color === T.purple ? "139,92,246" : "245,158,11"},0.18)`}`,
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            color: isMuted ? T.whiteDim : color,
            backdropFilter: "blur(4px)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
            <span style={{ width: 4.5, height: 4.5, borderRadius: "50%", background: isMuted ? T.whiteMute : color, display: "inline-block", boxShadow: isMuted ? "none" : `0 0 8px ${color}` }} />
            {children}
        </span>
    );
};

export const Tag = ({ children, centered = true, showLine = true }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: centered ? "center" : "flex-start", gap: 10, marginBottom: 14 }}>
        {showLine && <span style={{ width: 28, height: 1, background: T.blue, display: "inline-block" }} />}
        <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.blue }}>{children}</span>
        {centered && showLine && <span style={{ width: 28, height: 1, background: T.blue, display: "inline-block" }} />}
    </div>
);

