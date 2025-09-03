"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between p-8">
      <div className="flex items-center">
        <div className="text-white font-medium text-4xl tracking-tight">
          <Link href="/">
            Pixel<span className="font-medium  instrument">Test</span>
          </Link>
        </div>
      </div>

      <div
        id="gooey-btn"
        className="relative flex items-center group"
        style={{ filter: "url(#gooey-filter)" }}
      >
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10">
              Login
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-6">
            <Link href="/create-email">
              <Button className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
                Create new test email
              </Button>
            </Link>
            <div className="hidden md:block">
              <UserButton />
            </div>
          </div>
        </SignedIn>
      </div>
    </header>
  );
}
