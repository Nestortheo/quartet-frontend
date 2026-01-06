import { useEffect, useState } from "react";
import { Link, NavLink, useLocation} from "react-router-dom";

import useNavTheme from "../hooks/useNavTheme";


export default function MyNavbar() {
  const [open, setOpen] = useState(false);

  // ✅ stays dark for the ENTIRE dark banner/hero section
  const { pathname } = useLocation();   // ✅ reactive
  const isHome = pathname === "/";

  const scrolledDark = useNavTheme(90);
  const isDark = isHome ? true : scrolledDark;

  

  const headerText = isDark ? "text-white/90" : "text-gray-900";
  const navText = isDark ? "text-white/70" : "text-gray-700";
  const navHover = isDark ? "hover:text-white" : "hover:text-gray-900";

  const linkBase = `block px-3 py-2 text-sm md:text-[15px] rounded-md transition-colors duration-300 ease-out ${navHover}`;
  const linkActive = isDark
    ? "text-white font-medium"
    : "text-gray-900 font-medium";

  const headerBg = isDark
    ? "bg-neutral-800/50"
    : "bg-white/70 border-b border-black/10";


  return (
    <header className="sticky top-0 z-50">
      <div
        className={`backdrop-blur-md will-change-[background-color] transition-[background-color,border-color] duration-300 ease-out ${headerBg}`}
      >
        <nav className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className={`text-lg font-medium tracking-widest uppercase transition-colors duration-300 ease-out ${headerText}`}
          >
            Erinys Quartet
          </Link>

          <ul
            className={`hidden md:flex items-center gap-6 transition-colors duration-300 ease-out ${navText}`}
          >
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

          <button
            className={`md:hidden inline-flex items-center justify-center rounded-md p-2 transition ${
              isDark
                ? "hover:bg-white/10 text-white/90"
                : "hover:bg-black/5 text-gray-900"
            }`}
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

      {open && (
        <div className="md:hidden border-t border-black/10 bg-white/95 backdrop-blur">
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
