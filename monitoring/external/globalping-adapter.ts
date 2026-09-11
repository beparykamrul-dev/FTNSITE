import type { ExternalFinding } from "./provider-contract";

export async function globalpingMeasurement(target: string, type: "ping" | "http" | "dns" | "mtr" | "traceroute" = "ping", locations: Array<Record<string, unknown>> = [{ magic: "world" }]): Promise<ExternalFinding> {
  const token = process.env.GLOBALPING_API_TOKEN;
  try {
    const headers: Record<string, string> = { "content-type": "application/json" };
    if (token) headers.authorization = `Bearer ${token}`;
    const created = await fetch("https://api.globalping.io/v1/measurements", { method: "POST", headers, body: JSON.stringify({ target, type, locations }), cache: "no-store" });
    const data = await created.json().catch(() => ({}));
    return { provider: "globalping", target, kind: type, status: created.ok ? "available" : "error", observedAt: new Date().toISOString(), data };
  } catch (error) {
    return { provider: "globalping", target, kind: type, status: "error", observedAt: new Date().toISOString(), data: { error: String(error) } };
  }
}
