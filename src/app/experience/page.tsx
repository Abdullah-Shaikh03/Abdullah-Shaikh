import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import Skills from "./skills-content"

export default function Experience() {
  const experiences = [
    {
      title: "Full-Stack Software Engineer",
      company: "QuickSO India",
      period: "July 2025 - Present",
      location: "Vile Parle – Mumbai",
      achievements: [
        "Developing a CMS platform tailored for the construction industry, enabling project management, task tracking, and milestone updates",
        "Integrated a built-in drive feature for document storage and collaboration",
        "Designed and deployed the system on AWS EC2 with a React.js frontend and Strapi backend",
        "Implemented PostgreSQL as the primary database and managed version control with Git",
        "Customized CMS features to align with specific client requirements and workflows",
      ],
    },
    {
      title: "Independent Consultant (Full Stack Developer)",
      company: "Self-Employed",
      period: "January 2024 - December 2024",
      location: "",
      achievements: [
        "Built a performant e-commerce platform using Next.js, Express, and PostgreSQL",
        "Set up AWS EC2/S3 infrastructure and CI/CD with GitHub Actions, cutting deployment time by 75%",
        "Scoped requirements, negotiated deliverables, and provided post-launch support directly with clients",
      ],
    },
    {
      title: "Web Developer Intern",
      company: "IEEE Bombay Section",
      period: "August 2023 - September 2023",
      location: "",
      achievements: [
        "Developed RESTful APIs for toolkit modules and collaborated with cross-functional teams for integration and testing",
        "Integrated CI/CD pipelines using GitHub Actions, improving QA turnaround by 50%",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Experience
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:textbase/relaxed xl:text-xl/relaxed">
              My professional journey and key accomplishments
            </p>
          </div>

          <div className="space-y-8 mt-12">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="timeline-item glass rounded-4xl hover:backdrop-blur-3xl hover:shadow-foreground hover:translate-x-4 hover:-translate-4 ease-in duration-300"
              >
                <Card className="border-l-4 border-l-primary  transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">
                          {experience.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {experience.company}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                        <Badge variant="outline" className="mb-1 md:mb-0">
                          {experience.period}
                        </Badge>
                        {experience.location ? (
                          <span className="text-sm text-muted-foreground">
                            {experience.location}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {experience.achievements?.length ? (
                      <ul className="mt-4 space-y-2">
                        {experience.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-sm text-muted-foreground italic">
                        Highlights coming soon.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="mt-20" id="skills">
            {/* <Skills /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
