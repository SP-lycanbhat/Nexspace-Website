import React from 'react';
import { T } from '../data/modules';

export const Btn = ({ children, variant = "primary", onClick, small }) => {
    const base = {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: small ? "8px 18px" : "13px 28px",
        borderRadius: 8,
        fontFamily: "Sora",
        fontWeight: 700,
        fontSize: small ? "0.8rem" : "0.9rem",
        letterSpacing: "-0.01em",
        cursor: "pointer",
        border: "none",
        transition: "all 0.2s",
    };
    const styles = {
        primary: { ...base, background: T.blue, color: T.navy },
        ghost: { ...base, background: "transparent", border: `1px solid rgba(255,255,255,0.12)`, color: T.white },
        outline: { ...base, background: "transparent", border: `1px solid ${T.blue}`, color: T.blue },
    };
    return <button style={styles[variant]} onClick={onClick}>{children}</button>;
};
