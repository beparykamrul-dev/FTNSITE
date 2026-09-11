import type { ExternalFinding } from "./provider-contract";

export async function netlasHostContext(target: string): Promise<ExternalFinding> {
  const key = process.env.NETLAS_API_KEY;
  if (!key) return { provider: "netlas", target, kind: "host", status: "not_configured", observedAt: new Date().toISOString(), data: {} };
  try {
    const res = await fetch(`https://app.netlas.io/api/host/${encodeURIComponent(target)}/`, { headers: { Authorization: `Bearer ${key}` }, cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    return { provider: "netlas", target, kind: "host", status: res.ok ? "available" : "error", observedAt: new Date().toISOString(), data };
  } catch (error) {
    return { provider: "netlas", target, kind: "host", status: "error", observedAt: new Date().toISOString(), data: { error: String(error) } };
  }
}
