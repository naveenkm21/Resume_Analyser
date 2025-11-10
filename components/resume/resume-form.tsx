"use client"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: Array<{
    id: string
    jobTitle: string
    company: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    id: string
    school: string
    degree: string
    field: string
    graduationYear: string
  }>
  skills: Array<{
    id: string
    name: string
  }>
}

export function ResumeForm({
  resumeData,
  setResumeData,
}: {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
}) {
  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    })
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp],
    })
  }

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      field: "",
      graduationYear: "",
    }
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEdu],
    })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    })
  }

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: "",
    }
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill],
    })
  }

  const updateSkill = (id: string, value: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.map((skill) => (skill.id === id ? { ...skill, name: value } : skill)),
    })
  }

  const removeSkill = (id: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    })
  }

  return (
    <div className="space-y-8">
      {/* Personal Information Section */}
      <Card className="bg-white/5 border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">Full Name</label>
              <Input
                value={resumeData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                placeholder="John Doe"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Email</label>
              <Input
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder="john@example.com"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Phone</label>
              <Input
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Location</label>
              <Input
                value={resumeData.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                placeholder="City, State"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-2">Professional Summary</label>
            <textarea
              value={resumeData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              placeholder="Brief overview of your professional background and goals"
              className="w-full h-24 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 px-3 py-2"
            />
          </div>
        </div>
      </Card>

      {/* Experience Section */}
      <Card className="bg-white/5 border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Experience</h2>
          <Button onClick={addExperience} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        <div className="space-y-4">
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="bg-white/5 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  value={exp.jobTitle}
                  onChange={(e) => updateExperience(exp.id, "jobTitle", e.target.value)}
                  placeholder="Job Title"
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  placeholder="Company"
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  placeholder="Start Date (MM/YYYY)"
                  className="bg-white/5 border-white/10 text-white"
                />
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    placeholder="End Date (MM/YYYY)"
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <Button
                    onClick={() => removeExperience(exp.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                placeholder="Job description and responsibilities"
                className="w-full h-20 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 px-3 py-2"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Education Section */}
      <Card className="bg-white/5 border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Education</h2>
          <Button onClick={addEducation} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        <div className="space-y-4">
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="bg-white/5 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                  placeholder="School/University"
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                  placeholder="Degree"
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                  placeholder="Field of Study"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={edu.graduationYear}
                  onChange={(e) => updateEducation(edu.id, "graduationYear", e.target.value)}
                  placeholder="Graduation Year"
                  className="bg-white/5 border-white/10 text-white flex-1"
                />
                <Button
                  onClick={() => removeEducation(edu.id)}
                  size="sm"
                  variant="ghost"
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Skills Section */}
      <Card className="bg-white/5 border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Skills</h2>
          <Button onClick={addSkill} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {resumeData.skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, e.target.value)}
                placeholder="Skill"
                className="bg-transparent border-0 text-white placeholder-white/40 p-0"
              />
              <Button
                onClick={() => removeSkill(skill.id)}
                size="sm"
                variant="ghost"
                className="text-red-400 hover:text-red-300 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
