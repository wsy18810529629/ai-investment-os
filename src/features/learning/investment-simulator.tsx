"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarDays, CircleDollarSign, FlaskConical, RefreshCcw, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RiskDisclaimer } from "@/components/home/risk-disclaimer";
import { simulationAssets, simulationDates } from "./learning-data";

const SIMULATOR_KEY = "investment-os-paper-investing";
const SIMULATOR_EVENT = "investment-os-paper-investing-change";
const DEFAULT_SIMULATOR = JSON.stringify({ active: false, mode: "single", assetId: "growth-stock", amount: 1000, startedAt: "" });

type SimulationMode = "single" | "recurring";

type SimulatorState = {
  active: boolean;
  mode: SimulationMode;
  assetId: string;
  amount: number;
  startedAt: string;
};

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(SIMULATOR_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SIMULATOR_EVENT, callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(SIMULATOR_KEY) ?? DEFAULT_SIMULATOR;
}

function parseState(snapshot: string): SimulatorState {
  try {
    const state = JSON.parse(snapshot) as SimulatorState;
    if (typeof state.active !== "boolean") throw new Error("Invalid simulator state");
    const legacyState = state as SimulatorState & { dailyAmount?: number };
    return {
      active: state.active,
      mode: state.mode === "single" ? "single" : "recurring",
      assetId: state.assetId || "growth-stock",
      amount: typeof state.amount === "number" ? state.amount : legacyState.dailyAmount ?? 1000,
      startedAt: state.startedAt || "",
    };
  } catch {
    return JSON.parse(DEFAULT_SIMULATOR) as SimulatorState;
  }
}

function saveState(state: SimulatorState) {
  window.localStorage.setItem(SIMULATOR_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(SIMULATOR_EVENT));
}

function buildSimulation(assetId: string, amount: number, mode: SimulationMode) {
  const asset = simulationAssets.find((item) => item.id === assetId) ?? simulationAssets[0];
  let units = 0;

  return asset.prices.map((price, index) => {
    if (mode === "recurring" || index === 0) units += amount / price;
    const invested = mode === "recurring" ? amount * (index + 1) : amount;
    const value = units * price;
    return {
      date: simulationDates[index],
      invested,
      value,
      returnRate: ((value / invested) - 1) * 100,
    };
  });
}

/**
 * A paper-investing exercise teaches recurring investment through observable
 * outcomes. Prices are fixed mock data and the component never creates orders.
 */
export function InvestmentSimulator() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_SIMULATOR);
  const savedState = useMemo(() => parseState(snapshot), [snapshot]);
  const [draftMode, setDraftMode] = useState<SimulationMode>(savedState.mode);
  const [draftAssetId, setDraftAssetId] = useState(savedState.assetId);
  const [draftAmount, setDraftAmount] = useState(savedState.amount);

  const activeMode = savedState.active ? savedState.mode : draftMode;
  const activeAssetId = savedState.active ? savedState.assetId : draftAssetId;
  const activeAmount = savedState.active ? savedState.amount : draftAmount;
  const activeAsset = simulationAssets.find((item) => item.id === activeAssetId) ?? simulationAssets[0];
  const records = useMemo(() => buildSimulation(activeAssetId, activeAmount, activeMode), [activeAssetId, activeAmount, activeMode]);
  const latest = records[records.length - 1];
  const isPositive = latest.returnRate >= 0;

  function startSimulation() {
    const amount = Math.min(10000, Math.max(10, Math.round(draftAmount || 10)));
    setDraftAmount(amount);
    saveState({ active: true, mode: draftMode, assetId: draftAssetId, amount, startedAt: "2026-07-01" });
  }

  function resetSimulation() {
    saveState({ ...savedState, active: false });
  }

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-medium text-primary"><FlaskConical className="size-4" />动手实操 · Mock</p>
          <h3 className="mt-2 text-2xl font-semibold">纸上投资实验</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">选择投入方式和投资类别，用模拟行情观察市值、成本与收益率每天如何变化。</p>
        </div>
        {savedState.active ? <Button onClick={resetSimulation} size="sm" variant="ghost"><RefreshCcw className="size-4" />调整实验</Button> : null}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <Card>
          <CardContent className="p-5 lg:p-6">
            <p className="text-sm font-medium">1. 选择投入方式</p>
            <div className="mt-3 grid grid-cols-2 rounded-lg border border-border/75 bg-secondary/35 p-1">
              {[
                { id: "single" as const, label: "一次买入", hint: "买入后每日观察" },
                { id: "recurring" as const, label: "每日定投", hint: "每天投入同样金额" },
              ].map((mode) => (
                <button key={mode.id} type="button" disabled={savedState.active} onClick={() => setDraftMode(mode.id)} className={cn("min-h-14 rounded-md px-2 py-2 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", activeMode === mode.id ? "bg-card text-foreground shadow-calm-sm" : "text-muted-foreground hover:text-foreground")}>
                  <span className="block text-sm font-medium">{mode.label}</span><span className="mt-0.5 block text-[11px]">{mode.hint}</span>
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm font-medium">2. 选择投资类别</p>
            <div className="mt-3 grid gap-2">
              {simulationAssets.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  disabled={savedState.active}
                  onClick={() => setDraftAssetId(asset.id)}
                  className={cn("flex min-h-12 items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default", activeAssetId === asset.id ? "border-primary/35 bg-positive-soft/45" : "border-border/75 bg-card hover:bg-secondary/55")}
                >
                  <span><span className="block text-sm font-medium">{asset.name}</span><span className="mt-0.5 block text-xs text-muted-foreground">{asset.type}</span></span>
                  <Badge variant={asset.risk === "较低" ? "positive" : "warning"}>{asset.risk}风险</Badge>
                </button>
              ))}
            </div>

            <label className="mt-6 block text-sm font-medium" htmlFor="simulation-amount">3. {activeMode === "single" ? "模拟买入金额" : "每日模拟投入"}</label>
            <div className="mt-3 flex h-11 items-center rounded-lg border border-input bg-card px-3 focus-within:ring-2 focus-within:ring-ring">
              <span className="text-sm text-muted-foreground">¥</span>
              <input id="simulation-amount" min={10} max={10000} step={10} disabled={savedState.active} value={activeAmount} onChange={(event) => setDraftAmount(Number(event.target.value))} className="h-full min-w-0 flex-1 bg-transparent px-2 text-base font-semibold outline-none disabled:cursor-default" type="number" />
              <span className="text-xs text-muted-foreground">{activeMode === "single" ? "一次" : "每天"}</span>
            </div>

            {savedState.active ? (
              <div className="mt-5 rounded-lg border border-positive/20 bg-positive-soft/45 p-4" role="status">
                <p className="font-medium text-positive">实验记录中</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{activeMode === "single" ? "已完成一次模拟买入" : "正在模拟每日定投"}，累计记录 {records.length} 个观察日。</p>
              </div>
            ) : (
              <Button className="mt-5 w-full" onClick={startSimulation} variant="primary"><CircleDollarSign className="size-4" />开始纸上投资</Button>
            )}
          </CardContent>
        </Card>

        <Card className="soft-panel">
          <CardContent className="p-5 lg:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="text-xs text-muted-foreground">{activeAsset.name} · {activeMode === "single" ? "一次买入" : "每日定投"} · 10 个观察日</p><h4 className="mt-2 text-xl font-semibold">投入之后，收益不会直线上升</h4></div>
              <Badge variant="neutral">固定 Mock 行情</Badge>
            </div>

            <div className="mt-5 grid grid-cols-3 divide-x divide-border/75 border-y border-border/75 py-3">
              <Metric label="累计投入" value={`¥${latest.invested.toFixed(0)}`} />
              <Metric label="模拟市值" value={`¥${latest.value.toFixed(2)}`} />
              <Metric label="累计收益率" value={`${isPositive ? "+" : ""}${latest.returnRate.toFixed(2)}%`} tone={isPositive ? "positive" : "negative"} />
            </div>

            <div className="mt-4 h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={records} margin={{ top: 12, right: 8, bottom: 0, left: -18 }}>
                  <defs><linearGradient id="paperReturnFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.24} /><stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid stroke="hsl(var(--border) / 0.55)" strokeDasharray="2 6" vertical={false} />
                  <XAxis axisLine={false} dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} />
                  <YAxis axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={(value) => `${value}%`} tickLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} formatter={(value) => [`${Number(value).toFixed(2)}%`, "累计收益率"]} />
                  <Area dataKey="returnRate" fill="url(#paperReturnFill)" stroke="hsl(var(--primary))" strokeWidth={2.25} type="monotone" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid gap-2 border-t border-border/75 pt-4 sm:grid-cols-2">
              <p className="inline-flex items-start gap-2 text-sm leading-6"><TrendingUp className="mt-1 size-4 shrink-0 text-primary" />{activeMode === "single" ? "一次买入后，收益完全跟随买入价格之后的涨跌。" : "定投收益由多次买入成本共同决定，不等于区间涨幅。"}</p>
              <p className="inline-flex items-start gap-2 text-sm leading-6 text-muted-foreground"><CalendarDays className="mt-1 size-4 shrink-0" />{activeMode === "single" ? "买入时点会影响短期结果，因此不能用十天表现预测未来。" : "低价时会买到更多份额，但定投仍然不能消除亏损风险。"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-3 max-w-xl"><RiskDisclaimer compact /></div>
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: "positive" | "negative" }) {
  return <div className="px-3 first:pl-0 last:pr-0"><p className="text-xs text-muted-foreground">{label}</p><p className={cn("mt-1 text-lg font-semibold tabular-nums sm:text-xl", tone === "positive" && "text-positive", tone === "negative" && "text-negative")}>{value}</p></div>;
}
