import Link from "next/link";
import { Waves, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-glass-border bg-ocean-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Waves className="h-6 w-6 text-lagoon" />
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold">
                overwater<span className="text-maya">.com</span>
              </span>
            </Link>
            <p className="text-sm text-foreground/50 leading-relaxed">
              Fractional overwater cabana ownership at Lina Point Resort, San Pedro, Belize.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-maya mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: "/own", label: "Own the Magic" },
                { href: "/quiz", label: "Soulful Quiz" },
                { href: "/blueprint", label: "The Blueprint" },
                { href: "/vision", label: "Our Vision" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/50 hover:text-lagoon transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-sm font-semibold text-maya mb-4">Ecosystem</h4>
            <ul className="space-y-2">
              {[
                { href: "https://lina-point.vercel.app", label: "Lina Point Resort" },
                { href: "https://magic-is-you.vercel.app", label: "Magic Is You" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/50 hover:text-lagoon transition-colors"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-maya mb-4">Contact Rick</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-foreground/50">
                <Mail className="h-4 w-4 text-lagoon" />
                <a href="mailto:rick@linapoint.com" className="hover:text-lagoon transition-colors">
                  rick@linapoint.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground/50">
                <Phone className="h-4 w-4 text-lagoon" />
                <a href="https://wa.me/5016106547" className="hover:text-lagoon transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground/50">
                <MapPin className="h-4 w-4 text-lagoon" />
                San Pedro, Ambergris Caye, Belize
              </li>
            </ul>
          </div>
        </div>

        {/* Closing */}
        <div className="mt-16 border-t border-glass-border pt-8 text-center">
          <p className="font-[family-name:var(--font-display)] text-lg text-maya/80 italic">
            &ldquo;The Magic is You&rdquo;
          </p>
          <p className="mt-2 text-xs text-foreground/30">
            © {new Date().getFullYear()} Overwater.com — Lina Point Resort, San Pedro, Belize. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
