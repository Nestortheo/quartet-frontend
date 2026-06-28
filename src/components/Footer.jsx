import { Instagram, Facebook, Mail, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80 text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Brand */}
          <div className="space-y-2">
            <p className="font-serif text-3xl tracking-[0.28em] text-[#D9A474]">
              Erinys Quartet
            </p>
            <p className="text-base text-[#A2907D]">Indianapolis • String Quartet</p>
          </div>

          {/* Contact */}
          <a
            className="text-sm text-[##D8CDC0] hover:text-white transition"
            href="mailto:erinys.stringquartet@gmail.com"
          >
            erinys.stringquartet@gmail.com
          </a>

          {/* Socials */}
          <div className="flex items-center justify-center gap-5">
            <a
              href="https://www.instagram.com/erinysquartet"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition"
              aria-label="Instagram"
            >
              <div className="flex items-center justify-center gap-2">
                <Instagram
                  size={22}
                  className="
                      text-[#BEA78B]
                      transition-colors
                      duration-300
                      group-hover:text-[#D9A474]
                  "
              />

              <p
                  className="
                      text-[#D8CDC0]
                      transition-colors
                      duration-300
                      group-hover:text-[#D9A474]
                  "
              >
                  Instagram
              </p>
              </div>
            </a>
            <div className="w-px h-5 bg-[#776D62]/60" />

            <a
              href="https://facebook.com/erinysquartet"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition"
              aria-label="Facebook"
            >
              <div className="flex items-center justify-center gap-2">
                <Facebook
                  size={22}
                  className="
                      text-[#BEA78B]
                      transition-colors
                      duration-300
                      group-hover:text-[#D9A474]
                  "
                />

                <p
                    className="
                        text-[#D8CDC0]
                        transition-colors
                        duration-300
                        group-hover:text-[#D9A474]
                    "
                >
                    Facebook
                </p>
              </div>
            </a>
            <div className="w-px h-5 bg-[#776D62]/60" />

            <a
              href="https://www.youtube.com/@erinysquartet"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition"
              aria-label="YouTube"
            >
              <div className="flex items-center justify-center gap-2">
                <Youtube
                  size={22}
                  className="
                      text-[#BEA78B]
                      transition-colors
                      duration-300
                      group-hover:text-[#D9A474]
                  "
                />

                <p
                    className="
                        text-[#D8CDC0]
                        transition-colors
                        duration-300
                        group-hover:text-[#D9A474]
                    "
                >
                    Youtube
                </p>
              </div>
            </a>

          </div>

          {/* Bottom */}
          <div className="w-full border-t border-[#776D62]/50 pt-3 text-xs ">
            © {new Date().getFullYear()} Erinys Quartet. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
