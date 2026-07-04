import Link from "next/link";

type Props = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
};

export default function JobCard({
  id,
  title,
  company,
  location,
  salary,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 p-6 flex flex-col h-full">

      <div className="flex-1">

        <h2 className="text-2xl font-bold text-black mb-2">
          {title}
        </h2>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold text-black">
            Company:
          </span>{" "}
          {company}
        </p>

        <p className="text-gray-700 mb-3">
          <span className="font-semibold text-black">
            Location:
          </span>{" "}
          {location}
        </p>

        <p className="text-green-600 text-xl font-bold">
          ₹{salary}
        </p>

      </div>

      <Link
        href={`/jobs/${id}`}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition"
      >
        View Details
      </Link>

    </div>
  );
}