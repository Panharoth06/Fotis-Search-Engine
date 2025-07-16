"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SplashCursor } from "@/components/ui/splash-cursor";

export default function HomePage() {
  
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}&type=web`);
  };

  

  return (
    <div className="bg-black/[0.96] overflow-hidden min-h-screen flex flex-col items-center justify-center text-white relative">
      {/* SVG Background */}
      <svg
        id="wave"
        className="absolute bottom-0 w-[2600px] h-auto z-2 animate-wave"
        viewBox="740 0 2640 310"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundBlendMode: "overlay" }}
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(243, 106, 62, 1)" offset="0%" />
            <stop stopColor="rgba(255, 175.574, 0, 1)" offset="100%" />
          </linearGradient>
        </defs>
        <path
          fill="url(#sw-gradient-0)"
          d="M0,217L48,227.3C96,238,192,258,288,258.3C384,258,480,238,576,211.8C672,186,768,155,864,118.8C960,83,1056,41,1152,25.8C1248,10,1344,21,1440,56.8C1536,93,1632,155,1728,196.3C1824,238,1920,258,2016,253.2C2112,248,2208,217,2304,180.8C2400,145,2496,103,2592,98.2C2688,93,2784,124,2880,134.3C2976,145,3072,134,3168,149.8C3264,165,3360,207,3456,211.8C3552,217,3648,186,3744,149.8C3840,114,3936,72,4032,93C4128,114,4224,196,4320,222.2C4416,248,4512,217,4608,170.5C4704,124,4800,62,4896,72.3C4992,83,5088,165,5184,170.5C5280,176,5376,103,5472,108.5C5568,114,5664,196,5760,211.8C5856,227,5952,176,6048,139.5C6144,103,6240,83,6336,67.2C6432,52,6528,41,6624,62C6720,83,6816,134,6864,160.2L6912,186L6912,310L6864,310C6816,310,6720,310,6624,310C6528,310,6432,310,6336,310C6240,310,6144,310,6048,310C5952,310,5856,310,5760,310C5664,310,5568,310,5472,310C5376,310,5280,310,5184,310C5088,310,4992,310,4896,310C4800,310,4704,310,4608,310C4512,310,4416,310,4320,310C4224,310,4128,310,4032,310C3936,310,3840,310,3744,310C3648,310,3552,310,3456,310C3360,310,3264,310,3168,310C3072,310,2976,310,2880,310C2784,310,2688,310,2592,310C2496,310,2400,310,2304,310C2208,310,2112,310,2016,310C1920,310,1824,310,1728,310C1632,310,1536,310,1440,310C1344,310,1248,310,1152,310C1056,310,960,310,864,310C768,310,672,310,576,310C480,310,384,310,288,310C192,310,96,310,48,310L0,310Z"
        />
      </svg>
      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-6 text-orange-500">
          Fotis Search
        </h1>
        <form onSubmit={handleSubmit} className="text-xl w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search with Fotis"
            className="w-full px-6 py-3 rounded-full bg-[#111] text-white 
                       border-1 border-orange-300 focus:border-orange-500 
                       focus:outline-none transition duration-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
      <SplashCursor />
    </div>
  );
}
