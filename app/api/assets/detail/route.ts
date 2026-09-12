import { NextRequest, NextResponse } from "next/server";
import { censysHostContext } from "../../../../monitoring/external/censys-adapter";
import { netlasHostContext } from "../../../../monitoring/external/netlas-adapter";
import { globalpingMeasurement } from "../../../../monitoring/external/globalping-adapter";

function localSnapshot(target: string) {
  return { target, state: "unknown", snmp: "unknown", api: "unknown", icmp: "unknown", lastSeen: null, metrics: {}, interfaces: [], alerts: [], events: [] };
}

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("target")?.trim();
  const type = request.nextUrl.searchParams.get("type") || "ping";
  if (!target) return NextResponse.json({ error: "target is required" }, { status: 400 });

  const [censys, netlas, globalping] = await Promise.all([
    censysHostContext(target),
    netlasHostContext(target),
    globalpingMeasurement(target, type as "ping" | "http" | "dns" | "mtr" | "traceroute"),
  ]);

  const sources = { local: localSnapshot(target), censys, netlas, globalping };
  const available = Object.entries(sources).filter(([, value]) => value && ("status" in value ? value.status === "available" : value.state !== "unknown"));
  const diagnosis = available.length ? `Correlated ${available.length} available source(s) for ${target}.` : `No live FTN source is currently available for ${target}; UI remains usable.`;

  return NextResponse.json({ target, observedAt: new Date().toISOString(), sources, diagnosis, timeline: [], policy: { externalResultsAreContext: true, externalInventoryIsNotDeviceTruth: true, credentialsServerSideOnly: true } }, { headers: { "Cache-Control": "no-store" } });
}
