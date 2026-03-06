export const T = {
    navy: "#060D1A",
    navyMid: "#0C1829",
    navyCard: "#0F1F35",
    blue: "#1E8DE7",
    blueDim: "rgba(0,229,255,0.08)",
    blueGlow: "rgba(0,229,255,0.25)",
    white: "#F0F6FF",
    whiteDim: "rgba(240,246,255,0.55)",
    whiteMute: "rgba(240,246,255,0.25)",
    border: "rgba(255,255,255,0.08)",
    purple: "#1E9BE9",
    amber: "#fcf7d4ff",
};

export const MODULES = [
    {
        id: "visitor",
        icon: "Users",
        name: "Visitor Management",
        tagline: "Secure, smart, seamless entry.",
        color: T.blue,
        heroDesc: "From pre-registration to badge printing — every visitor touchpoint, automated and secured with OTP verification.",
        features: [
            { icon: "ClipboardList", title: "Pre-Registration", desc: "Hosts invite visitors in advance via email or link. Visitors fill in their details and receive a unique OTP passcode before arriving." },
            { icon: "KeyRound", title: "OTP Passcode Entry", desc: "Visitors present their time-bound OTP at the front desk or self-service kiosk. No manual registers, no paperwork." },
            { icon: "BadgeCheck", title: "Instant Badge Printing", desc: "Visitor badges print automatically on check-in with name, photo, host, and purpose — ready in seconds." },
            { icon: "Eye", title: "Real-Time Visitor Tracking", desc: "Know exactly who is in your building at any moment. Live dashboard shows active visitors, expected arrivals, and overdue check-outs." },
            { icon: "PieChart", title: "Visitor Analytics", desc: "Historical reports on footfall, peak hours, frequent visitors, and host activity. Export for compliance audits." },
            { icon: "BellRing", title: "Host Notifications", desc: "Hosts are instantly notified via app and email when their guest arrives — no more front desk calling around." },
        ],
        useCases: [
            { role: "Front Desk Staff", scenario: "Quickly check in walk-in visitors using their pre-registered passcode. No manual entry, no queues." },
            { role: "Tenant Admin", scenario: "Review visitor logs for compliance, set blacklists, and configure OTP expiry times per facility." },
            { role: "Visitor", scenario: "Receive an invite link, fill in details once, and walk in with just your phone. Professional experience every time." },
        ]
    },
    {
        id: "rooms",
        icon: "CalendarRange",
        name: "Meeting Room Booking",
        tagline: "Every room. Every team. Zero conflicts.",
        color: T.blue,
        heroDesc: "Full meeting room inventory management with real-time availability, smart scheduling, and conflict detection across all your facilities.",
        features: [
            { icon: "Calendar", title: "Visual Room Calendar", desc: "See all rooms across all floors in a single timeline view. Instantly spot availability and book in two clicks." },
            { icon: "Zap", title: "Instant Booking", desc: "Reserve a room for now or schedule in advance. Recurrence support for weekly stand-ups and regular meetings." },
            { icon: "Ban", title: "Conflict Detection", desc: "The system prevents double-bookings automatically. No more arriving at a room that's already taken." },
            { icon: "Building", title: "Multi-Facility Support", desc: "Manage rooms across multiple offices, floors, and wings from a single console. Filter by location, capacity, or amenities." },
            { icon: "Smartphone", title: "Mobile Booking", desc: "Book, modify, or cancel a room from your phone via the Nexspace app. QR check-in at the room door." },
            { icon: "LineChart", title: "Utilisation Reports", desc: "See which rooms are underused, which are always booked, and peak usage hours. Optimise your space allocation." },
        ],
        useCases: [
            { role: "Employee", scenario: "Check room availability on the app, book the nearest free room, and start the meeting — all in under 30 seconds." },
            { role: "Admin", scenario: "View facility-wide room utilisation, identify underused spaces, and release them as flexible desks." },
            { role: "Receptionist", scenario: "Help walk-in guests find available rooms instantly with the live map view on the front desk tablet." },
        ]
    },
    {
        id: "helpdesk",
        icon: "Ticket",
        name: "Helpdesk & Ticketing",
        tagline: "Raise it. Track it. Resolve it.",
        color: T.purple,
        heroDesc: "A facility-grade ticketing system where tenants raise requests, SPOCs assign them, and everyone stays informed with real-time status updates.",
        features: [
            { icon: "FileText", title: "Easy Ticket Creation", desc: "Tenants raise helpdesk tickets from the app in seconds — selecting category, priority, and uploading photos of the issue." },
            { icon: "UserCheck", title: "Smart Assignment", desc: "SPOCs assign tickets to the right team or individual. Auto-routing rules can be configured per category and facility." },
            { icon: "Timer", title: "SLA Tracking", desc: "Set response and resolution SLAs per ticket category. The system flags breaches and sends escalation alerts automatically." },
            { icon: "MessageSquare", title: "In-Ticket Comments", desc: "Requesters and assignees communicate directly within the ticket. No lost email threads, full audit trail." },
            { icon: "BarChart", title: "Helpdesk Analytics", desc: "Track resolution times, overdue tickets, category trends, and team performance with filterable dashboards." },
            { icon: "Bell", title: "Status Notifications", desc: "Requesters get push and email updates at every stage — acknowledged, in progress, resolved — without asking." },
        ],
        useCases: [
            { role: "Tenant Employee", scenario: "Report a broken AC unit from their phone with a photo. Get notified when it's fixed — no calls, no chasing." },
            { role: "SPOC", scenario: "Review all open tickets across your facility, reassign based on workload, and track SLA compliance in real time." },
            { role: "Facility Manager", scenario: "Pull weekly reports on most common issues, resolution times, and team efficiency to improve operations." },
        ]
    },
    {
        id: "facility",
        icon: "Building2",
        name: "Facility Management",
        tagline: "Your entire estate. One console.",
        color: T.blue,
        heroDesc: "Define and manage buildings, wings, floors, and zones across your entire property portfolio — with granular control down to individual spaces.",
        features: [
            { icon: "Home", title: "Multi-Building Setup", desc: "Configure multiple buildings across different cities. Each facility gets its own admin, modules, and access controls." },
            { icon: "Map", title: "Floor & Zone Mapping", desc: "Define wings, floors, zones, and individual spaces. Assign rooms, desks, and amenities to specific locations." },
            { icon: "Settings2", title: "Module Configuration", desc: "Enable or disable specific modules per facility. Visitor management at HQ, just room booking at the branch office." },
            { icon: "Users2", title: "Facility-Level Access", desc: "Assign admins and SPOCs to specific facilities. They see and manage only what they're responsible for." },
            { icon: "PackageSearch", title: "Amenity Inventory", desc: "Track all facility amenities — projectors, whiteboards, AV systems — and associate them with specific rooms." },
            { icon: "Activity", title: "Facility Analytics", desc: "Compare metrics across facilities — footfall, room utilisation, ticket volumes — from a single management view." },
        ],
        useCases: [
            { role: "Tenant Admin", scenario: "Set up a new branch office in Pune in minutes — add floors, configure meeting rooms, and assign a local SPOC." },
            { role: "SPOC", scenario: "Manage all service requests, room configurations, and visitor settings for your specific facility without touching others." },
            { role: "Facility Manager", scenario: "Compare operational metrics across all facilities to identify inefficiencies and standardise best practices." },
        ]
    },
    {
        id: "roles",
        icon: "ShieldCheck",
        name: "Role & User Management",
        tagline: "Right access. Right people. Always.",
        color: T.purple,
        heroDesc: "Granular, role-based access control so every user — from Tenant Admins to Frontdesk Staff — sees exactly what they need and nothing more.",
        features: [
            { icon: "Crown", title: "Tenant Admin", desc: "Full control over the company's Nexspace environment. Manages users, facilities, modules, and system configuration." },
            { icon: "MapPin", title: "SPOC (Single Point of Contact)", desc: "Facility-level manager responsible for day-to-day operations — tickets, visitor approvals, room management." },
            { icon: "Monitor", title: "Frontdesk Staff", desc: "Handles visitor check-ins, badge printing, and walk-in management at a specific facility entrance." },
            { icon: "User", title: "Tenant Users", desc: "Regular employees who can book rooms, raise tickets, and pre-register visitors within their company scope." },
            { icon: "Lock", title: "Context Isolation", desc: "Each user only sees data from their own company and assigned facilities. Cross-tenant data exposure is architecturally impossible." },
            { icon: "History", title: "User Audit Logs", desc: "Full audit trail of who did what, when — from creating a booking to resolving a ticket. Compliance-ready." },
        ],
        useCases: [
            { role: "Tenant Admin", scenario: "Onboard a new SPOC for the Bengaluru office. They immediately have access to that facility's operations without seeing HQ data." },
            { role: "SPOC", scenario: "Create and deactivate frontdesk accounts when staff changes, without waiting for IT or a super admin." },
            { role: "Compliance Team", scenario: "Pull full audit logs of user actions for a specific date range to support an internal review." },
        ]
    },
    {
        id: "analytics",
        icon: "BarChart3",
        name: "Analytics & Insights",
        tagline: "Data that drives decisions.",
        color: T.amber,
        heroDesc: "Real-time dashboards and historical reports across visitor flow, room utilisation, ticket trends, and team performance — all in one place.",
        features: [
            { icon: "TrendingUp", title: "Live Operations Dashboard", desc: "Real-time view of active visitors, room occupancy, open tickets, and key facility metrics at a glance." },
            { icon: "Layers", title: "Visitor Analytics", desc: "Footfall trends, peak hours, frequent visitors, average visit duration, and host activity reports." },
            { icon: "Layout", title: "Space Utilisation", desc: "Room booking rates, peak usage windows, most and least used spaces. Know where to invest and where to cut." },
            { icon: "Vote", title: "Helpdesk Performance", desc: "Ticket volumes, resolution times, SLA compliance, category breakdowns, and team performance metrics." },
            { icon: "Share", title: "Export & Reports", desc: "Schedule automated reports or export raw data as CSV/PDF for compliance audits, management reviews, or BI tools." },
            { icon: "SearchCode", title: "Cross-Facility Comparison", desc: "Compare performance metrics across all your facilities. Benchmark, spot outliers, and drive improvement." },
        ],
        useCases: [
            { role: "Facility Manager", scenario: "Pull Monday morning reports on last week's room utilisation to decide whether to convert underused rooms to hot desks." },
            { role: "Tenant Admin", scenario: "Compare ticket resolution SLA compliance across all facilities to identify which SPOC teams need additional support." },
            { role: "Compliance Team", scenario: "Export visitor logs for a specific date range and facility to satisfy an audit requirement within minutes." },
        ]
    },
];
