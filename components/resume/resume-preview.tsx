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

export function ResumePreview({ resumeData }: { resumeData: ResumeData }) {
  return (
    <div className="max-w-2xl mx-auto bg-white text-black p-8 rounded-lg shadow-2xl">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-gray-300">
        <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>•</span>}
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>•</span>}
          {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 pb-2 border-b-2 border-gray-300">EXPERIENCE</h2>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate}
                  {exp.endDate && ` - ${exp.endDate}`}
                </span>
              </div>
              <p className="text-gray-600 font-semibold">{exp.company}</p>
              <p className="text-gray-700 mt-2 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 pb-2 border-b-2 border-gray-300">EDUCATION</h2>
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-lg">{edu.school}</h3>
                <span className="text-sm text-gray-600">{edu.graduationYear}</span>
              </div>
              <p className="text-gray-600">
                {edu.degree}
                {edu.field && ` in ${edu.field}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3 pb-2 border-b-2 border-gray-300">SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <span key={skill.id} className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-medium">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
