import Background from "@/app/components/Background";
import "@/app/globals.css";
import cn from "@/lib/helpers/cn";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Archivo, Chakra_Petch } from "next/font/google";
import localFont from "next/font/local";

const archivo = Archivo({
  style: ["normal", "italic"],
  subsets: ["latin"],
  axes: ["wdth"],
});
const chakraPetch = Chakra_Petch({
  style: ["normal", "italic"],
  subsets: ["thai"],
  weight: ["400", "600", "700"],
});
const icon = localFont({
  // https://github.com/google/material-design-icons/blob/master/variablefont
  src: "../public/fonts/material-symbols.woff2",
  display: "block",
});

export const metadata: Metadata = {
  title: "Intania Expo 2025",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body
        className={cn(
          archivo.className,
          chakraPetch.className,
          icon.className,
          `bg-black text-white antialiased`,
        )}
      >
        <Background className="opacity-50" />
        <div className="mx-auto max-w-108 px-4 font-sans">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
