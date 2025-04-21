
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Collapsible } from "@radix-ui/react-collapsible";
import { AlertTriangle, CircleAlert, Droplet } from "lucide-react";

type AmmoniaStatus = "safe" | "caution" | "danger";
type NitrateStatus = "acceptable" | "moderate" | "excessive";

function getAmmoniaStatus(tan: number): {status: AmmoniaStatus; color: string; emoji: string; action: string;} {
  if (tan <= 0.5) return { status: "safe", color: "#F2FCE2", emoji: "✅", action: "No action needed" };
  if (tan <= 1.0) return { status: "caution", color: "#FEF7CD", emoji: "⚠️", action: "Recommend 10–20% water exchange" };
  return { status: "danger", color: "#ea384c", emoji: "🚨", action: "Recommend 30–50% water exchange + carbon source/biofloc control" };
}
function getNitrateStatus(no3: number): {status: NitrateStatus; color: string; emoji: string; action: string;} {
  if (no3 < 50) return { status: "acceptable", color: "#F2FCE2", emoji: "✅", action: "No action" };
  if (no3 <= 100) return { status: "moderate", color: "#FEF7CD", emoji: "⚠️", action: "Increase water exchange" };
  return { status: "excessive", color: "#ea384c", emoji: "🚨", action: "Consider >30% exchange, manage feeding" };
}

const round = (num: number, decimals = 1) => Math.round(num * 10 ** decimals) / 10;

const WaterExchangeCalculator: React.FC = () => {
  // State
  const [pondVolume, setPondVolume] = React.useState("");
  const [pondVolumeUnit, setPondVolumeUnit] = React.useState<"L"|"m3">("L");
  const [tan, setTan] = React.useState("");
  const [no3, setNo3] = React.useState("");
  const [percentExchange, setPercentExchange] = React.useState(10);

  // Derived/calculated values
  let volumeLiters = 0;
  if (pondVolume) {
    const v = parseFloat(pondVolume.replace(/,/g, ""));
    volumeLiters = isNaN(v) ? 0 : pondVolumeUnit === "L" ? v : v * 1000;
  }
  const safeTan = Number(tan) > 0 ? Number(tan) : 0;
  const safeNo3 = Number(no3) > 0 ? Number(no3) : 0;
  const exchangeVol = volumeLiters * (percentExchange / 100);

  // Handling units for display
  const m3 = exchangeVol >= 1000 ? round(exchangeVol / 1000) : undefined;

  // Thresholds & status
  const ammonia = getAmmoniaStatus(safeTan);
  const nitrate = getNitrateStatus(safeNo3);

  // Basic validation
  const isTanValid = safeTan >= 0.01 && safeTan <= 10;
  const isNo3Valid = safeNo3 >= 0.1 && safeNo3 <= 500;
  const canCalc = !!(volumeLiters && isTanValid && isNo3Valid);

  // Advanced tips
  const [showTips, setShowTips] = React.useState(false);

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
        <div className="flex items-center mb-2">
          <Droplet className="h-6 w-6 text-vismar-green mr-2" />
          <CardTitle className="text-lg font-bold text-vismar-blue">Water Exchange Calculator</CardTitle>
        </div>
        <CardDescription>
          Estimate daily water volume to exchange based on ammonia and nitrate.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex gap-2 items-end">
              <label className="font-medium text-sm mb-1">Pond Volume</label>
              <select
                className="ml-2 border rounded px-2 py-1 bg-gray-50"
                value={pondVolumeUnit}
                onChange={e => setPondVolumeUnit(e.target.value as "L" | "m3")}
              >
                <option value="L">Liters</option>
                <option value="m3">m³</option>
              </select>
            </div>
            <Input
              placeholder={`Enter pond volume in ${pondVolumeUnit}`}
              value={pondVolume}
              onChange={e => setPondVolume(e.target.value.replace(/[^0-9.,]/g, ""))}
              inputMode="decimal"
              min={0}
              className="mt-1"
            />
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <label className="font-medium text-sm mb-1">Ammonia (TAN, ppm)</label>
              <Tooltip>
                <TooltipTrigger>
                  <CircleAlert className="h-4 w-4 text-vismar-blue" />
                </TooltipTrigger>
                <TooltipContent>
                  <span>
                    <b>Total Ammonia Nitrogen (TAN)</b><br />
                    High TAN levels are harmful to shrimp. 
                    Safe range: 0–0.5 ppm.
                  </span>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              placeholder="0.01–10"
              value={tan}
              onChange={e => setTan(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              min={0.01}
              max={10}
              className="mt-1"
            />
          </div>
          <div>
            <div className="flex gap-1 items-center mt-2 md:mt-0">
              <label className="font-medium text-sm mb-1">Nitrate (NO₃⁻, ppm)</label>
              <Tooltip>
                <TooltipTrigger>
                  <CircleAlert className="h-4 w-4 text-vismar-blue" />
                </TooltipTrigger>
                <TooltipContent>
                  <span>
                    High nitrate can stress shrimp and promote algae blooms.<br />
                    Safe: {"<"}50 ppm
                  </span>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              placeholder="0.1–500"
              value={no3}
              onChange={e => setNo3(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              min={0.1}
              max={500}
              className="mt-1"
            />
          </div>
          <div>
            <div className="flex gap-2 items-center mt-2 md:mt-0">
              <label className="font-medium text-sm mb-1">Target % Exchange</label>
              <Tooltip>
                <TooltipTrigger>
                  <CircleAlert className="h-4 w-4 text-vismar-blue" />
                </TooltipTrigger>
                <TooltipContent>
                  <span>Recommended: 10–20% (caution); 30–50% (high TAN/nitrate)</span>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Input
                type="number"
                min={1}
                max={100}
                step={1}
                value={percentExchange}
                onChange={e => setPercentExchange(Math.max(1, Math.min(100, Number(e.target.value) || 0)))}
                className="w-20"
              />
              <Slider
                min={1}
                max={100}
                step={1}
                value={[percentExchange]}
                onValueChange={([v]) => setPercentExchange(v)}
                className="w-full md:w-40"
              />
              <span className="ml-2">{percentExchange}%</span>
            </div>
          </div>
        </div>

        {/* Results and Alerts */}
        {canCalc && (
          <div className="space-y-3">
            <div
              className="rounded p-4"
              style={{
                background: ammonia.status === "danger"
                  ? "#ea384c" // Red
                  : ammonia.status === "caution"
                  ? "#FEF7CD" // Yellow
                  : "#F2FCE2", // Green
                color: ammonia.status === "danger" ? "white" : "inherit",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                {ammonia.status === "danger" ? (
                  <AlertTriangle className="text-white" />
                ) : ammonia.status === "caution" ? (
                  <AlertTriangle className="text-yellow-600" />
                ) : (
                  <Droplet className="text-green-600" />
                )}
                <span className="font-semibold">
                  {ammonia.emoji} Ammonia (TAN): {safeTan} ppm
                </span>
              </div>
              <div className="ml-7">
                Status:&nbsp;
                <span className="font-bold">
                  {ammonia.status === "safe" && <span>Safe</span>}
                  {ammonia.status === "caution" && <span>Caution</span>}
                  {ammonia.status === "danger" && <span>Dangerous!</span>}
                </span>
                <div>
                  <b>Action:</b> {ammonia.action}
                </div>
              </div>
            </div>
            <div
              className="rounded p-4"
              style={{
                background: nitrate.status === "excessive"
                  ? "#ea384c"
                  : nitrate.status === "moderate"
                  ? "#FEF7CD"
                  : "#F2FCE2",
                color: nitrate.status === "excessive" ? "white" : "inherit",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                {nitrate.status === "excessive" ? (
                  <AlertTriangle className="text-white" />
                ) : nitrate.status === "moderate" ? (
                  <AlertTriangle className="text-yellow-600" />
                ) : (
                  <Droplet className="text-green-600" />
                )}
                <span className="font-semibold">
                  {nitrate.emoji} Nitrate (NO₃⁻): {safeNo3} ppm
                </span>
              </div>
              <div className="ml-7">
                Status:&nbsp;
                <span className="font-bold">
                  {nitrate.status === "acceptable" && <span>Acceptable</span>}
                  {nitrate.status === "moderate" && <span>Moderate</span>}
                  {nitrate.status === "excessive" && <span>Excessive!</span>}
                </span>
                <div>
                  <b>Action:</b> {nitrate.action}
                </div>
              </div>
            </div>

            {/* Output water volume recommendation */}
            <Card className="mt-3 border-2 border-vismar-green/60 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
              <CardContent className="p-4">
                <div className="font-semibold mb-2 text-vismar-blue">
                  Recommended Water Volume to Exchange
                </div>
                <div className="text-2xl font-bold text-vismar-blue">
                  {exchangeVol.toLocaleString()} L
                  {m3 !== undefined && (
                    <span className="text-lg font-medium ml-2">({m3} m³)</span>
                  )}
                </div>
                <div className="mt-2">
                  <span>
                    Exchange <b>{percentExchange}%</b> of your pond ({volumeLiters.toLocaleString()} L total) to maintain safe water quality.<br />
                    {ammonia.status === "danger"
                      ? "This high TAN requires immediate action. A higher exchange percentage is strongly recommended, and carbon dosing may also help biofloc systems."
                      : ammonia.status === "caution"
                        ? "Moderate TAN detected. Consider a 10–20% water change."
                        : "TAN is in a safe range. Maintain regular partial water exchange for best results."
                    }
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  For biofloc systems, consider adjusting C:N ratio before exchanging large volumes.
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error/validation */}
        {(!!tan && !isTanValid) && (
          <Alert variant="destructive">
            <AlertTitle>Invalid Ammonia Input</AlertTitle>
            <AlertDescription>
              Please enter a TAN value between 0.01 and 10 ppm.
            </AlertDescription>
          </Alert>
        )}
        {(!!no3 && !isNo3Valid) && (
          <Alert variant="destructive">
            <AlertTitle>Invalid Nitrate Input</AlertTitle>
            <AlertDescription>
              Please enter a Nitrate (NO₃⁻) value between 0.1 and 500 ppm.
            </AlertDescription>
          </Alert>
        )}

        {/* Advanced Tips */}
        <div>
          <Button
            variant="ghost"
            onClick={() => setShowTips((v) => !v)}
            className="underline text-sm"
            type="button"
          >
            {showTips ? "Hide" : "Show"} Advanced Tips
          </Button>
          <Collapsible open={showTips}>
            <div className="mt-3 text-gray-700 text-sm space-y-2">
              <div><b>Tips for Best Practice:</b></div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Test TAN and NO₃⁻ regularly to detect problems early.</li>
                <li>Use <b>carbon dosing</b> (molasses, sugar) in biofloc systems for high TAN.</li>
                <li>Never change more than 50% of water at once to avoid shrimp shock.</li>
                <li>For RAS systems, monitor solids and biofilters closely during large water changes.</li>
                <li>Keep logs of nitrate & ammonia trends for each pond.</li>
              </ul>
            </div>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterExchangeCalculator;
