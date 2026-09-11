"use client";

import { useState } from "react";

type Finding = { provider: string; status: string; data: Record<string, unknown> };
type Intelligence = { target: string; observedAt: string; sources: Record<string, Finding>; policy: { externalResultsAreContext: boolean; externalInventoryIsNotDeviceTruth: boolean } };

function pretty(data: Record<string, unknown>) {
  const keys = Object.keys(data).slice(0, 12);
  if (!keys.length) return "No provider data";
  return keys.map(k => `${k}: ${typeof data[k] === "object" ? JSON.stringify(data[k]) : String(data[k])}`).join("\n");
}

export default function AssetIntelligencePage() {
  const [target, setTarget] = useState("");
  const [data, setData] = useState<Intelligence | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function inspect(e: React.FormEvent) {
    e.preventDefault();
    if (!target.trim()) return;
    setLoading(true); setError("");
    try {
      const res = await fetch(`/api/assets/intelligence?target=${encodeURIComponent(target.trim())}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Request failed");
      setData(json);
    } catch (err) { setError(err instanceof Error ? err.message : "Request failed"); setData(null); }
    finally { setLoading(false); }
  }

  return <main style={{maxWidth:1100,margin:"0 auto",padding:32,fontFamily:"system-ui"}}>
    <header><span style={{letterSpacing:2,fontSize:12}}>FTN NOC / ASSET INTELLIGENCE</span><h1>Universal FTN Asset Intelligence</h1><p>এক target-এ FTN device state, external intelligence এবং global network measurement এক view.</p></header>
    <form onSubmit={inspect} style={{display:"flex",gap:10,margin:"28px 0"}}>
      <input value={target} onChange={e=>setTarget(e.target.value)} placeholder="IP address or hostname" style={{flex:1,padding:14,border:"1px solid #ccc",borderRadius:8}} />
      <button disabled={loading} style={{padding:"14px 22px",borderRadius:8,border:0}}>{loading ? "Inspecting…" : "Inspect"}</button>
    </form>
    {error && <div style={{padding:14,borderRadius:8,marginBottom:20}}>Error: {error}</div>}
    {!data && <section style={{padding:24,border:"1px solid #ddd",borderRadius:12}}><h2>Ready</h2><p>Target দিন। API credentials না থাকলেও FTN interface থাকবে এবং provider status আলাদা দেখাবে।</p></section>}
    {data && <>
      <section style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20}}>
        {Object.entries(data.sources).map(([name,f])=><article key={name} style={{padding:18,border:"1px solid #ddd",borderRadius:12}}><small>{name.toUpperCase()}</small><h2>{f.status}</h2><pre style={{whiteSpace:"pre-wrap",fontSize:12,maxHeight:260,overflow:"auto"}}>{pretty(f.data)}</pre></article>)}
      </section>
      <section style={{padding:20,border:"1px solid #ddd",borderRadius:12}}><h2>FTN Intelligence Policy</h2><p>External findings are context only. Censys/Netlas inventory কখনো FTN-এর নিজস্ব device truth replace করে না.</p><p>Observed: {new Date(data.observedAt).toLocaleString()}</p></section>
    </>}
  </main>;
}
