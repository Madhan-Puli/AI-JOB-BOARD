"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FiArrowLeft, FiSend } from "react-icons/fi";

export default function ApplyPage() {
  return (
    <Suspense fallback={<ApplyPageFallback />}>
      <ApplyForm />
    </Suspense>
  );
}

function ApplyPageFallback() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="mx-auto max-w-3xl px-5 py-20 text-center text-slate-600">
        Loading application...
      </section>
      <Footer />
    </main>
  );
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("id");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    note: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ jobId, ...form });
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-950"
          >
            <FiArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back
          </button>

          <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Candidate application
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950">
            Apply with a focused candidate profile.
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            This flow captures essential candidate details without creating a
            heavy application burden. The submitted data is currently logged for
            demo purposes and ready to connect to a backend collection.
          </p>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-500">Role ID</p>
            <p className="mt-2 break-all font-mono text-sm text-slate-950">
              {jobId || "No role selected"}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-8">
            <h2 className="text-2xl font-bold text-emerald-900">
              Application submitted
            </h2>
            <p className="mt-3 leading-7 text-emerald-800">
              Thank you, {form.name}. Your profile has been captured for this
              demo workflow.
            </p>
            <button
              type="button"
              onClick={() => router.push("/jobs")}
              className="mt-6 rounded-md bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800"
            >
              Browse more roles
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Full name"
                name="name"
                placeholder="Madhan Puli"
                value={form.name}
                onChange={handleChange}
              />
              <Field
                label="Email address"
                name="email"
                placeholder="madhan@example.com"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <Field
                label="Phone number"
                name="phone"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={handleChange}
              />
              <Field
                label="Resume URL"
                name="resume"
                placeholder="https://drive.google.com/..."
                type="url"
                value={form.resume}
                onChange={handleChange}
              />
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-bold text-slate-700">
                Short note
              </span>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={5}
                placeholder="Add a short note about your fit for this role."
                className="mt-2 w-full rounded-md border border-slate-300 bg-white p-3 text-slate-950 placeholder:text-slate-400"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
            >
              <FiSend aria-hidden="true" className="h-4 w-4" />
              Submit application
            </button>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input
        type={type}
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
