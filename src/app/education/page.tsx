import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Education() {
  const education = [
    {
      degree: "Bachelor of Engineering in Computer Science and Engineering (AI & ML)",
      institution: "M.H. Saboo Siddik College of Engineering, Mumbai",
      period: "2021 - 2025",
      location: "Mumbai, India",
      achievements: [
        "Graduated with strong academic performance and hands-on project experience",
        "Engaged in research on computer vision and machine learning (VAR project)",
        // "Actively participated in IEEE activities and hackathons",
      ],
    },
    {
      degree: "Higher Secondary Certificate (HSC) in Science (Bifocal CS)",
      institution: "K.M. Agarwarl College of Arts Commerce and Science",
      period: "2019 - 2021",
      location: "Mumbai, India",
      achievements: [
        "Completed coursework with focus on mathematics and science fundamentals",
      ],
    },
  ]

  return (
    <section id="education" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Education</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic background and learning journey
            </p>
          </div>

          <div className="space-y-8 mt-12">
            {education.map((edu, index) => (
              <div key={index} className="timeline-item rounded-4xl glass hover:backdrop-blur-3xl hover:shadow-foreground hover:translate-x-4 hover:-translate-4 ease-in duration-300">
                <Card className="border-l-4 border-l-primary transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                        <Badge variant="outline" className="mb-1 md:mb-0">
                          {edu.period}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{edu.location}</span>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {edu.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">{ach}</span>
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
  )
}
