"use client";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    tag: "AUTOMATION",
    title: "Daily Project Reporting Automation",
    subtitle: "End-to-end workflow replacing manual field reporting with trusted executive intelligence",
    overview:
      "Built a fully automated reporting system in n8n that connects field data collection (Jotform), project tracking (Fieldwire API), and financial metrics into a single pipeline — generating standardized daily reports delivered via Microsoft Teams and SharePoint with zero manual effort from Project Managers.",
    actions: [
      "Designed multi-step automation triggered by structured Jotform submissions from field technicians",
      "Engineered pagination-safe API loops to extract tasks, checklists, and statuses from Fieldwire across large datasets",
      "Built dual data streams (daily vs. all-time) with merge logic to calculate earned hours, efficiency %, and project completion",
      "Created HTML-to-PDF report generation optimized for both Teams light and dark modes",
      "Implemented fallback logic for incomplete checklist data and edge cases ensuring uninterrupted execution",
      "Standardized SOW category mapping (Surveillance, Access Control, Data, AV, DAS) across all active projects",
    ],
    impact: [
      { metric: "2,500+", label: "Hours saved annually across the portfolio" },
      { metric: "60 min", label: "Recovered per PM, per project, per day" },
      { metric: "~95%", label: "Of the reporting process fully automated" },
      { metric: "~0", label: "Decision latency — visibility by next morning" },
    ],
    tools: ["n8n", "Fieldwire API", "Jotform", "Teams", "SharePoint", "Business Central", "PDF Generation"],
    color: "#3b82f6",
  },
  {
    id: 2,
    tag: "DATA ENGINEERING",
    title: "Fieldwire → Power BI Data Engine",
    subtitle: "Automated pipeline turning fragmented field data into unified multi-project analytics",
    overview:
      "Built a fully automated data pipeline connecting Fieldwire's API to Power BI through Power Automate. Consolidates Task, Checklist Item, Form, and Project data across dozens of active jobs into one reporting engine — eliminating all manual data exports and enabling real-time multi-project visibility.",
    actions: [
      "Architected a Power Automate flow that dynamically loops through all active Fieldwire projects via paginated API calls",
      "Designed incremental refresh logic using last_synced_at timestamps to keep queries performant under 1 hour",
      "Built parallelized task-to-checklist mapping with category normalization and status dictionary mapping",
      "Structured clean CSV outputs stored in SharePoint with automatic Power BI refresh every 3 hours",
      "Navigated undocumented Fieldwire API pagination quirks and rate limits without failures",
      "Created the data foundation for forecasting and resource planning dashboards used by leadership",
    ],
    impact: [
      { metric: "100%", label: "Automated — zero manual exports needed" },
      { metric: "Real-time", label: "Visibility into task progress across all jobs" },
      { metric: "3-hour", label: "Auto-refresh cycle for always-current data" },
      { metric: "Foundation", label: "For forecasting & resource planning" },
    ],
    tools: ["Power Automate", "Power BI", "Fieldwire API", "SharePoint", "JSON"],
    color: "#8b5cf6",
  },
  {
    id: 3,
    tag: "PROCESS TRANSFORMATION",
    title: "Estimating Process Rebuild",
    subtitle: "Full workflow redesign from manual takeoffs to automated, standardized proposal generation",
    overview:
      "Led a complete rebuild of the company's estimating workflow by implementing Procore Estimating for structured takeoffs and PandaDoc for automated proposal generation — eliminating manual formatting, standardizing pricing across all estimators, and dramatically accelerating turnaround time.",
    actions: [
      "Built complete estimating structures inside Procore with standardized assemblies, labor units, and pricing databases",
      "Created automated PandaDoc templates with dynamic pricing tables scoped per vertical (SC, SURV, ACS, AV, DAS)",
      "Standardized proposal language, exclusions, and scope formatting for consistency across all estimators",
      "Integrated approval flows with margin checks and version control to maintain pricing accuracy",
      "Designed a repeatable estimating → proposal → PMO handoff process that scales with company growth",
      "Trained and aligned all estimators to follow one unified workflow replacing fragmented individual approaches",
    ],
    impact: [
      { metric: "60%", label: "Faster proposal turnaround time" },
      { metric: "Eliminated", label: "Pricing errors and inconsistencies" },
      { metric: "Standardized", label: "Quality across the entire estimating team" },
      { metric: "Scalable", label: "Operations built for company growth" },
    ],
    tools: ["Procore Estimating", "PandaDoc"],
    color: "#10b981",
  },
  {
    id: 4,
    tag: "STRATEGIC VISIBILITY",
    title: "Operations Dashboards & Weekly KPI System",
    subtitle: "Real-time executive dashboards for labor, cost, schedule, and estimating performance",
    overview:
      "Designed and deployed a suite of Operations Dashboards and a Weekly KPI Management Framework — giving leadership and Project Managers real-time visibility into project health, labor utilization, budget variance, estimator accuracy, and win rates through automated Smartsheet + Power BI pipelines.",
    actions: [
      "Built dashboards covering CPI, SPI, percent complete, labor burn vs. forecast, cost variance, and open risks",
      "Created a Weekly KPI Framework tracking estimates vs. awarded, win rate %, margin trends, and missed deadlines",
      "Integrated daily and weekly data feeds from Business Central, Fieldwire, and Smartsheet into automated pipelines",
      "Designed automated alerts to flag anomalies and slipping KPIs before they become critical issues",
      "Normalized KPI definitions across estimating, PMO, and operations to ensure consistent measurement",
      "Automated email digests and status summaries, eliminating manual weekly reporting effort",
    ],
    impact: [
      { metric: "Weekly", label: "Reliable visibility into company performance" },
      { metric: "Reduced", label: "Surprises in scheduling & budget overruns" },
      { metric: "Data-driven", label: "Decisions replacing gut-feel management" },
      { metric: "Embedded", label: "Into structured PMO review cadence" },
    ],
    tools: ["Power BI", "Smartsheet", "Business Central", "Procore", "Microsoft 365"],
    color: "#f59e0b",
  },
];

const behaviors = [
  { icon: "⚙️", label: "Systems Thinking", desc: "Connects tools, teams, and data into cohesive operational ecosystems" },
  { icon: "📐", label: "Process Design", desc: "Replaces ad-hoc workflows with standardized, repeatable systems" },
  { icon: "🔌", label: "Technical Integration", desc: "Builds API pipelines, automation workflows, and data architectures hands-on" },
  { icon: "📊", label: "Data-Driven Leadership", desc: "Creates visibility frameworks that enable proactive decision-making" },
  { icon: "🚀", label: "Bias Toward Action", desc: "Identifies gaps and builds solutions without dedicated engineering support" },
  { icon: "🤝", label: "Cross-Functional Alignment", desc: "Bridges field crews, Project Managers, estimators, and leadership with shared systems" },
];

function ProjectCard({ project, isActive, onClick, index }) {
  return (
    <button
      onClick={onClick}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
        padding: "20px 24px",
        borderRadius: 12,
        border: isActive ? `1px solid ${project.color}44` : "1px solid rgba(255,255,255,0.04)",
        background: isActive ? `${project.color}0a` : "rgba(255,255,255,0.02)",
        transition: "all 0.3s ease",
        boxSizing: "border-box",
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: 2,
            color: isActive ? project.color : "#64748b",
            background: isActive ? `${project.color}18` : "rgba(255,255,255,0.04)",
            padding: "3px 8px",
            borderRadius: 4,
            transition: "all 0.3s ease",
          }}
        >
          {project.tag}
        </span>
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: isActive ? "#f1f5f9" : "#94a3b8",
          lineHeight: 1.3,
          transition: "color 0.3s ease",
        }}
      >
        {project.title}
      </div>
    </button>
  );
}

function MetricCard({ metric, label, color }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700, color }}>{metric}</div>
      <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const registerRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const active = projects[activeProject];
  const isVisible = (id) => visibleSections.has(id);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        background: "#0a0f1a",
        color: "#e2e8f0",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        .section-animate { opacity: 0; transform: translateY(30px); transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
        .section-visible { opacity: 1; transform: translateY(0); }
        .tool-chip { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-family: 'Space Mono', monospace; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); color: #94a3b8; margin: 3px; }
        .action-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 15px; line-height: 1.6; color: #cbd5e1; }
        .action-item:last-child { border-bottom: none; }
        .action-num { font-family: 'Space Mono', monospace; font-size: 11px; color: #64748b; min-width: 24px; padding-top: 3px; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        /* ── Responsive ────────────────────────────────── */
        @media (max-width: 768px) {
          .nav-container { padding: 14px 20px !important; }
          .nav-links { gap: 16px !important; }
          .nav-links a { font-size: 11px !important; }
          .hero-section { padding: 100px 20px 60px !important; }
          .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
          .projects-grid { flex-direction: column !important; }
          .project-selector {
            flex: none !important;
            width: 100% !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
            gap: 8px !important;
          }
          .project-selector::-webkit-scrollbar { height: 3px; }
          .project-selector::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
          .project-selector > button { flex-shrink: 0; width: 200px !important; }
          .behaviors-grid { grid-template-columns: 1fr !important; }
          .credentials-flex { flex-direction: column !important; gap: 28px !important; }
          .contact-flex { flex-direction: column !important; }
          .impact-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 480px) {
          .nav-name { font-size: 11px !important; }
          .hero-section { padding: 90px 16px 48px !important; }
          .section-pad { padding-left: 16px !important; padding-right: 16px !important; }
          .impact-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav
        className="nav-container"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: scrolled ? "12px 32px" : "20px 32px",
          background: scrolled ? "rgba(10,15,26,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.3s ease",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <div className="nav-name" style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: "#94a3b8" }}>
          Yoshi Yamamoto
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="#projects" style={{ fontSize: 13, color: "#64748b", textDecoration: "none", fontFamily: "'Space Mono', monospace", letterSpacing: 0.5 }}>Projects</a>
          <a href="#approach" style={{ fontSize: 13, color: "#64748b", textDecoration: "none", fontFamily: "'Space Mono', monospace", letterSpacing: 0.5 }}>Approach</a>
          <a href="#contact" style={{ fontSize: 13, color: "#64748b", textDecoration: "none", fontFamily: "'Space Mono', monospace", letterSpacing: 0.5 }}>Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="hero-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 40px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            background: "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.05) 0%, transparent 50%)",
          }}
        />
        <div style={{ position: "relative", maxWidth: 880 }}>
          <div
            style={{
              fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 3,
              color: "#3b82f6", marginBottom: 28, textTransform: "uppercase",
              animation: "fadeUp 0.6s ease both",
            }}
          >
            Operations & Technology Portfolio
          </div>
          <h1
            style={{
              fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 700, lineHeight: 1.08,
              margin: 0, marginBottom: 28,
              animation: "fadeUp 0.6s ease 0.1s both",
            }}
          >
            I build systems that turn
            <br />
            <span style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              operational chaos{" "}
            </span>
            into clarity.
          </h1>
          <p
            style={{
              fontSize: 17, lineHeight: 1.75, color: "#94a3b8", maxWidth: 620, margin: 0,
              animation: "fadeUp 0.6s ease 0.2s both",
            }}
          >
            PMP Certified, Project Manager at Surveillance Systems Inc., specializing in workflow automation, data pipeline engineering, and process transformation for construction and low-voltage operations. I build the systems nobody asked for — because the work demanded them.
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        ref={registerRef("projects")}
        className={`section-animate section-pad ${isVisible("projects") ? "section-visible" : ""}`}
        style={{ padding: "80px 40px 100px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 3, color: "#3b82f6", marginBottom: 12, textTransform: "uppercase" }}>
          Selected Work
        </div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, margin: "0 0 48px", color: "#f1f5f9" }}>Key Projects</h2>

        <div className="projects-grid" style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {/* Project selector — left column */}
          <div className="project-selector" style={{ flex: "0 0 280px", display: "flex", flexDirection: "column", gap: 8 }}>
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} isActive={i === activeProject} onClick={() => setActiveProject(i)} index={i} />
            ))}
          </div>

          {/* Project detail — right column */}
          <div style={{ flex: 1, minWidth: 0 }} key={active.id}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2,
                  color: active.color, background: `${active.color}15`, padding: "4px 10px",
                  borderRadius: 4, display: "inline-block", marginBottom: 12,
                }}
              >
                {active.tag}
              </span>
              <h3 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px", color: "#f1f5f9" }}>{active.title}</h3>
              <p style={{ fontSize: 15, color: "#64748b", margin: 0, lineHeight: 1.5 }}>{active.subtitle}</p>
            </div>

            {/* Overview */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#64748b", marginBottom: 10, textTransform: "uppercase" }}>
                Overview
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#cbd5e1", margin: 0 }}>{active.overview}</p>
            </div>

            {/* Actions */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#64748b", marginBottom: 14, textTransform: "uppercase" }}>
                Key Actions & Behaviors
              </div>
              <div>
                {active.actions.map((action, i) => (
                  <div className="action-item" key={i}>
                    <span className="action-num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#64748b", marginBottom: 14, textTransform: "uppercase" }}>
                Impact
              </div>
              <div className="impact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {active.impact.map((item, i) => (
                  <MetricCard key={i} metric={item.metric} label={item.label} color={active.color} />
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#64748b", marginBottom: 10, textTransform: "uppercase" }}>
                Tools & Technologies
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                {active.tools.map((tool) => (
                  <span className="tool-chip" key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH / BEHAVIORS */}
      <section
        id="approach"
        ref={registerRef("approach")}
        className={`section-animate section-pad ${isVisible("approach") ? "section-visible" : ""}`}
        style={{ padding: "80px 40px 100px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 3, color: "#8b5cf6", marginBottom: 12, textTransform: "uppercase" }}>
          How I Work
        </div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, margin: "0 0 12px", color: "#f1f5f9" }}>Core Behaviors</h2>
        <p style={{ fontSize: 16, color: "#64748b", margin: "0 0 48px", maxWidth: 600 }}>
          The patterns that run through every project — not just what I deliver, but how I operate.
        </p>

        <div className="behaviors-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
          {behaviors.map((b) => (
            <div
              key={b.label}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 12,
                padding: "28px 24px",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: 24, lineHeight: 1 }}>{b.icon}</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#f1f5f9", marginBottom: 6 }}>{b.label}</div>
                <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CREDENTIALS */}
      <section
        ref={registerRef("background")}
        id="background"
        className={`section-animate section-pad ${isVisible("background") ? "section-visible" : ""}`}
        style={{ padding: "80px 40px 100px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 3, color: "#10b981", marginBottom: 12, textTransform: "uppercase" }}>
          Background
        </div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, margin: "0 0 48px", color: "#f1f5f9" }}>Credentials</h2>

        <div className="credentials-flex" style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#64748b", marginBottom: 12, textTransform: "uppercase" }}>
              Education
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f1f5f9" }}>B.S. Finance & Economics</div>
            <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 4 }}>Grand Canyon University</div>
          </div>

          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#64748b", marginBottom: 12, textTransform: "uppercase" }}>
              Certifications
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["PMP", "OSHA 30", "OSHA 10"].map((c) => (
                <span className="tool-chip" key={c} style={{ fontSize: 13, color: "#cbd5e1" }}>{c}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#64748b", marginBottom: 12, textTransform: "uppercase" }}>
              Technical Tools
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
              {["Power BI", "Power Automate", "n8n", "Excel", "Cursor", "Claude Code", "APIs & JSON", "Basic SQL"].map((t) => (
                <span className="tool-chip" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 36 }}>
          <a
            href="mailto:dymoto52@gmail.com?subject=Resume%20Request"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              color: "#3b82f6",
              textDecoration: "none",
              letterSpacing: 0.5,
              borderBottom: "1px solid rgba(59,130,246,0.3)",
              paddingBottom: 2,
            }}
          >
            Request full resume →
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        ref={registerRef("contact")}
        className={`section-animate section-pad ${isVisible("contact") ? "section-visible" : ""}`}
        style={{
          padding: "80px 40px 60px",
          maxWidth: 1200,
          margin: "0 auto",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="contact-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32 }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 12px", color: "#f1f5f9" }}>Let's connect.</h2>
            <p style={{ fontSize: 15, color: "#94a3b8", margin: 0, lineHeight: 1.7, maxWidth: 480 }}>
              I'm always interested in conversations about operations, automation, and how to make project teams run better with the right systems.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a
              href="mailto:dymoto52@gmail.com"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                color: "#3b82f6",
                textDecoration: "none",
                letterSpacing: 0.5,
              }}
            >
              dymoto52@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/darin-yoshi-yamamoto-344467183/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                color: "#8b5cf6",
                textDecoration: "none",
                letterSpacing: 0.5,
              }}
            >
              LinkedIn →
            </a>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#64748b" }}>
              Queen Creek, AZ
            </div>
          </div>
        </div>
        <div style={{ marginTop: 60, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#334155", letterSpacing: 1 }}>
            © 2026 Yoshi Yamamoto
          </div>
        </div>
      </section>
    </div>
  );
}
