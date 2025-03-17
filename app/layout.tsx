import "@/app/globals.css";
import cn from "@/lib/helpers/cn";
import type { Metadata, Viewport } from "next";
import { Archivo, Chakra_Petch } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
});
const chakraPetch = Chakra_Petch({
  subsets: ["thai"],
  weight: ["400", "600", "700"],
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
      <body
        className={cn(
          archivo.className,
          chakraPetch.className,
          `antialiased bg-black text-white`
        )}
      >
        <div className="max-w-108 mx-auto">{children}</div>
      </body>
    </html>
  );
}
