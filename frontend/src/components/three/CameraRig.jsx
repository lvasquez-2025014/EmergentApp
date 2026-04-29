import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const tmp = new THREE.Vector3();

export default function CameraRig({ scrollProgress }) {
  const { camera, mouse } = useThree();

  useFrame(() => {
    const p = scrollProgress?.current ?? 0;

    // Cinematic dolly: forward through the cathedral, slight rise
    const targetZ = 7 - p * 6.5; // 7 -> 0.5
    const targetY = 1.2 + p * 0.6; // 1.2 -> 1.8
    const targetX = Math.sin(p * Math.PI) * 1.1; // gentle s-curve

    camera.position.x += (targetX + mouse.x * 0.25 - camera.position.x) * 0.05;
    camera.position.y += (targetY + mouse.y * 0.12 - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;

    tmp.set(0, 1.2 + p * 0.4, -2);
    camera.lookAt(tmp);
  });

  return null;
}
