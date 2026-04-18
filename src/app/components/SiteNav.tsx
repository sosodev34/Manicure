import Link from "next/link";

const navItems = [
  { href: "/services", label: "Tarifs" },
  { href: "/booking", label: "Réserver" },
  { href: "/dashboard", label: "Espace" }
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="brand-wordmark text-xl lowercase">
          nōmade
        </Link>
        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors duration-300 hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground sm:inline">
            Connexion
          </Link>
          <Link href="/booking" className="studio-cta rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
            Réserver
          </Link>
        </div>
      </nav>
    </header>
  );
}
