import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    aiMonitoring: "ready",
    collectors: { snmp: "optional", api: "optional", icmp: "optional", metrics: "optional" },
    ui: "always-available",
    mode: "read-only",
    checkedAt: new Date().toISOString(),
  }, { headers: { "Cache-Control": "no-store" } });
}
