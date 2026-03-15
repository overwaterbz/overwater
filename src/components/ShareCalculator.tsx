"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Home, DollarSign } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { Listing } from "@/lib/data";

interface Props {
  listing: Listing;
}

export function ShareCalculator({ listing }: Props) {
  const [shares, setShares] = useState(1);

  const pricePerShare = listing.fullPrice / listing.totalShares;
  const totalCost = pricePerShare * shares;
  const monthlyPayment = listing.monthlyPayment * shares;
  const downPayment = listing.downPayment * shares;
  const incomeMin = listing.netIncomeMin * shares;
  const incomeMax = listing.netIncomeMax * shares;
  const weeksPerYear = Math.round((shares / listing.totalShares) * 52);

  return (
    <div className="glass-card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-5 w-5 text-maya" />
        <h3 className="text-lg font-semibold">Share Calculator</h3>
      </div>

      {/* Share slider */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-foreground/60">Shares</span>
          <span className="text-maya font-semibold">{shares} of {listing.totalShares}</span>
        </div>
        <input
          type="range"
          min={1}
          max={listing.sharesAvailable}
          value={shares}
          onChange={(e) => {
            const val = Number(e.target.value);
            setShares(val);
            trackEvent({ event: "calculator_change", properties: { listing: listing.id, shares: val } });
          }}
          className="w-full accent-maya h-2 rounded-full cursor-pointer"
        />
        <div className="flex justify-between text-xs text-foreground/40 mt-1">
          <span>1 share</span>
          <span>{listing.sharesAvailable} available</span>
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          key={`cost-${shares}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-xl bg-ocean-mid/50 p-4"
        >
          <DollarSign className="h-4 w-4 text-lagoon mb-1" />
          <p className="text-xs text-foreground/50">Total Investment</p>
          <p className="text-xl font-bold text-lagoon">${totalCost.toLocaleString()}</p>
        </motion.div>

        <motion.div
          key={`monthly-${shares}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-xl bg-ocean-mid/50 p-4"
        >
          <DollarSign className="h-4 w-4 text-maya mb-1" />
          <p className="text-xs text-foreground/50">Monthly (0% interest)</p>
          <p className="text-xl font-bold text-maya">${monthlyPayment.toLocaleString()}/mo</p>
        </motion.div>

        <motion.div
          key={`income-${shares}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-xl bg-ocean-mid/50 p-4"
        >
          <TrendingUp className="h-4 w-4 text-reef mb-1" />
          <p className="text-xs text-foreground/50">Annual Rental Income</p>
          <p className="text-xl font-bold text-reef">
            ${incomeMin.toLocaleString()}–${incomeMax.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          key={`weeks-${shares}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-xl bg-ocean-mid/50 p-4"
        >
          <Home className="h-4 w-4 text-coral mb-1" />
          <p className="text-xs text-foreground/50">Personal Use</p>
          <p className="text-xl font-bold text-coral">{weeksPerYear} weeks/year</p>
        </motion.div>
      </div>

      {/* Down payment note */}
      <div className="mt-6 rounded-lg bg-maya/10 border border-maya/20 p-4 text-center">
        <p className="text-sm text-maya">
          Start with just <span className="font-bold">${downPayment.toLocaleString()}</span> down
        </p>
        <p className="text-xs text-foreground/50 mt-1">0% interest • Belize IBC ownership deed • Rental income from day one</p>
      </div>
    </div>
  );
}
