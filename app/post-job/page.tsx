"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("status:", res.status);
      console.log("Response:", data);

      if (!res.ok) {
        console.log("POST ERROR:", data);

        alert(
          `${data.error}\n\n${data.details ?? "No additional details"}`
      );

    setLoading(false);
    return;
  }

      alert("Job Posted Successfully!");

      router.push("/");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to Post Job");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-black mb-8">
          Post a New Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-semibold mb-2 text-black">
              Job Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Frontend Developer"
              className="w-full border border-gray-300 rounded-lg p-3 text-black"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-black">
              Company
            </label>

            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              placeholder="Google"
              className="w-full border border-gray-300 rounded-lg p-3 text-black"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-black">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="Remote"
              className="w-full border border-gray-300 rounded-lg p-3 text-black"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-black">
              Salary
            </label>

            <input
              type="text"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              required
              placeholder="12 LPA"
              className="w-full border border-gray-300 rounded-lg p-3 text-black"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-black">
              Job Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Enter job description..."
              className="w-full border border-gray-300 rounded-lg p-3 text-black"
            />
          </div>

          <div className="flex gap-4">

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-1/2 bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Posting..." : "Post Job"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}