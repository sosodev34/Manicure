import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "NŌMADE Manucure | Ongle naturel à Puilboreau",
  description: "Spécialiste de l’ongle naturel à Puilboreau (17). Réservez une manucure minimaliste chez NŌMADE Manucure."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
