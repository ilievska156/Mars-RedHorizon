import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import landscape from "@/assets/mars-landscape.jpg";
import habitatPhoto from "@/assets/mars.3.jpeg.asset.json";
import globePhoto from "@/assets/mars.habitat.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "RED HORIZON — Discover the Red Planet" },
    { name: "description", content: "Discover Mars: its landscapes, atmosphere, and the future of human habitats. Explore interactive 3D maps of the Red Planet." },
    { property: "og:title", content: "RED HORIZON — Discover the Red Planet" },
    { property: "og:description", content: "Explore Mars, its extraordinary landscape, and imagined human habitats through interactive 3D experiences." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

const stats = [
  ["04", "MARS IS THE FOURTH PLANET FROM THE SUN", ""],
  ["24h 37m", "ONE MARTIAN DAY IS CALLED A SOL", ""],
  ["−65°C", "AVERAGE TEMPERATURE ACROSS IS", ""],
  ["Phobos & Deimos", "TWO MOONS", ""],
];

function HomePage() {
  return <main>
    <section className="hero page-gutter">
      <img className="hero-media" src={landscape} alt="Rocky Martian canyon at sunset" width={1600} height={1024} />
      <div className="hero-content">
        <div className="eyebrow"></div>
        <h1 className="hero-title display-title">Meet <span>Mars</span></h1>
        <p className="hero-copy">A world of ancient riverbeds, immense volcanoes, and horizons that stretch beyond imagination. Get to know the planet that might one day become our next home.</p>
        <div className="hero-actions">
          <Button asChild variant="mission" size="lg"><Link to="/explore">EXPLORE MARS <ArrowUpRight /></Link></Button>
        </div>
      </div>
      <div className="hero-bottom"><span>{"\n"}</span><span></span></div>
    </section>

    <section className="stats-band page-gutter" aria-label="Mars at a glance">
      {stats.map(([value, title, note]) => <div className="stat" key={title}><div className="section-label">{title}</div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div>)}
    </section>

    <section className="intro-section page-gutter">
      <div><div className="eyebrow"></div><h2 className="intro-heading">Our red planetary neighbour :</h2></div>
      <div className="intro-body"><p>Mars is one of the most explored bodies in our solar system, and it's the only planet where we've sent rovers to roam the alien landscape. NASA missions have found lots of evidence that Mars was much wetter and warmer, with a thicker atmosphere, billions of years ago. Mars was named by the ancient Romans for their god of war because its reddish color was reminiscent of blood.</p><p>With a radius of 2,106 miles (3,390 kilometers), Mars is about half the size of Earth. If Earth were the size of a nickel, Mars would be about as big as a raspberry.</p></div>
    </section>

    <section className="feature-band page-gutter">
      <div className="eyebrow"></div><h2 className="feature-heading">Choose your mission.</h2>
      <div className="feature-grid">
        <Link className="feature-card" to="/habitats"><img src={habitatPhoto.url} alt="Futuristic human settlement on Mars" loading="lazy" /><div className="feature-card-content"><div><div className="small-label">{"\u00a0"}</div><h3>Habitats on Mars</h3><p>Find the places where life could take root.</p></div><span className="feature-arrow"><ArrowUpRight size={20} /></span></div></Link>
        <Link className="feature-card" to="/explore"><img src={globePhoto.url} alt="Expedition across the Martian surface" loading="lazy" /><div className="feature-card-content"><div><div className="small-label"></div><h3>Explore the planet</h3><p>Explore a 3D model of Mars.</p></div><span className="feature-arrow"><ArrowUpRight size={20} /></span></div></Link>
      </div>
    </section>
  </main>;
}