import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LightShafts() {
  const g1 = useRef();
  const g2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g1.current) {
      g1.current.material.opacity = 0.18 + Math.sin(t * 0.4) * 0.05;
    }
    if (g2.current) {
      g2.current.material.opacity = 0.12 + Math.cos(t * 0.3) * 0.04;
    }
  });

  return (
    <group>
      <mesh ref={g1} position={[-2, 3, -3]} rotation={[0, 0, -0.18]}>
        <coneGeometry args={[2, 10, 32, 1, true]} />
        <meshBasicMaterial
          color="#e1d4ba"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={g2} position={[3, 3, -4]} rotation={[0, 0, 0.22]}>
        <coneGeometry args={[1.4, 9, 32, 1, true]} />
        <meshBasicMaterial
          color="#c4a259"
          transparent
          opacity={0.14}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
