import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { data } from "@/lib/data";
import CardLegend from "@/components/CardLegend";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "captive zone",
  description: "Generate connection's informations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeSwitcher />
        <main className="mt-10">
          {children}
        </main>
        <footer className="max-w-4xl mx-auto mb-8 px-10 py-4">
          <div className="border p-4 rounded bg-white/10 backdrop-blur-sm">
          <h1 className="text-2xl mb-2">Légendes</h1>
            {
              data && data.map((d, i) => {
                return <CardLegend title={d.title} description={d.description} key={i} />
              })
            }
          </div>
        </footer>
      </body>
    </html>
  );
}
