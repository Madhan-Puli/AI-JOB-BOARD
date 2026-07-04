"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiArrowRight,
  FiBarChart2,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiChevronDown,
  FiEdit3,
  FiFileText,
  FiLogOut,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

type Session = {
  role: "candidate" | "recruiter";
  username: string;
  loggedInAt: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [session] = useState<Session | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const rawSession = window.localStorage.getItem("talentbridge-session");

    if (!rawSession) {
      return null;
    }

    try {
      const parsed = JSON.parse(rawSession) as Session;

      return parsed.role === "candidate" || parsed.role === "recruiter"
        ? parsed
        : null;
    } catch {
      window.localStorage.removeItem("talentbridge-session");
      return null;
    }
  });

  function logout() {
    window.localStorage.removeItem("talentbridge-session");
    router.push("/login");
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_36%),linear-gradient(135deg,#f8fafc,#eef2ff)]">
        <Navbar />
        <section className="mx-auto flex w-full max-w-2xl flex-1 items-center px-5 py-20 text-center">
          <div className="rounded-lg border border-white/70 bg-white p-8 shadow-xl">
            <h1 className="text-3xl font-bold text-slate-950">
              Login required
            </h1>
            <p className="mt-3 leading-7 text-slate-600">
              Please login with valid candidate or recruiter credentials to view
              the correct dashboard.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
            >
              Go to login
              <FiArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const isRecruiter = session.role === "recruiter";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_36%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_55%,#ecfdf5_100%)]">
      <Navbar />

      <section className="border-b border-white/70 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="mb-6 flex justify-end">
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
                className="inline-flex items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                <span className="grid h-8 w-8 place-items-center rounded-md bg-blue-600 text-white">
                  {session.username.charAt(0)}
                </span>
                <span className="text-left">
                  <span className="block leading-4">{session.username}</span>
                  <span className="text-xs font-semibold capitalize text-slate-500">
                    {session.role}
                  </span>
                </span>
                <FiChevronDown aria-hidden="true" className="h-4 w-4" />
              </button>

              {menuOpen ? (
                <div className="absolute right-0 z-30 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-2 shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(true);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-bold text-slate-700 hover:bg-slate-100"
                  >
                    <FiEdit3 aria-hidden="true" className="h-4 w-4" />
                    Update profile
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-bold text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut aria-hidden="true" className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {profileOpen ? (
            <ProfilePanel
              isRecruiter={isRecruiter}
              username={session.username}
              onClose={() => setProfileOpen(false)}
            />
          ) : null}

          <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                {isRecruiter ? "Recruiter workspace" : "Candidate workspace"}
              </p>
              <h1 className="mt-3 text-4xl font-bold text-slate-950">
                {isRecruiter
                  ? "Manage hiring from posting to shortlist."
                  : "Track your career search from discovery to offer."}
              </h1>
              <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                {isRecruiter
                  ? "Recruiters can manage openings, review applicants, and move candidates through a hiring pipeline."
                  : "Students, freshers, and professionals can manage applications, improve profile readiness, and keep job search momentum visible."}
              </p>
            </div>

            <Link
              href={isRecruiter ? "/post-job" : "/jobs"}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700"
            >
              {isRecruiter ? "Post role" : "Find jobs"}
              <FiArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-4 md:grid-cols-4">
          {(isRecruiter ? recruiterMetrics : candidateMetrics).map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.label}
                className="rounded-lg border border-white/70 bg-white p-5 shadow-sm"
              >
                <span className="grid h-10 w-10 place-items-center rounded-md bg-blue-50 text-blue-700">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="mt-4 text-3xl font-bold text-slate-950">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="rounded-lg border border-white/70 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              {isRecruiter ? "Hiring pipeline" : "Application tracker"}
            </h2>
            <div className="mt-5 space-y-4">
              {(isRecruiter ? recruiterPipeline : candidatePipeline).map(
                (item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4"
                  >
                    <div>
                      <p className="font-bold text-slate-950">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>
                    <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">
                      {item.status}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <aside className="rounded-lg border border-white/70 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Role permissions
            </h2>
            <div className="mt-5 space-y-4">
              {(isRecruiter ? recruiterThinking : candidateThinking).map(
                (item) => (
                  <p
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-slate-700"
                  >
                    <FiCheckCircle
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-emerald-600"
                    />
                    {item}
                  </p>
                )
              )}
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProfilePanel({
  isRecruiter,
  username,
  onClose,
}: {
  isRecruiter: boolean;
  username: string;
  onClose: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: username,
    email: isRecruiter ? "recruiter@talentbridge.ai" : "student@talentbridge.ai",
    headline: isRecruiter
      ? "Technical recruiter hiring for product engineering roles"
      : "Early-career software engineer open to frontend and full stack roles",
  });

  function updateProfile(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSaved(false);
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  }

  function saveProfile(event: React.FormEvent) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <form
      onSubmit={saveProfile}
      className="mb-8 rounded-lg border border-blue-100 bg-white p-5 shadow-lg"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
            Update profile
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            {isRecruiter ? "Recruiter profile" : "Candidate profile"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Keep this profile updated so the dashboard feels personalized for
            the signed-in role.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-slate-200 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
        >
          Close
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-slate-700">Name</span>
          <input
            name="name"
            value={profile.name}
            onChange={updateProfile}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white p-3 text-slate-950"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">Email</span>
          <input
            name="email"
            type="email"
            value={profile.email}
            onChange={updateProfile}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white p-3 text-slate-950"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-bold text-slate-700">
          {isRecruiter ? "Hiring focus" : "Career headline"}
        </span>
        <textarea
          name="headline"
          value={profile.headline}
          onChange={updateProfile}
          rows={3}
          className="mt-2 w-full rounded-md border border-slate-300 bg-white p-3 text-slate-950"
        />
      </label>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {saved ? (
          <p className="text-sm font-bold text-emerald-700">
            Profile updated for this session.
          </p>
        ) : (
          <p className="text-sm text-slate-500">
            Demo update is saved visually for this active session.
          </p>
        )}
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
        >
          Save profile
        </button>
      </div>
    </form>
  );
}

const candidateMetrics = [
  { label: "Profile readiness", value: "82%", icon: FiUserCheck },
  { label: "Saved jobs", value: "6", icon: FiBriefcase },
  { label: "Applications", value: "4", icon: FiFileText },
  { label: "Interviews", value: "2", icon: FiClock },
];

const recruiterMetrics = [
  { label: "Open roles", value: "8", icon: FiBriefcase },
  { label: "Applicants", value: "124", icon: FiUsers },
  { label: "Shortlisted", value: "18", icon: FiUserCheck },
  { label: "Offer stage", value: "5", icon: FiBarChart2 },
];

const candidatePipeline = [
  {
    title: "Frontend Developer at Google",
    description: "Resume submitted and awaiting recruiter review.",
    status: "Applied",
  },
  {
    title: "Backend Developer at Amazon",
    description: "Technical screening scheduled.",
    status: "Interview",
  },
  {
    title: "Full Stack Developer at Infosys",
    description: "Saved for later after profile improvement.",
    status: "Saved",
  },
];

const recruiterPipeline = [
  {
    title: "Quality Engineer",
    description: "New applicants are waiting for initial screening.",
    status: "Review",
  },
  {
    title: "Frontend Developer",
    description: "Three candidates moved to technical interview.",
    status: "Interview",
  },
  {
    title: "Backend Developer",
    description: "Offer discussion pending with final candidate.",
    status: "Offer",
  },
];

const candidateThinking = [
  "Candidate users can browse jobs, apply, and track their own applications.",
  "Recruiter-only actions are intentionally separated from the candidate workspace.",
  "Invalid users are redirected to login before seeing dashboard content.",
];

const recruiterThinking = [
  "Recruiter users can post jobs and view hiring pipeline information.",
  "Candidate-only tracking is separated from recruiter hiring operations.",
  "Invalid users are redirected to login before seeing dashboard content.",
];
