"use client";

import { useState } from "react";

type Detail = { target:string; observedAt:string; diagnosis:string; sources:Record<string, any>; timeline:any[]; policy:any };

const labels: Record<string,string> = { local:"FTN Local", censys:"Censys", netlas:"Netlas", globalping:"Globalping" };

export default function AssetDetailPage() {
  const [target,setTarget]=useState(""); const [data,setData]=useState<Detail|null>(null); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  async function inspect(e:React.FormEvent){ e.preventDefault(); if(!target.trim()) return; setLoading(true);setError(""); try { const r=await fetch(`/api/assets/detail?target=${encodeURIComponent(target.trim())}`); const j=await r.json(); if(!r.ok) throw new Error(j.error||"Request failed"); setData(j); } catch(e){setError(e instanceof Error?e.message:"Request failed");} finally{setLoading(false);} }
  return <main style={{maxWidth:1200,margin:"0 auto",padding:32,fontFamily:"system-ui"}}>
    <header><span style={{letterSpacing:2,fontSize:12}}>FTN NOC / ASSET DETAIL 2.0</span><h1>Universal Asset Detail</h1><p>FTN state, connectivity, external intelligence, measurements, alerts and AI diagnosis in one view.</p></header>
    <form onSubmit={inspect} style={{display:"flex",gap:10,margin:"26px 0"}}><input value={target} onChange={e=>setTarget(e.target.value)} placeholder="IP / hostname / domain" style={{flex:1,padding:14,border:"1px solid #ccc",borderRadius:8}}/><button disabled={loading} style={{padding:"14px 22px",border:0,borderRadius:8}}>{loading?"Inspecting…":"Inspect asset"}</button></form>
    {error&&<p role="alert">{error}</p>}
    {data&&<>
      <section style={{padding:20,border:"1px solid #ddd",borderRadius:12,marginBottom:18}}><small>TARGET</small><h2>{data.target}</h2><strong>AI diagnosis</strong><p>{data.diagnosis}</p><small>Observed: {new Date(data.observedAt).toLocaleString()}</small></section>
      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14}}>{Object.entries(data.sources).map(([name,source])=><article key={name} style={{padding:18,border:"1px solid #ddd",borderRadius:12}}><small>{labels[name]||name.toUpperCase()}</small><h3>{source?.status||source?.state||"unknown"}</h3><pre style={{whiteSpace:"pre-wrap",fontSize:12,maxHeight:300,overflow:"auto"}}>{JSON.stringify(source,null,2)}</pre></article>)}</section>
      <section style={{marginTop:18,padding:20,border:"1px solid #ddd",borderRadius:12}}><h2>Timeline</h2>{data.timeline.length?<pre>{JSON.stringify(data.timeline,null,2)}</pre>:<p>No historical events supplied by the connected collectors yet.</p>}</section>
    </>}
    {!data&&!error&&<section style={{padding:24,border:"1px solid #ddd",borderRadius:12}}><h2>Ready</h2><p>Inspect any authorized FTN asset. Collector/provider failures remain visible without breaking the interface.</p></section>}
  </main>;
}
