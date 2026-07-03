import Link from "next/link";

type Props = {
  id: number;
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
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 flex flex-col h-full">

      {/* TOP CONTENT */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900">
          {title}
        </h3>

        <p className="text-gray-700 mt-1">
          <span className="font-semibold">Company:</span> {company}
        </p>

        <p className="text-gray-600">
          <span className="font-semibold">Location:</span> {location}
        </p>

        <p className="text-green-600 font-semibold mt-2">
          ₹{salary}
        </p>
      </div>

      {/* BUTTON FIXED AT BOTTOM */}
      <Link
        href={`/jobs/${id}`}
        className="mt-4 w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
      >
        View Details
      </Link>

    </div>
  );
}