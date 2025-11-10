"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LayoutGrid, Eye, Settings, Plus, X } from "lucide-react"

interface PortfolioData {
  fullName: string
  title: string
  bio: string
  email: string
  phone: string
  projects: Array<{
    id: string
    title: string
    description: string
    link: string
    image: string
  }>
  skills: string[]
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
  }
}

const TEMPLATES = [
  { id: "minimal", name: "Minimal", description: "Clean and simple design" },
  { id: "modern", name: "Modern", description: "Contemporary layout with cards" },
  { id: "portfolio", name: "Portfolio", description: "Project-focused design" },
]

export default function PortfolioBuilder() {
  const [template, setTemplate] = useState("minimal")
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    fullName: "Your Name",
    title: "Full Stack Developer",
    bio: "I build beautiful and functional web experiences.",
    email: "hello@example.com",
    phone: "+1 (555) 000-0000",
    projects: [
      { id: "1", title: "Project 1", description: "Description here", link: "#", image: "/project-management-team.png" },
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    socialLinks: { github: "#", linkedin: "#", twitter: "#" },
  })
  const [preview, setPreview] = useState(false)

  const handleInputChange = (key: string, value: string) => {
    setPortfolioData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSkillAdd = (skill: string) => {
    if (skill && !portfolioData.skills.includes(skill)) {
      setPortfolioData((prev) => ({ ...prev, skills: [...prev.skills, skill] }))
    }
  }

  const handleSkillRemove = (skill: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleProjectAdd = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Project description",
      link: "#",
      image: "/project-management-team.png",
    }
    setPortfolioData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const handleProjectUpdate = (id: string, updates: Partial<(typeof portfolioData.projects)[0]>) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }))
  }

  const handleProjectRemove = (id: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }))
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <LayoutGrid className="w-8 h-8 text-orange-500" />
              Portfolio Builder
            </h1>
            <p className="text-gray-400">Create your professional portfolio website</p>
          </div>
          <Button onClick={() => setPreview(!preview)} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Eye className="w-4 h-4 mr-2" />
            {preview ? "Edit" : "Preview"}
          </Button>
        </div>

        {preview ? (
          <PortfolioPreview data={portfolioData} template={template} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Editor */}
            <div className="lg:col-span-1 space-y-6">
              {/* Template Selection */}
              <Card className="bg-gray-900 border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Template</h2>
                <div className="space-y-2">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        template === t.id ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <p className="font-medium">{t.name}</p>
                      <p className="text-sm opacity-75">{t.description}</p>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Basic Info */}
              <Card className="bg-gray-900 border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Basic Info
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                    <Input
                      value={portfolioData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300">Title</label>
                    <Input
                      value={portfolioData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300">Bio</label>
                    <Textarea
                      value={portfolioData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="mt-1 bg-gray-800 border-gray-700 text-white min-h-24"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <Input
                      type="email"
                      value={portfolioData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Content Editor */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="skills" className="space-y-4">
                <TabsList className="bg-gray-900 border border-gray-800">
                  <TabsTrigger
                    value="skills"
                    className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-orange-500/20"
                  >
                    Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-orange-500/20"
                  >
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="social"
                    className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-orange-500/20"
                  >
                    Social
                  </TabsTrigger>
                </TabsList>

                {/* Skills Tab */}
                <TabsContent value="skills">
                  <Card className="bg-gray-900 border-gray-800 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Skills</h2>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill..."
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSkillAdd(e.currentTarget.value)
                              e.currentTarget.value = ""
                            }
                          }}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                        />
                        <Button
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            handleSkillAdd(input.value)
                            input.value = ""
                          }}
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {portfolioData.skills.map((skill) => (
                          <div
                            key={skill}
                            className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 text-orange-400 rounded-full text-sm flex items-center gap-2"
                          >
                            {skill}
                            <button onClick={() => handleSkillRemove(skill)} className="ml-1 hover:text-orange-300">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Projects Tab */}
                <TabsContent value="projects">
                  <div className="space-y-4">
                    {portfolioData.projects.map((project) => (
                      <Card key={project.id} className="bg-gray-900 border-gray-800 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-semibold text-white">Project</h3>
                          <button
                            onClick={() => handleProjectRemove(project.id)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <Input
                            value={project.title}
                            onChange={(e) => handleProjectUpdate(project.id, { title: e.target.value })}
                            placeholder="Project title"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Textarea
                            value={project.description}
                            onChange={(e) => handleProjectUpdate(project.id, { description: e.target.value })}
                            placeholder="Project description"
                            className="bg-gray-800 border-gray-700 text-white min-h-20"
                          />
                          <Input
                            value={project.link}
                            onChange={(e) => handleProjectUpdate(project.id, { link: e.target.value })}
                            placeholder="Project link"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                      </Card>
                    ))}
                    <Button onClick={handleProjectAdd} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </TabsContent>

                {/* Social Tab */}
                <TabsContent value="social">
                  <Card className="bg-gray-900 border-gray-800 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Social Links</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300">GitHub</label>
                        <Input
                          value={portfolioData.socialLinks.github}
                          onChange={(e) =>
                            setPortfolioData((prev) => ({
                              ...prev,
                              socialLinks: { ...prev.socialLinks, github: e.target.value },
                            }))
                          }
                          placeholder="https://github.com/..."
                          className="mt-1 bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300">LinkedIn</label>
                        <Input
                          value={portfolioData.socialLinks.linkedin}
                          onChange={(e) =>
                            setPortfolioData((prev) => ({
                              ...prev,
                              socialLinks: { ...prev.socialLinks, linkedin: e.target.value },
                            }))
                          }
                          placeholder="https://linkedin.com/in/..."
                          className="mt-1 bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300">Twitter</label>
                        <Input
                          value={portfolioData.socialLinks.twitter}
                          onChange={(e) =>
                            setPortfolioData((prev) => ({
                              ...prev,
                              socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                            }))
                          }
                          placeholder="https://twitter.com/..."
                          className="mt-1 bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PortfolioPreview({ data, template }: { data: PortfolioData; template: string }) {
  if (template === "minimal") {
    return (
      <div className="bg-white text-black min-h-96 rounded-lg overflow-hidden shadow-2xl">
        <div className="p-12">
          <h1 className="text-5xl font-bold mb-2">{data.fullName}</h1>
          <p className="text-xl text-gray-600 mb-6">{data.title}</p>
          <p className="text-lg text-gray-700 mb-8">{data.bio}</p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project) => (
                <div key={project.id} className="border border-gray-300 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-300">
            <p className="text-gray-600">{data.email}</p>
          </div>
        </div>
      </div>
    )
  }

  return <div className="bg-white text-black p-12 rounded-lg">Preview coming for other templates</div>
}
