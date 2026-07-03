import Link from "next/link";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getJob(id: string): Promise<Job | null> {
  const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function JobDetails({ params }: Props) {
  const { id } = await params;

  const job = await getJob(id);

  if (!job) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">
          Job Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          {job.title}
        </h1>

        <p className="text-lg text-gray-700 mb-3">
          <strong>Company:</strong> {job.company}
        </p>

        <p className="text-lg text-gray-700 mb-3">
          <strong>Location:</strong> {job.location}
        </p>

        <p className="text-lg font-bold text-green-600 mb-5">
          Salary: {job.salary}
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Job Description
        </h2>

        <p className="text-gray-700 leading-7">
          {job.description}
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            href="/apply"
            className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700"
          >
            Apply Now
          </Link>

          <Link
            href="/jobs"
            className="flex-1 bg-gray-600 text-white text-center py-3 rounded-lg hover:bg-gray-700"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    </main>
  );
}