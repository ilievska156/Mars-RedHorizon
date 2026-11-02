import { describe, expect, it } from "vitest";

import { habitats, matchesFilter, type HabitatFilter } from "@/lib/habitats";

const namesIn = (filter: HabitatFilter) =>
  habitats.filter((habitat) => matchesFilter(habitat, filter)).map((habitat) => habitat.name);

describe("Habitat filters", () => {
  it("shows ice-named habitats and Polaris Bunker under Ice access", () => {
    expect(namesIn("Ice access")).toEqual(["Polaris Bunker", "Genesis Ice Station", "Polar One Ice Station"]);
  });

  it("shows Solace Base, Solar Oasis and Anchor Hub under Solar potential", () => {
    expect(namesIn("Solar potential")).toEqual(["Solace Base", "Anchor Hub", "Solar Oasis"]);
  });

  it("shows the remaining habitats under Large settlements", () => {
    expect(namesIn("Large settlements")).toEqual([
      "Cirrus Research Post",
      "Horizon City",
      "Skyline Crater Complex",
      "Astralis Scientific Haven",
    ]);
  });

  it("shows every habitat under All sites", () => {
    expect(namesIn("All sites")).toHaveLength(10);
  });
});
