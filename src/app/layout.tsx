import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ecommerce AI Engine — Pricing & Inventory Intelligence",
  description:
    "Enterprise-grade AI engine for pricing optimization, inventory intelligence, customer segmentation, and revenue analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white font-bold text-sm">
                AI
              </div>
              <div>
                <h1 className="text-lg font-bold leading-tight text-ink">
                  Ecommerce AI Engine
                </h1>
                <p className="text-xs text-ink/50">
                  Pricing &amp; Inventory Intelligence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-ink/50">
              <span>Dashboard</span>
              <span>Pricing</span>
              <span>Inventory</span>
              <span>Segments</span>
              <span>Promotions</span>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
