import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { VehicleBackground } from "@/components/ecotaxi/vehicle-background";
import { EcotaxiChatWidget } from "@/components/ecotaxi/ecotaxi-chat-widget";
import { SchemaOrg } from "@/components/ecotaxi/schema-org";
import { SITE } from "@/lib/seo-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ecotaxi Bolivia — Taxi Ecológico, Mudanzas y Transporte Profesional",
    template: "%s | Ecotaxi Bolivia",
  },
  description:
    "Primera empresa de transporte en Bolivia con plan de medición, reducción y neutralización de emisiones de CO2. Reserva tu taxi, traslado al aeropuerto o mudanza profesional.",
  keywords: [
    "Ecotaxi", "Bolivia", "taxi", "transporte ecológico", "CO2",
    "carbono neutro", "Santa Cruz", "reservas taxi",
    "taxi aeropuerto Viru Viru", "taxi ejecutivo Santa Cruz",
    "mudanza Bolivia", "mudanza Santa Cruz", "mudanza local",
    "mudanza nacional", "furgón de mudanza", "camioneta de mudanza",
    "calculadora de mudanza", "transporte corporativo Bolivia",
    "taxi 24 horas Bolivia", "radio taxi Santa Cruz",
    "transporte salud Bolivia", "envíos mensajería Bolivia",
    "auxilio mecánico Bolivia", "transporte escolar Bolivia",
    "bus alquiler Bolivia", "logística distribución Bolivia",
  ],
  authors: [{ name: SITE.org }],
  creator: SITE.org,
  publisher: SITE.name,
  metadataBase: new URL(SITE.domain),
  alternates: {
    canonical: SITE.domain,
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
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/logo-ecotaxi.webp", type: "image/webp" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Ecotaxi Bolivia — Taxi Ecológico, Mudanzas y Transporte Profesional",
    description:
      "Primera empresa de transporte en Bolivia con neutralización de CO2. Taxi, traslado aeropuerto, mudanzas profesionales, transporte corporativo y logística.",
    url: SITE.domain,
    siteName: SITE.name,
    type: "website",
    locale: "es_BO",
    images: [
      {
        url: "/logo-ecotaxi.webp",
        width: 512,
        height: 512,
        alt: "Ecotaxi Bolivia - Taxi Ecológico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecotaxi Bolivia — Taxi Ecológico, Mudanzas y Transporte Profesional",
    description:
      "Primera empresa de transporte en Bolivia con neutralización de CO2. Reserva online 24/7.",
    images: ["/logo-ecotaxi.webp"],
  },
  verification: {
    google: "google-site-verification=YOUR_CODE_HERE",
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
        <meta name="geo.region" content="BO-S" />
        <meta name="geo.placename" content="Santa Cruz de la Sierra" />
        <meta name="geo.position" content="-17.7833;-63.1833" />
        <meta name="ICBM" content="-17.7833, -63.1833" />
        <link rel="preconnect" href="https://nominatim.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://router.project-osrm.org" />
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
