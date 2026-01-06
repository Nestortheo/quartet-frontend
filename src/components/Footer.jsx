import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-sm tracking-[0.25em] uppercase text-white/90">
              Erinys Quartet
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Vienna-based string quartet exploring classical repertoire alongside
              contemporary works.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-medium text-white/90">Pages</p>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              <li><Link className="hover:text-white transition" to="/about">About</Link></li>
              <li><Link className="hover:text-white transition" to="/concerts">Concerts</Link></li>
              <li><Link className="hover:text-white transition" to="/media">Media</Link></li>
              <li><Link className="hover:text-white transition" to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-medium text-white/90">Contact</p>
            <div className="mt-4 space-y-2 text-sm text-white/65">
              <a
                className="block hover:text-white transition"
                href="mailto:erinys.stringquartet@gmail.com"
              >
                erinys.stringquartet@gmail.com
              </a>
              <div className="mt-4 flex items-center gap-4 text-white/70">
                <a
                  href="https://www.instagram.com/erinysquartet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://facebook.com/erinysquartet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="mailto:erinys.stringquartet@gmail.com"
                  className="hover:text-white transition"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Erinys Quartet. All rights reserved.</span>
          <span className="text-white/40">Vienna • String Quartet</span>
        </div>
      </div>
    </footer>
  );
}