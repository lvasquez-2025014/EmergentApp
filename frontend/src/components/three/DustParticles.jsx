import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Sacred dust motes — additive bright particles drifting upward
export default function DustParticles({ count = 380 }) {
  const ref = useRef();

  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = Math.random() * 10 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
      speeds[i] = 0.04 + Math.random() * 0.08;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, phases };
  }, [count]);

  useFrame((state, dt) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt * 6;
      // gentle horizontal sway
      arr[i * 3] += Math.sin(t * 0.4 + phases[i]) * 0.0035;
      if (arr[i * 3 + 1] > 8) {
        arr[i * 3 + 1] = -1.2;
        arr[i * 3] = (Math.random() - 0.5) * 18;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#e1d4ba"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
