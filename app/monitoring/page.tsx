"use client";

import { useEffect, useState } from "react";
import "./monitoring.css";

type Summary = { source: string; totals: { all: number; online: number; offline: number; unknown: number }; alerts: number; ai: { status: string; findings: string[] } };
const empty: Summary = { source: "unavailable", totals: { all: 0, online: 0, offline: 0, unknown: 0 }, alerts: 0, ai: { status: "waiting", findings: [] } };

export default function MonitoringPage() {
  const [data, setData] = useState(empty);
  useEffect(() => { fetch("/api/monitoring").then(r => r.json()).then(setData).catch(() => setData(empty)); }, []);
  return <main className="monitoring"><header><div><span className="eyebrow">FTN NOC</span><h1>Universal Device Monitoring</h1><p>সব vendor/device এক interface: SNMP, API, ICMP, metrics, alerts এবং AI.</p></div><div className="status">Source: {data.source}</div></header>
    <section className="grid">{[["Devices",data.totals.all],["Online",data.totals.online],["Offline",data.totals.offline],["Unknown",data.totals.unknown],["Alerts",data.alerts],["AI",data.ai.status]].map(([a,b])=><article key={String(a)}><h2>{a}</h2><strong>{b}</strong></article>)}</section>
    <section className="panel"><h2>AI Monitoring</h2>{data.ai.findings.length ? data.ai.findings.map(x=><p key={x}>{x}</p>) : <p>No findings yet. Collector/API disconnected হলেও FTN interface available.</p>}</section>
    <section className="panel"><h2>Universal functions</h2><p>Overview · Health · Interfaces · Traffic · Latency · Packet loss · Errors · Processes · Resources · Logs · Events · Alerts · Configuration</p></section>
  </main>;
}
