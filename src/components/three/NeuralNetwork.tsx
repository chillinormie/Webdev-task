"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const PARTICLE_COUNT = 1200;
const CONNECTION_DISTANCE = 1.8;

function NeuralParticles({
  intensity = 1,
  convergence = 0,
}: {
  intensity?: number;
  convergence?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useMousePosition();
  const scrollProgress = useScrollProgress();
  const { viewport } = useThree();

  const { positions, velocities, originalPositions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const colorPalette = [
      new THREE.Color("#00E5FF"),
      new THREE.Color("#8B5CF6"),
      new THREE.Color("#00FFB3"),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 2;

      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, velocities, originalPositions, colors };
  }, []);

  const linePositions = useMemo(
    () => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6),
    []
  );

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const time = state.clock.elapsedTime;
    const mouseX = mouse.x * viewport.width * 0.5;
    const mouseY = mouse.y * viewport.height * 0.5;
    const complexity = 0.3 + scrollProgress * 0.7;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      posArray[i3] += velocities[i3] * intensity;
      posArray[i3 + 1] += velocities[i3 + 1] * intensity;
      posArray[i3 + 2] += velocities[i3 + 2] * intensity;

      const dx = mouseX - posArray[i3];
      const dy = mouseY - posArray[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) * 0.003;
        posArray[i3] += dx * force;
        posArray[i3 + 1] += dy * force;
      }

      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      posArray[i3] += (ox - posArray[i3]) * 0.002;
      posArray[i3 + 1] +=
        (oy + Math.sin(time * 0.5 + i * 0.01) * 0.3 - posArray[i3 + 1]) *
        0.002;
      posArray[i3 + 2] += (oz - posArray[i3 + 2]) * 0.002;

      if (convergence > 0) {
        const targetX = Math.sin(i * 0.1 + time * 0.2) * 0.5;
        const targetY = Math.cos(i * 0.1 + time * 0.2) * 0.5;
        const targetZ = Math.sin(i * 0.05) * 0.3;
        posArray[i3] += (targetX - posArray[i3]) * convergence * 0.02;
        posArray[i3 + 1] += (targetY - posArray[i3 + 1]) * convergence * 0.02;
        posArray[i3 + 2] += (targetZ - posArray[i3 + 2]) * convergence * 0.02;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    let lineIndex = 0;
    const maxConnections = Math.floor(80 * complexity);

    for (
      let i = 0;
      i < PARTICLE_COUNT && lineIndex < maxConnections * 2;
      i++
    ) {
      for (
        let j = i + 1;
        j < PARTICLE_COUNT && lineIndex < maxConnections * 2;
        j++
      ) {
        const i3 = i * 3;
        const j3 = j * 3;
        const dx = posArray[i3] - posArray[j3];
        const dy = posArray[i3 + 1] - posArray[j3 + 1];
        const dz = posArray[i3 + 2] - posArray[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const li = lineIndex * 6;
          linePositions[li] = posArray[i3];
          linePositions[li + 1] = posArray[i3 + 1];
          linePositions[li + 2] = posArray[i3 + 2];
          linePositions[li + 3] = posArray[j3];
          linePositions[li + 4] = posArray[j3 + 1];
          linePositions[li + 5] = posArray[j3 + 2];
          lineIndex++;
        }
      }
    }

    const lineGeo = linesRef.current.geometry;
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions.slice(0, lineIndex * 6), 3)
    );
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIndex * 2);
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={PARTICLE_COUNT}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={PARTICLE_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function IntelligenceCore({ scrollProgress }: { scrollProgress: number }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!coreRef.current || !ringRef.current) return;
    const time = state.clock.elapsedTime;
    coreRef.current.rotation.y = time * 0.3;
    coreRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
    ringRef.current.rotation.z = time * 0.5;
    ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.3) * 0.1;

    const scale = 0.8 + scrollProgress * 0.4;
    coreRef.current.scale.setScalar(scale);
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshBasicMaterial
          color="#00E5FF"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.2, 0.01, 16, 100]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <torusGeometry args={[1.5, 0.008, 16, 100]} />
        <meshBasicMaterial
          color="#00FFB3"
          transparent
          opacity={0.25}
        />
      </mesh>
      <pointLight color="#00E5FF" intensity={2} distance={5} />
    </group>
  );
}

function SceneContent({
  showCore = true,
  convergence = 0,
}: {
  showCore?: boolean;
  convergence?: number;
}) {
  const scrollProgress = useScrollProgress();

  return (
    <>
      <ambientLight intensity={0.1} />
      <NeuralParticles
        intensity={1 + scrollProgress * 0.5}
        convergence={convergence}
      />
      {showCore && <IntelligenceCore scrollProgress={scrollProgress} />}
    </>
  );
}

export function NeuralNetworkCanvas({
  className = "",
  showCore = true,
  convergence = 0,
}: {
  className?: string;
  showCore?: boolean;
  convergence?: number;
}) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneContent showCore={showCore} convergence={convergence} />
      </Canvas>
    </div>
  );
}

export function LoadingNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 12;

  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 1.5 + Math.random() * 0.5;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: (Math.random() - 0.5) * 0.5,
        delay: i * 0.15,
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.8} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <pointLight color="#00E5FF" intensity={3} distance={8} />
    </group>
  );
}

export function LoadingCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.2} />
      <LoadingNetwork />
    </Canvas>
  );
}
