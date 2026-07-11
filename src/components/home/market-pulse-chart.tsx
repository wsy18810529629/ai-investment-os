"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { marketPulse } from "@/data/home";

/**
 * The Dashboard uses one sentiment line for immediate understanding. Market
 * Intelligence can opt into liquidity comparison when the relationship matters.
 */
export function MarketPulseChart({ showLiquidity = true }: { showLiquidity?: boolean }) {
  return (
    <div className="hidden h-56 w-full sm:block lg:h-60">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={marketPulse} margin={{ top: 18, right: 8, bottom: 0, left: -24 }}>
          <defs>
            <linearGradient id="sentimentFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.26} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsl(var(--border) / 0.6)" strokeDasharray="2 6" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="label"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            domain={[40, 70]}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 6,
              color: "hsl(var(--foreground))",
              boxShadow: "0 12px 32px rgba(0,0,0,0.24)",
            }}
            formatter={(value, name) => [value, name === "sentiment" ? "市场情绪" : "流动性"]}
          />
          {showLiquidity ? (
            <Area
              dataKey="liquidity"
              fill="transparent"
              name="流动性"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1.5}
              type="monotone"
            />
          ) : null}
          <Area
            dataKey="sentiment"
            fill="url(#sentimentFill)"
            name="市场情绪"
            stroke="hsl(var(--primary))"
            strokeWidth={2.25}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
