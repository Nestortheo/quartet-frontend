import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-3xl border border-black/10 bg-white/60 p-8 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-neutral-900">
          Page not found
        </h1>
        <p className="mt-3 text-neutral-600">
          The page you’re looking for doesn’t exist (or the link was typed wrong).
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition"
          >
            Go home
          </Link>
          <Link
            to="/concerts"
            className="rounded-xl border border-neutral-900 px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-900 hover:text-white transition"
          >
            View concerts
          </Link>
        </div>
      </div>
    </main>
  );
}