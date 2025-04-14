'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#1f1f1f] via-[#2a2a2a] to-[#1a1a1a] px-6">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#28c244] opacity-20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#4f4f4f] opacity-20 rounded-full filter blur-3xl animate-pulse delay-300" />
      
      {/* Glass panel */}
      <div className="relative z-10 w-full max-w-xl px-10 py-12 backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 shadow-xl text-center text-white">
        <h1 className="text-6xl font-extrabold tracking-wide mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-gray-400">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-400 mb-6">
          It looks like you’ve wandered off the path. The page you’re looking for doesn’t exist on this site.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#28c244] hover:bg-[#23a73c] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/40"
        >
          Return Home
        </Link>
      </div>

      {/* Stars BG - subtle ambient touch */}
      <div className="absolute inset-0 z-0 bg-[url('/stars.svg')] bg-cover opacity-5 pointer-events-none" />
    </div>
  );
}
