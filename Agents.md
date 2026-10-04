# AGENTS.md

## Project: Abdullah Shaikh — Terminal Portfolio

### 1. Mission

Build and maintain a production-quality personal portfolio for Abdullah Shaikh using Next.js and TypeScript.

The portfolio should feel like a real, polished Linux/Bash terminal rather than a conventional portfolio with a terminal skin.

Primary goals:

1. Present Abdullah as a software engineer with strong full-stack/backend experience and applied AI/ML/computer-vision experience.
2. Make the interactive terminal the primary navigation and interaction model.
3. Keep the experience fast, accessible, responsive, and understandable to recruiters who may not normally use a terminal.
4. Showcase technically meaningful projects, especially Citiplus, Glaucoma Detection, and VAR Offside Detection.
5. Make the implementation clean enough to serve as a demonstration of frontend engineering quality.

---

## 2. Source of Truth

The repository owner has provided two resumes:

- Full-stack resume
- AI/ML resume

Treat those resumes as the authoritative source for factual career/profile information.

Important rule:

> Never invent employers, dates, technologies, certifications, responsibilities, metrics, URLs, awards, or achievements.

If information differs between the two resumes, do not silently merge contradictory claims. Prefer the version appropriate to the portfolio section and preserve the underlying factual meaning.

The portfolio may unify the positioning, but it must not fabricate a third résumé.

### Verified profile positioning

The portfolio can present Abdullah as:

**Software Engineer | Full-Stack & Backend Developer | AI/ML & Computer Vision**

The full-stack resume establishes experience with:

- TypeScript / JavaScript
- Python
- Java
- C++
- React.js
- Next.js
- Tailwind CSS
- Node.js
- Express.js
- Django
- Flask
- REST APIs
- JWT
- PostgreSQL
- Prisma
- MongoDB
- MySQL
- Redis
- AWS S3
- AWS CloudFront
- AWS EC2
- CI/CD
- Git
- Linux
- RBAC
- OOP
- DSA
- basic system design

The AI/ML resume establishes experience with:

- PyTorch
- TensorFlow
- Scikit-learn
- OpenCV
- NumPy
- Pandas
- Matplotlib
- Seaborn
- ResNet
- DenseNet
- VGG
- Inception
- ensemble models
- YOLOv11
- DeepSORT
- Grad-CAM
- AWS
- REST APIs
- Linux

Do not claim expertise in technologies merely because they appear in a generic skills list. Project-specific claims should remain tied to the corresponding project.

---

## 3. Resume Facts

### Current role

Tata Consultancy Services (TCS)

Role wording may be represented as:

- Associate System Engineer Trainee
- Software Engineer Trainee

Dates:

**May 2026 – Present**

Resume-supported description:

- Joined as Assistant System Engineer-Trainee.
- TCS Initial Learning Program covers enterprise software development practices, system design fundamentals, software engineering practices, and client delivery processes.
- Project allocation is based on business requirements within a global IT services environment.

Do not claim a production client/project unless the repository owner explicitly provides that information.

### Freelance Software Developer

The resumes contain overlapping date ranges:

- Jan 2024 – Dec 2025
- Oct 2025 – Present

Do not attempt to mathematically reconcile these dates without explicit user input.

Resume-supported work includes a full-stack e-commerce platform with:

- Next.js
- React
- Tailwind CSS
- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma
- Redis
- AWS S3
- AWS CloudFront
- RBAC
- REST APIs

Supported metrics from the resume:

- 100–200 daily users
- page-load performance improved by approximately 60%
- admin operation time reduced by 2x
- bounce rate reduced by 20%

Do not exaggerate these metrics or convert approximate metrics into false precision.

### QuickSO India

Role:

**Full Stack Software Engineer**

Dates:

**Jul 2025 – Sep 2025**

Resume-supported work:

- SaaS platform for construction firms
- 3D model viewer for architectural designs
- AWS staging and production infrastructure
- CI/CD pipelines
- deployment time reduced by approximately 30%
- Strapi CMS
- PostgreSQL
- JWT authentication
- backend services
- debugging
- production deployment

### IEEE Bombay Section

Role:

**Full Stack Developer Intern**

Dates:

**Sep 2023 – Oct 2023**

Resume-supported work:

- developer toolkit platform
- API integrations
- frontend components
- API interaction dashboards
- Git
- modern frontend frameworks

---

## 4. Projects

### Citiplus / E-commerce Platform

This should be a major portfolio project.

The resume establishes:

- full-stack e-commerce platform
- admin dashboard
- Next.js / React / Tailwind CSS
- Node.js / Express / TypeScript
- PostgreSQL / Prisma
- Redis
- AWS S3
- AWS CloudFront
- RBAC
- product and order management
- SSR
- SEO improvements
- legacy WordPress/cPanel migration
- end-to-end system design, development, and deployment

If the repository contains more detailed implementation information, it may be displayed only when it is actually verified from project data supplied by the owner.

Do not invent architectural details solely because they are common for an e-commerce system.

### Glaucoma Detection using Hybrid CNN

Resume-supported facts:

- Research work
- PyTorch
- OpenCV
- NumPy
- Matplotlib
- hybrid architecture combining ResNet, DenseNet, VGG, and Inception
- ensemble techniques
- REFUGE and ACRIMA datasets
- 94.16% validation accuracy
- 91.17% test accuracy
- Grad-CAM
- feature-map analysis
- research paper preparation

The portfolio may explain the technical significance, but must not claim clinical validation or medical deployment.

### VAR — Offside Detection System

Resume-supported facts:

- YOLOv11
- OpenCV
- DeepSORT
- Python
- SoccerNet dataset
- object detection for players, referees, goalkeepers, and ball
- 30 FPS video processing
- spatial representation
- 2D field mapping
- rule-based offside determination
- approximately 65% detection accuracy under single-camera constraints
- limitations from monocular vision
- proposed multi-camera approach

Do not describe this as an official VAR system or imply professional football-league deployment.

### Re-Shala

Resume-supported facts:

- C2C academic exchange platform
- React
- Node.js
- Express
- MongoDB
- MERN stack
- authentication
- product listings
- REST APIs
- backend schema
- user-generated content

---

## 5. Terminal UX

The terminal is the primary interface.

Initial state should look approximately like:

```text
abdullah@portfolio:~$ whoami

Abdullah Shaikh
Software Engineer · Full-Stack · AI/ML

abdullah@portfolio:~$ help
```

Suggested commands:

```text
help
clear
whoami
about
ls
projects
skills
experience
education
certifications
contact
resume
github
linkedin
neofetch
sudo hire-me
```

Project-specific commands can include:

```text
cat citiplus
cat glaucoma
cat var
cat reshalla
```

Command parsing should be deterministic and maintainable.

The terminal should support:

- command history
- ArrowUp / ArrowDown history navigation
- Ctrl+L equivalent for clear
- sensible handling of unknown commands
- autocomplete if implemented
- clickable command suggestions
- copyable output
- keyboard navigation
- mobile touch interaction

Unknown command example:

```text
bash: foo: command not found

Type 'help' to see available commands.
```

Do not implement fake shell execution, arbitrary filesystem access, or anything that suggests commands are being executed on a real server.

---

## 6. Recruiter UX

Terminal aesthetics must not compromise usability.

Provide discoverable shortcuts such as:

```text
Try:
[help] [about] [projects] [skills] [experience] [contact]
```

Clickable controls should execute the same command system as typed commands.

A recruiter should be able to understand the portfolio within approximately 10–20 seconds without knowing Bash.

The portfolio should expose important information without requiring the user to discover every command.

---

## 7. Visual Direction

Preferred aesthetic:

- modern Linux terminal
- understated
- technical
- professional
- dark UI
- excellent typography
- subtle animations

Avoid:

- generic hacker clichés
- excessive neon green
- matrix rain
- unnecessary glitch effects
- CRT distortion
- excessive scanlines
- fake cybersecurity imagery
- overuse of terminal ASCII art

A subtle terminal-window frame is encouraged.

Suggested palette:

```text
Background: #0D1117
Panel:      #11161D
Text:       #E6EDF3
Muted:      #8B949E
Accent:     #58A6FF
Success:    #3FB950
Error:      #F85149
```

Use CSS variables/tokens rather than scattering colors throughout components.

Use a high-quality monospace font such as Geist Mono or JetBrains Mono where appropriate.

---

## 8. Responsive Design

Desktop should feel like a full terminal application.

Mobile should remain genuinely usable.

Do not simply shrink the desktop layout.

Requirements:

- no horizontal overflow
- usable mobile keyboard input
- touch-friendly controls
- readable command output
- terminal window adapts to viewport height
- long project descriptions wrap correctly
- buttons/command suggestions remain accessible
- respect safe areas on mobile devices

---

## 9. Accessibility

Follow WCAG-oriented practices.

Requirements:

- semantic HTML
- visible focus states
- keyboard navigation
- appropriate ARIA labels
- sufficient color contrast
- reduced-motion support
- terminal output should be understandable to screen readers
- do not rely solely on color
- interactive elements must be actual buttons/links where appropriate

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

## 10. Architecture

Prefer a simple, maintainable architecture.

Recommended structure:

```text
app/
components/
  terminal/
data/
lib/
public/
```

Keep portfolio content separate from UI components.

Prefer:

```text
data/about.ts
data/projects.ts
data/skills.ts
data/experience.ts
data/education.ts
data/certifications.ts
```

over hardcoding content into React components.

The command parser should operate on structured data wherever possible.

Avoid unnecessary global state.

Avoid adding a backend unless there is a clear requirement.

---

## 11. Next.js Guidelines

Use modern Next.js conventions.

Prefer:

- TypeScript
- App Router
- Server Components by default
- Client Components only where interactivity requires them
- metadata API
- optimized fonts
- optimized images
- static generation where appropriate

The interactive terminal itself will likely be a Client Component.

Do not introduce unnecessary libraries.

Before adding a dependency, ask:

1. Can this be implemented cleanly with the existing stack?
2. Does the dependency materially improve the user experience?
3. Is the dependency maintained and lightweight?

---

## 12. SEO

Even though the UI looks like a terminal, the underlying page must be SEO-friendly.

Include:

- meaningful page title
- description
- Open Graph metadata
- canonical URL when known
- semantic content
- structured headings
- accessible project information

Do not hide all meaningful portfolio content exclusively behind client-side JavaScript.

---

## 13. Performance

Prioritize:

- fast initial render
- minimal JavaScript
- no unnecessary animation loops
- optimized fonts
- lazy loading for non-critical assets
- no huge background assets
- avoid hydration-heavy libraries

The terminal should feel instantaneous.

Command execution should not visibly lag unless a deliberate typing animation is being used.

Typing animations must be optional and should never block interaction.

---

## 14. Security

Never execute user-entered terminal commands through:

- shell
- `eval`
- server commands
- filesystem APIs
- arbitrary code execution

The terminal is a UI simulation.

Command input must be parsed against a controlled command registry.

External links should use safe navigation behavior.

Never expose secrets or environment variables.

---

## 15. Resume Handling

The portfolio should provide access to the appropriate resume(s).

Because there are both Full-Stack and AI/ML resumes, consider:

```text
resume
resume --fullstack
resume --aiml
```

Only implement this if actual resume files are added to the repository.

Do not embed private contact data into analytics or third-party services.

---

## 16. Content Tone

The writing should be:

- concise
- technically credible
- direct
- professional
- evidence-based

Avoid:

- buzzword stuffing
- exaggerated claims
- "passionate ninja/guru/rockstar" language
- fake enterprise terminology
- unsupported claims

Use measurable outcomes when supported by the resumes.

---

## 17. Easter Eggs

A few tasteful terminal easter eggs are encouraged.

Examples:

```text
neofetch
sudo hire-me
history
fortune
```

They must never interfere with the primary portfolio experience.

Do not create dozens of gimmicks.

---

## 18. Testing

Before considering a feature complete:

- run TypeScript checks
- run linting
- run production build
- test desktop viewport
- test mobile viewport
- test keyboard navigation
- test unknown commands
- test command history
- test clear
- test external links
- test resume links if present
- test reduced-motion behavior

Do not leave TypeScript errors or console errors.

---

## 19. Git Discipline

Make focused changes.

Do not:

- rewrite unrelated files
- change configuration without reason
- add dependencies unnecessarily
- commit generated build artifacts
- expose secrets
- modify lockfiles without a dependency-related reason

Use descriptive commit messages if commits are requested.

---

## 20. Definition of Done

A feature is complete only when:

1. It matches the terminal-first visual language.
2. It works on desktop and mobile.
3. It is keyboard accessible.
4. It does not introduce console errors.
5. TypeScript passes.
6. Lint passes.
7. Production build passes.
8. Content is grounded in the supplied resumes or explicitly provided project information.
9. No unsupported claims have been introduced.
10. The implementation remains simple and maintainable.

When uncertain about factual portfolio content, stop and ask rather than inventing.
