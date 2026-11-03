import { describe, expect, it } from "vitest";
import { isMarkerVisible, MARKER_RADIUS } from "@/lib/marker-visibility";

describe("habitat markers on Mars", () => {
  it("anchors just above the planet surface", () => {
    expect(MARKER_RADIUS).toBeGreaterThan(2.022);
    expect(MARKER_RADIUS).toBeLessThan(2.03);
  });
  it("shows the front marker at all supported zoom distances", () => {
    for (const z of [3.4, 6.3, 9]) {
      expect(isMarkerVisible({ x: 0, y: 0, z: 1 }, { x: 0, y: 0, z })).toBe(true);
    }
  });
  it("hides markers behind Mars and at its edge", () => {
    for (const z of [3.4, 6.3, 9]) {
      expect(isMarkerVisible({ x: 0, y: 0, z: -1 }, { x: 0, y: 0, z })).toBe(false);
      expect(isMarkerVisible({ x: 1, y: 0, z: 0 }, { x: 0, y: 0, z })).toBe(false);
      expect(isMarkerVisible({ x: Math.sqrt(0.51), y: 0.7, z: 0 }, { x: 0, y: 6.3, z: 0 })).toBe(false);
    }
  });
  it("updates visibility when orbiting around the planet", () => {
    const normal = { x: 0, y: 0, z: 1 };
    expect(isMarkerVisible(normal, { x: 0, y: 0, z: 6.3 })).toBe(true);
    expect(isMarkerVisible(normal, { x: 6.3, y: 0, z: 0 })).toBe(false);
    expect(isMarkerVisible(normal, { x: 0, y: 0, z: -6.3 })).toBe(false);
  });
});