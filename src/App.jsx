import React, { useEffect } from "react";
import { resume } from "./data/resume.js";

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 6l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.6 10.8c1.7 3.2 3.9 5.4 7.1 7.1l2.4-2.4a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a2 2 0 0 1-2 2c-10.5 0-19-8.5-19-19A2 2 0 0 1 2 1h3.17a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.25 1L4.1 9.9l2.5.9Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22s8-6.2 8-12a8 8 0 1 0-16 0c0 5.8 8 12 8 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Section({ title, right, children }) {
  return (
    <div className="card">
      <div className="section-title">
        <h3>{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}

function ListItem({ title, sub, bullets }) {
  return (
    <div>
      <div className="item-title">{title}</div>
      {sub && <div className="item-sub">{sub}</div>}
      {bullets && bullets.length > 0 && (
        <ul className="item-bullets">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      <hr className="sep" />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    // Keyboard shortcuts
    function onKey(e) {
      if (e.key.toLowerCase() === "t") {
        document.documentElement.classList.toggle("light");
      }
      if (e.key.toLowerCase() === "p") {
        window.print();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(resume.contact.email);
      alert("Email copied to clipboard ✅");
    } catch {
      alert("Could not copy, please copy manually.");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="title">
          <div className="avatar">AB</div>
          <div>
            <h1>{resume.name}</h1>
            <p>{resume.role}</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            className="button"
            onClick={() => document.documentElement.classList.toggle("light")}
            title="Toggle theme (t)"
          >
            Toggle Theme
          </button>

          <a className="button" href={resume.contact.resumeLink} download>
            Download PDF
          </a>
          <button
            className="button"
            onClick={() => window.print()}
            title="Print (p)"
          >
            Print
          </button>
        </div>
      </header>

      <main className="grid">
        {/* LEFT */}
        <section className="col-span-4 grid" style={{ gap: 16 }}>
          <div className="card">
            <h3>About</h3>
            <p style={{ marginTop: 8, lineHeight: 1.6 }}>{resume.intro}</p>
          </div>

          <Section title="Contact">
            <div className="chips">
              <span className="badge">
                <IconPhone /> {resume.contact.phone}
              </span>
              <span
                className="badge"
                style={{ cursor: "pointer" }}
                onClick={copyEmail}
              >
                <IconMail /> {resume.contact.email} (copy)
              </span>
              <span className="badge">
                <IconMapPin /> {resume.contact.location}
              </span>
            </div>
          </Section>

          <Section title="Education">
            <div className="list">
              {resume.education.map((e, i) => (
                <ListItem
                  key={i}
                  title={`${e.school} — ${e.degree}`}
                  sub={e.details}
                />
              ))}
            </div>
          </Section>

          <Section
            title="Skills"
            right={
              <span className="item-sub">
                Press <kbd>t</kbd> to toggle theme
              </span>
            }
          >
            <div className="skills-grid">
              {resume.skills.map((s, i) => (
                <div className="skill-block" key={i}>
                  <div className="item-title">{s.title}</div>
                  <div className="item-sub">{s.items.join(" • ")}</div>
                </div>
              ))}
            </div>
          </Section>
        </section>

        {/* RIGHT */}
        <section className="col-span-8 grid" style={{ gap: 16 }}>
          <Section title="Professional Experience">
            <div className="list">
              {resume.experience.map((x, i) => (
                <ListItem
                  key={i}
                  title={`${x.org} — ${x.role}`}
                  sub={x.period}
                  bullets={x.bullets}
                />
              ))}
            </div>
          </Section>

          <Section title="Internships">
            <div className="list">
              {resume.internships.map((x, i) => (
                <ListItem
                  key={i}
                  title={`${x.org} — ${x.role}`}
                  sub={x.period}
                  bullets={x.bullets}
                />
              ))}
            </div>
          </Section>

          <Section title="Projects">
            <div className="list">
              {resume.projects.map((p, i) => (
                <div key={i}>
                  <div className="item-title">{p.name}</div>
                  <div className="item-sub">{p.stack.join(" • ")}</div>
                  <ul className="item-bullets">
                    {p.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                  <hr className="sep" />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Activities & Hobbies">
            <ul className="item-bullets">
              {resume.activities.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </Section>
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} {resume.name} · Built with React, HTML, CSS
        & JS
      </footer>
    </div>
  );
}
