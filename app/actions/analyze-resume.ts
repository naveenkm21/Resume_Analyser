"use server"

import { generateText } from "ai"

interface AnalysisResult {
  overallScore: number
  strengths: string[]
  improvements: string[]
  keywords: string[]
  tips: string[]
  summary: string
}

export async function analyzeResume(resumeText: string): Promise<AnalysisResult> {
  const prompt = `Analyze the following resume and provide detailed feedback in JSON format. Score it 0-100.

Resume:
${resumeText}

Respond with valid JSON only (no markdown, no code blocks) in this exact structure:
{
  "overallScore": <number 0-100>,
  "strengths": [<list of 3-5 key strengths>],
  "improvements": [<list of 3-5 areas to improve>],
  "keywords": [<list of 5-8 important keywords or skills found>],
  "tips": [<list of 3-4 actionable tips>],
  "summary": "<1-2 sentence summary of the resume quality>"
}`

  try {
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    const result = JSON.parse(text) as AnalysisResult
    return result
  } catch (error) {
    console.error("Resume analysis error:", error)
    throw new Error("Failed to analyze resume")
  }
}
