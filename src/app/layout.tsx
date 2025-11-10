import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studio Nexora - Fotos Profesionales con IA",
  description: "Transforma tus fotos en experiencias épicas con inteligencia artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <main className="min-h-screen bg-black">
          {children}
        </main>
      </body>
    </html>
  );
}
