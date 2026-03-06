import React, { useState } from 'react';
import { T } from '../data/modules';
import { Icon } from './Icon';

const FAQS = [
    { q: "What is Nexspace and who is it for?", a: "Nexspace is a multi-tenant facility management platform built for organisations that manage physical spaces. It serves Tenant Administrators, Front Desk Staff, SPOCs, and Visitors with purpose-built tools for each role." },
    { q: "How quickly can we get started?", a: "Most teams are up and running within a week. We handle onboarding personally — no lengthy implementation cycles. You set up your company, add facilities, invite users, and you're live." },
    { q: "Is Nexspace compliant with India's DPDP Act?", a: "Yes. Nexspace is built in alignment with India's Digital Personal Data Protection Act (2023). We follow principles of purpose limitation, data minimisation, and consent-based collection." },
    { q: "Can I use only specific modules?", a: "Absolutely. Nexspace is modular by design. Enable only Visitor Management, only Room Booking, or any combination. You pay for what you use." },
    { q: "What are the Nexspace and Opstrack mobile apps?", a: "Nexspace is the tenant-facing app — for employees and visitors to book rooms, manage visits, and raise tickets. Opstrack is the operations app — built for front desk and facility managers. Both are launching soon on iOS and Android." },
    { q: "Do you offer a free trial?", a: "Yes — our Starter plan is completely free for small teams. For Growth and Enterprise, we offer a personalised demo first so you can see the platform in the context of your own facility." },
];

export const FaqList = () => {
    const [open, setOpen] = useState(0);
    return (
        <div className="reveal">
            {FAQS.map((faq, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${T.border}`, ...(i === 0 ? { borderTop: `1px solid ${T.border}` } : {}) }}>
                    <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                        width: "100%", background: "none", border: "none", cursor: "pointer",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "20px 0", gap: 16, textAlign: "left",
                    }}>
                        <span style={{ fontFamily: "Sora", fontSize: "0.95rem", fontWeight: 600, color: open === i ? T.blue : T.white, letterSpacing: "-0.02em", lineHeight: 1.4, transition: "color 0.2s" }}>{faq.q}</span>
                        <span style={{
                            width: 28, height: 28, borderRadius: "50%", border: `1px solid ${open === i ? "rgba(30,155,233,0.3)" : T.border}`,
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                            transform: open === i ? "rotate(180deg)" : "none", transition: "all 0.3s",
                            background: open === i ? T.blueDim : "transparent"
                        }}>
                            <Icon name="ChevronDown" size={16} color={open === i ? T.blue : T.whiteMute} />
                        </span>
                    </button>
                    <div style={{ maxHeight: open === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
                        <p style={{ paddingBottom: 20, fontSize: "0.88rem", color: T.whiteDim, lineHeight: 1.8, fontWeight: 300 }}>{faq.a}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
