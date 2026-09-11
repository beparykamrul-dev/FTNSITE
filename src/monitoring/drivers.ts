import type { DeviceDriver } from "./types";

export const deviceDrivers: DeviceDriver[] = [
  { id: "mikrotik-routeros", vendor: "MikroTik", protocols: ["routeros", "snmp", "icmp"], metrics: ["cpu_percent", "memory_percent", "interfaces_rx_bps", "interfaces_tx_bps", "packet_loss", "latency_ms"] },
  { id: "generic-snmp", vendor: "Generic", protocols: ["snmp"], metrics: ["cpu_percent", "memory_percent", "interfaces_rx_bps", "interfaces_tx_bps", "if_errors", "if_discards", "uptime"] },
  { id: "epon-snmp", vendor: "EPON/OLT", protocols: ["snmp"], metrics: ["onu_online", "onu_offline", "optical_rx_dbm", "optical_tx_dbm", "pon_errors"] },
  { id: "icmp", vendor: "Generic", protocols: ["icmp"], metrics: ["latency_ms", "packet_loss"] },
];

export function getDriver(id: string) {
  return deviceDrivers.find((driver) => driver.id === id);
}
