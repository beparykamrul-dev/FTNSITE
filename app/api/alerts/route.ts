import { NextRequest, NextResponse } from "next/server";

type Alert = { id: string; name: string; metric: string; operator: string; threshold: number; duration: string; severity: string; enabled: boolean };
const alerts: Alert[] = [];

export async function GET() { return NextResponse.json({ alerts }); }

export async function POST(request: NextRequest) {
  const body = await request.json();
  const required = ["name", "metric", "operator", "threshold", "severity"];
  if (required.some((key) => body?.[key] === undefined)) return NextResponse.json({ error: "missing alert fields" }, { status: 400 });
  const alert: Alert = { id: crypto.randomUUID(), duration: "5m", enabled: true, ...body };
  alerts.push(alert);
  return NextResponse.json(alert, { status: 201 });
}
