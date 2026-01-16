import { Instagram, Facebook, Mail, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80 text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Brand */}
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.35em] text-white/85">
              Erinys Quartet
            </p>
            <p className="text-xs text-white/50">Vienna • String Quartet</p>
          </div>

          {/* Contact */}
          <a
            className="text-sm text-white/65 hover:text-white transition"
            href="mailto:erinys.stringquartet@gmail.com"
          >
            erinys.stringquartet@gmail.com
          </a>

          {/* Socials */}
          <div className="flex items-center justify-center gap-5 text-white/60">
            <a
              href="https://www.instagram.com/erinysquartet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="Instagram"
            >
              <Instagram size={28} />
            </a>

            <a
              href="https://facebook.com/erinysquartet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="Facebook"
            >
              <Facebook size={28} />
            </a>

            <a
              href="https://www.youtube.com/@erinysquartet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="YouTube"
            >
              <Youtube size={28} />
            </a>

            <a
              href="mailto:erinys.stringquartet@gmail.com"
              className="hover:text-white transition"
              aria-label="Email"
            >
              <Mail size={28} />
            </a>
          </div>

          {/* Bottom */}
          <div className="w-full border-t border-white/10 pt-3 text-xs text-white/45">
            © {new Date().getFullYear()} Erinys Quartet. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
