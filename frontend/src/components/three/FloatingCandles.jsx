import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Candle({ position, scale = 1, phase = 0 }) {
  const flame = useRef();
  const light = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const flicker = 0.85 + Math.sin(t * 14 + phase) * 0.1 + Math.random() * 0.04;
    if (flame.current) {
      flame.current.scale.y = flicker * scale;
      flame.current.scale.x = (0.9 + (flicker - 0.85) * 0.4) * scale;
    }
    if (light.current) {
      light.current.intensity = 2.6 * flicker;
    }
  });

  return (
    <group position={position}>
      {/* candle body */}
      <mesh position={[0, 0, 0]} scale={scale}>
        <cylinderGeometry args={[0.06, 0.07, 0.55, 16]} />
        <meshStandardMaterial color="#1f1d1a" roughness={0.6} metalness={0.05} />
      </mesh>
      {/* base */}
      <mesh position={[0, -0.32, 0]} scale={scale}>
        <cylinderGeometry args={[0.12, 0.14, 0.07, 16]} />
        <meshStandardMaterial
          color="#c4a259"
          metalness={0.95}
          roughness={0.32}
        />
      </mesh>
      {/* wick */}
      <mesh position={[0, 0.3 * scale, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.04, 6]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      {/* flame */}
      <mesh ref={flame} position={[0, 0.36 * scale, 0]}>
        <coneGeometry args={[0.04, 0.16, 12]} />
        <meshBasicMaterial color="#ffb454" transparent opacity={0.95} />
      </mesh>
      <mesh position={[0, 0.36 * scale, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial
          color="#ffd47a"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* point light */}
      <pointLight
        ref={light}
        position={[0, 0.4 * scale, 0]}
        intensity={2.4}
        distance={3.5}
        color="#ffaa55"
        decay={2}
      />
    </group>
  );
}

export default function FloatingCandles() {
  return (
    <group position={[0, -0.9, 0]}>
      <Candle position={[-3.6, 0, 0.2]} scale={1.0} phase={0} />
      <Candle position={[-2.2, 0, 1.4]} scale={0.85} phase={1.4} />
      <Candle position={[2.2, 0, 1.4]} scale={0.85} phase={2.7} />
      <Candle position={[3.6, 0, 0.2]} scale={1.0} phase={4.1} />
      <Candle position={[-1.0, 0, -2.5]} scale={0.7} phase={5.5} />
      <Candle position={[1.0, 0, -2.5]} scale={0.7} phase={6.2} />
    </group>
  );
}
