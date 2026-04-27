import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { VehicleBackground } from "@/components/ecotaxi/vehicle-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecotaxi Bolivia - Transporte Inteligente, Compromiso Ecológico",
  description:
    "Primera empresa de transporte en Bolivia con plan de medición, reducción y neutralización de emisiones de CO2. Reserva tu taxi de forma rápida y segura.",
  keywords: [
    "Ecotaxi",
    "Bolivia",
    "taxi",
    "transporte ecológico",
    "CO2",
    "carbono neutro",
    "Santa Cruz",
    "reservas taxi",
  ],
  authors: [{ name: "O&C Ingeniería y Representaciones SRL" }],
  icons: {
    icon: "https://static.wixstatic.com/media/93e1f3_ab4f7e0b7c2e4f4ba3e0be8f1c2a8f44~mv2.png/v1/fill/w_247,h_104,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Vector%20Ecotaxi.png",
  },
  openGraph: {
    title: "Ecotaxi Bolivia - Transporte Inteligente, Compromiso Ecológico",
    description:
      "Primera empresa de transporte en Bolivia con neutralización de CO2. Reserva ahora.",
    url: "https://www.ecotaxi-bo.com/",
    siteName: "Ecotaxi Bolivia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0e17] text-white`}
      >
        <VehicleBackground />
        <div className="relative z-10">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
