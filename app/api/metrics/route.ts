import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    source: "ftn-metrics",
    timestamp: new Date().toISOString(),
    metrics: {
      cpu_percent: null,
      memory_percent: null,
      rx_mbps: null,
      tx_mbps: null,
      latency_ms: null,
      packet_loss_percent: null,
      interface_errors: null,
      devices_online: null,
      alerts_active: null,
    },
    note: "Connect the FTN collector/Prometheus endpoint here; browser never receives SNMP credentials."
  });
}
