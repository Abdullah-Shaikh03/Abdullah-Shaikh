export const profile = {
  name: "Abdullah Shaikh",
  role: "Software Engineer",
  focus: "Full-Stack & Backend · AI/ML & Computer Vision",
  location: "Mumbai, India",
  email: "abdullah.sk0517@gmail.com",
  phone: "+91 75060 64383",
  summary:
    "I build full-stack products and backend systems, and apply deep learning to computer-vision problems. My work spans product development, cloud deployment, model training, evaluation, and interpretability.",
};

export const projects = [
  {
    id: "citiplus",
    name: "Citiplus / E-commerce Platform",
    category: "Full-stack product",
    description:
      "A full-stack e-commerce platform with an admin dashboard for product and order management. Migrated a legacy WordPress/cPanel system to a modern architecture and owned system design, development, and deployment.",
    stack: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma", "Redis", "AWS S3", "CloudFront"],
    outcomes: ["100–200 daily users", "~60% faster page loads", "Admin operations reduced by 2×", "Bounce rate reduced by 20%"],
  },
  {
    id: "glaucoma",
    name: "Glaucoma Detection using Hybrid CNN",
    category: "Research · Computer vision",
    description:
      "A fundus-image classification research project combining ResNet, DenseNet, VGG, and Inception with ensemble techniques. Grad-CAM and feature-map analysis were used to inspect model decisions. A research paper is in preparation.",
    stack: ["PyTorch", "OpenCV", "NumPy", "Matplotlib", "REFUGE", "ACRIMA", "Grad-CAM"],
    outcomes: ["94.16% validation accuracy", "91.17% test accuracy"],
  },
  {
    id: "var",
    name: "VAR — Offside Detection System",
    category: "Computer vision",
    description:
      "An experimental single-camera football analysis pipeline. A fine-tuned detector and object tracking identify players, referees, goalkeepers, and the ball, then map positions onto a 2D field model for rule-based offside decisions.",
    stack: ["YOLOv11", "OpenCV", "DeepSORT", "Python", "SoccerNet"],
    outcomes: ["Processes video at 30 FPS", "~65% detection accuracy under single-camera constraints"],
  },
  {
    id: "reshala",
    name: "Re-Shala",
    category: "Full-stack product",
    description:
      "A C2C academic exchange platform for students to exchange learning resources, with authentication, listings, and REST APIs.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    outcomes: [],
  },
] as const;

export const experience = [
  {
    role: "Associate System Engineer Trainee",
    company: "Tata Consultancy Services (TCS)",
    dates: "May 2026 – Present",
    details: "In the TCS Initial Learning Program, covering enterprise software practices, system design fundamentals, and client delivery processes. Project allocation is based on business requirements.",
  },
  {
    role: "Freelance Software Developer",
    company: "Independent",
    dates: "Jan 2024 – Dec 2025 · Oct 2025 – Present",
    details: "Led end-to-end development of a full-stack e-commerce platform, including backend services, admin workflows, and AWS infrastructure.",
  },
  {
    role: "Full Stack Software Engineer",
    company: "QuickSO India",
    dates: "Jul 2025 – Sep 2025",
    details: "Contributed to a construction SaaS platform, integrated a 3D model viewer, and built AWS staging/production infrastructure and CI/CD pipelines.",
  },
  {
    role: "Full Stack Developer Intern",
    company: "IEEE Bombay Section",
    dates: "Sep 2023 – Oct 2023",
    details: "Contributed frontend components and API integrations for a developer toolkit and API interaction dashboards.",
  },
] as const;

export const skillGroups = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "C++"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "SSR"] },
  { label: "Backend", items: ["Node.js", "Express", "Django", "Flask", "REST APIs", "JWT"] },
  { label: "Data", items: ["PostgreSQL", "Prisma", "MongoDB", "MySQL", "Redis"] },
  { label: "Cloud & DevOps", items: ["AWS S3", "CloudFront", "EC2", "CI/CD", "Git", "Linux"] },
  { label: "ML & Vision", items: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "YOLOv11", "DeepSORT", "Grad-CAM"] },
] as const;

export const education = {
  degree: "B.E. Computer Science and Engineering (AI & ML)",
  school: "M.H. Saboo Siddik College of Engineering, Byculla",
  dates: "2021 – 2025",
  result: "CGPA: 6.91",
};

export const certifications = [
  "AWS Certified Machine Learning Engineer — In Progress",
  "The Complete Neural Networks Bootcamp: Theory, Applications (Udemy)",
  "Python for Data Science and Machine Learning Bootcamp (Udemy)",
  "Supervised Machine Learning: Regression and Classification (Coursera)",
  "Introduction to Generative AI (Google)",
  "AWS Academy Graduate – Cloud Foundations",
  "Google Cloud Foundations – Data, ML & AI",
  "Deloitte Data Analytics Job Simulation (Forage)",
] as const;
