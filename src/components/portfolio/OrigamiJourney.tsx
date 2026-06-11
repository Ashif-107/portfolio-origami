import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Milestone = {
  year: string;
  title: string;
  role: string;
  desc: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "2017",
    title: "First Fold",
    role: "Junior Developer",
    desc: "Began the craft. Learned the grammar of code and the patience of debugging.",
  },
  {
    year: "2019",
    title: "Crane Takes Flight",
    role: "Full-Stack Engineer",
    desc: "Shipped products end-to-end. Found rhythm between systems and interfaces.",
  },
  {
    year: "2021",
    title: "Mountain Pass",
    role: "Senior Engineer",
    desc: "Architected platforms used by thousands. Mentored, reviewed, refined.",
  },
  {
    year: "2023",
    title: "Lantern Lit",
    role: "Tech Lead",
    desc: "Led teams through ambiguity. Translated vision into shipped reality.",
  },
  {
    year: "2025",
    title: "Dragon Ascends",
    role: "Principal Engineer",
    desc: "Shaping direction. Building the next chapter of the journey.",
  },
];

// Build a winding path through 3D space
const PATH_POINTS = MILESTONES.map((_, i) => {
  const t = i / (MILESTONES.length - 1);
  const x = Math.sin(i * 1.4) * 6;
  const y = i * 2.2;
  const z = Math.cos(i * 1.1) * 4 - i * 0.8;
  return new THREE.Vector3(x, y, z);
});

const CURVE = new THREE.CatmullRomCurve3(PATH_POINTS, false, "catmullrom", 0.5);

function PaperPath({ progress }: { progress: number }) {
  const points = useMemo(() => CURVE.getPoints(300), []);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    return g;
  }, [points]);

  // Glowing traveled portion
  const traveledGeo = useMemo(() => {
    return new THREE.BufferGeometry();
  }, []);

  useEffect(() => {
    const count = Math.max(2, Math.floor(points.length * progress));
    traveledGeo.setFromPoints(points.slice(0, count));
  }, [progress, points, traveledGeo]);

  return (
    <group>
      <line>
        <primitive object={geometry} attach="geometry" />
        <lineBasicMaterial color="#d4c5a9" transparent opacity={0.35} />
      </line>
      <line>
        <primitive object={traveledGeo} attach="geometry" />
        <lineBasicMaterial color="#ff9d5c" transparent opacity={0.95} />
      </line>
      {/* Floating dashes along path */}
      {points.filter((_, i) => i % 8 === 0).map((p, i) => (
        <mesh key={i} position={p}>
          <octahedronGeometry args={[0.06, 0]} />
          <meshStandardMaterial
            color={i / (points.length / 8) < progress ? "#ffb37a" : "#8a7d68"}
            emissive={i / (points.length / 8) < progress ? "#ff7a3d" : "#000000"}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrigamiDragon({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const leftWing = useRef<THREE.Mesh>(null);
  const rightWing = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = Math.min(Math.max(progress, 0.001), 0.999);
    const pos = CURVE.getPointAt(t);
    const tangent = CURVE.getTangentAt(t).normalize();
    group.current.position.copy(pos);

    const lookTarget = pos.clone().add(tangent);
    group.current.lookAt(lookTarget);
    // tilt with bobbing
    const bob = Math.sin(state.clock.elapsedTime * 1.6) * 0.15;
    group.current.position.y += bob;

    const flap = Math.sin(state.clock.elapsedTime * 3.2) * 0.35;
    if (leftWing.current) leftWing.current.rotation.z = -0.3 + flap;
    if (rightWing.current) rightWing.current.rotation.z = 0.3 - flap;
  });

  return (
    <group ref={group}>
      <group rotation={[0, Math.PI, 0]} scale={0.7}>
        {/* Body — folded prism */}
        <mesh castShadow>
          <coneGeometry args={[0.35, 1.2, 4]} />
          <meshStandardMaterial
            color="#fff4e0"
            flatShading
            metalness={0.1}
            roughness={0.6}
            emissive="#ff8a3d"
            emissiveIntensity={0.25}
          />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.22, 0.5, 4]} />
          <meshStandardMaterial color="#fff4e0" flatShading />
        </mesh>
        {/* Tail */}
        <mesh position={[0, 0, -0.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.18, 0.7, 3]} />
          <meshStandardMaterial color="#f5d9b0" flatShading />
        </mesh>
        {/* Wings */}
        <mesh ref={leftWing} position={[-0.3, 0.1, 0]}>
          <planeGeometry args={[1.1, 0.6]} />
          <meshStandardMaterial
            color="#ffe6c2"
            side={THREE.DoubleSide}
            flatShading
            transparent
            opacity={0.92}
          />
        </mesh>
        <mesh ref={rightWing} position={[0.3, 0.1, 0]}>
          <planeGeometry args={[1.1, 0.6]} />
          <meshStandardMaterial
            color="#ffe6c2"
            side={THREE.DoubleSide}
            flatShading
            transparent
            opacity={0.92}
          />
        </mesh>
        {/* Glow */}
        <pointLight color="#ff8a3d" intensity={2.5} distance={5} />
      </group>
    </group>
  );
}

function Monument({
  position,
  milestone,
  state,
  index,
}: {
  position: THREE.Vector3;
  milestone: Milestone;
  state: "future" | "active" | "completed";
  index: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const unfold = useRef(0);

  useFrame((s, dt) => {
    if (!ref.current) return;
    const target = state === "future" ? 0 : 1;
    unfold.current += (target - unfold.current) * Math.min(1, dt * 2.5);
    ref.current.rotation.y = s.clock.elapsedTime * 0.15 + index;
    ref.current.position.y =
      position.y + Math.sin(s.clock.elapsedTime * 0.8 + index) * 0.15;
  });

  const isLit = state !== "future";

  return (
    <group ref={ref} position={position}>
      {/* Base platform */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[1.1, 1.3, 0.2, 6]} />
        <meshStandardMaterial
          color={isLit ? "#f7e4c3" : "#5d5446"}
          flatShading
          emissive={state === "completed" ? "#ff7a3d" : "#000000"}
          emissiveIntensity={state === "completed" ? 0.4 : 0}
        />
      </mesh>

      {/* Folded paper tower — petals that unfold */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const openRot = state === "future" ? Math.PI / 2.2 : Math.PI / 6;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.4,
              0,
              Math.sin(angle) * 0.4,
            ]}
            rotation={[openRot, -angle, 0]}
          >
            <coneGeometry args={[0.45, 1.4, 3]} />
            <meshStandardMaterial
              color={
                state === "completed"
                  ? "#ffd9a8"
                  : state === "active"
                    ? "#fff4e0"
                    : "#6b6053"
              }
              flatShading
              side={THREE.DoubleSide}
              emissive={state === "completed" ? "#ff6a2a" : "#000000"}
              emissiveIntensity={state === "completed" ? 0.5 : 0}
            />
          </mesh>
        );
      })}

      {/* Central spire (visible only when unfolded) */}
      {isLit && (
        <mesh position={[0, 0.4, 0]}>
          <coneGeometry args={[0.18, 1.6, 4]} />
          <meshStandardMaterial
            color="#fff8eb"
            emissive="#ff8a3d"
            emissiveIntensity={state === "completed" ? 1.2 : 0.4}
            flatShading
          />
        </mesh>
      )}

      {state === "completed" && (
        <pointLight color="#ff7a3d" intensity={3} distance={6} />
      )}
    </group>
  );
}

function Scene({ progress }: { progress: number }) {
  const { camera } = useThree();
  const camTarget = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());

  useFrame(() => {
    const t = Math.min(Math.max(progress, 0.001), 0.999);
    const pos = CURVE.getPointAt(t);
    const ahead = CURVE.getPointAt(Math.min(t + 0.05, 1));

    // Camera trails behind & above the dragon
    const offset = new THREE.Vector3(4, 3.5, 6);
    camTarget.current.copy(pos).add(offset);
    lookTarget.current.lerp(pos, 0.1);
    camera.position.lerp(camTarget.current, 0.05);
    camera.lookAt(lookTarget.current);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 5]} intensity={0.8} color="#ffe0b3" />
      <directionalLight position={[-10, 5, -10]} intensity={0.3} color="#7aa2ff" />

      {/* Floating origami fragments — ambient world */}
      <Particles />

      <PaperPath progress={progress} />
      <OrigamiDragon progress={progress} />

      {MILESTONES.map((m, i) => {
        const t = i / (MILESTONES.length - 1);
        const state: "future" | "active" | "completed" =
          progress > t + 0.05
            ? "completed"
            : progress > t - 0.05
              ? "active"
              : "future";
        return (
          <Monument
            key={i}
            position={PATH_POINTS[i]}
            milestone={m}
            state={state}
            index={i}
          />
        );
      })}

      <fog attach="fog" args={["#1a1410", 10, 45]} />
    </>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = 200;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = Math.random() * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#ffd9a8" size={0.08} transparent opacity={0.6} />
    </points>
  );
}

export default function OrigamiJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      const idx = Math.min(
        MILESTONES.length - 1,
        Math.round(p * (MILESTONES.length - 1))
      );
      setActiveIndex(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = MILESTONES[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${MILESTONES.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent ">
        <Canvas
          camera={{ position: [6, 6, 10], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <Scene progress={progress} />
        </Canvas>

        {/* Overlay UI */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-8 md:p-12">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-(--color-secondary-foreground)">
                A Career in Folded Paper
              </p>
              <h1 className="mt-2 max-w-lg text-3xl font-light leading-tight text-(--color-foreground) md:text-5xl">
                An Engineer's <span className="text-coral">Journey</span> Through Time
              </h1>
            </div>
            <div className="text-right text-(--color-secondary-foreground)">
              <p className="text-xs uppercase tracking-[0.3em]">Chapter</p>
              <p className="font-serif text-3xl text-(--color-foreground)">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="text-(--color-secondary-foreground)">
                  /{String(MILESTONES.length).padStart(2, "0")}
                </span>
              </p>
            </div>
          </div>

          <div className="max-w-md">
            <p className="text-xs uppercase tracking-[0.3em] text-(--color-secondary-foreground)">
              {active.year} · {active.role}
            </p>
            <h2 className="mt-2 text-3xl font-light text-(--color-foreground) md:text-4xl">
              {active.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-(--color-muted-foreground) md:text-base">
              {active.desc}
            </p>

            <div className="mt-6 h-px w-full bg-[#3a2f24]">
              <div
                className="h-px bg-linear-to-r from-[#ff7a3d] to-[#ffd9a8] transition-[width] duration-200"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
