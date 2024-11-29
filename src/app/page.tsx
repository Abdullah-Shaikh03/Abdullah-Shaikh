"use client"
import Link from 'next/link'
import React, { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Code2, Database, Brain, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"

// Define types for the skill and project objects
interface Skill {
  name: string
  level: number
}

interface Project {
  title: string
  description: string
  technologies: string[]
  link: string
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale }}
        className="h-screen flex flex-col items-center justify-center text-center px-4 relative"
      >
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
        >
          Shaikh Abdullah
        </motion.h1>
        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8"
        >
          Full Stack Developer | AI/ML Specialist
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8">
            <Link href={'#projects'}>Explore My Work</Link>
          </Button>
        </motion.div>
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-muted-foreground" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 px-4 bg-background/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">About Me</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
            I&apos;m a passionate Full Stack Developer with a strong focus on AI and Machine Learning. 
            Currently pursuing my Bachelor&apos;s in Computer Science and Engineering, I&apos;ve developed 
            a diverse skill set that allows me to create innovative solutions across various domains.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" className="gap-2">
              <Github className="w-5 h-5" />
              <Link href='https://github.com/Abdullah-Shaikh03'>GitHub</Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Linkedin className="w-5 h-5" />
              <Link href={'https://www.linkedin.com/in/abdullah-shaikh-8984b9204/'}>
              LinkedIn
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Mail className="w-5 h-5" />
              <Link href={'#contact'}>Email</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 px-4 bg-muted/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">My Tech Stack</h2>
          <Tabs defaultValue="web" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="web">Web Development</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="ml">Machine Learning</TabsTrigger>
            </TabsList>
            <TabsContent value="web">
              <SkillCard
                icon={<Code2 className="w-12 h-12" />}
                title="Web Development"
                skills={[
                  { name: "React", level: 90 },
                  { name: "Next.js", level: 85 },
                  { name: "TypeScript", level: 80 },
                  { name: "Tailwind CSS", level: 95 },
                  { name: "Redux", level: 75 },
                ]}
              />
            </TabsContent>
            <TabsContent value="backend">
              <SkillCard
                icon={<Database className="w-12 h-12" />}
                title="Backend Development"
                skills={[
                  { name: "Node.js", level: 85 },
                  { name: "Express", level: 80 },
                  { name: "MongoDB", level: 75 },
                  { name: "SQL", level: 70 },
                  { name: "AWS", level: 65 },
                ]}
              />
            </TabsContent>
            <TabsContent value="ml">
              <SkillCard
                icon={<Brain className="w-12 h-12" />}
                title="Machine Learning"
                skills={[
                  { name: "Python", level: 90 },
                  { name: "TensorFlow", level: 80 },
                  { name: "PyTorch", level: 75 },
                  { name: "Scikit-learn", level: 85 },
                  { name: "Deep Learning", level: 70 },
                ]}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 px-4 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Featured Projects</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 px-4 bg-muted/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Get in Touch</h2>
          <Card>
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
              <CardDescription>I&apos;ll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Input
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    className="min-h-[150px]"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

interface SkillCardProps {
  icon: React.ReactNode
  title: string
  skills: Skill[]
}

function SkillCard({ icon, title, skills }: SkillCardProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm font-medium">{skill.level}%</span>
            </div>
            <Progress value={skill.level} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  link: string
}

function ProjectCard({ title, description, technologies, link }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="secondary">{tech}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              View Project <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const projects: Project[] = [
  {
    title: "RESHALA",
    description: "A C2C platform for exchanging used academic books and accessories.",
    technologies: ["HTML5", "CSS", "Bootstrap5", "NodeJS", "MySQL", "JavaScript"],
    link: "https://github.com/Abdullah-Shaikh03/RESHALA-Beta-Project"
  },
  {
    title: "Skin Disease Analysis",
    description: "Deep Neural Network model to analyze and predict 400+ skin diseases from photographs.",
    technologies: ["Python", "PyTorch", "GoogleNet", "CNN"],
    link: "https://github.com/Abdullah-Shaikh03/Skin_Disease_Detector-"
  },
  {
    title: "Glaucoma Detection",
    description: "Research project achieving 97.5% accuracy in glaucoma detection using custom CNN architecture.",
    technologies: ["Python", "PyTorch", "CNN", "VGG"],
    link: "https://github.com/Abdullah-Shaikh03/GlaucomaDetection"
  },
  {
    title: "Emotion Detection",
    description: "RNN-based system capable of detecting 7 different emotional states from audio input.",
    technologies: ["Python", "PyTorch", "RNN", "Audio Processing"],
    link: "https://github.com/Abdullah-Shaikh03/EmotionDetection-RNN"
  }
]