import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bookmark, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarsGlobe } from "@/components/MarsGlobe";
import { habitatFilters, habitats, matchesFilter, type Habitat, type HabitatFilter } from "@/lib/habitats";
import landscape from "@/assets/mars-landscape.jpg";
import { ExpandablePhoto } from "@/components/ExpandablePhoto";

export const Route = createFileRoute("/habitats")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Habitat Sites on Mars — RED HORIZON" },
    { name: "description", content: "Explore ten distinct human habitats across an interactive 3D Mars globe, including four large permanent settlements." },
    { property: "og:title", content: "Habitat Sites on Mars — RED HORIZON" },
    { property: "og:description", content: "Discover possible places to live on Mars and the systems that could sustain their crews." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HabitatsPage,
});

const metricDefinitions = [
  { label: "Water access", tone: "ice" },
  { label: "Solar exposure", tone: "gold" },
  { label: "Thermal stability", tone: "ember" },
  { label: "Radiation shelter", tone: "green" },
  { label: "Terrain safety", tone: "neutral" },
  { label: "Communications", tone: "ice" },
] as const;

function Score({ value = 91 }: { value?: number }) {
  return <div className="score-ring" aria-label={`Site suitability score ${value} out of 100`}>{value}</div>;
}

function MetricBars({ habitat, compact = false }: { habitat: Habitat; compact?: boolean }) {
  return <div className={compact ? "metric-bars compact" : "metric-bars"}>{metricDefinitions.map((metric, index) => { const value = habitat.metrics[index]; return <div className="metric-item" key={metric.label}><div className="metric-top"><span>{metric.label}</span><strong>{value}/100</strong></div><div className="meter"><span className={`meter-fill ${metric.tone}`} style={{ width: `${value}%` }} /></div></div>; })}</div>;
}

function HabitatsPage() {
  const [selected, setSelected] = useState<Habitat>(habitats[0]);
  const [detail, setDetail] = useState(false);
  const [popup, setPopup] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<HabitatFilter>("All sites");
  const [saved, setSaved] = useState<string[]>([]);
  const filtered = useMemo(() => habitats.filter((habitat) => {
    const matchesQuery = `${habitat.name} ${habitat.region}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && matchesFilter(habitat, filter);
  }), [query, filter]);
  const select = (habitat: Habitat) => { setSelected(habitat); setPopup(true); };
  const toggleSaved = () => setSaved((current) => current.includes(selected.id) ? current.filter((id) => id !== selected.id) : [...current, selected.id]);

  return <main className="mission-page">
    {detail ? <>
      <div className="mission-banner" style={{ backgroundImage: `linear-gradient(0deg, var(--background), transparent 90%), url(${landscape})` }}>
        <div className="mission-banner-top"><Button variant="ghost" onClick={() => setDetail(false)}><ArrowLeft size={15} /> Explore / Red Horizon</Button><div className="mission-banner-actions"><Button variant="missionOutline" onClick={toggleSaved}><Bookmark size={14} /> {saved.includes(selected.id) ? "Saved" : "Save site"}</Button></div></div>
        <div className="mission-banner-bottom"><div><div className="small-label">{"\n"}</div><h1>{selected.name}</h1><span className="section-label" /></div><div className="banner-score"><Score value={selected.score} /><span>Illustrative suitability<br />{selected.score >= 90 ? "High potential" : "Viable candidate"}</span></div></div>
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-summary"><div><span>Capacity</span><strong>{selected.capacity}</strong></div><div><span>Solar potential</span><strong>{selected.solar}</strong></div><div><span>Ice confidence</span><strong>{selected.ice}</strong></div><div><span>Site stability</span><strong>{selected.stability}</strong></div></div>
          <div className="small-label">Environmental analysis</div><h2>Why this site leads</h2>
          <p className="detail-intro">{selected.description} Figures below are illustrative concept estimates, not measured site data.</p>
          <MetricBars habitat={selected} />
          <div className="detail-notes"><div><span className="small-label">● Mission advantage</span><p>{selected.systems.join(" · ")}</p></div><div><span className="small-label">▲ Mission consideration</span><p>Dust storms, cold nights, and radiation require careful engineering.</p></div></div>
        </div>
        <aside className="detail-aside"><div className="detail-panel"><div className="section-label">Concept conditions</div><div className="conditions"><span>Water presence<br /><br /><strong>{selected.conditions[0]}</strong></span><span>Solar exposure <strong>{selected.conditions[1]}</strong></span><span>Terrain stability <strong>{selected.conditions[2]}</strong></span></div></div><ExpandablePhoto src={selected.image} alt={`${selected.name} habitat concept`} title={selected.name} /><div className="section-label">HABITAT CONCEPT</div><Button variant="mission" onClick={() => setDetail(false)}>Return to globe <ArrowRight size={15} /></Button></aside>
      </div>
    </> : <div className="mission-grid">
      <aside className="mission-left">
        <label className="mission-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search regions or settlements" aria-label="Search habitat sites" /></label>
        <div className="filter-heading">Habitat filters <Button variant="ghost" className="filter-reset" onClick={() => { setFilter("All sites"); setQuery(""); }}>Reset</Button></div>
        <div className="mission-filters">{habitatFilters.map((item) => <Button key={item} variant="ghost" className={filter === item ? "filter-pill active" : "filter-pill"} onClick={() => setFilter(item)}>{item}</Button>)}</div>
        <div className="site-heading"><span /></div>
        <div className="site-heading">Habitat candidates</div>
        <div className="mission-sites">{filtered.map((habitat, index) => <Button key={habitat.id} variant="ghost" className={selected.id === habitat.id ? "mission-site active" : "mission-site"} onClick={() => select(habitat)}><span className="site-number">0{index + 1}</span><span><strong>{habitat.name}</strong><small /></span><Bookmark size={13} fill={saved.includes(habitat.id) ? "currentColor" : "none"} /></Button>)}</div>
        <span className="mission-footnote" />
      </aside>
      <div className="mission-center"><MarsGlobe mode="habitats" activeId={selected.id} onSelect={select} /><div className="mission-topline"><span>3D globe</span><span>10 habitats</span><span>4 large settlements</span></div><div className="mission-coordinates">Mars globe / drag to rotate · scroll to zoom</div>{popup && <div className="mission-popup"><div><span className="small-label">Selected site</span><Button variant="ghost" size="icon" onClick={() => setPopup(false)} aria-label="Close habitat information"><X size={15} /></Button></div><ExpandablePhoto src={selected.image} alt={`${selected.name} habitat concept`} title={selected.name} /><strong>{selected.name}</strong><p>{selected.description}</p></div>}</div>
      <aside className="mission-right"><div className="small-label">SELECTED BASE - {String(habitats.indexOf(selected) + 1).padStart(2, "0")} / 10</div><h1>{selected.name}</h1><p className="right-region" /><div className="right-score"><Score value={selected.score} /><div><strong>Sustainability score</strong><span /></div></div><div className="right-numbers"><div><span>Surface gravity</span><strong>3.71 <small>m/s²</small></strong></div><div><span>Capacity</span><strong>{selected.capacity}</strong></div></div><div className="section-label">ENVIRONMENTAL ANALYSIS:</div><MetricBars habitat={selected} compact /><Button variant="mission" className="w-full" onClick={() => setDetail(true)}>OPEN ANALYTICS <ArrowRight size={15} /></Button></aside>
    </div>}
  </main>;
}