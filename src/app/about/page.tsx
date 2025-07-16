"use client";

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Globe } from "@/components/magicui/globe";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import MarqueeDemo from "@/components/customUI/Marquee";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { TestimonialCarousel } from "@/components/ui/testimonial";

import panharoth from "../../../public/panharoth.jpg"
import chkea from "../../../public/chkea.jpg"

import { SparklesPreview } from "@/components/customUI/SparklesText";

const TESTIMONIAL_DATA = [
  {
    id: 1,
    name: "Panharoth",
    avatar: panharoth,
    description: " 'Eating & Sleeping 24/7' ",
  },
  // {
  //   id: 2,
  //   name: "Monivichra",
  //   avatar: chkea,
  //   description: "Member",
  // },
  // {
  //   id: 3,
  //   name: "Rachana ",
  //   avatar: panharoth,
  //   description: "Member",
  // },
];

export default function SplineSceneBasic() {
  return (
    <div className="bg-black/[0.96] mb-12">
      <Card className="w-full h-screen bg-black/[0.96] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className="flex flex-col md:flex-row h-full">
          {/* Left content */}
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              What is Fotis?
            </h1>
            <p className="mt-4 text-neutral-300 text-xl max-w-lg">
              <strong>Fotis</strong> is a modern search engine powered by the
              Brave Search API. It allows you to explore the web using four
              powerful filters: <strong>Web</strong>, <strong>Images</strong>,{" "}
              <strong>Videos</strong>, and <strong>News</strong>.
              <br />
              <br />
              If you&#39;re a registered user, Fotis also offers a personal
              dashboard where you can track your search history, see how often
              you search each month, and get insights into your activity — all
              in one place.
            </p>
          </div>

          {/* Right content */}
          <div className="flex-1 relative">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full min:h-full"
            />
          </div>
        </div>
      </Card>
      <div className="relative flex size-full max-w-full items-center justify-center overflow-hidden rounded-lg pb-40 pt-8 md:pb-60">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black/20 to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Fotis
        </span>
        <Globe className="top-28" />
      </div>
      <VelocityScroll
        className="text-neutral-300 text-5xl mt-60"
        defaultVelocity={1}
      >
        Fotis-Search Engine
      </VelocityScroll>
      <div className="mt-48"></div>
      <MarqueeDemo />
      <SplashCursor />

      <div className="mt-32">
        <SparklesPreview/>
      </div>

      <TestimonialCarousel
        testimonials={TESTIMONIAL_DATA}
        className="max-w-2xl mx-auto"
      />
    </div>
  );
}
