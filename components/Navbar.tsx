import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          AI Job Board
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="hover:text-yellow-300 transition duration-200"
          >
            Home
          </Link>

          <Link
            href="/jobs"
            className="hover:text-yellow-300 transition duration-200"
          >
            Jobs
          </Link>

          <Link
            href="/post-job"
            className="hover:text-yellow-300 transition duration-200"
          >
            Post Job
          </Link>
        </div>
      </div>
    </nav>
  );
}