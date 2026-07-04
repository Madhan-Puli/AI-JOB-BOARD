import { FiSearch, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";

type HeroProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  totalJobs: number;
};

const highlights = [
  {
    icon: FiTrendingUp,
    label: "Live roles",
    value: "Curated",
  },
  {
    icon: FiUsers,
    label: "Hiring workflow",
    value: "Candidate first",
  },
  {
    icon: FiShield,
    label: "Quality bar",
    value: "Verified data",
  },
];

export default function Hero({ search, setSearch, totalJobs }: HeroProps) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-md border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            AI-assisted job discovery for modern software teams
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
            Find high-signal software roles without the noise.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Search curated engineering opportunities, inspect role details, and
            apply with a clean candidate workflow built for real hiring teams.
          </p>

          <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
            <FiSearch aria-hidden="true" className="ml-3 h-5 w-5 text-slate-400" />
            <input
              type="search"
              placeholder="Search by role, company, location, or salary"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="min-w-0 flex-1 border-0 bg-transparent px-1 py-3 text-slate-950 placeholder:text-slate-400 focus:shadow-none"
            />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Talent marketplace snapshot
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-4xl font-bold text-slate-950">{totalJobs}</p>
                <p className="mt-1 text-sm text-slate-500">Open roles</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-950">24h</p>
                <p className="mt-1 text-sm text-slate-500">Review target</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-slate-100 text-slate-700">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-950">{item.value}</p>
                    <p className="text-sm text-slate-500">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
