import type { FTNDevice } from "./ftn-device";

export type MonitoringSummary = {
  source: "live" | "last-known" | "unavailable";
  collectedAt: string;
  devices: FTNDevice[];
  totals: { all: number; online: number; offline: number; unknown: number };
  alerts: number;
  ai: { status: "ready" | "waiting"; findings: string[] };
};

export function buildSummary(devices: FTNDevice[], alerts = 0): MonitoringSummary {
  const online = devices.filter(d => d.state === "online").length;
  const offline = devices.filter(d => d.state === "offline").length;
  const unknown = devices.length - online - offline;
  const findings = devices.filter(d => d.state === "offline" || d.snmp === "offline" || d.api === "offline")
    .slice(0, 5).map(d => `${d.name}: ${d.state === "offline" ? "device unreachable" : "collector/API unavailable"}`);
  return {
    source: devices.some(d => d.state === "online") ? "live" : devices.length ? "last-known" : "unavailable",
    collectedAt: new Date().toISOString(), devices,
    totals: { all: devices.length, online, offline, unknown }, alerts,
    ai: { status: "ready", findings },
  };
}
