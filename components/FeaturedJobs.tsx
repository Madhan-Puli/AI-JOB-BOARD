type FeaturedJobsProps = {
  resultCount: number;
  totalJobs: number;
};

export default function FeaturedJobs({
  resultCount,
  totalJobs,
}: FeaturedJobsProps) {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-3 px-5 pt-10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          Featured roles
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">
          Roles worth your attention
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          A focused job board experience with clean role cards, quick scanning,
          and direct application paths.
        </p>
      </div>

      <p className="text-sm font-semibold text-slate-500">
        Showing {resultCount} of {totalJobs} roles
      </p>
    </section>
  );
}
