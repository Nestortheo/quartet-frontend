import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function MyNavbar() {
  const [open, setOpen] = useState(false);

  const linkBase =
    "block px-3 py-2 text-sm md:text-[15px] rounded-md transition hover:text-blue-600";
  const linkActive = "text-blue-600 font-medium";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <nav className="max-w-6xl mx-auto h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          Erinys Quartet
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 text-gray-700">
          {[
            ["About", "/about"],
            ["Concerts", "/concerts"],
            ["Media", "/media"],
            ["Contact", "/contact"],
          ].map(([label, to]) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* hamburger / close */}
          <svg
            className={`${open ? "hidden" : "block"}`}
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <svg
            className={`${open ? "block" : "hidden"}`}
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 space-y-1 text-gray-700">
            {[
              ["About", "/about"],
              ["Concerts", "/concerts"],
              ["Media", "/media"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${isActive ? "text-blue-600 font-medium" : "hover:text-blue-600"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
