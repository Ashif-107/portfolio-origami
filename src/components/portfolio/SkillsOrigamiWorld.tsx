import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
type Skill = { name: string; level?: string };
type Region = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  center: [number, number, number];
  accent: string;
  skills: Skill[];
};
const REGIONS: Region[] = [
  {
    id: "languages",
    name: "The Central City",
    tagline: "Programming Languages - the foundation of everything",
    description:
      "The languages, concepts, and problem-solving skills that support every region beyond.",
    center: [0, 0, 0],
    accent: "#ffb37a",
    skills: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Java" },
      { name: "Rust" },
      { name: "C" },
      { name: "C++" },
      { name: "OOP" },
    ],
  },
  {
    id: "frontend",
    name: "The Creative District",
    tagline: "Frontend - where ideas become experiences",
    description:
      "The part of the world users interact with directly. Modern frameworks, design systems, animations, and immersive web experiences come together here.",
    center: [-18, 0, -6],
    accent: "#7ad48a",
    skills: [
      { name: "HTML & CSS" },
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Svelte" },
      { name: "Tailwind CSS" },
      { name: "Three.js" },
      { name: "WebGL" },
    ],
  },
  {
    id: "backend",
    name: "The Connected Valley",
    tagline: "Backend - powering everything behind the scenes",
    description:
      "Services, APIs, and application logic flow through this region. It keeps systems connected, scalable, and reliable.",
    center: [18, 0, 8],
    accent: "#f0c46b",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "FastAPI" },
      { name: "Frappe" },
      { name: "REST API" },
      { name: "JWT" },
      { name: "Rust Axum" },
      { name: "Postman" },
    ],
  },
  {
    id: "cloud",
    name: "The Floating Peaks",
    tagline: "Cloud & DevOps - infrastructure above the horizon",
    description:
      "The systems that keep applications running at scale. From deployments and containers to cloud infrastructure and automation.",
    center: [-10, 6, 18],
    accent: "#9bc7ff",
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "Terraform" },
      { name: "Vercel" },
    ],
  },
  {
    id: "databases",
    name: "The Data Basin",
    tagline: "Databases & Tools - where projects store and grow",
    description:
      "The knowledge center of the world. Databases, development tools, and workflows that keep projects organized and efficient.",
    center: [2, -7, 16],
    accent: "#c69bff",
    skills: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Git" },
      { name: "Linux CLI" },
      { name: "VS Code" },
    ],
  },
];
// ───────── Helpers ─────────
function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
// ───────── Region Builders ─────────
function ForestRegion({ region, lit }: { region: Region; lit: boolean }) {
  const rand = useMemo(() => seededRand(11), []);
  const trees = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        x: (rand() - 0.5) * 9,
        z: (rand() - 0.5) * 9,
        h: 1.2 + rand() * 2.4,
        rot: rand() * Math.PI * 2,
        i,
      })),
    [rand]
  );
  return (
    <group position={region.center}>
      {/* ground island */}
      <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6, 6]} />
        <meshStandardMaterial
          color={lit ? "#2f5d3a" : "#1f3528"}
          flatShading
          emissive={lit ? region.accent : "#000"}
          emissiveIntensity={lit ? 0.15 : 0}
        />
      </mesh>
      {trees.map((t) => (
        <group key={t.i} position={[t.x, 0, t.z]} rotation={[0, t.rot, 0]}>
          {/* trunk */}
          <mesh position={[0, t.h / 2 - 0.4, 0]}>
            <cylinderGeometry args={[0.08, 0.12, t.h * 0.6, 4]} />
            <meshStandardMaterial color="#6b4a2b" flatShading />
          </mesh>
          {/* folded paper canopy — stacked cones */}
          {[0, 1, 2].map((k) => (
            <mesh key={k} position={[0, t.h * 0.4 + k * 0.35, 0]}>
              <coneGeometry args={[0.7 - k * 0.18, 0.55, 4]} />
              <meshStandardMaterial
                color={lit ? "#7ad48a" : "#3c5a44"}
                flatShading
                emissive={lit ? region.accent : "#000"}
                emissiveIntensity={lit ? 0.25 : 0}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      ))}
      {lit && <pointLight color={region.accent} intensity={2} distance={14} />}
    </group>
  );
}
function ValleyRegion({ region, lit }: { region: Region; lit: boolean }) {
  const rand = useMemo(() => seededRand(23), []);
  const structures = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        x: (i - 3) * 1.6,
        z: (rand() - 0.5) * 3,
        h: 1.4 + rand() * 1.8,
        i,
      })),
    [rand]
  );
  return (
    <group position={region.center}>
      {/* valley floor */}
      <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 7, 6]} />
        <meshStandardMaterial
          color={lit ? "#7a5d2e" : "#3b2f1c"}
          flatShading
          side={THREE.DoubleSide}
          emissive={lit ? region.accent : "#000"}
          emissiveIntensity={lit ? 0.12 : 0}
        />
      </mesh>
      {/* aqueduct arches connecting structures */}
      {structures.slice(0, -1).map((s, i) => {
        const next = structures[i + 1];
        const mx = (s.x + next.x) / 2;
        const mz = (s.z + next.z) / 2;
        return (
          <mesh
            key={`a-${i}`}
            position={[mx, 0.8, mz]}
            rotation={[0, Math.atan2(next.z - s.z, next.x - s.x), 0]}
          >
            <torusGeometry args={[0.8, 0.06, 6, 12, Math.PI]} />
            <meshStandardMaterial
              color={lit ? "#e8c98a" : "#5a4a30"}
              flatShading
              emissive={lit ? region.accent : "#000"}
              emissiveIntensity={lit ? 0.3 : 0}
            />
          </mesh>
        );
      })}
      {structures.map((s) => (
        <group key={s.i} position={[s.x, 0, s.z]}>
          <mesh position={[0, s.h / 2, 0]}>
            <boxGeometry args={[0.9, s.h, 0.9]} />
            <meshStandardMaterial
              color={lit ? "#f0c46b" : "#4a3a22"}
              flatShading
              emissive={lit ? region.accent : "#000"}
              emissiveIntensity={lit ? 0.2 : 0}
            />
          </mesh>
          <mesh position={[0, s.h + 0.35, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.75, 0.7, 4]} />
            <meshStandardMaterial color={lit ? "#fff4e0" : "#3a3022"} flatShading />
          </mesh>
        </group>
      ))}
      {lit && <pointLight color={region.accent} intensity={2.2} distance={16} />}
    </group>
  );
}
function CloudRegion({ region, lit }: { region: Region; lit: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (groupRef.current)
      groupRef.current.position.y =
        region.center[1] + Math.sin(s.clock.elapsedTime * 0.6) * 0.4;
  });
  const peaks = useMemo(
    () => [
      { x: -2, z: 0, h: 3.2 },
      { x: 0, z: 0.6, h: 4.2 },
      { x: 2.2, z: -0.2, h: 3.6 },
      { x: 1, z: -2, h: 2.6 },
      { x: -1.8, z: -1.8, h: 2.4 },
    ],
    []
  );
  return (
    <group ref={groupRef} position={region.center}>
      {peaks.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          {/* mountain — octahedron looks like folded paper peak */}
          <mesh position={[0, p.h / 2, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[1, p.h, 4]} />
            <meshStandardMaterial
              color={lit ? "#dbe9ff" : "#3a4a60"}
              flatShading
              emissive={lit ? region.accent : "#000"}
              emissiveIntensity={lit ? 0.3 : 0}
            />
          </mesh>
          {/* snow cap */}
          <mesh position={[0, p.h - 0.3, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.5, 0.8, 4]} />
            <meshStandardMaterial
              color={lit ? "#ffffff" : "#5a6a80"}
              flatShading
              emissive={lit ? "#9bc7ff" : "#000"}
              emissiveIntensity={lit ? 0.4 : 0}
            />
          </mesh>
        </group>
      ))}
      {/* trailing clouds */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            -3 + i * 1.1,
            -0.4 + Math.sin(i) * 0.2,
            -1 + Math.cos(i) * 0.6,
          ]}
        >
          <icosahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            flatShading
            transparent
            opacity={lit ? 0.85 : 0.35}
          />
        </mesh>
      ))}
      {lit && <pointLight color={region.accent} intensity={2.5} distance={18} />}
    </group>
  );
}
function BasinRegion({ region, lit }: { region: Region; lit: boolean }) {
  const rand = useMemo(() => seededRand(7), []);
  const cylinders = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        x: (rand() - 0.5) * 5,
        z: (rand() - 0.5) * 5,
        h: 1 + rand() * 1.6,
        r: 0.7 + rand() * 0.5,
        i,
      })),
    [rand]
  );
  return (
    <group position={region.center}>
      {/* basin bowl */}
      <mesh position={[0, -1.2, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[6, 2.4, 8, 1, true]} />
        <meshStandardMaterial
          color={lit ? "#3a2a4a" : "#1a1424"}
          flatShading
          side={THREE.DoubleSide}
          emissive={lit ? region.accent : "#000"}
          emissiveIntensity={lit ? 0.2 : 0}
        />
      </mesh>
      {/* water surface */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.5, 16]} />
        <meshStandardMaterial
          color={lit ? "#7a5dff" : "#2a2244"}
          transparent
          opacity={0.6}
          emissive={lit ? region.accent : "#000"}
          emissiveIntensity={lit ? 0.5 : 0}
        />
      </mesh>
      {/* data silos / database cylinders */}
      {cylinders.map((c) => (
        <group key={c.i} position={[c.x, -0.6, c.z]}>
          {[0, 1, 2].map((k) => (
            <mesh key={k} position={[0, k * 0.35 + 0.2, 0]}>
              <cylinderGeometry args={[c.r, c.r, 0.3, 12]} />
              <meshStandardMaterial
                color={lit ? "#c69bff" : "#3a2c4c"}
                flatShading
                emissive={lit ? region.accent : "#000"}
                emissiveIntensity={lit ? 0.35 : 0}
              />
            </mesh>
          ))}
        </group>
      ))}
      {lit && <pointLight color={region.accent} intensity={2.4} distance={16} />}
    </group>
  );
}
function CityRegion({ region, lit }: { region: Region; lit: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (groupRef.current) groupRef.current.rotation.y = s.clock.elapsedTime * 0.05;
  });
  const towers = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const r = 1.8 + (i % 3) * 0.6;
        return {
          x: Math.cos(a) * r,
          z: Math.sin(a) * r,
          h: 2 + (i % 4) * 0.7,
          i,
        };
      }),
    []
  );
  return (
    <group position={region.center}>
      {/* central plaza */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 8]} />
        <meshStandardMaterial
          color={lit ? "#3a2a1a" : "#1f1810"}
          flatShading
          emissive={lit ? region.accent : "#000"}
          emissiveIntensity={lit ? 0.2 : 0}
        />
      </mesh>
      {/* central spire = languages core */}
      <group ref={groupRef}>
        <mesh position={[0, 2, 0]}>
          <coneGeometry args={[0.8, 4, 6]} />
          <meshStandardMaterial
            color={lit ? "#fff4e0" : "#3a3024"}
            flatShading
            emissive={lit ? region.accent : "#000"}
            emissiveIntensity={lit ? 0.8 : 0}
          />
        </mesh>
        <mesh position={[0, 4.4, 0]}>
          <octahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color="#fff8eb"
            emissive={region.accent}
            emissiveIntensity={lit ? 1.4 : 0.2}
            flatShading
          />
        </mesh>
      </group>
      {towers.map((t) => (
        <group key={t.i} position={[t.x, 0, t.z]}>
          <mesh position={[0, t.h / 2, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.45, t.h, 4]} />
            <meshStandardMaterial
              color={lit ? "#ffd9a8" : "#3a2e22"}
              flatShading
              emissive={lit ? region.accent : "#000"}
              emissiveIntensity={lit ? 0.3 : 0}
            />
          </mesh>
        </group>
      ))}
      {lit && <pointLight color={region.accent} intensity={3.5} distance={20} />}
    </group>
  );
}
function Region({ region, lit }: { region: Region; lit: boolean }) {
  switch (region.id) {
    case "frontend":
      return <ForestRegion region={region} lit={lit} />;
    case "backend":
      return <ValleyRegion region={region} lit={lit} />;
    case "cloud":
      return <CloudRegion region={region} lit={lit} />;
    case "databases":
      return <BasinRegion region={region} lit={lit} />;
    case "languages":
      return <CityRegion region={region} lit={lit} />;
    default:
      return null;
  }
}
// ───────── Connection roads between regions ─────────
function Connections({ activeIndex }: { activeIndex: number }) {
  const lines = useMemo(() => {
    // languages (index 0) connects to every other region
    return REGIONS.slice(1).map((r, i) => {
      const a = new THREE.Vector3(...REGIONS[0].center);
      const b = new THREE.Vector3(...r.center);
      const mid = a
        .clone()
        .add(b)
        .multiplyScalar(0.5)
        .add(new THREE.Vector3(0, 2, 0));
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      return { points: curve.getPoints(40), index: i + 1 };
    });
  }, []);
  return (
    <group>
      {lines.map(({ points, index }) => {
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const lit = index <= activeIndex;
        return (
          <line key={index}>
            <primitive object={geo} attach="geometry" />
            <lineBasicMaterial
              color={lit ? "#ffb37a" : "#5a4d3a"}
              transparent
              opacity={lit ? 0.85 : 0.25}
            />
          </line>
        );
      })}
    </group>
  );
}
// ───────── Floating fragments ─────────
function Fragments() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = 220;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 50;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.015;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#ffd9a8" size={0.07} transparent opacity={0.55} />
    </points>
  );
}
// ───────── Camera tour ─────────
function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  useFrame(() => {
    // map progress to region index continuously
    const t = Math.min(Math.max(progress, 0), 0.999) * REGIONS.length;
    const i = Math.floor(t);
    const frac = t - i;
    const a = REGIONS[i] ?? REGIONS[REGIONS.length - 1];
    const b = REGIONS[i + 1] ?? a;
    const ax = a.center[0],
      ay = a.center[1],
      az = a.center[2];
    const bx = b.center[0],
      by = b.center[1],
      bz = b.center[2];
    const cx = ax + (bx - ax) * frac;
    const cy = ay + (by - ay) * frac;
    const cz = az + (bz - az) * frac;
    // orbit offset around current focus
    const angle = progress * Math.PI * 2;
    target.current.set(cx + Math.cos(angle) * 12, cy + 7, cz + Math.sin(angle) * 12);
    look.current.lerp(new THREE.Vector3(cx, cy, cz), 0.08);
    camera.position.lerp(target.current, 0.04);
    camera.lookAt(look.current);
  });
  return null;
}
function Scene({ progress, activeIndex }: { progress: number; activeIndex: number }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[15, 20, 10]} intensity={0.7} color="#ffe0b3" />
      <directionalLight position={[-15, -5, -10]} intensity={0.3} color="#7aa2ff" />
      <Fragments />
      <Connections activeIndex={activeIndex} />
      {REGIONS.map((r, i) => (
        <Region key={r.id} region={r} lit={i <= activeIndex} />
      ))}
      <CameraRig progress={progress} />
    </>
  );
}
// ───────── Main exported component ─────────
export default function SkillsOrigamiWorld() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const activeIndex = Math.min(
    REGIONS.length - 1,
    Math.floor(progress * REGIONS.length)
  );
  const active = REGIONS[activeIndex];
  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${REGIONS.length * 100}vh` }}
      aria-label="Skills — an origami world map"
      id="skills"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas
          camera={{ position: [14, 10, 16], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene progress={progress} activeIndex={activeIndex} />
        </Canvas>
        {/* Overlay UI */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-8 md:p-12">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-(--color-foreground)">
                An Engineering Ecosystem
              </p>
              <h2 className="mt-2 max-w-lg text-3xl font-light font-display leading-tight text-(--color-foreground) md:text-5xl">
                Skills as a <span className="text-coral font-serif">Folded World</span>
              </h2>
            </div>
            <div className="text-right text-(--color-foreground)">
              <p className="text-xs uppercase tracking-[0.3em]">Region</p>
              <p className="font-serif text-3xl text-foreground">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="text-aqua">
                  /{String(REGIONS.length).padStart(2, "0")}
                </span>
              </p>
            </div>
          </div>
          <div className="max-w-md">
            <p
              className="text-lg uppercase tracking-[0.3em] font-extrabold"
              style={{ color: active.accent }}
            >
              {active.tagline}
            </p>
            <h3 className="mt-2 text-3xl font-bold text-(--color-foreground) md:text-4xl">
              {active.name}
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-(--color-foreground)  md:text-base">
              {active.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-lg text-(--color-foreground) " >
              {active.skills.map((s) => (
                <li key={s.name} className=" font-extrabold">
                  <span
                    className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
                    style={{ background: active.accent }}
                  />
                  {s.name}
                </li>
              ))}
            </ul>
            <div className="mt-6 h-px w-full bg-[#3a2f24]">
              <div
                className="h-px transition-[width] duration-200"
                style={{
                  width: `${progress * 100}%`,
                  background: `linear-gradient(to right, ${active.accent}, #ffd9a8)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
