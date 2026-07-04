# TalentBridge AI - Professional Job Board

TalentBridge AI is a modern job board built with Next.js, MongoDB, GitHub Actions, and Vercel. It was created as an AI-assisted software engineering assessment project with a focus on production-minded UX, clean feature flows, and deployment readiness.

## Live Links

- GitHub Repository: `https://github.com/Madhan-Puli/AI-JOB-BOARD`
- Vercel Demo: add the production Vercel URL after deployment
- AI-generated Documentation: see [`docs/AI_GENERATED_DOCUMENTATION.md`](docs/AI_GENERATED_DOCUMENTATION.md)

## Key Features

- Professional homepage with search, marketplace metrics, and featured role cards.
- Jobs directory with keyword search and location filtering.
- MongoDB-backed job data using Next.js App Router API routes.
- Server-rendered job detail pages for stable role links.
- Employer role publishing form with validation and salary normalization.
- Candidate application flow with resume URL, contact details, and confirmation state.
- Clear loading, empty, and error states for a more reliable user experience.
- GitHub Actions CI/CD pipeline for build validation and Vercel deployment.

## Tech Stack

- Framework: Next.js 16 App Router
- UI: React 19, Tailwind CSS 4, React Icons
- Database: MongoDB Atlas
- CI/CD: GitHub Actions
- Deployment: Vercel

## Local Setup

1. Install dependencies:

```bash
npm install --legacy-peer-deps
```

2. Create `.env.local`:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/jobboard?retryWrites=true&w=majority
```

3. Start the development server:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## CI/CD Setup

The workflow at `.github/workflows/ci.yml` runs on pushes and pull requests to `main` and `madhan`.

Required GitHub repository secrets:

- `MONGODB_URI`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Pipeline stages:

- Install dependencies with `npm ci`.
- Build the Next.js application.
- Pull Vercel project settings.
- Build Vercel production output.
- Deploy the prebuilt application to Vercel.

## Assessment Checklist

- [x] Build a job board using AI-assisted development.
- [x] Push code to GitHub.
- [x] Add GitHub Actions CI/CD pipeline.
- [x] Prepare Vercel deployment workflow.
- [x] Write AI-generated feature documentation.
- [ ] Add final deployed Vercel link after secrets are configured.

## Notes

The app requires a valid MongoDB Atlas URI. Atlas connection strings should start with `mongodb+srv://`. The MongoDB helper also normalizes the common `mongodb://...mongodb.net` mistake for safer local development.
