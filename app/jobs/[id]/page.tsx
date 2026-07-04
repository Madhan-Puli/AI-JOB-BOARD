import Link from "next/link";

async function getJob(id: string) {
  const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const job = await getJob(id);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600">
          Job Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-black mb-6">
          {job.title}
        </h1>

        <div className="space-y-4">

          <p className="text-lg text-gray-700">
            <span className="font-semibold">Company:</span> {job.company}
          </p>

          <p className="text-lg text-gray-700">
            <span className="font-semibold">Location:</span> {job.location}
          </p>

          <p className="text-lg font-bold text-green-600">
            <span className="font-semibold">Salary:</span> ₹{job.salary}
          </p>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">
              <span className="font-semibold">Job Description:</span> 
            </h2>

            <p className="text-gray-700 leading-7">
              {job.description}
            </p>
          </div>

        </div>

        <div className="mt-8 flex justify-between">

          <Link
            href="/"
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            Back to Jobs
          </Link>

          <Link
            href={`/apply?id=${job._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Apply Now
          </Link>

        </div>

      </div>
    </div>
  );
}