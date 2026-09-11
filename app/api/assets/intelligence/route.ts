import { NextRequest, NextResponse } from "next/server";
import { censysHostContext } from "../../../../monitoring/external/censys-adapter";
import { netlasHostContext } from "../../../../monitoring/external/netlas-adapter";
import { globalpingMeasurement } from "../../../../monitoring/external/globalping-adapter";

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("target")?.trim();
  if (!target) return NextResponse.json({ error: "target is required" }, { status: 400 });

  const type = request.nextUrl.searchParams.get("type") || "ping";
  const [censys, netlas, globalping] = await Promise.all([
    censysHostContext(target),
    netlasHostContext(target),
    globalpingMeasurement(target, type),
  ]);

  return NextResponse.json({
    target,
    observedAt: new Date().toISOString(),
    sources: { censys, netlas, globalping },
    policy: { externalResultsAreContext: true, externalInventoryIsNotDeviceTruth: true },
  }, { headers: { "Cache-Control": "no-store" } });
}
