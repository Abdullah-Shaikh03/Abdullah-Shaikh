import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  const projects = [
    {
      name: "RESHAL (Resource Sharing Application for Learning)",
      period: "2022 - 2023",
      tech: "React.js, Node.js, Express, MongoDB, AWS",
      achievements: [
        "Built a collaborative platform for students to share learning materials and resources",
        "Implemented secure authentication and role-based access control",
        "Deployed on AWS with scalable backend architecture and cloud storage",
      ],
      link: "",
    },
    {
      name:"Hybrid Content-Collaborative based Music Recommendation System: Music.AI",
      period: "June 2023 - December 2023",
      tech: "Python, Flask, Scikit-learn, Matplotlib, Seaborn, NLP",
      achievements: [
        "Developed a music recommendation system combining content-based and collaborative filtering techniques",
        "Analyzed user preferences and song features to provide personalized recommendations",
        "Visualized data insights using Matplotlib and Seaborn for better understanding of user behavior",
      ],
      link: "",
    },
    {
      name:"Movie Review Sentiment Analysis",
      period: "Jan 2024 - May 2024",
      tech: "Python, NLTK, Scikit-learn, Flask",
      achievements: [
        "Built a sentiment analysis model to classify movie reviews as positive or negative",
        "Preprocessed text data using NLTK and extracted features for model training",
        "Deployed the model using Flask to provide real-time sentiment predictions",
      ],
      link: "",
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
      link: "",
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
      link: "",
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
              Key academic, research, and personal projects I’ve worked on
            </p>
          </div>

          <div className="space-y-8 mt-12 ">
            {projects.map((project, index) => (
              <div
                key={index}
                className="timeline-item glass rounded-4xl hover:backdrop-blur-3xl hover:shadow-foreground hover:translate-x-4 hover:-translate-4 ease-in duration-300"
              >
                <Card className="border-l-4 border-l-primary transition-all duration-300 hover:shadow-lg rounded-3xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{project.name}</h3>
                        <p className="text-muted-foreground">{project.tech}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                        <Badge variant="outline">{project.period}</Badge>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {project.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">
                            {ach}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
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
