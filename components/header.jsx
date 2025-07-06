"use client";

import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const { isLoading } = useStoreUser();
  const path = usePathname();

  return (
    <header className="fixed top-0 w-full border-b border-gray-800 bg-black/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-black/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* -------- Logo -------- */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/logo.png"
            alt="SplitPal Logo"
            width={256}         
            height={256}
            className="h-full w-auto object-contain"
            priority
          />
        </Link>

        {/* -------- Landing‑page links -------- */}
        {path === "/" && (
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-white hover:text-sky-400 transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-white hover:text-sky-400 transition-colors duration-200"
            >
              How It Works
            </Link>
          </div>
        )}

        {/* -------- Auth / Dashboard buttons -------- */}
        <div className="flex items-center gap-4">
          <Authenticated>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 !text-white !border-gray-700 hover:!text-sky-400 hover:!border-sky-400 transition-colors duration-200 !bg-transparent hover:!bg-gray-800/50"
                style={{
                  color: 'white',
                  borderColor: '#374151',
                  backgroundColor: 'transparent'
                }}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="md:hidden w-10 h-10 p-0 !text-white hover:!text-sky-400 hover:!bg-gray-800"
                style={{
                  color: 'white'
                }}
              >
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </Authenticated>

          <Unauthenticated>
            <SignInButton>
              <Button variant="ghost" className="text-white hover:text-sky-400 hover:bg-gray-800">Sign In</Button>
            </SignInButton>

            <SignUpButton>
              <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-none shadow-lg hover:shadow-sky-500/25 transition-all duration-300">
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
        </div>
      </nav>

      {/* -------- Loading bar -------- */}
      {isLoading && <BarLoader width="100%" color="#0ea5e9" />}
    </header>
  );
}
