import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import CathedralLights from "./CathedralLights";
import StoneFloor from "./StoneFloor";
import FloatingArtifacts from "./FloatingArtifacts";
import LightShafts from "./LightShafts";
import PostFX from "./PostFX";
import CameraRig from "./CameraRig";
import DustParticles from "./DustParticles";
import FloatingCandles from "./FloatingCandles";
import useDevice from "../../lib/useDevice";

export default function Scene({ scrollProgress }) {
  const { isMobile, isLowEnd, reduced } = useDevice();
  const dustCount = isMobile ? 90 : isLowEnd ? 180 : 420;
  const dpr = isMobile ? [1, 1.25] : [1, 1.75];

  return (
    <Canvas
      className="canvas-fixed"
      dpr={dpr}
      gl={{
        antialias: !isMobile,
        powerPreference: "high-performance",
        alpha: false,
      }}
      camera={{ position: [0, 1.2, 7], fov: 42, near: 0.1, far: 100 }}
      frameloop={reduced ? "demand" : "always"}
      data-testid="webgl-canvas"
    >
      <color attach="background" args={["#0a0a0c"]} />
      <fog attach="fog" args={["#0a0a0c", 8, 28]} />

      <Suspense fallback={null}>
        <CathedralLights />
        <LightShafts />
        <StoneFloor />
        {!isLowEnd && <FloatingCandles />}
        <FloatingArtifacts scrollProgress={scrollProgress} />
        <DustParticles count={dustCount} />
        {!isMobile && (
          <Environment preset="warehouse" environmentIntensity={0.18} />
        )}
      </Suspense>

      <CameraRig scrollProgress={scrollProgress} />
      {!isMobile && <PostFX />}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}
