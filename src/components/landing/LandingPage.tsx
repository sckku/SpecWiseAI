"use client";

import React from "react";
import { LandingNavbar } from "./LandingNavbar";
import { HeroSection } from "./HeroSection";
import { MetricsBanner } from "./MetricsBanner";
import { FeaturesSection } from "./FeaturesSection";
import { PipelineSection } from "./PipelineSection";
import { ComparisonSection } from "./ComparisonSection";
import { CatalogShowcaseSection } from "./CatalogShowcaseSection";
import { RolePersonaSection } from "./RolePersonaSection";
import { CtaBanner } from "./CtaBanner";
import { LandingFooter } from "./LandingFooter";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Sticky Glassmorphic Navbar */}
      <LandingNavbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero with Live Interactive Preview */}
        <HeroSection />

        {/* Floating Impact Metrics */}
        <MetricsBanner />

        {/* 6 Core Features & Interactive Tab Showcase */}
        <FeaturesSection />

        {/* Deep Dive: 6-Step AI Engine Pipeline */}
        <PipelineSection />

        {/* Before vs After Process Comparison */}
        <ComparisonSection />

        {/* 4 Official Price Catalogs & Evidence Sources */}
        <CatalogShowcaseSection />

        {/* Persona Breakdown for KKU Roles */}
        <RolePersonaSection />

        {/* Call to Action Banner */}
        <CtaBanner />
      </main>

      {/* Modern Clean Footer */}
      <LandingFooter />
    </div>
  );
}
