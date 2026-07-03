"use client";

import { useState } from "react";

export default function ApplyPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Application Submitted Successfully!");

    setForm({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center p-8">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 w-full max-w-xl"
      >

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Apply for Job
        </h1>

        <label className="block mb-2 font-semibold text-gray-800">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full border border-gray-400 p-3 rounded-lg mb-4 text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <label className="block mb-2 font-semibold text-gray-800">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-400 p-3 rounded-lg mb-4 text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <label className="block mb-2 font-semibold text-gray-800">
          Phone Number
        </label>

        <input
          type="tel"
          placeholder="Enter your phone number"
          className="w-full border border-gray-400 p-3 rounded-lg mb-4 text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          required
        />

        <label className="block mb-2 font-semibold text-gray-800">
          Upload Resume
        </label>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="w-full border border-gray-400 p-3 rounded-lg mb-6 text-black bg-white"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          Submit Application
        </button>

      </form>

    </main>
  );
}