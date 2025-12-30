import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Left */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-900">
              Erinys Quartet
            </p>
            <p className="text-sm text-gray-600">
              Vienna-based string quartet · Classical & contemporary repertoire
            </p>
          </div>

          {/* Right */}
          <nav className="flex flex-wrap gap-4 text-sm text-gray-700">
            <Link to="/about" className="hover:underline underline-offset-4">
              About
            </Link>
            <Link to="/concerts" className="hover:underline underline-offset-4">
              Concerts
            </Link>
            <Link to="/media" className="hover:underline underline-offset-4">
              Media
            </Link>
            <Link to="/contact" className="hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>

        {/* Bottom line */}
        <div className="mt-8 flex flex-col gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Erinys Quartet</p>
          <p>
            Website by{" "}
            <span className="text-gray-700">Erinys Quartet</span>
          </p>
        </div>
      </div>
    </footer>
  );
}