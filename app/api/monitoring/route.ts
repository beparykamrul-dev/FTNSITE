import { NextResponse } from "next/server";
import { buildSummary } from "../../../lib/ftn-monitoring";

export async function GET() {
  // Collector backends can replace this source without changing the FTN UI contract.
  // The interface remains available even when SNMP/API collectors are disconnected.
  return NextResponse.json(buildSummary([], 0), { headers: { "Cache-Control": "no-store" } });
}
