"use client";

import { motion } from "framer-motion";
import { footerLinks } from "@/data/content";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-surface/30">
      <div className="section-padding pb-12 pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-orbitron text-lg font-bold text-highlight">
                TECHFEST&apos;26
              </h3>
              <p className="mt-3 font-inter text-sm leading-relaxed text-muted">
                30th Edition — Asia&apos;s Largest Science and Technology Festival.
                IIT Bombay, Powai, Mumbai.
              </p>
            </div>

            <div>
              <h4 className="font-space-grotesk text-xs uppercase tracking-[0.2em] text-primary">
                Contact
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href={`mailto:${footerLinks.contact.email}`}
                    className="font-inter text-sm text-muted transition-colors hover:text-primary"
                  >
                    {footerLinks.contact.email}
                  </a>
                </li>
                <li className="font-inter text-sm text-muted">
                  {footerLinks.contact.phone}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-space-grotesk text-xs uppercase tracking-[0.2em] text-primary">
                Location
              </h4>
              <ul className="mt-4 space-y-1">
                <li className="font-inter text-sm text-muted">
                  {footerLinks.location.venue}
                </li>
                <li className="font-inter text-sm text-muted">
                  {footerLinks.location.city}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-space-grotesk text-xs uppercase tracking-[0.2em] text-primary">
                Connect
              </h4>
              <div className="mt-4 flex flex-wrap gap-3">
                {footerLinks.social.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="rounded-full border border-white/10 px-4 py-2 font-inter text-xs text-muted transition-all hover:border-primary/30 hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-white/5 pt-8">
            <h4 className="mb-6 text-center font-space-grotesk text-xs uppercase tracking-[0.3em] text-muted">
              Sponsors
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {footerLinks.sponsors.map((sponsor) => (
                <span
                  key={sponsor}
                  className="font-inter text-sm text-muted/50 transition-colors hover:text-muted"
                >
                  {sponsor}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <motion.p
              className="font-space-grotesk text-xs tracking-[0.3em] text-muted/60"
              animate={{
                textShadow: [
                  "0 0 0px rgba(0,229,255,0)",
                  "0 0 10px rgba(0,229,255,0.3)",
                  "0 0 0px rgba(0,229,255,0)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Designed &amp; Developed by{" "}
              <span className="text-primary/80">HASH</span>
            </motion.p>
            <p className="font-inter text-[10px] text-muted/40">
              © 2026 TECHFEST. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
