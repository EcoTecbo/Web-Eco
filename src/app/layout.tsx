import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { VehicleBackground } from "@/components/ecotaxi/vehicle-background";
import { EcotaxiChatWidget } from "@/components/ecotaxi/ecotaxi-chat-widget";
import { SchemaOrg } from "@/components/ecotaxi/schema-org";

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
    "Primera empresa de transporte en Bolivia con plan de medición, reducción y neutralización de emisiones de CO2. Reserva tu taxi, traslado al aeropuerto o mudanza profesional.",
  keywords: [
    "Ecotaxi",
    "Bolivia",
    "taxi",
    "transporte ecológico",
    "CO2",
    "carbono neutro",
    "Santa Cruz",
    "reservas taxi",
    "taxi aeropuerto Viru Viru",
    "taxi ejecutivo Santa Cruz",
    "mudanza Bolivia",
    "mudanza Santa Cruz",
    "mudanza local",
    "mudanza nacional",
    "furgón de mudanza",
    "camioneta de mudanza",
    "calculadora de mudanza",
    "transporte corporativo Bolivia",
  ],
  authors: [{ name: "O&C Ingeniería y Representaciones SRL" }],
  creator: "O&C Ingeniería y Representaciones SRL",
  publisher: "Ecotaxi Bolivia",
  metadataBase: new URL("https://www.ecotaxi-bo.com"),
  alternates: {
    canonical: "https://www.ecotaxi-bo.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://static.wixstatic.com/media/93e1f3_ab4f7e0b7c2e4f4ba3e0be8f1c2a8f44~mv2.png/v1/fill/w_247,h_104,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Vector%20Ecotaxi.png",
  },
  openGraph: {
    title: "Ecotaxi Bolivia - Transporte Inteligente, Compromiso Ecológico",
    description:
      "Primera empresa de transporte en Bolivia con neutralización de CO2. Taxi, traslado aeropuerto, mudanzas profesionales.",
    url: "https://www.ecotaxi-bo.com/",
    siteName: "Ecotaxi Bolivia",
    type: "website",
    locale: "es_BO",
    images: [
      {
        url: "https://static.wixstatic.com/media/93e1f3_ab4f7e0b7c2e4f4ba3e0be8f1c2a8f44~mv2.png/v1/fill/w_247,h_104,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Vector%20Ecotaxi.png",
        width: 1200,
        height: 630,
        alt: "Ecotaxi Bolivia - Taxi Ecológico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecotaxi Bolivia - Transporte Inteligente, Compromiso Ecológico",
    description:
      "Primera empresa de transporte en Bolivia con neutralización de CO2.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <head>
        <SchemaOrg />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0e17] text-white`}
      >
        <VehicleBackground />
        <div className="relative z-10">
          {children}
        </div>
        <Toaster />
        <EcotaxiChatWidget />
      </body>
    </html>
  );
}
