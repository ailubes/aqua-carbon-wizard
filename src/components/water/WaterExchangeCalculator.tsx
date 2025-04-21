
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { CollapsibleContent, CollapsibleTrigger, Collapsible } from "@/components/ui/collapsible";
import { AlertTriangle, CircleAlert, Droplet } from "lucide-react";

// Define the safe threshold constants
const SAFE_TAN_THRESHOLD = 0.5; // ppm
const SAFE_NITRATE_THRESHOLD = 50; // ppm

type AmmoniaStatus = "safe" | "caution" | "danger";
type NitrateStatus = "acceptable" | "moderate" | "excessive";

function getAmmoniaStatus(tan: number): {status: AmmoniaStatus; color: string; emoji: string; action: string;} {
  if (tan <= SAFE_TAN_THRESHOLD) return { status: "safe", color: "#F2FCE2", emoji: "✅", action: "No action needed" };
  if (tan <= 1.0) return { status: "caution", color: "#FEF7CD", emoji: "⚠️", action: "Water exchange required" };
  return { status: "danger", color: "#ea384c", emoji: "🚨", action: "Immediate water exchange + carbon source/biofloc control" };
}

function getNitrateStatus(no3: number): {status: NitrateStatus; color: string; emoji: string; action: string;} {
  if (no3 < SAFE_NITRATE_THRESHOLD) return { status: "acceptable", color: "#F2FCE2", emoji: "✅", action: "No action" };
  if (no3 <= 100) return { status: "moderate", color: "#FEF7CD", emoji: "⚠️", action: "Water exchange required" };
  return { status: "excessive", color: "#ea384c", emoji: "🚨", action: "Immediate water exchange, manage feeding" };
}

const round = (num: number, decimals = 1) => Math.round(num * 10 ** decimals) / 10 ** decimals;

const WaterExchangeCalculator: React.FC = () => {
  // State
  const [pondVolume, setPondVolume] = React.useState("");
  const [pondVolumeUnit, setPondVolumeUnit] = React.useState<"L"|"m3">("L");
  const [tan, setTan] = React.useState("");
  const [no3, setNo3] = React.useState("");
  const [showTips, setShowTips] = React.useState(false);

  // Derived/calculated values
  let volumeLiters = 0;
  if (pondVolume) {
    const v = parseFloat(pondVolume.replace(/,/g, ""));
    volumeLiters = isNaN(v) ? 0 : pondVolumeUnit === "L" ? v : v * 1000;
  }
  const safeTan = Number(tan) > 0 ? Number(tan) : 0;
  const safeNo3 = Number(no3) > 0 ? Number(no3) : 0;

  // Basic validation
  const isTanValid = safeTan >= 0.01 && safeTan <= 10;
  const isNo3Valid = safeNo3 >= 0.1 && safeNo3 <= 500;
  const canCalc = !!(volumeLiters && isTanValid && isNo3Valid);

  // Calculate percentage exchange required
  const calculateExchangePercent = (current: number, target: number): number => {
    if (current <= target) return 0;
    let percent = ((current - target) / current) * 100;
    
    // Cap at 100% maximum
    if (percent > 100) percent = 100;
    
    // Minimum 1% for practical advice
    if (percent > 0 && percent < 1) percent = 1;
    
    return Math.ceil(percent); // Round up to nearest percent
  };
  
  const tanExchangePercent = calculateExchangePercent(safeTan, SAFE_TAN_THRESHOLD);
  const nitrateExchangePercent = calculateExchangePercent(safeNo3, SAFE_NITRATE_THRESHOLD);
  
  // Use the higher percentage as recommendation
  const recommendedExchangePercent = Math.max(tanExchangePercent, nitrateExchangePercent);
  
  // Calculate volume to exchange
  const exchangeVolume = volumeLiters * (recommendedExchangePercent / 100);
  
  // Handling units for display
  const m3 = exchangeVolume >= 1000 ? round(exchangeVolume / 1000) : undefined;

  // Thresholds & status
  const ammonia = getAmmoniaStatus(safeTan);
  const nitrate = getNitrateStatus(safeNo3);

  return (
    <Card className="border-2 border-vismar-green/20">
      <CardHeader className="bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
        <div className="flex items-center mb-2">
          <Droplet className="h-6 w-6 text-vismar-green mr-2" />
          <CardTitle className="text-lg font-bold text-vismar-blue">Water Exchange Calculator (Auto Mode)</CardTitle>
        </div>
        <CardDescription>
          Calculates minimum water exchange needed to reach safe ammonia and nitrate levels
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
                    Safe threshold: {SAFE_TAN_THRESHOLD} ppm.
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
                    Safe threshold: {SAFE_NITRATE_THRESHOLD} ppm
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
                  <b>Required exchange:</b> {tanExchangePercent}% 
                  {tanExchangePercent === 0 && " (no exchange needed)"}
                  {tanExchangePercent > 0 && (
                    <span> to reach safe level of {SAFE_TAN_THRESHOLD} ppm</span>
                  )}
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
                  <b>Required exchange:</b> {nitrateExchangePercent}%
                  {nitrateExchangePercent === 0 && " (no exchange needed)"}
                  {nitrateExchangePercent > 0 && (
                    <span> to reach safe level of {SAFE_NITRATE_THRESHOLD} ppm</span>
                  )}
                </div>
              </div>
            </div>

            {/* Output water volume recommendation */}
            {recommendedExchangePercent > 0 && (
              <Card className="mt-3 border-2 border-vismar-green/60 bg-gradient-to-r from-vismar-green/10 to-vismar-blue/10">
                <CardContent className="p-4">
                  <div className="font-semibold mb-2 text-vismar-blue">
                    Water Exchange Recommendation
                  </div>
                  <div className="mb-2">
                    <span className="text-sm">
                      Based on current water quality:
                      <br />
                      • {tanExchangePercent}% exchange needed for TAN
                      <br />
                      • {nitrateExchangePercent}% exchange needed for Nitrate
                    </span>
                  </div>
                  <div className="text-xl font-bold text-vismar-blue">
                    Recommended: {recommendedExchangePercent}% water exchange
                  </div>
                  <div className="text-lg font-bold text-vismar-blue mt-1">
                    {exchangeVolume.toLocaleString()} L
                    {m3 !== undefined && (
                      <span className="text-base font-medium ml-2">({m3} m³)</span>
                    )}
                  </div>
                  {recommendedExchangePercent >= 30 && (
                    <Alert variant="destructive" className="mt-3 py-2">
                      <AlertTitle className="text-sm">High Exchange Warning!</AlertTitle>
                      <AlertDescription className="text-xs">
                        Consider splitting this into multiple smaller exchanges to prevent shocking shrimp.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}

            {recommendedExchangePercent === 0 && (
              <Card className="mt-3 border-2 border-green-600/40 bg-green-50">
                <CardContent className="p-4">
                  <div className="font-semibold mb-2 text-vismar-blue">
                    Water Quality Status
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    No water exchange required at this time
                  </div>
                  <div className="text-sm mt-1">
                    Both TAN and Nitrate levels are below their safe thresholds.
                    Continue regular monitoring.
                  </div>
                </CardContent>
              </Card>
            )}
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
            <CollapsibleContent>
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
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterExchangeCalculator;
