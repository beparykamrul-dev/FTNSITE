import { NextRequest, NextResponse } from "next/server";

const devices: Array<Record<string, unknown>> = [];

export async function GET() {
  return NextResponse.json({ devices });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body?.name || !body?.address || !body?.driver) {
    return NextResponse.json({ error: "name, address and driver are required" }, { status: 400 });
  }
  const device = { id: crypto.randomUUID(), ...body, createdAt: new Date().toISOString() };
  devices.push(device);
  return NextResponse.json(device, { status: 201 });
}
