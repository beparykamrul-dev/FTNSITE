export type DeviceProtocol = "snmp" | "routeros" | "netconf" | "rest" | "icmp" | "custom";
export type Severity = "info" | "warning" | "critical";

export interface DeviceMetric {
  deviceId: string;
  metric: string;
  value: number;
  unit?: string;
  timestamp: string;
  labels?: Record<string, string>;
}

export interface Device {
  id: string;
  name: string;
  vendor: string;
  model?: string;
  protocol: DeviceProtocol;
  address: string;
  enabled: boolean;
}

export interface DeviceDriver {
  id: string;
  vendor: string;
  models?: string[];
  protocols: DeviceProtocol[];
  metrics: string[];
}

export interface AlertRule {
  id: string;
  name: string;
  metric: string;
  operator: ">" | ">=" | "<" | "<=" | "==" | "!=";
  threshold: number;
  severity: Severity;
  enabled: boolean;
  channels: ("web" | "email" | "telegram" | "webhook")[];
}
