import { NextResponse } from "next/server";

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return NextResponse.json({
    deviceId: id,
    checks: {
      icmp: "not-configured",
      snmp: "not-configured",
      api: "not-configured",
    },
    message: "Test adapter endpoint ready; connect a server-side collector to execute probes.",
    testedAt: new Date().toISOString(),
  });
}
