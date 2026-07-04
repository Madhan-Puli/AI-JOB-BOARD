"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

export default function ApplyPage() {
  return (
    <Suspense fallback={<ApplyPageFallback />}>
      <ApplyForm />
    </Suspense>
  );
}

function ApplyPageFallback() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <p className="text-gray-600 text-lg">Loading application...</p>
    </div>
  );
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const jobId = searchParams.get("id");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Application Submitted Successfully!");

    console.log({
      jobId,
      ...form,
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8 border border-gray-200">

        <h1 className="text-3xl font-bold text-center text-black mb-2">
          Apply for Job
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Complete the form below to apply.
        </p>

        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-gray-800">
            <span className="font-semibold">Job ID:</span> {jobId}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Resume Link
            </label>

            <input
              type="url"
              name="resume"
              placeholder="Paste your Google Drive resume link"
              required
              value={form.resume}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
            />
          </div>

          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={() => router.back()}
              className="w-1/2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-3 rounded-lg"
            >
              Back
            </button>

            <button
              type="submit"
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
            >
              Submit Application
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
