"use client";

import { useState } from "react";
import "./monitoring.css";

const devices = [
  ["Core Router", "MikroTik", "SNMP + RouterOS", "Healthy"],
  ["Access-1", "MikroTik", "SNMP", "Healthy"],
  ["EPON OLT-01", "EPON/OLT", "SNMP", "Warning"],
];

const metrics = ["CPU %", "Memory %", "RX Mbps", "TX Mbps", "Latency ms", "Packet loss %", "IF errors", "ONU online/offline"];

export default function MonitoringPage() {
  const [saved, setSaved] = useState(false);
  return (
    <main className="monitoring">
      <header>
        <div><span className="eyebrow">FTN NOC</span><h1>Metrics • SNMP • Devices • Alerts</h1><p>এক জায়গা থেকে device, metric collector এবং alert policy পরিচালনা করুন।</p></div>
        <button onClick={() => setSaved(true)}>{saved ? "Saved" : "Save setup"}</button>
      </header>
      <section className="grid">
        <article><h2>Metrics</h2><div className="chips">{metrics.map((m) => <span key={m}>{m}</span>)}</div></article>
        <article><h2>Collectors</h2><p>SNMPD • Prometheus • OpenTelemetry</p><p>ICMP • RouterOS • NetFlow/IPFIX</p></article>
        <article><h2>Device drivers</h2><p>MikroTik RouterOS/SNMP</p><p>Generic SNMP • EPON/OLT SNMP • ICMP</p></article>
      </section>
      <section className="panel"><h2>Devices</h2>{devices.map(([name, vendor, protocol, status]) => <div className="row" key={name}><strong>{name}</strong><span>{vendor}</span><span>{protocol}</span><b className={status === "Healthy" ? "ok" : "warn"}>{status}</b></div>)}</section>
      <section className="panel"><h2>Alert setup</h2><div className="alert-grid"><label>CPU threshold<input defaultValue="85" type="number" />%</label><label>Memory threshold<input defaultValue="90" type="number" />%</label><label>Packet loss<input defaultValue="5" type="number" />%</label><label>DB latency<input defaultValue="100" type="number" />ms</label></div><div className="channels"><label><input type="checkbox" defaultChecked /> Web</label><label><input type="checkbox" /> Email</label><label><input type="checkbox" /> Telegram</label><label><input type="checkbox" /> Webhook</label></div></section>
    </main>
  );
}
