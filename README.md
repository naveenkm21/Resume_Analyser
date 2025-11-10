# JobFolio - Professional Career Platform

Build your professional identity with JobFolio, a comprehensive platform for creating profiles, resumes, portfolios, and analyzing your career documents with AI.

## Features

- **Profile Builder**: Create a professional user profile showcasing your skills and background
- **Resume Builder**: Build and edit resumes with live preview and multiple sections
- **NLP Resume Analyzer**: Get AI-powered insights and recommendations for your resume
- **Portfolio Website Builder**: Create custom portfolio websites with templates and live editing
- **Local Authentication**: Secure login system using browser storage (no external dependencies)

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **AI Integration**: Vercel AI SDK (for resume analysis)
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx           # Home page with hero section
│   ├── profile/           # User profile page
│   ├── resume/            # Resume builder
│   ├── analyzer/          # Resume analyzer with NLP
│   ├── portfolio/         # Portfolio website builder
│   └── layout.tsx         # Root layout with navigation
├── components/            # Reusable UI components
├── lib/                   # Utility functions and auth
├── hooks/                 # Custom React hooks
└── public/                # Static assets
\`\`\`

## Authentication

The app uses localStorage-based authentication for a seamless experience without external dependencies. All user data is stored locally in the browser.

## Deployment

Deploy directly to Vercel with one click:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

The app is fully optimized for Vercel with Next.js 16 and React Compiler support enabled.

## Features in Detail

### Profile Builder
Create comprehensive professional profiles with personal information, skills, and background.

### Resume Builder
- Add multiple sections: Personal Info, Experience, Education, Skills
- Real-time preview
- Export functionality

### Resume Analyzer
- AI-powered analysis using GPT-4o-mini
- Get scoring on content quality
- Receive actionable suggestions for improvement

### Portfolio Builder
- Choose from multiple templates
- Add projects, skills, and social links
- Live preview of your portfolio

## Support

For issues or questions, please open an issue on GitHub or contact support at vercel.com/help.
