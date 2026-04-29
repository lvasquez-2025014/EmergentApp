import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A monumental rotating cross + obelisk + sphere — abstract sacred forms
function Obelisk({ position, scale = 1 }) {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.08;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale} castShadow>
      <coneGeometry args={[0.45, 3.2, 4]} />
      <meshStandardMaterial
        color="#2a2724"
        roughness={0.55}
        metalness={0.25}
      />
    </mesh>
  );
}

function Cross({ position, scale = 1 }) {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.15) * 0.5;
      ref.current.position.y =
        position[1] + Math.sin(s.clock.elapsedTime * 0.4) * 0.08;
    }
  });
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c4a259",
        roughness: 0.32,
        metalness: 0.85,
        emissive: "#3a2a14",
        emissiveIntensity: 0.25,
      }),
    []
  );
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh material={mat} castShadow>
        <boxGeometry args={[0.18, 2.2, 0.18]} />
      </mesh>
      <mesh position={[0, 0.45, 0]} material={mat} castShadow>
        <boxGeometry args={[1.1, 0.18, 0.18]} />
      </mesh>
    </group>
  );
}

function Orb({ position, scale = 1 }) {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.x = s.clock.elapsedTime * 0.05;
      ref.current.rotation.y = s.clock.elapsedTime * 0.07;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[0.7, 1]} />
      <meshStandardMaterial
        color="#1a1a1c"
        roughness={0.18}
        metalness={0.9}
        flatShading
      />
    </mesh>
  );
}

function Arch({ position, scale = 1 }) {
  return (
    <mesh position={position} scale={scale}>
      <torusGeometry args={[1.6, 0.05, 16, 80, Math.PI]} />
      <meshStandardMaterial
        color="#c4a259"
        metalness={0.95}
        roughness={0.25}
        emissive="#3a2a14"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

export default function FloatingArtifacts({ scrollProgress }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current && scrollProgress?.current !== undefined) {
      const p = scrollProgress.current;
      groupRef.current.rotation.y = p * Math.PI * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Cross position={[0, 1.4, -1.5]} scale={1.1} />
      <Arch position={[0, 2.8, -2]} scale={1} />
      <Obelisk position={[-3.4, 0.4, -2.5]} scale={0.9} />
      <Obelisk position={[3.4, 0.4, -2.5]} scale={0.9} />
      <Orb position={[-1.6, 0.9, -4]} scale={0.7} />
      <Orb position={[1.6, 0.9, -4]} scale={0.7} />
    </group>
  );
}
