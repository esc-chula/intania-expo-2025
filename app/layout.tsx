import RedCastle from "@/app/components/RedCastle";
import "@/app/globals.css";
import cn from "@/lib/helpers/cn";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Archivo, Bai_Jamjuree } from "next/font/google";
import localFont from "next/font/local";

const archivo = Archivo({
  style: ["normal", "italic"],
  subsets: ["latin"],
  axes: ["wdth"],
});
const baiJamjuree = Bai_Jamjuree({
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
  themeColor: "#420d12", // Dark Red
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
          baiJamjuree.className,
          icon.className,
          `bg-black text-white antialiased`,
        )}
      >
        <div className="bg-dark-red fixed -z-10 h-32 w-screen">
          <RedCastle
            className={cn(`bg-dark-red absolute left-1/2 w-108
              -translate-x-1/2 text-black`)}
          />
        </div>
        <div className="mx-auto max-w-108 px-4 font-sans">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
