import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      name: "ReShALA (Resource Sharing Application for Learning)",
      period: "2022 - 2023",
      tech: "React.js, Node.js, Express, MongoDB, AWS",
      achievements: [
        "Built a collaborative platform for students to share learning materials and resources",
        "Implemented secure authentication and role-based access control",
        "Deployed on AWS with scalable backend architecture and cloud storage",
      ],
      link: "https://github.com/Abdullah-Shaikh03/RESHALA-Beta-Project",
    },
    {
      name: "Hybrid Content-Collaborative based Music Recommendation System: Music.AI",
      period: "June 2023 - December 2023",
      tech: "Python, Flask, Scikit-learn, Matplotlib, Seaborn, NLP",
      achievements: [
        "Developed a music recommendation system combining content-based and collaborative filtering techniques",
        "Analyzed user preferences and song features to provide personalized recommendations",
        "Visualized data insights using Matplotlib and Seaborn for better understanding of user behavior",
      ],
      link: "https://github.com/Abdullah-Shaikh03/Music.AI",
    },
    {
      name: "Movie Review Sentiment Analysis",
      period: "Jan 2024 - May 2024",
      tech: "Python, NLTK, Scikit-learn, Flask",
      achievements: [
        "Built a sentiment analysis model to classify movie reviews as positive or negative",
        "Preprocessed text data using NLTK and extracted features for model training",
        "Deployed the model using Flask to provide real-time sentiment predictions",
      ],
      link: "https://github.com/bushra-07/movie-review-sentiment-analysis.git",
    },
    {
      name: "HybridNet: A Custom CNN model for Glaucoma Detection",
      period: "2024 - 2025",
      tech: "Python, PyTorch, ROCm, Deep Neural Network",
      achievements: [
        "Developed a deep learning model to detect glaucoma from retinal images with high accuracy",
        "Utilized advanced CNN architectures and transfer learning techniques",
        "Conducted extensive experimentation and hyperparameter tuning to optimize performance",
      ],
      link: "https://github.com/Abdullah-Shaikh03/GlaucomaDetection.git",
    },
    {
      name: "Video Assistant Referee (VAR) for Offside detection",
      period: "2024 - 2025",
      tech: "Python, OpenCV, Yolo 11n, Flask, PyTorch",
      achievements: [
        "Developed a computer vision system to assist referees in offside decisions during football matches",
        "Trained machine learning models for player detection and tracking using annotated video data",
        "Integrated real-time video processing with a user-friendly interface for match officials",
      ],
      link: "https://github.com/Abdullah-Shaikh03/VAR-Major-Project",
    },
    {
      name: "E-commerce Platform",
      period: "Ongoing",
      tech: "Next.js, Express.js, PostgreSQL, AWS EC2/S3, GitHub Actions",
      achievements: [
        "Developed a full-featured e-commerce platform with product listings, shopping cart, and checkout functionality",
        "Implemented secure payment processing and user authentication",
        "Set up CI/CD pipelines with GitHub Actions for automated testing and deployment",
      ],
      link: "",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Projects
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my personal and professional projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {projects.map((project, index) => (
              <div key={index} className="glass rounded-2xl hover:backdrop-blur-3xl hover:shadow-foreground hover:translate-x-4 hover:-translate-4 ease-in duration-300">
                <Card className="overflow-hidden h-full flex flex-col">
                  <CardContent className="flex-1 flex flex-col p-5">
                    {/* Name */}
                    <h3 className="text-lg font-bold">{project.name}</h3>

                    {/* Period */}
                    <p className="text-xs text-muted-foreground mt-1">
                      {project.period}
                    </p>

                    {/* First achievement as description preview */}
                    <p className="text-sm text-muted-foreground mt-2 flex-1">
                      {project.achievements[0]}
                    </p>

                    {/* Tech tags */}
                    <div className="project-tags mt-3 flex flex-wrap gap-2">
                      {project.tech
                        .split(",")
                        .slice(0, 3)
                        .map((tag, i) => (
                          <span
                            key={i}
                            className="project-tag text-xs bg-muted px-2 py-1 rounded-md"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="project-links mt-4 flex gap-2">
                      {project.link && (
                        <Button size="sm" variant="outline" asChild>
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaGithub />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
