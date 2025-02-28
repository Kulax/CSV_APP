'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileUp } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" aria-hidden="true" />
      
      {/* Animated gradient orbs */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-pink-500/30 to-orange-500/30 blur-3xl" />
      
      <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">Effortless CSV Processing</span>
            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              For Your Business
            </span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Upload, validate, and process CSV files with ease. Our background processing system handles large datasets efficiently while providing real-time status updates.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="rounded-full">
              <Link href="#upload-section">
                <FileUp className="mr-2 h-5 w-5" />
                Upload CSV
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/docs">
                Learn more
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}