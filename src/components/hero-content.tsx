"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function HeroContent() {
  return (
    <main className="absolute bottom-32 left-4 md:left-12 z-20 max-w-md">
      <div className="text-left">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10">
            📧 Email Testing Made Simple
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
          <span className="font-medium italic instrument">Perfect</span> Email
          <br />
          <span className="font-light tracking-tight text-white">Testing</span>
        </h1>

        <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
          Preview and test your HTML emails across all devices and clients.
          Streamline your quality assurance workflow with pixel-perfect
          rendering and comprehensive compatibility testing.
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          <Link href="">
            <Button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
              Project repository
            </Button>
          </Link>
          <Button className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
            Start Testing
          </Button>
        </div>
      </div>
    </main>
  );
}
