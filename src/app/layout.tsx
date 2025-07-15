import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AnimatedNavBar from "@/components/animated-navbar/animatednavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fotis",
  description: "Fotis is a search engine",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) 
{
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black/95`}
      >
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full z-50 bg-black/95 flex justify-center items-center py-4 shadow-md">
          <div className="text-white">
            <AnimatedNavBar
              links={[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
              ]}
            />
          </div>
        </div>

        {/* Spacer to prevent overlap */}
         {/* Adjust height to match navbar height */}
        {/* <div className="h-20" /> */}

        {children}
      </body>
    </html>
  );
}

