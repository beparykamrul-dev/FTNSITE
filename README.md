# FTNSITE

FTNSITE is the web layer for FTN's unified observability and service dashboard.

## Current foundation

- Next.js App Router + React + TypeScript
- Socket.IO client ready for realtime telemetry
- OpenTelemetry API dependency ready for application instrumentation
- Dashboard cards for kernel, RAM, database latency, network, WebSocket and TikTok events
- Service health surface for Django ASGI/WSGI, PostgreSQL, Redis, TikTok webhook, Socket.IO, OpenTelemetry and Prometheus
- Telemetry architecture designed so secrets and infrastructure credentials remain server-side

## Telemetry contract

The browser can subscribe to a backend Socket.IO endpoint through `NEXT_PUBLIC_SOCKET_URL`. The backend should emit a `ftn:telemetry` snapshot containing host, database, application, network and TikTok metrics.

```json
{
  "cpu": 18.4,
  "ram": 42.1,
  "dbLatency": 8.2,
  "rxMbps": 4200,
  "txMbps": 2100,
  "websocketClients": 182,
  "tiktokEvents": 14,
  "services": {
    "Django ASGI": "healthy",
    "PostgreSQL": "healthy",
    "TikTok Webhook": "healthy"
  },
  "updatedAt": "2026-09-11T00:00:00Z"
}
```

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

For production, build with `npm run build` and serve with `npm start` behind the FTN reverse proxy. The Django/ASGI/WSGI backend, collectors and telemetry exporters remain separate services and feed this web layer through authenticated API/Socket.IO channels.
