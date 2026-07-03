"use client";

import { useState } from "react";

export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Job Posted Successfully!");

        setForm({
          title: "",
          company: "",
          location: "",
          salary: "",
          description: "",
        });
      } else {
        alert("Failed to Post Job");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl border border-gray-200 rounded-xl p-8 w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Post a Job
        </h1>

        <label className="block mb-2 font-semibold text-gray-800">
          Job Title
        </label>

        <input
          type="text"
          placeholder="Enter Job Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full border border-gray-400 rounded-lg p-3 mb-5 text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 font-semibold text-gray-800">
          Company Name
        </label>

        <input
          type="text"
          placeholder="Enter Company Name"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
          className="w-full border border-gray-400 rounded-lg p-3 mb-5 text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 font-semibold text-gray-800">
          Location
        </label>

        <input
          type="text"
          placeholder="Enter Job Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          className="w-full border border-gray-400 rounded-lg p-3 mb-5 text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 font-semibold text-gray-800">
          Salary
        </label>

        <input
          type="text"
          placeholder="Enter Salary (e.g. ₹8 LPA)"
          value={form.salary}
          onChange={(e) =>
            setForm({ ...form, salary: e.target.value })
          }
          className="w-full border border-gray-400 rounded-lg p-3 mb-5 text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 font-semibold text-gray-800">
          Job Description
        </label>

        <textarea
          placeholder="Enter Job Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          rows={5}
          className="w-full border border-gray-400 rounded-lg p-3 mb-6 text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Post Job
        </button>
      </form>
    </main>
  );
}