import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import CathedralLights from "./CathedralLights";
import StoneFloor from "./StoneFloor";
import FloatingArtifacts from "./FloatingArtifacts";
import LightShafts from "./LightShafts";
import PostFX from "./PostFX";
import CameraRig from "./CameraRig";

export default function Scene({ scrollProgress }) {
  return (
    <Canvas
      className="canvas-fixed"
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
      }}
      camera={{ position: [0, 1.2, 7], fov: 42, near: 0.1, far: 100 }}
      data-testid="webgl-canvas"
    >
      <color attach="background" args={["#0a0a0c"]} />
      <fog attach="fog" args={["#0a0a0c", 8, 28]} />

      <Suspense fallback={null}>
        <CathedralLights />
        <LightShafts />
        <StoneFloor />
        <FloatingArtifacts scrollProgress={scrollProgress} />
        <Environment preset="warehouse" environmentIntensity={0.18} />
      </Suspense>

      <CameraRig scrollProgress={scrollProgress} />
      <PostFX />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}
