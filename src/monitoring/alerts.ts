import type { AlertRule } from "./types";

export function evaluateAlert(rule: AlertRule, value: number): boolean {
  switch (rule.operator) {
    case ">": return value > rule.threshold;
    case ">=": return value >= rule.threshold;
    case "<": return value < rule.threshold;
    case "<=": return value <= rule.threshold;
    case "==": return value === rule.threshold;
    case "!=": return value !== rule.threshold;
  }
}

export const defaultAlertRules: AlertRule[] = [
  { id: "cpu-high", name: "CPU high", metric: "cpu_percent", operator: ">=", threshold: 85, severity: "warning", enabled: true, channels: ["web"] },
  { id: "memory-critical", name: "Memory critical", metric: "memory_percent", operator: ">=", threshold: 90, severity: "critical", enabled: true, channels: ["web", "email"] },
  { id: "packet-loss", name: "Packet loss", metric: "packet_loss", operator: ">=", threshold: 5, severity: "critical", enabled: true, channels: ["web", "webhook"] },
  { id: "db-latency", name: "Database latency", metric: "db_latency_ms", operator: ">=", threshold: 100, severity: "warning", enabled: true, channels: ["web"] },
];
