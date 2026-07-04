# AI-Generated Feature Documentation

## Product Overview

TalentBridge AI is a professional two-sided hiring marketplace for software hiring. It supports job discovery, role detail review, employer job posting, candidate application flows, demo login, and role-based dashboard concepts. The product is intentionally designed to look more mature than a simple student CRUD app: it includes structured navigation, polished empty and loading states, search/filter controls, candidate/recruiter journeys, and deployment-ready engineering practices.

## User Roles

### Candidates

Candidates can browse open software roles, search across job titles and companies, filter by location, open detailed job pages, submit an application profile with contact details and a resume URL, and view a dashboard concept for saved jobs, applications, interviews, and profile readiness.

### Employers

Recruiters can publish new roles using a validated posting form, review a demo hiring pipeline, and understand how the product can evolve into applicant review and interview management. New roles are saved to MongoDB and appear in the jobs marketplace.

## Feature Details

### 1. Homepage

The homepage introduces the product with a professional hero section, search input, live role count, marketplace highlights, and featured role cards. It also clearly explains the two-sided value proposition:

- Candidates and students can discover roles, apply, and track progress.
- Recruiters can publish openings, review candidates, and manage hiring stages.

The goal is to communicate credibility quickly while still making job search the primary action.

### 2. Jobs Directory

The jobs page supports:

- Keyword search across title, company, salary, location, and description.
- Location filtering from available job data.
- Responsive job cards for desktop and mobile.
- Loading state while fetching jobs.
- Empty state when no roles match filters.
- Error state when the backend cannot be reached.

### 3. Job Details

Each job has a dedicated detail page with:

- Role title and company.
- Location and salary.
- Detailed description.
- Active hiring callout.
- Direct application button.
- Server-side data fetching through MongoDB helpers.

### 4. Post Job Flow

The post job form includes:

- Required title, company, location, salary, and description fields.
- API-side validation.
- Salary normalization to keep display consistent.
- MongoDB insertion.
- Redirect to the jobs marketplace after success.

### 5. Apply Flow

The application page captures:

- Full name.
- Email address.
- Phone number.
- Resume URL.
- Optional candidate note.

The current implementation logs candidate data and shows a confirmation screen. This can be extended with an `applications` MongoDB collection.

### 6. Demo Login

The login page is a role-based demo entry point. It accepts only fixed demo credentials:

| Role | Username | Password |
| --- | --- | --- |
| Candidate / Student | `Student` | `Student` |
| Recruiter | `Admin` | `Admin` |

Invalid usernames and passwords are rejected. After valid login, the user is routed into the dashboard experience for their role.

Instead of forcing reviewers through external authentication setup, this lets them immediately inspect:

- Candidate demo experience.
- Recruiter demo experience.

This demonstrates product architecture thinking while keeping the assessment easy to review.

### 7. Candidate Dashboard

The candidate dashboard includes:

- Profile readiness.
- Saved jobs.
- Application count.
- Interview count.
- Application tracker with statuses.

This shows how the platform can help students, freshers, and employees manage their career search after applying.

### 8. Recruiter Dashboard

The recruiter dashboard includes:

- Open roles.
- Applicant count.
- Shortlisted candidates.
- Offer-stage candidates.
- Hiring pipeline cards.

This shows how the platform can support recruiters who need to find suitable resources for current openings.

### 9. API Layer

The app includes API routes for:

- `GET /api/jobs` - fetch all jobs.
- `POST /api/jobs` - create a job.
- `GET /api/jobs/:id` - fetch a single job by MongoDB ObjectId.

MongoDB data is serialized into plain JSON so client components receive stable string IDs.

### 10. CI/CD Pipeline

GitHub Actions validates and deploys the project:

- Checks out source code.
- Installs dependencies.
- Builds the Next.js application.
- Pulls Vercel project configuration.
- Builds production output.
- Deploys to Vercel using repository secrets.

## Future Improvements

- Store submitted applications in MongoDB.
- Add real authentication with candidate/recruiter roles.
- Add admin moderation for posted jobs.
- Add pagination for larger job volumes.
- Add tests for API validation and filtering behavior.
- Add company logos and job type fields.
- Add recruiter applicant review actions.
- Add AI-based job matching and candidate ranking.

## AI Usage Summary

AI was used to accelerate UX design, code structure, feature documentation, CI/CD workflow creation, and quality improvements. The final implementation was verified through local build checks and manual API testing.
