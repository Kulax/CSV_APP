'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { FileText, Home } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <span className="font-bold text-xl">CSV Processor</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-sm font-medium">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link href="/docs" className="flex items-center gap-1 text-sm font-medium">
            <FileText className="h-4 w-4" />
            Documentation
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}