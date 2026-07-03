type HeroProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function Hero({ search, setSearch }: HeroProps) {
  return (
    <section className="text-center py-12">
      <h2 className="text-5xl font-bold text-gray-800">
        Find Your Dream Job
      </h2>

      <p className="text-gray-600 mt-4 text-lg">
  Find the right job that matches your skills and career goals.
</p>

      <div className="mt-8">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-96 p-3 border-2 border-gray-400 rounded-lg text-black placeholder-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </section>
  );
}