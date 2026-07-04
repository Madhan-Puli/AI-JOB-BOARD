import Link from "next/link";
import { FiArrowRight, FiBriefcase, FiMapPin } from "react-icons/fi";

type Props = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description?: string;
};

export default function JobCard({
  id,
  title,
  company,
  location,
  salary,
  description,
}: Props) {
  const salaryLabel = salary.replace(/\s+/g, " ").trim();

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex-1">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
            <FiBriefcase aria-hidden="true" className="h-5 w-5" />
          </div>
          <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
            Active
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-950">{title}</h3>
        <p className="mt-2 font-semibold text-slate-700">{company}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
            <FiMapPin aria-hidden="true" className="h-4 w-4" />
            {location}
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
            INR {salaryLabel}
          </span>
        </div>

        {description ? (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
            {description}
          </p>
        ) : null}
      </div>

      <Link
        href={`/jobs/${id}`}
        className="mt-6 inline-flex items-center justify-between rounded-md border border-slate-200 px-4 py-3 text-sm font-bold text-slate-950 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
      >
        View role details
        <FiArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </article>
  );
}
