export const MARKER_RADIUS = 2.026;

// Leave enough room inside the silhouette for the whole ruby and its dot.
export function isMarkerVisible(
  normal: { x: number; y: number; z: number },
  camera: { x: number; y: number; z: number },
) {
  const dx = camera.x - normal.x * MARKER_RADIUS;
  const dy = camera.y - normal.y * MARKER_RADIUS;
  const dz = camera.z - normal.z * MARKER_RADIUS;
  const distance = Math.hypot(dx, dy, dz);
  return distance > 0 && (normal.x * dx + normal.y * dy + normal.z * dz) / distance > 0.5;
}