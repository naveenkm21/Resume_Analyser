"use client"

import type { ResumeData } from "@/app/resume/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface ResumeEditorProps {
  resume: ResumeData
  onUpdate: (resume: ResumeData) => void
}

export function ResumeEditor({ resume, onUpdate }: ResumeEditorProps) {
  const updatePersonal = (field: keyof ResumeData["personal"], value: string) => {
    onUpdate({
      ...resume,
      personal: { ...resume.personal, [field]: value },
    })
  }

  const addExperience = () => {
    onUpdate({
      ...resume,
      experience: [
        ...resume.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    })
  }

  const updateExperience = (id: string, field: string, value: string) => {
    onUpdate({
      ...resume,
      experience: resume.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    onUpdate({
      ...resume,
      experience: resume.experience.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    onUpdate({
      ...resume,
      education: [
        ...resume.education,
        {
          id: Date.now().toString(),
          school: "",
          degree: "",
          field: "",
          graduationDate: "",
        },
      ],
    })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    onUpdate({
      ...resume,
      education: resume.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    onUpdate({
      ...resume,
      education: resume.education.filter((edu) => edu.id !== id),
    })
  }

  const addSkill = () => {
    onUpdate({
      ...resume,
      skills: [...resume.skills, ""],
    })
  }

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...resume.skills]
    newSkills[index] = value
    onUpdate({ ...resume, skills: newSkills })
  }

  const removeSkill = (index: number) => {
    onUpdate({
      ...resume,
      skills: resume.skills.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Personal Information Section */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <div className="w-1 h-6 bg-orange-500 rounded" />
          Personal Information
        </h2>
        <div className="space-y-3">
          <Input
            placeholder="Full Name"
            value={resume.personal.fullName}
            onChange={(e) => updatePersonal("fullName", e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
          <Input
            placeholder="Email"
            type="email"
            value={resume.personal.email}
            onChange={(e) => updatePersonal("email", e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
          <Input
            placeholder="Phone"
            value={resume.personal.phone}
            onChange={(e) => updatePersonal("phone", e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
          <Input
            placeholder="Location"
            value={resume.personal.location}
            onChange={(e) => updatePersonal("location", e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
          <Textarea
            placeholder="Professional Summary"
            value={resume.personal.summary}
            onChange={(e) => updatePersonal("summary", e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-24"
          />
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-1 h-6 bg-orange-500 rounded" />
            Experience
          </h2>
          <Button size="sm" onClick={addExperience} className="bg-orange-500 hover:bg-orange-600 text-white gap-1">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
        <div className="space-y-4">
          {resume.experience.map((exp) => (
            <div key={exp.id} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                />
                <Input
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                />
                <Input
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <Textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-20"
              />
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-1 h-6 bg-orange-500 rounded" />
            Education
          </h2>
          <Button size="sm" onClick={addEducation} className="bg-orange-500 hover:bg-orange-600 text-white gap-1">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
        <div className="space-y-4">
          {resume.education.map((edu) => (
            <div key={edu.id} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
              <Input
                placeholder="School / University"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                />
                <Input
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <Input
                placeholder="Graduation Date"
                value={edu.graduationDate}
                onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              />
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-1 h-6 bg-orange-500 rounded" />
            Skills
          </h2>
          <Button size="sm" onClick={addSkill} className="bg-orange-500 hover:bg-orange-600 text-white gap-1">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill, index) => (
            <div key={index} className="flex gap-1">
              <Input
                placeholder="Add skill"
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 w-32"
              />
              <button onClick={() => removeSkill(index)} className="text-red-400 hover:text-red-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="h-6" />
    </div>
  )
}
