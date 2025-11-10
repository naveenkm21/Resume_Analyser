"use client"

import { useState } from "react"
import { ResumeEditor } from "@/components/resume-editor"
import { ResumePreview } from "@/components/resume-preview"

export interface ResumeData {
  personal: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: {
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }[]
  education: {
    id: string
    school: string
    degree: string
    field: string
    graduationDate: string
  }[]
  skills: string[]
}

const defaultResume: ResumeData = {
  personal: {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    summary: "Creative and results-driven professional with expertise in web development and design.",
  },
  experience: [
    {
      id: "1",
      company: "Tech Company",
      position: "Senior Developer",
      startDate: "2022",
      endDate: "Present",
      description: "Led development of scalable web applications and mentored junior developers.",
    },
  ],
  education: [
    {
      id: "1",
      school: "University Name",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduationDate: "2020",
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "Web Design"],
}

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeData>(defaultResume)

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-black border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Resume Builder</h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium">
              Save
            </button>
            <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium">
              Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className="w-1/2 overflow-y-auto border-r border-white/10 bg-black">
          <ResumeEditor resume={resume} onUpdate={setResume} />
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 overflow-y-auto bg-white/5">
          <ResumePreview resume={resume} />
        </div>
      </main>
    </div>
  )
}
