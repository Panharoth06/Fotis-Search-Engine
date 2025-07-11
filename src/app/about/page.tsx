'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export default function SplineSceneBasic() {
  return (
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
            <strong>Fotis</strong> is a modern search engine powered by the Brave Search API.  
            It allows you to explore the web using four powerful filters: <strong>Web</strong>, <strong>Images</strong>, <strong>Videos</strong>, and <strong>News</strong>.
            <br /><br />
            If you're a registered user, Fotis also offers a personal dashboard where you can track your search history, 
            see how often you search each month, and get insights into your activity — all in one place.
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
  )
}