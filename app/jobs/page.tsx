"use client";

import { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        // ✅ SAFE CHECK
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setJobs([]);
      });
  }, []);

  return (
    <div>
      <h1>Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job, index) => (
          <div key={index} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
          </div>
        ))
      )}
    </div>
  );
}