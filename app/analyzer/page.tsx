"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"
import { analyzeResume } from "@/app/actions/analyze-resume"

interface AnalysisResult {
  overallScore: number
  strengths: string[]
  improvements: string[]
  keywords: string[]
  tips: string[]
  summary: string
}

export default function AnalyzerPage() {
  const [resumeText, setResumeText] = useState("")
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError("Please paste your resume content")
      return
    }

    setLoading(true)
    setError("")
    try {
      const result = await analyzeResume(resumeText)
      setAnalysis(result)
    } catch (err) {
      setError("Failed to analyze resume. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-orange-500" />
            Resume Analyzer
          </h1>
          <p className="text-gray-400">Get AI-powered insights to improve your resume</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Paste Your Resume</h2>
              <Textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                className="min-h-64 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 mb-4"
              />
              <Button
                onClick={handleAnalyze}
                disabled={loading || !resumeText.trim()}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze Resume
                  </>
                )}
              </Button>
              {error && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {error}
                </div>
              )}
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {analysis ? (
              <div className="space-y-6">
                {/* Score Card */}
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Overall Score</h3>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-orange-500">{Math.round(analysis.overallScore)}</div>
                      <p className="text-gray-400 text-sm">/100</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${analysis.overallScore}%` }}
                    />
                  </div>
                </Card>

                {/* Strengths */}
                {analysis.strengths.length > 0 && (
                  <Card className="bg-gray-900 border-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {analysis.strengths.map((strength, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-green-500 font-bold">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Areas for Improvement */}
                {analysis.improvements.length > 0 && (
                  <Card className="bg-gray-900 border-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-500" />
                      Areas to Improve
                    </h3>
                    <ul className="space-y-2">
                      {analysis.improvements.map((improvement, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-orange-500 font-bold">→</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Keywords */}
                {analysis.keywords.length > 0 && (
                  <Card className="bg-gray-900 border-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Keywords Detected</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 text-orange-400 text-sm rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Tips */}
                {analysis.tips.length > 0 && (
                  <Card className="bg-gray-900 border-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Tips</h3>
                    <ul className="space-y-3">
                      {analysis.tips.map((tip, idx) => (
                        <li key={idx} className="text-gray-300 text-sm p-3 bg-gray-800/50 rounded-lg">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Summary */}
                {analysis.summary && (
                  <Card className="bg-gray-900 border-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">AI Summary</h3>
                    <p className="text-gray-300 leading-relaxed">{analysis.summary}</p>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="bg-gray-900 border-gray-800 p-12 text-center">
                <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Paste your resume and click analyze to get started</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
