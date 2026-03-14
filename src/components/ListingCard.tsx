"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bed, Maximize2, DollarSign } from "lucide-react";
import type { Listing } from "@/lib/data";

interface Props {
  listing: Listing;
  index: number;
}

export function ListingCard({ listing, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card overflow-hidden group hover:border-lagoon/30 transition-colors"
    >
      {/* Image placeholder */}
      <div className="relative h-56 bg-gradient-to-br from-ocean-mid to-ocean-surface overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl mb-2">🏝️</p>
            <p className="text-sm text-foreground/40">{listing.name}</p>
          </div>
        </div>
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-maya/90 px-3 py-1 text-xs font-semibold text-ocean-deep">
            {listing.sharesAvailable} shares left
          </span>
        </div>
        {listing.type === "lot" && (
          <div className="absolute top-4 right-4">
            <span className="rounded-full bg-reef/90 px-3 py-1 text-xs font-semibold text-white">
              New Build
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-2">
          {listing.name}
        </h3>

        <div className="flex items-center gap-4 text-sm text-foreground/50 mb-4">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" /> {listing.bedrooms}BR
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 className="h-4 w-4" /> {listing.sqft} sqft
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-maya">${listing.monthlyPayment}</span>
          <span className="text-sm text-foreground/40">/mo per share</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-reef mb-6">
          <DollarSign className="h-4 w-4" />
          <span>
            ${listing.netIncomeMin.toLocaleString()}–${listing.netIncomeMax.toLocaleString()} annual rental income
          </span>
        </div>

        <Link
          href={`/own#${listing.slug}`}
          className="flex items-center justify-center gap-2 rounded-full bg-lagoon/10 border border-lagoon/30 px-5 py-2.5 text-sm font-semibold text-lagoon hover:bg-lagoon/20 transition-colors group"
        >
          View Details
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
