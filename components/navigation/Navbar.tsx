"use client";

import Link from "next/link";
import { Gauge, Zap } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-carbon-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl border border-electric/30 bg-electric/10 text-electric shadow-neon">
            <Gauge size={19} />
          </span>
          <div>
            <div className="text-sm font-black uppercase tracking-[0.18em]">
              Redline <span className="text-electric">AI</span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.24em] text-white/35">
              Extreme auto editor
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-white/55 md:flex">
          <a className="transition hover:text-white" href="#engine">
            Engine
          </a>
          <a className="transition hover:text-white" href="#workflow">
            Workflow
          </a>
          <a className="transition hover:text-white" href="#formats">
            Formats
          </a>
        </nav>

        <Link href="/workspace" className="neon-button !px-4 !py-2.5">
          <Zap size={15} fill="currentColor" />
          Launch Editor
        </Link>
      </div>
    </header>
  );
}
