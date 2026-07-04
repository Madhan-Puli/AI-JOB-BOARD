"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function PostJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.details || data?.error || "Failed to post job");
      }

      router.push("/jobs");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Failed to post job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Employer workspace
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950">
            Publish a role with clean, candidate-friendly details.
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            Add concise role information that helps candidates understand the
            opportunity quickly. The posting is saved to MongoDB and appears in
            the job marketplace immediately.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Required fields prevent incomplete postings",
              "Salary is normalized for consistent display",
              "New roles appear instantly on the jobs page",
            ].map((item) => (
              <p key={item} className="flex gap-3 font-medium text-slate-700">
                <FiCheckCircle
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 shrink-0 text-emerald-600"
                />
                {item}
              </p>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Job title"
              name="title"
              placeholder="Senior Frontend Engineer"
              value={form.title}
              onChange={handleChange}
            />
            <Field
              label="Company"
              name="company"
              placeholder="Acme Technologies"
              value={form.company}
              onChange={handleChange}
            />
            <Field
              label="Location"
              name="location"
              placeholder="Hitech City, Hyderabad"
              value={form.location}
              onChange={handleChange}
            />
            <Field
              label="Salary"
              name="salary"
              placeholder="12 LPA"
              value={form.salary}
              onChange={handleChange}
            />
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-bold text-slate-700">
              Job description
            </span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={7}
              placeholder="Describe responsibilities, required skills, interview expectations, and impact."
              className="mt-2 w-full rounded-md border border-slate-300 bg-white p-3 text-slate-950 placeholder:text-slate-400"
            />
          </label>

          {error ? (
            <p className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/jobs")}
              className="rounded-md border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {loading ? "Publishing..." : "Publish role"}
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
}

function Field({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-slate-300 bg-white p-3 text-slate-950 placeholder:text-slate-400"
      />
    </label>
  );
}
