export type DeviceKind = "router" | "switch" | "olt" | "onu" | "server" | "firewall" | "ap" | "generic";
export type Connectivity = "online" | "offline" | "unknown";

export type FTNDevice = {
  id: string;
  name: string;
  address: string;
  kind: DeviceKind;
  driver: string;
  snmp: Connectivity;
  api: Connectivity;
  icmp: Connectivity;
  state: Connectivity;
  lastSeen: string | null;
  metrics: Record<string, number | string | null>;
  capabilities: string[];
};

export const defaultCapabilities = [
  "overview", "health", "interfaces", "traffic", "latency", "packet-loss",
  "errors", "processes", "resources", "logs", "events", "alerts", "configuration",
];

export function normalizeDevice(input: Partial<FTNDevice>): FTNDevice {
  return {
    id: input.id ?? crypto.randomUUID(),
    name: input.name ?? "Unnamed device",
    address: input.address ?? "unknown",
    kind: input.kind ?? "generic",
    driver: input.driver ?? "generic-snmp",
    snmp: input.snmp ?? "unknown",
    api: input.api ?? "unknown",
    icmp: input.icmp ?? "unknown",
    state: input.state ?? "unknown",
    lastSeen: input.lastSeen ?? null,
    metrics: input.metrics ?? {},
    capabilities: input.capabilities ?? defaultCapabilities,
  };
}
