export type DeviceDriver = {
  id: string;
  name: string;
  protocols: string[];
  metrics: string[];
};

export const drivers: DeviceDriver[] = [
  { id: "mikrotik", name: "MikroTik", protocols: ["SNMP", "RouterOS"], metrics: ["cpu", "memory", "interfaces", "traffic"] },
  { id: "olt", name: "EPON/OLT", protocols: ["SNMP", "ICMP"], metrics: ["interfaces", "onu", "traffic", "errors"] },
  { id: "generic-snmp", name: "Generic SNMP", protocols: ["SNMPv2c", "SNMPv3"], metrics: ["system", "interfaces"] },
  { id: "icmp", name: "ICMP", protocols: ["ICMP"], metrics: ["availability", "latency", "packet_loss"] },
];
