import type { ExternalFinding } from "./provider-contract";

export async function censysHostContext(target: string): Promise<ExternalFinding> {
  const token = process.env.CENSYS_API_TOKEN;
  if (!token) return { provider: "censys", target, kind: "host", status: "not_configured", observedAt: new Date().toISOString(), data: {} };
  try {
    const res = await fetch(`https://api.platform.censys.io/v3/global/asset/host/${encodeURIComponent(target)}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    return { provider: "censys", target, kind: "host", status: res.ok ? "available" : "error", observedAt: new Date().toISOString(), data };
  } catch (error) {
    return { provider: "censys", target, kind: "host", status: "error", observedAt: new Date().toISOString(), data: { error: String(error) } };
  }
}
