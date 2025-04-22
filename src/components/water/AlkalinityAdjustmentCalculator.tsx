
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Droplet, Info, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const BUFFERS = [
  { label: "Calcium Carbonate (CaCO₃)", value: "CaCO3", factor: 1.0 },
  { label: "Sodium Bicarbonate (NaHCO₃)", value: "NaHCO3", factor: 1.68 },
  { label: "Calcium Hydroxide (Ca(OH)₂)", value: "CaOH2", factor: 0.74 },
  { label: "Calcium Oxide (CaO)", value: "CaO", factor: 0.56 }
];

const getAlkStatus = (alk: number) => {
  if (alk < 60) return { emoji: "🔴", label: "Critical", color: "#ea384c", msg: "Urgent adjustment required", text: "white" };
  if (alk < 80) return { emoji: "⚠️", label: "Low", color: "#FEF7CD", msg: "Recommended to adjust soon", text: "#ea384c" };
  if (alk <= 160) return { emoji: "✅", label: "Optimal", color: "#F2FCE2", msg: "No adjustment needed", text: "#166534" };
  if (alk > 200) return { emoji: "🟡", label: "High", color: "#fef08a", msg: "Risk of scaling, review necessity", text: "#92400e" };
  return { emoji: "", label: "", color: "#F2FCE2", msg: "", text: "#166534" };
};

const DEFAULT_TARGET = 120;

export default function AlkalinityAdjustmentCalculator() {
  const [pondVolume, setPondVolume] = React.useState<string>("");
  const [pondUnit, setPondUnit] = React.useState<"L" | "m3">("L");
  const [currentAlk, setCurrentAlk] = React.useState<string>("");
  const [targetAlk, setTargetAlk] = React.useState<string>(String(DEFAULT_TARGET));
  const [bufferType, setBufferType] = React.useState(BUFFERS[0].value);

  const volumeL = pondUnit === "L"
    ? parseFloat(pondVolume.replace(/,/g, "")) || 0
    : (parseFloat(pondVolume.replace(/,/g, "")) || 0) * 1000;

  const volumeM3 = volumeL / 1000;

  const current = parseFloat(currentAlk) || 0;
  const target = parseFloat(targetAlk) || 0;
  const alkDelta = Math.max(target - current, 0);

  const bufferFactor = BUFFERS.find(b => b.value === bufferType)?.factor || 1.0;
  const gramsNeeded = volumeM3 * alkDelta * bufferFactor;
  const displayAmount =
    gramsNeeded >= 1000
      ? `${(gramsNeeded / 1000).toFixed(2)} kg`
      : `${Math.round(gramsNeeded)} g`;

  const currentStatus = getAlkStatus(current);
  const targetStatus = getAlkStatus(target);

  const valid =
    volumeL > 0 &&
    current >= 0 &&
    target >= 0 &&
    current <= 200 &&
    target <= 260 &&
    pondVolume !== "" &&
    bufferType;

  const isMinor = alkDelta < 20 && alkDelta > 0;
  const showCritical = current < 60 && currentAlk.trim() !== "";
  const showWarnTarget = target > 200;
  const showNoAdj = alkDelta <= 0;
  
  // Determine if we should show the status box at all
  const hasCurrentAlk = currentAlk.trim() !== "";

  return (
    <Card className="border-2 border-vismar-green/20">
      <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
        <div className="flex items-center mb-2">
          <Droplet className="h-6 w-6 text-vismar-green mr-2" />
          <CardTitle className="text-lg font-bold text-vismar-blue">Alkalinity Adjustment Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate how much alkalinity buffer to add for stable water quality in shrimp ponds.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex gap-2 items-end">
              <label className="font-medium text-sm mb-1">Pond Volume</label>
              <select
                className="ml-2 border rounded px-2 py-1 bg-gray-50"
                value={pondUnit}
                onChange={e => setPondUnit(e.target.value as "L" | "m3")}
              >
                <option value="L">Liters</option>
                <option value="m3">m³</option>
              </select>
            </div>
            <Input
              placeholder={`Enter pond volume in ${pondUnit}`}
              value={pondVolume}
              onChange={e => setPondVolume(e.target.value.replace(/[^0-9.,]/g, ""))}
              inputMode="decimal"
              min={0}
              className="mt-1"
            />
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <label className="font-medium text-sm mb-1">Current Alkalinity (mg/L as CaCO₃)</label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-vismar-blue" />
                </TooltipTrigger>
                <TooltipContent>
                  <span>
                    <b>What is alkalinity?</b>
                    <br />
                    Alkalinity buffers pH and supports biofloc/nitrification.<br />
                    Optimal: 100–160 mg/L for vannamei shrimp.
                  </span>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              placeholder="0–200"
              value={currentAlk}
              onChange={e => setCurrentAlk(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              min={0}
              max={200}
              className="mt-1"
            />
          </div>
          <div>
            <div className="flex gap-1 items-center mt-2 md:mt-0">
              <label className="font-medium text-sm mb-1">Target Alkalinity (mg/L as CaCO₃)</label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-vismar-blue" />
                </TooltipTrigger>
                <TooltipContent>
                  <span>
                    Recommended target is 120 mg/L.
                    <br />
                    Safe range: 100–160 mg/L
                  </span>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              placeholder="100–160"
              value={targetAlk}
              onChange={e => setTargetAlk(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              min={0}
              max={260}
              className="mt-1"
            />
          </div>
          <div>
            <div className="flex gap-1 items-center mt-2 md:mt-0">
              <label className="font-medium text-sm mb-1">Buffer Compound</label>
            </div>
            <Select value={bufferType} onValueChange={setBufferType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white">
                {BUFFERS.map(b => (
                  <SelectItem value={b.value} key={b.value}>{b.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasCurrentAlk && (
          <div>
            <div
              className="rounded p-4 mb-4"
              style={{
                background: currentStatus.color,
                color: currentStatus.text,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                {currentStatus.emoji && <span>{currentStatus.emoji}</span>}
                <span className="font-semibold">
                  Current Alkalinity: {currentAlk || "—"} mg/L ({currentStatus.label})
                </span>
              </div>
              <div className="ml-6 text-sm">{currentStatus.msg}</div>
            </div>
          </div>
        )}

        {valid && !showNoAdj && (
          <Card className="mt-1 border-2 border-vismar-green/60 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
            <CardContent className="p-4">
              <div className="font-semibold mb-2 text-vismar-blue">
                Total {BUFFERS.find(b=>b.value===bufferType)?.label}
              </div>
              <div className="text-2xl font-bold text-vismar-blue mb-1">
                {isNaN(gramsNeeded) ? "–" : displayAmount}
              </div>
              <div className="text-sm text-gray-700">
                To increase alkalinity from {currentAlk} → {targetAlk} mg/L in {volumeL.toLocaleString()} L ({volumeM3.toFixed(2)} m³)
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Apply gradually over 2–3 days to avoid pH shock.
              </div>
              {isMinor && (
                <div className="mt-2 text-yellow-700 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Adjustment may be minor – test again in 24 hrs
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {valid && showNoAdj && (
          <Alert variant="default" className="border border-green-400 bg-green-50 mt-3">
            <AlertTitle className="font-bold">No Adjustment Needed</AlertTitle>
            <AlertDescription>
              Target is less than or equal to current alkalinity. No buffer dose needed.
            </AlertDescription>
          </Alert>
        )}

        {valid && showCritical && (
          <Alert variant="destructive" className="mt-3">
            <AlertTitle>Critical Alkalinity!</AlertTitle>
            <AlertDescription>
              Alkalinity is dangerously low (&lt; 60 mg/L). Urgent adjustment required.
            </AlertDescription>
          </Alert>
        )}

        {valid && showWarnTarget && (
          <Alert variant="destructive" className="mt-3">
            <AlertTitle>Warning: Target Exceeds Safe Range</AlertTitle>
            <AlertDescription>
              Target alkalinity is above recommended safe level. Risk of scaling or pH imbalance. Confirm the need before dosing.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
