"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { COMPARISON } from "@/lib/data";

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-glass-border">
            <th className="py-4 pr-4 text-sm font-medium text-foreground/50 w-1/3">Feature</th>
            <th className="py-4 px-4 text-sm font-medium text-red-400/80 w-1/3">
              🏜️ Dirt Lot Scheme
            </th>
            <th className="py-4 pl-4 text-sm font-medium text-lagoon w-1/3">
              🌊 Overwater Magic Share
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row, i) => (
            <motion.tr
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-glass-border/50"
            >
              <td className="py-4 pr-4 text-sm font-medium">{row.feature}</td>
              <td className="py-4 px-4 text-sm text-foreground/50">
                <span className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  {row.dirtLot}
                </span>
              </td>
              <td className="py-4 pl-4 text-sm text-foreground/90">
                <span className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-reef mt-0.5 shrink-0" />
                  {row.overwater}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
