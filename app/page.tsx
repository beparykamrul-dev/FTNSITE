"use client";

import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

type Snapshot = {
  cpu: number;
  ram: number;
  dbLatency: number;
  rxMbps: number;
  txMbps: number;
  websocketClients: number;
  tiktokEvents: number;
  services: Record<string, string>;
  updatedAt: string;
};

const initial: Snapshot = {
  cpu: 0,
  ram: 0,
  dbLatency: 0,
  rxMbps: 0,
  txMbps: 0,
  websocketClients: 0,
  tiktokEvents: 0,
  services: {},
  updatedAt: "waiting for telemetry",
};

export default function Home() {
  const [data, setData] = useState<Snapshot>(initial);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_SOCKET_URL;
    if (!endpoint) return;
    const socket: Socket = io(endpoint, { transports: ["websocket"] });
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("ftn:telemetry", (snapshot: Snapshot) => setData(snapshot));
    return () => socket.close();
  }, []);

  const services = Object.entries(data.services);

  return (
    <main className="dashboard">
      <header className="topbar">
        <div className="brand">
          <div className="logo">FTN</div>
          <div>
            <h1 className="title">FTN Observability</h1>
            <p className="subtitle">Kernel · Database · Network · TikTok · ASGI/WSGI · Socket telemetry</p>
          </div>
        </div>
        <div className="status"><span className="dot" /> {connected ? "Socket.IO live" : "Telemetry API ready"}</div>
      </header>

      <section className="grid">
        <Metric label="CPU" value={`${data.cpu.toFixed(1)}%`} meta="kernel / host" />
        <Metric label="RAM" value={`${data.ram.toFixed(1)}%`} meta="used / available" />
        <Metric label="DB latency" value={`${data.dbLatency.toFixed(1)} ms`} meta="application path" />
        <Metric label="Network" value={`${data.rxMbps.toFixed(1)} / ${data.txMbps.toFixed(1)} Mbps`} meta="RX / TX" />
        <Metric label="WebSocket clients" value={`${data.websocketClients}`} meta="Socket.IO" />
        <Metric label="TikTok events" value={`${data.tiktokEvents}`} meta="received / processed" />
        <Metric label="Telemetry" value={data.updatedAt} meta="last snapshot" />
        <Metric label="Mode" value="Production-ready" meta="live collectors connect through API/socket" />
      </section>

      <section className="section">
        <h2 className="section-title">Services</h2>
        <div className="services">
          {(services.length ? services : ["Django ASGI", "WSGI", "PostgreSQL", "Redis", "TikTok Webhook", "Socket.IO", "OpenTelemetry", "Prometheus"]).map((item) => {
            const [name, state] = Array.isArray(item) ? item : [item, "waiting"];
            return <div className="service" key={name}><div className="service-head"><span className="service-name">{name}</span><span className={state === "healthy" ? "ok" : "warn"}>{state}</span></div></div>;
          })}
        </div>
      </section>

      <section className="section card events">
        <h2 className="section-title">Telemetry pipeline</h2>
        <table>
          <thead><tr><th>Layer</th><th>Source</th><th>Destination</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td>Kernel</td><td>host collectors</td><td>metrics</td><td>CPU, RAM, I/O, sockets, processes</td></tr>
            <tr><td>Database</td><td>PostgreSQL / Redis</td><td>metrics + traces</td><td>connections, latency, cache and workload</td></tr>
            <tr><td>Application</td><td>Django ASGI/WSGI</td><td>OpenTelemetry</td><td>requests, errors, latency</td></tr>
            <tr><td>Events</td><td>TikTok webhooks</td><td>Socket.IO</td><td>real-time dashboard updates</td></tr>
            <tr><td>Network</td><td>SNMP / flow collectors</td><td>metrics</td><td>RX/TX, errors, drops and latency</td></tr>
          </tbody>
        </table>
      </section>
      <p className="footer">FTNSITE · telemetry stays behind the FTN API boundary; secrets are never sent to the browser.</p>
    </main>
  );
}

function Metric({ label, value, meta }: { label: string; value: string; meta: string }) {
  return <div className="card"><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-meta">{meta}</div></div>;
}
