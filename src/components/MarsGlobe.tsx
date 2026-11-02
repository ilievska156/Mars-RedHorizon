import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Environment, Lightformer, OrbitControls, useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";
import marsMap from "@/assets/mars-surface.jpg.asset.json";
import { habitats, type Habitat } from "@/lib/habitats";

type MarsGlobeProps = {
  mode: "habitats" | "explore";
  activeId?: string | null;
  onSelect?: (habitat: Habitat) => void;
};

function Marker({ habitat, active, onSelect }: { habitat: Habitat; active: boolean; onSelect: (habitat: Habitat) => void }) {
  const radius = 2.02;
  const x = Math.sin(habitat.lon) * Math.cos(habitat.lat) * radius;
  const y = Math.sin(habitat.lat) * radius;
  const z = Math.cos(habitat.lon) * Math.cos(habitat.lat) * radius;
  const ruby = useRef<THREE.Group>(null);
  const BASE = 1.25;
  useFrame((state) => {
    if (!ruby.current) return;
    const pulse = active ? BASE * (1 + 0.16 * Math.sin(state.clock.elapsedTime * 3.4)) : BASE;
    ruby.current.scale.setScalar(pulse);
  });
  const handleClick = (event: { stopPropagation: () => void }) => { event.stopPropagation(); onSelect(habitat); };
  return (
    <group position={[x, y, z]}>
      {/* anchor dot holding the gem to the surface */}
      <mesh onClick={handleClick}>
        <sphereGeometry args={[0.021, 8, 8]} />
        <meshBasicMaterial color={active ? "#ffd1dc" : "#ff0f2f"} />
      </mesh>
      <Billboard>
        <group ref={ruby} position={[0, 0.24, 0]}>
          {/* faceted ruby body */}
          <mesh
            scale={[1, 0.72, 0.5]}
            onClick={handleClick}
            onPointerOver={(event) => { event.stopPropagation(); document.body.style.cursor = "pointer"; }}
            onPointerOut={() => { document.body.style.cursor = ""; }}
          >
            <octahedronGeometry args={[0.095, 0]} />
            <meshStandardMaterial
              color={active ? "#ff1f3f" : "#e00033"}
              roughness={0.1}
              metalness={0.12}
              emissive={active ? "#c2002a" : "#70001c"}
              emissiveIntensity={active ? 2.2 : 1.15}
              flatShading
            />
          </mesh>
          {/* inner light core */}
          <mesh scale={[0.42, 0.32, 0.24]} onClick={handleClick}>
            <octahedronGeometry args={[0.095, 0]} />
            <meshBasicMaterial color={active ? "#fff0f3" : "#ff3d5e"} transparent opacity={0.92} />
          </mesh>
          {/* soft red halo */}
          <mesh scale={[1.8, 1.3, 0.2]}>
            <octahedronGeometry args={[0.095, 0]} />
            <meshBasicMaterial color="#ff1233" transparent opacity={active ? 0.3 : 0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      </Billboard>
    </group>
  );
}

function Planet({ mode, activeId, onSelect }: MarsGlobeProps) {
  const texture = useTexture(marsMap.url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const group = useRef<THREE.Group>(null);

  useFrame((_, rawDelta) => {
    if (mode !== "habitats" || !activeId || !group.current) return;
    const active = habitats.find((habitat) => habitat.id === activeId);
    if (!active) return;
    const target = -active.lon;
    const current = group.current.rotation.y;
    const diff = Math.atan2(Math.sin(target - current), Math.cos(target - current));
    group.current.rotation.y += diff * (1 - Math.exp(-2.3 * Math.min(rawDelta, 0.05)));
  });

  return (
    <group ref={group} rotation={[0, mode === "habitats" ? 0 : 0.5, 0]}>
      <mesh>
        <sphereGeometry args={[2, 96, 64]} />
        <meshStandardMaterial map={texture} roughness={1} metalness={0} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.022, 64, 48]} />
        <meshBasicMaterial color="#b57250" transparent opacity={0.055} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {mode === "habitats" && onSelect && habitats.map((habitat) => (
        <Marker key={habitat.id} habitat={habitat} active={activeId === habitat.id} onSelect={onSelect} />
      ))}
    </group>
  );
}

export function MarsGlobe(props: MarsGlobeProps) {
  return (
    <Canvas camera={{ position: [0, 0, 6.3], fov: 44 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.05} />
      <directionalLight position={[5, 3, 5]} intensity={2.7} color="#fff0d9" />
      <pointLight position={[-5, -2, -3]} intensity={1.3} color="#b57657" />
      <Environment>
        <Lightformer intensity={1.5} position={[0, 5, 0]} scale={[10, 10, 1]} />
      </Environment>
      <Stars radius={70} depth={35} count={900} factor={2} saturation={0} fade speed={0} />
      <Suspense fallback={null}>
        <Planet {...props} />
      </Suspense>
      <OrbitControls enablePan={false} minDistance={3.4} maxDistance={9} minPolarAngle={0.18} maxPolarAngle={Math.PI - 0.18} enableDamping dampingFactor={0.07} rotateSpeed={0.6} />
    </Canvas>
  );
}