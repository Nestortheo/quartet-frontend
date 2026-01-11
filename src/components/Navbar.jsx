import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function MyNavbar() {
  const [open, setOpen] = useState(false);

  const linkBase =
    "block px-3 py-2 text-sm md:text-[15px] rounded-md transition-colors duration-200 hover:text-gray-900";

  const linkActive = "text-black font-medium";

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#eceae7]/90 backdrop-blur-md border-b border-black/5">
        <nav className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-medium tracking-widest uppercase text-gray-900"
          >
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

          {/* Mobile button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-black/5 transition"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {/* hamburger */}
            <svg
              className={`${open ? "hidden" : "block"}`}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* close */}
            <svg
              className={`${open ? "block" : "hidden"}`}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 6l12 12M18 6l-12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white">
          <div className="mx-auto max-w-7xl px-6 py-3 space-y-1 text-gray-700">
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
                  `block px-3 py-2 rounded-md transition ${
                    isActive
                      ? "text-gray-900 font-medium"
                      : "hover:text-gray-900"
                  }`
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
