import { createFileRoute } from "@tanstack/react-router";
import { MarsGlobe } from "@/components/MarsGlobe";

export const Route = createFileRoute("/explore")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Explore Mars in 3D — RED HORIZON" },
    { name: "description", content: "Rotate, zoom, and explore a realistic interactive 3D view of the Red Planet." },
    { property: "og:title", content: "Explore Mars in 3D — RED HORIZON" },
    { property: "og:description", content: "See the surface of Mars from every angle in an interactive 3D globe." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ExplorePage,
});

function ExplorePage() {
  return <main>
    <div className="explorer-head page-gutter"><div><div className="eyebrow">PLANETARY VIEW</div><h1 className="explorer-title">Explore Mars</h1><p className="explorer-desc">A closer look at the Red Planet where you can drag to rotate its surface and scroll or pinch to move in and out.</p></div><div className="explorer-index">{"\n"} <strong></strong></div></div>
    <div className="globe-layout"><div className="planet-stage"><MarsGlobe mode="explore" /><span className="stage-corner top"><span className="live-dot" /> Free exploration mode</span><span className="stage-corner bottom">Drag to rotate · scroll to zoom</span><span className="stage-corner right">Mars / 3D</span></div><aside className="globe-side"><div className="section-label">PLANETARY DATA:</div><div className="globe-fact"><span>Diameter</span><strong>6,779 km</strong></div><div className="globe-fact"><span>Length of a year</span><strong>687 Earth days</strong></div><div className="globe-fact"><span>Surface gravity</span><strong>3.71 m/s²</strong></div><div className="globe-fact"><span>Atmosphere</span><strong>Mostly CO₂</strong></div><p className="globe-side-note">Mars has the largest volcano in the solar system, Olympus Mons, and a vast canyon system called Valles. Earth to mars are distanced 225 million km on average.</p></aside></div>
  </main>;
}