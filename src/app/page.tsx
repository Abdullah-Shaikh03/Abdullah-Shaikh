import Terminal from "@/components/terminal/Terminal";
import { profile, projects, experience, skillGroups, education } from "@/data/portfolio";

export default function Home() {
  return (
    <main className="site-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Abdullah Shaikh portfolio home">
          <span className="brand-mark">as</span>
          <span>abdullah<span className="brand-dot">.</span>dev</span>
        </a>
        <div className="header-status"><span className="status-dot" /> portfolio online</div>
        <a className="header-link" href={`mailto:${profile.email}`}>Say hello <span aria-hidden="true">↗</span></a>
      </header>

      <section className="intro" id="home" aria-labelledby="page-title">
        <div className="eyebrow"><span className="eyebrow-line" /> PERSONAL PORTFOLIO <span className="eyebrow-year">2026</span></div>
        <h1 id="page-title">A portfolio that<br /><span>speaks terminal.</span></h1>
        <p className="intro-copy">Software engineering, full-stack systems, and applied computer vision.<br className="desktop-break" /> Type a command or choose one below to explore my work.</p>
      </section>

      <Terminal />

      <section className="sr-only" aria-label="Portfolio overview">
        <h2>About {profile.name}</h2><p>{profile.summary}</p>
        <h2>Selected projects</h2><ul>{projects.map((project) => <li key={project.id}><strong>{project.name}:</strong> {project.description}</li>)}</ul>
        <h2>Experience</h2><ul>{experience.map((job) => <li key={job.company + job.role}>{job.role}, {job.company}, {job.dates}. {job.details}</li>)}</ul>
        <h2>Skills</h2><p>{skillGroups.map((group) => `${group.label}: ${group.items.join(", ")}`).join(". ")}</p>
        <h2>Education</h2><p>{education.degree}, {education.school}, {education.dates}. {education.result}.</p>
      </section>

      <footer className="site-footer"><span>Built with intention<span className="footer-separator"> / </span>Next.js + TypeScript</span><span>© 2026 Abdullah Shaikh</span></footer>
    </main>
  );
}
