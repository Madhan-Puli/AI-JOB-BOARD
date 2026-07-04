"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiArrowRight,
  FiBriefcase,
  FiLock,
  FiShield,
  FiUser,
} from "react-icons/fi";

type Role = "candidate" | "recruiter";

const credentials = {
  candidate: {
    username: "Student",
    password: "Student",
    title: "Candidate / Student Login",
    description:
      "For students, freshers, and professionals who want to discover roles, apply, and track applications.",
    icon: FiUser,
    accent: "from-sky-500 to-blue-700",
  },
  recruiter: {
    username: "Admin",
    password: "Admin",
    title: "Recruiter Login",
    description:
      "For recruiters and employers who want to post jobs, review candidates, and manage hiring pipelines.",
    icon: FiBriefcase,
    accent: "from-slate-900 to-blue-900",
  },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_34%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_48%,#f0fdf4_100%)]">
      <Navbar />

      <section className="mx-auto w-full max-w-7xl flex-1 px-5 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-md border border-blue-100 bg-white/80 px-3 py-1 text-sm font-bold uppercase tracking-wide text-blue-700 shadow-sm">
            <FiShield aria-hidden="true" className="h-4 w-4" />
            Role based access
          </p>
          <h1 className="mt-5 text-4xl font-bold text-slate-950 sm:text-5xl">
            Login as a recruiter or candidate.
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            The platform now separates both sides of the marketplace. Only valid
            demo credentials are accepted, and each role lands on its own
            dashboard experience.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <LoginCard role="candidate" />
          <LoginCard role="recruiter" />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function LoginCard({ role }: { role: Role }) {
  const router = useRouter();
  const config = credentials[role];
  const Icon = config.icon;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const isValid =
      username.trim() === config.username && password.trim() === config.password;

    if (!isValid) {
      setError(
        `Invalid ${role} credentials. Use ${config.username} / ${config.password}.`
      );
      return;
    }

    localStorage.setItem(
      "talentbridge-session",
      JSON.stringify({
        role,
        username: config.username,
        loggedInAt: new Date().toISOString(),
      })
    );

    router.push("/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-lg border border-white/70 bg-white shadow-xl shadow-slate-200/70"
    >
      <div className={`bg-gradient-to-br ${config.accent} p-6 text-white`}>
        <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/15">
          <Icon aria-hidden="true" className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-2xl font-bold">{config.title}</h2>
        <p className="mt-3 leading-7 text-white/80">{config.description}</p>
      </div>

      <div className="p-6">
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
          Demo credentials:{" "}
          <span className="font-bold text-slate-950">{config.username}</span> /{" "}
          <span className="font-bold text-slate-950">{config.password}</span>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-bold text-slate-700">Username</span>
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setError("");
            }}
            placeholder={config.username}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white p-3 text-slate-950 placeholder:text-slate-400"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-bold text-slate-700">Password</span>
          <div className="mt-2 flex items-center gap-3 rounded-md border border-slate-300 bg-white px-3">
            <FiLock aria-hidden="true" className="h-4 w-4 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              placeholder={config.password}
              className="w-full border-0 bg-transparent py-3 text-slate-950 placeholder:text-slate-400 focus:shadow-none"
            />
          </div>
        </label>

        {error ? (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
        >
          Login as {role === "candidate" ? "Candidate" : "Recruiter"}
          <FiArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
