export type ExternalProviderId = "censys" | "netlas" | "globalping";

export type ExternalFinding = {
  provider: ExternalProviderId;
  target: string;
  kind: string;
  status: "available" | "unavailable" | "error" | "not_configured";
  observedAt: string;
  data: Record<string, unknown>;
};

export type ProviderHealth = {
  provider: ExternalProviderId;
  configured: boolean;
  reachable: boolean;
  lastCheck?: string;
  error?: string;
};

export const externalProviders: Record<ExternalProviderId, { name: string; capabilities: string[] }> = {
  censys: { name: "Censys", capabilities: ["host", "web_property", "certificate", "internet_asset_context"] },
  netlas: { name: "Netlas", capabilities: ["host", "responses", "domains", "whois", "certificates", "attack_surface_context"] },
  globalping: { name: "Globalping", capabilities: ["ping", "http", "dns", "mtr", "traceroute", "global_latency"] },
};
