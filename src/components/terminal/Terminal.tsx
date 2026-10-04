"use client";

import { FormEvent, KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import { certifications, education, experience, profile, projects, skillGroups } from "@/data/portfolio";

type Entry = { id: number; command: string; output: ReactNode };

const quickCommands = ["help", "about", "projects", "skills", "experience", "contact"];
const commands = ["help", "clear", "whoami", "about", "ls", "projects", "skills", "experience", "education", "certifications", "contact", "resume", "github", "linkedin", "neofetch", "history", "sudo hire-me", ...projects.map((project) => `cat ${project.id}`)];

export default function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [sequence, setSequence] = useState(2);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) inputRef.current?.focus();
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [entries]);

  const quickRun = (command: string) => {
    setInput("");
    execute(command);
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) inputRef.current?.focus();
  };

  function execute(rawCommand: string) {
    const command = rawCommand.trim();
    if (!command) return;
    setHistory((current) => [...current, command]);
    setHistoryIndex(-1);
    if (command.toLowerCase() === "clear") {
      setEntries([]);
      return;
    }

    const tokens = command.split(/\s+/);
    const base = tokens[0].toLowerCase();
    const argument = tokens[1]?.toLowerCase();
    let output: ReactNode;

    switch (base) {
      case "help":
        output = <div className="output-block"><p className="output-lead">Available commands</p><div className="help-grid">{[
          ["about", "A little about me"], ["projects", "Selected work"], ["skills", "Tools & technologies"], ["experience", "Work history"], ["education", "Education"], ["certifications", "Certifications"], ["contact", "Get in touch"], ["resume", "Download a resume"], ["neofetch", "System profile"], ["clear", "Clear this terminal"],
        ].map(([name, description]) => <div className="help-row" key={name}><code>{name}</code><span>{description}</span></div>)}</div><p className="output-note">Try <code>cat citiplus</code>, <code>cat glaucoma</code>, <code>cat var</code> or <code>sudo hire-me</code>.</p></div>;
        break;
      case "whoami":
        output = <div className="output-block"><p className="output-lead">{profile.name}</p><p>{profile.role} <span className="output-muted">· {profile.focus}</span></p><p className="output-muted">{profile.location}</p></div>;
        break;
      case "about":
        output = <div className="output-block"><p className="output-lead">Building useful things, from product interfaces to vision models.</p><p>{profile.summary}</p><div className="inline-tags"><span>Full-stack</span><span>Backend</span><span>Computer vision</span><span>Applied ML</span></div></div>;
        break;
      case "ls":
        output = <div className="output-block"><p className="file-list">about.txt <span>projects/</span> skills/ experience.log education.txt certifications.txt contact.txt resumes/</p><p className="output-note">Open a project with <code>cat citiplus</code>, <code>cat glaucoma</code>, <code>cat var</code> or <code>cat reshalla</code>.</p></div>;
        break;
      case "projects":
        output = <div className="output-block"><p className="output-lead">Selected projects <span className="output-muted">({projects.length})</span></p><div className="project-list">{projects.map((project) => <button key={project.id} className="text-command" onClick={() => quickRun(`cat ${project.id}`)}><span className="project-id">{project.id}</span><span>{project.name}</span><span className="project-arrow">↗</span></button>)}</div></div>;
        break;
      case "cat": {
        const project = projects.find((item) => item.id === argument || (argument === "reshalla" && item.id === "reshala"));
        output = project ? <div className="output-block"><div className="project-heading"><span className="project-id">{project.id}</span><span className="output-muted">{project.category}</span></div><p className="output-lead">{project.name}</p><p>{project.description}</p><div className="project-detail"><span className="detail-label">STACK</span><div className="inline-tags">{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div></div>{project.outcomes.length > 0 && <div className="project-detail"><span className="detail-label">OUTCOMES</span><ul className="outcome-list">{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div>}</div> : <div className="error-output">cat: {argument ? `'{argument}': no such project` : "missing project name"}<br /><span>Run <code>projects</code> to see available projects.</span></div>;
        break;
      }
      case "skills":
        output = <div className="output-block"><p className="output-lead">Tools I work with</p><div className="skills-grid">{skillGroups.map((group) => <div className="skill-row" key={group.label}><span>{group.label}</span><p>{group.items.join(" · ")}</p></div>)}</div></div>;
        break;
      case "experience":
        output = <div className="output-block"><p className="output-lead">Experience</p><div className="timeline">{experience.map((job) => <article className="timeline-item" key={job.company + job.role}><div className="timeline-head"><strong>{job.role}</strong><span>{job.dates}</span></div><p className="timeline-company">{job.company}</p><p>{job.details}</p></article>)}</div></div>;
        break;
      case "education":
        output = <div className="output-block"><p className="output-lead">{education.degree}</p><p>{education.school}</p><p className="output-muted">{education.dates} <span className="output-divider">·</span> {education.result}</p></div>;
        break;
      case "certifications":
        output = <div className="output-block"><p className="output-lead">Certifications & learning</p><ul className="simple-list">{certifications.map((item) => <li key={item}>{item}</li>)}</ul></div>;
        break;
      case "contact":
        output = <div className="output-block"><p className="output-lead">Let’s build something useful.</p><p>Reach me directly:</p><div className="contact-list"><a href={`mailto:${profile.email}`}>{profile.email}<span>↗</span></a><a href="tel:+917506064383">{profile.phone}<span>↗</span></a><span>{profile.location}</span></div></div>;
        break;
      case "resume": {
        const fullstack = "/resumes/abdullah-shaikh-fullstack.pdf";
        const aiml = "/resumes/abdullah-shaikh-aiml.pdf";
        output = argument === "--fullstack" || argument === "fullstack" ? <div className="output-block"><p className="output-lead">Full-stack / Software Engineering resume</p><a className="download-link" href={fullstack} download>Download full-stack resume <span>↓</span></a></div> : argument === "--aiml" || argument === "aiml" ? <div className="output-block"><p className="output-lead">AI/ML / Computer Vision resume</p><a className="download-link" href={aiml} download>Download AI/ML resume <span>↓</span></a></div> : <div className="output-block"><p className="output-lead">Choose a resume</p><div className="resume-links"><a href={fullstack} download><span>01</span>Full-Stack / Software Engineering <b>↓</b></a><a href={aiml} download><span>02</span>AI/ML / Computer Vision <b>↓</b></a></div><p className="output-note">Or use <code>resume --fullstack</code> / <code>resume --aiml</code>.</p></div>;
        break;
      }
      case "github":
      case "linkedin":
        output = <div className="output-block"><p className="output-lead">{base === "github" ? "GitHub" : "LinkedIn"} profile link was not included in the supplied resume.</p><p className="output-muted">Use <code>contact</code> to reach me directly.</p></div>;
        break;
      case "neofetch":
        output = <div className="neofetch"><pre aria-hidden="true">{`    .--.       `}<span>abdullah</span>{`@portfolio\n   |o_o |      `}<span>----------------</span>{`\n   |:_/ |      OS       Linux-minded\n  //   \\ \\     Role     Software Engineer\n (|     | )    Focus    Full-stack · AI/ML\n/'\\_   _/\`\\    Location ${profile.location}\n\\___)=(___/   Stack    TypeScript · Python`}</pre><div className="color-swatches" aria-label="Terminal palette"><i /><i /><i /><i /><i /><i /></div></div>;
        break;
      case "sudo":
        output = argument === "hire-me" ? <div className="output-block"><p className="output-lead">Access granted. Let’s talk.</p><p>Interested in discussing a role or project? Reach me directly.</p><a className="download-link" href={`mailto:${profile.email}?subject=Let%E2%80%99s%20work%20together`}>Email {profile.email} <span>↗</span></a></div> : <div className="error-output">sudo: {argument ? `'{argument}': command not found` : "a command is required"}<br /><span>Try <code>sudo hire-me</code>.</span></div>;
        break;
      case "history":
        output = <div className="output-block"><ol className="history-list">{history.slice(0, -1).map((item, index) => <li key={`${index}-${item}`}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></div>;
        break;
      default:
        output = <div className="error-output">bash: {command}: command not found<br /><span>Type <code>help</code> to see available commands.</span></div>;
    }

    setEntries((current) => [...current, { id: sequence, command, output }]);
    setSequence((current) => current + 1);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = input;
    setInput("");
    execute(value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = Math.max(0, historyIndex < 0 ? history.length - 1 : historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? "");
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex + 1;
      if (next >= history.length || historyIndex < 0) { setHistoryIndex(-1); setInput(""); }
      else { setHistoryIndex(next); setInput(history[next] ?? ""); }
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setEntries([]);
      setInput("");
    } else if (event.key === "Tab") {
      event.preventDefault();
      const match = commands.find((command) => command.startsWith(input.trim().toLowerCase()));
      if (match) setInput(match);
    }
  }

  return (
    <section className="terminal-app" aria-label="Interactive portfolio terminal">
      <div className="terminal-window">
        <div className="terminal-titlebar">
          <div className="window-controls" aria-hidden="true"><i /><i /><i /></div>
          <div className="window-title"><span className="title-lock">⌘</span> abdullah@portfolio <span className="title-path">— ~/home</span></div>
          <div className="window-online"><span /> online</div>
        </div>
        <div className="terminal-body">
          <aside className="terminal-rail">
            <div className="rail-label">SESSION</div>
            <div className="identity-card"><div className="avatar">AS<span>.</span></div><strong>{profile.name}</strong><span>{profile.role}</span><small>{profile.location}</small></div>
            <div className="rail-divider" />
            <div className="rail-label">QUICK ACCESS</div>
            <nav className="rail-nav" aria-label="Terminal commands">{quickCommands.map((command) => <button key={command} onClick={() => quickRun(command)}><span className="nav-chevron">›</span>{command}</button>)}</nav>
            <div className="rail-spacer" />
            <button className="rail-resume" onClick={() => quickRun("resume")}><span className="resume-icon">↓</span><span><strong>Resume</strong><small>PDF · 2 versions</small></span></button>
            <div className="rail-hint"><span className="keycap">↑</span><span className="keycap">↓</span> history <span className="keycap">tab</span> complete</div>
          </aside>
          <div className="terminal-main">
            <div className="terminal-scroll" ref={outputRef} aria-live="polite" aria-relevant="additions text" aria-label="Terminal output">
              <div className="welcome-block">
                <p className="welcome-time">SESSION READY <span>via web terminal</span></p>
                <h2>Hey, I’m <span>Abdullah.</span></h2>
                <p className="welcome-copy">Software engineer building full-stack products and exploring<br className="wide-break" /> computer vision with applied machine learning.</p>
                <div className="welcome-meta"><span><i className="mini-dot" /> Mumbai, IN</span><span className="meta-separator">/</span><span>Type <code>help</code> to get started</span></div>
              </div>
              <div className="output-history">{entries.map((entry) => <div className="history-entry" key={entry.id}>{entry.command && <div className="command-line"><span className="prompt"><b>abdullah</b>@portfolio<span>:</span><i>~</i>$</span><span>{entry.command}</span></div>}<div className="command-output">{entry.output}</div></div>)}</div>
              <form className="input-line" onSubmit={submit} aria-label="Enter a terminal command">
                <label className="prompt" htmlFor="terminal-input"><b>abdullah</b>@portfolio<span>:</span><i>~</i>$</label>
                <input id="terminal-input" ref={inputRef} type="text" autoComplete="off" autoCapitalize="off" spellCheck={false} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} aria-label="Command input" aria-describedby="terminal-input-help" />
                <span className="cursor-block" aria-hidden="true" />
                <span id="terminal-input-help" className="sr-only">Type a portfolio command and press Enter. Use arrow keys to browse command history.</span>
              </form>
            </div>
            <div className="terminal-statusbar"><span><i className="mini-dot" /> bash <span className="status-slash">/</span> interactive portfolio</span><span><kbd>CTRL</kbd> + <kbd>L</kbd> clear <span className="status-slash">·</span> <kbd>↑</kbd><kbd>↓</kbd> history</span></div>
          </div>
        </div>
      </div>
      <div className="terminal-caption"><span><i /> terminal session active</span><span>Try a command <b>↴</b></span></div>
      <div className="quick-chips" aria-label="Suggested commands">{quickCommands.map((command) => <button key={command} onClick={() => quickRun(command)}><span>$</span> {command}</button>)}</div>
    </section>
  );
}
