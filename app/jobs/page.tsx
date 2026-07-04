"use client";

import { useEffect, useState } from "react";

type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description?: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/jobs");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.details || data?.error || "Failed to fetch jobs");
        }

        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setJobs([]);
        setError(error instanceof Error ? error.message : "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-black mb-8">
          All Jobs
        </h1>

        {loading ? (
          <p className="text-gray-600 text-lg">Loading jobs...</p>
        ) : error ? (
          <p className="text-red-600 text-lg">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-600 text-lg">No jobs found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
              >
                <h2 className="text-2xl font-bold text-black">
                  {job.title}
                </h2>

                <p className="text-gray-700 mt-2">
                  <strong>Company:</strong> {job.company}
                </p>

                <p className="text-gray-700">
                  <strong>Location:</strong> {job.location}
                </p>

                <p className="text-green-600 font-semibold mt-2">
                  <strong>Salary:</strong> {job.salary}
                </p>

                <p className="text-gray-600 mt-3">
                  <strong>Description:</strong> {job.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
