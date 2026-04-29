import { useMemo } from "react";
import * as THREE from "three";

export default function StoneFloor() {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1817",
        roughness: 0.92,
        metalness: 0.05,
      }),
    []
  );

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.2, 0]}
      receiveShadow
      material={material}
    >
      <planeGeometry args={[60, 60, 1, 1]} />
    </mesh>
  );
}
