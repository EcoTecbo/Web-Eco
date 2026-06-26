import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

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
  metadataBase: new URL("https://www.ecotaxi.com.bo"),
  alternates: {
    canonical: "https://www.ecotaxi.com.bo",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Ecotaxi Bolivia - Transporte Inteligente, Compromiso Ecológico",
    description:
      "Primera empresa de transporte en Bolivia con neutralización de CO2. Taxi, traslado aeropuerto, mudanzas profesionales.",
    url: "https://www.ecotaxi.com.bo/",
    siteName: "Ecotaxi Bolivia",
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
